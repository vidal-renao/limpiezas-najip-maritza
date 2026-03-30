import { NextRequest, NextResponse } from "next/server";

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
    const { name, rating, service, comment } = body as {
      name?: string;
      rating: number;
      service: string;
      comment: string;
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

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? "info@dnamar.ch";

    if (!apiKey) {
      return NextResponse.json({ error: "Mail service not configured" }, { status: 500 });
    }

    const stars = "⭐".repeat(rating);
    const displayName = name?.trim() || "Anonym";

    const html = `
      <h2>Neue Kundenbewertung – D'Namar Basel</h2>
      <p><strong>Bewertung:</strong> ${stars} (${rating}/5)</p>
      <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(displayName)}</td></tr>
        <tr><td><strong>Leistung</strong></td><td>${escapeHtml(service)}</td></tr>
        <tr><td><strong>Kommentar</strong></td><td style="white-space:pre-wrap">${escapeHtml(comment.trim())}</td></tr>
      </table>
      <p style="color:#666;font-size:13px;margin-top:16px">
        Diese Bewertung wurde über das Kontaktformular auf dnamar.ch eingereicht.<br>
        Bitte prüfen Sie den Inhalt vor der Veröffentlichung.
      </p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "D'Namar Web <noreply@dnamar.ch>",
        to: [toEmail],
        subject: `Neue Bewertung (${rating}★): ${escapeHtml(service)} – ${escapeHtml(displayName)}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Failed to send review" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Review API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
