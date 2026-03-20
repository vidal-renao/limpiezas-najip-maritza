import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Building,
  PhoneCall,
  FileText,
  Droplets,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Treppenhausreinigung Basel | Gemeinschaftsflächen für Verwaltungen",
  description:
    "Zuverlässige Treppenhausreinigung in Basel für Verwaltungen, Eigentümer und Wohngemeinschaften. Mit Kalkschutz in Liften und Fliesen – in Gundeldingen, Riehen und ganz Basel.",
};

/* ─── JSON-LD ─────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Treppenhausreinigung Basel",
  description:
    "Regelmässige Treppenhausreinigung für Liegenschaften, Verwaltungen und Hausgemeinschaften in Basel – zuverlässig, diskret und dokumentiert.",
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
      price: "80",
      priceCurrency: "CHF",
      unitText: "Einsatz",
    },
  },
};

/* ─── Data ────────────────────────────────────────────────────────────────── */
const TASKS = [
  "Treppenhaus kehren & feucht wischen",
  "Geländer & Handläufe desinfizieren",
  "Briefkastenanlage & Eingangsbereich",
  "Klingeltableau & Gegensprechanlage reinigen",
  "Kellertreppenhaus & Kellergang",
  "Lift innen reinigen & desinfizieren",
  "Fenster & Fensterbänke im Treppenhaus",
  "Leuchtmittel & Lichtschalter abstauben",
  "Türen, Rahmen & Türgriffe",
  "Gemeinschaftskeller & Waschküche",
  "Aussenbereich / Eingang kehren",
  "Entsorgung von Kleinabfällen",
];

