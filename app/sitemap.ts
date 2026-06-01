import type { MetadataRoute } from "next";

const BASE_URL = "https://dnamar.ch";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["de", "en", "es"];

  const routes = [
    "",
    "/anfrage",
    "/bueroreinigung",
    "/glasreinigung",
    "/haushaltsreinigung",
    "/praxisreinigung",
    "/renovationsreinigung",
    "/tiefenreinigung",
    "/treppenhausreinigung",
    "/umzugsreinigung",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/ueber-uns",
    "/referenzen"
  ];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: locale === "de"
        ? BASE_URL + route
        : BASE_URL + "/" + locale + route,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1 : 0.8,
    }))
  );
}
