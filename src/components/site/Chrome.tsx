"use client";

import { usePathname } from "next/navigation";

const BARE_ROUTES = ["/login", "/dashboard", "/app", "/family", "/chw", "/supervisor", "/clinic", "/insights", "/care", "/portal", "/admin", "/notifications", "/help", "/switch-role", "/offline", "/verify", "/forgot", "/reset", "/onboarding", "/invite"];

/** Hides marketing chrome (nav/footer) on app-style routes, and on "/" itself —
 *  the language splash is a full-screen gate with its own layout, so the site
 *  nav/footer must never render underneath it, not even for an instant while
 *  the page is loading. */
export function MarketingOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  if (BARE_ROUTES.some((r) => pathname.startsWith(r))) return null;
  return <>{children}</>;
}
