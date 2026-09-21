"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Loader2, BellRing, ArrowUpRight, Shuffle, Check, Phone } from "lucide-react";
import { type SectorEscalation, type Chw, SLA_H } from "@/lib/mock/supervisor";
import { nudgeChw, reassignEscalation, escalateToFacility } from "@/app/supervisor/actions";
import { RiskPill, fmtDate, fmtTime } from "@/components/app/ui";
import { cn } from "@/lib/cn";

function ageLabel(h: number) {
  return h < 1 ? "< 1 h" : h < 48 ? `${Math.round(h)} h` : `${Math.round(h / 24)} d`;
}

export function StalledList({ items, chws, showAll }: { items: SectorEscalation[]; chws: Chw[]; showAll?: boolean }) {
  const [done, setDone] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [reassigning, setReassigning] = useState<string | null>(null);
  const [, start] = useTransition();
  const run = (key: string, label: string, fn: () => Promise<unknown>) => {
    setBusy(key);
    start(async () => {
      await fn();
      setDone((d) => ({ ...d, [key]: label }));
      setBusy(null);
      setReassigning(null);
    });
  };

  return (
    <ul className="space-y-3">
      {items.map((e) => {
        const over = e.status === "open" ? e.sinceStatusH - SLA_H[e.risk] : e.status === "acknowledged" ? e.sinceStatusH - SLA_H[e.risk] * 2 : e.sinceStatusH - 48;
        const stalled = over > 0 && e.status !== "closed";
        return (
          <li key={e.id} className={cn("rounded-lg bg-white p-4 ring-1 ring-emerald/5", stalled && e.risk === "high" && "ring-2 ring-coral/50", stalled && e.risk !== "high" && "ring-2 ring-gold/60")}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl text-emerald">{e.motherName} <span className="text-sm font-sans text-muted">· {e.cell} · {e.chwName}</span></p>
                <p className="text-xs text-muted">{fmtDate(e.at)} {fmtTime(e.at)} · age {ageLabel(e.ageH)} · <span className="uppercase">{e.status}</span> for {ageLabel(e.sinceStatusH)}</p>
              </div>
              <div className="flex items-center gap-2">
                <RiskPill risk={e.risk} />
                {stalled && <span className="rounded-full bg-coral px-2 py-0.5 text-[10px] font-bold uppercase text-white">stalled {ageLabel(over)} over</span>}
              </div>
            </div>
            <p className="mt-2 text-[15px] text-ink/90">{e.reason}</p>
            {e.status === "acted" && !e.facilityResponded && <p className="mt-1 text-xs text-[#8a6a10]">Waiting on {"Kinyinya HC"} to record the outcome.</p>}

            {done[e.id] ? (
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-green"><Check className="size-4" /> {done[e.id]}</p>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                {(e.status === "open" || e.status === "acknowledged") && (
                  <button disabled={busy === e.id} onClick={() => run(e.id, `Nudged ${e.chwName.split(" ")[0]} by SMS and push.`, () => nudgeChw(e.chwId, e.id))} className="inline-flex items-center gap-1.5 rounded-full bg-emerald px-3.5 py-2 text-sm font-semibold text-ivory disabled:opacity-50">
                    {busy === e.id ? <Loader2 className="size-4 animate-spin" /> : <BellRing className="size-4" />} Nudge CHW
                  </button>
                )}
                {e.status !== "closed" && (
                  <button onClick={() => setReassigning(reassigning === e.id ? null : e.id)} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-emerald ring-1 ring-emerald/15"><Shuffle className="size-4" /> Reassign</button>
                )}
                {(e.status === "acted" && !e.facilityResponded) || (e.risk === "high" && stalled) ? (
                  <button disabled={busy === e.id} onClick={() => run(e.id, "Facility in-charge notified.", () => escalateToFacility(e.id))} className="inline-flex items-center gap-1.5 rounded-full bg-coral px-3.5 py-2 text-sm font-semibold text-white disabled:opacity-50"><ArrowUpRight className="size-4" /> Escalate to facility</button>
                ) : null}
                <a href={`tel:${chws.find((c) => c.id === e.chwId)?.phone.replace(/\s/g, "") ?? ""}`} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-emerald ring-1 ring-emerald/15"><Phone className="size-4" /> Call CHW</a>
                {showAll && <Link href={`/supervisor/mothers#${e.motherId}`} className="inline-flex items-center px-2 text-sm font-semibold text-green">Mother →</Link>}
              </div>
            )}

            {reassigning === e.id && (
              <form
                className="mt-3 grid gap-2 rounded-md bg-ivory p-3 sm:grid-cols-[1fr_1fr_auto]"
                onSubmit={(ev) => {
                  ev.preventDefault();
                  const fd = new FormData(ev.currentTarget);
                  const to = String(fd.get("to"));
                  const reason = String(fd.get("reason"));
                  const name = chws.find((c) => c.id === to)?.name ?? "";
                  run(e.id, `Reassigned to ${name}.`, () => reassignEscalation(e.id, to, reason));
                }}
              >
                <select name="to" required className="h-10 rounded-md border border-emerald/15 bg-white px-3 text-sm" defaultValue="">
                  <option value="" disabled>Move to…</option>
                  {chws.filter((c) => c.id !== e.chwId && c.status === "active").map((c) => <option key={c.id} value={c.id}>{c.name} · {c.cell} · {c.openAlerts} open</option>)}
                </select>
                <input name="reason" required placeholder="Reason (audit-logged)" className="h-10 rounded-md border border-emerald/15 bg-white px-3 text-sm" />
                <button disabled={busy === e.id} className="h-10 rounded-full bg-emerald px-4 text-sm font-semibold text-ivory disabled:opacity-50">Move</button>
              </form>
            )}
          </li>
        );
      })}
      {items.length === 0 && <li className="rounded-lg bg-white p-6 text-center text-muted">Nothing stalled. Good.</li>}
    </ul>
  );
}
