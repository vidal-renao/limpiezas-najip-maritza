import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import { Instagram } from "lucide-react";

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

              {/* Map — premium Basel visual (Google Maps blocked by CSP frame-src) */}
              <div
                role="img"
                aria-label={t("mapTitle")}
                className="rounded-2xl overflow-hidden border border-border relative h-[220px] select-none"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e4a] via-[#1e3a5c] to-[#1a3d2e]" />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.10]"
                  style={{
                    backgroundImage: "radial-gradient(circle, #4caf82 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "radial-gradient(ellipse 55% 45% at 55% 50%, #4caf82 0%, transparent 70%)",
                  }}
                />
                <svg aria-hidden viewBox="0 0 280 220" className="absolute inset-0 w-full h-full" fill="none">
                  <path d="M25 118 Q70 108 115 116 Q150 122 185 112 Q220 102 255 109"
                    stroke="#4caf82" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
                  <path d="M68 48 L142 36 L216 54 L232 96 L222 140 L185 172 L142 184 L96 172 L58 140 L50 98 Z"
                    stroke="#4caf82" strokeWidth="1.5" strokeDasharray="5 4" fill="#4caf82" fillOpacity="0.06" opacity="0.55" />
                  <line x1="142" y1="36" x2="142" y2="184" stroke="#4caf82" strokeWidth="0.7" opacity="0.12" strokeDasharray="4 6" />
                  <line x1="50" y1="110" x2="232" y2="110" stroke="#4caf82" strokeWidth="0.7" opacity="0.12" strokeDasharray="4 6" />
                  <circle cx="136" cy="108" r="5" fill="#4caf82" opacity="0.95" />
                  <circle cx="136" cy="108" r="9" stroke="#4caf82" strokeWidth="1" opacity="0.30" />
                  <circle cx="178" cy="72" r="3" fill="#4caf82" opacity="0.70" />
                  <circle cx="88" cy="84" r="3" fill="#4caf82" opacity="0.70" />
                  <circle cx="128" cy="142" r="3" fill="#4caf82" opacity="0.65" />
                </svg>
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <span className="absolute text-[9px] font-semibold text-brand/75 tracking-wide" style={{ top: "28%", left: "60%" }}>Riehen</span>
                  <span className="absolute text-[9px] font-semibold text-brand/75 tracking-wide" style={{ top: "33%", left: "22%" }}>Allschwil</span>
                  <span className="absolute text-[9px] font-semibold text-brand/75 tracking-wide" style={{ top: "60%", left: "38%" }}>Gundeldingen</span>
                </div>
                {/* Address card */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl px-3.5 py-2.5 border border-white/15 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-brand/20 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-brand" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-xs leading-tight">Wiesenstrasse 14</p>
                      <p className="text-white/55 text-[10px]">4057 Basel, Schweiz</p>
                    </div>
                    <span className="ml-auto flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                      <span className="text-brand text-[10px] font-semibold">Aktiv</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="rounded-2xl border border-border bg-white p-5">
                <p className="text-xs text-foreground/50 uppercase tracking-widest mb-3 font-semibold">Social Media</p>
                <a
                  href="https://www.instagram.com/dnamar_gmbh?igsh=MW91dmx1Y2FyaGx6NA%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-[#E1306C]/40 hover:bg-[#E1306C]/5 transition-all group"
                >
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] to-[#bc1888] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Instagram className="w-4 h-4 text-white" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy">@dnamar_gmbh</p>
                    <p className="text-xs text-foreground/50">Folgen Sie uns auf Instagram</p>
                  </div>
                  <svg className="w-4 h-4 text-foreground/25 ml-auto group-hover:text-[#E1306C] transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING ───────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20 border-t border-border">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand font-semibold mb-5">
              {t("booking.badge")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">{t("booking.title")}</h2>
            <p className="text-foreground/60 mb-10 max-w-xl mx-auto">{t("booking.subtitle")}</p>

            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* WhatsApp */}
              <a
                href="https://wa.me/41792527557"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 rounded-2xl border-2 border-[#25D366]/30 bg-[#25D366]/5 p-6 hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all group"
              >
                <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-navy">{t("booking.whatsapp.title")}</p>
                  <p className="text-sm text-foreground/55">{t("booking.whatsapp.subtitle")}</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+41792527557"
                className="flex flex-col items-center gap-3 rounded-2xl border-2 border-brand/30 bg-brand/5 p-6 hover:border-brand hover:bg-brand/10 transition-all group"
              >
                <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-navy">{t("booking.phone.title")}</p>
                  <p className="text-sm text-foreground/55">{t("booking.phone.subtitle")}</p>
                </div>
              </a>
            </div>

            <p className="text-xs text-foreground/40 mt-8">{t("booking.note")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
