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
    const { service, sizeMode, size, frequency, date, message, name, email, phone, address } =
      body as {
        service: string;
        sizeMode: string;
        size: string;
        frequency: string;
        date?: string;
        message?: string;
        name: string;
        email: string;
        phone: string;
        address: string;
      };

    if (!service || !size || !frequency || !name || !email || !phone || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? "info@dnamar.ch";

    if (!apiKey) {
      console.error("RESEND_API_KEY not set");
      return NextResponse.json({ error: "Mail service not configured" }, { status: 500 });
    }

    const html = `
      <h2>Neue Offerten-Anfrage – D'Namar Basel</h2>
      <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td><strong>Leistung</strong></td><td>${escapeHtml(service)}</td></tr>
        <tr><td><strong>Grösse</strong></td><td>${escapeHtml(size)} (${sizeMode === "m2" ? "m²" : "Zimmer"})</td></tr>
        <tr><td><strong>Häufigkeit</strong></td><td>${escapeHtml(frequency)}</td></tr>
        ${date ? `<tr><td><strong>Wunschdatum</strong></td><td>${escapeHtml(date)}</td></tr>` : ""}
        ${message ? `<tr><td><strong>Notizen</strong></td><td style="white-space:pre-wrap">${escapeHtml(message)}</td></tr>` : ""}
        <tr><td colspan="2" style="border-top:2px solid #eee;padding-top:12px"><strong>Kontakt</strong></td></tr>
        <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><strong>E-Mail</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Telefon</strong></td><td>${escapeHtml(phone)}</td></tr>
        <tr><td><strong>Adresse</strong></td><td>${escapeHtml(address)}</td></tr>
      </table>
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
        reply_to: email,
        subject: `Offerten-Anfrage: ${service} – ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Anfrage API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
