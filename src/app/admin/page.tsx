import Link from "next/link";
import { Activity, AlertTriangle, Users, KeyRound, Scale, ShieldCheck } from "lucide-react";
import { requireAdminMfa } from "@/lib/admin-guard";
import { system, users, breakGlass, rules, caseReviews, consentStats } from "@/lib/mock/admin";
import { Head, Panel, Badge, dt } from "@/components/admin/ui";
import { cn } from "@/lib/cn";

export const metadata = { title: "Overview" };

export default async function AdminOverview() {
  await requireAdminMfa("/admin");
  const pendingUsers = users.filter((u) => u.status === "pending").length;
  const expiring = users.filter((u) => u.status === "active" && new Date(u.expires) < new Date("2026-10-21")).length;
  const bgUnreviewed = breakGlass.filter((b) => !b.reviewed).length;
  const openCases = caseReviews.filter((c) => c.status !== "closed").length;
  const cards = [
    { icon: Activity, n: `${system.uptime30d}%`, l: "Uptime 30 d", sub: `API p95 ${system.apiP95ms} ms · ${system.activeSessions} sessions`, tone: "text-green", href: "/admin/integrations" },
    { icon: AlertTriangle, n: system.escalationSlaBreaches24h, l: "Escalation SLA breaches 24 h", sub: `SMS ${system.smsDelivery24h}% · WhatsApp ${system.waDelivery24h}% delivered`, tone: system.escalationSlaBreaches24h ? "text-coral" : "text-green", href: "/admin/integrations" },
    { icon: Users, n: pendingUsers, l: "Approvals waiting", sub: `${expiring} grants expire within 30 d`, tone: pendingUsers ? "text-[#8a6a10]" : "text-green", href: "/admin/users" },
    { icon: KeyRound, n: bgUnreviewed, l: "Break-glass to review", sub: "must be reviewed within 48 h", tone: bgUnreviewed ? "text-coral" : "text-green", href: "/admin/break-glass" },
    { icon: Scale, n: rules.staging.version, l: "Rules in staging", sub: rules.staging.review, tone: "text-violet", href: "/admin/rules" },
    { icon: ShieldCheck, n: openCases, l: "Open case reviews", sub: `${consentStats.sarOpen} subject-access request open`, tone: "text-[#8a6a10]", href: "/admin/case-review" },
  ];
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Head eyebrow={`${system.env} · ${system.version}`} title="Operations overview" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.l} href={c.href} className="rounded-lg bg-white p-4 ring-1 ring-emerald/5 transition-colors hover:bg-ivory">
            <c.icon className="size-4 text-muted" />
            <p className={cn("mt-2 font-display text-3xl", c.tone)}>{c.n}</p>
            <p className="text-sm font-semibold text-emerald">{c.l}</p>
            <p className="text-xs text-muted">{c.sub}</p>
          </Link>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Separation of duties — who can do what today">
          <ul className="space-y-2 text-sm">
            {[["Change clinical rules", "rules-editor drafts → clinical-lead approves → release-manager deploys"], ["Promote a risk model", "ds-lead validation + clinical-lead safety sign-off → release-manager"], ["Grant a privileged role", "two different approvers (iam-admin + org in-charge)"], ["Read an identified record", "care roles with consent; staff only via break-glass, alerted and reviewed"], ["Read audit logs", "audit-reviewer & security-lead (read-only, append-only store)"]].map(([a, b]) => (
              <li key={a} className="flex gap-3 rounded-md bg-ivory p-3"><span className="w-44 shrink-0 font-semibold text-emerald">{a}</span><span className="text-ink/80">{b}</span></li>
            ))}
          </ul>
        </Panel>
        <Panel title="Incidents">
          {system.incidents.map((i) => (
            <div key={i.id} className="flex items-start justify-between gap-3 rounded-md bg-ivory p-3 text-sm">
              <div><p className="font-semibold text-emerald">{i.id} · {i.sev} · {i.title}</p><p className="text-xs text-muted">{dt(i.at)}</p></div>
              <Badge tone="green">{i.status}</Badge>
            </div>
          ))}
          <p className="mt-3 text-xs text-muted">Postmortem for INC-014 due 26 Sept. Break-glass BG-007 was used during this incident and is awaiting review.</p>
        </Panel>
      </div>
    </div>
  );
}
