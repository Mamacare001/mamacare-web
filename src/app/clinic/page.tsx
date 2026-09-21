import Link from "next/link";
import { BellRing, Send, CalendarDays, ArrowUpRight, ArrowRight, ClipboardList, UserPlus } from "lucide-react";
import { facility, queue, pendingFeedback, reports } from "@/lib/mock/clinic";
import { Card } from "@/components/app/ui";
import { Button } from "@/components/ui/Button";
import { QueueList } from "@/components/clinic/QueueList";
import { cn } from "@/lib/cn";

export const metadata = { title: "Today" };

export default async function ClinicToday({ searchParams }: { searchParams: Promise<{ welcome?: string }> }) {
  const { welcome } = await searchParams;
  const waiting = queue.filter((q) => q.status !== "seen");
  const highWaiting = waiting.filter((q) => q.risk === "high").length;
  const overdueFb = pendingFeedback.filter((f) => f.daysWaiting >= 2).length;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {welcome && <Card className="border-l-4 border-gold"><p className="font-display text-xl text-emerald">Welcome. Your account is pending approval by {facility.inCharge}.</p><p className="mt-1 text-sm text-muted">Explore with demo data until then.</p></Card>}
      <div>
        <p className="text-eyebrow text-green">{facility.name} · {facility.level} · {facility.district} · Mon 21 Sept</p>
        <h1 className="text-h2 mt-1 text-emerald">Today</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { icon: BellRing, n: waiting.length, l: "In the queue", sub: `${highWaiting} high risk`, tone: highWaiting ? "bg-coral-100 text-coral" : "bg-green-100 text-green", href: "/clinic/queue" },
          { icon: Send, n: pendingFeedback.length, l: "Loops to close", sub: `${overdueFb} waiting 2+ days`, tone: overdueFb ? "bg-gold-100 text-[#8a6a10]" : "bg-green-100 text-green", href: "/clinic/close-loop" },
          { icon: CalendarDays, n: 14, l: "ANC visits today", sub: "9 seen · 5 to come", tone: "bg-violet-100 text-violet", href: "/clinic/queue?filter=anc" },
          { icon: ArrowUpRight, n: reports.referredUp, l: "Referred up this month", sub: `to ${facility.referral}`, tone: "bg-ivory-200 text-muted", href: "/clinic/reports" },
        ].map((s) => (
          <Link key={s.l} href={s.href} className="rounded-lg bg-white p-4 ring-1 ring-emerald/5 transition-colors hover:bg-ivory">
            <span className={cn("grid size-9 place-items-center rounded-full", s.tone)}><s.icon className="size-4" /></span>
            <p className="mt-3 font-display text-3xl text-emerald">{s.n}</p>
            <p className="text-sm font-semibold text-emerald">{s.l}</p>
            <p className="text-xs text-muted">{s.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Card className="flex items-center justify-between gap-3">
          <div><p className="font-semibold text-emerald">Routine ANC visit?</p><p className="text-sm text-muted">Report it — she and her CHW get the next reminder.</p></div>
          <Button href="/clinic/visit" variant="primary" size="sm"><ClipboardList className="size-4" /> Report visit</Button>
        </Card>
        <Card className="flex items-center justify-between gap-3">
          <div><p className="font-semibold text-emerald">Booking ANC, not on MamaCare yet?</p><p className="text-sm text-muted">Enrol her and assign a CHW.</p></div>
          <Button href="/clinic/enrol" variant="secondary" size="sm"><UserPlus className="size-4" /> Enrol</Button>
        </Card>
      </div>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-h3 text-emerald">Incoming — by risk</h2>
          <Link href="/clinic/queue" className="inline-flex items-center gap-1 text-sm font-semibold text-green">Full queue <ArrowRight className="size-4" /></Link>
        </div>
        <QueueList items={queue} compact />
      </section>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-h3 text-emerald">Close the loop</h2>
          <Link href="/clinic/close-loop" className="inline-flex items-center gap-1 text-sm font-semibold text-green">All pending <ArrowRight className="size-4" /></Link>
        </div>
        <p className="mb-3 text-sm text-muted">Referrals where the CHW is still waiting to hear what happened. One line from you closes the escalation on their side.</p>
        <ul className="grid gap-3 md:grid-cols-3">
          {pendingFeedback.map((f) => (
            <li key={f.id} className={cn("rounded-lg bg-white p-4 ring-1 ring-emerald/5", f.daysWaiting >= 2 && "ring-2 ring-gold/60")}>
              <p className="font-semibold text-emerald">{f.motherName}</p>
              <p className="text-xs text-muted">{f.reason} · from {f.chwName.split(" ")[0]} · {f.daysWaiting === 0 ? "today" : `${f.daysWaiting} d waiting`}</p>
              <Link href={`/clinic/close-loop#${f.id}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-green">Respond <ArrowRight className="size-4" /></Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
