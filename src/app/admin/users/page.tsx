import { requireAdminMfa } from "@/lib/admin-guard";
import { users } from "@/lib/mock/admin";
import { approveUser, suspendUser, renewUser } from "@/app/admin/actions";
import { Head, Table, Badge, statusTone, dt, d } from "@/components/admin/ui";
import { ActionButton } from "@/components/admin/Buttons";
import { cn } from "@/lib/cn";

export const metadata = { title: "Users & roles" };
const privileged = ["provider-hc", "provider-dh", "care-manager", "researcher", "clinical-lead", "ds-lead", "release-manager", "sre", "dpo", "security-lead", "exec"];

export default async function UsersPage() {
  await requireAdminMfa("/admin/users");
  return (
    <div className="mx-auto max-w-7xl">
      <Head eyebrow={`${users.length} accounts · ${users.filter((u) => u.status === "pending").length} pending · ${users.filter((u) => !u.mfa && u.status === "active").length} without MFA`} title="Users & roles" note="Privileged roles need two different approvers. Grants expire (90 d internal, contract end for partners) and must be re-approved. Suspension removes every role and revokes sessions within minutes." />
      <Table head={["User", "Organisation", "Roles", "MFA", "Status", "Expires", "Last active", ""]} min={980}>
        {users.map((u) => {
          const priv = u.roles.some((r) => privileged.includes(r));
          const soon = u.status === "active" && new Date(u.expires) < new Date("2026-10-21");
          return (
            <tr key={u.id} className={cn(u.status === "pending" && "bg-gold-100/30", u.status === "expired" && "bg-coral-100/20")}>
              <td className="px-4 py-3"><p className="font-semibold text-emerald">{u.name}</p><p className="text-xs text-muted">{u.email}</p></td>
              <td className="px-4 py-3 text-ink/80">{u.org}</td>
              <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{u.roles.map((r) => <span key={r} className={cn("rounded-full px-2 py-0.5 font-mono text-[11px]", privileged.includes(r) ? "bg-violet-100 text-violet" : "bg-ivory text-ink/70")}>{r}</span>)}</div></td>
              <td className="px-4 py-3">{u.mfa ? <Badge tone="green">on</Badge> : <Badge tone="coral">off</Badge>}</td>
              <td className="px-4 py-3"><Badge tone={statusTone(u.status)}>{u.status}</Badge>{u.status === "pending" && <p className="mt-1 text-[11px] text-muted">{u.approvals?.length ?? 0}/2 approvals{u.approvals?.[0] && ` · ${u.approvals[0].by}`}</p>}</td>
              <td className={cn("px-4 py-3", soon && "font-semibold text-[#8a6a10]")}>{d(u.expires)}{soon && " · soon"}</td>
              <td className="px-4 py-3 text-ink/80">{dt(u.last)}</td>
              <td className="px-4 py-3"><div className="flex flex-wrap gap-1">
                {u.status === "pending" && <ActionButton label={priv ? "Approve (2nd)" : "Approve"} doneLabel="Approved" action={async () => { "use server"; await approveUser(u.id); }} />}
                {(u.status === "active" && soon) || u.status === "expired" ? <ActionButton label="Renew 90 d" doneLabel="Renewed" tone="ghost" action={async () => { "use server"; await renewUser(u.id); }} /> : null}
                {u.status === "active" && <ActionButton label="Suspend" doneLabel="Suspended" tone="coral" reason confirm={`Suspend ${u.name}? Reason (audit-logged):`} action={async (r) => { "use server"; await suspendUser(u.id, r ?? ""); }} />}
              </div></td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
}
