import Link from "next/link";
import { notFound } from "next/navigation";
import { Stethoscope, ArrowUpRight, Baby, Phone, MessageSquareText, Activity, Home as HomeIcon, Lock } from "lucide-react";
import { clinicMothers } from "@/lib/mock/clinic";
import { PageTitle, Card, RiskPill, fmtDate, fmtTime } from "@/components/app/ui";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Record" };

export default async function ClinicMotherPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = clinicMothers.find((x) => x.id === id);
  if (!m) notFound();
  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <Link href="/clinic/queue" className="text-sm font-semibold text-green">← Queue</Link>
      <PageTitle eyebrow={`${m.age} y · G${m.gravida}P${m.para} · ${m.weeks} wk · EDD ${fmtDate(m.edd, { day: "numeric", month: "short", year: "numeric" })} · ${m.village}`} title={m.name} action={<RiskPill risk={m.risk} className="text-sm" />} />

      <div className="flex flex-wrap gap-2">
        <Button href={`/clinic/mother/${m.id}/encounter`} variant="coral"><Stethoscope className="size-4" /> New encounter</Button>
        <Button href={`/clinic/mother/${m.id}/refer`} variant="primary"><ArrowUpRight className="size-4" /> Refer up</Button>
        <Button href={`/clinic/mother/${m.id}/outcome`} variant="secondary"><Baby className="size-4" /> Record outcome</Button>
        <Button href={`tel:${m.chwPhone.replace(/\s/g, "")}`} variant="ghost"><Phone className="size-4" /> {m.chwName} (CHW)</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {m.conversationSummary && (
            <Card className="border-l-4 border-violet">
              <p className="flex items-center gap-2 text-eyebrow text-violet"><MessageSquareText className="size-3.5" /> What she told MamaCare · structured summary</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/90">{m.conversationSummary}</p>
              <p className="mt-2 flex items-center gap-1 text-xs text-muted"><Lock className="size-3" /> The full conversation is visible only to her and, on case review, the clinical lead.</p>
            </Card>
          )}
          <Card>
            <p className="flex items-center gap-2 text-eyebrow text-muted"><HomeIcon className="size-3.5" /> CHW visits</p>
            {m.chwVisits.length === 0 ? <p className="mt-2 text-sm text-muted">None recorded.</p> : (
              <ul className="mt-2 divide-y divide-emerald/10">
                {m.chwVisits.map((v, i) => (
                  <li key={i} className="py-3">
                    <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-semibold text-emerald">{fmtDate(v.at)} {fmtTime(v.at)}{v.bp && <span className="ml-2 font-mono text-sm">BP {v.bp}</span>}</p></div>
                    {v.signs.length > 0 && <div className="mt-1 flex flex-wrap gap-1.5">{v.signs.map((s) => <span key={s} className="rounded-full bg-coral-100 px-2 py-0.5 text-xs font-semibold text-coral">{s}</span>)}</div>}
                    {v.note && <p className="mt-1 text-sm text-ink/80">{v.note}</p>}
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <Card>
            <p className="flex items-center gap-2 text-eyebrow text-muted"><Activity className="size-3.5" /> Encounters at this facility</p>
            {m.encounters.length === 0 ? <p className="mt-2 text-sm text-muted">No encounters yet.</p> : (
              <div className="mt-2 overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm">
                  <thead className="text-left text-xs text-muted"><tr>{["Date", "BP", "Urine", "Hb", "FH", "FHR", "Impression", "Plan", "By"].map((h) => <th key={h} className="py-2 pr-3 font-bold">{h}</th>)}</tr></thead>
                  <tbody className="divide-y divide-emerald/10">
                    {m.encounters.map((e, i) => (
                      <tr key={i}><td className="py-2 pr-3 whitespace-nowrap">{fmtDate(e.at)}</td><td className="py-2 pr-3 font-mono">{e.bp ?? "—"}</td><td className="py-2 pr-3">{e.urine ?? "—"}</td><td className="py-2 pr-3 font-mono">{e.hb ?? "—"}</td><td className="py-2 pr-3 font-mono">{e.fh ?? "—"}</td><td className="py-2 pr-3 font-mono">{e.fhr ?? "—"}</td><td className="py-2 pr-3">{e.impression}</td><td className="py-2 pr-3">{e.plan}</td><td className="py-2 pr-3 whitespace-nowrap text-muted">{e.by}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <p className="text-eyebrow text-muted">Key facts</p>
            <dl className="mt-2 space-y-1.5 text-sm">
              {[["Blood group", m.bloodGroup], ["HIV", m.hiv], ["Allergies", m.allergies], ["Phone", m.phone], ["CHW", m.chwName]].map(([k, v]) => v && <div key={k} className="flex justify-between gap-3"><dt className="text-muted">{k}</dt><dd className="text-right font-semibold text-emerald">{v}</dd></div>)}
            </dl>
          </Card>
          <Card>
            <p className="text-eyebrow text-muted">History</p>
            {m.history.length === 0 ? <p className="mt-2 text-sm text-muted">Nothing recorded.</p> : <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/85">{m.history.map((h) => <li key={h}>{h}</li>)}</ul>}
          </Card>
          <p className="text-xs text-muted">Your access to this record is logged. She can see that you viewed it.</p>
        </div>
      </div>
    </div>
  );
}
