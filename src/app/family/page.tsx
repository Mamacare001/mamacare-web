import Link from "next/link";
import { Phone, MessageCircle, CalendarDays, Clock, ShieldAlert, HeartHandshake, ArrowRight } from "lucide-react";
import { mothers } from "@/lib/mock/family";
import { Card, RiskPill, fmtDate, fmtTime } from "@/components/app/ui";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export const metadata = { title: "Home" };

export default async function FamilyHome({ searchParams }: { searchParams: Promise<{ welcome?: string }> }) {
  const { welcome } = await searchParams;
  const active = mothers.filter((m) => m.status === "active");
  const pending = mothers.filter((m) => m.status === "pending");
  const primary = active[0];

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      {welcome && (
        <Card className="border-l-4 border-green">
          <p className="font-display text-xl text-emerald">Welcome. You are now part of her circle.</p>
          <p className="mt-1 text-sm text-muted">You will see the guidance she receives and the emergency plan. Anything you notice, report it here — she stays in control of what you can see.</p>
        </Card>
      )}

      {/* Primary action */}
      <section className="relative overflow-hidden rounded-xl bg-emerald p-6 text-ivory md:p-8">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="relative">
          <p className="text-eyebrow text-gold">Supporting {active.length === 1 ? primary?.name.split(" ")[0] : `${active.length} women`}</p>
          <h1 className="text-h2 mt-2">You notice things she might not mention.</h1>
          <p className="mt-2 max-w-lg text-ivory/75">A headache, swelling, tiredness, less movement — if you see it, say it. It takes one minute and reaches her CHW.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/family/report" variant="coral" size="lg" arrow>I noticed something</Button>
            <Button href="/emergency" variant="light" size="lg"><Phone className="size-4" /> Emergency · 912</Button>
          </div>
        </div>
      </section>

      {/* Linked mothers */}
      <div className="grid gap-4 md:grid-cols-2">
        {active.map((m) => (
          <Link key={m.id} href={`/family/${m.id}`} className="group block rounded-lg bg-white p-5 ring-1 ring-emerald/5 transition-all hover:-translate-y-0.5 hover:shadow-float">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-full bg-coral-100 text-coral font-bold">{m.name.slice(0, 1)}</span>
                <div>
                  <p className="font-display text-xl text-emerald">{m.name}</p>
                  <p className="text-sm text-muted">{m.relation} · week {m.weeks} · due {fmtDate(m.edd, { day: "numeric", month: "short" })}</p>
                </div>
              </div>
              {m.canSeeRisk && m.risk ? <RiskPill risk={m.risk} /> : <span className="rounded-full bg-ivory px-2.5 py-1 text-xs text-muted">Risk: private</span>}
            </div>
            {m.lastGuidance && (
              <div className={cn("mt-4 rounded-md p-3 text-sm", m.risk === "high" ? "bg-coral-100/70" : m.risk === "moderate" ? "bg-gold-100/70" : "bg-green-100/70")}>
                <p className="text-eyebrow mb-1 text-muted">Latest guidance · {fmtDate(m.lastGuidance.at)} {fmtTime(m.lastGuidance.at)}</p>
                <p className="text-ink/90">{m.lastGuidance.text}</p>
              </div>
            )}
            <div className="mt-4 flex items-center justify-between text-sm">
              {m.nextVisit ? <span className="inline-flex items-center gap-1.5 text-muted"><CalendarDays className="size-4" /> Next visit {fmtDate(m.nextVisit.date)}</span> : <span />}
              <span className="inline-flex items-center gap-1 font-semibold text-green">Details <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
            </div>
          </Link>
        ))}
        {pending.map((m) => (
          <Card key={m.id} className="border-l-4 border-gold">
            <div className="flex items-center gap-3">
              <Clock className="size-5 text-[#8a6a10]" />
              <div>
                <p className="font-semibold text-emerald">{m.name} · {m.relation}</p>
                <p className="text-sm text-muted">Waiting for her to approve your request. She will see it in her MamaCare circle.</p>
              </div>
            </div>
          </Card>
        ))}
        <Card className="flex flex-col items-start justify-center gap-3 border-dashed">
          <HeartHandshake className="size-6 text-green" />
          <p className="font-semibold text-emerald">Support another woman</p>
          <p className="text-sm text-muted">Ask her for her MamaCare code and request to join her circle.</p>
          <Button href="/onboarding/family" variant="secondary" size="sm" arrow>Enter a code</Button>
        </Card>
      </div>

      {/* Recent updates */}
      {primary && primary.updates.length > 0 && (
        <section>
          <h2 className="text-h3 mb-3 text-emerald">Recent updates about {primary.name.split(" ")[0]}</h2>
          <ul className="divide-y divide-emerald/10 rounded-lg bg-white ring-1 ring-emerald/5">
            {primary.updates.map((u, i) => (
              <li key={i} className="flex items-start gap-3 p-4">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-ivory text-emerald">{u.by === "You" ? <MessageCircle className="size-4" /> : u.by.includes("CHW") ? <HeartHandshake className="size-4" /> : <ShieldAlert className="size-4" />}</span>
                <div className="flex-1">
                  <p className="text-[15px] text-ink/90">{u.text}</p>
                  <p className="mt-1 text-xs text-muted">{fmtDate(u.at)} {fmtTime(u.at)} · {u.by}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
