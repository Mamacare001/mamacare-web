"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, CircleHelp, Activity, Users, Building2, Ticket, Scale, Cpu, Languages, FileSearch, ShieldCheck, ScrollText, KeyRound, Plug, LifeBuoy, Receipt, Settings, LogOut, Lock, Lightbulb } from "lucide-react";
import { cn } from "@/lib/cn";

const groups = [
  { title: "Operate", items: [{ href: "/admin", label: "Overview", icon: Activity, exact: true }, { href: "/admin/support", label: "Support", icon: LifeBuoy }, { href: "/admin/integrations", label: "Integrations", icon: Plug }] },
  { title: "Access", items: [{ href: "/admin/users", label: "Users & roles", icon: Users }, { href: "/admin/organisations", label: "Organisations", icon: Building2 }, { href: "/admin/invites", label: "Invites", icon: Ticket }] },
  { title: "Clinical & AI", items: [{ href: "/admin/rules", label: "Clinical rules", icon: Scale }, { href: "/admin/models", label: "Models", icon: Cpu }, { href: "/admin/content", label: "Content · EN/RW", icon: Languages }, { href: "/admin/case-review", label: "Case review", icon: FileSearch }] },
  { title: "Privacy & security", items: [{ href: "/admin/consent", label: "Consent & requests", icon: ShieldCheck }, { href: "/admin/audit", label: "Audit log", icon: ScrollText }, { href: "/admin/break-glass", label: "Break-glass", icon: KeyRound }] },
  { title: "Business", items: [{ href: "/admin/talent", label: "Talent & ideas", icon: Lightbulb }, { href: "/admin/billing", label: "Billing", icon: Receipt }, { href: "/admin/settings", label: "Settings & flags", icon: Settings }] },
];

export function AdminShell({ children, name, roles, signOutAction }: { children: React.ReactNode; name: string; roles: string; signOutAction: () => Promise<void> }) {
  const pathname = usePathname();
  const active = (href: string, exact?: boolean) => (exact ? pathname === href : pathname.startsWith(href));
  return (
    <div className="min-h-[100svh] bg-ivory lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden border-r border-emerald/10 bg-midnight text-ivory lg:flex lg:flex-col">
        <div className="flex h-[72px] items-center gap-2.5 px-6">
          <Image src="/brand/mark.png" alt="" width={36} height={42} className="h-9 w-auto" />
          <div><Image src="/brand/wordmark-white.png" alt="MamaCare" width={110} height={16} className="h-4 w-auto" /><p className="text-eyebrow mt-0.5 text-gold">Admin</p></div>
        </div>
        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-3" aria-label="Admin">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="text-eyebrow px-3 text-ivory/40">{g.title}</p>
              <ul className="mt-1.5 space-y-0.5">
                {g.items.map((i) => (
                  <li key={i.href}><Link href={i.href} className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", active(i.href, i.exact) ? "bg-ivory text-emerald" : "text-ivory/75 hover:bg-white/5 hover:text-ivory")}><i.icon className="size-4" aria-hidden /> {i.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4 text-xs text-ivory/60">
          <p className="font-semibold text-ivory">{name}</p><p>{roles}</p>
          <p className="mt-1 inline-flex items-center gap-1 text-green"><Lock className="size-3" /> SSO + MFA · session 30 min</p>
          <form action={signOutAction} className="mt-3"><button className="inline-flex items-center gap-2 text-ivory/70 hover:text-ivory"><LogOut className="size-4" /> Sign out</button></form>
        </div>
      </aside>
      <div className="flex min-h-[100svh] flex-col">
        <header className="sticky top-0 z-30 border-b border-emerald/10 bg-ivory/85 px-4 backdrop-blur-xl lg:px-8">
          <div className="flex h-14 items-center justify-between lg:h-[72px]">
            <div className="flex items-center gap-2 lg:hidden"><Image src="/brand/mark.png" alt="" width={32} height={37} className="h-8 w-auto" /><span className="text-eyebrow text-gold">Admin</span></div>
            <p className="hidden text-sm text-muted lg:block">Every action here is written to the audit log.</p>
            <div className="hidden items-center gap-1 lg:flex">
              <Link href="/notifications" className="grid size-9 place-items-center rounded-full text-emerald hover:bg-emerald/5" aria-label="Notifications"><Bell className="size-5" /></Link>
              <Link href="/help" className="grid size-9 place-items-center rounded-full text-emerald hover:bg-emerald/5" aria-label="Help"><CircleHelp className="size-5" /></Link>
            </div>
            <select className="h-9 rounded-full border border-emerald/15 bg-white px-3 text-sm lg:hidden" value={pathname} onChange={(e) => { window.location.href = e.target.value; }} aria-label="Admin section">
              {groups.flatMap((g) => g.items).map((i) => <option key={i.href} value={i.href}>{i.label}</option>)}
            </select>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
