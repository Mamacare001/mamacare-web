"use client";

import { usePathname } from "next/navigation";

const BARE_ROUTES = ["/login", "/dashboard", "/app", "/family", "/chw", "/supervisor", "/clinic", "/insights", "/care", "/portal", "/admin", "/notifications", "/help", "/switch-role", "/offline", "/verify", "/forgot", "/reset", "/onboarding", "/invite"];

/** Hides marketing chrome (nav/footer) on app-style routes. */
export function MarketingOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (BARE_ROUTES.some((r) => pathname.startsWith(r))) return null;
  return <>{children}</>;
}
