import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  CheckCircle2,
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  ClipboardList,
  Home,
  Droplets,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Umzugsreinigung Basel | Endreinigung mit Abgabegarantie",
  description:
    "Professionelle Umzugsreinigung & Endreinigung in Basel mit Abgabegarantie. Kalkentfernung in Bad und Küche – wir erfüllen die Anforderungen Ihrer Verwaltung. Kostenlose Offerte.",
};

/* ─── JSON-LD ─────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Umzugsreinigung Basel",
  description:
    "Professionelle Umzugsreinigung und Endreinigung in Basel mit Abgabegarantie. Vollständige Reinigung nach Verwaltungsstandard inklusive Kalkentfernung.",
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
      price: "350",
      priceCurrency: "CHF",
      unitText: "Einsatz",
    },
  },
};

/* ─── Data ────────────────────────────────────────────────────────────────── */
const TASKS = [
  "Alle Räume feucht durchgereinigt",
  "Küche: Herd, Backofen, Dunstabzug, Schränke innen & aussen",
  "Badezimmer & WC: Kalkentfernung & Desinfektion",
  "Fenster innen & aussen (Rahmen & Scheiben)",
  "Wandschränke und Einbauschränke innen",
  "Böden: saugen, wischen, Übergänge säubern",
  "Balkon oder Terrasse reinigen",
  "Keller & Kellerraum auf Wunsch",
  "Steckdosen, Lichtschalter & Türrahmen",
  "Heizungsrippen entstauben",
  "Briefkasten & Eingangsbereich",
  "Schlüsselübergabe-Vorbereitung",
];

