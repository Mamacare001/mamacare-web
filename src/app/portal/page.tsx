import Link from "next/link";
import { Database, Lock, Clock, FileText, TerminalSquare } from "lucide-react";
import { protocols } from "@/lib/mock/partner";
import { PageTitle, Card, fmtDate } from "@/components/app/ui";
import { cn } from "@/lib/cn";

export const metadata = { title: "Data portal" };

export default function PortalPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <PageTitle eyebrow="Ethics-approved protocols only" title="Research data portal" />
      <Card className="flex items-start gap-3 border-l-4 border-violet">
        <Lock className="mt-0.5 size-5 shrink-0 text-violet" />
        <p className="text-sm text-ink/85">Extracts are pseudonymised with a key held by MamaCare’s Data Protection Officer, never by the researcher. Analysis runs in the sandbox; exports enforce a minimum cell size of 20 and are logged. Access ends automatically on the protocol’s expiry date.</p>
      </Card>
      <ul className="space-y-3">
        {protocols.map((p) => (
          <li key={p.id} className={cn("rounded-lg bg-white p-5 ring-1 ring-emerald/5", p.status === "pending" && "opacity-70")}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-violet">{p.id}</p>
                <p className="font-display text-xl text-emerald">{p.title}</p>
                <p className="text-sm text-muted">PI: {p.pi}</p>
              </div>
              <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold uppercase", p.status === "active" ? "bg-green-100 text-green" : "bg-gold-100 text-[#8a6a10]")}>{p.status}</span>
            </div>
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
              <div><dt className="text-eyebrow text-muted">Approval</dt><dd className="text-ink/85">{p.approvedBy}</dd></div>
              <div><dt className="text-eyebrow text-muted">Expires</dt><dd className="flex items-center gap-1 text-ink/85"><Clock className="size-3.5 text-muted" /> {p.expires === "—" ? "—" : fmtDate(p.expires, { day: "numeric", month: "short", year: "numeric" })}</dd></div>
              <div><dt className="text-eyebrow text-muted">Extract</dt><dd className="text-ink/85">{p.extract}</dd></div>
            </dl>
            {p.status === "active" && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald px-3.5 py-2 text-sm font-semibold text-ivory"><TerminalSquare className="size-4" /> Open sandbox</span>
                <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-emerald ring-1 ring-emerald/15"><FileText className="size-4" /> Data dictionary</span>
                <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-emerald ring-1 ring-emerald/15"><Database className="size-4" /> Request export (≥ 20 per cell)</span>
                {p.lastAccess && <span className="ml-auto self-center text-xs text-muted">last access {fmtDate(p.lastAccess)}</span>}
              </div>
            )}
            {p.status === "pending" && <p className="mt-3 text-sm text-muted">Under review by the ethics liaison and DPO. Typical turnaround 4 weeks. <Link href="/contact?topic=research" className="font-semibold text-green underline underline-offset-4">Contact us</Link>.</p>}
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted">Sandbox and data-dictionary links activate with the API. Re-identification attempts are a breach of the protocol and of Law No. 058/2021.</p>
    </div>
  );
}
