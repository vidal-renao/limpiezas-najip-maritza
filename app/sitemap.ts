import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/content/blog.config";

const BASE_URL = "https://dnamar.ch";

// de has no prefix (canonical), en and es have locale prefix
const LOCALES: Array<{ prefix: string; priority: number }> = [
  { prefix: "",     priority: 1.0 },
  { prefix: "/en",  priority: 0.85 },
  { prefix: "/es",  priority: 0.85 },
];

const PAGES: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number; lastModified?: Date }> = [
  { path: "",                                            changeFrequency: "weekly",  priority: 1.0 },
  { path: "/haushaltsreinigung",                         changeFrequency: "monthly", priority: 0.9 },
  { path: "/bueroreinigung",                             changeFrequency: "monthly", priority: 0.9 },
  { path: "/umzugsreinigung",                            changeFrequency: "monthly", priority: 0.9 },
  { path: "/glasreinigung",                              changeFrequency: "monthly", priority: 0.9 },
  { path: "/treppenhausreinigung",                       changeFrequency: "monthly", priority: 0.9 },
  { path: "/preise",                                     changeFrequency: "monthly", priority: 0.8 },
  { path: "/anfrage",                                    changeFrequency: "monthly", priority: 0.8 },
  { path: "/tiefenreinigung",                            changeFrequency: "monthly", priority: 0.9 },
  { path: "/praxisreinigung",                            changeFrequency: "monthly", priority: 0.9 },
  { path: "/renovationsreinigung",                       changeFrequency: "monthly", priority: 0.9 },
  { path: "/referenzen",                                 changeFrequency: "monthly", priority: 0.7 },
  { path: "/ueber-uns",                                  changeFrequency: "monthly", priority: 0.7 },
  { path: "/kontakt",                                    changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  // Blog posts are injected dynamically below from content/blog.config.ts
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const { prefix, priority: localePriorityMod } of LOCALES) {
    for (const page of PAGES) {
      entries.push({
        url: `${BASE_URL}${prefix}${page.path}`,
        lastModified: page.lastModified ?? now,
        changeFrequency: page.changeFrequency,
        priority: prefix === "" ? page.priority : Math.min(page.priority, localePriorityMod),
      });
    }
    // Dynamic blog posts — add entry in content/blog.config.ts to register new posts
    for (const post of BLOG_POSTS) {
      entries.push({
        url: `${BASE_URL}${prefix}/blog/${post.slug}`,
        lastModified: new Date(post.dateIso),
        changeFrequency: "yearly",
        priority: prefix === "" ? 0.75 : Math.min(0.75, localePriorityMod),
      });
    }
  }

  return entries;
}
