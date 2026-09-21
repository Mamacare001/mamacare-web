import { staff, facility } from "@/lib/mock/clinic";
import { PageTitle, Card, fmtDate } from "@/components/app/ui";
import { StaffRequestForm } from "@/components/clinic/SmallForms";
import { cn } from "@/lib/cn";

export const metadata = { title: "Staff" };

export default function StaffPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <PageTitle eyebrow={`${facility.name} · in-charge ${facility.inCharge}`} title="Staff accounts" />
      <div className="overflow-x-auto rounded-lg bg-white ring-1 ring-emerald/5">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="text-left text-eyebrow text-muted"><tr className="border-b border-emerald/10">{["Name", "Role", "Email", "Status", "Last active"].map((h) => <th key={h} className="px-4 py-3 font-bold">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-emerald/10">
            {staff.map((s) => (
              <tr key={s.id}><td className="px-4 py-3 font-semibold text-emerald">{s.name}</td><td className="px-4 py-3 text-ink/80">{s.role}</td><td className="px-4 py-3 text-ink/80">{s.email}</td><td className="px-4 py-3"><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", s.status === "active" ? "bg-green-100 text-green" : "bg-gold-100 text-[#8a6a10]")}>{s.status}</span></td><td className="px-4 py-3 text-ink/80">{s.last ? fmtDate(s.last) : "—"}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <Card>
        <p className="font-display text-xl text-emerald">Request an account for a colleague</p>
        <p className="mb-4 mt-1 text-sm text-muted">Provider accounts need two approvals: the in-charge and MamaCare’s admin. Access is scoped to this facility and logged.</p>
        <StaffRequestForm />
      </Card>
    </div>
  );
}
