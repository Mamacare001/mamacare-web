"use client";

import { usePathname } from "next/navigation";

const BARE_ROUTES = ["/login", "/dashboard", "/app", "/family", "/chw", "/supervisor", "/clinic", "/insights", "/care", "/portal", "/admin", "/notifications", "/help", "/switch-role", "/offline", "/verify", "/forgot", "/reset", "/onboarding", "/invite"];

/** True for public marketing pages – the ones that get the site nav, footer,
 *  scroll-progress bar and the cinematic route curtain. "/" (the language
 *  splash) and all app-style routes are excluded. */
export function isMarketingPath(pathname: string) {
  if (pathname === "/") return false;
  return !BARE_ROUTES.some((r) => pathname.startsWith(r));
}

/** Hides marketing chrome (nav/footer) on app-style routes, and on "/" itself —
 *  the language splash is a full-screen gate with its own layout, so the site
 *  nav/footer must never render underneath it, not even for an instant while
 *  the page is loading. */
export function MarketingOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (!isMarketingPath(pathname)) return null;
  return <>{children}</>;
}
