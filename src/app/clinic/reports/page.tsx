import { reports, facility } from "@/lib/mock/clinic";
import { PageTitle, Card } from "@/components/app/ui";
import { cn } from "@/lib/cn";

export const metadata = { title: "Reports" };

export default function ReportsPage() {
  const r = reports;
  const pct = (a: number, b: number) => Math.round((a / Math.max(1, b)) * 100);
  const stats = [
    { n: r.referralsReceived, l: "Referrals received", sub: `${pct(r.seenWithin24h, r.referralsReceived)}% seen within 24 h` },
    { n: `${pct(r.loopClosed, r.referralsReceived)}%`, l: "Loops closed", sub: `median ${r.loopMedianH} h from arrival to CHW feedback` },
    { n: r.escalationsHigh, l: "High-risk escalations", sub: `${r.referredUp} referred to ${facility.referral.split(" ")[0]} DH` },
    { n: `${r.anc4Coverage}%`, l: "ANC 4+ coverage", sub: `${r.ancVisits} ANC visits this period` },
  ];
  const outcomes = Object.entries(r.outcomes) as [string, number][];
  const total = outcomes.reduce((n, [, v]) => n + v, 0);
  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <PageTitle eyebrow={`${facility.name} · ${r.period}`} title="Facility report" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => <Card key={s.l}><p className="font-display text-3xl text-emerald">{s.n}</p><p className="text-sm font-semibold text-emerald">{s.l}</p><p className="text-xs text-muted">{s.sub}</p></Card>)}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <p className="text-eyebrow text-muted">Referrals vs loops closed, by week</p>
          <ul className="mt-4 space-y-3">
            {r.byWeek.map((w) => (
              <li key={w.w}>
                <div className="flex justify-between text-sm"><span className="font-semibold text-emerald">{w.w}</span><span className="font-mono text-xs text-muted">{w.closed}/{w.referrals} closed</span></div>
                <div className="mt-1 flex h-2.5 overflow-hidden rounded-full bg-ivory"><div className="bg-green" style={{ width: `${pct(w.closed, w.referrals)}%` }} /><div className={cn(pct(w.closed, w.referrals) < 60 ? "bg-coral" : "bg-gold")} style={{ width: `${100 - pct(w.closed, w.referrals)}%` }} /></div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">Green = CHW feedback sent. This week’s gap is the queue on the Close-loop page.</p>
        </Card>
        <Card>
          <p className="text-eyebrow text-muted">Outcomes of referred cases</p>
          <ul className="mt-4 space-y-2">
            {outcomes.map(([k, v]) => (
              <li key={k} className="flex items-center gap-3 text-sm"><span className="w-28 capitalize text-ink/85">{k === "referredUp" ? "Referred up" : k}</span><div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ivory"><div className={cn("h-full", k === "complication" ? "bg-coral" : k === "pending" ? "bg-gold" : "bg-green")} style={{ width: `${pct(v, total)}%` }} /></div><span className="w-6 text-right font-mono text-xs text-muted">{v}</span></li>
            ))}
          </ul>
        </Card>
      </div>
      <p className="text-xs text-muted">Facility-level figures only. District and partner views receive de-identified aggregates with a minimum cell size of 20. Export: coming with the API.</p>
    </div>
  );
}
