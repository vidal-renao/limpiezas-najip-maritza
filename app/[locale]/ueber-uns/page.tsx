import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BadgeCheck, Droplets, ShieldCheck, Star, Clock, Heart, Users } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ueber-uns.meta" });
  return { title: t("title"), description: t("description") };
}

const VALUE_ICONS = [Clock, Heart, ShieldCheck, Users, Droplets, BadgeCheck];

export default async function UeberUnsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "ueber-uns" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const heroStats = t.raw("hero.stats") as Array<{ value: string; label: string }>;
  const values = t.raw("values.items") as Array<{ title: string; desc: string }>;
  const timeline = t.raw("timeline.items") as Array<{ year: string; period: string; text: string }>;
  const qualityBullets: string[] = t.raw("qualityPromise.bullets") as string[];
  const maritzaTags: string[] = t.raw("team.maritza.tags") as string[];
  const nadjibTags: string[] = t.raw("team.nadjib.tags") as string[];
  const ctaTrust: string[] = t.raw("cta.trust") as string[];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        style={{
          backgroundImage: "url('/images/fondo.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay for legibility */}
        <div aria-hidden className="absolute inset-0 bg-black/40" />
        {/* Green radial accent */}
        <div aria-hidden className="absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #4caf82 0%, transparent 55%)" }} />
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand font-semibold mb-6">
              {t("hero.badge")}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t("hero.title1")}{" "}
              <span className="text-brand">{t("hero.titleBrand")}</span>
              <br />{t("hero.title2")}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl">{t("hero.subtitle")}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {heroStats.map(({ value, label }) => (
                <div key={label} className="bg-white/10 rounded-2xl p-4 text-center">
                  <p className="text-xl font-bold text-brand">{value}</p>
                  <p className="text-xs text-white/60 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>

      {/* ── MANIFEST ─────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-brand font-semibold text-sm uppercase tracking-widest">{t("manifest.eyebrow")}</span>
              <h2 className="mt-2 text-3xl font-bold text-navy mb-6">
                {t("manifest.title1")}<br />{t("manifest.title2")}
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed text-[15px]">
                <p>
                  {t("manifest.p1").split(t("manifest.p1Bold"))[0]}
                  <strong className="text-navy">{t("manifest.p1Bold")}</strong>
                  {t("manifest.p1").split(t("manifest.p1Bold"))[1]}
                </p>
                <p>{t("manifest.p2")}</p>
                <p>{t("manifest.p3")}</p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <Link href="/referenzen" className="inline-flex items-center gap-2 text-brand font-semibold text-sm hover:text-brand-dark transition-colors">
                  {t("manifest.readReferences")} →
                </Link>
                <span className="rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs text-brand font-semibold">
                  {t("manifest.badgeVerified")}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
                <Image src="/images/Maritza-Rodrigeuz-771x1024.jpeg" alt="Maritza Rodriguez – D'Namar" fill className="object-cover object-top" sizes="280px" />
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg mt-8">
                <Image src="/images/nadjib.webp" alt="Nadjib Rasuly – D'Namar" fill className="object-cover object-top" sizes="280px" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────── */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-brand font-semibold text-sm uppercase tracking-widest">{t("values.eyebrow")}</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-navy">{t("values.title")}</h2>
            <p className="mt-2 text-foreground/60 text-sm max-w-xl mx-auto">{t("values.subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ title, desc }, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <div key={title} className="bg-white rounded-2xl border border-border p-6">
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <h3 className="font-semibold text-navy mb-2">{title}</h3>
                  <p className="text-sm text-foreground/65 leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-brand font-semibold text-sm uppercase tracking-widest">{t("team.eyebrow")}</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-navy">{t("team.title")}</h2>
            <p className="mt-2 text-foreground/60 text-sm max-w-xl mx-auto">{t("team.subtitle")}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Maritza */}
            <div className="rounded-3xl border border-border bg-muted p-8">
              <div className="flex gap-6 mb-6">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                  <Image src="/images/Maritza-Rodrigeuz-771x1024.jpeg" alt={t("team.maritza.name")} fill className="object-cover object-top" sizes="80px" />
                </div>
                <div>
                  <h3 className="font-bold text-navy text-lg">{t("team.maritza.name")}</h3>
                  <p className="text-brand text-sm font-semibold">{t("team.maritza.role")}</p>
                </div>
              </div>
              <blockquote className="text-sm text-foreground/70 italic leading-relaxed mb-4">{t("team.maritza.quote")}</blockquote>
              <p className="text-sm text-foreground/65 leading-relaxed mb-2">{t("team.maritza.p1")}</p>
              <p className="text-sm text-foreground/65 leading-relaxed mb-4">{t("team.maritza.p2")}</p>
              <div className="flex flex-wrap gap-2">
                {maritzaTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-brand/10 text-brand text-xs font-semibold px-3 py-1">{tag}</span>
                ))}
              </div>
            </div>
            {/* Nadjib */}
            <div className="rounded-3xl border border-border bg-muted p-8">
              <div className="flex gap-6 mb-6">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                  <Image src="/images/nadjib.webp" alt={t("team.nadjib.name")} fill className="object-cover object-top" sizes="80px" />
                </div>
                <div>
                  <h3 className="font-bold text-navy text-lg">{t("team.nadjib.name")}</h3>
                  <p className="text-brand text-sm font-semibold">{t("team.nadjib.role")}</p>
                </div>
              </div>
              <blockquote className="text-sm text-foreground/70 italic leading-relaxed mb-4">{t("team.nadjib.quote")}</blockquote>
              <p className="text-sm text-foreground/65 leading-relaxed mb-2">{t("team.nadjib.p1")}</p>
              <p className="text-sm text-foreground/65 leading-relaxed mb-4">{t("team.nadjib.p2")}</p>
              <div className="flex flex-wrap gap-2">
                {nadjibTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-brand/10 text-brand text-xs font-semibold px-3 py-1">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUALITY PROMISE ──────────────────────────────────────────── */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-brand font-semibold text-sm uppercase tracking-widest">{t("qualityPromise.eyebrow")}</span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-navy mb-6">
                {t("qualityPromise.title1")}<br />{t("qualityPromise.title2")}
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed text-[15px]">
                <p>{t("qualityPromise.p1")}</p>
                <p>
                  {t("qualityPromise.p2").split(t("qualityPromise.p2Bold"))[0]}
                  <strong className="text-navy">{t("qualityPromise.p2Bold")}</strong>
                  {t("qualityPromise.p2").split(t("qualityPromise.p2Bold"))[1]}
                </p>
                <p>
                  {t("qualityPromise.p3").split(t("qualityPromise.p3Bold"))[0]}
                  <strong className="text-navy">{t("qualityPromise.p3Bold")}</strong>
                  {t("qualityPromise.p3").split(t("qualityPromise.p3Bold"))[1]}
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                {qualityBullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-foreground/75">
                    <BadgeCheck className="w-4 h-4 text-brand shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-navy p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Droplets className="w-6 h-6 text-brand" />
                <p className="font-bold text-brand">{t("qualityPromise.kalkTitle")}</p>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{t("qualityPromise.kalkText")}</p>
              <div className="mt-6">
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-white/50 text-xs">4.9 / 5 – 90+ Basel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-brand font-semibold text-sm uppercase tracking-widest">{t("timeline.eyebrow")}</span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-navy">{t("timeline.title")}</h2>
            </div>
            <div className="relative pl-8 border-l-2 border-border space-y-10">
              {timeline.map(({ year, period, text }) => (
                <div key={period} className="relative">
                  <div className="absolute -left-[2.3rem] w-4 h-4 rounded-full bg-brand border-2 border-white shadow" />
                  <p className="text-brand font-bold text-sm">{period}</p>
                  <p className="font-semibold text-navy mt-0.5 mb-2">{year}</p>
                  <p className="text-sm text-foreground/65 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {t("cta.title1")}{" "}
              <span className="text-brand">{t("cta.titleBrand")}</span>
            </h2>
            <p className="text-white/65 mb-6">{t("cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/anfrage" className="btn-primary px-8 py-4">{tCommon("requestQuote")}</Link>
              <a href="tel:+41792527557" className="btn-secondary px-8 py-4">{t("cta.ctaSecondary")}</a>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {ctaTrust.map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-xs text-white/50">
                  <BadgeCheck className="w-3.5 h-3.5 text-brand" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
