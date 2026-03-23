import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "D'Namar Reinigungsdienst Basel",
    short_name: "D'Namar",
    description: "Professioneller Reinigungsdienst in Basel – Haushaltsreinigung, Büroreinigung, Umzugsreinigung & mehr.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#1a2e4a",
    categories: ["business", "utilities"],
    lang: "de",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/og-image.jpg",
        sizes: "1200x630",
        type: "image/jpeg",
      },
    ],
  };
}
