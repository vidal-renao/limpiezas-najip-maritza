import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  CheckCircle2,
  ArrowRight,
  Clock,
  ShieldCheck,
  CalendarCheck,
  BarChart3,
  Stethoscope,
  Dumbbell,
  ShoppingBag,
  Building2,
  Droplets,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Büroreinigung Basel | Professionelle Reinigung für Unternehmen – ab CHF 40/Std.",
  description:
    "Professionelle Büroreinigung in Basel für Büros, Arztpraxen und Gewerbe. Diskret, ausserhalb der Arbeitszeiten, mit Kalkschutz in Sanitäranlagen. Kostenlose Offerte in 24 Stunden.",
};

/* ─── JSON-LD ─────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Büroreinigung Basel",
  description:
    "Professionelle Büroreinigung für Unternehmen, Arztpraxen und Gewerbe in Basel – diskret, zuverlässig und ausserhalb der Geschäftszeiten.",
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
      price: "40",
      priceCurrency: "CHF",
      unitText: "Stunde",
    },
  },
};

/* ─── Data ────────────────────────────────────────────────────────────────── */
const TASKS = [
  "Schreibtische, Bildschirme & Tastaturen desinfizieren",
  "Böden saugen & feucht wischen",
  "Küche & Pausenraum reinigen",
  "Sanitäranlagen desinfizieren & Kalkschutz auftragen",
  "Papierkorb leeren & Müll entsorgen",
  "Empfangsbereich & Wartezimmer pflegen",
  "Konferenzräume nach Bedarf",
  "Fenster & Glastrennwände streifenfrei",
  "Türgriffe & Lichtschalter desinfizieren",
  "Treppenhäuser & Gemeinschaftsflächen",
  "Tiefenreinigung nach Vereinbarung",
  "Reinigungsnachweis auf Wunsch",
];

const BENEFITS = [
  {
    icon: Clock,
    title: "Ausserhalb der Bürozeiten",
    desc: "Wir reinigen früh morgens, abends oder am Wochenende – damit Ihr Betrieb nicht unterbrochen wird.",
  },
  {
    icon: ShieldCheck,
    title: "Diskret & versichert",
    desc: "Unser Team ist verschwiegenheitsverpflichtet, vollständig versichert und mit Referenzen geprüft.",
  },
  {
    icon: CalendarCheck,
    title: "Fixer Reinigungsrhythmus",
    desc: "Wöchentlich, täglich oder nach Bedarf – wir passen uns Ihrem Betriebskalender an.",
  },
  {
    icon: BarChart3,
    title: "Transparente Abrechnung",
    desc: "Monatliche Rechnung, keine versteckten Kosten, auf Wunsch mit Reinigungsprotokoll.",
  },
];

