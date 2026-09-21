import { requireAdminMfa } from "@/lib/admin-guard";
import { breakGlass } from "@/lib/mock/admin";
import { markBreakGlassReviewed } from "@/app/admin/actions";
import { Head, Badge, dt } from "@/components/admin/ui";
import { ActionButton } from "@/components/admin/Buttons";
import { cn } from "@/lib/cn";

export const metadata = { title: "Break-glass" };

export default async function BreakGlassPage() {
  await requireAdminMfa("/admin/break-glass");
  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <Head eyebrow="Emergency access to identified data" title="Break-glass" note="Requires a stated reason, alerts security-lead and DPO instantly, expires after 60 minutes, and must be reviewed within 48 hours. Nobody — including the founders — has standing access to identified records." />
      <ul className="space-y-3">
        {breakGlass.map((b) => (
          <li key={b.id} className={cn("rounded-lg bg-white p-4 ring-1 ring-emerald/5", !b.reviewed && "ring-2 ring-coral/40")}>
            <div className="flex flex-wrap items-start justify-between gap-2"><div><p className="font-mono text-xs text-coral">{b.id} · {dt(b.at)}</p><p className="mt-1 font-semibold text-emerald">{b.who}</p><p className="mt-1 text-sm text-ink/85">{b.reason}</p></div>{b.reviewed ? <Badge tone="green">reviewed</Badge> : <Badge tone="coral">review due</Badge>}</div>
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-3"><div><dt className="text-eyebrow text-muted">Scope</dt><dd className="font-mono text-xs">{b.scope}</dd></div><div><dt className="text-eyebrow text-muted">Approved by</dt><dd>{b.approvedBy}</dd></div><div><dt className="text-eyebrow text-muted">Expired</dt><dd>{dt(b.expired)}</dd></div></dl>
            {!b.reviewed && <div className="mt-3"><ActionButton label="Mark reviewed (audit-reviewer)" doneLabel="Reviewed" reason confirm="Review note — was the access proportionate?" action={async (r) => { "use server"; await markBreakGlassReviewed(b.id, r ?? ""); }} /></div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
