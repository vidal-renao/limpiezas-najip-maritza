import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CheckCircle2, ArrowRight, Droplets, BadgeCheck } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "umzugsreinigung.meta" });
  return { title: t("title"), description: t("description") };
}

const STEP_ICONS = [
  <path key="1" strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
  <path key="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />,
  <path key="3" strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
  <path key="4" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
];

export default async function UmzugsreinigungPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "umzugsreinigung" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const steps = t.raw("steps.items") as Array<{ title: string; desc: string }>;
  const tasks: string[] = t.raw("tasks.items") as string[];
  const sidebarRows = t.raw("sidebar.rows") as Array<{ val: string; label: string }>;

  return (
    <>
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
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand mb-5">
              <BadgeCheck className="w-4 h-4" />
              {t("hero.badge")}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t("hero.title")}{" "}
              <span className="text-brand">{t("hero.titleBrand")}</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl">{t("hero.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/anfrage" className="btn-primary px-8 py-4">{t("hero.ctaPrimary")}</Link>
              <a href="tel:+41792527557" className="btn-secondary px-8 py-4">{tCommon("phone")}</a>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="section-container">
          <h2 className="text-2xl font-bold text-navy text-center mb-10">{t("steps.title")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ title, desc }, i) => (
              <div key={title} className="relative text-center">
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    {STEP_ICONS[i]}
                  </svg>
                </div>
                <div className="absolute top-5 left-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center -ml-6">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-navy text-sm mb-2">{title}</h3>
                <p className="text-xs text-foreground/65 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO + SIDEBAR ─────────────────────────────────────────────── */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 prose prose-sm max-w-none text-foreground/75">
              <h2 className="text-2xl font-bold text-navy not-prose mb-4">{t("seo.title")}</h2>
              <p>{t("seo.p1")}</p>
              <p>
                {t("seo.p2").split(t("seo.p2Bold"))[0]}
                <strong className="text-navy">{t("seo.p2Bold")}</strong>
                {t("seo.p2").split(t("seo.p2Bold"))[1]}
              </p>
              <p>
                {t("seo.p3").split(t("seo.p3Bold"))[0]}
                <strong className="text-navy">{t("seo.p3Bold")}</strong>
                {t("seo.p3").split(t("seo.p3Bold"))[1]}
              </p>
              <p>{t("seo.p4")}</p>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-border bg-white p-6">
                <h3 className="font-bold text-navy mb-4 text-sm uppercase tracking-widest">{t("sidebar.title")}</h3>
                <ul className="space-y-3">
                  {sidebarRows.map(({ val, label }) => (
                    <li key={label} className="flex justify-between text-sm">
                      <span className="font-semibold text-navy">{val}</span>
                      <span className="text-foreground/60 text-xs">{label}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/anfrage" className="btn-primary w-full mt-5 text-center block py-3">
                  {t("sidebar.ctaLabel")}
                </Link>
              </div>
              <div className="rounded-2xl bg-brand/10 border border-brand/20 p-5">
                <p className="font-semibold text-brand text-sm mb-2">{t("sidebar.kalkTitle")}</p>
                <p className="text-xs text-foreground/65 leading-relaxed">{t("sidebar.kalkText")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TASKS ────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2 text-center">{t("tasks.title")}</h2>
            <p className="text-foreground/60 text-center text-sm mb-10">{t("tasks.subtitle")}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {tasks.map((item) => (
                <div key={item} className="flex items-start gap-3 bg-muted rounded-xl border border-border px-5 py-3.5">
                  <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">{item}</span>
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
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand mb-5">
              <Droplets className="w-4 h-4" />
              {tCommon("freeAndNonBinding")}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{t("cta.title")}</h2>
            <p className="text-white/65 mb-6">{t("cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/anfrage" className="btn-primary px-8 py-4">{tCommon("requestQuote")}</Link>
              <a href="tel:+41792527557" className="btn-secondary px-8 py-4">{tCommon("directCall")}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
