import { requireAdminMfa } from "@/lib/admin-guard";
import { consentRequests, consentStats } from "@/lib/mock/admin";
import { fulfilRequest } from "@/app/admin/actions";
import { Head, Table, Badge, statusTone, dt } from "@/components/admin/ui";
import { ActionButton } from "@/components/admin/Buttons";

export const metadata = { title: "Consent & requests" };

export default async function ConsentPage() {
  await requireAdminMfa("/admin/consent");
  const s = consentStats;
  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <Head eyebrow="Data Protection Officer" title="Consent & data-subject requests" note="Subject-access, correction, export and deletion requests under Law No. 058/2021 — 30-day statutory deadline. The DPO is the only role that can locate a specific record to fulfil a request, and every such lookup is logged." />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {[[s.mothers, "Mothers consented"], [s.familyLinks, "Family links approved"], [s.insurerOptIn, "Insurer care opt-ins"], [s.revocations30d, "Revocations · 30 d"], [s.sarOpen, "Open requests"]].map(([n, l]) => <div key={l} className="rounded-lg bg-white p-4 ring-1 ring-emerald/5"><p className="font-display text-3xl text-emerald">{(n as number).toLocaleString()}</p><p className="text-sm text-muted">{l}</p></div>)}
      </div>
      <Table head={["Request", "Type", "From", "Received", "Due", "Owner", "Status", ""]}>
        {consentRequests.map((r) => (
          <tr key={r.id}><td className="px-4 py-3 font-mono text-xs text-emerald">{r.id}</td><td className="px-4 py-3 font-semibold text-emerald">{r.type}</td><td className="px-4 py-3 text-ink/80">{r.who}</td><td className="px-4 py-3">{dt(r.at)}</td><td className="px-4 py-3">{r.due}</td><td className="px-4 py-3 font-mono text-xs">{r.owner}</td><td className="px-4 py-3"><Badge tone={statusTone(r.status)}>{r.status}</Badge></td><td className="px-4 py-3">{r.status !== "done" && <ActionButton label="Fulfil (DPO)" doneLabel="Fulfilled" action={async () => { "use server"; await fulfilRequest(r.id); }} confirm="Locate and export this person's record? This lookup is logged and visible to them." />}</td></tr>
        ))}
      </Table>
    </div>
  );
}
