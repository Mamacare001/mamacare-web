import type { MetadataRoute } from "next";

/**
 * Public marketing pages only — every authenticated app route is excluded
 * (see robots.ts). Update this list whenever a new marketing page ships.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mamacare.rw";
  const now = new Date();

  const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/how-it-works", priority: 0.9, changeFrequency: "monthly" },
    { path: "/join", priority: 0.9, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/partners", priority: 0.6, changeFrequency: "monthly" },
    { path: "/research", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
    { path: "/emergency", priority: 0.5, changeFrequency: "yearly" },
    { path: "/help", priority: 0.4, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
