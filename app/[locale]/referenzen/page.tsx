export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Star, MessageSquarePlus, Award } from "lucide-react";
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

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

const AVATAR_GRADIENTS = [
  "from-brand to-emerald-600",
  "from-navy to-blue-700",
  "from-slate-500 to-slate-700",
  "from-teal-500 to-teal-700",
  "from-violet-500 to-violet-700",
  "from-amber-500 to-orange-600",
];

function avatarGradient(name: string): string {
  return AVATAR_GRADIENTS[name.charCodeAt(0) % AVATAR_GRADIENTS.length];
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateStr: string, locale: string): string {
  return new Intl.DateTimeFormat(
    locale === "en" ? "en-GB" : locale === "es" ? "es-ES" : "de-CH",
    { day: "numeric", month: "long", year: "numeric" },
  ).format(new Date(dateStr));
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

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
  const starLabels = t.raw("star_labels") as string[];

  // ── Fetch all approved reviews (max 50, newest first) ───────────────────
  const { data: rawReviews } = await supabase
    .from("reviews")
    .select("id, name, rating, service, comment, created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(50);

  const reviews = (rawReviews ?? []) as Review[];
  const total = reviews.length;

  // ── Compute statistics from real data ───────────────────────────────────
  const avgRating =
    total > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1)
      : null;

  const breakdown = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    return { stars, count, pct: total > 0 ? Math.round((count / total) * 100) : 0 };
  });

  // ── Select featured: highest star + longest comment ─────────────────────
  const sorted = [...reviews].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.comment.length - a.comment.length;
  });
  const featured = sorted[0] ?? null;
  const rest = sorted.slice(1);

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden py-20 lg:py-28">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, #4caf82 0%, transparent 55%)",
          }}
        />
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
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </section>

      {/* ── STATS (static marketing figures) ──────────────────────────── */}
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

      {/* ── AGGREGATE (only when reviews exist) ───────────────────────── */}
      {total > 0 && avgRating && (
        <section className="bg-muted py-12">
          <div className="section-container">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-border p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-8 items-center">
                {/* Score */}
                <div className="text-center shrink-0">
                  <p className="text-6xl font-bold text-navy">{avgRating}</p>
                  <div className="flex gap-0.5 justify-center my-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(parseFloat(avgRating))
                            ? "text-amber-400 fill-amber-400"
                            : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-foreground/50">
                    {t("aggregate.outOf")} {total} {t("aggregate.reviews")}
                  </p>
                </div>
                {/* Bar chart */}
                <div className="flex-1 w-full space-y-2">
                  {breakdown.map(({ stars, pct }) => (
                    <div key={stars} className="flex items-center gap-3 text-xs">
                      <span className="w-16 text-right text-foreground/60 shrink-0">
                        {starLabels[5 - stars]}
                      </span>
                      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-8 text-foreground/50 shrink-0">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-foreground/40 mt-5 text-center">
                {t("aggregate.disclaimer")}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURED REVIEW ────────────────────────────────────────────── */}
      {featured ? (
        <section className="bg-white py-16 lg:py-20">
          <div className="section-container">
            <div className="max-w-3xl mx-auto bg-navy rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden">
              {/* Featured badge */}
              <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-brand/20 text-brand rounded-full px-3 py-1 text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                {t("featured_badge")}
              </div>
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: featured.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              {/* Quote */}
              <blockquote className="text-lg lg:text-xl text-white/90 leading-relaxed italic mb-6">
                &ldquo;{featured.comment}&rdquo;
              </blockquote>
              {/* Author */}
              <div className="flex items-center gap-4 flex-wrap">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarGradient(featured.name)} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                >
                  {initials(featured.name)}
                </div>
                <div>
                  <p className="font-semibold text-white">{featured.name}</p>
                  <p className="text-white/55 text-sm">
                    {t("verified")} · {formatDate(featured.created_at, locale)}
                  </p>
                </div>
                <div className="ml-auto mt-2 sm:mt-0">
                  <span className="rounded-full bg-brand/20 text-brand text-xs font-semibold px-3 py-1">
                    {featured.service}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* ── NO REVIEWS YET ─────────────────────────────────────────── */
        <section className="bg-white py-16 lg:py-20">
          <div className="section-container">
            <div className="max-w-xl mx-auto text-center bg-muted rounded-2xl border border-border p-10">
              <div className="flex gap-0.5 justify-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-border" />
                ))}
              </div>
              <h2 className="text-xl font-bold text-navy mb-2">
                {t("no_reviews_title")}
              </h2>
              <p className="text-foreground/60 text-sm">{t("no_reviews_text")}</p>
            </div>
          </div>
        </section>
      )}

      {/* ── REST GRID ──────────────────────────────────────────────────── */}
      {rest.length > 0 && (
        <section className="bg-muted py-16 lg:py-20">
          <div className="section-container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((review) => (
                <article
                  key={review.id}
                  className="bg-white rounded-2xl border border-border p-6 shadow-sm flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradient(review.name)} flex items-center justify-center text-white font-bold text-xs shrink-0`}
                    >
                      {initials(review.name)}
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-sm">{review.name}</p>
                      <p className="text-xs text-foreground/50">
                        {formatDate(review.created_at, locale)}
                      </p>
                    </div>
                  </div>
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                  {/* Comment */}
                  <blockquote className="text-sm text-foreground/75 leading-relaxed flex-1 mb-4">
                    &ldquo;{review.comment}&rdquo;
                  </blockquote>
                  {/* Footer */}
                  <div className="border-t border-border pt-3 flex items-center justify-between">
                    <span className="rounded-full bg-brand/10 text-brand text-xs font-semibold px-2.5 py-0.5">
                      {review.service}
                    </span>
                    <span className="text-xs text-foreground/40 italic">
                      {t("verified")}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── REVIEW FORM ────────────────────────────────────────────────── */}
      <section
        className="bg-white py-16 lg:py-20"
        aria-labelledby="review-form-heading"
      >
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand/10 mb-4">
                <MessageSquarePlus className="w-6 h-6 text-brand" />
              </div>
              <h2
                id="review-form-heading"
                className="text-2xl sm:text-3xl font-bold text-navy"
              >
                {t("reviewForm.sectionTitle")}
              </h2>
              <p className="text-foreground/60 mt-2 text-sm">
                {t("reviewForm.sectionSubtitle")}
              </p>
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

      {/* ── CTA ────────────────────────────────────────────────────────── */}
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
              <Link href="/anfrage" className="btn-primary px-8 py-4">
                {tCommon("requestQuote")}
              </Link>
              <a href="tel:+41792527557" className="btn-secondary px-8 py-4">
                {tCommon("phone")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
