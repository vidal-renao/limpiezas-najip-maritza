export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Star, MessageSquarePlus } from "lucide-react";
import ReviewForm from "@/components/ui/ReviewForm";
import { supabase, type Review } from "@/lib/supabase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "referenzen.meta" });
  return { title: t("title"), description: t("description") };
}

/* Static testimonial data (non-translatable: names/details stay same) */
const TESTIMONIALS = [
  {
    name: "Petra M.",
    initials: "PM",
    avatarColor: "from-brand to-brand-dark",
    location: "Gundeldingen, Basel",
    serviceKey: "haushaltsreinigung",
    rating: 5,
    featured: true,
    detail: "Wöchentliche Unterhaltsreinigung · 3.5-Zimmer-Wohnung",
    date: "März 2025",
    textDe: "Ich bin seit über eineinhalb Jahren Kundin bei D'Namar. Maritza kommt immer auf die Minute pünktlich, arbeitet unglaublich gründlich und meine Wohnung duftet danach nach frischer Sauberkeit. Das hartnäckige Kalkproblem in meiner Dusche, mit dem ich jahrelang gekämpft hatte, war nach dem ersten Besuch Geschichte.",
    textEn: "I've been a D'Namar customer for over a year and a half. Maritza is always perfectly punctual, works incredibly thoroughly and my apartment smells fresh afterwards. The stubborn limescale problem in my shower, which I had struggled with for years, was history after the first visit.",
    textEs: "Soy clienta de D'Namar desde hace más de año y medio. Maritza siempre llega puntualmente, trabaja increíblemente a fondo y mi piso huele a limpio después. El persistente problema de cal en mi ducha, con el que había luchado durante años, fue historia tras la primera visita.",
  },
  {
    name: "Reto W.",
    initials: "RW",
    avatarColor: "from-navy to-navy-light",
    location: "Bruderholz, Basel",
    serviceKey: "bueroreinigung",
    rating: 5,
    featured: false,
    detail: "Büroreinigung 2× wöchentlich · 12 Mitarbeitende",
    date: "Februar 2025",
    textDe: "Wir lassen unser Büro seit einem Jahr zweimal wöchentlich durch D'Namar reinigen. Die Qualität ist konstant hoch, und wenn kurzfristig etwas angepasst werden muss, ist Nadjib immer erreichbar. Absolut unkompliziert.",
    textEn: "We've had D'Namar clean our office twice a week for a year. Quality is consistently high, and when something needs adjusting at short notice, Nadjib is always reachable. Absolutely straightforward.",
    textEs: "Llevamos un año con D'Namar limpiando nuestra oficina dos veces por semana. La calidad es constantemente alta, y cuando algo necesita ajustarse con poco tiempo, Nadjib siempre está disponible. Absolutamente sin complicaciones.",
  },
  {
    name: "Dr. med. A. Schäfer",
    initials: "AS",
    avatarColor: "from-slate-500 to-slate-700",
    location: "Innenstadt, Basel",
    serviceKey: "praxisreinigung",
    rating: 5,
    featured: false,
    detail: "Tägliche Praxisreinigung · Basel Innenstadt",
    date: "Januar 2025",
    textDe: "Für unsere Arztpraxis gelten strenge Hygieneanforderungen. D'Namar erfüllt diese Vorgaben ohne Abstriche. Ich kann den Dienst jeder Praxis in Basel empfehlen.",
    textEn: "Our medical practice has strict hygiene requirements. D'Namar meets these standards without compromise. I can recommend the service to any practice in Basel.",
    textEs: "Nuestra consulta médica tiene estrictos requisitos de higiene. D'Namar cumple estos estándares sin concesiones. Puedo recomendar el servicio a cualquier consultorio en Basel.",
  },
  {
    name: "Mireille F.",
    initials: "MF",
    avatarColor: "from-brand to-brand-dark",
    location: "St. Alban, Basel",
    serviceKey: "umzugsreinigung",
    rating: 5,
    featured: false,
    detail: "Endreinigung mit Abgabegarantie · 4.5-Zimmer-Wohnung",
    date: "Januar 2025",
    textDe: "Dank der Abgabegarantie konnte ich entspannt zum Übergabetermin gehen. Die Verwaltung hat die Wohnung ohne eine einzige Beanstandung abgenommen. Das ist professionelle Arbeit.",
    textEn: "Thanks to the handover guarantee, I could go to the handover appointment relaxed. The property management accepted the apartment without a single objection. That is professional work.",
    textEs: "Gracias a la garantía de entrega, pude ir tranquila a la cita de entrega. La administración aceptó el piso sin ninguna objeción. Eso es trabajo profesional.",
  },
  {
    name: "Immobilien Basel AG",
    initials: "IB",
    avatarColor: "from-navy to-navy-light",
    location: "Matthäus, Basel",
    serviceKey: "treppenhausreinigung",
    rating: 5,
    featured: false,
    detail: "Wöchentliche Treppenhausreinigung · 4 Liegenschaften",
    date: "Dezember 2024",
    textDe: "Wir beauftragen D'Namar für vier unserer Liegenschaften in Basel. Die Qualität ist konstant hoch, die Kommunikation einfach und die Rechnungsstellung korrekt.",
    textEn: "We commission D'Namar for four of our properties in Basel. Quality is consistently high, communication is easy and invoicing is correct.",
    textEs: "Contratamos a D'Namar para cuatro de nuestros inmuebles en Basel. La calidad es constantemente alta, la comunicación fácil y la facturación correcta.",
  },
  {
    name: "Sandra B.",
    initials: "SB",
    avatarColor: "from-brand to-brand-dark",
    location: "Gundeldingen, Basel",
    serviceKey: "glasreinigung",
    rating: 5,
    featured: false,
    detail: "Glasreinigung inkl. Kalkschutz · Privathaushalt",
    date: "November 2024",
    textDe: "Nach der Glasreinigung durch D'Namar sind meine Fenster endlich wieder wirklich klar. Die Kalkschutzversiegelung hält tatsächlich, was sie verspricht. Sehr empfehlenswert!",
    textEn: "After D'Namar's glass cleaning, my windows are finally truly clear again. The limescale protection seal actually delivers on its promise. Highly recommended!",
    textEs: "Tras la limpieza de cristales de D'Namar, mis ventanas están finalmente realmente limpias. El sellado antiincrustante cumple realmente lo que promete. ¡Muy recomendable!",
  },
];

