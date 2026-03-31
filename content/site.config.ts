/**
 * Central business configuration for D'Namar Basel.
 * Single source of truth for contact info, JSON-LD, social links, and services.
 * Update this file instead of hunting through multiple components.
 */
export const siteConfig = {
  name: "D'Namar GmbH",
  alternateName: "D'Namar Reinigungsdienst Basel",
  description:
    "Professioneller Reinigungsdienst in Basel für Privat und Gewerbe. Haushaltsreinigung, Büroreinigung, Umzugsreinigung, Tiefenreinigung und mehr.",
  url: "https://dnamar.ch",
  foundingYear: 2015,
  priceRange: "$$",
  currenciesAccepted: "CHF",
  paymentAccepted: "Banküberweisung, Bar",

  phone: {
    primary: "+41 79 252 75 57",
    primaryHref: "tel:+41792527557",
    secondary: "+41 78 241 00 31",
    whatsappHref: "https://wa.me/41792527557",
  },

  email: "info@dnamar.ch",

  address: {
    street: "Wiesenstrasse 14",
    city: "Basel",
    region: "Basel-Stadt",
    postalCode: "4057",
    country: "CH",
  },

  geo: {
    latitude: 47.5596,
    longitude: 7.5886,
  },

  hours: {
    weekdays: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    saturday: { days: ["Saturday"], opens: "09:00", closes: "14:00" },
  },

  social: {
    instagram: "https://www.instagram.com/dnamar.basel/",
    facebook: "https://www.facebook.com/dnamar.basel/",
    github: "https://github.com/vidal-renao",
  },

  aggregateRating: {
    ratingValue: "4.9",
    reviewCount: "90",
    bestRating: "5",
    worstRating: "1",
  },

  team: [
    { name: "Maritza Rodriguez", jobTitle: "Reinigungsprofi & Mitgründerin" },
    { name: "Nadjib Rasuly", jobTitle: "Reinigungsprofi & Mitgründer" },
  ],

  areaServed: [
    { name: "Basel", addressCountry: "CH" },
    { name: "Riehen", addressCountry: "CH" },
    { name: "Allschwil", addressCountry: "CH" },
  ],

  services: [
    { name: "Haushaltsreinigung Basel", href: "/haushaltsreinigung" },
    { name: "Büroreinigung Basel", href: "/bueroreinigung" },
    { name: "Umzugsreinigung Basel", href: "/umzugsreinigung" },
    { name: "Treppenhausreinigung Basel", href: "/treppenhausreinigung" },
    { name: "Glasreinigung Basel", href: "/glasreinigung" },
    { name: "Bauendreinigung Basel", href: "/renovationsreinigung" },
    { name: "Gewerbereinigung Basel", href: "/bueroreinigung" },
    { name: "Praxisreinigung Basel", href: "/praxisreinigung" },
  ],

  ogImage: "/opengraph-image.png",
} as const;

/** Builds the LocalBusiness JSON-LD schema from siteConfig. */
export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: [siteConfig.phone.primary, siteConfig.phone.secondary],
    email: siteConfig.email,
    image: `${siteConfig.url}/images/N.jpeg`,
    priceRange: siteConfig.priceRange,
    currenciesAccepted: siteConfig.currenciesAccepted,
    paymentAccepted: siteConfig.paymentAccepted,
    areaServed: siteConfig.areaServed.map((a) => ({
      "@type": "City",
      name: a.name,
      addressCountry: a.addressCountry,
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: siteConfig.hours.weekdays.days,
        opens: siteConfig.hours.weekdays.opens,
        closes: siteConfig.hours.weekdays.closes,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: siteConfig.hours.saturday.days,
        opens: siteConfig.hours.saturday.opens,
        closes: siteConfig.hours.saturday.closes,
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Reinigungsdienstleistungen Basel",
      itemListElement: siteConfig.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name },
      })),
    },
    employee: siteConfig.team.map((m) => ({
      "@type": "Person",
      name: m.name,
      jobTitle: m.jobTitle,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ...siteConfig.aggregateRating,
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
  };
}
