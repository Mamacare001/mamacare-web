import Link from "next/link";
import { Suspense } from "react";
import { ChwFilter } from "@/components/supervisor/ChwFilter";
import { sectorMothers, chws } from "@/lib/mock/supervisor";
import { PageTitle, RiskPill, fmtDate } from "@/components/app/ui";
import { cn } from "@/lib/cn";

export const metadata = { title: "Mothers" };

export default async function SupervisorMothers({ searchParams }: { searchParams: Promise<{ risk?: string; chw?: string }> }) {
  const { risk, chw } = await searchParams;
  const order = { high: 0, moderate: 1, low: 2 } as const;
  const list = sectorMothers.filter((m) => (!risk || m.risk === risk) && (!chw || m.chwId === chw)).sort((a, b) => order[a.risk] - order[b.risk]);
  return (
    <div className="mx-auto max-w-6xl">
      <PageTitle eyebrow={`${sectorMothers.length} mothers · ${sectorMothers.filter((m) => m.risk === "high").length} high risk`} title="Sector caseload" />
      <div className="mb-4 flex flex-wrap gap-2">
        {[["", "All"], ["high", "High"], ["moderate", "Moderate"], ["low", "Low"]].map(([v, l]) => (
          <Link key={v} href={`/supervisor/mothers${v ? `?risk=${v}` : ""}${chw ? `${v ? "&" : "?"}chw=${chw}` : ""}`} className={cn("rounded-full px-3.5 py-1.5 text-sm font-semibold", (risk ?? "") === v ? "bg-emerald text-ivory" : "bg-white text-emerald ring-1 ring-emerald/15")}>{l}</Link>
        ))}
        <Suspense><ChwFilter chws={chws} /></Suspense>
      </div>
      <div className="overflow-x-auto rounded-lg bg-white ring-1 ring-emerald/5">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="text-left text-eyebrow text-muted"><tr className="border-b border-emerald/10">{["Mother", "Risk", "Weeks", "ANC", "CHW", "Cell · village", "Last contact"].map((h) => <th key={h} className="px-4 py-3 font-bold">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-emerald/10">
            {list.map((m) => (
              <tr key={m.id} id={m.id} className="scroll-mt-24 hover:bg-ivory">
                <td className="px-4 py-3 font-semibold text-emerald">{m.name}</td>
                <td className="px-4 py-3"><RiskPill risk={m.risk} /></td>
                <td className="px-4 py-3 font-mono">{m.weeks}</td>
                <td className="px-4 py-3 font-mono">{m.ancDone === 0 && m.weeks > 12 ? <span className="font-bold text-coral">0</span> : m.ancDone}</td>
                <td className="px-4 py-3 text-ink/80">{m.chwName}</td>
                <td className="px-4 py-3 text-ink/80">{m.cell} · {m.village}</td>
                <td className="px-4 py-3 text-ink/80">{fmtDate(m.lastContact)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">Supervisors see risk level, ANC status and contact history — not the mother’s conversation. Every view is logged.</p>
    </div>
  );
}
