import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Reinigungstipps | D'Namar Basel",
  description:
    "Ratgeber und Tipps rund um Reinigung in Basel. Wie oft soll man das Büro reinigen? Checkliste für die Umzugsreinigung – und mehr von D'Namar.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "D'Namar Reinigungsblog Basel",
  description: "Ratgeber und Tipps rund um Reinigung in Basel – für Haushalte und Unternehmen.",
  url: "https://dnamar.ch/blog",
  publisher: {
    "@type": "Organization",
    name: "D'Namar Reinigungsdienst",
    url: "https://dnamar.ch",
  },
  blogPost: [
    {
      "@type": "BlogPosting",
      headline: "Wie oft sollte man ein Büro reinigen lassen? Tipps für Unternehmen in Basel",
      url: "https://dnamar.ch/blog/bueroreinigung-tipps-basel",
      datePublished: "2025-03-10",
      author: { "@type": "Organization", name: "D'Namar Reinigungsdienst" },
    },
    {
      "@type": "BlogPosting",
      headline: "Checkliste für die Endreinigung bei einem Umzug in Basel",
      url: "https://dnamar.ch/blog/umzug-endreinigung-checkliste-basel",
      datePublished: "2025-02-25",
      author: { "@type": "Organization", name: "D'Namar Reinigungsdienst" },
    },
  ],
};

const POSTS = [
  {
    slug: "bueroreinigung-tipps-basel",
    title: "Wie oft sollte man ein Büro reinigen lassen? Tipps für Unternehmen in Basel",
    excerpt:
      "Ein sauberes Büro ist mehr als Ästhetik – es schützt die Gesundheit Ihrer Mitarbeitenden und hinterlässt einen professionellen Eindruck. Wir erklären, welche Reinigungsfrequenz für Ihren Betrieb optimal ist.",
    category: "Büroreinigung",
    date: "10. März 2025",
    readTime: "6 Min.",
  },
  {
    slug: "umzug-endreinigung-checkliste-basel",
    title: "Checkliste für die Endreinigung bei einem Umzug in Basel",
    excerpt:
      "Wer in Basel aus einer Mietwohnung auszieht, muss eine gründliche Endreinigung vorweisen. Mit dieser Checkliste verpassen Sie keinen Punkt und vermeiden unnötige Kosten.",
    category: "Umzugsreinigung",
    date: "25. Februar 2025",
    readTime: "7 Min.",
  },
];

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* HEADER */}
      <section className="bg-navy pt-28 pb-16">
        <div className="section-container">
          <span className="text-brand font-semibold text-sm uppercase tracking-widest">
            Wissen & Tipps
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Reinigungsblog
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            Ratgeber, Checklisten und Expertentipps rund um Reinigung –
            für Haushalte und Unternehmen in Basel.
          </p>
        </div>
      </section>

      {/* POSTS */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
            {POSTS.map(({ slug, title, excerpt, category, date, readTime }) => (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="group bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md hover:border-brand/30 transition-all"
              >
                {/* Color band */}
                <div className="h-2 bg-gradient-to-r from-navy to-brand" />

                <div className="p-7 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold bg-brand/10 text-brand rounded-full px-2.5 py-0.5">
                      {category}
                    </span>
                    <span className="text-xs text-foreground/40">{readTime} Lesezeit</span>
                  </div>

                  <h2 className="font-bold text-navy text-lg leading-snug group-hover:text-brand transition-colors">
                    {title}
                  </h2>

                  <p className="text-sm text-foreground/65 leading-relaxed flex-1">{excerpt}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-xs text-foreground/40">{date}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                      Weiterlesen
                      <svg className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-14">
        <div className="section-container text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Fragen zur Reinigung in Basel?
          </h2>
          <p className="text-white/65 mb-7 max-w-sm mx-auto">
            Wir beraten Sie gerne – kostenlos und unverbindlich.
          </p>
          <Link href="/anfrage" className="btn-primary text-base px-8 py-4">
            Kostenlose Offerte anfordern
          </Link>
        </div>
      </section>
    </>
  );
}
