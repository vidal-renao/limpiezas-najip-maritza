import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kontakt.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "kontakt" });

  const infoItems = t.raw("info.items") as Array<{ label: string; value: string }>;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden py-20 lg:py-24">
        <div aria-hidden className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #4caf82 0%, transparent 55%)" }} />
        <div className="section-container relative z-10 text-center">
          <span className="text-brand font-semibold text-sm uppercase tracking-widest">{t("hero.eyebrow")}</span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white mb-4">{t("hero.title")}</h1>
          <p className="text-white/65 max-w-xl mx-auto">{t("hero.subtitle")}</p>
        </div>
        <div aria-hidden className="absolute bottom-0 left-0 right-0 h-16 bg-muted"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>

      {/* ── CONTACT INFO + FORM ───────────────────────────────────────── */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Info */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-white p-6">
                <h2 className="font-bold text-navy text-sm uppercase tracking-widest mb-5">{t("info.title")}</h2>
                <ul className="space-y-4">
                  {infoItems.map(({ label, value }) => (
                    <li key={label}>
                      <p className="text-xs text-foreground/50 uppercase tracking-widest mb-0.5">{label}</p>
                      <p className="font-semibold text-navy text-sm">{value}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-border" title={t("mapTitle")}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43389.86617043455!2d7.5434566!3d47.5595986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4791b9a441b50327%3A0x5a336bfe16a3b2a4!2sBasel%2C%20Switzerland!5e0!3m2!1sen!2sch!4v1709900000000"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t("mapTitle")}
                />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
