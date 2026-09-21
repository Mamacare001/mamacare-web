import Link from "next/link";
import { ChevronRight, AlertTriangle } from "lucide-react";
import type { CaseMother } from "@/lib/mock/chw";
import { RiskPill, fmtDate } from "@/components/app/ui";
import { cn } from "@/lib/cn";

export function MotherRow({ m, showDue }: { m: CaseMother; showDue?: boolean }) {
  const overdue = new Date(m.nextVisitDue) < new Date("2026-09-21");
  return (
    <Link href={`/chw/mother/${m.id}`} className={cn("flex items-center gap-3 rounded-lg bg-white p-3.5 ring-1 ring-emerald/5 transition-colors hover:bg-ivory", m.risk === "high" && "ring-2 ring-coral/40")}>
      <span className={cn("grid size-11 shrink-0 place-items-center rounded-full text-sm font-bold", m.risk === "high" ? "bg-coral text-white" : m.risk === "moderate" ? "bg-gold text-midnight" : "bg-green-100 text-green")}>{m.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-semibold text-emerald">{m.name}</p>
          {m.openEscalation && <AlertTriangle className="size-4 shrink-0 text-coral" aria-label="Open escalation" />}
        </div>
        <p className="truncate text-xs text-muted">
          {m.weeks} wk · G{m.gravida} · {m.village}
          {showDue && <> · visit {overdue ? <span className="font-semibold text-coral">overdue</span> : `due ${fmtDate(m.nextVisitDue)}`}</>}
        </p>
        {m.riskReason && <p className="mt-0.5 truncate text-xs text-ink/70">{m.riskReason}</p>}
      </div>
      <RiskPill risk={m.risk} className="hidden sm:inline-block" />
      <ChevronRight className="size-5 shrink-0 text-muted" />
    </Link>
  );
}
