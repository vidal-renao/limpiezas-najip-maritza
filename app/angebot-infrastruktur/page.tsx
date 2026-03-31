import type { Metadata } from "next";
import DownloadButton from "./DownloadButton";

export const metadata: Metadata = {
  title: "Angebot – Digitale Business-Infrastruktur V2.0 | D'Namar Basel",
  robots: { index: false, follow: false },
};

export default function AngebotPage() {
  const today = new Date().toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* ── Print + page styles ─────────────────────────────────────────────── */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 14mm 16mm 16mm 16mm;
          }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .page-break { page-break-before: always; }
          .no-break { page-break-inside: avoid; }
        }
        body { font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; }
      `}</style>

      <div className="min-h-screen bg-slate-100 print:bg-white py-10 print:py-0 px-4 print:px-0">
        <div className="max-w-[794px] mx-auto bg-white shadow-xl print:shadow-none rounded-2xl print:rounded-none overflow-hidden">

          {/* ── HEADER ──────────────────────────────────────────────────────── */}
          <header className="bg-[#1a2e4a] px-10 pt-10 pb-8 print:px-[16mm] print:pt-[14mm]">
            <div className="flex items-start justify-between mb-8">
              {/* Logo + brand */}
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/N.jpeg"
                  alt="D'Namar"
                  className="w-12 h-12 rounded-xl object-cover border-2 border-white/20"
                />
                <div>
                  <p className="text-white font-bold text-lg leading-none">D&apos;Namar GmbH</p>
                  <p className="text-white/50 text-xs mt-0.5">Reinigungsdienst Basel</p>
                </div>
              </div>
              {/* Download button */}
              <DownloadButton />
            </div>

            {/* Title block */}
            <div className="border-t border-white/10 pt-7">
              <p className="text-[#4caf82] text-xs font-bold uppercase tracking-[0.2em] mb-2">Angebot</p>
              <h1 className="text-white text-2xl font-bold leading-tight">
                Digitale Business-Infrastruktur V2.0
              </h1>
              <p className="text-white/60 text-sm mt-1">Für eine messbare Präsenz im Reinigungsmarkt Basel</p>
            </div>

            {/* Meta row */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label: "Kunde", value: "D'Namar Reinigung Basel" },
                { label: "Berater", value: "Vidal · Fullstack & SME" },
                { label: "Datum", value: today },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                  <p className="text-white/40 text-[10px] uppercase tracking-widest">{label}</p>
                  <p className="text-white text-sm font-medium mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </header>

          {/* ── BODY ────────────────────────────────────────────────────────── */}
          <main className="px-10 py-10 print:px-[16mm] space-y-10">

            {/* 1. Strategischer Mehrwert */}
            <section className="no-break">
              <SectionTitle number="01" title="Strategischer Mehrwert" />
              <p className="text-slate-600 text-sm leading-relaxed mt-4">
                Im Gegensatz zu einer herkömmlichen Website wurde für D&apos;Namar eine{" "}
                <strong className="text-[#1a2e4a]">hochperformante SaaS-Infrastruktur</strong> entwickelt.
                Diese Architektur bietet nicht nur eine digitale Präsenz, sondern ein echtes Werkzeug zur
                Kundenakquise und Unternehmenssteuerung im Raum Basel — mit messbaren KPIs vom ersten Tag an.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { val: "68", label: "indexierte Seiten", sub: "DE / EN / ES" },
                  { val: "100/100", label: "Google Lighthouse", sub: "Performance Score" },
                  { val: "4.9 ★", label: "Bewertungen", sub: "90 verifizierte Reviews" },
                ].map(({ val, label, sub }) => (
                  <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-center">
                    <p className="text-[#1a2e4a] text-xl font-bold">{val}</p>
                    <p className="text-slate-700 text-xs font-semibold mt-0.5">{label}</p>
                    <p className="text-slate-400 text-[10px] mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Technische Meilensteine */}
            <section>
              <SectionTitle number="02" title="Technische Meilensteine" />

              <div className="mt-5 space-y-4">
                {/* A */}
                <div className="no-break rounded-xl border border-slate-200 overflow-hidden">
                  <div className="bg-[#1a2e4a]/5 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#1a2e4a] text-white text-xs font-bold flex items-center justify-center shrink-0">A</span>
                      <p className="font-semibold text-[#1a2e4a] text-sm">Administrations-Panel & Selbstverwaltung</p>
                    </div>
                    <Badge label="Implementiert ✓" green />
                  </div>
                  <div className="px-5 py-4 space-y-2">
                    <FeatureRow icon="🔐" text="Privates Dashboard (/admin) — Bewertungen moderieren ohne Supabase-Zugang." />
                    <FeatureRow icon="🗄️" text="Sichere Datenbankanbindung (Supabase) mit Schweizer Datenschutzstandards (DSG-konform)." />
                    <FeatureRow icon="✏️" text="CMS Lite (content/site.config.ts) — alle Geschäftsdaten an einem Ort: Telefon, Adresse, Zeiten, Team." />
                  </div>
                </div>

                {/* B */}
                <div className="no-break rounded-xl border border-slate-200 overflow-hidden">
                  <div className="bg-[#1a2e4a]/5 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#1a2e4a] text-white text-xs font-bold flex items-center justify-center shrink-0">B</span>
                      <p className="font-semibold text-[#1a2e4a] text-sm">Business-Analytik & Konversions-Tracking</p>
                    </div>
                    <Badge label="Implementiert ✓" green />
                  </div>
                  <div className="px-5 py-4 space-y-2">
                    <FeatureRow icon="📊" text="Smart Tracking: präzise Messung von Klicks auf «Kalkschutz», «Offerte» und «WhatsApp» — 4 Events aktiv." />
                    <FeatureRow icon="⚡" text="Vercel Speed Insights: Core Web Vitals in Echtzeit für maximale Mobilperformance." />
                    <FeatureRow icon="🎯" text="ROI-Messung je Kanal — verstehen, welche Inhalte die Kunden in Basel zur Kontaktaufnahme bewegen." />
                  </div>
                </div>

                {/* C */}
                <div className="no-break rounded-xl border border-[#4caf82]/30 overflow-hidden">
                  <div className="bg-[#4caf82]/8 border-b border-[#4caf82]/20 px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#4caf82] text-white text-xs font-bold flex items-center justify-center shrink-0">C</span>
                      <p className="font-semibold text-[#1a2e4a] text-sm">Kalkschutz-SEO & Lokale Marktführerschaft</p>
                    </div>
                    <Badge label="USP-Strategie" />
                  </div>
                  <div className="px-5 py-4 space-y-2">
                    <FeatureRow icon="💧" text="Nischen-Positionierung «Kalkschutz Basel»: D'Namar ist das einzige Reinigungsunternehmen mit dediziertem Kalkschutz-Content — Basler Leitungswasser hat einen Härtegrad von 28–32 °fH." />
                    <FeatureRow icon="🗺️" text="LocalBusiness JSON-LD Schema auf allen 68 Seiten: bevorzugte Sichtbarkeit im Google Maps Pack für Basel, Riehen, Allschwil." />
                    <FeatureRow icon="🌐" text="Dynamische Dreisprachigkeit (DE/EN/ES) mit hreflang — maximale Reichweite in der internationalen Bevölkerung Basels." />
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Launch-Support */}
            <section className="no-break">
              <SectionTitle number="03" title="Launch-Support & Growth Monitoring" />
              <div className="mt-5 grid grid-cols-2 gap-4">
                {[
                  { icon: "🔒", title: "SSL & Domain-Migration", desc: "Vollständige Einrichtung von dnamar.ch auf Vercel inkl. HTTPS-Zertifikat und DNS-Management." },
                  { icon: "📡", title: "Server-Monitoring", desc: "6 Monate Überwachung der Betriebsstabilität, Sicherheits-Updates und Uptime-Alerts." },
                  { icon: "📈", title: "Analytics-Berichte", desc: "Monatlicher Bericht mit Klickdaten, Konversionsrate und SEO-Ranking-Entwicklung." },
                  { icon: "🛠️", title: "Technischer Support", desc: "Priorisierter Zugang für Anpassungen, Content-Updates und Fehlerbehandlung." },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-base mb-1.5">{icon}</p>
                    <p className="font-semibold text-[#1a2e4a] text-sm">{title}</p>
                    <p className="text-slate-500 text-xs leading-relaxed mt-1">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Investitionsübersicht */}
            <section className="no-break">
              <SectionTitle number="04" title="Investitionsübersicht" />
              <div className="mt-5 rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#1a2e4a] text-white">
                      <th className="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wider">Modul</th>
                      <th className="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wider">Beschreibung</th>
                      <th className="text-right px-5 py-3 font-semibold text-xs uppercase tracking-wider">Betrag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        module: "Infrastruktur V2.0",
                        desc: "Admin-Panel, Supabase-Datenbank & CMS Lite",
                        amount: "CHF 900.00",
                      },
                      {
                        module: "Marketing-Tech",
                        desc: "Smart Analytics, Speed Insights & Kalkschutz-SEO-Strategie",
                        amount: "CHF 800.00",
                      },
                      {
                        module: "Growth & Monitoring",
                        desc: "Domain-Migration, SSL, 6 Monate Support & monatliche Analytics-Berichte",
                        amount: "CHF 800.00",
                      },
                    ].map(({ module, desc, amount }, i) => (
                      <tr key={module} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                        <td className="px-5 py-3.5 font-semibold text-[#1a2e4a] align-top">{module}</td>
                        <td className="px-5 py-3.5 text-slate-500 text-xs leading-relaxed align-top">{desc}</td>
                        <td className="px-5 py-3.5 font-semibold text-[#1a2e4a] text-right whitespace-nowrap align-top">{amount}</td>
                      </tr>
                    ))}
                    <tr className="bg-[#1a2e4a]">
                      <td colSpan={2} className="px-5 py-4 text-white font-bold text-sm">TOTAL</td>
                      <td className="px-5 py-4 text-[#4caf82] font-bold text-base text-right">CHF 2&apos;500.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Payment terms */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#4caf82]/30 bg-[#4caf82]/5 px-5 py-3.5 flex items-center gap-3">
                  <span className="text-[#4caf82] text-lg">①</span>
                  <div>
                    <p className="font-semibold text-[#1a2e4a] text-sm">50% bei Projektstart</p>
                    <p className="text-slate-500 text-xs mt-0.5">CHF 1&apos;250.00 — fällig bei Auftragserteilung</p>
                  </div>
                </div>
                <div className="rounded-xl border border-[#4caf82]/30 bg-[#4caf82]/5 px-5 py-3.5 flex items-center gap-3">
                  <span className="text-[#4caf82] text-lg">②</span>
                  <div>
                    <p className="font-semibold text-[#1a2e4a] text-sm">50% nach Go-Live</p>
                    <p className="text-slate-500 text-xs mt-0.5">CHF 1&apos;250.00 — nach Migration auf dnamar.ch</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Nächste Schritte */}
            <section className="no-break">
              <SectionTitle number="05" title="Nächste Schritte" />
              <div className="mt-5 space-y-3">
                {[
                  { step: "1", text: "Angebot bestätigen & erste Rate begleichen (CHF 1'250.–)" },
                  { step: "2", text: "Domain dnamar.ch auf Vercel migrieren & SSL aktivieren" },
                  { step: "3", text: "Google Search Console einrichten & Sitemap einreichen" },
                  { step: "4", text: "Go-Live-Prüfung: Lighthouse, JSON-LD, Tracking-Events" },
                  { step: "5", text: "Zweite Rate begleichen — Projekt abgeschlossen" },
                ].map(({ step, text }) => (
                  <div key={step} className="flex items-center gap-4">
                    <span className="w-7 h-7 rounded-full bg-[#4caf82]/15 border border-[#4caf82]/30 text-[#4caf82] text-xs font-bold flex items-center justify-center shrink-0">
                      {step}
                    </span>
                    <p className="text-slate-600 text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* ── FOOTER ──────────────────────────────────────────────────────── */}
          <footer className="bg-[#1a2e4a]/5 border-t border-slate-200 px-10 py-6 print:px-[16mm]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#1a2e4a] font-semibold text-sm">D&apos;Namar GmbH</p>
                <p className="text-slate-400 text-xs mt-0.5">Wiesenstrasse 14 · 4057 Basel · info@dnamar.ch</p>
              </div>
              <div className="text-right">
                <p className="text-[#4caf82] font-semibold text-sm">Vidal Ecosystem</p>
                <p className="text-slate-400 text-xs mt-0.5">Fullstack Development & SME Digital Strategy</p>
              </div>
            </div>
            <p className="text-slate-300 text-[10px] text-center mt-4">
              Dieses Angebot ist 30 Tage gültig ab {today}. Alle Preise in CHF inkl. MwSt.
            </p>
          </footer>

        </div>
      </div>
    </>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────────── */

function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[#4caf82] text-xs font-bold tracking-widest">{number}</span>
      <div className="flex-1 h-px bg-slate-200" />
      <h2 className="text-[#1a2e4a] font-bold text-base">{title}</h2>
      <div className="w-8 h-px bg-slate-200" />
    </div>
  );
}

function FeatureRow({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-base shrink-0 mt-0.5">{icon}</span>
      <p className="text-slate-600 text-xs leading-relaxed">{text}</p>
    </div>
  );
}

function Badge({ label, green }: { label: string; green?: boolean }) {
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
        green
          ? "text-[#4caf82] bg-[#4caf82]/10 border-[#4caf82]/30"
          : "text-[#1a2e4a] bg-[#1a2e4a]/8 border-[#1a2e4a]/20"
      }`}
    >
      {label}
    </span>
  );
}
