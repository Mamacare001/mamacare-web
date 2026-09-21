import Link from "next/link";
import { MessageCircle, CalendarDays, Users, ArrowRight, Baby, HeartPulse } from "lucide-react";
import { profile, weeksPregnant, timeline, visits, circle, guidanceByTrimester } from "@/lib/mock/mother";
import { Card, RiskPill, fmtDate } from "@/components/app/ui";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Home" };

export default function AppHome() {
  const weeks = weeksPregnant();
  const trimester = weeks < 13 ? 1 : weeks < 28 ? 2 : 3;
  const nextVisit = visits.find((v) => v.status === "upcoming");
  const pending = circle.filter((c) => c.status === "pending");
  const latest = timeline[0];
  const tips = guidanceByTrimester[trimester as 1 | 2 | 3];

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      {/* Status */}
      <section className="relative overflow-hidden rounded-xl bg-emerald p-6 text-ivory md:p-8">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-eyebrow text-gold">Muraho, {profile.name.split(" ")[0]}</p>
            <p className="text-h2 mt-2">
              Week {weeks} <span className="text-ivory/60">of 40</span>
            </p>
            <p className="mt-1 text-sm text-ivory/70">Due {fmtDate(profile.edd, { day: "numeric", month: "long" })} · trimester {trimester}</p>
          </div>
          <div className="flex items-center gap-3">
            <RiskPill risk={profile.risk} />
            <span className="text-sm text-ivory/70">next check-in {fmtDate(profile.nextCheckIn)}</span>
          </div>
        </div>
        <div className="relative mt-6 h-2 overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full bg-gold" style={{ width: `${(weeks / 40) * 100}%` }} />
        </div>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <Button href="/app/chat" variant="coral" arrow>
            I don’t feel well
          </Button>
          <Button href="/app/chat?quick=fine" variant="light">
            Quick check-in: I feel fine
          </Button>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Latest */}
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-eyebrow text-muted">Latest</p>
            <Link href="/app/timeline" className="text-sm font-semibold text-green">Timeline</Link>
          </div>
          <p className="mt-3 font-display text-xl text-emerald">{latest.title}</p>
          {latest.detail && <p className="mt-1 text-sm text-muted">{latest.detail}</p>}
          <p className="mt-3 text-xs text-muted">{fmtDate(latest.at)} · {latest.by}</p>
        </Card>

        {/* Next visit */}
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-eyebrow text-muted">Next ANC visit</p>
            <Link href="/app/visits" className="text-sm font-semibold text-green">All visits</Link>
          </div>
          {nextVisit ? (
            <div className="mt-3 flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-md bg-gold-100 text-center leading-tight text-midnight">
                <span className="text-xs font-bold uppercase">{fmtDate(nextVisit.date, { month: "short" })}</span>
                <span className="font-display text-2xl">{new Date(nextVisit.date).getDate()}</span>
              </span>
              <div>
                <p className="font-display text-xl text-emerald">Visit {nextVisit.n} · {nextVisit.facility}</p>
                <p className="text-sm text-muted">{nextVisit.note}</p>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-muted">No visit scheduled.</p>
          )}
        </Card>
      </div>

      {/* Pending link */}
      {pending.length > 0 && (
        <Card className="border-l-4 border-gold">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Users className="size-5 text-[#8a6a10]" />
              <p className="text-[15px] text-ink"><strong>{pending[0].name}</strong> ({pending[0].relation}) wants to join your circle.</p>
            </div>
            <Button href="/app/circle" variant="secondary" size="sm" arrow>Review</Button>
          </div>
        </Card>
      )}

      {/* Guidance for this week */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-h3 text-emerald">For week {weeks}</h2>
          <Link href="/app/guidance" className="inline-flex items-center gap-1 text-sm font-semibold text-green">All guidance <ArrowRight className="size-4" /></Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {tips.map((g, i) => (
            <Card key={g.t}>
              <span className="grid size-9 place-items-center rounded-full bg-green-100 text-green">{i === 0 ? <Baby className="size-4" /> : i === 1 ? <HeartPulse className="size-4" /> : <CalendarDays className="size-4" />}</span>
              <p className="mt-3 font-semibold text-emerald">{g.t}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{g.d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Your CHW */}
      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full bg-green text-ivory font-bold">{profile.chw.name.slice(0, 1)}</span>
          <div>
            <p className="font-semibold text-emerald">{profile.chw.name}</p>
            <p className="text-sm text-muted">Your CHW · {profile.chw.village}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button href={`tel:${profile.chw.phone.replace(/\s/g, "")}`} variant="secondary" size="sm">Call</Button>
          <Button href="/app/chat" variant="primary" size="sm"><MessageCircle className="size-4" /> Message</Button>
        </div>
      </Card>
    </div>
  );
}
