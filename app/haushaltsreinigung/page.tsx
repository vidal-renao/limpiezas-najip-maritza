import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  ArrowRight,
  Sparkles,
  Droplets,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Haushaltsreinigung Basel | Professionelle Wohnungsreinigung ab CHF 45/Std.",
  description:
    "Professionelle Haushaltsreinigung in Basel – Gundeldingen, St. Alban, Riehen und Kleinbasel. Regelmässig oder einmalig, mit Kalkschutz für Badezimmer. Offerte in 24 Stunden.",
};

/* ─── JSON-LD ─────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Haushaltsreinigung Basel",
  description:
    "Professionelle Haushaltsreinigung und Wohnungsreinigung in Basel – regelmässig oder einmalig, diskret und zuverlässig.",
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
      price: "45",
      priceCurrency: "CHF",
      unitText: "Stunde",
    },
  },
};

/* ─── Data ────────────────────────────────────────────────────────────────── */
const TASKS = [
  "Staubsaugen & Bodenwischen aller Räume",
  "Küche reinigen inkl. Herd, Backofen & Arbeitsflächen",
  "Badezimmer & WC desinfizieren + Kalkschutz",
  "Spiegel & Glasflächen streifenfrei reinigen",
  "Möbel abstauben & Oberflächen wischen",
  "Schlafzimmer inkl. Bettenwechsel (auf Wunsch)",
  "Fensterbank & Heizungen abstauben",
  "Mülleimer leeren & Müll entsorgen",
  "Treppenhaus & Eingangsbereich (auf Wunsch)",
  "Balkon oder Terrasse reinigen (auf Wunsch)",
];

