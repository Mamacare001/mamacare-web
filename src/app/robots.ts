import type { MetadataRoute } from "next";

/**
 * Keep crawlers on the public marketing site and out of every authenticated
 * surface (CHW, clinic, family, supervisor, admin, insights dashboards, auth
 * flows). Those routes already redirect unauthenticated visitors to /login,
 * but excluding them here saves crawl budget and stops login walls from
 * showing up in search results.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/app",
        "/care",
        "/chw",
        "/clinic",
        "/dashboard",
        "/family",
        "/forgot",
        "/insights",
        "/login",
        "/notifications",
        "/onboarding",
        "/portal",
        "/reset",
        "/supervisor",
        "/switch-role",
        "/verify",
      ],
    },
    sitemap: "https://mamacare.rw/sitemap.xml",
  };
}
