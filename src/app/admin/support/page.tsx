import { requireAdminMfa } from "@/lib/admin-guard";
import { tickets } from "@/lib/mock/admin";
import { assignTicket } from "@/app/admin/actions";
import { Head, Table, Badge, statusTone, dt } from "@/components/admin/ui";
import { ActionButton } from "@/components/admin/Buttons";

export const metadata = { title: "Support" };

export default async function SupportPage() {
  await requireAdminMfa("/admin/support");
  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <Head eyebrow={`${tickets.filter((t) => t.status !== "resolved").length} open`} title="Support" note="Support agents see account metadata — name, phone, language, channel — never health content. A consented support session lets an agent see one issue with the person’s live approval, for that issue only, logged." />
      <Table head={["Ticket", "From", "Subject", "Received", "Agent", "Session", "Status", ""]}>
        {tickets.map((t) => (
          <tr key={t.id}><td className="px-4 py-3 font-mono text-xs text-emerald">{t.id}</td><td className="px-4 py-3 text-ink/80">{t.from}</td><td className="px-4 py-3 font-semibold text-emerald">{t.subject}</td><td className="px-4 py-3">{dt(t.at)}</td><td className="px-4 py-3">{t.agent}</td><td className="px-4 py-3">{t.session ? <Badge tone="violet">consented</Badge> : <span className="text-xs text-muted">—</span>}</td><td className="px-4 py-3"><Badge tone={statusTone(t.status)}>{t.status}</Badge></td><td className="px-4 py-3">{t.status === "open" && <ActionButton label="Assign to me" doneLabel="Assigned" action={async () => { "use server"; await assignTicket(t.id); }} />}</td></tr>
        ))}
      </Table>
    </div>
  );
}
