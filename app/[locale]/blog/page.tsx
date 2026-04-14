export const revalidate = 3600;

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Clock, Calendar, BookOpen, Sparkles, Lock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog.meta" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [{ url: "/images/Buero-768x512.jpg", width: 768, height: 512 }],
    },
  };
}

const POST_SLUGS = [
  "bueroreinigung-tipps-basel",
  "umzug-endreinigung-checkliste-basel",
] as const;

const POST_DATES: Record<string, string> = {
  "bueroreinigung-tipps-basel":          "2025-03-10",
  "umzug-endreinigung-checkliste-basel": "2025-02-25",
};

const POST_IMAGES: Record<string, string> = {
  "bueroreinigung-tipps-basel":          "/images/Buero-768x512.jpg",
  "umzug-endreinigung-checkliste-basel": "/images/Wohnungsbau-768x512.jpg",
};

const UPCOMING_IMAGES = [
  "/images/Herd-768x512.jpg",
  "/images/Gewerberaum-768x512.jpg",
  "/images/Fenster-blauer-Himmel-768x512.jpg",
];

/* Category → accent colour */
const CATEGORY_COLORS: Record<string, string> = {
  "Büroreinigung":   "bg-blue-50 text-blue-700",
  "Umzugsreinigung": "bg-amber-50 text-amber-700",
  "Kalkschutz":      "bg-brand/10 text-brand",
  "Praxisreinigung": "bg-purple-50 text-purple-700",
  "Glasreinigung":   "bg-sky-50 text-sky-700",
  default:           "bg-brand/10 text-brand",
};

