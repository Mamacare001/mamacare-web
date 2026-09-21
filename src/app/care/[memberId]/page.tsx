import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock, Phone, Car, Building2 } from "lucide-react";
import { careMembers } from "@/lib/mock/partner";
import { PageTitle, Card, RiskPill, fmtDate, fmtTime } from "@/components/app/ui";
import { ContactLogForm } from "@/components/partner/ContactLogForm";

export const metadata = { title: "Member" };

export default async function CareMemberPage({ params }: { params: Promise<{ memberId: string }> }) {
  const { memberId } = await params;
  const m = careMembers.find((x) => x.id === memberId);
  if (!m) notFound();
  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <Link href="/care" className="text-sm font-semibold text-green">← Members</Link>
      <PageTitle eyebrow={`${m.memberNo} · consented ${fmtDate(m.consentAt, { day: "numeric", month: "short", year: "numeric" })} · ${m.district}`} title={m.name} action={<RiskPill risk={m.risk} className="text-sm" />} />
      {m.openEscalation && <Card className="border-l-4 border-coral"><p className="text-eyebrow text-coral">Open escalation</p><p className="mt-1 text-[15px] text-ink/90">{m.openEscalation}</p></Card>}
      <div className="grid gap-3 sm:grid-cols-3">
        <Card><p className="text-eyebrow text-muted">Pregnancy</p><p className="mt-1 font-display text-2xl text-emerald">Week {m.weeks}</p><p className="text-xs text-muted">age {m.age} · ANC visits {m.ancDone}</p></Card>
        <Card><p className="text-eyebrow text-muted">Facility</p><p className="mt-1 flex items-center gap-2 font-semibold text-emerald"><Building2 className="size-4 text-green" /> {m.facility}</p><p className="text-xs text-muted">CHW {m.chwName}</p></Card>
        <Card><p className="text-eyebrow text-muted">Last contact</p><p className="mt-1 font-display text-2xl text-emerald">{fmtDate(m.lastContact)}</p><p className="text-xs text-muted">{fmtTime(m.lastContact)}</p></Card>
      </div>
      {m.nextAction && <Card className="bg-gold-100/60"><p className="text-eyebrow text-[#8a6a10]">Suggested next action</p><p className="mt-1 text-[15px] text-ink/90">{m.nextAction}</p><div className="mt-3 flex flex-wrap gap-2"><span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald ring-1 ring-emerald/15"><Phone className="size-3.5" /> Call member</span><span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald ring-1 ring-emerald/15"><Car className="size-3.5" /> Arrange transport (covered)</span></div></Card>}
      <Card>
        <p className="text-eyebrow text-muted">Contact log</p>
        {m.contactLog.length === 0 ? <p className="mt-2 text-sm text-muted">No contacts yet.</p> : (
          <ul className="mt-2 divide-y divide-emerald/10">{m.contactLog.map((c, i) => <li key={i} className="py-3"><p className="text-[15px] text-ink/90">{c.note}</p><p className="mt-1 text-xs text-muted">{fmtDate(c.at)} {fmtTime(c.at)} · {c.by}</p></li>)}</ul>
        )}
        <div className="mt-4 border-t border-emerald/10 pt-4"><ContactLogForm id={m.id} /></div>
      </Card>
      <p className="flex items-center gap-2 text-xs text-muted"><Lock className="size-3.5" /> You do not see her conversation with MamaCare or her clinical notes. This view is logged and she can see it in her access log.</p>
    </div>
  );
}
