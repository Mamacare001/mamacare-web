import { requireAdminMfa } from "@/lib/admin-guard";
import { billing } from "@/lib/mock/admin";
import { Head, Table, Badge } from "@/components/admin/ui";

export const metadata = { title: "Billing" };

export default async function BillingPage() {
  await requireAdminMfa("/admin/billing");
  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <Head eyebrow={billing.period} title="Billing & reconciliation" note={billing.note} />
      <Table head={["Partner", "Model", "Covered lives", "Rate", "Amount", "Status"]}>
        {billing.partners.map((p) => (
          <tr key={p.name}><td className="px-4 py-3 font-semibold text-emerald">{p.name}</td><td className="px-4 py-3 text-ink/80">{p.model}</td><td className="px-4 py-3 font-mono">{p.lives.toLocaleString()}</td><td className="px-4 py-3 font-mono">{p.rate ? `${p.rate} ${p.currency}` : "—"}</td><td className="px-4 py-3 font-mono">{p.rate ? `${(p.lives * p.rate).toLocaleString()} ${p.currency}` : "in-kind"}</td><td className="px-4 py-3"><Badge tone="green">{p.status}</Badge></td></tr>
        ))}
      </Table>
      <p className="text-xs text-muted">Mothers always keep free access to core check-ins by SMS and WhatsApp. Finance sees counts and hashed reconciliations only.</p>
    </div>
  );
}
