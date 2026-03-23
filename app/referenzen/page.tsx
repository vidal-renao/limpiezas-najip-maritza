import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenzen & Kundenstimmen – D'Namar Reinigungsdienst Basel",
  description:
    "Lesen Sie echte Bewertungen von Kunden aus Basel. D'Namar überzeugt bei Haushaltsreinigung, Büroreinigung, Umzugsreinigung und mehr – mit 4.9 von 5 Sternen.",
  alternates: { canonical: "https://dnamar.ch/referenzen" },
};

/* ─── Types ─────────────────────────────────────────────────────────────── */
type Testimonial = {
  name: string;
  initials: string;
  avatarColor: string;
  location: string;
  service: string;
  rating: number;
  text: string;
  detail: string;
  date: string;
  featured?: boolean;
};

/* ─── Data ──────────────────────────────────────────────────────────────── */
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Petra M.",
    initials: "PM",
    avatarColor: "from-brand to-brand-dark",
    location: "Gundeldingen, Basel",
    service: "Haushaltsreinigung",
    rating: 5,
    text: "Ich bin seit über eineinhalb Jahren Kundin bei D'Namar und möchte das Team aus vollem Herzen empfehlen. Maritza kommt immer auf die Minute pünktlich, arbeitet unglaublich gründlich und meine Wohnung duftet danach nach frischer Sauberkeit. Was mich wirklich begeistert hat: Das hartnäckige Kalkproblem in meiner Dusche, mit dem ich jahrelang gekämpft hatte, war nach dem ersten Besuch Geschichte.",
    detail: "Wöchentliche Unterhaltsreinigung · 3.5-Zimmer-Wohnung",
    date: "März 2025",
    featured: true,
  },
  {
    name: "Reto W.",
    initials: "RW",
    avatarColor: "from-navy to-navy-light",
    location: "Bruderholz, Basel",
    service: "Büroreinigung",
    rating: 5,
    text: "Wir lassen unser Büro seit einem Jahr zweimal wöchentlich durch D'Namar reinigen – frühmorgens, bevor das Team kommt. Die Qualität ist konstant hoch, und wenn kurzfristig etwas angepasst werden muss, ist Nadjib immer erreichbar. Absolut unkompliziert.",
    detail: "Büroreinigung 2× wöchentlich · 12 Mitarbeitende",
    date: "Februar 2025",
  },
  {
    name: "Dr. med. A. Schäfer",
    initials: "AS",
    avatarColor: "from-slate-500 to-slate-700",
    location: "Innenstadt, Basel",
    service: "Praxisreinigung",
    rating: 5,
    text: "Für unsere Arztpraxis gelten strenge Hygieneanforderungen – tägliche Desinfektion aller Kontaktflächen, zugelassene Reinigungsmittel, lückenlose Dokumentation. D'Namar erfüllt diese Vorgaben ohne Abstriche. Ich kann den Dienst jeder Praxis in Basel empfehlen.",
    detail: "Tägliche Praxisreinigung · Basel Innenstadt",
    date: "Januar 2025",
  },
  {
    name: "Mireille F.",
    initials: "MF",
    avatarColor: "from-brand to-brand-dark",
    location: "St. Alban, Basel",
    service: "Umzugsreinigung",
    rating: 5,
    text: "Dank der Abgabegarantie konnte ich entspannt zum Übergabetermin gehen. Die Verwaltung hat die Wohnung ohne eine einzige Beanstandung abgenommen – nicht mal am Backofen, was ich selbst nie so hinbekommen hätte. Das ist professionelle Arbeit.",
    detail: "Endreinigung mit Abgabegarantie · 4.5-Zimmer-Wohnung",
    date: "Januar 2025",
  },
  {
    name: "Immobilien Basel AG",
    initials: "IB",
    avatarColor: "from-navy to-navy-light",
    location: "Matthäus, Basel",
    service: "Treppenhausreinigung",
    rating: 5,
    text: "Wir beauftragen D'Namar für vier unserer Liegenschaften in Basel. Die Qualität ist in jedem Objekt konstant hoch, die Kommunikation ist einfach und die Rechnungsstellung korrekt. Genau das, was eine Verwaltung braucht.",
    detail: "Wöchentliche Treppenhausreinigung · 4 Liegenschaften",
    date: "Dezember 2024",
  },
  {
    name: "Yusuf A.",
    initials: "YA",
    avatarColor: "from-slate-500 to-slate-700",
    location: "Riehen, Basel",
    service: "Glasreinigung",
    rating: 5,
    text: "Unsere grossen Panoramafenster zur Gartenseite sind nach dem Winter immer stark verschmutzt. D'Namar hat sie innen und aussen komplett streifenfrei gereinigt – schnell, sorgfältig und zu einem sehr fairen Preis. Beim nächsten Mal sofort wieder.",
    detail: "Jahres-Glasreinigung · Einfamilienhaus Riehen",
    date: "November 2024",
  },
];