const SECTORS = [
  { icon: Building2,   label: "Büros & Open Spaces" },
  { icon: Stethoscope, label: "Arztpraxen & Zahnarztpraxen" },
  { icon: Dumbbell,    label: "Fitnesscenters" },
  { icon: ShoppingBag, label: "Ladengeschäfte & Showrooms" },
];

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function BueroreinigungPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy pt-28 pb-24 overflow-hidden min-h-[520px]">
        <Image
          src="/images/Buero-768x512.jpg"
          alt="Büroreinigung Basel – saubere Büros in Gundeldingen und Grossbasel"
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
              <span>Büroreinigung</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Büroreinigung Basel
              <br className="hidden sm:block" />
              <span className="text-brand">für Unternehmen</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl leading-relaxed mb-8">
              Ein sauberes Arbeitsumfeld steigert Produktivität, hinterlässt einen
              professionellen Eindruck und schützt die Gesundheit Ihrer Mitarbeitenden.
              D&apos;Namar übernimmt das zuverlässig – in Ihrem Rhythmus, ausserhalb der
              Geschäftszeiten.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/anfrage?service=buero" className="btn-primary">
                Kostenlose B2B-Offerte anfordern
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

      {/* ── SECTORS ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 border-b border-border">
        <div className="section-container">
          <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest text-center mb-6">
            Wir reinigen für
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {SECTORS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-border bg-muted text-center"
              >
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand" />
                </div>
                <span className="text-sm font-semibold text-navy">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
      <section className="bg-muted py-16">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2 space-y-5 text-foreground/75 leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy">
                Professionelle Büroreinigung in Basel – diskret, pünktlich, verlässlich
              </h2>
              <p>
                Ihr Betrieb verdient ein Arbeitsumfeld, das Professionalität ausstrahlt –
                jeden Tag, ohne Ausnahme. D&apos;Namar Reinigungsdienst bietet Unternehmen
                in Basel eine auf Ihren Betrieb abgestimmte Büroreinigung an, die sich
                nahtlos in Ihren Tagesablauf einfügt. Ob im Gundeldingen-Quartier,
                in Grossbasel, in St. Alban oder in Kleinbasel – wir kennen die Basler
                Gewerbeimmobilien und arbeiten ausschliesslich ausserhalb Ihrer Geschäftszeiten.
              </p>
              <p>
                Unsere Teams reinigen frühmorgens vor dem ersten Meeting, abends nach
                Büroschluss oder am Wochenende. Jeder Einsatz wird mit professionellen
                Reinigungsmitteln durchgeführt, die auch empfindliche Oberflächen und
                moderne Büroausstattung schonen. Auf Wunsch erstellen wir nach jedem
                Einsatz ein Reinigungsprotokoll – besonders hilfreich für Arztpraxen
                und Institutionen mit erhöhten Hygieneanforderungen.
              </p>
              <p>
                Gerade in Basler Gebäuden ist der Kalkgehalt des Wassers besonders hoch.
                In Sanitäranlagen, Küchen und Pausenräumen setzen wir deshalb auf wirksamen
                <strong className="text-navy"> Kalkschutz</strong>: Unsere speziellen
                Entkalkungsmittel und Schutzversiegelungen verlängern die Lebensdauer
                Ihrer Armaturen und Keramikflächen deutlich und reduzieren den
                Reinigungsaufwand langfristig.
              </p>
              <p>
                Was D&apos;Namar von anderen unterscheidet: Sie erhalten stets dasselbe
                vertraute Team, das Ihren Betrieb kennt, Ihre Abläufe respektiert und
                diskret agiert. Mit über 10 Jahren Erfahrung in Basel und mehr als 500
                zufriedenen Kunden – von der Einzelpraxis in Riehen bis zum Open-Space
                in Grossbasel – sind wir Ihr verlässlicher Partner für Sauberkeit auf
                höchstem Niveau.
              </p>
            </div>

            {/* Sidebar stats */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-5">
              <h3 className="text-sm font-bold text-brand uppercase tracking-widest">
                Auf einen Blick
              </h3>
              {[
                { val: "ab CHF 40", label: "pro Stunde" },
                { val: "24 Std.",   label: "Antwortzeit garantiert" },
                { val: "10+",       label: "Jahre Erfahrung in Basel" },
                { val: "500+",      label: "Zufriedene Kunden" },
              ].map(({ val, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-brand font-bold text-sm w-20 shrink-0">{val}</span>
                  <span className="text-sm text-foreground/60">{label}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-border">
                <div className="flex items-start gap-2">
                  <Droplets className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    <strong className="text-navy">Kalkschutz inklusive</strong> für alle
                    Sanitäranlagen – besonders wirksam bei Basler Hartwasser.
                  </p>
                </div>
              </div>
              <Link
                href="/anfrage?service=buero"
                className="btn-primary w-full justify-center text-sm"
              >
                Jetzt Offerte anfordern
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="section-container grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl border border-border bg-muted shadow-sm">
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-brand" />
              </div>
              <h3 className="font-semibold text-navy mb-1">{title}</h3>
              <p className="text-sm text-foreground/65 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TASKS ────────────────────────────────────────────────────────── */}
      <section className="bg-muted py-16">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2 text-center">
              Leistungsumfang
            </h2>
            <p className="text-center text-foreground/60 mb-10 text-sm">
              Standardleistungen – individuell auf Ihren Betrieb anpassbar.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {TASKS.map((task) => (
                <li
                  key={task}
                  className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 border border-border"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground/80">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── PRICE TEASER ─────────────────────────────────────────────────── */}
      <section className="bg-white py-12 border-t border-border">
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
          <div>
            <p className="text-sm text-foreground/50 uppercase tracking-wide font-semibold mb-1">
              Richtpreis Gewerbe
            </p>
            <p className="text-4xl font-bold text-navy">
              ab CHF 40<span className="text-xl font-normal text-foreground/50"> / Std.</span>
            </p>
            <p className="text-sm text-foreground/55 mt-1">Pauschalpreise nach Objekt auf Anfrage</p>
          </div>
          <Link href="/anfrage?service=buero" className="btn-primary shrink-0 text-base px-8 py-4">
            Kostenlose B2B-Offerte
          </Link>
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
            Professionelle Büroreinigung in Basel?
          </h2>
          <p className="text-white/65 mb-7 max-w-md mx-auto">
            Wir erstellen Ihnen ein massgeschneidertes B2B-Angebot – kostenlos
            und unverbindlich, Antwort innerhalb von 24 Stunden.
          </p>
          <Link href="/anfrage?service=buero" className="btn-primary text-base px-8 py-4">
            Kostenlose Offerte anfordern
          </Link>
        </div>
      </section>
    </>
  );
}
