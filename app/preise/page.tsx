import Link from "next/link";
import type { Metadata } from "next";
import {
  Home,
  Building2,
  PackageOpen,
  Layers,
  GlassWater,
  Warehouse,
  BadgeCheck,
  Info,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Preise & Tarife | Reinigungsdienst Basel – D'Namar",
  description:
    "Transparente Preise für alle Reinigungsleistungen in Basel. Haushaltsreinigung ab CHF 45/Std., Umzugsreinigung ab CHF 380, Büroreinigung ab CHF 40/Std. Kostenlose Offerte in 24 Stunden.",
  keywords: [
    "Reinigung Preise Basel",
    "Haushaltsreinigung Kosten Basel",
    "Umzugsreinigung Preis Basel",
    "Büroreinigung Tarif Basel",
    "Glasreinigung Kosten Basel",
  ],
};

/* ─── JSON-LD ────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  name: "D'Namar Reinigungsdienst Basel – Tarife",
  description:
    "Preisliste für professionelle Reinigungsleistungen in Basel und Umgebung.",
  priceCurrency: "CHF",
  eligibleRegion: {
    "@type": "City",
    name: "Basel",
    addressCountry: "CH",
  },
};

/* ─── Types ──────────────────────────────────────────────────────────────── */
type PriceRow = {
  service: string;
  detail: string;
  price: string;
  unit: string;
  highlight?: boolean;
};

type PriceSection = {
  id: string;
  category: string;
  Icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  description: string;
  rows: PriceRow[];
  note?: string;
  ctaLabel: string;
  ctaHref: string;
};

