import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CheckCircle2, Clock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const post = t.raw("posts.umzug-endreinigung-checkliste-basel") as { title: string; excerpt: string; readTime: string };
  return {
    title: post.title + " | D'Namar Basel",
    description: post.excerpt,
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Checkliste für die Endreinigung bei einem Umzug in Basel",
  author: { "@type": "Organization", name: "D'Namar Reinigungsdienst Basel" },
  publisher: { "@type": "Organization", name: "D'Namar Reinigungsdienst Basel", url: "https://dnamar.ch" },
  datePublished: "2025-02-25",
  mainEntityOfPage: "https://dnamar.ch/blog/umzug-endreinigung-checkliste-basel",
};

const CHECKLIST: { room: string; items: string[] }[] = [
  {
    room: "Allgemein – alle Räume",
    items: [
      "Böden vollständig saugen und feucht wischen",
      "Fenster innen und aussen putzen (streifenfrei)",
      "Türen, Türrahmen und Türgriffe reinigen",
      "Wandschränke und Einbauschränke innen reinigen",
    ],
  },
  {
    room: "Küche",
    items: [
      "Herd, Glaskeramik und Ceranfeld entfetten",
      "Backofen innen und aussen gründlich reinigen",
      "Dunstabzugshaube: Filter und Haubeninnenseite",
      "Kühlschrank abtauen und innen reinigen",
    ],
  },
  {
    room: "Badezimmer & WC",
    items: [
      "Armaturen und Dusche entkalken und polieren",
      "Badewanne und Waschbecken desinfizieren",
      "Fliesen und Fugen reinigen",
      "WC vollständig desinfizieren",
    ],
  },
  {
    room: "Böden & Abschluss",
    items: [
      "Alle Böden abschliessend saugen und wischen",
      "Briefkasten und Eingangsbereich reinigen",
      "Keller auf Wunsch reinigen",
      "Schlüsselübergabe vorbereiten",
    ],
  },
];

export default async function BlogUmzugPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const post = t.raw("posts.umzug-endreinigung-checkliste-basel") as { title: string; excerpt: string; category: string; date: string; readTime: string };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <section className="bg-navy pt-28 pb-14">
        <div className="section-container max-w-3xl">
          <div className="flex items-center gap-2 text-brand text-sm font-semibold mb-4">
            <Link href="/blog" className="hover:text-brand-light transition-colors">{t("blogPost.backToBlog")}</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/60">{t("blogPost.umzugsreinigung")}</span>
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
        <div className="section-container max-w-3xl">
          <p className="text-lg text-foreground/75 leading-relaxed mb-10">{post.excerpt}</p>

          <div className="space-y-8">
            {CHECKLIST.map(({ room, items }) => (
              <div key={room}>
                <h2 className="text-xl font-bold text-navy mb-4">{room}</h2>
                <div className="grid sm:grid-cols-2 gap-2">
                  {items.map((item) => (
                    <div key={item} className="flex items-start gap-3 bg-muted rounded-xl border border-border px-4 py-3">
                      <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/75">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-brand/10 border border-brand/20">
            <p className="font-semibold text-navy mb-2">Tipp von D&apos;Namar</p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Mit der Abgabegarantie von D&apos;Namar können Sie entspannt zur Wohnungsübergabe gehen.
              Falls die Verwaltung Mängel feststellt, kommen wir kostenlos nochmals – bis zur erfolgreichen Abnahme.
            </p>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="bg-muted py-12 border-t border-border">
        <div className="section-container max-w-3xl">
          <div className="bg-navy rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
            <div>
              <p className="font-bold text-lg mb-1">{t("blogPost.ctaUmzug.title")}</p>
              <p className="text-white/65 text-sm">{t("blogPost.ctaUmzug.subtitle")}</p>
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
