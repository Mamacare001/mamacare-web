import { notFound } from "next/navigation";
import { Phone, CalendarDays, Car, MapPin, Backpack, Lock, MessageCircle } from "lucide-react";
import { mothers } from "@/lib/mock/family";
import { PageTitle, Card, RiskPill, fmtDate, fmtTime } from "@/components/app/ui";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export const metadata = { title: "Details" };

export default async function MotherDetailPage({ params }: { params: Promise<{ motherId: string }> }) {
  const { motherId } = await params;
  const m = mothers.find((x) => x.id === motherId && x.status === "active");
  if (!m) notFound();
  const tel = (p: string) => `tel:${p.replace(/\s/g, "")}`;

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <PageTitle
        eyebrow={`${m.relation} · week ${m.weeks} · due ${fmtDate(m.edd, { day: "numeric", month: "long" })}`}
        title={m.name}
        action={<Button href={`/family/report?about=${m.id}`} variant="coral" arrow>I noticed something</Button>}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <div className="flex items-center justify-between">
            <p className="text-eyebrow text-muted">What she has shared with you</p>
            {m.canSeeRisk && m.risk ? <RiskPill risk={m.risk} /> : <span className="inline-flex items-center gap-1 rounded-full bg-ivory px-2.5 py-1 text-xs text-muted"><Lock className="size-3" /> Risk level private</span>}
          </div>
          {m.lastGuidance ? (
            <div className={cn("mt-3 rounded-md p-4", m.risk === "high" ? "bg-coral-100/70" : m.risk === "moderate" ? "bg-gold-100/70" : "bg-green-100/70")}>
              <p className="text-eyebrow mb-1 text-muted">Latest guidance · {fmtDate(m.lastGuidance.at)} {fmtTime(m.lastGuidance.at)}</p>
              <p className="text-[15px] leading-relaxed text-ink/90">{m.lastGuidance.text}</p>
            </div>
          ) : <p className="mt-3 text-muted">No guidance yet.</p>}
          <p className="mt-3 text-xs text-muted">You see the guidance sent to her and the emergency plan — not her conversations. She can change this in her circle settings.</p>
        </Card>
        <Card>
          <p className="text-eyebrow text-muted">Next ANC visit</p>
          {m.nextVisit ? (
            <>
              <p className="mt-2 flex items-center gap-2 font-display text-xl text-emerald"><CalendarDays className="size-5 text-green" /> {fmtDate(m.nextVisit.date, { weekday: "short", day: "numeric", month: "long" })}</p>
              <p className="mt-1 text-sm text-muted">{m.nextVisit.note}</p>
              <p className="mt-3 text-xs text-muted">Can you help her get there?</p>
            </>
          ) : <p className="mt-2 text-muted">None scheduled.</p>}
        </Card>
      </div>

      <section>
        <h2 className="text-h3 mb-3 text-emerald">Emergency plan</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: Car, t: "Transport", d: m.emergencyPlan.transport },
            { icon: MapPin, t: "Go to", d: m.emergencyPlan.goTo },
            { icon: Backpack, t: "Bring", d: m.emergencyPlan.bring },
          ].map((x) => (
            <Card key={x.t}>
              <span className="grid size-9 place-items-center rounded-full bg-coral-100 text-coral"><x.icon className="size-4" /></span>
              <p className="mt-3 font-semibold text-emerald">{x.t}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/85">{x.d}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-h3 mb-3 text-emerald">Who to call</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Card className="flex items-center justify-between gap-3"><div><p className="font-semibold text-emerald">Emergency</p><p className="text-sm text-muted">Ambulance · 24 h</p></div><Button href="tel:912" variant="coral" size="sm"><Phone className="size-4" /> 912</Button></Card>
          <Card className="flex items-center justify-between gap-3"><div><p className="font-semibold text-emerald">{m.chw.name}</p><p className="text-sm text-muted">Her CHW</p></div><Button href={tel(m.chw.phone)} variant="secondary" size="sm"><Phone className="size-4" /> Call</Button></Card>
          <Card className="flex items-center justify-between gap-3"><div><p className="font-semibold text-emerald">{m.facility.name}</p><p className="text-sm text-muted">Health centre</p></div><Button href={tel(m.facility.phone)} variant="secondary" size="sm"><Phone className="size-4" /> Call</Button></Card>
        </div>
      </section>

      <section>
        <h2 className="text-h3 mb-3 text-emerald">Updates</h2>
        <ul className="divide-y divide-emerald/10 rounded-lg bg-white ring-1 ring-emerald/5">
          {m.updates.map((u, i) => (
            <li key={i} className="flex items-start gap-3 p-4">
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-ivory text-emerald"><MessageCircle className="size-4" /></span>
              <div><p className="text-[15px] text-ink/90">{u.text}</p><p className="mt-1 text-xs text-muted">{fmtDate(u.at)} {fmtTime(u.at)} · {u.by}</p></div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
