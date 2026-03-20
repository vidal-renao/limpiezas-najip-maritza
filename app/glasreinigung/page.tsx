import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  CheckCircle2,
  ArrowRight,
  Droplets,
  Building2,
  Sun,
  Wind,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Glasreinigung Basel | Fensterreinigung mit Kalkschutz – Privat & Gewerbe",
  description:
    "Professionelle Glasreinigung & Fensterreinigung in Basel mit Kalkschutz-Versiegelung. Streifenfrei, innen & aussen, für Privat und Gewerbe in Riehen, Allschwil und Basel-Stadt.",
};

/* ─── JSON-LD ─────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Glasreinigung Basel",
  description:
    "Professionelle Glasreinigung und Fensterreinigung in Basel mit Kalkschutz-Versiegelung – streifenfrei, für Privathaushalte und Gewerbe.",
  provider: {
    "@type": "LocalBusiness",
    name: "D'Namar Reinigungsdienst",
    telephone: "+41792527557",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Basel",
      addressCountry: "CH",
    },
  },
  areaServed: { "@type": "City", name: "Basel", addressCountry: "CH" },
  offers: {
    "@type": "Offer",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "8",
      priceCurrency: "CHF",
      unitText: "Fenster",
    },
  },
};

/* ─── Data ────────────────────────────────────────────────────────────────── */
const TASKS = [
  "Fenster innen & aussen, streifenfrei",
  "Schaufenster und Glasfronten",
  "Wintergärten & Glasdächer",
  "Treppenhausfenster & Gemeinschaftsflächen",
  "Rahmen, Falze & Fensterbänke innen",
  "Rollladen & Jalousien abstauben",
  "Spiegel und Glastrennwände",
  "Türscheiben & Glaselemente",
  "Dachfenster (Velux etc.)",
  "Balkontüren & Terrassenverglasungen",
];

