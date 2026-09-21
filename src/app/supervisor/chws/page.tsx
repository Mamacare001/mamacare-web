import Link from "next/link";
import { Phone } from "lucide-react";
import { chws, sectorEscalations, isStalled } from "@/lib/mock/supervisor";
import { PageTitle, fmtDate } from "@/components/app/ui";
import { cn } from "@/lib/cn";

export const metadata = { title: "CHWs" };

export default function SupervisorChws() {
  const stalledBy = (id: string) => sectorEscalations.filter((e) => e.chwId === id && isStalled(e)).length;
  return (
    <div className="mx-auto max-w-6xl">
      <PageTitle eyebrow={`${chws.filter((c) => c.status === "active").length} active · ${chws.filter((c) => c.status === "training").length} in training`} title="Community Health Workers" />
      <div className="overflow-x-auto rounded-lg bg-white ring-1 ring-emerald/5">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="text-left text-eyebrow text-muted">
            <tr className="border-b border-emerald/10">
              {["CHW", "Cell · village", "Caseload", "High risk", "Open alerts", "Stalled", "Median response", "Visits (due / 7 d)", "Last sync", ""].map((h) => <th key={h} className="px-4 py-3 font-bold">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald/10">
            {chws.map((c) => {
              const st = stalledBy(c.id);
              const slow = c.medianResponseH > 6;
              const stale = c.status === "active" && new Date(c.lastSync) < new Date("2026-09-20T11:00:00");
              return (
                <tr key={c.id} className={cn("hover:bg-ivory", st > 0 && "bg-coral-100/30")}>
                  <td className="px-4 py-3"><p className="font-semibold text-emerald">{c.name}</p><p className="text-xs text-muted">{c.status === "training" ? "In training" : c.binome ? `Binôme: ${c.binome.split(" ")[0]}` : "No binôme"}</p></td>
                  <td className="px-4 py-3 text-ink/80">{c.cell} · {c.village}</td>
                  <td className="px-4 py-3 font-mono">{c.caseload}</td>
                  <td className="px-4 py-3 font-mono">{c.highRisk > 0 ? <span className="text-coral">{c.highRisk}</span> : 0}</td>
                  <td className="px-4 py-3 font-mono">{c.openAlerts}</td>
                  <td className="px-4 py-3 font-mono">{st > 0 ? <span className="rounded-full bg-coral px-2 py-0.5 text-xs font-bold text-white">{st}</span> : <span className="text-muted">0</span>}</td>
                  <td className="px-4 py-3"><span className={cn("font-mono", slow && "font-bold text-coral")}>{c.status === "training" ? "—" : `${c.medianResponseH} h`}</span></td>
                  <td className="px-4 py-3 font-mono">{c.visitsDue} / {c.visitsDone7d}</td>
                  <td className="px-4 py-3"><span className={cn(stale && "font-semibold text-[#8a6a10]")}>{fmtDate(c.lastSync)}{stale && " · stale"}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link href={`/supervisor/escalations?chw=${c.id}`} className="rounded-full px-3 py-1.5 text-xs font-semibold text-emerald ring-1 ring-emerald/15">Alerts</Link>
                      <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="grid size-8 place-items-center rounded-full text-emerald hover:bg-emerald/5" aria-label={`Call ${c.name}`}><Phone className="size-4" /></a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">Median response = hours from alert creation to acknowledgement, last 30 days. Rows shaded coral have stalled alerts. “Stale” = no sync for more than 24 h.</p>
    </div>
  );
}
