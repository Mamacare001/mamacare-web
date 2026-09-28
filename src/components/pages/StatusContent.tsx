"use client";

import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { statusPage } from "@/lib/mock/shared";
import { cn } from "@/lib/cn";
import { useLang } from "@/components/providers/LanguageProvider";

const iconFor = { operational: CheckCircle2, degraded: AlertTriangle, outage: XCircle } as const;
const clsFor = { operational: "text-green", degraded: "text-[#8a6a10]", outage: "text-coral" } as const;
const bgFor = { operational: "bg-green-100", degraded: "bg-gold-100", outage: "bg-coral-100" } as const;

/** Public, no sign-in, deliberately plain so it loads during an incident. */
export function StatusContent() {
  const { t } = useLang();
  const st = t.status;
  const s = statusPage;
  const overall = s.overall as keyof typeof iconFor;
  const OverallIcon = iconFor[overall];

  return (
    <section className="bg-ivory pb-24 pt-32 md:pt-40">
      <div className="container-x max-w-3xl">
        <p className="text-eyebrow text-green">{st.title}</p>
        <div className={cn("mt-4 flex items-center gap-4 rounded-xl p-6", bgFor[overall])}>
          <OverallIcon className={cn("size-9", clsFor[overall])} />
          <div>
            <p className="font-display text-3xl text-emerald">{st.overall[overall]}</p>
            <p className="text-sm text-muted">{st.updatedPrefix} {new Date(s.updated).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} {st.kigaliSuffix}</p>
          </div>
        </div>
        <ul className="mt-6 divide-y divide-emerald/10 rounded-lg bg-white ring-1 ring-emerald/5">
          {s.components.map((c) => {
            const status = c.status as keyof typeof iconFor;
            const Icon = iconFor[status];
            return (
              <li key={c.name} className="flex items-start justify-between gap-4 p-4">
                <div>
                  <p className="font-semibold text-emerald">{c.name}</p>
                  {c.note && <p className="mt-0.5 text-sm text-muted">{c.note}</p>}
                </div>
                <div className="text-right">
                  <p className={cn("inline-flex items-center gap-1.5 text-sm font-semibold", clsFor[status])}>
                    <Icon className="size-4" /> {st.statusLabel[status]}
                  </p>
                  <p className="text-xs text-muted">{c.uptime90d}% · {st.uptimeSuffix}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <h2 className="text-h3 mt-10 text-emerald">{st.incidentsHeading}</h2>
        <ul className="mt-3 space-y-3">
          {s.incidents.map((i) => (
            <li key={i.title} className="rounded-lg bg-white p-4 ring-1 ring-emerald/5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-emerald">{i.title}</p>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", i.status === "resolved" ? "bg-green-100 text-green" : "bg-gold-100 text-[#8a6a10]")}>{i.status}</span>
              </div>
              <p className="text-xs text-muted">{new Date(i.at).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}</p>
              <ul className="mt-2 space-y-1 text-sm text-ink/85">{i.updates.map((u) => <li key={u}>{u}</li>)}</ul>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">
          {st.footer.pre}<a href="tel:912" className="font-semibold text-coral underline underline-offset-2">{st.footer.link}</a>{st.footer.post}
        </p>
      </div>
    </section>
  );
}