const BENEFITS = [
  {
    icon: Droplets,
    title: "Kalkschutz-Versiegelung",
    desc: "Wir tragen nach der Reinigung eine Schutzversiegelung auf – bis zu 8 Wochen Kalkschutz bei Basler Hartwasser.",
  },
  {
    icon: Building2,
    title: "Privat & Gewerbe",
    desc: "Von der Altbauwohnung bis zur Glasfassade – wir reinigen jede Fensterfläche in Basel und Umgebung.",
  },
  {
    icon: Sun,
    title: "Innen & Aussen",
    desc: "Vollständige Reinigung beider Seiten inklusive Rahmen, Dichtungen und Fensterbänken.",
  },
  {
    icon: Wind,
    title: "Osmotisch gereinigtes Wasser",
    desc: "Wir arbeiten mit 100 % enthärtetem, osmotisch gereinigtem Wasser – keine Streifen, kein Kalk.",
  },
];

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function GlasreinigungPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy pt-28 pb-24 overflow-hidden min-h-[520px]">
        <Image
          src="/images/Fenster-blauer-Himmel-768x512.jpg"
          alt="Glasreinigung Basel – streifenfreie Fenster mit Kalkschutz in Riehen und Allschwil"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />

        <div className="section-container relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-brand text-sm font-semibold uppercase tracking-widest mb-4">
              <span>Leistungen</span>
              <ArrowRight className="w-3.5 h-3.5" />
              <span>Glasreinigung</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Glasreinigung &
              <br className="hidden sm:block" />
              <span className="text-brand">Fensterreinigung Basel</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl leading-relaxed mb-6">
              Kristallklare Fenster – mit professionellem Kalkschutz gegen Basler
              Hartwasser. Streifenfrei, innen und aussen, für Privathaushalte und
              Gewerbeobjekte in Riehen, Allschwil und ganz Basel-Stadt.
            </p>

            {/* Kalkschutz badge */}
            <div className="inline-flex items-center gap-2 bg-brand/15 border border-brand/30 text-brand rounded-full px-4 py-1.5 text-sm font-semibold mb-8">
              <ShieldCheck className="w-4 h-4" />
              Mit Kalkschutz-Versiegelung bis 8 Wochen
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/anfrage?service=glas" className="btn-primary">
                Kostenlose Offerte anfordern
              </Link>
              <Link href="/preise" className="btn-secondary">
                Preise ansehen
              </Link>
            </div>
          </div>
        </div>

        {/* Diagonal divider */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-12 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="section-container grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl border border-border bg-muted">
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-brand" />
              </div>
              <h3 className="font-semibold text-navy mb-1">{title}</h3>
              <p className="text-sm text-foreground/65 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEO CONTENT (Kalkschutz focus) ───────────────────────────────── */}
      <section className="bg-muted py-16">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2 space-y-5 text-foreground/75 leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy">
                Glasreinigung in Basel – und warum Kalkschutz entscheidend ist
              </h2>
              <p>
                Saubere Fenster lassen mehr Licht herein, verbessern das Raumklima und
                werten jedes Gebäude auf. D&apos;Namar bietet professionelle Glasreinigung
                für Privathaushalte und Unternehmen in Basel und Umgebung – in Riehen,
                Allschwil, Gundeldingen, St. Alban und dem gesamten Stadtkanton.
              </p>
              <p>
                Was uns von gewöhnlichen Fensterputzern unterscheidet: Wir arbeiten
                ausschliesslich mit <strong className="text-navy">osmotisch gereinigtem,
                vollentsalztem Wasser</strong>. Das bedeutet, dass nach dem Trocknen
                keinerlei Mineralrückstände auf der Glasscheibe verbleiben – das Ergebnis
                ist zu 100 % streifenfrei, auch ohne Abzieher von Hand.
              </p>
              <p>
                Besonders wichtig in Basel: Das Leitungswasser im Baselbiet und Basel-Stadt
                hat einen Kalkgehalt von bis zu 35 französischen Härtegraden. Das bedeutet,
                dass sich auf Fensterscheiben, Glasduschen und Glasfronten ohne regelmässige
                Pflege hartnäckige Kalkflecken bilden, die die Oberfläche dauerhaft schädigen
                können. Nach jeder Reinigung tragen wir auf Wunsch eine
                <strong className="text-navy"> Kalkschutz-Versiegelung</strong> auf, die das
                Glas bis zu acht Wochen lang vor neuen Ablagerungen schützt.
              </p>
              <p>
                Unsere Glasreinigung ist ideal für regelmässige Intervalle – monatlich,
                vierteljährlich oder nach Bedarf. Für Geschäftsgebäude und Liegenschaften
                bieten wir Wartungsverträge mit dokumentierten Einsatzprotokollen an.
                Von der Einzelvilla in Riehen bis zum Bürogebäude in Grossbasel –
                kontaktieren Sie uns für eine kostenlose Offerte.
              </p>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-brand uppercase tracking-widest">
                  Preisübersicht
                </h3>
                {[
                  { val: "ab CHF 8",   label: "pro Fenster (einseitig)" },
                  { val: "ab CHF 14",  label: "pro Fenster (beidseitig)" },
                  { val: "ab CHF 120", label: "Wohnung (bis 10 Fenster)" },
                  { val: "auf Anfrage", label: "Glasfronten & Gewerbe" },
                ].map(({ val, label }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-brand font-bold text-sm w-24 shrink-0 leading-snug">{val}</span>
                    <span className="text-sm text-foreground/60 leading-snug">{label}</span>
                  </div>
                ))}
                <Link href="/anfrage?service=glas" className="btn-primary w-full justify-center text-sm">
                  Offerte anfordern
                </Link>
              </div>
              <div className="bg-brand/8 border border-brand/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-4 h-4 text-brand shrink-0" />
                  <p className="text-sm font-bold text-navy">Kalkschutz-Versiegelung</p>
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  Bis zu 8 Wochen Schutz vor neuen Kalkablagerungen – mit
                  professioneller Versiegelung nach der Reinigung. Ideal
                  für Basler Hartwasser (bis 35 °fH).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TASKS ────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2 text-center">
              Was wir reinigen
            </h2>
            <p className="text-center text-foreground/60 mb-10 text-sm">
              Alle Glasflächen – von der Wohnung bis zur Gewerbefassade.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {TASKS.map((task) => (
                <li
                  key={task}
                  className="flex items-start gap-3 bg-muted rounded-xl px-4 py-3 border border-border shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground/80">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative bg-navy py-16 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 50%, #4caf82 0%, transparent 60%)",
          }}
        />
        <div className="section-container text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Streifenfreie Fenster mit Kalkschutz in Basel?
          </h2>
          <p className="text-white/65 mb-7 max-w-md mx-auto">
            Wir erstellen Ihnen eine kostenlose Offerte – für einmalige
            oder regelmässige Glasreinigung in Ihrem Quartier.
          </p>
          <Link href="/anfrage?service=glas" className="btn-primary text-base px-8 py-4">
            Kostenlose Offerte anfordern
          </Link>
        </div>
      </section>
    </>
  );
}
