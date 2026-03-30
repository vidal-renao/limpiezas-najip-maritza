import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

    // Save to Supabase (status: pending — admin must approve before it appears)
    const { error: dbError } = await supabase.from("reviews").insert({
      name: displayName,
      rating,
      service,
      comment: comment.trim(),
      locale: locale ?? "de",
      status: "pending",
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
    }

    // Send email notification to admin (non-blocking — DB save already succeeded)
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? "info@dnamar.ch";

    if (apiKey) {
      const stars = "⭐".repeat(rating);
      const html = `
        <h2>Neue Kundenbewertung – D'Namar Basel</h2>
        <p><strong>Bewertung:</strong> ${stars} (${rating}/5)</p>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td><strong>Name</strong></td><td>${escapeHtml(displayName)}</td></tr>
          <tr><td><strong>Leistung</strong></td><td>${escapeHtml(service)}</td></tr>
          <tr><td><strong>Kommentar</strong></td><td style="white-space:pre-wrap">${escapeHtml(comment.trim())}</td></tr>
        </table>
        <p style="color:#666;font-size:13px;margin-top:16px">
          Diese Bewertung wurde in der Datenbank gespeichert (Status: <strong>pending</strong>).<br>
          Gehen Sie zu Supabase → Table Editor → reviews, um sie zu genehmigen (status = approved).
        </p>
      `;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "D'Namar Web <onboarding@resend.dev>",
          to: [toEmail],
          subject: `Neue Bewertung (${rating}★): ${escapeHtml(service)} – ${escapeHtml(displayName)}`,
          html,
        }),
      }).catch((err) => console.error("Resend notification failed:", err));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Review API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
