import { requireAdminMfa } from "@/lib/admin-guard";
import { orgs } from "@/lib/mock/admin";
import { Head, Table, Badge, statusTone } from "@/components/admin/ui";

export const metadata = { title: "Organisations" };

export default async function OrgsPage() {
  await requireAdminMfa("/admin/organisations");
  return (
    <div className="mx-auto max-w-6xl">
      <Head eyebrow={`${orgs.length} organisations`} title="Organisations" note="Facilities, districts, insurers, research institutions and CHW cooperatives. Users belong to exactly one organisation; roles are scoped to it." />
      <Table head={["Organisation", "Type", "District", "Users", "CHWs", "Mothers", "Status"]}>
        {orgs.map((o) => (
          <tr key={o.id}><td className="px-4 py-3 font-semibold text-emerald">{o.name}</td><td className="px-4 py-3 text-ink/80">{o.type}</td><td className="px-4 py-3 text-ink/80">{o.district}</td><td className="px-4 py-3 font-mono">{o.users}</td><td className="px-4 py-3 font-mono">{o.chws}</td><td className="px-4 py-3 font-mono">{o.mothers.toLocaleString()}</td><td className="px-4 py-3"><Badge tone={statusTone(o.status)}>{o.status}</Badge></td></tr>
        ))}
      </Table>
      <p className="mt-3 text-xs text-muted">“Mothers” for an insurer = opted-in members, never a member list pushed into MamaCare.</p>
    </div>
  );
}
