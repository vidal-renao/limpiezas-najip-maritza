import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Clock } from "lucide-react";

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
    ...(t.raw(`posts.${slug}`) as { title: string; excerpt: string; category: string; date: string; readTime: string }),
  }));

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

      {/* ── POSTS ────────────────────────────────────────────────────── */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {posts.map(({ slug, title, excerpt, category, date, readTime }) => (
              <article key={slug} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="rounded-full bg-brand/10 text-brand text-xs font-semibold px-2.5 py-0.5">
                      {category}
                    </span>
                    <span className="text-foreground/40 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {readTime} {t("readTime")}
                    </span>
                  </div>
                  <h2 className="font-bold text-navy text-base leading-snug mb-3">{title}</h2>
                  <p className="text-sm text-foreground/65 leading-relaxed flex-1 mb-4">{excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground/40">{date}</span>
                    <Link
                      href={`/blog/${slug}`}
                      className="inline-flex items-center gap-1 text-brand font-semibold text-sm hover:text-brand-dark transition-colors"
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
            publisher: { "@type": "Organization", name: "D'Namar Reinigungsdienst", url: "https://dnamar.ch" },
            blogPost: posts.map(({ slug, title }) => ({
              "@type": "BlogPosting",
              headline: title,
              url: `https://dnamar.ch/blog/${slug}`,
              datePublished: POST_DATES[slug],
              author: { "@type": "Organization", name: "D'Namar Reinigungsdienst" },
            })),
          }),
        }}
      />
    </>
  );
}