const SERVICE_LABELS: Record<string, Record<string, string>> = {
  haushaltsreinigung: { de: "Haushaltsreinigung", en: "Household Cleaning", es: "Limpieza del hogar" },
  bueroreinigung: { de: "Büroreinigung", en: "Office Cleaning", es: "Limpieza de oficinas" },
  umzugsreinigung: { de: "Umzugsreinigung", en: "Move-Out Cleaning", es: "Limpieza de mudanza" },
  praxisreinigung: { de: "Praxisreinigung", en: "Practice Cleaning", es: "Limpieza de consultorios" },
  treppenhausreinigung: { de: "Treppenhausreinigung", en: "Stairwell Cleaning", es: "Limpieza de escaleras" },
  glasreinigung: { de: "Glasreinigung", en: "Glass Cleaning", es: "Limpieza de cristales" },
};

const RATING_LABELS: Record<string, string[]> = {
  de: ["5 Sterne", "4 Sterne", "3 Sterne", "2 Sterne", "1 Stern"],
  en: ["5 stars", "4 stars", "3 stars", "2 stars", "1 star"],
  es: ["5 estrellas", "4 estrellas", "3 estrellas", "2 estrellas", "1 estrella"],
};

export default async function ReferenzenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "referenzen" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const stats = t.raw("stats") as Array<{ value: string; label: string }>;
  const lang = locale as "de" | "en" | "es";

  // Fetch approved reviews from Supabase (newest first, max 12)
  const { data: liveReviews } = await supabase
    .from("reviews")
    .select("id, name, rating, service, comment, created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(12);

  const featured = TESTIMONIALS.find((t) => t.featured)!;
  const rest = TESTIMONIALS.filter((t) => !t.featured);

  const getText = (item: typeof TESTIMONIALS[0]) =>
    lang === "en" ? item.textEn : lang === "es" ? item.textEs : item.textDe;

  const getServiceLabel = (key: string) =>
    SERVICE_LABELS[key]?.[lang] ?? key;

  const ratingBreakdown = [
    { stars: 5, pct: 95 },
    { stars: 4, pct: 4 },
    { stars: 3, pct: 1 },
    { stars: 2, pct: 0 },
    { stars: 1, pct: 0 },
  ];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden py-20 lg:py-28">
        <div aria-hidden className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #4caf82 0%, transparent 55%)" }} />
        <div className="section-container relative z-10 text-center">
          <div className="inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand font-semibold mb-5">
            {t("hero.badge")}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            {t("hero.title1")}{" "}
            <span className="text-brand">{t("hero.titleBrand")}</span>
          </h1>
          <p className="text-white/65 max-w-xl mx-auto">{t("hero.subtitle")}</p>
        </div>
        <div aria-hidden className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-border py-10">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-bold text-brand">{value}</p>
                <p className="text-sm text-foreground/60 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGGREGATE ────────────────────────────────────────────────── */}
      <section className="bg-muted py-12">
        <div className="section-container">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-border p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-8 items-center">
              <div className="text-center shrink-0">
                <p className="text-6xl font-bold text-navy">4.9</p>
                <div className="flex gap-0.5 justify-center my-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-foreground/50">
                  {t("aggregate.outOf")} 90+ {t("aggregate.reviews")}
                </p>
              </div>
              <div className="flex-1 w-full space-y-2">
                {ratingBreakdown.map(({ stars, pct }) => (
                  <div key={stars} className="flex items-center gap-3 text-xs">
                    <span className="w-12 text-right text-foreground/60 shrink-0">
                      {RATING_LABELS[locale]?.[5 - stars] ?? `${stars}★`}
                    </span>
                    <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-8 text-foreground/50 shrink-0">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-foreground/40 mt-5 text-center">{t("aggregate.disclaimer")}</p>
          </div>
        </div>
      </section>

      {/* ── FEATURED TESTIMONIAL ──────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto bg-navy rounded-3xl p-8 lg:p-10 text-white">
            <div className="flex gap-0.5 mb-5">
              {Array.from({ length: featured.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <blockquote className="text-lg lg:text-xl text-white/90 leading-relaxed italic mb-6">
              &ldquo;{getText(featured)}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${featured.avatarColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                {featured.initials}
              </div>
              <div>
                <p className="font-semibold text-white">{featured.name}</p>
                <p className="text-white/55 text-sm">{featured.location}</p>
              </div>
              <div className="ml-auto">
                <span className="rounded-full bg-brand/20 text-brand text-xs font-semibold px-3 py-1">
                  {getServiceLabel(featured.serviceKey)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REST GRID ─────────────────────────────────────────────────── */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((item) => (
              <div key={item.name} className="bg-white rounded-2xl border border-border p-6 shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.avatarColor} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                    {item.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">{item.name}</p>
                    <p className="text-xs text-foreground/50">{item.location}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-foreground/75 leading-relaxed flex-1 mb-4">
                  &ldquo;{getText(item)}&rdquo;
                </blockquote>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="rounded-full bg-brand/10 text-brand text-xs font-semibold px-2.5 py-0.5">
                    {getServiceLabel(item.serviceKey)}
                  </span>
                  <span className="text-xs text-foreground/40">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE REVIEWS FROM SUPABASE ───────────────────────────────── */}
      {liveReviews && liveReviews.length > 0 && (
        <section className="bg-white py-16 lg:py-20">
          <div className="section-container">
            <h2 className="text-xl font-bold text-navy mb-8 text-center">
              {t("liveReviews.title")}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(liveReviews as Review[]).map((review) => (
                <div key={review.id} className="bg-muted rounded-2xl border border-border p-6 shadow-sm flex flex-col">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-sm text-foreground/75 leading-relaxed flex-1 mb-4">
                    &ldquo;{review.comment}&rdquo;
                  </blockquote>
                  <div className="border-t border-border pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white font-bold text-xs shrink-0">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-navy">{review.name}</span>
                    </div>
                    <span className="rounded-full bg-brand/10 text-brand text-xs font-semibold px-2.5 py-0.5">
                      {review.service}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── REVIEW FORM ───────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20" aria-labelledby="review-form-heading">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand/10 mb-4">
                <MessageSquarePlus className="w-6 h-6 text-brand" />
              </div>
              <h2 id="review-form-heading" className="text-2xl sm:text-3xl font-bold text-navy">
                {t("reviewForm.sectionTitle")}
              </h2>
              <p className="text-foreground/60 mt-2 text-sm">{t("reviewForm.sectionSubtitle")}</p>
            </div>

            <div className="bg-muted rounded-2xl border border-border p-6 lg:p-8">
              <ReviewForm
                locale={locale}
                labels={{
                  title: t("reviewForm.title"),
                  subtitle: t("reviewForm.subtitle"),
                  ratingLabel: t("reviewForm.ratingLabel"),
                  nameLabel: t("reviewForm.nameLabel"),
                  namePlaceholder: t("reviewForm.namePlaceholder"),
                  nameHint: t("reviewForm.nameHint"),
                  serviceLabel: t("reviewForm.serviceLabel"),
                  servicePlaceholder: t("reviewForm.servicePlaceholder"),
                  commentLabel: t("reviewForm.commentLabel"),
                  commentPlaceholder: t("reviewForm.commentPlaceholder"),
                  submitBtn: t("reviewForm.submitBtn"),
                  sending: t("reviewForm.sending"),
                  successTitle: t("reviewForm.successTitle"),
                  successText: t("reviewForm.successText"),
                  errorText: t("reviewForm.errorText"),
                  retry: t("reviewForm.retry"),
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1 text-sm text-brand font-semibold mb-5">
              {t("cta.badge")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {t("cta.title1")}{" "}
              <span className="text-brand">{t("cta.titleBrand")}</span>
            </h2>
            <p className="text-white/65 mb-6">{t("cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/anfrage" className="btn-primary px-8 py-4">{tCommon("requestQuote")}</Link>
              <a href="tel:+41792527557" className="btn-secondary px-8 py-4">{tCommon("phone")}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
