"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { RiskPill, fmtDate } from "@/components/app/ui";
import { fieldCls } from "@/components/auth/fields";
import type { Risk } from "@/lib/mock/mother";

export type PickableMother = { id: string; name: string; village: string; weeks: number; risk: Risk; due?: string; sub?: string };

/** Search-and-pick list used by "Report a visit" for CHWs and clinic staff. */
/** `hrefTemplate` contains `{id}`, e.g. "/chw/mother/{id}/visit" (a string, so server pages can pass it). */
export function MotherPicker({ mothers, hrefTemplate, emptyLabel = "No mothers match." }: { mothers: PickableMother[]; hrefTemplate: string; emptyLabel?: string }) {
  const [q, setQ] = useState("");
  const list = mothers.filter((m) => `${m.name} ${m.village}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-3">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or village…" className={`${fieldCls} pl-11`} autoFocus />
      </label>
      {list.length === 0 ? (
        <p className="rounded-lg bg-white p-6 text-center text-sm text-muted ring-1 ring-emerald/5">{emptyLabel}</p>
      ) : (
        <ul className="divide-y divide-emerald/10 rounded-lg bg-white ring-1 ring-emerald/5">
          {list.map((m) => (
            <li key={m.id}>
              <Link href={hrefTemplate.replace("{id}", m.id)} className="flex items-center gap-3 p-4 transition-colors hover:bg-ivory">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-emerald">{m.name}</p>
                  <p className="text-xs text-muted">{m.village} · week {m.weeks}{m.due ? ` · due ${fmtDate(m.due)}` : ""}{m.sub ? ` · ${m.sub}` : ""}</p>
                </div>
                <RiskPill risk={m.risk} />
                <ChevronRight className="size-4 text-muted" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
