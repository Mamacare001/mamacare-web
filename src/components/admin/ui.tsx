import { cn } from "@/lib/cn";

export function Head({ eyebrow, title, action, note }: { eyebrow?: string; title: string; action?: React.ReactNode; note?: string }) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>{eyebrow && <p className="text-eyebrow text-green">{eyebrow}</p>}<h1 className="text-h2 mt-1 text-emerald">{title}</h1></div>
        {action}
      </div>
      {note && <p className="mt-2 max-w-3xl text-sm text-muted">{note}</p>}
    </div>
  );
}
export function Panel({ children, className, title }: { children: React.ReactNode; className?: string; title?: string }) {
  return (
    <section className={cn("rounded-lg bg-white p-5 ring-1 ring-emerald/5", className)}>
      {title && <p className="text-eyebrow mb-3 text-muted">{title}</p>}
      {children}
    </section>
  );
}
export function Table({ head, children, min = 720 }: { head: string[]; children: React.ReactNode; min?: number }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-white ring-1 ring-emerald/5">
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead className="text-left text-eyebrow text-muted"><tr className="border-b border-emerald/10">{head.map((h) => <th key={h} className="px-4 py-3 font-bold">{h}</th>)}</tr></thead>
        <tbody className="divide-y divide-emerald/10">{children}</tbody>
      </table>
    </div>
  );
}
export function Badge({ children, tone = "muted" }: { children: React.ReactNode; tone?: "green" | "gold" | "coral" | "violet" | "muted" }) {
  const t = { green: "bg-green-100 text-green", gold: "bg-gold-100 text-[#8a6a10]", coral: "bg-coral-100 text-coral", violet: "bg-violet-100 text-violet", muted: "bg-ivory text-muted" }[tone];
  return <span className={cn("inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", t)}>{children}</span>;
}
export const statusTone = (s: string): "green" | "gold" | "coral" | "violet" | "muted" => (["active", "healthy", "published", "done", "resolved", "closed", "reconciled"].some((x) => s.includes(x)) ? "green" : ["pending", "in review", "in progress", "degraded", "onboarding", "pilot", "staging", "open", "draft", "awaiting"].some((x) => s.includes(x)) ? "gold" : ["suspended", "expired", "failed"].some((x) => s.includes(x)) ? "coral" : "muted");
export const dt = (iso: string) => (iso ? new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—");
export const d = (iso: string) => (iso && iso !== "—" ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : iso || "—");
