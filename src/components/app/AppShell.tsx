"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, Clock, Users, MoreHorizontal, BookOpen, CalendarDays, ShieldCheck, UserRound, Settings, Database, Phone, LogOut, BellRing, UserPlus, Send, Baby, Shuffle, BarChart3 } from "lucide-react";
import { cn } from "@/lib/cn";
import { useLang } from "@/components/providers/LanguageProvider";

export type NavItem = { href: string; icon: typeof Home; en: string; rw: string; exact?: boolean };
export type NavConfig = { primary: NavItem[]; secondary: NavItem[]; home: string; moreHref: string };

export const motherNav: NavConfig = {
  home: "/app",
  moreHref: "/app/guidance",
  primary: [
  { href: "/app", icon: Home, en: "Home", rw: "Ahabanza", exact: true },
  { href: "/app/chat", icon: MessageCircle, en: "Chat", rw: "Ikiganiro" },
  { href: "/app/timeline", icon: Clock, en: "Timeline", rw: "Urugendo" },
  { href: "/app/circle", icon: Users, en: "My circle", rw: "Abanshyigikira" },
  ],
  secondary: [
  { href: "/app/guidance", icon: BookOpen, en: "Guidance", rw: "Inama" },
  { href: "/app/visits", icon: CalendarDays, en: "Visits", rw: "Gusura" },
  { href: "/app/access-log", icon: ShieldCheck, en: "Who viewed", rw: "Abarebye" },
  { href: "/app/profile", icon: UserRound, en: "Profile", rw: "Umwirondoro" },
  { href: "/app/settings", icon: Settings, en: "Settings", rw: "Igenamiterere" },
  { href: "/app/data", icon: Database, en: "My data", rw: "Amakuru yanjye" },
  ],
};

export const chwNav: NavConfig = {
  home: "/chw",
  moreHref: "/chw/learn",
  primary: [
    { href: "/chw", icon: Home, en: "Today", rw: "Uyu munsi", exact: true },
    { href: "/chw/caseload", icon: Users, en: "Caseload", rw: "Ababyeyi" },
    { href: "/chw/escalations", icon: BellRing, en: "Alerts", rw: "Imenyesha" },
    { href: "/chw/enrol", icon: UserPlus, en: "Enrol", rw: "Kwandika" },
  ],
  secondary: [
    { href: "/chw/refer", icon: Send, en: "Refer", rw: "Kohereza" },
    { href: "/chw/learn", icon: BookOpen, en: "Learn", rw: "Kwiga" },
    { href: "/chw/profile", icon: UserRound, en: "Profile", rw: "Umwirondoro" },
  ],
};

export const supervisorNav: NavConfig = {
  home: "/supervisor",
  moreHref: "/supervisor/reassign",
  primary: [
    { href: "/supervisor", icon: Home, en: "Overview", rw: "Incamake", exact: true },
    { href: "/supervisor/escalations", icon: BellRing, en: "Alerts", rw: "Imenyesha" },
    { href: "/supervisor/chws", icon: Users, en: "CHWs", rw: "Abajyanama" },
    { href: "/supervisor/mothers", icon: Baby, en: "Mothers", rw: "Ababyeyi" },
  ],
  secondary: [{ href: "/supervisor/reassign", icon: Shuffle, en: "Reassign", rw: "Guhindura" }],
};

export const clinicNav: NavConfig = {
  home: "/clinic",
  moreHref: "/clinic/reports",
  primary: [
    { href: "/clinic", icon: Home, en: "Today", rw: "Uyu munsi", exact: true },
    { href: "/clinic/queue", icon: BellRing, en: "Queue", rw: "Umurongo" },
    { href: "/clinic/close-loop", icon: Send, en: "Close loop", rw: "Gusubiza" },
  ],
  secondary: [
    { href: "/clinic/reports", icon: BarChart3, en: "Reports", rw: "Raporo" },
    { href: "/clinic/staff", icon: Users, en: "Staff", rw: "Abakozi" },
  ],
};

export const familyNav: NavConfig = {
  home: "/family",
  moreHref: "/family/settings",
  primary: [
    { href: "/family", icon: Home, en: "Home", rw: "Ahabanza", exact: true },
    { href: "/family/report", icon: MessageCircle, en: "Report", rw: "Menyesha" },
    { href: "/family/settings", icon: Settings, en: "Settings", rw: "Igenamiterere" },
  ],
  secondary: [],
};

