import type { Metadata } from "next";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { statusPage } from "@/lib/mock/shared";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "System status", description: "Live status of MamaCare channels and services." };

const ui = { operational: { icon: CheckCircle2, cls: "text-green", bg: "bg-green-100", label: "Operational" }, degraded: { icon: AlertTriangle, cls: "text-[#8a6a10]", bg: "bg-gold-100", label: "Degraded" }, outage: { icon: XCircle, cls: "text-coral", bg: "bg-coral-100", label: "Outage" } } as const;

/** Public, no sign-in, deliberately plain so it loads during an incident. */
export default function StatusPage() {
  const s = statusPage;
  const o = ui[s.overall];
  return (
    <section className="bg-ivory pb-24 pt-32 md:pt-40">
      <div className="container-x max-w-3xl">
        <p className="text-eyebrow text-green">MamaCare status</p>
        <div className={cn("mt-4 flex items-center gap-4 rounded-xl p-6", o.bg)}>
          <o.icon className={cn("size-9", o.cls)} />
          <div><p className="font-display text-3xl text-emerald">{s.overall === "operational" ? "All systems operational" : s.overall === "degraded" ? "Some systems degraded" : "Service disruption"}</p><p className="text-sm text-muted">Updated {new Date(s.updated).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} (Kigali)</p></div>
        </div>
        <ul className="mt-6 divide-y divide-emerald/10 rounded-lg bg-white ring-1 ring-emerald/5">
          {s.components.map((c) => { const u = ui[c.status as keyof typeof ui]; return (
            <li key={c.name} className="flex items-start justify-between gap-4 p-4"><div><p className="font-semibold text-emerald">{c.name}</p>{c.note && <p className="mt-0.5 text-sm text-muted">{c.note}</p>}</div><div className="text-right"><p className={cn("inline-flex items-center gap-1.5 text-sm font-semibold", u.cls)}><u.icon className="size-4" /> {u.label}</p><p className="text-xs text-muted">{c.uptime90d}% · 90 d</p></div></li>
          ); })}
        </ul>
        <h2 className="text-h3 mt-10 text-emerald">Incidents</h2>
        <ul className="mt-3 space-y-3">
          {s.incidents.map((i) => (
            <li key={i.title} className="rounded-lg bg-white p-4 ring-1 ring-emerald/5">
              <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-semibold text-emerald">{i.title}</p><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", i.status === "resolved" ? "bg-green-100 text-green" : "bg-gold-100 text-[#8a6a10]")}>{i.status}</span></div>
              <p className="text-xs text-muted">{new Date(i.at).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}</p>
              <ul className="mt-2 space-y-1 text-sm text-ink/85">{i.updates.map((u) => <li key={u}>{u}</li>)}</ul>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">If MamaCare is unavailable, CHWs keep working: the app saves on the phone and syncs later. Mothers and families can always call their CHW or facility directly. In an emergency, <a href="tel:912" className="font-semibold text-coral underline underline-offset-2">call 912</a>.</p>
      </div>
    </section>
  );
}
