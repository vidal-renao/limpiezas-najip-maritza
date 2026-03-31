/**
 * Genera Angebot-DNamar-Infrastruktur-V2.pdf en la raiz del proyecto.
 * Sin emojis (Helvetica no los soporta). Layout A4 en 1-2 paginas.
 */
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../Angebot-DNamar-Infrastruktur-V2.pdf");

// Brand
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
    Title:   "Angebot – Digitale Business-Infrastruktur V2.0",
    Author:  "Vidal Ecosystem",
    Subject: "D'Namar Reinigung Basel",
  },
});

doc.pipe(fs.createWriteStream(OUT));

const PW = doc.page.width;   // 595.28
const PH = doc.page.height;  // 841.89
const M  = 44;               // side margin
const CW = PW - M * 2;       // content width = 507.28

// ─── colour helpers ──────────────────────────────────────────────────────────
const fc  = (c) => doc.fillColor(c);
const sc  = (c) => doc.strokeColor(c);
const fsc = (f, s) => { doc.fillColor(f).strokeColor(s); };

// ─── shape helpers ───────────────────────────────────────────────────────────
function box(x, y, w, h, fill, r = 0) {
  fc(fill);
  if (r) doc.roundedRect(x, y, w, h, r).fill();
  else   doc.rect(x, y, w, h).fill();
}
function boxStroke(x, y, w, h, fill, stroke, r = 4) {
  fsc(fill, stroke);
  doc.roundedRect(x, y, w, h, r).fillAndStroke();
}
function hline(y, color = MUTED) {
  sc(color); doc.moveTo(M, y).lineTo(M + CW, y).lineWidth(0.4).stroke();
}

// ─── text helper (absolute, no overflow) ────────────────────────────────────
function t(str, x, y, opts = {}) {
  doc.text(String(str), x, y, { lineBreak: false, ...opts });
}

// ─── section title ───────────────────────────────────────────────────────────
function sectionTitle(num, label, y) {
  fc(GREEN); doc.font("Helvetica-Bold").fontSize(7);
  t(num, M, y + 2);
  sc(MUTED); doc.moveTo(M + 22, y + 5).lineTo(M + CW / 2 - 52, y + 5).lineWidth(0.4).stroke();
  fc(NAVY);  doc.font("Helvetica-Bold").fontSize(11);
  t(label, M + CW / 2 - 48, y - 1);
  return y + 18;
}

