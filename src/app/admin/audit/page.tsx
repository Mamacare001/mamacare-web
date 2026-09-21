import { requireAdminMfa } from "@/lib/admin-guard";
import { auditLog } from "@/lib/mock/admin";
import { Head, Table, Badge, dt } from "@/components/admin/ui";
import { cn } from "@/lib/cn";

export const metadata = { title: "Audit log" };

export default async function AuditPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  await requireAdminMfa("/admin/audit");
  const { q = "" } = await searchParams;
  const rows = auditLog.filter((a) => !q || JSON.stringify(a).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <Head eyebrow="Append-only · read-only here" title="Audit log" note="Every read and write of a patient record, every role change, deploy and break-glass. Reviewed monthly by the audit-reviewer; anomalies go to security-lead and DPO. A mother can request the entries about her." />
      <form className="flex gap-2"><input name="q" defaultValue={q} placeholder="Search who, action, target…" className="h-11 flex-1 rounded-full border border-emerald/15 bg-white px-4 text-sm" /><button className="h-11 rounded-full bg-emerald px-5 text-sm font-semibold text-ivory">Search</button></form>
      <Table head={["When", "Who", "Role", "Action", "Target", "Context"]}>
        {rows.map((a, i) => (
          <tr key={i} className={cn(a.flag && "bg-coral-100/30")}><td className="px-4 py-2.5 whitespace-nowrap">{dt(a.at)}</td><td className="px-4 py-2.5 font-mono text-xs">{a.who}</td><td className="px-4 py-2.5"><Badge tone={a.role === "system" ? "violet" : "muted"}>{a.role}</Badge></td><td className={cn("px-4 py-2.5 font-semibold", a.flag ? "text-coral" : "text-emerald")}>{a.action}</td><td className="px-4 py-2.5 font-mono text-xs">{a.target}</td><td className="px-4 py-2.5 text-ink/80">{a.ctx}</td></tr>
        ))}
      </Table>
      <p className="text-xs text-muted">Showing {rows.length} of the last 8 entries (demo). Production: streamed to an append-only store with retention per policy; export requires audit-reviewer + security-lead.</p>
    </div>
  );
}
