import { Suspense } from "react";
import type { Metadata } from "next";
import { CheckCircle2, Loader2 } from "lucide-react";
import AnfrageForm from "@/components/AnfrageForm";

export const metadata: Metadata = {
  title: "Kostenlose Offerte anfordern | D'Namar Reinigungsdienst Basel",
  description:
    "In 4 Schritten zur kostenlosen Reinigungsofferte für Basel. Haushalts-, Büro-, Umzugs- und Glasreinigung – Antwort innerhalb von 24 Stunden. Jetzt anfragen.",
};

/* ─── JSON-LD ────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Offerte anfordern – D'Namar Reinigungsdienst Basel",
  description: "Kostenlose Reinigungsofferte in 24 Stunden.",
  url: "https://dnamar.ch/anfrage",
  contactOption: "TollFree",
  telephone: "+41792527557",
  areaServed: { "@type": "City", name: "Basel", addressCountry: "CH" },
};

const PROMISES = [
  "Antwort innerhalb von 24 Stunden",
  "Keine Vorauszahlung erforderlich",
  "Kostenlos & unverbindlich",
  "Persönliche Beratung inklusive",
];

/* ─── Fallback while AnfrageForm suspends ────────────────────────────────── */
function FormSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-foreground/40">
      <Loader2 className="w-8 h-8 animate-spin text-brand" />
      <p className="text-sm">Formular wird geladen…</p>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function AnfragePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy pt-28 pb-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 30%, #4caf82 0%, transparent 50%)",
          }}
        />
        <div className="section-container relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand font-semibold mb-5">
              Schnell & unkompliziert
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Kostenlose Offerte
              <br />
              <span className="text-brand">in 4 Schritten</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-8">
              Wählen Sie Ihre Leistung, geben Sie die Objektdetails an und wir
              erstellen Ihnen ein massgeschneidertes Angebot – innerhalb von
              24 Stunden, persönlich und unverbindlich.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
              {PROMISES.map((p) => (
                <li key={p} className="flex items-center gap-1.5 text-sm text-white/65">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Diagonal divider */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-12 bg-muted"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </section>

      {/* ── FORM SECTION ──────────────────────────────────────────────────── */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-10 items-start">

            {/* ── Sidebar ── */}
            <aside className="hidden lg:flex flex-col gap-5">
              {/* Why D'Namar */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="font-bold text-navy mb-4 text-sm uppercase tracking-widest text-brand">
                  Warum D&apos;Namar?
                </h2>
                <ul className="space-y-4">
                  {[
                    { val: "10+",     label: "Jahre Erfahrung in Basel" },
                    { val: "500+",    label: "Zufriedene Kunden" },
                    { val: "24 Std.", label: "Antwortzeit garantiert" },
                    { val: "4.9 ★",  label: "Kundenbewertung" },
                    { val: "CHF 40–", label: "Ab CHF 40 pro Stunde" },
                  ].map(({ val, label }) => (
                    <li key={label} className="flex items-center gap-3">
                      <span className="text-brand font-bold text-sm w-16 shrink-0 leading-none">
                        {val}
                      </span>
                      <span className="text-sm text-foreground/60 leading-snug">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Abgabegarantie highlight */}
              <div className="bg-brand/8 border border-brand/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                  <p className="text-sm font-bold text-navy">Abgabegarantie</p>
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  Bei der Umzugsreinigung kommen wir kostenlos nochmals –
                  bis zur erfolgreichen Abnahme durch die Verwaltung.
                </p>
              </div>

              {/* Direct contact */}
              <div className="bg-navy rounded-2xl p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-white/45 mb-3">
                  Lieber direkt anrufen?
                </p>
                <a
                  href="tel:+41792527557"
                  className="flex items-center gap-2 text-brand font-bold text-lg hover:text-brand-light transition-colors"
                >
                  +41 79 252 75 57
                </a>
                <p className="text-white/45 text-xs mt-1">Mo–Fr 08–18 · Sa 09–14 Uhr</p>
                <a
                  href="https://wa.me/41792527557"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-white/60 hover:text-brand transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp schreiben
                </a>
              </div>
            </aside>

            {/* ── Form card ── */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-7 sm:p-9 shadow-sm">
              <Suspense fallback={<FormSkeleton />}>
                <AnfrageForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