function categoryClass(cat: string): string {
  return CATEGORY_COLORS[cat] ?? CATEGORY_COLORS.default;
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const posts = POST_SLUGS.map((slug) => ({
    slug,
    image:   POST_IMAGES[slug],
    dateIso: POST_DATES[slug],
    ...(t.raw(`posts.${slug}`) as {
      title: string; excerpt: string; category: string; date: string; readTime: string;
    }),
  }));

  const upcoming = t.raw("upcoming") as Array<{
    title: string; excerpt: string; category: string;
  }>;

  const [featured, ...rest] = posts;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden py-20 lg:py-28">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 20%, #4caf82 0%, transparent 55%), radial-gradient(circle at 10% 80%, #4caf82 0%, transparent 40%)",
          }}
        />
        <div className="section-container relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              {t("hero.eyebrow")}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              {t("hero.title")}
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-xl">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-16 bg-muted"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </section>

      {/* ── FEATURED POST ────────────────────────────────────────────── */}
      <section className="bg-muted pt-16 lg:pt-20 pb-10">
        <div className="section-container">
          <div className="flex items-center gap-2 mb-7">
            <span className="w-1 h-5 rounded-full bg-brand" />
            <span className="text-brand font-bold text-sm uppercase tracking-widest">
              {t("featuredLabel")}
            </span>
          </div>

          <Link href={`/blog/${featured.slug}`} className="block group">
            <article className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className="grid lg:grid-cols-5">
                {/* Image 3/5 */}
                <div className="relative h-60 lg:h-auto lg:col-span-3 overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent lg:from-transparent lg:via-transparent lg:to-white/30" />
                  <span
                    className={`absolute top-4 left-4 rounded-full text-xs font-bold px-3 py-1 uppercase tracking-wide ${categoryClass(featured.category)}`}
                  >
                    {featured.category}
                  </span>
                </div>

                {/* Content 2/5 */}
                <div className="p-7 lg:p-10 flex flex-col justify-center lg:col-span-2">
                  <div className="flex items-center gap-3 mb-5 text-xs text-foreground/40">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime} {t("readTime")}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-foreground/20" />
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={featured.dateIso}>{featured.date}</time>
                    </span>
                  </div>

                  <h2 className="font-bold text-navy text-xl lg:text-2xl leading-snug mb-4 group-hover:text-brand transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-7 line-clamp-3">
                    {featured.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand group-hover:gap-3 transition-all duration-300">
                    {t("readMore")}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </article>
          </Link>
        </div>
      </section>

      {/* ── MORE POSTS ───────────────────────────────────────────────── */}
      {rest.length > 0 && (
        <section className="bg-muted pb-12">
          <div className="section-container">
            <div className="flex items-center gap-2 mb-7">
              <span className="w-1 h-5 rounded-full bg-brand" />
              <h2 className="font-bold text-navy text-sm uppercase tracking-widest">{t("moreLabel")}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map(({ slug, title, excerpt, category, date, dateIso, readTime, image }) => (
                <Link key={slug} href={`/blog/${slug}`} className="block group">
                  <article className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span
                        className={`absolute top-3 left-3 rounded-full text-xs font-bold px-2.5 py-0.5 uppercase tracking-wide ${categoryClass(category)}`}
                      >
                        {category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3 text-xs text-foreground/40">
                        <Clock className="w-3 h-3" />
                        {readTime} {t("readTime")}
                        <span className="w-1 h-1 rounded-full bg-foreground/20 ml-1" />
                        <time dateTime={dateIso}>{date}</time>
                      </div>
                      <h3 className="font-bold text-navy text-sm leading-snug mb-2 group-hover:text-brand transition-colors duration-300">
                        {title}
                      </h3>
                      <p className="text-xs text-foreground/60 leading-relaxed flex-1 mb-4 line-clamp-3">
                        {excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-brand font-semibold text-xs group-hover:gap-2.5 transition-all duration-300">
                        {t("readMore")}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── UPCOMING POSTS ───────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20 border-t border-border">
        <div className="section-container">
          <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1 h-5 rounded-full bg-brand/40" />
                <span className="text-foreground/40 font-bold text-sm uppercase tracking-widest">
                  {t("upcomingLabel")}
                </span>
              </div>
              <p className="text-xs text-foreground/40 mt-1">{t("upcomingDesc")}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/5 px-3.5 py-1.5 text-xs font-semibold text-brand">
              <Sparkles className="w-3 h-3" />
              {t("expertBadge")}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcoming.map(({ title, excerpt, category }, i) => (
              <article
                key={i}
                className="bg-muted rounded-2xl border border-border border-dashed overflow-hidden flex flex-col relative"
              >
                {/* Blurred image preview */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={UPCOMING_IMAGES[i] ?? "/images/Buero-768x512.jpg"}
                    alt=""
                    fill
                    className="object-cover blur-[2px] scale-105 opacity-60"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    aria-hidden
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-muted via-muted/40 to-transparent" />
                  {/* Coming soon badge */}
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-border text-xs font-bold px-3 py-1 text-foreground/60 uppercase tracking-wide">
                    <Lock className="w-2.5 h-2.5" />
                    {t("upcomingBadge")}
                  </span>
                  <span className={`absolute top-3 right-3 rounded-full text-xs font-bold px-2.5 py-0.5 ${categoryClass(category)}`}>
                    {category}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-navy/70 text-sm leading-snug mb-2 line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-xs text-foreground/45 leading-relaxed line-clamp-2 flex-1">
                    {excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-foreground/30 text-xs font-semibold cursor-default">
                    <Lock className="w-3 h-3" />
                    {t("upcomingBadge")}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              {t("expertBadge")}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{t("cta.title")}</h2>
            <p className="text-white/60 mb-8">{t("cta.subtitle")}</p>
            <Link href="/kontakt" className="btn-primary px-8 py-4 text-sm">
              {tCommon("contact")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "D'Namar Reinigungsblog Basel",
            description: "Professionelle Reinigungsratgeber für Basel – Büroreinigung, Umzugsreinigung, Kalkschutz und mehr.",
            url: `https://dnamar.ch/${locale === "de" ? "" : locale + "/"}blog`,
            inLanguage: locale,
            publisher: {
              "@type": "Organization",
              name: "D'Namar GmbH",
              url: "https://dnamar.ch",
              logo: { "@type": "ImageObject", url: "https://dnamar.ch/images/N.jpeg" },
            },
            blogPost: posts.map(({ slug, title, dateIso, image }) => ({
              "@type": "BlogPosting",
              headline: title,
              url: `https://dnamar.ch/${locale === "de" ? "" : locale + "/"}blog/${slug}`,
              datePublished: dateIso,
              image: `https://dnamar.ch${image}`,
              author: { "@type": "Organization", name: "D'Namar GmbH" },
            })),
          }),
        }}
      />
    </>
  );
}
