import Link from "next/link";
import { sectorEscalations, chws, isStalled } from "@/lib/mock/supervisor";
import { PageTitle } from "@/components/app/ui";
import { StalledList } from "@/components/supervisor/StalledList";
import { cn } from "@/lib/cn";

export const metadata = { title: "Alerts" };

const filters = [
  { id: "all", label: "All active" },
  { id: "stalled", label: "Stalled" },
  { id: "high", label: "High risk" },
  { id: "clinic", label: "Waiting on clinic" },
  { id: "closed", label: "Closed" },
];

export default async function SupervisorEscalations({ searchParams }: { searchParams: Promise<{ filter?: string; chw?: string }> }) {
  const { filter = "all", chw } = await searchParams;
  let list = sectorEscalations.filter((e) => (filter === "closed" ? e.status === "closed" : e.status !== "closed"));
  if (filter === "stalled") list = list.filter(isStalled);
  if (filter === "high") list = list.filter((e) => e.risk === "high");
  if (filter === "clinic") list = list.filter((e) => e.status === "acted" && !e.facilityResponded);
  if (chw) list = list.filter((e) => e.chwId === chw);
  list = [...list].sort((a, b) => Number(isStalled(b)) - Number(isStalled(a)) || (a.risk === "high" ? -1 : b.risk === "high" ? 1 : 0) || b.sinceStatusH - a.sinceStatusH);
  const chwName = chws.find((c) => c.id === chw)?.name;

  return (
    <div className="mx-auto max-w-5xl">
      <PageTitle eyebrow={chwName ? `CHW: ${chwName}` : "Whole sector"} title="Alerts" />
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link key={f.id} href={`/supervisor/escalations?filter=${f.id}${chw ? `&chw=${chw}` : ""}`} className={cn("rounded-full px-3.5 py-1.5 text-sm font-semibold", filter === f.id ? "bg-emerald text-ivory" : "bg-white text-emerald ring-1 ring-emerald/15")}>{f.label}</Link>
        ))}
        {chw && <Link href={`/supervisor/escalations?filter=${filter}`} className="rounded-full px-3.5 py-1.5 text-sm font-semibold text-coral ring-1 ring-coral/30">× Clear CHW</Link>}
      </div>
      <p className="mb-3 text-xs text-muted">{list.length} alert{list.length === 1 ? "" : "s"} · stalled first, then by risk and age</p>
      <StalledList items={list} chws={chws} showAll />
    </div>
  );
}