const BENEFITS = [
  {
    icon: Clock,
    title: "Flexibel & pünktlich",
    desc: "Wir richten uns nach Ihrem Zeitplan – einmalig, wöchentlich oder nach Bedarf.",
  },
  {
    icon: ShieldCheck,
    title: "Versichert & vertrauenswürdig",
    desc: "Unser Team ist vollständig versichert und arbeitet diskret in Ihrem Zuhause.",
  },
  {
    icon: Sparkles,
    title: "Professionelle Mittel",
    desc: "Wir bringen alle Reinigungsmittel und Geräte mit – keine Zusatzkosten.",
  },
  {
    icon: Star,
    title: "Persönliche Betreuung",
    desc: "Immer dieselbe Ansprechperson – für ein Vertrauensverhältnis, das bleibt.",
  },
];

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function HaushaltsreinigungPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy pt-28 pb-24 overflow-hidden min-h-[520px]">
        <Image
          src="/images/Boden-wischen-768x512.jpg"
          alt="Haushaltsreinigung Basel – Bodenreinigung in St. Alban und Gundeldingen"
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
              <span>Haushaltsreinigung</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Haushaltsreinigung
              <br className="hidden sm:block" />
              <span className="text-brand">in Basel</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl leading-relaxed mb-8">
              Entspannen Sie sich – wir übernehmen die Reinigung Ihres Zuhauses.
              Regelmässig oder einmalig, immer gründlich, pünktlich und diskret.
              In St. Alban, Gundeldingen, Riehen und ganz Basel.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/anfrage?service=haushalt" className="btn-primary">
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

      {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
      <section className="bg-muted py-16">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2 space-y-5 text-foreground/75 leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy">
                Ihre Zeit ist wertvoll – wir übernehmen die Reinigung
              </h2>
              <p>
                Eine saubere Wohnung schafft Wohlbefinden, spart Zeit und erhält den Wert
                Ihrer Immobilie. D&apos;Namar Reinigungsdienst bietet Privathaushalten in
                Basel eine verlässliche, massgeschneiderte Haushaltsreinigung – ob einmalig,
                wöchentlich oder nach Bedarf. Wir sind in allen Basler Quartieren aktiv:
                in St. Alban, Gundeldingen, Kleinbasel, Riehen und darüber hinaus.
              </p>
              <p>
                Unser Team reinigt Ihre Wohnung vollständig: Böden saugen und feucht
                wischen, Küche gründlich reinigen inklusive Herd und Backofen, Badezimmer
                und WC desinfizieren, Möbel abstauben und Glasflächen streifenfrei polieren.
                Wir bringen alle notwendigen Reinigungsmittel und Geräte selbst mit –
                keine versteckten Materialkosten.
              </p>
              <p>
                Besonderes Augenmerk legen wir auf Ihren Kalkschutz im Badezimmer.
                Basler Leitungswasser weist einen der höchsten Kalkanteile der Schweiz auf.
                Kalk setzt sich auf Armaturen, Duschkabinen, Badewannen und Fliesen ab und
                ist ohne die richtigen Mittel kaum zu entfernen. Wir verwenden professionelle
                <strong className="text-navy"> Entkalkungsmittel</strong> und tragen nach
                der Reinigung eine Schutzversiegelung auf – so bleibt Ihr Bad länger sauber
                und die Armaturen werden geschont.
              </p>
              <p>
                Was uns auszeichnet: Sie erhalten stets dieselbe Reinigungsperson, die
                Ihre Gewohnheiten kennt und respektiert. Das schafft Vertrauen – besonders
                wichtig, wenn wir in Ihrer Abwesenheit reinigen. Mit 4.9 Sternen Kundenbewertung
                und über 500 zufriedenen Haushalten in Basel stehen wir für Qualität,
                die man spürt.
              </p>
            </div>

            {/* Sidebar */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-5">
              <h3 className="text-sm font-bold text-brand uppercase tracking-widest">
                Preisübersicht
              </h3>
              {[
                { val: "ab CHF 45",  label: "pro Stunde" },
                { val: "ab CHF 180", label: "Kleine Wohnung (bis 60 m²)" },
                { val: "ab CHF 280", label: "Grosse Wohnung (bis 100 m²)" },
                { val: "24 Std.",    label: "Antwortzeit garantiert" },
              ].map(({ val, label }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-brand font-bold text-sm w-24 shrink-0 leading-snug">{val}</span>
                  <span className="text-sm text-foreground/60 leading-snug">{label}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-border">
                <div className="flex items-start gap-2">
                  <Droplets className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    <strong className="text-navy">Kalkschutz für Bad inklusive</strong> –
                    professionelle Versiegelung gegen Basler Hartwasser.
                  </p>
                </div>
              </div>
              <Link
                href="/anfrage?service=haushalt"
                className="btn-primary w-full justify-center text-sm"
              >
                Jetzt Offerte anfordern
              </Link>
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
              Standardleistungen – individuell anpassbar nach Ihren Wünschen.
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

      {/* ── PRICE TEASER ─────────────────────────────────────────────────── */}
      <section className="bg-muted py-12 border-t border-border">
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
          <div>
            <p className="text-sm text-foreground/55 uppercase tracking-wide font-semibold mb-1">
              Richtpreis
            </p>
            <p className="text-4xl font-bold text-navy">
              ab CHF 45<span className="text-xl font-normal text-foreground/50"> / Std.</span>
            </p>
            <p className="text-sm text-foreground/55 mt-1">
              Kleine Wohnung ab CHF 180 · Grosse Wohnung ab CHF 280
            </p>
          </div>
          <Link href="/anfrage?service=haushalt" className="btn-primary shrink-0 text-base px-8 py-4">
            Kostenlose Offerte anfordern
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
            Bereit für ein saubereres Zuhause in Basel?
          </h2>
          <p className="text-white/65 mb-7 max-w-md mx-auto">
            Kontaktieren Sie uns – wir erstellen Ihnen innerhalb von 24 Stunden
            eine kostenlose, unverbindliche Offerte.
          </p>
          <Link href="/anfrage?service=haushalt" className="btn-primary text-base px-8 py-4">
            Kostenlose Offerte anfordern
          </Link>
        </div>
      </section>
    </>
  );
}
