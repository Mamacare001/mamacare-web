import Link from "next/link";
import { BellRing, CalendarCheck, Users, UserPlus, ArrowRight, Phone } from "lucide-react";
import { chw, caseload, escalations } from "@/lib/mock/chw";
import { Card } from "@/components/app/ui";
import { MotherRow } from "@/components/chw/MotherRow";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Today" };

export default async function ChwToday({ searchParams }: { searchParams: Promise<{ welcome?: string }> }) {
  const { welcome } = await searchParams;
  const today = "2026-09-21";
  const open = escalations.filter((e) => e.status === "open" || e.status === "acknowledged");
  const due = caseload.filter((m) => m.nextVisitDue <= today).sort((a, b) => (a.risk === "high" ? -1 : b.risk === "high" ? 1 : 0));
  const high = caseload.filter((m) => m.risk === "high").length;

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      {welcome && (
        <Card className="border-l-4 border-gold">
          <p className="font-display text-xl text-emerald">Muraho, {chw.name.split(" ")[0]}. Your account is pending approval by {chw.facility.name}.</p>
          <p className="mt-1 text-sm text-muted">You can explore with demo data now. Your real caseload appears once your in-charge approves you.</p>
        </Card>
      )}
      <div>
        <p className="text-eyebrow text-green">{chw.village} · {chw.cell} cell · Mon 21 Sept</p>
        <h1 className="text-h2 mt-1 text-emerald">Today</h1>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: BellRing, n: open.length, l: "Open alerts", href: "/chw/escalations", tone: open.some((e) => e.risk === "high") ? "text-coral bg-coral-100" : "text-[#8a6a10] bg-gold-100" },
          { icon: CalendarCheck, n: due.length, l: "Visits due", href: "/chw/caseload?filter=due", tone: "text-green bg-green-100" },
          { icon: Users, n: caseload.length, l: `Mothers · ${high} high`, href: "/chw/caseload", tone: "text-violet bg-violet-100" },
        ].map((s) => (
          <Link key={s.l} href={s.href} className="rounded-lg bg-white p-4 ring-1 ring-emerald/5 transition-colors hover:bg-ivory">
            <span className={`grid size-9 place-items-center rounded-full ${s.tone}`}><s.icon className="size-4" /></span>
            <p className="mt-3 font-display text-3xl text-emerald">{s.n}</p>
            <p className="text-xs text-muted">{s.l}</p>
          </Link>
        ))}
      </div>

      {open.length > 0 && (
        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-h3 text-emerald">Act on these first</h2>
            <Link href="/chw/escalations" className="inline-flex items-center gap-1 text-sm font-semibold text-green">All alerts <ArrowRight className="size-4" /></Link>
          </div>
          <ul className="space-y-2">
            {open.map((e) => (
              <li key={e.id}>
                <Link href={`/chw/escalations#${e.id}`} className={`block rounded-lg border-l-4 bg-white p-4 ring-1 ring-emerald/5 ${e.risk === "high" ? "border-coral" : "border-gold"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-emerald">{e.motherName}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${e.status === "open" ? "bg-coral text-white" : "bg-gold text-midnight"}`}>{e.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink/85">{e.reason}</p>
                  <p className="mt-1 text-xs font-semibold text-emerald">→ {e.recommended}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-h3 text-emerald">Visits due today</h2>
          <span className="text-sm text-muted">{due.length} mothers</span>
        </div>
        <ul className="space-y-2">{due.map((m) => <li key={m.id}><MotherRow m={m} showDue /></li>)}</ul>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <Card className="flex items-center justify-between gap-3">
          <div><p className="font-semibold text-emerald">New mother in the village?</p><p className="text-sm text-muted">Enrol her in two minutes.</p></div>
          <Button href="/chw/enrol" variant="primary" size="sm"><UserPlus className="size-4" /> Enrol</Button>
        </Card>
        <Card className="flex items-center justify-between gap-3">
          <div><p className="font-semibold text-emerald">{chw.facility.name}</p><p className="text-sm text-muted">Supervisor: {chw.supervisor.name}</p></div>
          <Button href={`tel:${chw.facility.phone.replace(/\s/g, "")}`} variant="secondary" size="sm"><Phone className="size-4" /> Call</Button>
        </Card>
      </div>
    </div>
  );
}