export function AppShell({ children, name, signOutAction, nav = motherNav, status }: { children: React.ReactNode; name: string; signOutAction: () => Promise<void>; nav?: NavConfig; status?: React.ReactNode }) {
  const { primary, secondary } = nav;
  const pathname = usePathname();
  const { lang, toggle } = useLang();
  const isActive = (href: string, exact?: boolean) => (exact ? pathname === href : pathname.startsWith(href));
  const label = (i: { en: string; rw: string }) => (lang === "rw" ? i.rw : i.en);
  const moreActive = secondary.some((s) => isActive(s.href));

  return (
    <div className="min-h-[100svh] bg-ivory lg:grid lg:grid-cols-[260px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden border-r border-emerald/10 bg-white lg:flex lg:flex-col">
        <div className="flex h-[72px] items-center gap-2.5 px-6">
          <Image src="/brand/mark.png" alt="" width={36} height={42} className="h-9 w-auto" />
          <Image src="/brand/wordmark.png" alt="MamaCare" width={120} height={18} className="h-[18px] w-auto" />
        </div>
        <nav className="flex-1 space-y-6 px-4 py-4" aria-label="App">
          <ul className="space-y-1">
            {primary.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className={cn("flex items-center gap-3 rounded-md px-3 py-2.5 text-[15px] font-semibold transition-colors", isActive(i.href, i.exact) ? "bg-emerald text-ivory" : "text-emerald hover:bg-emerald/5")}>
                  <i.icon className="size-5" aria-hidden /> {label(i)}
                </Link>
              </li>
            ))}
          </ul>
          {secondary.length > 0 && (
          <div>
            <p className="text-eyebrow px-3 text-muted">More</p>
            <ul className="mt-2 space-y-1">
              {secondary.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", isActive(i.href) ? "bg-emerald/10 text-emerald" : "text-ink/70 hover:bg-emerald/5 hover:text-emerald")}>
                    <i.icon className="size-4" aria-hidden /> {label(i)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          )}
        </nav>
        <div className="space-y-2 border-t border-emerald/10 p-4">
          <Link href="/emergency" className="flex items-center justify-center gap-2 rounded-full bg-coral px-4 py-2.5 text-sm font-bold text-white">
            <Phone className="size-4" /> {lang === "rw" ? "Ibyihutirwa · 912" : "Emergency · 912"}
          </Link>
          <form action={signOutAction}>
            <button className="flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-muted hover:bg-emerald/5 hover:text-emerald">
              <LogOut className="size-4" /> Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-h-[100svh] flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-emerald/10 bg-ivory/85 backdrop-blur-xl">
          <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:h-[72px]">
            <Link href={nav.home} className="inline-flex items-center gap-2 lg:hidden" aria-label="MamaCare home">
              <Image src="/brand/mark.png" alt="" width={32} height={37} className="h-8 w-auto" />
              <Image src="/brand/wordmark.png" alt="MamaCare" width={110} height={16} className="hidden h-4 w-auto min-[420px]:block" />
            </Link>
            <p className="hidden text-sm text-muted lg:block">{lang === "rw" ? "Muraho" : "Hello"}, <span className="font-semibold text-emerald">{name}</span></p>
            <div className="flex items-center gap-2">
              {status}
              <button type="button" onClick={toggle} className="rounded-full px-3 py-1.5 text-xs font-bold text-emerald hover:bg-emerald/5" aria-label="Switch language">
                {lang === "en" ? "RW" : "EN"}
              </button>
              <Link href="/emergency" className="inline-flex items-center gap-1.5 rounded-full bg-coral px-3 py-1.5 text-xs font-bold text-white lg:hidden">
                <Phone className="size-3.5" /> 912
              </Link>
              <span className="grid size-9 place-items-center rounded-full bg-emerald text-xs font-bold text-ivory" aria-hidden>{name.slice(0, 1)}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 pb-24 pt-5 sm:px-6 lg:px-10 lg:pb-10 lg:pt-8">{children}</main>

        {/* Mobile bottom tabs */}
        <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-emerald/10 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden" aria-label="App">
          <ul className={cn("grid", secondary.length > 0 ? "grid-cols-5" : "grid-cols-3")}>
            {primary.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className={cn("flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold", isActive(i.href, i.exact) ? "text-emerald" : "text-muted")} aria-current={isActive(i.href, i.exact) ? "page" : undefined}>
                  <i.icon className={cn("size-5", isActive(i.href, i.exact) && "fill-emerald/10")} aria-hidden /> {label(i)}
                </Link>
              </li>
            ))}
            {secondary.length > 0 && (
            <li>
              <Link href={nav.moreHref} className={cn("flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold", moreActive ? "text-emerald" : "text-muted")}>
                <MoreHorizontal className="size-5" aria-hidden /> {lang === "rw" ? "Ibindi" : "More"}
              </Link>
            </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
