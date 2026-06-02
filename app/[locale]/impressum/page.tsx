import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Scale, Building2, Phone, Mail, MapPin } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "impressum" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    robots: { index: true, follow: false },
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "impressum" });

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden py-20 lg:py-24">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #4caf82 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4caf82 0%, transparent 40%)",
          }}
        />
        <div className="section-container relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-brand transition-colors text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            D&apos;Namar Basel
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand uppercase tracking-widest mb-5">
            <Scale className="w-3.5 h-3.5" />
            {t("badge")}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            {t("title")}
          </h1>
          <p className="text-white/50 text-sm">{t("subtitle")}</p>
        </div>
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-12 bg-[#0f1c2e]"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────────── */}
      <section className="bg-[#0f1c2e] py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto space-y-10">

            {/* Company + Register */}
            <div className="bg-navy/60 rounded-2xl border border-white/8 p-7 lg:p-9">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-9 h-9 rounded-xl bg-brand/15 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 text-brand" />
                </span>
                <h2 className="text-white font-bold text-lg">{t("company_title")}</h2>
              </div>
              <dl className="space-y-3 text-sm">
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <dt className="text-white/40 sm:w-52 shrink-0">D&apos;Namar GmbH</dt>
                  <dd className="text-white/80 font-semibold">Wiesenstrasse 14, 4057 Basel, Schweiz</dd>
                </div>
                {([
                  [t("legal_form_label"),  t("legal_form_value")],
                  [t("founded_label"),      "2015"],
                  [t("uid_label"),          "CHE-151.721.671"],
                  [t("hr_nr_label"),        "CH-270.4.009.791-4"],
                  [t("hr_canton_label"),    t("hr_canton_value")],
                  [t("responsible_title"),  t("responsible_names")],
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label} className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="text-white/40 sm:w-52 shrink-0">{label}</dt>
                    <dd className="text-white/80">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Contact */}
            <div className="bg-navy/60 rounded-2xl border border-white/8 p-7 lg:p-9">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-9 h-9 rounded-xl bg-brand/15 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-brand" />
                </span>
                <h2 className="text-white font-bold text-lg">{t("contact_title")}</h2>
              </div>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-center gap-3 text-white/60">
                  <MapPin className="w-4 h-4 text-brand/50 shrink-0" />
                  Wiesenstrasse 14, 4057 Basel
                </li>
                <li>
                  <a href="tel:+41792527557" className="flex items-center gap-3 text-white/60 hover:text-brand transition-colors">
                    <Phone className="w-4 h-4 text-brand/50 shrink-0" />
                    +41 79 252 75 57
                  </a>
                </li>
                <li>
                  <a href="tel:+41615018116" className="flex items-center gap-3 text-white/60 hover:text-brand transition-colors">
                    <Phone className="w-4 h-4 text-brand/50 shrink-0" />
                    +41 61 501 81 16
                  </a>
                </li>
                <li>
                  <a href="mailto:info@dnamar.ch" className="flex items-center gap-3 text-white/60 hover:text-brand transition-colors">
                    <Mail className="w-4 h-4 text-brand/50 shrink-0" />
                    info@dnamar.ch
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal sections */}
            {([
              ["liability_title",       "liability_text"],
              ["copyright_title",       "copyright_text"],
              ["external_links_title",  "external_links_text"],
              ["dispute_title",         "dispute_text"],
            ] as const).map(([titleKey, textKey]) => (
              <div key={titleKey} className="border-t border-white/8 pt-8">
                <h2 className="text-white font-bold text-base mb-3">
                  {t(titleKey)}
                </h2>
                <p className="text-white/55 text-sm leading-relaxed">{t(textKey)}</p>
              </div>
            ))}

            <p className="text-white/25 text-xs pt-4 border-t border-white/8">{t("date")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
