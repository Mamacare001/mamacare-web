import { cn } from "@/lib/cn";
import type { Risk } from "@/lib/mock/mother";

export function PageTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && <p className="text-eyebrow text-green">{eyebrow}</p>}
        <h1 className="text-h2 mt-1 text-emerald">{title}</h1>
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-lg bg-white p-5 ring-1 ring-emerald/5", className)}>{children}</div>;
}

export const riskStyle: Record<Risk, { pill: string; label: string; rw: string }> = {
  low: { pill: "bg-green text-ivory", label: "Low risk", rw: "Ingaruka nke" },
  moderate: { pill: "bg-gold text-midnight", label: "Moderate risk", rw: "Ingaruka ziciriritse" },
  high: { pill: "bg-coral text-white", label: "High risk", rw: "Ingaruka nyinshi" },
};

export function RiskPill({ risk, className }: { risk: Risk; className?: string }) {
  return <span className={cn("inline-block rounded-full px-2.5 py-1 text-xs font-bold", riskStyle[risk].pill, className)}>{riskStyle[risk].label}</span>;
}

export function fmtDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }) {
  return new Date(iso).toLocaleDateString("en-GB", opts);
}
export function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}
