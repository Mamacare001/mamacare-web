import Link from "next/link";
import { ShieldCheck, Phone, ChevronRight, AlertTriangle } from "lucide-react";
import { careMembers, careStats, scope, pct } from "@/lib/mock/partner";
import { PageTitle, Card, RiskPill, fmtDate } from "@/components/app/ui";
import { Stat } from "@/components/partner/Charts";
import { cn } from "@/lib/cn";

export const metadata = { title: "Members" };

export default function CarePage() {
  const order = { high: 0, moderate: 1, low: 2 } as const;
  const list = [...careMembers].sort((a, b) => order[a.risk] - order[b.risk]);
  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageTitle eyebrow={`${scope.partner} · maternal care management`} title="Members who asked for follow-up" />
      <Card className="flex items-start gap-3 border-l-4 border-green">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-green" />
        <p className="text-sm text-ink/85"><strong>Consent-gated.</strong> Only members who opted in to insurer care management appear here, and each can withdraw at any time. You see risk level, ANC status and contact history — never her conversation. Every view is logged and visible to her. This view is separate from pricing and claims and may not be used for them.</p>
      </Card>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat n={careStats.optedIn} label="Opted-in members" sub={`${pct(careStats.optedIn, careStats.eligible)}% of eligible pregnant members`} />
        <Stat n={careStats.highRisk} label="Currently high risk" sub="need a call this week" tone="text-coral" />
        <Stat n={careStats.contactedThisWeek} label="Contacted this week" sub="by the care team" />
        <Stat n={careStats.avoidedEmergencies} label="Emergencies averted (est.)" sub="high-risk flags reaching care ≤ 2 h" tone="text-green" />
      </div>
      <section>
        <h2 className="text-h3 mb-2 text-emerald">Follow-up list · sorted by risk</h2>
        <ul className="space-y-2">
          {list.map((m) => (
            <li key={m.id}>
              <Link href={`/care/${m.id}`} className={cn("flex items-center gap-3 rounded-lg bg-white p-4 ring-1 ring-emerald/5 transition-colors hover:bg-ivory", m.risk === "high" && "ring-2 ring-coral/40")}>
                <span className={cn("grid size-11 shrink-0 place-items-center rounded-full text-sm font-bold", m.risk === "high" ? "bg-coral text-white" : m.risk === "moderate" ? "bg-gold text-midnight" : "bg-green-100 text-green")}>{m.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2"><p className="font-semibold text-emerald">{m.name}</p><span className="font-mono text-xs text-muted">{m.memberNo}</span>{m.openEscalation && <AlertTriangle className="size-4 text-coral" />}</div>
                  <p className="text-xs text-muted">{m.weeks} wk · ANC {m.ancDone} · {m.facility} · CHW {m.chwName.split(" ")[0]} · last contact {fmtDate(m.lastContact)}</p>
                  {m.nextAction && <p className="mt-0.5 text-sm text-ink/85">→ {m.nextAction}</p>}
                </div>
                <RiskPill risk={m.risk} className="hidden sm:inline-block" />
                <ChevronRight className="size-5 shrink-0 text-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <p className="flex items-center gap-2 text-xs text-muted"><Phone className="size-3.5" /> Calls are made from the care team’s line; MamaCare logs the contact, not the call content.</p>
    </div>
  );
}
