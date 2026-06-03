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
    secondary: "+41 61 501 81 16",
    secondaryHref: "tel:+41615018116",
    whatsappHref: "https://wa.me/41792527557",
    whatsappSecondaryHref: "https://wa.me/41615018116",
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
    weekdaysMorning:   { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "12:00" },
    weekdaysAfternoon: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "13:00", closes: "18:00" },
  },

  social: {
    instagram: "https://www.instagram.com/dnamar_gmbh",
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
    { name: "Basel",          addressCountry: "CH" },
    { name: "Riehen",         addressCountry: "CH" },
    { name: "Bettingen",      addressCountry: "CH" },
    { name: "Allschwil",      addressCountry: "CH" },
    { name: "Binningen",      addressCountry: "CH" },
    { name: "Birsfelden",     addressCountry: "CH" },
    { name: "Muttenz",        addressCountry: "CH" },
    { name: "Pratteln",       addressCountry: "CH" },
    { name: "Bottmingen",     addressCountry: "CH" },
    { name: "Reinach",        addressCountry: "CH" },
    { name: "Münchenstein",   addressCountry: "CH" },
    { name: "Dornach",        addressCountry: "CH" },
    { name: "Arlesheim",      addressCountry: "CH" },
    { name: "Schönenbuch",    addressCountry: "CH" },
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
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${siteConfig.url}/#business`,
    foundingDate: String(siteConfig.foundingYear),
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/favicon-32x32.png`,
      width: 32,
      height: 32,
    },
    hasMap: "https://maps.google.com/maps?q=Wiesenstrasse+14,+4057+Basel,+Schweiz",
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: [siteConfig.phone.primary, siteConfig.phone.secondary],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone.primary,
        contactType: "customer service",
        availableLanguage: ["German", "Spanish", "English"],
      },
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone.secondary,
        contactType: "customer service",
        availableLanguage: ["German", "Spanish", "English"],
      },
    ],
    email: siteConfig.email,
    image: `${siteConfig.url}/images/N.webp`,
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
        dayOfWeek: siteConfig.hours.weekdaysMorning.days,
        opens: siteConfig.hours.weekdaysMorning.opens,
        closes: siteConfig.hours.weekdaysMorning.closes,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: siteConfig.hours.weekdaysAfternoon.days,
        opens: siteConfig.hours.weekdaysAfternoon.opens,
        closes: siteConfig.hours.weekdaysAfternoon.closes,
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