// ─── module block ────────────────────────────────────────────────────────────
function moduleBlock(letter, title, badge, accentGreen, features, y) {
  const rowH = 13;
  const bh   = 22 + features.length * rowH + 6;

  boxStroke(M, y, CW, bh, accentGreen ? [240,250,245] : LIGHT, accentGreen ? [180,235,210] : MUTED);

  // header strip
  box(M, y, CW, 20, accentGreen ? [220,245,232] : [241,245,249]);
  box(M, y, CW, 10, accentGreen ? [220,245,232] : [241,245,249]); // fix bottom radius

  // letter circle
  box(M + 11, y + 5, 18, 18, accentGreen ? GREEN : NAVY, 9); // circle via small radius
  fc(WHITE); doc.font("Helvetica-Bold").fontSize(7.5);
  t(letter, M + 16, y + 9);

  // title
  fc(NAVY); doc.font("Helvetica-Bold").fontSize(8.5);
  t(title, M + 34, y + 7);

  // badge
  const bw = doc.fontSize(6).font("Helvetica-Bold").widthOfString(badge) + 10;
  box(M + CW - bw - 6, y + 5, bw, 11, accentGreen ? [209,250,229] : [226,232,240], 3);
  fc(accentGreen ? [4,120,87] : [51,65,85]);
  doc.font("Helvetica-Bold").fontSize(6);
  t(badge, M + CW - bw - 1, y + 8);

  // features
  let fy = y + 25;
  features.forEach((text) => {
    fc(SLATE); doc.font("Helvetica").fontSize(7.5);
    t("–  " + text, M + 12, fy, { width: CW - 20 });
    fy += rowH;
  });

  return y + bh + 6;
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 1
// ═══════════════════════════════════════════════════════════════════════════

// ── HEADER bg ────────────────────────────────────────────────────────────────
const HDR = 152;
box(0, 0, PW, HDR, NAVY);

// Logo circle
box(M + 2, 28, 34, 34, GREEN, 17);
fc(WHITE); doc.font("Helvetica-Bold").fontSize(15);
t("N", M + 12, 34);

// Brand
fc(WHITE); doc.font("Helvetica-Bold").fontSize(13);
t("D'Namar GmbH", M + 44, 30);
fc(GREEN); doc.font("Helvetica").fontSize(8);
t("Reinigungsdienst Basel", M + 44, 46);

// eyebrow + title
fc(GREEN); doc.font("Helvetica-Bold").fontSize(7);
t("ANGEBOT", M, 70);
fc(WHITE); doc.font("Helvetica-Bold").fontSize(20);
t("Digitale Business-Infrastruktur V2.0", M, 82);
fc([190,210,230]); doc.font("Helvetica").fontSize(8.5);
t("Fuer eine messbare Praesenz im Reinigungsmarkt Basel", M, 107);

// meta boxes
const BW = (CW - 12) / 3;
[
  ["KUNDE",   "D'Namar Reinigung Basel"],
  ["BERATER", "Vidal  Fullstack & SME"],
  ["DATUM",   today],
].forEach(([label, val], i) => {
  const bx = M + i * (BW + 6);
  box(bx, 120, BW, 28, [36,61,97], 4);
  fc(GREEN);  doc.font("Helvetica-Bold").fontSize(6);  t(label, bx + 8, 126);
  fc(WHITE);  doc.font("Helvetica").fontSize(8);       t(val,   bx + 8, 136, { width: BW - 16, ellipsis: true });
});

// ── SECTION 01 ───────────────────────────────────────────────────────────────
let cy = HDR + 18;
cy = sectionTitle("01", "Strategischer Mehrwert", cy);

fc(SLATE); doc.font("Helvetica").fontSize(8);
const bodyText =
  "Im Gegensatz zu einer herkoemlichen Website wurde fuer D'Namar eine hochperformante SaaS-Infrastruktur entwickelt. " +
  "Diese Architektur bietet nicht nur eine digitale Praesenz, sondern ein echtes Werkzeug zur Kundenakquise und " +
  "Unternehmenssteuerung im Raum Basel – mit messbaren KPIs vom ersten Tag an.";
doc.text(bodyText, M, cy, { width: CW, lineGap: 1 });
cy += 36;

// KPI boxes
const KW = (CW - 12) / 3;
[
  ["68",       "Indexierte Seiten",   "DE / EN / ES"],
  ["100 / 100","Google Lighthouse",   "Performance Score"],
  ["4.9 *",    "Kundenbewertungen",   "90 verifizierte Reviews"],
].forEach(([val, label, sub], i) => {
  const kx = M + i * (KW + 6);
  boxStroke(kx, cy, KW, 42, WHITE, MUTED);
  fc(NAVY); doc.font("Helvetica-Bold").fontSize(13); t(val,   kx, cy + 6,  { width: KW, align: "center" });
  fc(NAVY); doc.font("Helvetica-Bold").fontSize(7);  t(label, kx, cy + 22, { width: KW, align: "center" });
  fc(SLATE); doc.font("Helvetica").fontSize(6.5);    t(sub,   kx, cy + 32, { width: KW, align: "center" });
});
cy += 52;

// ── SECTION 02 ───────────────────────────────────────────────────────────────
cy = sectionTitle("02", "Technische Meilensteine", cy);

cy = moduleBlock("A", "Administrations-Panel & Selbstverwaltung", "Implementiert", true, [
  "Privates Dashboard (/admin) – Bewertungen moderieren ohne Supabase-Direktzugang.",
  "Sichere Datenbankanbindung (Supabase) nach Schweizer Datenschutzstandards (DSG-konform).",
  "CMS Lite (site.config.ts) – alle Geschaeftsdaten an einem Ort: Telefon, Adresse, Zeiten, Team.",
], cy);

cy = moduleBlock("B", "Business-Analytik & Konversions-Tracking", "Implementiert", true, [
  "Smart Tracking: Messung von Klicks auf Kalkschutz, Offerte und WhatsApp – 4 Events aktiv.",
  "Vercel Speed Insights: Core Web Vitals in Echtzeit fuer maximale Mobilperformance.",
  "ROI-Messung je Kanal – verstehen, welche Inhalte die Kunden in Basel zur Anfrage bewegen.",
], cy);

cy = moduleBlock("C", "Kalkschutz-SEO & Lokale Marktfuehrerschaft", "USP-Strategie", false, [
  "Nischen-Positionierung: einziges Unternehmen mit dediziertem Kalkschutz-Content (28-32 fH Haertegrad).",
  "LocalBusiness JSON-LD auf allen 68 Seiten: bevorzugte Sichtbarkeit im Google Maps Pack Basel.",
  "Dynamische Dreisprachigkeit (DE/EN/ES) mit hreflang – maximale Reichweite in Basel.",
], cy);

// ── SECTION 03 ───────────────────────────────────────────────────────────────
cy = sectionTitle("03", "Launch-Support & Growth Monitoring", cy + 2);

const SW = (CW - 6) / 2;
[
  ["SSL & Domain",  "Einrichtung dnamar.ch auf Vercel inkl. HTTPS & DNS-Management."],
  ["Monitoring",    "6 Monate Serverstabilitaet, Sicherheits-Updates & Uptime-Alerts."],
  ["Analytics",     "Monatlicher Bericht: Klickdaten, Konversionsrate, SEO-Rankings."],
  ["Support",       "Priorisierter Zugang fuer Anpassungen, Content-Updates & Bugfixes."],
].forEach(([title, desc], i) => {
  const sx = M + (i % 2) * (SW + 6);
  const sy = cy + Math.floor(i / 2) * 44;
  boxStroke(sx, sy, SW, 38, LIGHT, MUTED);
  fc(NAVY);  doc.font("Helvetica-Bold").fontSize(8); t(title, sx + 8, sy + 7);
  fc(SLATE); doc.font("Helvetica").fontSize(7);
  doc.text(desc, sx + 8, sy + 19, { width: SW - 16, lineBreak: false });
});
cy += 96;

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 2 – Investitionsübersicht + Nächste Schritte + Footer
// ═══════════════════════════════════════════════════════════════════════════
doc.addPage();
cy = 44;

// ── SECTION 04 ───────────────────────────────────────────────────────────────
cy = sectionTitle("04", "Investitionsuebersicht", cy);

// Table header
box(M, cy, CW, 20, NAVY, 4);
fc(WHITE); doc.font("Helvetica-Bold").fontSize(7);
t("MODUL",        M + 10,      cy + 7);
t("BESCHREIBUNG", M + 118,     cy + 7);
t("BETRAG",       M + CW - 58, cy + 7);
cy += 20;

const ROWS = [
  ["Infrastruktur V2.0", "Admin-Panel, Supabase-Datenbank & CMS Lite",                         "CHF 900.00"],
  ["Marketing-Tech",     "Smart Analytics, Speed Insights & Kalkschutz-SEO-Strategie",          "CHF 800.00"],
  ["Growth & Monitoring","Domain-Migration, SSL, 6 Monate Support & monatl. Analytics-Berichte","CHF 800.00"],
];
ROWS.forEach(([mod, desc, amt], i) => {
  const rh = 24;
  box(M, cy, CW, rh, i % 2 === 0 ? WHITE : [248, 250, 252]);
  sc(MUTED); doc.rect(M, cy, CW, rh).stroke();
  fc(NAVY);  doc.font("Helvetica-Bold").fontSize(8);  t(mod,  M + 10,      cy + 8);
  fc(SLATE); doc.font("Helvetica").fontSize(7.5);     t(desc, M + 118,     cy + 8, { width: 190 });
  fc(NAVY);  doc.font("Helvetica-Bold").fontSize(8);  t(amt,  M + CW - 58, cy + 8);
  cy += rh;
});

// Total row
box(M, cy, CW, 26, NAVY);
fc(WHITE); doc.font("Helvetica-Bold").fontSize(10);  t("TOTAL",       M + 10,      cy + 8);
fc(GREEN); doc.font("Helvetica-Bold").fontSize(12);  t("CHF 2'500.00",M + CW - 80, cy + 7);
cy += 34;

// Payment conditions
const PBW = (CW - 8) / 2;
[
  ["1", "50% bei Projektstart",  "CHF 1'250.00 – faellig bei Auftragserteilung"],
  ["2", "50% nach Go-Live",      "CHF 1'250.00 – nach Migration auf dnamar.ch"],
].forEach(([num, title, sub], i) => {
  const px = M + i * (PBW + 8);
  boxStroke(px, cy, PBW, 34, [240,253,244], [134,239,172], 4);
  fc(GREEN); doc.font("Helvetica-Bold").fontSize(11); t(num,   px + 10, cy + 10);
  fc(NAVY);  doc.font("Helvetica-Bold").fontSize(8.5);t(title, px + 26, cy + 9);
  fc(SLATE); doc.font("Helvetica").fontSize(7.5);     t(sub,   px + 26, cy + 21, { width: PBW - 36 });
});
cy += 46;

// ── SECTION 05 ───────────────────────────────────────────────────────────────
cy = sectionTitle("05", "Naechste Schritte", cy + 2);

[
  "Angebot bestaetigen & erste Rate begleichen (CHF 1'250.–)",
  "Domain dnamar.ch auf Vercel migrieren & SSL aktivieren",
  "Google Search Console einrichten & Sitemap einreichen",
  "Go-Live-Pruefung: Lighthouse, JSON-LD, Tracking-Events",
  "Zweite Rate begleichen – Projekt offiziell abgeschlossen",
].forEach((step, i) => {
  // circle
  box(M + 5, cy + 2, 14, 14, GREEN, 7);
  fc(WHITE); doc.font("Helvetica-Bold").fontSize(7); t(String(i + 1), M + 9, cy + 5);
  fc(SLATE); doc.font("Helvetica").fontSize(8.5);    t(step, M + 26, cy + 3, { width: CW - 32 });
  cy += 18;
});
cy += 6;

// ── FOOTER ───────────────────────────────────────────────────────────────────
hline(cy);
cy += 8;

fc(NAVY); doc.font("Helvetica-Bold").fontSize(8.5);
t("D'Namar GmbH", M, cy);
fc(SLATE); doc.font("Helvetica").fontSize(7.5);
t("Wiesenstrasse 14  4057 Basel  info@dnamar.ch  +41 79 252 75 57", M, cy + 12);

fc(GREEN); doc.font("Helvetica-Bold").fontSize(8.5);
t("Vidal Ecosystem", M + CW - 96, cy, { width: 96, align: "right" });
fc(SLATE); doc.font("Helvetica").fontSize(7.5);
t("Fullstack Development & SME Digital Strategy", M + CW - 200, cy + 12, { width: 200, align: "right" });

cy += 30;
fc([180,195,210]); doc.font("Helvetica").fontSize(6.5);
t(`Dieses Angebot ist 30 Tage gueltig ab ${today}. Alle Preise in CHF inkl. MwSt.`, M, cy, { width: CW, align: "center" });

doc.end();
console.log("PDF generado:", OUT);
