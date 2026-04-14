import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, Sparkles, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/content/blog.config";

/* ── Static params ──────────────────────────────────────────────────── */
export async function generateStaticParams() {
  const locales = ["de", "en", "es"];
  return locales.flatMap((locale) =>
    BLOG_POSTS.map((post) => ({ locale, slug: post.slug }))
  );
}

/* ── Metadata ───────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  const t = await getTranslations({ locale, namespace: "blog" });
  const tPost = t.raw(`posts.${slug}`) as
    | { title: string; excerpt: string; category: string }
    | undefined;

  const title = tPost?.title ?? t("hero.title");
  const description = tPost?.excerpt ?? t("hero.subtitle");

  return {
    title: `${title} | D'Namar Basel`,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: post.image, width: 768, height: 512 }],
    },
  };
}

/* ── Page ───────────────────────────────────────────────────────────── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const t  = await getTranslations({ locale, namespace: "blog" });
  const tc = await getTranslations({ locale, namespace: "blog.blogPost" });

  const meta = t.raw(`posts.${slug}`) as
    | { title: string; excerpt: string; category: string; date: string; readTime: string }
    | undefined;

  const title    = meta?.title    ?? slug;
  const excerpt  = meta?.excerpt  ?? "";
  const category = meta?.category ?? "";
  const date     = meta?.date     ?? "";
  const readTime = meta?.readTime ?? "";

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden">
        {/* Background image — blurred to signal "not yet published" */}
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover opacity-20 blur-sm scale-105"
            sizes="100vw"
            priority
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/70 to-navy" />
        </div>

        <div className="section-container relative z-10 py-20 lg:py-28">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/50 hover:text-brand transition-colors text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {tc("backLabel")}
          </Link>

          {/* Category + coming-soon badge */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {category && (
              <span className="rounded-full bg-brand/20 text-brand border border-brand/30 text-xs font-bold px-3 py-1 uppercase tracking-wide">
                {category}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 text-white/60 text-xs font-bold px-3 py-1 uppercase tracking-wide backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              {tc("comingSoon.badge")}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 max-w-3xl">
            {title}
          </h1>

          {excerpt && (
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mb-8">
              {excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
            {readTime && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readTime} {t("readTime")}
              </span>
            )}
            {date && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.dateIso}>{date}</time>
              </span>
            )}
          </div>
        </div>

        {/* Bottom wave */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-16 bg-muted"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </section>

      {/* ── COMING SOON CARD ─────────────────────────────────────────── */}
      <section className="bg-muted py-20 lg:py-28">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            {/* Animated icon */}
            <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-brand" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4">
              {tc("comingSoon.heading")}
            </h2>
            <p className="text-foreground/60 leading-relaxed mb-10">
              {tc("comingSoon.sub")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/kontakt"
                className="btn-primary px-7 py-3.5 text-sm"
              >
                {tc("comingSoon.cta")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-7 py-3.5 text-sm font-semibold text-navy hover:border-brand/40 hover:text-brand transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                {tc("backLabel")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              {t("expertBadge")}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{t("cta.title")}</h2>
            <p className="text-white/60 mb-8">{t("cta.subtitle")}</p>
            <Link href="/kontakt" className="btn-primary px-8 py-4 text-sm">
              {tc("comingSoon.cta")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
