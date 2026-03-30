export const revalidate = 3600; // revalidate blog every hour

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Clock, Calendar, BookOpen } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog.meta" });
  return { title: t("title"), description: t("description") };
}

const POST_SLUGS = [
  "bueroreinigung-tipps-basel",
  "umzug-endreinigung-checkliste-basel",
] as const;

const POST_DATES: Record<string, string> = {
  "bueroreinigung-tipps-basel": "2025-03-10",
  "umzug-endreinigung-checkliste-basel": "2025-02-25",
};

/* Cover images per post */
const POST_IMAGES: Record<string, string> = {
  "bueroreinigung-tipps-basel": "/images/Buero-768x512.jpg",
  "umzug-endreinigung-checkliste-basel": "/images/Wohnungsbau-768x512.jpg",
};

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
    image: POST_IMAGES[slug],
    ...(t.raw(`posts.${slug}`) as { title: string; excerpt: string; category: string; date: string; readTime: string }),
  }));

  const [featured, ...rest] = posts;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden py-20 lg:py-24">
        <div aria-hidden className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #4caf82 0%, transparent 55%)" }} />
        <div className="section-container relative z-10 text-center">
          <span className="text-brand font-semibold text-sm uppercase tracking-widest">{t("hero.eyebrow")}</span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white mb-4">{t("hero.title")}</h1>
          <p className="text-white/65 max-w-xl mx-auto">{t("hero.subtitle")}</p>
        </div>
        <div aria-hidden className="absolute bottom-0 left-0 right-0 h-16 bg-muted"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>

      {/* ── FEATURED POST ────────────────────────────────────────────── */}
      <section className="bg-muted pt-16 lg:pt-20 pb-8">
        <div className="section-container">
          <div className="mb-8 flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-brand" />
            <span className="text-brand font-semibold text-sm uppercase tracking-widest">
              {t("featuredLabel")}
            </span>
          </div>

          <article className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
            <div className="grid lg:grid-cols-2">
              {/* Image */}
              <div className="relative h-56 lg:h-auto min-h-[260px]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/0 lg:to-white/20" />
              </div>

              {/* Content */}
              <div className="p-7 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="rounded-full bg-brand/10 text-brand text-xs font-bold px-3 py-1 uppercase tracking-wide">
                    {featured.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-foreground/40 text-xs">
                    <Clock className="w-3 h-3" />
                    {featured.readTime} {t("readTime")}
                  </span>
                </div>

                <h2 className="font-bold text-navy text-xl lg:text-2xl leading-snug mb-4">
                  {featured.title}
                </h2>
                <p className="text-sm text-foreground/65 leading-relaxed mb-6 line-clamp-3">
                  {featured.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs text-foreground/40">
                    <Calendar className="w-3.5 h-3.5" />
                    {featured.date}
                  </span>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="btn-primary text-sm px-6 py-2.5"
                  >
                    {t("readMore")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ── MORE POSTS ───────────────────────────────────────────────── */}
      {rest.length > 0 && (
        <section className="bg-muted pb-16 lg:pb-20">
          <div className="section-container">
            <h2 className="font-bold text-navy text-lg mb-6">{t("moreLabel")}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map(({ slug, title, excerpt, category, date, readTime, image }) => (
                <article
                  key={slug}
                  className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col"
                >
                  <div className="relative h-44">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="rounded-full bg-brand/10 text-brand text-xs font-semibold px-2.5 py-0.5">
                        {category}
                      </span>
                      <span className="text-foreground/40 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {readTime} {t("readTime")}
                      </span>
                    </div>
                    <h3 className="font-bold text-navy text-sm leading-snug mb-2">{title}</h3>
                    <p className="text-xs text-foreground/65 leading-relaxed flex-1 mb-4 line-clamp-3">
                      {excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-foreground/40">{date}</span>
                      <Link
                        href={`/blog/${slug}`}
                        className="inline-flex items-center gap-1 text-brand font-semibold text-xs hover:text-brand-dark transition-colors"
                      >
                        {t("readMore")}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-navy py-14 lg:py-16">
        <div className="section-container text-center">
          <h2 className="text-2xl font-bold text-white mb-3">{t("cta.title")}</h2>
          <p className="text-white/65 mb-6">{t("cta.subtitle")}</p>
          <Link href="/kontakt" className="btn-primary px-8 py-4">{tCommon("contact")}</Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "D'Namar Blog Basel",
            url: "https://dnamar.ch/blog",
            publisher: { "@type": "Organization", name: "D'Namar GmbH", url: "https://dnamar.ch" },
            blogPost: posts.map(({ slug, title }) => ({
              "@type": "BlogPosting",
              headline: title,
              url: `https://dnamar.ch/blog/${slug}`,
              datePublished: POST_DATES[slug],
              author: { "@type": "Organization", name: "D'Namar GmbH" },
            })),
          }),
        }}
      />
    </>
  );
}
