import Link from "next/link";
import { ShieldCheck, Download } from "lucide-react";
import { scope, districtSummary as d, bySector, byWeek, bySign, bySource, pct, MIN_CELL } from "@/lib/mock/partner";
import { PageTitle, Card } from "@/components/app/ui";
import { Stat, Bars, Columns, Cell } from "@/components/partner/Charts";
import { cn } from "@/lib/cn";

export const metadata = { title: "Insights" };

export default function InsightsPage() {
  const reached = pct(d.reached24h, d.escalations);
  const high2h = pct(d.reachedHigh2h, d.escalationsHigh);
  const loop = pct(d.loopClosed, d.escalations);
  const anc4 = pct(d.anc4, d.eligibleAnc4);
  const fac = pct(d.facilityDeliveries, d.deliveries);
  const emergDelta = Math.round(((d.emergencyBaseline - d.emergencyAdmissions) / d.emergencyBaseline) * 100);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageTitle eyebrow={`${scope.name} · ${scope.period} · as of 21 Sep 06:00`} title="Did warnings reach care in time?" action={<Link href="/insights/export" className="inline-flex items-center gap-2 rounded-full bg-emerald px-4 py-2 text-sm font-semibold text-ivory"><Download className="size-4" /> Export</Link>} />
      <Card className="flex items-start gap-3 border-l-4 border-green">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-green" />
        <p className="text-sm text-ink/85"><strong>Aggregate, de-identified view.</strong> No names, no individual records. Any figure that would describe fewer than {MIN_CELL} people is shown as “&lt; {MIN_CELL}”. Access to this page is logged.</p>
      </Card>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat n={`${reached}%`} label="Escalations reaching a facility ≤ 24 h" sub={`${d.reached24h.toLocaleString()} of ${d.escalations.toLocaleString()}`} tone={reached >= 85 ? "text-green" : "text-[#8a6a10]"} />
        <Stat n={`${high2h}%`} label="High-risk reaching care ≤ 2 h" sub={`${d.reachedHigh2h} of ${d.escalationsHigh} high-risk`} tone={high2h >= 80 ? "text-green" : "text-coral"} />
        <Stat n={`${loop}%`} label="CHW feedback loop closed" sub={`median ${d.loopMedianH} h`} />
        <Stat n={<span className="text-green">−{emergDelta}%</span>} label="Emergency obstetric admissions" sub={`${d.emergencyAdmissions} vs ${d.emergencyBaseline} in matched cohort`} />
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat n={d.enrolled.toLocaleString()} label="Mothers enrolled" sub={`${pct(d.activeLast30d, d.enrolled)}% active in last 30 d`} />
        <Stat n={d.checkins.toLocaleString()} label="Check-ins" sub={`${(d.checkins / d.enrolled).toFixed(1)} per mother`} />
        <Stat n={`${anc4}%`} label="ANC 4+ coverage" sub={`${d.anc4.toLocaleString()} of ${d.eligibleAnc4.toLocaleString()} eligible`} />
        <Stat n={`${fac}%`} label="Facility deliveries" sub={`${d.facilityDeliveries} of ${d.deliveries}`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card><p className="text-eyebrow text-muted">Escalations and those reaching care, by week</p><div className="mt-4"><Columns data={byWeek} aKey="esc" bKey="reached" aLabel="Escalations" bLabel="Reached facility ≤ 24 h" /></div><p className="mt-2 text-xs text-muted">The dip in the week of 16 Sep is one sector (see table) — CHW sync outage, now resolved.</p></Card>
        <Card><p className="text-eyebrow text-muted">What triggered escalations</p><div className="mt-4"><Bars rows={bySign.map((s) => ({ label: s.sign, value: s.n }))} color="bg-coral" /></div><p className="mt-3 text-eyebrow text-muted">Who reported first</p><div className="mt-2"><Bars rows={bySource.map((s) => ({ label: s.s, value: s.n }))} color="bg-violet" /></div></Card>
      </div>

      <Card>
        <p className="text-eyebrow text-muted">By sector</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="text-left text-xs text-muted"><tr className="border-b border-emerald/10">{["Sector", "Enrolled", "Escalations", "Reached ≤ 24 h", "High risk", "ANC 4+"].map((h) => <th key={h} className="py-2 pr-4 font-bold">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-emerald/10">
              {bySector.map((s) => {
                const r = pct(s.reached24h, s.escalations);
                return (
                  <tr key={s.sector} className={cn(r < 75 && "bg-gold-100/40")}>
                    <td className="py-2 pr-4 font-semibold text-emerald">{s.sector}</td>
                    <td className="py-2 pr-4"><Cell n={s.enrolled} /></td>
                    <td className="py-2 pr-4"><Cell n={s.escalations} /></td>
                    <td className="py-2 pr-4"><span className={cn("font-mono", r < 75 ? "font-bold text-[#8a6a10]" : "")}>{r}%</span></td>
                    <td className="py-2 pr-4"><Cell n={s.high} /></td>
                    <td className="py-2 pr-4 font-mono">{s.anc4}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted">High-risk counts under {MIN_CELL} are suppressed even at sector level. Shaded rows are below the 75% reach target.</p>
      </Card>

      <p className="text-xs text-muted">Definitions: an escalation “reaches a facility” when a provider opens the encounter or records arrival. Emergency-admission comparison uses a matched non-enrolled cohort in the same district and period; this is an observational figure, not a trial result.</p>
    </div>
  );
}
