/**
 * Generates DNS-Brief-dnamar.pdf – domain migration instructions for the client.
 */
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../DNS-Brief-dnamar.pdf");

const NAVY  = [26,  46,  74];
const GREEN = [76,  175, 130];
const WHITE = [255, 255, 255];
const SLATE = [100, 116, 139];
const LIGHT = [248, 250, 252];
const MUTED = [226, 232, 240];

const today = new Date().toLocaleDateString("de-CH", {
  day: "2-digit", month: "long", year: "numeric",
});

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
  info: {
    Title:   "DNS-Konfiguration – dnamar.ch",
    Author:  "Vidal Ecosystem",
    Subject: "Domain Migration Anleitung",
  },
});

doc.pipe(fs.createWriteStream(OUT));

const PW = doc.page.width;   // 595.28
const PH = doc.page.height;  // 841.89
const M  = 52;
const CW = PW - M * 2;

const fc  = (c) => doc.fillColor(c);
const sc  = (c) => doc.strokeColor(c);
const fsc = (f, s) => { doc.fillColor(f).strokeColor(s); };

function box(x, y, w, h, fill, r = 0) {
  fc(fill);
  if (r) doc.roundedRect(x, y, w, h, r).fill();
  else   doc.rect(x, y, w, h).fill();
}
function boxStroke(x, y, w, h, fill, stroke, r = 4) {
  fsc(fill, stroke);
  doc.roundedRect(x, y, w, h, r).fillAndStroke();
}
function hline(y) {
  sc(MUTED); doc.moveTo(M, y).lineTo(M + CW, y).lineWidth(0.4).stroke();
}
function t(str, x, y, opts = {}) {
  doc.text(String(str), x, y, { lineBreak: false, ...opts });
}

// ── HEADER ────────────────────────────────────────────────────────────────────
const HDR = 110;
box(0, 0, PW, HDR, NAVY);

// Logo circle
box(M, 28, 36, 36, GREEN, 18);
fc(WHITE); doc.font("Helvetica-Bold").fontSize(16);
t("N", M + 11, 34);

// Brand
fc(WHITE); doc.font("Helvetica-Bold").fontSize(13);
t("D'Namar GmbH", M + 48, 30);
fc(GREEN); doc.font("Helvetica").fontSize(8);
t("Reinigungsdienst Basel", M + 48, 46);

// Date top right
fc([190,210,230]); doc.font("Helvetica").fontSize(8);
t(today, PW - M - 100, 36, { width: 100, align: "right" });

// Title
fc(WHITE); doc.font("Helvetica-Bold").fontSize(17);
t("DNS-Konfiguration", M, 70);
fc(GREEN); doc.font("Helvetica").fontSize(8.5);
t("Domain dnamar.ch – Migration zu Vercel", M, 92);

// ── SALUTATION ────────────────────────────────────────────────────────────────
let cy = HDR + 28;

fc(NAVY); doc.font("Helvetica-Bold").fontSize(10);
t("Sehr geehrte Damen und Herren,", M, cy);
cy += 22;

fc(SLATE); doc.font("Helvetica").fontSize(9.5);
const intro =
  "fuer die Aktivierung der neuen Website unter der Domain dnamar.ch ist eine " +
  "technische Anpassung der DNS-Eintraege erforderlich. Diese Aenderung leitet " +
  "die Domain auf unseren Hosting-Server (Vercel) weiter und aktiviert " +
  "gleichzeitig das SSL-Zertifikat (https) automatisch.";
doc.text(intro, M, cy, { width: CW, lineGap: 2 });
cy += 54;

// ── REGISTRAR INFO BOX ────────────────────────────────────────────────────────
boxStroke(M, cy, CW, 38, LIGHT, MUTED, 6);
fc(GREEN); doc.font("Helvetica-Bold").fontSize(7);
t("AKTUELLER REGISTRAR", M + 12, cy + 8);
fc(NAVY); doc.font("Helvetica-Bold").fontSize(9);
t("NOVATREND Services GmbH  –  novatrend.ch", M + 12, cy + 20);
fc(SLATE); doc.font("Helvetica").fontSize(7.5);
t("Bahnhofstrasse 18, CH-6340 Baar  |  +41 44 500 40 70  |  info@novatrend.ch", M + 12, cy + 31);
cy += 50;

// ── STEPS ─────────────────────────────────────────────────────────────────────
fc(NAVY); doc.font("Helvetica-Bold").fontSize(10.5);
t("Vorgehen – Schritt fuer Schritt", M, cy);
cy += 18;

const steps = [
  ["Anmeldung",      "Melden Sie sich unter novatrend.ch in Ihrem Kundenkonto an."],
  ["DNS-Editor",     "Navigieren Sie zu: Mein Konto > Domains > dnamar.ch > DNS / Zoneneditor."],
  ["Alte Eintraege", "Entfernen Sie die bestehenden Nameserver-Eintraege (ns141/ns142.tophost.ch)."],
  ["Neue Eintraege", "Fuegen Sie folgende zwei Eintraege hinzu (siehe Tabelle unten)."],
  ["Speichern",      "Speichern Sie die Aenderungen. Die Propagation dauert 15 Minuten bis 24 Stunden."],
];

