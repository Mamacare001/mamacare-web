import { requireAdminMfa } from "@/lib/admin-guard";
import { integrations } from "@/lib/mock/admin";
import { rotateKey } from "@/app/admin/actions";
import { Head, Table, Badge, statusTone } from "@/components/admin/ui";
import { ActionButton } from "@/components/admin/Buttons";
import { cn } from "@/lib/cn";

export const metadata = { title: "Integrations" };

export default async function IntegrationsPage() {
  await requireAdminMfa("/admin/integrations");
  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <Head eyebrow="Channels · health systems · insurers · auth · ops" title="Integrations & keys" note="Each integration is its own service principal with its own credential, rotated quarterly. Rotation here schedules it; the secret itself lives in the vault and is never displayed." />
      <Table head={["Integration", "Kind", "Status", "Detail", "Key rotated", "Next rotation", ""]}>
        {integrations.map((i) => {
          const due = new Date(i.next) < new Date("2026-10-21");
          return (
            <tr key={i.name} className={cn(i.status === "degraded" && "bg-gold-100/30")}><td className="px-4 py-3 font-semibold text-emerald">{i.name}</td><td className="px-4 py-3 text-ink/80">{i.kind}</td><td className="px-4 py-3"><Badge tone={statusTone(i.status)}>{i.status}</Badge></td><td className="px-4 py-3 text-ink/80">{i.detail}</td><td className="px-4 py-3">{i.keyRotated}</td><td className={cn("px-4 py-3", due && "font-semibold text-[#8a6a10]")}>{i.next}{due && " · due"}</td><td className="px-4 py-3"><ActionButton label="Rotate" doneLabel="Scheduled" tone="ghost" confirm={`Rotate the ${i.name} credential now? Old key stays valid for 24 h.`} action={async () => { "use server"; await rotateKey(i.name); }} /></td></tr>
          );
        })}
      </Table>
    </div>
  );
}
