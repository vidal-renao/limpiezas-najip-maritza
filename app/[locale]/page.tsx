import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import TrackedLink from "@/components/ui/TrackedLink";
import ServiceSlider from "@/components/ui/ServiceSlider";
import FaqAccordion from "@/components/ui/FaqAccordion";
import GalleryGrid from "@/components/ui/GalleryGrid";
import {
  ShieldCheck,
  Clock,
  MapPin,
  Star,
  BadgeCheck,
  Droplets,
  Sparkles,
  ThumbsUp,
} from "lucide-react";

/* ─── Metadata ──────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const TRUST_ICONS = [Clock, ShieldCheck, MapPin, BadgeCheck];
  const trustBar: string[] = t.raw("trustBar") as string[];

  const WHY_ICONS = [Droplets, Star, Clock, ShieldCheck];
  const whyPoints = t.raw("why.points") as Array<{ title: string; desc: string }>;

  const testimonials = t.raw("testimonials.items") as Array<{
    name: string; location: string; service: string; rating: number; text: string; date: string;
  }>;

  const districts: string[] = t.raw("districts.items") as string[];

  const faqItems = t.raw("faq.items") as Array<{ q: string; a: string }>;

  const kalkBulletIcons = [Droplets, Sparkles, ShieldCheck, ThumbsUp];
  const kalkBullets: string[] = t.raw("kalk.bullets") as string[];

  const signals: string[] = t.raw("hero.signals") as string[];

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden" aria-label="Hero">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, #4caf82 0%, transparent 55%), radial-gradient(circle at 10% 80%, #4caf82 0%, transparent 40%)",
          }}
        />

        <div className="section-container relative z-10 pt-28 pb-20 lg:pt-36 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand mb-6">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                {t("hero.badge")}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                {t("hero.title1")}{" "}
                <span className="text-brand">{t("hero.titleBrand1")}</span>
                {t("hero.titleSep")}
                <br />
                {t("hero.title2")}{" "}
                <span className="text-brand">{t("hero.titleBrand2")}</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed mb-8">
                {t("hero.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <TrackedLink
                  href="/anfrage"
                  eventName="hero_cta_click"
                  eventProps={{ section: "hero" }}
                  className="btn-primary text-base px-8 py-4"
                >
                  {t("hero.ctaPrimary")}
                </TrackedLink>
                <a href="tel:+41792527557" className="btn-secondary text-base px-8 py-4">
                  {t("hero.ctaPhone")}
                </a>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-white/55">
                {signals.map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-brand shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: team photos */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4 h-[500px]">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-navy-dark/50">
                  <Image
                    src="/images/Maritza-Rodrigeuz-771x1024.jpeg"
                    alt="Maritza Rodriguez – D'Namar Basel"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1280px) 30vw, 280px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white font-semibold text-sm">Maritza Rodriguez</p>
                    <p className="text-white/65 text-xs">{t("hero.maritzaRole")}</p>
                  </div>
                </div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-navy-dark/50 mt-14 self-start h-[calc(100%-56px)]">
                  <Image
                    src="/images/Rasuly-bild.jpeg"
                    alt="Nadjib Rasuly – D'Namar Basel"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1280px) 30vw, 280px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white font-semibold text-sm">Nadjib Rasuly</p>
                    <p className="text-white/65 text-xs">{t("hero.nadjibRole")}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 px-6 py-4 flex justify-between">
                {[
                  { val: "500+", label: t("hero.stats.clients") },
                  { val: "10+", label: t("hero.stats.years") },
                  { val: "4.9★", label: t("hero.stats.rating") },
                  { val: "24h", label: t("hero.stats.responseTime") },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center">
                    <p className="text-xl font-bold text-white">{val}</p>
                    <p className="text-xs text-white/55 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-border py-6" aria-label="Trust signals">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBar.map((label, i) => {
              const Icon = TRUST_ICONS[i];
              return (
                <div key={label} className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <span className="text-sm font-semibold text-navy">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICE SLIDER ────────────────────────────────────────────────── */}
      <section className="bg-muted py-20 lg:py-28" aria-labelledby="slider-heading">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-brand font-semibold text-sm uppercase tracking-widest">
              {t("services.eyebrow")}
            </span>
            <h2 id="slider-heading" className="mt-2 text-3xl sm:text-4xl font-bold text-navy">
              {t("services.title")}
            </h2>
            <p className="mt-4 text-foreground/65 max-w-xl mx-auto leading-relaxed">
              {t("services.subtitle")}
            </p>
          </div>

          <ServiceSlider />

          <div className="text-center mt-8">
            <Link href="/anfrage" className="btn-primary text-base px-8 py-4">
              {t("services.cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY D'NAMAR ───────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28" aria-labelledby="why-heading">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>
              <span className="text-brand font-semibold text-sm uppercase tracking-widest">
                {t("why.eyebrow")}
              </span>
              <h2 id="why-heading" className="mt-2 text-3xl sm:text-4xl font-bold text-navy leading-snug mb-8">
                {t("why.title")}
                <br />{t("why.titleLine2")}
              </h2>

              <ul className="space-y-6">
                {whyPoints.map(({ title, desc }, i) => {
                  const Icon = WHY_ICONS[i];
                  return (
                    <li key={title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-brand" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy mb-1">{title}</h3>
                        <p className="text-sm text-foreground/65 leading-relaxed">{desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8">
                <Link href="/ueber-uns" className="inline-flex items-center gap-2 text-brand font-semibold text-sm hover:text-brand-dark transition-colors">
                  {t("why.learnMore")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
                  <Image
                    src="/images/Maritza-Rodrigeuz-771x1024.jpeg"
                    alt="Maritza Rodriguez, D'Namar Basel"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 50vw, 280px"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
                    <Image
                      src="/images/Rasuly-bild.jpeg"
                      alt="Nadjib Rasuly, D'Namar Basel"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 50vw, 280px"
                    />
                  </div>
                  <div className="bg-navy rounded-2xl p-5 text-white">
                    <svg className="w-6 h-6 text-brand mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-sm text-white/85 leading-relaxed italic">{t("why.quote")}</p>
                    <p className="mt-3 text-xs text-brand font-semibold">{t("why.quoteAuthor")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KALKSCHUTZ ────────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden py-20 lg:py-28" aria-labelledby="kalk-heading">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #4caf82 0%, transparent 55%), radial-gradient(circle at 85% 20%, #4caf82 0%, transparent 40%)",
          }}
        />

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src="/images/Fenster-blauer-Himmel-768x512.jpg"
                  alt="D'Namar Glasreinigung Basel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              </div>

              <div className="absolute -bottom-5 -right-5 lg:bottom-8 lg:-right-8 bg-brand rounded-2xl px-5 py-4 shadow-xl shadow-brand/30 flex items-center gap-3">
                <Droplets className="w-7 h-7 text-white shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm leading-none">{t("kalk.badgeTitle")}</p>
                  <p className="text-white/75 text-xs mt-0.5">{t("kalk.badgeSub")}</p>
                </div>
              </div>

              <div className="absolute -top-5 -left-5 lg:-top-6 lg:-left-6 w-16 h-16 rounded-2xl overflow-hidden border-2 border-brand/40 shadow-lg bg-navy">
                <Image
                  src="/images/N.jpeg"
                  alt="D'Namar Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <span className="inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand font-semibold mb-5">
                {t("kalk.eyebrow")}
              </span>

              <h2 id="kalk-heading" className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
                {t("kalk.title1")} <span className="text-brand">{t("kalk.titleBrand")}</span>
                <br />{t("kalk.titleLine2")}
              </h2>

              <div className="space-y-5 text-white/75 leading-relaxed text-[15px]">
                <p>
                  {t.rich("kalk.p1", {
                    strong: (chunks) => <strong className="text-white">{chunks}</strong>,
                  })}
                </p>
                <p>
                  {t.rich("kalk.p2", {
                    strong: (chunks) => <strong className="text-white">{chunks}</strong>,
                  })}
                </p>
                <p>{t("kalk.p3")}</p>
              </div>

              <ul className="mt-8 space-y-3">
                {kalkBullets.map((text, i) => {
                  const Icon = kalkBulletIcons[i];
                  return (
                    <li key={text} className="flex items-center gap-3 text-sm text-white/80">
                      <span className="w-7 h-7 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-brand" />
                      </span>
                      {text}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <TrackedLink
                  href="/anfrage"
                  eventName="kalkschutz_cta_click"
                  eventProps={{ section: "kalkschutz" }}
                  className="btn-primary px-8 py-4 text-base"
                >
                  {t("kalk.ctaPrimary")}
                </TrackedLink>
                <Link href="/glasreinigung" className="inline-flex items-center gap-2 text-brand font-semibold text-sm hover:text-brand-light transition-colors pt-2">
                  {t("kalk.ctaSecondary")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="bg-muted py-20 lg:py-24" aria-labelledby="reviews-heading">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-brand font-semibold text-sm uppercase tracking-widest">
              {t("testimonials.eyebrow")}
            </span>
            <h2 id="reviews-heading" className="mt-2 text-3xl sm:text-4xl font-bold text-navy">
              {t("testimonials.title")}
            </h2>
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-foreground/60">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </span>
              <span>{t("testimonials.rating")}</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(({ name, location, service, rating, text, date }) => (
              <div key={name} className="bg-white rounded-2xl border border-border p-7 shadow-sm flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-foreground/75 leading-relaxed flex-1 mb-5">
                  &ldquo;{text}&rdquo;
                </blockquote>
                <div className="border-t border-border pt-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-navy text-sm">{name}</p>
                    <p className="text-xs text-foreground/50">{location}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-full bg-brand/10 text-brand text-xs font-semibold px-2.5 py-0.5">
                      {service}
                    </span>
                    <p className="text-xs text-foreground/40 mt-1">{date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/referenzen" className="inline-flex items-center gap-2 text-brand font-semibold text-sm hover:text-brand-dark transition-colors">
              {t("testimonials.viewAll")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── DISTRICT COVERAGE ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20 border-y border-border" aria-label="Service area">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: text + badges */}
            <div>
              <span className="text-brand font-semibold text-sm uppercase tracking-widest">
                {t("districts.eyebrow")}
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-navy mb-3">
                {t("districts.title")}
              </h2>
              <p className="text-foreground/60 text-sm mb-7">{t("districts.subtitle")}</p>

              <div className="flex flex-wrap gap-2.5 mb-7">
                {districts.map((d) => (
                  <span key={d} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3.5 py-1.5 text-sm text-foreground/70 font-medium hover:border-brand/40 hover:text-navy transition-colors">
                    <MapPin className="w-3.5 h-3.5 text-brand shrink-0" />
                    {d}
                  </span>
                ))}
              </div>

              <Link href="/anfrage" className="btn-primary text-sm px-6 py-3">
                {t("districts.cta")}
              </Link>
            </div>

            {/* Right: Google Maps embed */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-md h-72 lg:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43389.86617043455!2d7.5434566!3d47.5595986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4791b9a441b50327%3A0x5a336bfe16a3b2a4!2sBasel%2C%20Switzerland!5e0!3m2!1sen!2sch!4v1709900000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("districts.mapTitle")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────────────────────── */}
      <GalleryGrid
        title={t("gallery.title")}
        subtitle={t("gallery.subtitle")}
        items={[
          { src: "/images/Buero-768x512.jpg", alt: t("gallery.items.buero"), label: t("gallery.labels.buero") },
          { src: "/images/Boden-wischen-768x512.jpg", alt: t("gallery.items.boden"), label: t("gallery.labels.boden") },
          { src: "/images/Fenster-blauer-Himmel-768x512.jpg", alt: t("gallery.items.fenster"), label: t("gallery.labels.fenster") },
          { src: "/images/Herd-768x512.jpg", alt: t("gallery.items.herd"), label: t("gallery.labels.herd") },
          { src: "/images/Treppe-Vorraum-768x511.jpg", alt: t("gallery.items.treppe"), label: t("gallery.labels.treppe") },
          { src: "/images/Gewerberaum-768x512.jpg", alt: t("gallery.items.gewerbe"), label: t("gallery.labels.gewerbe") },
          { src: "/images/Oberflaechen-768x512.jpg", alt: t("gallery.items.oberflaechen"), label: t("gallery.labels.oberflaechen") },
          { src: "/images/Teppichboden-768x512.jpg", alt: t("gallery.items.teppich"), label: t("gallery.labels.teppich") },
        ]}
      />

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="bg-muted py-20 lg:py-24" aria-labelledby="faq-heading">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-brand font-semibold text-sm uppercase tracking-widest">
                {t("faq.eyebrow")}
              </span>
              <h2 id="faq-heading" className="mt-2 text-3xl sm:text-4xl font-bold text-navy">
                {t("faq.title")}
              </h2>
            </div>

            <FaqAccordion items={faqItems} />

            <div className="mt-8 text-center">
              <p className="text-foreground/60 text-sm mb-4">{t("faq.moreQuestions")}</p>
              <Link href="/kontakt" className="btn-primary px-8 py-3">
                {t("faq.askNow")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="relative bg-navy py-20 lg:py-24 overflow-hidden" aria-label="CTA">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #4caf82 0%, transparent 60%)" }}
        />

        <div className="section-container relative z-10 text-center">
          <span className="inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1 text-sm text-brand font-semibold mb-5">
            {t("cta.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            {t("cta.title")}
          </h2>
          <p className="text-white/65 max-w-xl mx-auto mb-8 text-lg leading-relaxed">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedLink
              href="/anfrage"
              eventName="contact_cta_click"
              eventProps={{ section: "cta_banner" }}
              className="btn-primary text-base px-8 py-4"
            >
              {t("cta.ctaPrimary")}
            </TrackedLink>
            <a href="tel:+41792527557" className="btn-secondary text-base px-8 py-4">
              {t("cta.ctaPhone")}
            </a>
          </div>
          <p className="mt-6 text-white/40 text-sm">{t("cta.hours")}</p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map(({ q, a }) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Reinigungsdienstleistungen D'Namar Basel",
            description: "Professionelle Reinigungsdienstleistungen in Basel für Privat und Gewerbe.",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Haushaltsreinigung Basel", url: "https://dnamar.ch/haushaltsreinigung" },
              { "@type": "ListItem", position: 2, name: "Büroreinigung Basel", url: "https://dnamar.ch/bueroreinigung" },
              { "@type": "ListItem", position: 3, name: "Umzugsreinigung Basel", url: "https://dnamar.ch/umzugsreinigung" },
              { "@type": "ListItem", position: 4, name: "Glasreinigung Basel", url: "https://dnamar.ch/glasreinigung" },
              { "@type": "ListItem", position: 5, name: "Treppenhausreinigung Basel", url: "https://dnamar.ch/treppenhausreinigung" },
              { "@type": "ListItem", position: 6, name: "Tiefenreinigung Basel", url: "https://dnamar.ch/tiefenreinigung" },
              { "@type": "ListItem", position: 7, name: "Praxisreinigung Basel", url: "https://dnamar.ch/praxisreinigung" },
              { "@type": "ListItem", position: 8, name: "Bauendreinigung Basel", url: "https://dnamar.ch/renovationsreinigung" },
            ],
          }),
        }}
      />
    </>
  );
}
