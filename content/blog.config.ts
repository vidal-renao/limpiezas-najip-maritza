/**
 * Single source of truth for blog posts.
 * Add a new entry here — sitemap + blog index pick it up automatically.
 */
export interface BlogPostMeta {
  slug: string;
  dateIso: string;
  image: string;
}

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug:    "bueroreinigung-tipps-basel",
    dateIso: "2025-03-10",
    image:   "/images/Buero-768x512.jpg",
  },
  {
    slug:    "umzug-endreinigung-checkliste-basel",
    dateIso: "2025-02-25",
    image:   "/images/Wohnungsbau-768x512.jpg",
  },
];