const FEATURES = [
  {
    icon: RefreshCw,
    title: "Regelmässiger Rhythmus",
    desc: "Wöchentlich, zweiwöchentlich oder monatlich – wir passen uns Ihrem Vertrag an.",
  },
  {
    icon: Building,
    title: "Für Verwaltungen",
    desc: "Wir arbeiten mit Liegenschaftsverwaltungen und Eigentümern in ganz Basel zusammen.",
  },
  {
    icon: PhoneCall,
    title: "Verlässliche Kommunikation",
    desc: "Schnelle Reaktion bei Problemen – immer erreichbar und unkompliziert.",
  },
  {
    icon: FileText,
    title: "Reinigungsnachweis",
    desc: "Auf Wunsch dokumentieren wir jeden Einsatz mit einem Nachweis für Ihre Unterlagen.",
  },
];

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function TreppenhausreinigungPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy pt-28 pb-24 overflow-hidden min-h-[520px]">
        <Image
          src="/images/Treppe-Vorraum-768x511.jpg"
          alt="Treppenhausreinigung Basel – gepflegte Gemeinschaftsflächen in Gundeldingen und Riehen"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />

        <div className="section-container relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-brand text-sm font-semibold uppercase tracking-widest mb-4">
              <span>Leistungen</span>
              <ArrowRight className="w-3.5 h-3.5" />
              <span>Treppenhausreinigung</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Treppenhausreinigung
              <br className="hidden sm:block" />
              <span className="text-brand">in Basel</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl leading-relaxed mb-8">
              Ein gepflegtes Treppenhaus hinterlässt einen guten ersten Eindruck und
              erhöht den Wohnwert Ihrer Liegenschaft. D&apos;Namar übernimmt die
              regelmässige Pflege Ihrer Gemeinschaftsflächen – in allen Basler Quartieren,
              zuverlässig und nach Standard.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/anfrage?service=treppenhaus" className="btn-primary">
                Kostenlose Offerte anfordern
              </Link>
              <Link href="/kontakt" className="btn-secondary">
                Direkt kontaktieren
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

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="section-container grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
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

      {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
      <section className="bg-muted py-16">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2 space-y-5 text-foreground/75 leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy">
                Treppenhausreinigung für Basler Liegenschaften – diskret und verlässlich
              </h2>
              <p>
                Das Treppenhaus ist das Aushängeschild jeder Liegenschaft. Ein gepflegter
                Eingangsbereich signalisiert Wertschätzung für die Mieterinnen und Mieter
                und trägt wesentlich zur Wohnqualität bei. D&apos;Namar übernimmt die
                regelmässige Treppenhausreinigung für Verwaltungen, Eigentümer und
                Hausgemeinschaften in ganz Basel – in Gundeldingen, Kleinbasel, St. Alban,
                Riehen, Allschwil und allen weiteren Quartieren des Stadtkantons.
              </p>
              <p>
                Unser Service umfasst alle Gemeinschaftsflächen: Treppen kehren und feucht
                wischen, Geländer und Handläufe desinfizieren, Briefkastenanlage und
                Eingangsbereich pflegen, Liftkabinen reinigen und desinfizieren sowie
                Fenster im Treppenhaus säubern. Wir passen uns Ihrem Rhythmus an –
                wöchentlich, zweiwöchentlich oder monatlich, je nach Anforderung der
                Liegenschaft.
              </p>
              <p>
                In Liftkabinen und Treppenhäusern mit Keramikfliesen setzt sich durch das
                kalkhaltige Basler Leitungswasser schnell ein unschöner Kalkfilm ab.
                Deshalb verwenden wir bei der Reinigung von Fliesen und
                Aufzugswänden gezielte <strong className="text-navy">Entkalkungsmittel</strong>
                {" "}und versiegeln auf Wunsch glatte Flächen mit einer
                Kalkschutzschicht – für ein länger anhaltendes Reinigungsergebnis.
              </p>
              <p>
                Für Liegenschaftsverwaltungen in Basel erstellen wir auf Wunsch nach jedem
                Einsatz ein digitales Reinigungsprotokoll – als Nachweis für Eigentümer und
                Mieter. Wir sind langjähriger Partner zahlreicher Basler Verwaltungen und
                verstehen die spezifischen Anforderungen an Gemeinschaftsflächen in
                Mehrfamilienhäusern, Gewerbeliegenschaften und Mischobjekten.
              </p>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-brand uppercase tracking-widest">
                  Preisübersicht
                </h3>
                {[
                  { val: "ab CHF 80",  label: "bis 3 Stockwerke" },
                  { val: "ab CHF 130", label: "bis 6 Stockwerke" },
                  { val: "ab CHF 200", label: "Grosse Liegenschaft" },
                  { val: "auf Anfrage", label: "Wartungsvertrag" },
                ].map(({ val, label }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-brand font-bold text-sm w-24 shrink-0 leading-snug">{val}</span>
                    <span className="text-sm text-foreground/60 leading-snug">{label}</span>
                  </div>
                ))}
                <Link href="/anfrage?service=treppenhaus" className="btn-primary w-full justify-center text-sm">
                  Offerte anfordern
                </Link>
              </div>
              <div className="bg-brand/8 border border-brand/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-4 h-4 text-brand shrink-0" />
                  <p className="text-sm font-bold text-navy">Kalkschutz für Lift & Fliesen</p>
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  Professionelle Entkalkung und Schutzversiegelung für Keramikfliesen
                  und Liftkabinen – ideal gegen Basler Hartwasser.
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
              Was ist inbegriffen?
            </h2>
            <p className="text-center text-foreground/60 mb-10 text-sm">
              Vollständige Pflege aller Gemeinschaftsbereiche – individuell buchbar.
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
            Treppenhaus-Pflege in Basel gesucht?
          </h2>
          <p className="text-white/65 mb-7 max-w-md mx-auto">
            Für Verwaltungen, Eigentümer und Hausgemeinschaften in allen Basler
            Quartieren – kostenlose Offerte innerhalb von 24 Stunden.
          </p>
          <Link href="/anfrage?service=treppenhaus" className="btn-primary text-base px-8 py-4">
            Kostenlose Offerte anfordern
          </Link>
        </div>
      </section>
    </>
  );
}