/* ─── Data ──────────────────────────────────────────────────────────────── */
const SECTIONS: PriceSection[] = [
  {
    id: "haushaltsreinigung",
    category: "Haushaltsreinigung",
    Icon: Home,
    tagline: "Privat",
    description:
      "Regelmässige Unterhaltsreinigung und Einmalreinigung für Privathaushalte in Basel.",
    rows: [
      {
        service: "Stundenweise Reinigung",
        detail: "Flexibel buchbar · Mindestdauer 2 Stunden",
        price: "CHF 45 – 55",
        unit: "/ Stunde",
      },
      {
        service: "1–2-Zimmer-Wohnung",
        detail: "Inkl. Bad, Küche und Böden",
        price: "ab CHF 180",
        unit: "/ Einsatz",
      },
      {
        service: "3–4-Zimmer-Wohnung",
        detail: "Inkl. Bad, Küche und Böden",
        price: "ab CHF 320",
        unit: "/ Einsatz",
        highlight: true,
      },
      {
        service: "5+ Zimmer / Einfamilienhaus",
        detail: "Inkl. Bad, Küche, Böden und Treppenhaus",
        price: "ab CHF 480",
        unit: "/ Einsatz",
      },
      {
        service: "Unterhaltsreinigung (monatlich)",
        detail: "Festes Team, bevorzugte Termine, wiederkehrender Auftrag",
        price: "ab CHF 160",
        unit: "/ Monat",
      },
    ],
    ctaLabel: "Haushaltsreinigung anfragen",
    ctaHref: "/anfrage?service=haushaltsreinigung",
  },
  {
    id: "umzugsreinigung",
    category: "Umzugsreinigung",
    Icon: PackageOpen,
    tagline: "Mit Abgabegarantie",
    description:
      "Professionelle Endreinigung für Wohnungsübergaben – mit Abgabegarantie bis zur erfolgreichen Abnahme.",
    rows: [
      {
        service: "1–2-Zimmer-Wohnung",
        detail: "Inkl. Backofen, Kühlschrank, Bad und alle Böden",
        price: "ab CHF 380",
        unit: "/ Auftrag",
      },
      {
        service: "3–4-Zimmer-Wohnung",
        detail: "Inkl. Backofen, Kühlschrank, Bad und alle Böden",
        price: "ab CHF 580",
        unit: "/ Auftrag",
        highlight: true,
      },
      {
        service: "5+ Zimmer / Einfamilienhaus",
        detail: "Inkl. aller Oberflächen, Keller auf Anfrage",
        price: "ab CHF 780",
        unit: "/ Auftrag",
      },
      {
        service: "Abgabegarantie",
        detail: "Kostenlose Nachbesserung bis zur erfolgreichen Abnahme",
        price: "Inklusive",
        unit: "",
      },
    ],
    note:
      "Die Abgabegarantie gilt für alle Umzugsreinigungen: Falls die Liegenschaftsverwaltung Beanstandungen hat, kommen wir kostenlos nochmals.",
    ctaLabel: "Umzugsreinigung anfragen",
    ctaHref: "/anfrage?service=umzugsreinigung",
  },
  {
    id: "bueroreinigung",
    category: "Büro- & Gewerbereinigung",
    Icon: Building2,
    tagline: "Gewerbe",
    description:
      "Unterhaltsreinigung für Büros, Arztpraxen, Fitnessstudios und Ladengeschäfte in Basel.",
    rows: [
      {
        service: "Stundenweise Reinigung",
        detail: "Gewerbe & Büroflächen · Mindestdauer 2 Stunden",
        price: "CHF 40 – 50",
        unit: "/ Stunde",
      },
      {
        service: "Büro bis 100 m²",
        detail: "Wöchentliche Unterhaltsreinigung, festes Team",
        price: "ab CHF 280",
        unit: "/ Monat",
      },
      {
        service: "Büro 100–250 m²",
        detail: "Wöchentliche Unterhaltsreinigung, festes Team",
        price: "ab CHF 480",
        unit: "/ Monat",
        highlight: true,
      },
      {
        service: "Praxisreinigung",
        detail: "Nach hygienischen Anforderungen · Protokoll auf Anfrage",
        price: "auf Anfrage",
        unit: "",
      },
      {
        service: "Grosse Gewerbefläche 250+ m²",
        detail: "Individuelles Angebot nach Besichtigung",
        price: "auf Anfrage",
        unit: "",
      },
    ],
    ctaLabel: "Büroreinigung anfragen",
    ctaHref: "/anfrage?service=bueroreinigung",
  },
  {
    id: "glasreinigung",
    category: "Glasreinigung",
    Icon: GlassWater,
    tagline: "Privat & Gewerbe",
    description:
      "Streifenfreie Fenster und Glasfronten für Privathaushalte und Unternehmen – mit Kalkschutzversiegelung.",
    rows: [
      {
        service: "Fensterfläche (pro m²)",
        detail: "Innen & aussen, streifenfrei · Mindestauftrag CHF 90",
        price: "ab CHF 5",
        unit: "/ m²",
      },
      {
        service: "Privathaushalt (Pauschal)",
        detail: "Bis 10 Standardfenster, inkl. Rahmen",
        price: "ab CHF 90",
        unit: "/ Einsatz",
      },
      {
        service: "Gewerbliche Glasfront",
        detail: "Schaufenster, Bürogebäude – Preis nach Fläche",
        price: "ab CHF 150",
        unit: "/ Einsatz",
        highlight: true,
      },
      {
        service: "Kalkschutzversiegelung",
        detail: "Schützt bis zu 8 Wochen gegen Neuablagerungen",
        price: "ab CHF 30",
        unit: "/ Einsatz",
      },
    ],
    ctaLabel: "Glasreinigung anfragen",
    ctaHref: "/anfrage?service=glasreinigung",
  },
  {
    id: "treppenhausreinigung",
    category: "Treppenhausreinigung",
    Icon: Layers,
    tagline: "Verwaltungen",
    description:
      "Gepflegte Eingangsbereiche und Treppenhäuser – zuverlässig, diskret und nach Vereinbarung.",
    rows: [
      {
        service: "Wöchentliche Reinigung",
        detail: "Bis 4 Stockwerke · Böden, Geländer, Briefkastenanlage",
        price: "ab CHF 80",
        unit: "/ Einsatz",
      },
      {
        service: "Zweiwöchentliche Reinigung",
        detail: "Bis 4 Stockwerke · Böden, Geländer, Briefkastenanlage",
        price: "ab CHF 100",
        unit: "/ Einsatz",
        highlight: true,
      },
      {
        service: "Monatliche Grundreinigung",
        detail: "Inkl. Fenster Treppenhaus und Keller",
        price: "ab CHF 180",
        unit: "/ Einsatz",
      },
      {
        service: "Mehrfamilienhäuser (6+ Parteien)",
        detail: "Individuelles Angebot für Verwaltungen",
        price: "auf Anfrage",
        unit: "",
      },
    ],
    ctaLabel: "Treppenhausreinigung anfragen",
    ctaHref: "/anfrage?service=treppenhausreinigung",
  },
  {
    id: "gewerbereinigung",
    category: "Industrie- & Spezialreinigung",
    Icon: Warehouse,
    tagline: "Auf Anfrage",
    description:
      "Tiefenreinigung, Bauendreinigung und Sonderreinigungen nach Renovation oder Bau.",
    rows: [
      {
        service: "Bauendreinigung",
        detail: "Nach Renovation oder Neubau · Inkl. Fenster & Böden",
        price: "ab CHF 400",
        unit: "/ Auftrag",
      },
      {
        service: "Tiefenreinigung Küche",
        detail: "Backofen, Herdplatten, Dunstabzug, Kalkentfernung",
        price: "ab CHF 120",
        unit: "/ Küche",
      },
      {
        service: "Teppich- & Polsterreinigung",
        detail: "Nassextraktion oder Trockenreinigung je nach Material",
        price: "ab CHF 4",
        unit: "/ m²",
      },
      {
        service: "Grossbaustellen / Industrieanlagen",
        detail: "Besichtigung erforderlich · Offerte innert 48 Std.",
        price: "auf Anfrage",
        unit: "",
        highlight: true,
      },
    ],
    ctaLabel: "Spezialreinigung anfragen",
    ctaHref: "/anfrage?service=gewerbereinigung",
  },
];

