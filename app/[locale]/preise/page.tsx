import type { Metadata } from "next";
import PriceCalculator from "@/components/ui/PriceCalculator";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Home,
  Building2,
  PackageOpen,
  Layers,
  GlassWater,
  Warehouse,
  BadgeCheck,
  Info,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "preise.meta" });
  return { title: t("title"), description: t("description") };
}

const SECTION_ICONS = {
  haushaltsreinigung: Home,
  umzugsreinigung: PackageOpen,
  bueroreinigung: Building2,
  glasreinigung: GlassWater,
  treppenhausreinigung: Layers,
  gewerbereinigung: Warehouse,
};

const SECTION_KEYS = ["haushaltsreinigung", "umzugsreinigung", "bueroreinigung", "glasreinigung", "treppenhausreinigung", "gewerbereinigung"] as const;

type PriceRow = {
  service: string;
  detail: string;
  price: string;
  unit: string;
  highlight?: boolean;
};

type SectionData = {
  category: string;
  tagline: string;
  description: string;
  ctaLabel: string;
  note: string | null;
  rows: PriceRow[];
};

export default async function PreisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "preise" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const alwaysIncludedItems: string[] = t.raw("alwaysIncluded.items") as string[];
  const sections = SECTION_KEYS.map((key) => ({
    id: key,
    Icon: SECTION_ICONS[key],
    ...(t.raw(`sections.${key}`) as SectionData),
  }));

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden py-20 lg:py-28">
        <div aria-hidden className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #4caf82 0%, transparent 55%)" }} />
        <div className="section-container relative z-10 text-center">
          <div className="inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand font-semibold mb-5">
            {t("hero.badge")}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            {t("hero.title1")}{" "}
            <span className="text-brand">{t("hero.titleBrand")}</span>
          </h1>
          <p className="text-white/65 max-w-2xl mx-auto leading-relaxed">{t("hero.subtitle")}</p>
        </div>
        <div aria-hidden className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>

      {/* ── PRICE TABLES ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section-container">
          <div className="space-y-16">
            {sections.map(({ id, Icon, category, tagline, description, rows, note, ctaLabel }) => (
              <div key={id} id={id}>
                {/* Section header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-xl font-bold text-navy">{category}</h2>
                      <span className="text-xs font-semibold text-brand bg-brand/10 px-2.5 py-0.5 rounded-full">
                        {tagline}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/65">{description}</p>
                  </div>
                </div>

                {/* Note */}
                {note && (
                  <div className="flex items-start gap-3 bg-brand/5 border border-brand/20 rounded-xl p-4 mb-4 text-sm text-foreground/75">
                    <Info className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <p>{note}</p>
                  </div>
                )}

                {/* Table */}
                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted border-b border-border">
                      <tr>
                        <th className="text-left px-5 py-3 font-semibold text-navy text-xs uppercase tracking-wider">
                          {t("tableHeaders.service")}
                        </th>
                        <th className="text-left px-5 py-3 font-semibold text-navy text-xs uppercase tracking-wider hidden sm:table-cell">
                          {t("tableHeaders.details")}
                        </th>
                        <th className="text-right px-5 py-3 font-semibold text-navy text-xs uppercase tracking-wider">
                          {t("tableHeaders.price")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-white">
                      {rows.map((row) => (
                        <tr
                          key={row.service}
                          className={row.highlight ? "bg-brand/5" : ""}
                        >
                          <td className="px-5 py-4 font-medium text-navy">
                            {row.service}
                            {row.highlight && (
                              <span className="ml-2 text-xs font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-full">
                                {tCommon("popular")}
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-foreground/60 hidden sm:table-cell text-xs">{row.detail}</td>
                          <td className="px-5 py-4 text-right">
                            <span className={`font-bold ${row.price === tCommon("included") || row.price === "Inklusive" ? "text-brand" : row.price === tCommon("onRequest") || row.price === "auf Anfrage" || row.price === "bajo consulta" || row.price === "on request" ? "text-foreground/60 italic" : "text-navy"}`}>
                              {row.price}
                            </span>
                            {row.unit && (
                              <span className="text-foreground/50 text-xs ml-1">{row.unit}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-foreground/45">{t("priceNote")}</p>
                  <Link
                    href="/anfrage"
                    className="text-sm text-brand font-semibold hover:text-brand-dark transition-colors"
                  >
                    {ctaLabel} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALWAYS INCLUDED ──────────────────────────────────────────── */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-brand font-semibold text-sm uppercase tracking-widest">
                {t("alwaysIncluded.eyebrow")}
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-navy">{t("alwaysIncluded.title")}</h2>
              <p className="mt-2 text-foreground/60 text-sm">{t("alwaysIncluded.subtitle")}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {alwaysIncludedItems.map((item) => (
                <div key={item} className="flex items-center gap-3 bg-white rounded-xl border border-border px-5 py-3.5">
                  <BadgeCheck className="w-5 h-5 text-brand shrink-0" />
                  <span className="text-sm text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ───────────────────────────────────────────────── */}
      <section className="bg-white py-8">
        <div className="section-container">
          <div className="max-w-3xl mx-auto flex items-start gap-3 text-xs text-foreground/50 leading-relaxed">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{t("disclaimer")}</p>
          </div>
        </div>
      </section>

      {/* ── PRICE CALCULATOR ─────────────────────────────────────────── */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-xl mx-auto">
            <PriceCalculator
              labels={{
                title: t("calculator.title"),
                subtitle: t("calculator.subtitle"),
                serviceLabel: t("calculator.serviceLabel"),
                sizeLabel: t("calculator.sizeLabel"),
                frequencyLabel: t("calculator.frequencyLabel"),
                resultTitle: t("calculator.resultTitle"),
                resultNote: t("calculator.resultNote"),
                ctaLabel: t("calculator.ctaLabel"),
                services: {
                  haushalt: t("calculator.services.haushalt"),
                  buero: t("calculator.services.buero"),
                  umzug: t("calculator.services.umzug"),
                  tiefenreinigung: t("calculator.services.tiefenreinigung"),
                  praxis: t("calculator.services.praxis"),
                },
                frequencies: {
                  einmalig: t("calculator.frequencies.einmalig"),
                  monatlich: t("calculator.frequencies.monatlich"),
                  zweimal: t("calculator.frequencies.zweimal"),
                  woechentlich: t("calculator.frequencies.woechentlich"),
                },
              }}
            />
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1 text-sm text-brand font-semibold mb-5">
              {t("cta.badge")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{t("cta.title")}</h2>
            <p className="text-white/65 mb-6">{t("cta.subtitle")}</p>
            <p className="text-white/40 text-sm mb-6">{t("cta.hours")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/anfrage" className="btn-primary px-8 py-4">{tCommon("requestQuote")}</Link>
              <a href="tel:+41792527557" className="btn-secondary px-8 py-4">{tCommon("phone")}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
