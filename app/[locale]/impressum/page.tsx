import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

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
    robots: { index: false, follow: false },
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

        <div className="bg-white rounded-2xl border border-border p-8 shadow-sm space-y-8 text-sm leading-relaxed text-foreground/75">

          {/* Unternehmensangaben */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">{t("company_title")}</h2>
            <div className="rounded-xl border border-border bg-muted p-5 space-y-1">
              <p className="font-semibold text-navy">D&apos;Namar GmbH</p>
              <p>Wiesenstrasse 14</p>
              <p>4057 Basel</p>
              <p>Schweiz</p>
            </div>
          </div>

          {/* Kontakt */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">{t("contact_title")}</h2>
            <ul className="space-y-2">
              <li>
                Tel.:{" "}
                <a href="tel:+41792527557" className="text-brand hover:underline">
                  +41 79 252 75 57
                </a>
              </li>
              <li>
                Tel.:{" "}
                <a href="tel:+41782410031" className="text-brand hover:underline">
                  +41 78 241 00 31
                </a>
              </li>
              <li>
                E-Mail:{" "}
                <a href="mailto:info@dnamar.ch" className="text-brand hover:underline">
                  info@dnamar.ch
                </a>
              </li>
              <li>
                Website:{" "}
                <span className="text-brand">dnamar.ch</span>
              </li>
            </ul>
          </div>

          {/* Gesellschaftsform & Register */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">
              {t("company_title")} &amp; {t("hr_canton_label")}
            </h2>
            <ul className="space-y-2">
              <li>
                <strong className="text-navy">{t("legal_form_label")}:</strong>{" "}
                {t("legal_form_value")}
              </li>
              <li>
                <strong className="text-navy">{t("founded_label")}:</strong> 2015
              </li>
              <li>
                <strong className="text-navy">{t("uid_label")}:</strong>{" "}
                <span className="font-mono">CHE-151.721.671</span>
              </li>
              <li>
                <strong className="text-navy">{t("hr_nr_label")}:</strong>{" "}
                <span className="font-mono">CH-270.4.009.791-4</span>
              </li>
              <li>
                <strong className="text-navy">{t("hr_canton_label")}:</strong>{" "}
                {t("hr_canton_value")}
              </li>
            </ul>
          </div>

          {/* Verantwortlich */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">{t("responsible_title")}</h2>
            <p>
              {t("responsible_names")}<br />
              D&apos;Namar GmbH<br />
              Wiesenstrasse 14, 4057 Basel, Schweiz
            </p>
          </div>

          {/* Haftungsausschluss */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">{t("liability_title")}</h2>
            <p>{t("liability_text")}</p>
          </div>

          {/* Urheberrecht */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">{t("copyright_title")}</h2>
            <p>{t("copyright_text")}</p>
          </div>

          {/* Externe Links */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">{t("external_links_title")}</h2>
            <p>{t("external_links_text")}</p>
          </div>

          {/* Streitschlichtung */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">{t("dispute_title")}</h2>
            <p>{t("dispute_text")}</p>
          </div>

          <p className="text-xs text-foreground/40 pt-2 border-t border-border">
            {t("date")}
          </p>
        </div>
      </div>
    </section>
  );
}
