import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/angebot-infrastruktur/"],
      },
    ],
    sitemap: "https://dnamar.ch/sitemap.xml",
    host: "https://dnamar.ch",
  };
}
