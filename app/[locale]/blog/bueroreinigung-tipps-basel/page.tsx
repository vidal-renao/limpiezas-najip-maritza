export const revalidate = 3600;

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Clock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const post = t.raw("posts.bueroreinigung-tipps-basel") as { title: string; excerpt: string; readTime: string };
  return {
    title: post.title + " | D'Namar Basel",
    description: post.excerpt,
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Wie oft sollte man ein Büro reinigen lassen? Tipps für Unternehmen in Basel",
  author: { "@type": "Organization", name: "D'Namar Reinigungsdienst Basel" },
  publisher: { "@type": "Organization", name: "D'Namar Reinigungsdienst Basel", url: "https://dnamar.ch" },
  datePublished: "2025-03-10",
  mainEntityOfPage: "https://dnamar.ch/blog/bueroreinigung-tipps-basel",
};

export default async function BlogBueroreinigungPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const post = t.raw("posts.bueroreinigung-tipps-basel") as { title: string; excerpt: string; category: string; date: string; readTime: string };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <section className="bg-navy pt-28 pb-14">
        <div className="section-container max-w-3xl">
          <div className="flex items-center gap-2 text-brand text-sm font-semibold mb-4">
            <Link href="/blog" className="hover:text-brand-light transition-colors">{t("blogPost.backToBlog")}</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/60">{t("blogPost.bueroreinigung")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
            <span>{post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime} {t("readTime")}</span>
            <span>·</span>
            <span>{t("blogPost.author")}</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <article className="bg-white py-14">
        <div className="section-container max-w-3xl prose prose-slate prose-headings:text-navy prose-headings:font-bold prose-a:text-brand prose-strong:text-navy max-w-none">

          <p className="text-lg text-foreground/75 leading-relaxed not-prose mb-8">
            {post.excerpt}
          </p>

          <h2>Warum regelmässige Büroreinigung entscheidend ist</h2>
          <p>
            Büros sind Orte, an denen viele Menschen täglich zusammenkommen. Tastaturen,
            Türgriffe, Aufzugsknöpfe und Pausenräume sind ideale Übertragungswege für
            Bakterien und Viren. Eine saubere Arbeitsumgebung reduziert nachweislich Krankheitsausfälle
            und steigert die Konzentration und Produktivität.
          </p>

          <h2>Die richtige Reinigungsfrequenz</h2>
          <h3>Kleine Büros (bis 5 Personen)</h3>
          <p>Bei wenigen Mitarbeitenden reicht in der Regel eine <strong>wöchentliche Grundreinigung</strong> aus.</p>

          <h3>Mittlere Büros (5–20 Personen)</h3>
          <p>Ab fünf oder mehr Personen empfehlen wir eine <strong>zweimal wöchentliche Reinigung</strong>.</p>

          <h3>Grosse Büros und Open Spaces (20+ Personen)</h3>
          <p>Bei grossen Teams ist eine <strong>tägliche Reinigung</strong> der Sanitäranlagen, Küchen und stark frequentierten Bereiche unerlässlich.</p>

          <h2>Fazit</h2>
          <ul>
            <li><strong>Kleines Büro (bis 5 Pers.):</strong> 1× pro Woche</li>
            <li><strong>Mittleres Büro (5–20 Pers.):</strong> 2× pro Woche</li>
            <li><strong>Grosses Büro / Praxis / Fitness:</strong> Täglich</li>
          </ul>
          <p>
            Bei D&apos;Namar erstellen wir Ihnen ein massgeschneidertes Reinigungskonzept –
            passend zu Ihrem Betrieb, Ihrem Budget und Ihrem Zeitplan.
          </p>
        </div>
      </article>

      {/* CTA */}
      <section className="bg-muted py-12 border-t border-border">
        <div className="section-container max-w-3xl">
          <div className="bg-navy rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
            <div>
              <p className="font-bold text-lg mb-1">{t("blogPost.ctaBuero.title")}</p>
              <p className="text-white/65 text-sm">{t("blogPost.ctaBuero.subtitle")}</p>
            </div>
            <Link href="/anfrage" className="btn-primary shrink-0">
              {tCommon("requestQuote")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