steps.forEach(([title, desc], i) => {
  // number circle
  box(M, cy + 1, 18, 18, GREEN, 9);
  fc(WHITE); doc.font("Helvetica-Bold").fontSize(8);
  t(String(i + 1), M + 6, cy + 4);

  // title + desc
  fc(NAVY);  doc.font("Helvetica-Bold").fontSize(9);   t(title, M + 26, cy + 1);
  fc(SLATE); doc.font("Helvetica").fontSize(8.5);
  doc.text(desc, M + 26, cy + 13, { width: CW - 30, lineBreak: false });
  cy += 30;
});
cy += 8;

// ── DNS TABLE ─────────────────────────────────────────────────────────────────
fc(NAVY); doc.font("Helvetica-Bold").fontSize(10.5);
t("DNS-Eintraege", M, cy);
cy += 14;

// table header
box(M, cy, CW, 22, NAVY, 4);
fc(WHITE); doc.font("Helvetica-Bold").fontSize(8);
const col1 = M + 12;
const col2 = M + 90;
const col3 = M + 170;
const col4 = M + 290;
t("TYP",     col1, cy + 7);
t("NAME",    col2, cy + 7);
t("WERT",    col3, cy + 7);
t("VERWENDUNG", col4, cy + 7);
cy += 22;

const DNS_ROWS = [
  ["A",     "@",   "76.76.21.21",           "Hauptdomain (dnamar.ch)"],
  ["CNAME", "www", "cname.vercel-dns.com",  "Subdomain (www.dnamar.ch)"],
];

DNS_ROWS.forEach(([type, name, value, use], i) => {
  const rh = 26;
  box(M, cy, CW, rh, i % 2 === 0 ? WHITE : LIGHT);
  sc(MUTED); doc.rect(M, cy, CW, rh).stroke();

  // type badge
  const bw = 28;
  box(col1 - 2, cy + 7, bw, 12, i === 0 ? [219,234,254] : [220,252,231], 3);
  fc(i === 0 ? [30,64,175] : [4,120,87]);
  doc.font("Helvetica-Bold").fontSize(7.5);
  t(type, col1 + (bw - doc.widthOfString(type)) / 2 - 2, cy + 10);

  fc(NAVY); doc.font("Helvetica-Bold").fontSize(8.5); t(name,  col2, cy + 8);
  fc(SLATE); doc.font("Helvetica").fontSize(8);
  t(value, col3, cy + 8);
  t(use,   col4, cy + 8, { width: CW - (col4 - M) - 10 });
  cy += rh;
});
cy += 22;

// ── NOTE BOX ──────────────────────────────────────────────────────────────────
boxStroke(M, cy, CW, 42, [240,253,244], [134,239,172], 6);
fc(GREEN); doc.font("Helvetica-Bold").fontSize(8);
t("Hinweis", M + 12, cy + 8);
fc(SLATE); doc.font("Helvetica").fontSize(8.5);
doc.text(
  "Nach dem Speichern der DNS-Eintraege wird das SSL-Zertifikat von Vercel automatisch " +
  "ausgestellt. Die Website ist danach unter https://dnamar.ch und https://www.dnamar.ch " +
  "erreichbar. Es sind keine weiteren Massnahmen erforderlich.",
  M + 12, cy + 20, { width: CW - 24, lineGap: 1 }
);
cy += 58;

// ── CLOSING ───────────────────────────────────────────────────────────────────
fc(SLATE); doc.font("Helvetica").fontSize(9.5);
doc.text(
  "Bei Fragen oder wenn Sie moechten, dass wir die Aenderung direkt in Ihrem " +
  "Novatrend-Konto vornehmen, stehen wir Ihnen gerne zur Verfuegung.",
  M, cy, { width: CW, lineGap: 2 }
);
cy += 36;

fc(NAVY); doc.font("Helvetica-Bold").fontSize(9.5);
t("Mit freundlichen Gruessen", M, cy);
cy += 18;
fc(NAVY); doc.font("Helvetica-Bold").fontSize(9);
t("Vidal Ecosystem", M, cy);
fc(SLATE); doc.font("Helvetica").fontSize(8.5);
t("Fullstack Development & SME Digital Strategy", M, cy + 13);

// ── FOOTER ────────────────────────────────────────────────────────────────────
const footerY = PH - 48;
hline(footerY);

fc(NAVY); doc.font("Helvetica-Bold").fontSize(8);
t("D'Namar GmbH", M, footerY + 10);
fc(SLATE); doc.font("Helvetica").fontSize(7.5);
t("Wiesenstrasse 14  |  4057 Basel  |  info@dnamar.ch  |  +41 79 252 75 57", M, footerY + 22);

fc(GREEN); doc.font("Helvetica-Bold").fontSize(8);
t("dnamar.ch", M + CW, footerY + 10, { width: 80, align: "right" });
fc(SLATE); doc.font("Helvetica").fontSize(7.5);
t(today, M + CW, footerY + 22, { width: 80, align: "right" });

doc.end();
console.log("PDF generado:", OUT);
