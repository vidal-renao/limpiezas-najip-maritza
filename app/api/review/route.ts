import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { createTransporter, FROM_ADDRESS, TO_ADDRESS } from "@/lib/mailer";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Offensive words list (DE / EN / ES) — extend as needed
const BLOCKED_WORDS = [
  // German
  "scheiß", "scheisse", "scheiße", "arschloch", "arsch", "wichser", "hurensohn",
  "fotze", "fick", "ficken", "idiot", "vollidiot", "depp", "blödmann", "trottel",
  "nazi", "bastard", "wichse", "schlampe", "nutte",
  // English
  "fuck", "fucking", "shit", "asshole", "bitch", "cunt", "bastard", "dick",
  "prick", "whore", "slut", "retard", "nigger", "faggot",
  // Spanish
  "mierda", "puta", "puto", "coño", "joder", "gilipollas", "imbécil", "imbecil",
  "maricón", "maricon", "cabron", "cabrón", "hostia", "polla", "idiota", "estúpido",
];

function moderateContent(text: string): "clean" | "offensive" {
  const lower = text.toLowerCase();
  return BLOCKED_WORDS.some((word) => lower.includes(word)) ? "offensive" : "clean";
}

function determineStatus(rating: number, contentResult: "clean" | "offensive"): "approved" | "pending" | "rejected" {
  if (contentResult === "offensive") return "rejected";
  if (rating >= 4) return "approved";   // 4-5 stars + clean → auto-publish
  return "pending";                      // 1-3 stars → manual review
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, rating, service, comment, locale } = body as {
      name?: string;
      rating: number;
      service: string;
      comment: string;
      locale?: string;
    };

    if (!rating || !service || !comment?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
    }

    if (comment.trim().length < 10) {
      return NextResponse.json({ error: "Comment too short" }, { status: 400 });
    }

    const displayName = name?.trim() || "Anonym";
    const contentResult = moderateContent(comment + " " + displayName);
    const status = determineStatus(rating, contentResult);

    const { error: dbError } = await supabase.from("reviews").insert({
      name: displayName,
      rating,
      service,
      comment: comment.trim(),
      locale: locale ?? "de",
      status,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
    }

    // Email notification — only for pending (needs manual review)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD && status === "pending") {
      const stars = "⭐".repeat(rating);
      const html = `
        <h2 style="color:#1a2e4a">Neue Bewertung zur Prüfung – D'Namar Basel</h2>
        <p><strong>Bewertung:</strong> ${stars} (${rating}/5)</p>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px;border:1px solid #dde3ec;border-radius:8px">
          <tr style="background:#f5f7fa"><td style="padding:8px 12px"><strong>Name</strong></td><td style="padding:8px 12px">${escapeHtml(displayName)}</td></tr>
          <tr><td style="padding:8px 12px"><strong>Leistung</strong></td><td style="padding:8px 12px">${escapeHtml(service)}</td></tr>
          <tr style="background:#f5f7fa"><td style="padding:8px 12px;vertical-align:top"><strong>Kommentar</strong></td><td style="padding:8px 12px;white-space:pre-wrap">${escapeHtml(comment.trim())}</td></tr>
        </table>
        <div style="margin-top:20px;padding:16px;background:#fff8e6;border-left:4px solid #f59e0b;border-radius:4px">
          <p style="margin:0;font-size:14px;color:#92400e">
            ⚠️ Diese Bewertung hat <strong>${rating} Stern(e)</strong> und wartet auf manuelle Genehmigung.
          </p>
        </div>
        <p style="margin-top:16px">
          <a href="https://dnamar.ch/admin/reviews"
             style="display:inline-block;background:#4caf82;color:#fff;text-decoration:none;padding:10px 20px;border-radius:20px;font-weight:600;font-size:14px">
            → Im Admin-Panel verwalten
          </a>
        </p>
        <p style="font-size:12px;color:#999;margin-top:8px">
          Direktlink: https://dnamar.ch/admin/reviews
        </p>
      `;

      createTransporter().sendMail({
        from: FROM_ADDRESS,
        to: TO_ADDRESS(),
        subject: `⚠️ Manuelle Prüfung (${rating}★): ${escapeHtml(service)} – ${escapeHtml(displayName)}`,
        html,
      }).catch((err) => console.error("SMTP notification failed:", err));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Review API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
