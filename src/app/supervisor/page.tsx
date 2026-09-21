import Link from "next/link";
import { AlertTriangle, Users, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { sector, chws, sectorEscalations, sectorMothers, isStalled } from "@/lib/mock/supervisor";
import { Card } from "@/components/app/ui";
import { StalledList } from "@/components/supervisor/StalledList";
import { cn } from "@/lib/cn";

export const metadata = { title: "Overview" };

export default function SupervisorOverview() {
  const active = sectorEscalations.filter((e) => e.status !== "closed");
  const stalled = active.filter(isStalled).sort((a, b) => (a.risk === "high" ? -1 : b.risk === "high" ? 1 : b.sinceStatusH - a.sinceStatusH));
  const highOpen = active.filter((e) => e.risk === "high" && e.status === "open").length;
  const awaitingClinic = active.filter((e) => e.status === "acted" && !e.facilityResponded).length;
  const responded = sectorEscalations.filter((e) => e.status !== "open");
  const medianResp = 2.5; // demo: median hours to acknowledge across sector
  const within = Math.round((responded.filter((e) => e.risk !== "high" || e.ageH - e.sinceStatusH <= 2).length / Math.max(1, responded.length)) * 100);
  const staleSync = chws.filter((c) => c.status === "active" && new Date(c.lastSync) < new Date("2026-09-20T11:00:00"));

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <p className="text-eyebrow text-green">{sector.name} sector · {sector.district} · {sector.facility}</p>
        <h1 className="text-h2 mt-1 text-emerald">Did every warning reach someone?</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { icon: AlertTriangle, n: stalled.length, l: "Stalled alerts", sub: `${highOpen} high-risk still open`, tone: stalled.length ? "bg-coral-100 text-coral" : "bg-green-100 text-green", href: "/supervisor/escalations?filter=stalled" },
          { icon: Clock, n: `${medianResp} h`, l: "Median time to acknowledge", sub: `${within}% within SLA`, tone: "bg-green-100 text-green", href: "/supervisor/chws" },
          { icon: CheckCircle2, n: awaitingClinic, l: "Waiting on clinic", sub: "acted, no outcome recorded", tone: awaitingClinic ? "bg-gold-100 text-[#8a6a10]" : "bg-green-100 text-green", href: "/supervisor/escalations?filter=clinic" },
          { icon: Users, n: sectorMothers.length, l: "Mothers followed", sub: `${chws.filter((c) => c.status === "active").length} active CHWs · ${sectorMothers.filter((m) => m.risk === "high").length} high risk`, tone: "bg-violet-100 text-violet", href: "/supervisor/mothers" },
        ].map((s) => (
          <Link key={s.l} href={s.href} className="rounded-lg bg-white p-4 ring-1 ring-emerald/5 transition-colors hover:bg-ivory">
            <span className={cn("grid size-9 place-items-center rounded-full", s.tone)}><s.icon className="size-4" /></span>
            <p className="mt-3 font-display text-3xl text-emerald">{s.n}</p>
            <p className="text-sm font-semibold text-emerald">{s.l}</p>
            <p className="text-xs text-muted">{s.sub}</p>
          </Link>
        ))}
      </div>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-h3 text-emerald">Stalled — needs you</h2>
          <Link href="/supervisor/escalations" className="inline-flex items-center gap-1 text-sm font-semibold text-green">All alerts <ArrowRight className="size-4" /></Link>
        </div>
        <p className="mb-3 text-sm text-muted">Open past its SLA (high 2 h · moderate 24 h · low 72 h), acknowledged for twice that, or acted with no clinic outcome after 48 h.</p>
        <StalledList items={stalled} chws={chws} />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between"><p className="text-eyebrow text-muted">Response time by CHW</p><Link href="/supervisor/chws" className="text-sm font-semibold text-green">Details</Link></div>
          <ul className="mt-4 space-y-2.5">
            {chws.filter((c) => c.status === "active").sort((a, b) => b.medianResponseH - a.medianResponseH).map((c) => {
              const pct = Math.min(100, (c.medianResponseH / 24) * 100);
              const slow = c.medianResponseH > 6;
              return (
                <li key={c.id}>
                  <div className="flex items-center justify-between text-sm"><span className="font-semibold text-emerald">{c.name}</span><span className={cn("font-mono text-xs", slow ? "text-coral" : "text-muted")}>{c.medianResponseH} h</span></div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-ivory"><div className={cn("h-full rounded-full", slow ? "bg-coral" : "bg-green")} style={{ width: `${Math.max(4, pct)}%` }} /></div>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-xs text-muted">Median hours from alert to acknowledgement, last 30 days. Bar scale: 24 h.</p>
        </Card>
        <Card>
          <p className="text-eyebrow text-muted">Coverage gaps</p>
          <ul className="mt-3 space-y-2 text-sm">
            {staleSync.map((c) => (
              <li key={c.id} className="flex items-start gap-2 rounded-md bg-gold-100/70 p-3"><Clock className="mt-0.5 size-4 shrink-0 text-[#8a6a10]" /><span><strong className="text-emerald">{c.name}</strong> has not synced since {new Date(c.lastSync).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} — {c.caseload} mothers, {c.openAlerts} open alerts. Phone or network problem?</span></li>
            ))}
            {chws.filter((c) => c.status === "training").map((c) => (
              <li key={c.id} className="flex items-start gap-2 rounded-md bg-ivory p-3"><Users className="mt-0.5 size-4 shrink-0 text-muted" /><span><strong className="text-emerald">{c.name}</strong> ({c.cell}) is still in training — {c.cell} cell has no active CHW on MamaCare.</span></li>
            ))}
            {sectorMothers.filter((m) => m.ancDone === 0 && m.weeks > 12).map((m) => (
              <li key={m.id} className="flex items-start gap-2 rounded-md bg-ivory p-3"><AlertTriangle className="mt-0.5 size-4 shrink-0 text-muted" /><span><strong className="text-emerald">{m.name}</strong> is {m.weeks} weeks with no ANC visit yet ({m.chwName}).</span></li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
