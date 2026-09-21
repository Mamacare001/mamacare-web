"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { CaseMother } from "@/lib/mock/chw";
import { MotherRow } from "@/components/chw/MotherRow";
import { cn } from "@/lib/cn";

const filters = [
  { id: "all", label: "All" },
  { id: "high", label: "High risk" },
  { id: "due", label: "Visit due" },
  { id: "noanc", label: "No ANC yet" },
  { id: "third", label: "3rd trimester" },
] as const;

export function CaseloadList({ mothers, initial = "all" }: { mothers: CaseMother[]; initial?: string }) {
  const [q, setQ] = useState("");
  const [f, setF] = useState<string>(initial);
  const list = useMemo(() => {
    const today = "2026-09-21";
    return mothers
      .filter((m) => (f === "high" ? m.risk === "high" : f === "due" ? m.nextVisitDue <= today : f === "noanc" ? m.ancDone === 0 : f === "third" ? m.weeks >= 28 : true))
      .filter((m) => !q || m.name.toLowerCase().includes(q.toLowerCase()) || m.village.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => ({ high: 0, moderate: 1, low: 2 }[a.risk] - { high: 0, moderate: 1, low: 2 }[b.risk]));
  }, [mothers, q, f]);
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or village" className="h-11 w-full rounded-full border border-emerald/15 bg-white pl-10 pr-4 text-[15px] focus:border-green focus:outline-none" aria-label="Search caseload" />
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {filters.map((x) => (
          <button key={x.id} type="button" onClick={() => setF(x.id)} className={cn("shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors", f === x.id ? "bg-emerald text-ivory" : "bg-white text-emerald ring-1 ring-emerald/15")}>{x.label}</button>
        ))}
      </div>
      <p className="text-xs text-muted">{list.length} of {mothers.length} · sorted by risk</p>
      <ul className="space-y-2">{list.map((m) => <li key={m.id}><MotherRow m={m} showDue /></li>)}</ul>
      {list.length === 0 && <p className="rounded-lg bg-white p-6 text-center text-muted">No mothers match.</p>}
    </div>
  );
}