const FEATURED = TESTIMONIALS.find((t) => t.featured)!;
const REST = TESTIMONIALS.filter((t) => !t.featured);

const AVG = (TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / TESTIMONIALS.length).toFixed(1);

/* ─── Sub-components ────────────────────────────────────────────────────── */
function Stars({ n, size = "md" }: { n: number; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <div className="flex gap-0.5" aria-label={`${n} von 5 Sternen`} role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`${cls} ${i < n ? "text-amber-400" : "text-border"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className={`w-11 h-11 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm`}
    >
      {initials}
    </div>
  );
}

function ServiceBadge({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-full bg-brand/10 text-brand text-xs font-semibold px-2.5 py-0.5">
      {label}
    </span>
  );
}

/* ─── JSON-LD ───────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://dnamar.ch/#business",
  name: "D'Namar Reinigungsdienst",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "6",
    bestRating: "5",
    worstRating: "1",
  },
  review: TESTIMONIALS.map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: "5" },
    reviewBody: t.text,
    datePublished: t.date,
  })),
};

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function ReferenzenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <section className="relative bg-navy pt-28 pb-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 40%, #4caf82 0%, transparent 55%)",
          }}
        />
        {/* Decorative oversized quote mark */}
        <div
          aria-hidden
          className="absolute right-8 top-16 text-white/5 font-serif leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(8rem, 20vw, 18rem)", lineHeight: 1 }}
        >
          &ldquo;
        </div>

        <div className="section-container relative z-10">
          <span className="inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand font-semibold mb-5">
            Was Kunden sagen
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            Referenzen &
            <br />
            <span className="text-brand">Kundenstimmen</span>
          </h1>
          <p className="text-white/65 text-lg max-w-xl leading-relaxed">
            Über 500 Haushalte und Unternehmen in Basel vertrauen D&apos;Namar.
            Hier einige ihrer Stimmen – ungekürzt und authentisch.
          </p>
        </div>
      </section>

      {/* ── AGGREGATE SCORE ──────────────────────────────────────────────── */}
      <section className="bg-white border-b border-border py-8">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">

            {/* Score */}
            <div className="flex items-center gap-4">
              <p className="text-7xl font-black text-navy leading-none tracking-tight">{AVG}</p>
              <div>
                <Stars n={5} />
                <p className="text-sm text-foreground/55 mt-1">
                  Ø aus {TESTIMONIALS.length} Bewertungen
                </p>
              </div>
            </div>

            <div className="h-12 w-px bg-border hidden sm:block" aria-hidden />

            {/* Breakdown */}
            <div className="flex flex-col gap-1.5 min-w-[160px]">
              {[5, 4, 3].map((stars) => {
                const count = TESTIMONIALS.filter((t) => t.rating === stars).length;
                const pct = Math.round((count / TESTIMONIALS.length) * 100);
                return (
                  <div key={stars} className="flex items-center gap-2.5">
                    <span className="text-xs text-foreground/50 w-3">{stars}</span>
                    <svg className="w-3 h-3 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-400"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-foreground/50 w-8 text-right">{count}/{TESTIMONIALS.length}</span>
                  </div>
                );
              })}
            </div>

            <div className="h-12 w-px bg-border hidden sm:block" aria-hidden />

            {/* Claim */}
            <p className="text-sm text-foreground/60 leading-relaxed max-w-[220px] text-center sm:text-left">
              Alle Bewertungen stammen von echten Kunden in Basel und
              Umgebung – unbearbeitet und direkt weitergegeben.
            </p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="section-container">

          {/* ── Featured card ── */}
          <div className="mb-6">
            <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Green accent bar */}
                <div className="lg:w-1.5 h-1.5 lg:h-auto bg-gradient-to-b from-brand to-brand-dark shrink-0" />

                <div className="p-8 lg:p-10 flex flex-col gap-6 flex-1">
                  {/* Quote mark */}
                  <svg
                    className="w-10 h-10 text-brand/20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <blockquote className="text-lg sm:text-xl text-foreground/80 leading-relaxed font-medium max-w-3xl">
                    &ldquo;{FEATURED.text}&rdquo;
                  </blockquote>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <Avatar initials={FEATURED.initials} color={FEATURED.avatarColor} />
                      <div>
                        <p className="font-bold text-navy text-sm">{FEATURED.name}</p>
                        <p className="text-xs text-foreground/50">{FEATURED.location}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Stars n={FEATURED.rating} />
                      <ServiceBadge label={FEATURED.service} />
                      <span className="text-xs text-foreground/40 italic">{FEATURED.detail}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Grid of 5 cards ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REST.map(({ name, initials, avatarColor, location, service, rating, text, detail, date }) => (
              <article
                key={name + date}
                className="bg-white rounded-2xl border border-border shadow-sm flex flex-col overflow-hidden hover:shadow-md hover:border-brand/20 transition-all duration-200"
              >
                {/* Top: quote area */}
                <div className="p-6 flex-1 flex flex-col gap-4">
                  {/* Opening quote */}
                  <svg
                    className="w-7 h-7 text-brand/20 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <blockquote className="text-sm text-foreground/70 leading-relaxed flex-1">
                    &ldquo;{text}&rdquo;
                  </blockquote>
                </div>

                {/* Bottom: author */}
                <div className="px-6 pb-6 border-t border-border pt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={initials} color={avatarColor} />
                      <div>
                        <p className="font-semibold text-navy text-sm leading-tight">{name}</p>
                        <p className="text-xs text-foreground/50">{location}</p>
                      </div>
                    </div>
                    <Stars n={rating} size="sm" />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <ServiceBadge label={service} />
                    <span className="text-xs text-foreground/40">{date}</span>
                  </div>

                  <p className="text-xs text-foreground/40 italic">{detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────────────────── */}
      <section className="bg-white py-12 border-y border-border">
        <div className="section-container">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center max-w-3xl mx-auto">
            {[
              { value: "500+", label: "Zufriedene Kunden" },
              { value: "4.9", label: "Durchschnittsbewertung" },
              { value: "10+", label: "Jahre in Basel" },
              { value: "100%", label: "Weiterempfehlungsrate" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-black text-navy">{value}</p>
                <p className="text-xs text-foreground/55 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy py-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 60%, #4caf82 0%, transparent 55%)",
          }}
        />
        <div className="section-container relative z-10 text-center">
          <span className="inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand font-semibold mb-5">
            Jetzt anfragen
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Werden Sie unser nächster
            <br />
            <span className="text-brand">zufriedener Kunde</span>
          </h2>
          <p className="text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
            Fordern Sie jetzt Ihre kostenlose Offerte an – innerhalb von
            24 Stunden erhalten Sie ein unverbindliches, persönliches Angebot.
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
        </div>
      </section>
    </>
  );
}
