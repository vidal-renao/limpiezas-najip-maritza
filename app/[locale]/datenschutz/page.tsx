import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft, ShieldCheck, Lock, Eye,
  Database, FileText, RefreshCw, MessageSquare,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "datenschutz" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    robots: { index: true, follow: false },
  };
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "datenschutz" });

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden py-20 lg:py-24">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 30%, #4caf82 0%, transparent 50%), radial-gradient(circle at 10% 70%, #4caf82 0%, transparent 40%)",
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
            <ShieldCheck className="w-3.5 h-3.5" />
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
          <div className="max-w-3xl mx-auto space-y-8">

            {/* Responsible party card */}
            <div className="bg-navy/60 rounded-2xl border border-white/8 p-7 lg:p-9">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-9 h-9 rounded-xl bg-brand/15 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-brand" />
                </span>
                <h2 className="text-white font-bold text-lg">{t("responsible_title")}</h2>
              </div>
              <dl className="space-y-2.5 text-sm">
                {([
                  ["Name",     t("responsible_name")],
                  ["Adresse",  "Wiesenstrasse 14, 4057 Basel"],
                  ["E-Mail",   "info@dnamar.ch"],
                  ["Website",  "dnamar.ch"],
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label} className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="text-white/40 sm:w-32 shrink-0">{label}</dt>
                    <dd className="text-white/75">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Sections with icons */}
            {([
              {
                Icon: Database,
                titleKey: "personal_data_title" as const,
                body: (
                  <div className="space-y-3 text-sm text-white/55 leading-relaxed">
                    <p>{t("personal_data_intro")}</p>
                    <p className="text-white/40 font-medium">{t("personal_data_reasons_title")}</p>
                    <ul className="space-y-1.5 pl-2">
                      {(["personal_data_reason1","personal_data_reason2","personal_data_reason3","personal_data_reason4"] as const).map((k) => (
                        <li key={k} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand/50 mt-1.5 shrink-0" />
                          {t(k)}
                        </li>
                      ))}
                    </ul>
                    <p>{t("personal_data_note")}</p>
                  </div>
                ),
              },
              {
                Icon: RefreshCw,
                titleKey: "storage_title" as const,
                body: <p className="text-sm text-white/55 leading-relaxed">{t("storage_text")}</p>,
              },
              {
                Icon: MessageSquare,
                titleKey: "contact_form_title" as const,
                body: <p className="text-sm text-white/55 leading-relaxed">{t("contact_form_text")}</p>,
              },
              {
                Icon: FileText,
                titleKey: "webfonts_title" as const,
                body: (
                  <div className="space-y-2 text-sm text-white/55 leading-relaxed">
                    <p>{t("webfonts_text")}</p>
                    <p>
                      {t("webfonts_policy_label")}{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand/70 hover:text-brand underline underline-offset-2 transition-colors"
                      >
                        policies.google.com/privacy
                      </a>
                    </p>
                  </div>
                ),
              },
              {
                Icon: Eye,
                titleKey: "maps_title" as const,
                body: (
                  <div className="space-y-2 text-sm text-white/55 leading-relaxed">
                    <p>{t("maps_text")}</p>
                    <p>{t("maps_more")}</p>
                  </div>
                ),
              },
              {
                Icon: ShieldCheck,
                titleKey: "rights_title" as const,
                body: <p className="text-sm text-white/55 leading-relaxed">{t("rights_text")}</p>,
              },
              {
                Icon: Lock,
                titleKey: "ssl_title" as const,
                body: (
                  <div className="space-y-2 text-sm text-white/55 leading-relaxed">
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-wide">{t("ssl_subtitle")}</p>
                    <p>{t("ssl_text")}</p>
                  </div>
                ),
              },
              {
                Icon: RefreshCw,
                titleKey: "changes_title" as const,
                body: <p className="text-sm text-white/55 leading-relaxed">{t("changes_text")}</p>,
              },
              {
                Icon: MessageSquare,
                titleKey: "contact_dpo_title" as const,
                body: (
                  <div className="space-y-2 text-sm text-white/55 leading-relaxed">
                    <p>{t("contact_dpo_text")}</p>
                    <a
                      href="mailto:info@dnamar.ch"
                      className="inline-flex items-center gap-1.5 text-brand/70 hover:text-brand font-medium transition-colors"
                    >
                      info@dnamar.ch
                    </a>
                  </div>
                ),
              },
            ]).map(({ Icon, titleKey, body }) => (
              <div key={titleKey} className="border-t border-white/8 pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-brand/60" />
                  </span>
                  <h2 className="text-white font-bold text-base">{t(titleKey)}</h2>
                </div>
                {body}
              </div>
            ))}

            <p className="text-white/25 text-xs pt-6 border-t border-white/8">{t("date")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