const ALWAYS_INCLUDED = [
  "Alle Reinigungsmittel & Maschinen inklusive",
  "Geschultes und versichertes Personal",
  "Feste Ansprechperson für jeden Auftrag",
  "Flexible Terminplanung nach Ihren Wünschen",
  "Kostenlose Offerte innert 24 Stunden",
  "Kalkschutz-Expertise für Basler Leitungswasser",
];

/* ─── Sub-component: Price Table ─────────────────────────────────────────── */
function PriceTable({ section }: { section: PriceSection }) {
  const { category, Icon, tagline, description, rows, note, ctaLabel, ctaHref } = section;

  return (
    <article className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between px-6 py-5 border-b border-border">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
            <Icon className="w-5 h-5 text-brand" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold text-navy">{category}</h2>
              <span className="rounded-full bg-brand/10 text-brand text-xs font-semibold px-2.5 py-0.5">
                {tagline}
              </span>
            </div>
            <p className="text-sm text-foreground/55 mt-0.5 leading-snug">{description}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted border-b border-border text-foreground/45 text-xs uppercase tracking-wider">
              <th className="text-left px-6 py-3 font-semibold w-2/5">Leistung</th>
              <th className="text-left px-6 py-3 font-semibold hidden md:table-cell">Details</th>
              <th className="text-right px-6 py-3 font-semibold whitespace-nowrap">Preis</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr
                key={row.service}
                className={`transition-colors ${
                  row.highlight
                    ? "bg-brand/[0.03] hover:bg-brand/[0.06]"
                    : "hover:bg-muted/50"
                }`}
              >
                <td className="px-6 py-4">
                  <span className={`font-medium ${row.highlight ? "text-navy" : "text-navy/90"}`}>
                    {row.service}
                  </span>
                  {row.highlight && (
                    <span className="ml-2 inline-block rounded-full bg-brand/15 text-brand text-[10px] font-bold px-2 py-0.5 align-middle">
                      Beliebt
                    </span>
                  )}
                  {/* Show detail below name on mobile */}
                  <p className="md:hidden text-xs text-foreground/50 mt-0.5 font-normal">{row.detail}</p>
                </td>
                <td className="px-6 py-4 text-foreground/55 hidden md:table-cell leading-snug">
                  {row.detail}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <span
                    className={`font-bold text-base ${
                      row.price === "Inklusive"
                        ? "text-brand"
                        : row.price === "auf Anfrage"
                        ? "text-foreground/40"
                        : "text-navy"
                    }`}
                  >
                    {row.price}
                  </span>
                  {row.unit && (
                    <span className="text-foreground/40 text-xs ml-1">{row.unit}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note + CTA footer */}
      <div className="px-6 py-5 border-t border-border bg-muted/40 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {note ? (
          <div className="flex items-start gap-2 text-xs text-foreground/55 leading-relaxed max-w-lg">
            <BadgeCheck className="w-4 h-4 text-brand shrink-0 mt-0.5" />
            <span>{note}</span>
          </div>
        ) : (
          <div className="flex items-start gap-2 text-xs text-foreground/45 leading-relaxed max-w-lg">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Preise exkl. MwSt. · Endpreis nach kostenloser Offerte.</span>
          </div>
        )}

        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 rounded-full bg-navy text-white text-sm font-semibold px-5 py-2.5 hover:bg-navy-light transition-colors shrink-0"
        >
          {ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function PreisePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-navy pt-28 pb-20 overflow-hidden relative">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 90% 20%, #4caf82 0%, transparent 50%)",
          }}
        />
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand font-semibold mb-5">
              Transparenz & Fairness
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Klare Preise.
              <br />
              <span className="text-brand">Keine versteckten Kosten.</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl mb-8">
              Alle Tarife auf einen Blick – von der wöchentlichen Haushaltsreinigung bis zur
              Bauendreinigung. Der genaue Preis richtet sich nach Grösse, Zustand und
              Anforderungen Ihres Objekts. Wir erstellen Ihnen in 24 Stunden eine
              kostenlose, unverbindliche Offerte.
            </p>

            {/* Quick jumps */}
            <div className="flex flex-wrap gap-2">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 text-xs text-white/75 font-medium"
                >
                  {s.category}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Diagonal divider */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-12 bg-muted"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </section>

      {/* ── PRICE TABLES ──────────────────────────────────────────────────── */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="section-container space-y-8">
          {SECTIONS.map((section) => (
            <div key={section.id} id={section.id}>
              <PriceTable section={section} />
            </div>
          ))}
        </div>
      </section>

      {/* ── ALWAYS INCLUDED ───────────────────────────────────────────────── */}
      <section className="bg-white py-16 border-t border-border">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-brand font-semibold text-sm uppercase tracking-widest">
                Immer dabei
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-navy">
                Im Preis inbegriffen
              </h2>
              <p className="mt-3 text-foreground/55 text-sm max-w-lg mx-auto">
                Bei jedem Auftrag – egal ob einmalig oder regelmässig – sind folgende
                Leistungen ohne Aufpreis inklusive.
              </p>
            </div>

            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ALWAYS_INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border bg-muted px-5 py-4 text-sm text-foreground/75 leading-snug"
                >
                  <svg
                    className="w-4 h-4 text-brand mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ────────────────────────────────────────────────────── */}
      <section className="bg-muted py-10 border-t border-border">
        <div className="section-container">
          <div className="max-w-3xl mx-auto flex gap-3 p-5 rounded-xl border border-border bg-white text-sm text-foreground/60 leading-relaxed">
            <Info className="w-5 h-5 text-foreground/35 shrink-0 mt-0.5" />
            <p>
              <strong className="text-foreground/75 font-semibold">Hinweis:</strong>{" "}
              Alle Preise sind Richtpreise und verstehen sich exkl. MwSt. Der endgültige
              Preis wird nach einer kostenlosen Besichtigung oder einer detaillierten
              schriftlichen Anfrage individuell festgelegt. Massgeblich ist ausschliesslich
              das schriftlich bestätigte Angebot. D&apos;Namar behält sich das Recht vor,
              die Tarife jederzeit anzupassen.
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="relative bg-navy py-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 75% 50%, #4caf82 0%, transparent 55%)",
          }}
        />
        <div className="section-container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1 text-sm text-brand font-semibold mb-5">
              Kostenlos & unverbindlich
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Preis für Ihr Objekt berechnen lassen?
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              Füllen Sie das Formular aus – wir melden uns innerhalb von 24 Stunden mit
              einer massgeschneiderten Offerte für Ihre Situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/anfrage" className="btn-primary text-base px-8 py-4">
                Kostenlose Offerte anfordern
              </Link>
              <a
                href="tel:+41792527557"
                className="btn-secondary text-base px-8 py-4"
              >
                +41 79 252 75 57
              </a>
            </div>
            <p className="mt-6 text-white/35 text-xs">
              Mo–Fr 08–18 Uhr · Sa 09–14 Uhr · Antwort in 24 Stunden
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
