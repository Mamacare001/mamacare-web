import { cn } from "@/lib/cn";
import { MIN_CELL, cell } from "@/lib/mock/partner";

/** A suppressed value: shown as "< 20" with a tooltip explaining why. */
export function Cell({ n, suffix = "" }: { n: number; suffix?: string }) {
  const v = cell(n);
  return v === null ? <span className="rounded bg-ivory px-1.5 py-0.5 font-mono text-xs text-muted" title={`Suppressed: fewer than ${MIN_CELL} people`}>&lt; {MIN_CELL}</span> : <span className="font-mono">{v.toLocaleString()}{suffix}</span>;
}

export function Stat({ n, label, sub, tone = "text-emerald" }: { n: React.ReactNode; label: string; sub?: string; tone?: string }) {
  return (
    <div className="rounded-lg bg-white p-4 ring-1 ring-emerald/5">
      <p className={cn("font-display text-3xl", tone)}>{n}</p>
      <p className="text-sm font-semibold text-emerald">{label}</p>
      {sub && <p className="text-xs text-muted">{sub}</p>}
    </div>
  );
}

/** Horizontal bars, CSS only. */
export function Bars({ rows, max, color = "bg-green", suffix = "" }: { rows: { label: string; value: number; sub?: string }[]; max?: number; color?: string; suffix?: string }) {
  const m = max ?? Math.max(...rows.map((r) => r.value), 1);
  return (
    <ul className="space-y-2.5">
      {rows.map((r) => (
        <li key={r.label}>
          <div className="flex items-center justify-between gap-3 text-sm"><span className="truncate text-ink/85">{r.label}</span><span className="shrink-0 font-mono text-xs text-muted">{r.value.toLocaleString()}{suffix}{r.sub && ` · ${r.sub}`}</span></div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-ivory"><div className={cn("h-full rounded-full", color)} style={{ width: `${Math.max(2, (r.value / m) * 100)}%` }} /></div>
        </li>
      ))}
    </ul>
  );
}

/** Two-series weekly columns, CSS only. */
export function Columns({ data, aKey, bKey, aLabel, bLabel }: { data: Record<string, number | string>[]; aKey: string; bKey: string; aLabel: string; bLabel: string }) {
  const max = Math.max(...data.map((d) => Number(d[aKey])), 1);
  return (
    <div>
      <div className="flex h-40 items-end gap-1.5">
        {data.map((d, i) => (
          <div key={i} className="group relative flex h-full flex-1 items-end justify-center gap-0.5" title={`${d.w}: ${d[aKey]} ${aLabel}, ${d[bKey]} ${bLabel}`}>
            <div className="w-1/2 rounded-t bg-emerald/25" style={{ height: `${(Number(d[aKey]) / max) * 100}%` }} />
            <div className="w-1/2 rounded-t bg-green" style={{ height: `${(Number(d[bKey]) / max) * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-1 flex gap-1.5 text-[10px] text-muted">{data.map((d, i) => <span key={i} className="flex-1 truncate text-center">{String(d.w)}</span>)}</div>
      <div className="mt-2 flex gap-4 text-xs text-muted"><span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-emerald/25" /> {aLabel}</span><span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-green" /> {bLabel}</span></div>
    </div>
  );
}
