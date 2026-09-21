import { requireAdminMfa } from "@/lib/admin-guard";
import { caseReviews } from "@/lib/mock/admin";
import { updateCaseReview } from "@/app/admin/actions";
import { Head, Badge, statusTone, dt } from "@/components/admin/ui";
import { ActionButton } from "@/components/admin/Buttons";

export const metadata = { title: "Case review" };

export default async function CaseReviewPage() {
  await requireAdminMfa("/admin/case-review");
  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <Head eyebrow="Opened automatically by adverse outcomes, system-wrong reports and stalled escalations" title="Case review" note="The clinical lead reviews flagged cases only, with a logged reason; identified data is opened through break-glass. Findings feed the rules backlog." />
      <ul className="space-y-3">
        {caseReviews.map((c) => (
          <li key={c.id} className="rounded-lg bg-white p-4 ring-1 ring-emerald/5">
            <div className="flex flex-wrap items-start justify-between gap-2"><div><p className="font-mono text-xs text-violet">{c.id} · opened {dt(c.opened)}</p><p className="mt-1 font-semibold text-emerald">{c.trigger}</p><p className="mt-1 text-sm text-ink/85">{c.question}</p></div><div className="text-right"><Badge tone={statusTone(c.status)}>{c.status}</Badge><p className="mt-1 text-xs text-muted">{c.assignee} · due {c.due}</p></div></div>
            {c.status !== "closed" && <div className="mt-3 flex gap-2"><ActionButton label="Open identified record (break-glass)" tone="coral" reason confirm="Reason for opening identified data (alerts security-lead and DPO):" action={async () => { "use server"; await updateCaseReview(c.id, "in review"); }} doneLabel="Opened · logged" /><ActionButton label="Close with findings" tone="ghost" reason confirm="Findings summary (goes to the rules backlog):" action={async () => { "use server"; await updateCaseReview(c.id, "closed"); }} doneLabel="Closed" /></div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
