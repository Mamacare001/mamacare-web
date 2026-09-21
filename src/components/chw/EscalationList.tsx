"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Loader2, Check, ArrowRight, Phone } from "lucide-react";
import type { Escalation } from "@/lib/mock/chw";
import { updateEscalation } from "@/app/chw/actions";
import { RiskPill, fmtDate, fmtTime } from "@/components/app/ui";
import { cn } from "@/lib/cn";

const steps: Escalation["status"][] = ["open", "acknowledged", "acted", "closed"];

export function EscalationList({ items }: { items: Escalation[] }) {
  const [local, setLocal] = useState(items);
  const [busy, setBusy] = useState<string | null>(null);
  const [, start] = useTransition();
  const [tab, setTab] = useState<"active" | "done">("active");

  const advance = (e: Escalation) => {
    const next = steps[Math.min(steps.indexOf(e.status) + 1, steps.length - 1)] as "acknowledged" | "acted" | "closed";
    setBusy(e.id);
    start(async () => {
      await updateEscalation(e.id, next);
      setLocal((l) => l.map((x) => (x.id === e.id ? { ...x, status: next } : x)));
      setBusy(null);
    });
  };

  const list = local.filter((e) => (tab === "active" ? e.status !== "closed" : e.status === "closed"));
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {(["active", "done"] as const).map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className={cn("rounded-full px-4 py-1.5 text-sm font-semibold", tab === t ? "bg-emerald text-ivory" : "bg-white text-emerald ring-1 ring-emerald/15")}>{t === "active" ? `Active (${local.filter((e) => e.status !== "closed").length})` : `Closed (${local.filter((e) => e.status === "closed").length})`}</button>
        ))}
      </div>
      <ul className="space-y-3">
        {list.map((e) => {
          const idx = steps.indexOf(e.status);
          return (
            <li key={e.id} id={e.id} className={cn("scroll-mt-24 rounded-lg bg-white p-4 ring-1 ring-emerald/5", e.risk === "high" && e.status === "open" && "ring-2 ring-coral/50")}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <Link href={`/chw/mother/${e.motherId}`} className="font-display text-xl text-emerald hover:underline">{e.motherName}</Link>
                  <p className="text-xs text-muted">{fmtDate(e.at)} {fmtTime(e.at)} · reported by {e.source}</p>
                </div>
                <RiskPill risk={e.risk} />
              </div>
              <p className="mt-3 text-[15px] text-ink/90">{e.reason}</p>
              <p className="mt-1 text-sm font-semibold text-emerald">→ {e.recommended}</p>

              <ol className="mt-4 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide">
                {steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-1">
                    <span className={cn("rounded-full px-2 py-0.5", i < idx ? "bg-green-100 text-green" : i === idx ? "bg-emerald text-ivory" : "bg-ivory text-muted")}>{s}</span>
                    {i < steps.length - 1 && <span className="h-px w-3 bg-emerald/20" />}
                  </li>
                ))}
              </ol>

              {e.facilityResponse && (
                <div className="mt-3 rounded-md bg-green-100/70 p-3 text-sm">
                  <p className="text-eyebrow text-green">Clinic response · {fmtDate(e.facilityResponse.at)}</p>
                  <p className="mt-1 text-ink/90">{e.facilityResponse.text}</p>
                  <p className="mt-1 text-xs text-muted">{e.facilityResponse.by}</p>
                </div>
              )}
              {e.status === "acted" && !e.facilityResponse && <p className="mt-3 text-xs text-muted">Waiting for the clinic to record what happened. Your supervisor sees this if it stalls beyond 48 h.</p>}

              {e.status !== "closed" && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" disabled={busy === e.id} onClick={() => advance(e)} className="inline-flex items-center gap-2 rounded-full bg-emerald px-4 py-2 text-sm font-semibold text-ivory disabled:opacity-50">
                    {busy === e.id ? <Loader2 className="size-4 animate-spin" /> : e.status === "open" ? <><Check className="size-4" /> Acknowledge</> : e.status === "acknowledged" ? <><ArrowRight className="size-4" /> Mark as acted</> : <><Check className="size-4" /> Close</>}
                  </button>
                  {e.status !== "acted" && <Link href={`/chw/mother/${e.motherId}/visit`} className="rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white">Record visit</Link>}
                  <Link href={`/chw/refer?mother=${e.motherId}&urgency=${e.risk === "high" ? "now" : "24h"}`} className="rounded-full px-4 py-2 text-sm font-semibold text-emerald ring-1 ring-emerald/15">Refer</Link>
                  {e.risk === "high" && <a href="tel:912" className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-coral ring-1 ring-coral/30"><Phone className="size-4" /> 912</a>}
                </div>
              )}
            </li>
          );
        })}
        {list.length === 0 && <li className="rounded-lg bg-white p-6 text-center text-muted">Nothing here.</li>}
      </ul>
    </div>
  );
}