const STEPS = [
  {
    icon: CalendarClock,
    title: "Termin buchen",
    desc: "Kontaktieren Sie uns – wir koordinieren den Termin passend zu Ihrer Abgabe.",
  },
  {
    icon: ClipboardList,
    title: "Abnahmeprotokoll prüfen",
    desc: "Wir kennen die Anforderungen der Basler Verwaltungen und richten uns danach.",
  },
  {
    icon: Home,
    title: "Gründliche Endreinigung",
    desc: "Unser Team reinigt die Wohnung nach Verwaltungsstandard – vollständig.",
  },
  {
    icon: BadgeCheck,
    title: "Abgabegarantie",
    desc: "Falls die Verwaltung Mängel feststellt, kommen wir kostenlos nochmals.",
  },
];

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function UmzugsreinigungPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy pt-28 pb-24 overflow-hidden min-h-[520px]">
        <Image
          src="/images/Herd-768x512.jpg"
          alt="Umzugsreinigung Basel – Küchen- und Endreinigung mit Abgabegarantie in Gundeldingen"
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
              <span>Umzugsreinigung</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Umzugsreinigung &
              <br className="hidden sm:block" />
              <span className="text-brand">Endreinigung Basel</span>
            </h1>

            <div className="inline-flex items-center gap-2 bg-brand/15 border border-brand/30 text-brand rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              <BadgeCheck className="w-4 h-4" />
              Mit Abgabegarantie
            </div>

            <p className="text-white/70 text-lg max-w-xl leading-relaxed mb-8">
              Stressfreie Wohnungsübergabe – garantiert. Wir reinigen Ihre Wohnung nach
              Verwaltungsstandard und kommen bei Mängeln kostenlos nochmals.
              In Gundeldingen, Kleinbasel, Dreispitz und ganz Basel.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/anfrage?service=umzug" className="btn-primary">
                Jetzt Termin anfragen
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

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="section-container">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-10">
            So funktioniert es
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="relative p-6 rounded-2xl border border-border bg-muted">
                <span className="absolute top-4 right-4 text-2xl font-black text-border select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand" />
                </div>
                <h3 className="font-semibold text-navy mb-1">{title}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed">{desc}</p>
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
                Endreinigung in Basel – perfekt für die Wohnungsübergabe
              </h2>
              <p>
                Ein Umzug ist stressig genug – die Endreinigung muss es nicht sein. D&apos;Namar
                übernimmt die komplette Umzugsreinigung Ihrer Wohnung in Basel und stellt sicher,
                dass Sie die Schlüssel ohne Beanstandungen abgeben können. Unsere Mitarbeitenden
                kennen die Anforderungen der Basler Verwaltungen genau – ob in Gundeldingen,
                Kleinbasel, Dreispitz oder St. Alban.
              </p>
              <p>
                Die Umzugsreinigung umfasst alle Räume: Wohnzimmer, Schlafzimmer, Küche,
                Badezimmer, WC, Keller und Balkon. Besonders die Küche und das Badezimmer
                erfordern bei der Wohnungsabgabe in Basel besondere Sorgfalt. Herd, Backofen
                und Dunstabzug müssen vollständig entfettet sein. Im Bad entfernen wir
                hartnäckige Kalkablagerungen an Armaturen, Dusche und Badewanne mit professionellen
                <strong className="text-navy"> Entkalkungsmitteln</strong> – ein Muss in Basel,
                wo das Leitungswasser besonders kalkhaltig ist.
              </p>
              <p>
                Unser grösster Vorteil: die <strong className="text-navy">Abgabegarantie</strong>.
                Falls die Verwaltung oder Hausverwaltung bei der Wohnungsabnahme Mängel feststellt,
                kommen wir kostenlos nochmals und reinigen nach – bis die Abnahme erfolgreich ist.
                Das gibt Ihnen die Sicherheit, die Sie beim Umzug brauchen.
              </p>
              <p>
                Unser Team kann kurzfristig reagieren und koordiniert sich direkt mit Ihrer
                Verwaltung oder Ihrem Makler. Wir sind Ihr zuverlässiger Partner für die
                stressfreie Wohnungsübergabe in Basel – mit über 10 Jahren Erfahrung und
                mehr als 500 erfolgreichen Wohnungsabgaben im ganzen Stadtkanton.
              </p>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-brand uppercase tracking-widest">
                  Preisübersicht
                </h3>
                {[
                  { val: "ab CHF 350", label: "2-Zi-Wohnung (bis 50 m²)" },
                  { val: "ab CHF 480", label: "3-Zi-Wohnung (bis 80 m²)" },
                  { val: "ab CHF 650", label: "4-Zi-Wohnung (bis 110 m²)" },
                ].map(({ val, label }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-brand font-bold text-sm w-24 shrink-0 leading-snug">{val}</span>
                    <span className="text-sm text-foreground/60 leading-snug">{label}</span>
                  </div>
                ))}
                <Link href="/anfrage?service=umzug" className="btn-primary w-full justify-center text-sm">
                  Termin anfragen
                </Link>
              </div>
              <div className="bg-brand/8 border border-brand/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-4 h-4 text-brand shrink-0" />
                  <p className="text-sm font-bold text-navy">Kalkentfernung inklusive</p>
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  Hartnäckige Kalkablagerungen in Bad und Küche werden mit professionellen
                  Entkalkungsmitteln vollständig entfernt – für die bestandene Wohnungsabnahme.
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
              Leistungsumfang
            </h2>
            <p className="text-center text-foreground/60 mb-10 text-sm">
              Alle Punkte nach Abnahmeprotokoll – individuell erweiterbar.
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
            Wohnung abgeben ohne Stress?
          </h2>
          <p className="text-white/65 mb-7 max-w-md mx-auto">
            Wir übernehmen die komplette Endreinigung – pünktlich zum Übergabetermin,
            mit Abgabegarantie. Kostenlose Offerte in 24 Stunden.
          </p>
          <Link href="/anfrage?service=umzug" className="btn-primary text-base px-8 py-4">
            Kostenlose Offerte anfordern
          </Link>
        </div>
      </section>
    </>
  );
}
