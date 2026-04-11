import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

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
    robots: { index: false, follow: false },
  };
}

/* ─── Shared layout styles ───────────────────────────────────────────────── */
const H2 = "text-base font-bold text-navy mb-2 mt-6 first:mt-0";
const P  = "text-sm leading-relaxed text-foreground/75";
const LI = "text-sm leading-relaxed text-foreground/75";

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "datenschutz" });

  return (
    <section className="bg-muted min-h-screen py-20 lg:py-28">
      <div className="section-container max-w-2xl">
        {/* Header */}
        <div className="mb-10">
          <span className="text-brand font-semibold text-sm uppercase tracking-widest">
            {t("badge")}
          </span>
          <h1 className="text-4xl font-bold text-navy mt-2">{t("title")}</h1>
          <p className="text-sm text-foreground/50 mt-2">{t("subtitle")}</p>
        </div>

        <div className="bg-white rounded-2xl border border-border p-8 shadow-sm space-y-6 text-sm leading-relaxed text-foreground/75">

          {/* Verantwortliche Stelle */}
          <div>
            <h2 className={H2}>{t("responsible_title")}</h2>
            <p className={P}>
              {t("responsible_name")}<br />
              Wiesenstrasse 14<br />
              4057 Basel<br />
              E-Mail:{" "}
              <a href="mailto:info@dnamar.ch" className="text-brand hover:underline">
                info@dnamar.ch
              </a>
              <br />
              Website: dnamar.ch
            </p>
          </div>

          {/* Personenbezogene Daten */}
          <div>
            <h2 className={H2}>{t("personal_data_title")}</h2>
            <p className={P}>{t("personal_data_intro")}</p>
            <p className="font-semibold text-navy text-sm mt-3 mb-1">
              {t("personal_data_reasons_title")}
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li className={LI}>{t("personal_data_reason1")}</li>
              <li className={LI}>{t("personal_data_reason2")}</li>
              <li className={LI}>{t("personal_data_reason3")}</li>
              <li className={LI}>{t("personal_data_reason4")}</li>
            </ul>
            <p className={`${P} mt-3`}>{t("personal_data_note")}</p>
          </div>

          {/* Speicherdauer */}
          <div>
            <h2 className={H2}>{t("storage_title")}</h2>
            <p className={P}>{t("storage_text")}</p>
          </div>

          {/* Kontaktformulare */}
          <div>
            <h2 className={H2}>{t("contact_form_title")}</h2>
            <p className={P}>{t("contact_form_text")}</p>
          </div>

          {/* Google Webfonts */}
          <div>
            <h2 className={H2}>{t("webfonts_title")}</h2>
            <p className={P}>{t("webfonts_text")}</p>
            <p className={`${P} mt-2`}>
              {t("webfonts_policy_label")}{" "}
              <span className="text-brand">https://www.google.com/policies/privacy/</span>
            </p>
          </div>

          {/* Google Maps */}
          <div>
            <h2 className={H2}>{t("maps_title")}</h2>
            <p className={P}>{t("maps_text")}</p>
            <p className={`${P} mt-2`}>{t("maps_more")}</p>
          </div>

          {/* Rechte */}
          <div>
            <h2 className={H2}>{t("rights_title")}</h2>
            <p className={P}>{t("rights_text")}</p>
          </div>

          {/* SSL */}
          <div>
            <h2 className={H2}>{t("ssl_title")}</h2>
            <p className="font-semibold text-navy text-sm mb-1">{t("ssl_subtitle")}</p>
            <p className={P}>{t("ssl_text")}</p>
          </div>

          {/* Änderungen */}
          <div>
            <h2 className={H2}>{t("changes_title")}</h2>
            <p className={P}>{t("changes_text")}</p>
          </div>

          {/* Kontakt Datenschutz */}
          <div>
            <h2 className={H2}>{t("contact_dpo_title")}</h2>
            <p className={P}>
              {t("contact_dpo_text")}{" "}
              <a href="mailto:info@dnamar.ch" className="text-brand hover:underline">
                info@dnamar.ch
              </a>
            </p>
          </div>

          <p className="text-xs text-foreground/40 pt-2 border-t border-border">
            {t("date")}
          </p>
        </div>
      </div>
    </section>
  );
}
