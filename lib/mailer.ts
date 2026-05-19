import nodemailer from "nodemailer";

// SSL on port 465 — NOVATREND Swiss hosting (mail.dnamar.ch)
export function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASSWORD!,
    },
  });
}

export const FROM_ADDRESS = '"Web Dnamar" <info@dnamar.ch>';
export const TO_ADDRESS = () => process.env.CONTACT_EMAIL ?? "info@dnamar.ch";
