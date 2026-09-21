import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, ClipboardPlus, Send, MessageCircle, AlertTriangle, Activity, Home as HomeIcon, Users } from "lucide-react";
import { caseload, escalations } from "@/lib/mock/chw";
import { timeline } from "@/lib/mock/mother";
import { PageTitle, Card, RiskPill, fmtDate, fmtTime } from "@/components/app/ui";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Mother" };

export default async function ChwMotherPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = caseload.find((x) => x.id === id);
  if (!m) notFound();
  const esc = escalations.filter((e) => e.motherId === m.id);
  const events = m.id === "m_01" ? timeline : timeline.slice(3);

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <Link href="/chw/caseload" className="text-sm font-semibold text-green">← Caseload</Link>
      <PageTitle
        eyebrow={`${m.age} y · G${m.gravida} · ${m.village} · week ${m.weeks} · due ${fmtDate(m.edd, { day: "numeric", month: "short" })}`}
        title={m.name}
        action={<RiskPill risk={m.risk} className="text-sm" />}
      />

      {m.riskReason && (
        <Card className={`border-l-4 ${m.risk === "high" ? "border-coral" : m.risk === "moderate" ? "border-gold" : "border-green"}`}>
          <p className="flex items-center gap-2 text-eyebrow text-muted"><AlertTriangle className="size-3.5" /> Why this risk level</p>
          <p className="mt-1 text-[15px] text-ink/90">{m.riskReason}</p>
          {m.flags.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{m.flags.map((f) => <span key={f} className="rounded-full bg-ivory px-2.5 py-1 text-xs text-ink/80">{f}</span>)}</div>}
        </Card>
      )}

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Button href={`/chw/mother/${m.id}/visit`} variant="coral" className="w-full"><ClipboardPlus className="size-4" /> Record visit</Button>
        <Button href={`/chw/refer?mother=${m.id}`} variant="primary" className="w-full"><Send className="size-4" /> Refer</Button>
        <Button href={`tel:${m.phone.replace(/\s/g, "")}`} variant="secondary" className="w-full"><Phone className="size-4" /> Call</Button>
        <Button href={`sms:${m.phone.replace(/\s/g, "")}`} variant="secondary" className="w-full"><MessageCircle className="size-4" /> SMS</Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card><p className="text-eyebrow text-muted">ANC visits</p><p className="mt-1 font-display text-3xl text-emerald">{m.ancDone}<span className="text-base text-muted"> / 4+</span></p></Card>
        <Card><p className="text-eyebrow text-muted">Last contact</p><p className="mt-1 font-display text-xl text-emerald">{fmtDate(m.lastContact)}</p><p className="text-xs text-muted">{fmtTime(m.lastContact)}</p></Card>
        <Card><p className="text-eyebrow text-muted">Next visit due</p><p className="mt-1 font-display text-xl text-emerald">{fmtDate(m.nextVisitDue)}</p></Card>
      </div>

      {esc.length > 0 && (
        <section>
          <h2 className="text-h3 mb-2 text-emerald">Escalations</h2>
          <ul className="space-y-2">
            {esc.map((e) => (
              <li key={e.id} className="rounded-lg bg-white p-4 ring-1 ring-emerald/5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2"><RiskPill risk={e.risk} /><span className="text-xs text-muted">{fmtDate(e.at)} {fmtTime(e.at)} · from {e.source}</span></div>
                  <span className="rounded-full bg-ivory px-2 py-0.5 text-[10px] font-bold uppercase text-emerald">{e.status}</span>
                </div>
                <p className="mt-2 text-sm text-ink/90">{e.reason}</p>
                <p className="mt-1 text-sm font-semibold text-emerald">→ {e.recommended}</p>
                {e.facilityResponse && (
                  <div className="mt-3 rounded-md bg-green-100/70 p-3 text-sm">
                    <p className="text-eyebrow text-green">Clinic response · {fmtDate(e.facilityResponse.at)}</p>
                    <p className="mt-1 text-ink/90">{e.facilityResponse.text}</p>
                    <p className="mt-1 text-xs text-muted">{e.facilityResponse.by}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-h3 mb-2 text-emerald">Timeline</h2>
        <ul className="divide-y divide-emerald/10 rounded-lg bg-white ring-1 ring-emerald/5">
          {events.map((e) => (
            <li key={e.id} className="flex items-start gap-3 p-4">
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-ivory text-emerald">{e.kind === "visit" ? <HomeIcon className="size-4" /> : e.kind === "measurement" ? <Activity className="size-4" /> : e.kind === "family" ? <Users className="size-4" /> : <MessageCircle className="size-4" />}</span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-semibold text-emerald">{e.title}</p>{e.risk && <RiskPill risk={e.risk} />}</div>
                {e.detail && <p className="mt-0.5 text-sm text-ink/80">{e.detail}</p>}
                <p className="mt-1 text-xs text-muted">{fmtDate(e.at)} {fmtTime(e.at)} · {e.by}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
