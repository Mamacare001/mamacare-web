"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Loader2, Phone, Stethoscope, Check, ArrowUpRight, Car, Clock } from "lucide-react";
import type { QueueItem } from "@/lib/mock/clinic";
import { setQueueStatus } from "@/app/clinic/actions";
import { RiskPill, fmtDate, fmtTime } from "@/components/app/ui";
import { cn } from "@/lib/cn";

const kindLabel = { escalation: "Escalation", referral: "CHW referral", "walk-in": "Walk-in" };

export function QueueList({ items, compact }: { items: QueueItem[]; compact?: boolean }) {
  const [local, setLocal] = useState(items);
  const [busy, setBusy] = useState<string | null>(null);
  const [, start] = useTransition();
  const set = (id: string, status: QueueItem["status"]) => {
    setBusy(id);
    start(async () => {
      await setQueueStatus(id, status as "in-progress" | "seen" | "referred-up");
      setLocal((l) => l.map((x) => (x.id === id ? { ...x, status } : x)));
      setBusy(null);
    });
  };
  const order = { high: 0, moderate: 1, low: 2 } as const;
  const list = [...local].filter((i) => (compact ? i.status !== "seen" : true)).sort((a, b) => (a.status === "seen" ? 1 : b.status === "seen" ? -1 : 0) || order[a.risk] - order[b.risk] || a.at.localeCompare(b.at));

  return (
    <ul className="space-y-3">
      {list.map((q) => (
        <li key={q.id} className={cn("rounded-lg bg-white p-4 ring-1 ring-emerald/5", q.risk === "high" && q.status === "waiting" && "ring-2 ring-coral/50", q.status === "seen" && "opacity-60")}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Link href={`/clinic/mother/${q.motherId}`} className="font-display text-xl text-emerald hover:underline">{q.motherName}</Link>
              <p className="text-xs text-muted">{q.age} y · G{q.gravida} · {q.weeks} wk · {kindLabel[q.kind]} · {fmtDate(q.at)} {fmtTime(q.at)}</p>
              <p className="text-xs text-muted">From {q.from}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <RiskPill risk={q.risk} />
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", q.status === "waiting" ? "bg-coral-100 text-coral" : q.status === "in-progress" ? "bg-gold-100 text-[#8a6a10]" : "bg-green-100 text-green")}>{q.status}</span>
              {q.eta && q.status === "waiting" && <span className="inline-flex items-center gap-1 rounded-full bg-ivory px-2 py-0.5 text-[11px] font-semibold text-emerald"><Clock className="size-3" /> ETA {q.eta}{q.transport && <><Car className="ml-1 size-3" /> moto</>}</span>}
            </div>
          </div>
          <p className="mt-2 text-[15px] text-ink/90">{q.reason}</p>
          {q.chwFindings && <p className="mt-1 rounded-md bg-ivory px-3 py-2 text-sm text-ink/85"><span className="text-eyebrow text-muted">CHW findings · </span>{q.chwFindings}</p>}
          {q.status !== "seen" && (
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href={`/clinic/mother/${q.motherId}/encounter?from=${q.id}`} className="inline-flex items-center gap-1.5 rounded-full bg-emerald px-3.5 py-2 text-sm font-semibold text-ivory"><Stethoscope className="size-4" /> Open encounter</Link>
              {q.status === "waiting" && <button disabled={busy === q.id} onClick={() => set(q.id, "in-progress")} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-emerald ring-1 ring-emerald/15 disabled:opacity-50">{busy === q.id ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />} Arrived</button>}
              <Link href={`/clinic/mother/${q.motherId}`} className="rounded-full px-3.5 py-2 text-sm font-semibold text-emerald ring-1 ring-emerald/15">Record</Link>
              <a href={`tel:${q.chwPhone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-emerald ring-1 ring-emerald/15"><Phone className="size-4" /> {q.chwName.split(" ")[0]} (CHW)</a>
              {q.risk === "high" && <Link href={`/clinic/mother/${q.motherId}/refer`} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-coral ring-1 ring-coral/30"><ArrowUpRight className="size-4" /> Refer up</Link>}
            </div>
          )}
        </li>
      ))}
      {list.length === 0 && <li className="rounded-lg bg-white p-6 text-center text-muted">Queue is empty.</li>}
    </ul>
  );
}
