import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle2, Loader2 } from "lucide-react";
import AnfrageForm from "@/components/AnfrageForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "anfrage.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function AnfragePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "anfrage" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const promises: string[] = t.raw("hero.promises") as string[];
  const stats = t.raw("sidebar.stats") as Array<{ val: string; label: string }>;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden py-20 lg:py-24">
        <div aria-hidden className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #4caf82 0%, transparent 55%)" }} />
        <div className="section-container relative z-10 text-center">
          <div className="inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand font-semibold mb-5">
            {t("hero.badge")}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            {t("hero.title")}{" "}
            <span className="text-brand">{t("hero.titleBrand")}</span>
          </h1>
          <p className="text-white/65 max-w-xl mx-auto mb-8">{t("hero.subtitle")}</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {promises.map((p) => (
              <span key={p} className="flex items-center gap-2 text-sm text-white/70">
                <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                {p}
              </span>
            ))}
          </div>
        </div>
        <div aria-hidden className="absolute bottom-0 left-0 right-0 h-16 bg-muted"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>

      {/* ── FORM + SIDEBAR ───────────────────────────────────────────── */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Form */}
            <div className="lg:col-span-2">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-brand animate-spin" />
                    <span className="ml-3 text-foreground/60">{t("form.formLoading")}</span>
                  </div>
                }
              >
                <AnfrageForm />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-border bg-white p-6">
                <h3 className="font-bold text-navy mb-4 text-sm uppercase tracking-widest">
                  {t("sidebar.whyTitle")}
                </h3>
                <ul className="space-y-3">
                  {stats.map(({ val, label }) => (
                    <li key={label} className="flex justify-between text-sm">
                      <span className="font-bold text-brand">{val}</span>
                      <span className="text-foreground/60">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-brand/10 border border-brand/20 p-5">
                <h4 className="font-semibold text-navy text-sm mb-2">{t("sidebar.guaranteeTitle")}</h4>
                <p className="text-xs text-foreground/65 leading-relaxed">{t("sidebar.guaranteeText")}</p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-5">
                <p className="font-semibold text-navy text-sm mb-3">{t("sidebar.callTitle")}</p>
                <a href="tel:+41792527557" className="flex items-center gap-2 text-brand font-bold text-lg hover:text-brand-dark transition-colors">
                  {tCommon("phone")}
                </a>
                <p className="text-xs text-foreground/50 mt-1">{t("sidebar.hours")}</p>
                <a
                  href="https://wa.me/41792527557"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-2 text-sm text-brand font-semibold hover:text-brand-dark transition-colors"
                >
                  {t("sidebar.whatsappLink")} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
