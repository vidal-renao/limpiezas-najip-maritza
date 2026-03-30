import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

/* ─── Static Params ─────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* ─── Metadata ──────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const base = "https://dnamar.ch";

  return {
    metadataBase: new URL(base),
    title: {
      default: "D'Namar Reinigungsdienst Basel | Professionelle Reinigung",
      template: "%s | D'Namar Basel",
    },
    description:
      "D'Namar – Ihr zuverlässiger Reinigungsprofi in Basel. Haushaltsreinigung, Büroreinigung, Umzugsreinigung, Treppenhausreinigung & mehr. Jetzt Offerte anfordern!",
    alternates: {
      canonical: locale === "de" ? base : `${base}/${locale}`,
      languages: {
        de: base,
        en: `${base}/en`,
        es: `${base}/es`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_CH" : locale === "en" ? "en_GB" : "es_ES",
      url: locale === "de" ? base : `${base}/${locale}`,
      siteName: "D'Namar Reinigungsdienst Basel",
      title: "D'Namar Reinigungsdienst Basel | Professionelle Reinigung",
      description:
        "Zuverlässige Reinigungsdienstleistungen in Basel – für Privat und Gewerbe.",
      images: [{ url: "/images/N.jpeg", width: 1200, height: 630, alt: "D'Namar Reinigungsdienst Basel" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "D'Namar Reinigungsdienst Basel",
      description: "Ihr Reinigungsprofi in Basel – für Privat & Gewerbe.",
      images: ["/images/N.jpeg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

/* ─── JSON-LD Structured Data ───────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://dnamar.ch/#business",
  name: "D'Namar GmbH",
  alternateName: "D'Namar Reinigungsdienst Basel",
  description:
    "Professioneller Reinigungsdienst in Basel für Privat und Gewerbe. Haushaltsreinigung, Büroreinigung, Umzugsreinigung, Tiefenreinigung und mehr.",
  url: "https://dnamar.ch",
  telephone: ["+41 79 252 75 57", "+41 78 241 00 31"],
  email: "info@dnamar.ch",
  image: "https://dnamar.ch/images/N.jpeg",
  priceRange: "$$",
  currenciesAccepted: "CHF",
  paymentAccepted: "Banküberweisung, Bar",
  areaServed: [
    { "@type": "City", name: "Basel", addressCountry: "CH" },
    { "@type": "City", name: "Riehen", addressCountry: "CH" },
    { "@type": "City", name: "Allschwil", addressCountry: "CH" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Wiesenstrasse 14",
    addressLocality: "Basel",
    addressRegion: "Basel-Stadt",
    postalCode: "4057",
    addressCountry: "CH",
  },
  geo: { "@type": "GeoCoordinates", latitude: 47.5596, longitude: 7.5886 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Reinigungsdienstleistungen Basel",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Haushaltsreinigung Basel" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Büroreinigung Basel" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Umzugsreinigung Basel" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Treppenhausreinigung Basel" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Glasreinigung Basel" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bauendreinigung Basel" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gewerbereinigung Basel" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Praxisreinigung Basel" } },
    ],
  },
  employee: [
    { "@type": "Person", name: "Maritza Rodriguez", jobTitle: "Reinigungsprofi & Mitgründerin" },
    { "@type": "Person", name: "Nadjib Rasuly", jobTitle: "Reinigungsprofi & Mitgründer" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "90",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://www.instagram.com/dnamar.basel/",
    "https://www.facebook.com/dnamar.basel/",
  ],
};

/* ─── Locale Layout ─────────────────────────────────────────────────────── */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "footer" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const FOOTER_SERVICES = [
    { label: t("services_items.haushaltsreinigung"), href: "/haushaltsreinigung" },
    { label: t("services_items.bueroreinigung"), href: "/bueroreinigung" },
    { label: t("services_items.umzugsreinigung"), href: "/umzugsreinigung" },
    { label: t("services_items.glasreinigung"), href: "/glasreinigung" },
    { label: t("services_items.treppenhausreinigung"), href: "/treppenhausreinigung" },
    { label: t("services_items.preise"), href: "/preise" },
  ];

  const FOOTER_COMPANY = [
    { label: t("company_items.ueber_uns"), href: "/ueber-uns" },
    { label: t("company_items.referenzen"), href: "/referenzen" },
    { label: t("company_items.blog"), href: "/blog" },
    { label: t("company_items.offerte"), href: "/anfrage" },
    { label: t("company_items.kontakt"), href: "/kontakt" },
  ];

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Favicons & PWA icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-touch-icon-120.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="D'Namar" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <NextIntlClientProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <WhatsAppButton />
          <ScrollToTop />

          {/* ── Footer ─────────────────────────────────────────────────────── */}
          <footer className="bg-navy text-white">
            {/* Main footer content */}
            <div className="section-container py-14 lg:py-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Brand column */}
                <div className="lg:col-span-1">
                  <Link href="/" className="inline-flex items-center gap-3 mb-4">
                    <Image
                      src="/images/N.jpeg"
                      alt="D'Namar Logo"
                      width={40}
                      height={40}
                      className="rounded-xl object-cover"
                    />
                    <span className="font-bold text-lg text-white">D&apos;Namar</span>
                  </Link>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    {t("tagline")}
                  </p>
                  {/* Social icons */}
                  <div className="flex gap-3">
                    <a
                      href="https://www.instagram.com/dnamar.basel/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("instagramLabel")}
                      className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com/dnamar.basel/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("facebookLabel")}
                      className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="https://wa.me/41792527557"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("whatsappLabel")}
                      className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h3 className="font-semibold text-white text-sm uppercase tracking-widest mb-4">
                    {t("services")}
                  </h3>
                  <ul className="space-y-2.5">
                    {FOOTER_SERVICES.map(({ label, href }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="text-white/60 text-sm hover:text-brand transition-colors"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h3 className="font-semibold text-white text-sm uppercase tracking-widest mb-4">
                    {t("company")}
                  </h3>
                  <ul className="space-y-2.5">
                    {FOOTER_COMPANY.map(({ label, href }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="text-white/60 text-sm hover:text-brand transition-colors"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="font-semibold text-white text-sm uppercase tracking-widest mb-4">
                    {t("contactTitle")}
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="tel:+41792527557"
                        className="flex items-center gap-2.5 text-white/60 text-sm hover:text-brand transition-colors group"
                      >
                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </span>
                        +41 79 252 75 57
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:info@dnamar.ch"
                        className="flex items-center gap-2.5 text-white/60 text-sm hover:text-brand transition-colors group"
                      >
                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </span>
                        info@dnamar.ch
                      </a>
                    </li>
                    <li className="flex items-start gap-2.5 text-white/60 text-sm">
                      <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <span style={{ whiteSpace: "pre-line" }}>{t("hours")}</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-white/60 text-sm">
                      <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </span>
                      {t("location")}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
              <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                  <p>© {new Date().getFullYear()} D&apos;Namar Reinigungsdienst Basel. {tCommon("allRightsReserved")}.</p>
                  <span className="hidden sm:inline text-white/20">·</span>
                  <p>
                    {tCommon("madeBy")}{" "}
                    <a
                      href="https://github.com/vidal-renao"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand/70 hover:text-brand transition-colors font-medium"
                    >
                      VIDAL ECOSYSTEM
                    </a>
                  </p>
                </div>
                <div className="flex gap-4">
                  <a
                    href={`/${locale}/impressum`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand transition-colors"
                  >
                    {tCommon("impressum")}
                  </a>
                  <a
                    href={`/${locale}/datenschutz`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand transition-colors"
                  >
                    {tCommon("datenschutz")}
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
