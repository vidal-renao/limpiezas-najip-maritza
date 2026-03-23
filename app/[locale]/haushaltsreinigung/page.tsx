import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  ArrowRight,
  Sparkles,
  Droplets,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "haushaltsreinigung.meta" });
  return { title: t("title"), description: t("description") };
}

const BENEFIT_ICONS = [Clock, ShieldCheck, Sparkles, Star];

export default async function HaushaltsreinigungPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "haushaltsreinigung" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const benefits = t.raw("benefits") as Array<{ title: string; desc: string }>;
  const tasks: string[] = t.raw("tasks.items") as string[];
  const sidebarRows = t.raw("sidebar.rows") as Array<{ val: string; label: string }>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("hero.title") + " " + t("hero.titleBrand"),
    provider: {
      "@type": "LocalBusiness",
      name: "D'Namar Reinigungsdienst",
      telephone: "+41792527557",
      address: { "@type": "PostalAddress", addressLocality: "Basel", addressCountry: "CH" },
    },
    areaServed: { "@type": "City", name: "Basel", addressCountry: "CH" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #4caf82 0%, transparent 55%)" }} />
        <div className="section-container relative z-10 pt-28 pb-20 lg:pt-36 lg:pb-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
              <Link href="/" className="hover:text-brand transition-colors">{t("hero.eyebrow")}</Link>
              <ArrowRight className="w-4 h-4" />
              <span className="text-white/70">{t("breadcrumb")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t("hero.title")}{" "}
              <span className="text-brand">{t("hero.titleBrand")}</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl">{t("hero.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/anfrage" className="btn-primary px-8 py-4">{tCommon("requestQuote")}</Link>
              <a href="tel:+41792527557" className="btn-secondary px-8 py-4">{tCommon("phone")}</a>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ title, desc }, i) => {
              const Icon = BENEFIT_ICONS[i];
              return (
                <div key={title} className="rounded-2xl border border-border p-6 bg-muted">
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <h3 className="font-semibold text-navy mb-2 text-sm">{title}</h3>
                  <p className="text-xs text-foreground/65 leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SEO + SIDEBAR ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 prose prose-sm max-w-none text-foreground/75">
              <h2 className="text-2xl font-bold text-navy not-prose mb-4">{t("seo.title")}</h2>
              <p>{t("seo.p1")}</p>
              <p>{t("seo.p2")}</p>
              <p>
                {t("seo.p3").split(t("seo.p3Bold"))[0]}
                <strong className="text-navy">{t("seo.p3Bold")}</strong>
                {t("seo.p3").split(t("seo.p3Bold"))[1]}
              </p>
              <p>{t("seo.p4")}</p>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-border bg-muted p-6">
                <h3 className="font-bold text-navy mb-4 text-sm uppercase tracking-widest">{t("sidebar.title")}</h3>
                <ul className="space-y-3">
                  {sidebarRows.map(({ val, label }) => (
                    <li key={label} className="flex justify-between text-sm">
                      <span className="font-semibold text-navy">{val}</span>
                      <span className="text-foreground/60">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-brand/10 border border-brand/20 p-5 flex items-start gap-3">
                <Droplets className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-brand text-sm">{t("sidebar.kalkBadge")}</p>
                  <p className="text-xs text-foreground/65 mt-1">{t("sidebar.kalkText")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TASKS ────────────────────────────────────────────────────── */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2 text-center">{t("tasks.title")}</h2>
            <p className="text-foreground/60 text-center text-sm mb-10">{t("tasks.subtitle")}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {tasks.map((item) => (
                <div key={item} className="flex items-start gap-3 bg-white rounded-xl border border-border px-5 py-3.5 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICE TEASER + CTA ────────────────────────────────────────── */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white/50 text-sm uppercase tracking-widest mb-2">{t("priceTeaser.label")}</p>
            <p className="text-5xl font-bold text-brand mb-1">{t("priceTeaser.price")}</p>
            <p className="text-white/60 text-sm mb-2">{t("priceTeaser.unit")}</p>
            <p className="text-white/50 text-xs mb-8">{t("priceTeaser.sub")}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{t("cta.title")}</h2>
            <p className="text-white/65 mb-6">{t("cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/anfrage" className="btn-primary px-8 py-4">{tCommon("requestQuote")}</Link>
              <Link href="/preise" className="btn-secondary px-8 py-4">{tCommon("viewPrices")}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
