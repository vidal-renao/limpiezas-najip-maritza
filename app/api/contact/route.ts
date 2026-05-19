import { NextRequest, NextResponse } from "next/server";
import { createTransporter, FROM_ADDRESS, TO_ADDRESS } from "@/lib/mailer";

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
    const { name, email, phone, service, message } = body as {
      name: string;
      email: string;
      phone?: string;
      service: string;
      message: string;
    };

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("SMTP configuration incomplete");
      return NextResponse.json({ error: "Mail service not configured" }, { status: 500 });
    }

    const html = `
      <h2>Neue Kontaktanfrage – D'Namar Basel</h2>
      <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><strong>E-Mail</strong></td><td>${escapeHtml(email)}</td></tr>
        ${phone ? `<tr><td><strong>Telefon</strong></td><td>${escapeHtml(phone)}</td></tr>` : ""}
        <tr><td><strong>Leistung</strong></td><td>${escapeHtml(service)}</td></tr>
        <tr><td><strong>Nachricht</strong></td><td style="white-space:pre-wrap">${escapeHtml(message)}</td></tr>
      </table>
    `;

    const transporter = createTransporter();
    await transporter.sendMail({
      from: FROM_ADDRESS,
      to: TO_ADDRESS(),
      replyTo: email,
      subject: `Kontaktanfrage von ${name}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
