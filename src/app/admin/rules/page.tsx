import { requireAdminMfa } from "@/lib/admin-guard";
import { rules } from "@/lib/mock/admin";
import { submitRulesForReview, approveRules, deployRules } from "@/app/admin/actions";
import { Head, Panel, Badge, dt } from "@/components/admin/ui";
import { ActionButton } from "@/components/admin/Buttons";

export const metadata = { title: "Clinical rules" };

export default async function RulesPage() {
  await requireAdminMfa("/admin/rules");
  const s = rules.staging;
  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <Head eyebrow="Rules-first · every recommendation cites its rule version" title="Clinical rules" note="Three people, three steps: a rules-editor drafts in staging, the clinical lead approves, the release manager deploys. No one can do more than one step on the same change. Every escalation records which version produced it." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Live in production">
          <p className="font-display text-3xl text-emerald">{rules.live.version} <span className="font-mono text-sm text-muted">{rules.live.sha}</span></p>
          <dl className="mt-3 space-y-1 text-sm"><div className="flex justify-between"><dt className="text-muted">Deployed</dt><dd>{dt(rules.live.deployedAt)}</dd></div><div className="flex justify-between"><dt className="text-muted">Approved by</dt><dd>{rules.live.approvedBy}</dd></div><div className="flex justify-between"><dt className="text-muted">Deployed by</dt><dd>{rules.live.deployedBy}</dd></div></dl>
          <p className="mt-4 text-eyebrow text-muted">History</p>
          <ul className="mt-2 space-y-1.5 text-sm">{rules.history.map((h) => <li key={h.version} className="flex gap-3"><span className="w-12 font-mono text-emerald">{h.version}</span><span className="w-24 text-muted">{h.at}</span><span className="text-ink/80">{h.note}</span></li>)}</ul>
        </Panel>
        <Panel title="Staging">
          <div className="flex items-center justify-between"><p className="font-display text-3xl text-emerald">{s.version}</p><Badge tone="gold">{s.review}</Badge></div>
          <p className="mt-1 text-xs text-muted">by {s.author} · {dt(s.changed)}</p>
          <ul className="mt-3 space-y-1.5 text-sm">{s.changes.map((c) => <li key={c} className="flex gap-2 text-ink/85"><span className="text-green">+</span>{c}</li>)}</ul>
          <div className="mt-4 rounded-md bg-ivory p-3 text-sm"><p className="font-semibold text-emerald">Test cases: {s.tests.passed}/{s.tests.total} passed</p>{s.tests.failed > 0 && <p className="text-coral">{s.tests.failed} failing — cannot be approved until fixed.</p>}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            <ActionButton label="Submit for review" doneLabel="Submitted" tone="ghost" action={async () => { "use server"; await submitRulesForReview(); }} />
            <ActionButton label="Approve (clinical-lead)" doneLabel="Approved" action={async () => { "use server"; await approveRules(); }} confirm="You are signing off these rules as clinically safe. Continue?" />
            <ActionButton label="Deploy (release-manager)" doneLabel="Deployed" tone="coral" action={async () => { "use server"; await deployRules(); }} confirm="Deploy to production? Requires an approval by a different person." />
          </div>
          <p className="mt-2 text-xs text-muted">Buttons are shown for the demo; in production each is visible only to the role that holds it, and the server refuses out-of-order steps.</p>
        </Panel>
      </div>
    </div>
  );
}
