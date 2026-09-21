import { ShieldCheck, Users, Building2, HeartHandshake, Cpu } from "lucide-react";
import { accessLog } from "@/lib/mock/mother";
import { PageTitle, Card, fmtDate, fmtTime } from "@/components/app/ui";

export const metadata = { title: "Who viewed my record" };

const icon = { system: Cpu, chw: Users, facility: Building2, family: HeartHandshake } as const;

export default function AccessLogPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow="Transparency" title="Who viewed your record" />
      <Card className="mb-6 flex items-start gap-3">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-green" />
        <p className="text-sm leading-relaxed text-ink/80">Every time a person or the MamaCare system reads your record, it is written here and cannot be deleted. If you see someone you do not recognise, remove them in <a href="/app/circle" className="font-semibold text-green underline underline-offset-4">My circle</a> and tell us.</p>
      </Card>
      <ul className="divide-y divide-emerald/10 rounded-lg bg-white ring-1 ring-emerald/5">
        {accessLog.map((a, i) => {
          const I = icon[a.role as keyof typeof icon];
          return (
            <li key={i} className="flex items-center gap-4 p-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ivory text-emerald"><I className="size-4" /></span>
              <div className="flex-1">
                <p className="font-semibold text-emerald">{a.who}</p>
                <p className="text-sm text-muted">{a.what}</p>
              </div>
              <p className="text-right text-xs text-muted">{fmtDate(a.at)}<br />{fmtTime(a.at)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
