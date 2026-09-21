import { MessageCircle, Home, Activity, ShieldAlert, BookOpen, Users, FileText } from "lucide-react";
import { timeline, type TimelineEvent } from "@/lib/mock/mother";
import { PageTitle, RiskPill, fmtDate, fmtTime } from "@/components/app/ui";
import { cn } from "@/lib/cn";

export const metadata = { title: "Timeline" };

const icon: Record<TimelineEvent["kind"], typeof Home> = { checkin: MessageCircle, visit: Home, measurement: Activity, escalation: ShieldAlert, guidance: BookOpen, family: Users, note: FileText };
const tone: Record<TimelineEvent["kind"], string> = { checkin: "bg-green-100 text-green", visit: "bg-green-100 text-green", measurement: "bg-violet-100 text-violet", escalation: "bg-coral-100 text-coral", guidance: "bg-gold-100 text-[#8a6a10]", family: "bg-coral-100 text-coral", note: "bg-ivory-200 text-muted" };

export default function TimelinePage() {
  // group by day
  const groups = timeline.reduce<Record<string, TimelineEvent[]>>((acc, e) => {
    const k = e.at.slice(0, 10);
    (acc[k] ??= []).push(e);
    return acc;
  }, {});
  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow="One continuous picture" title="Your pregnancy timeline" />
      <p className="mb-8 text-muted">Everything you, your family, your CHW and your clinic have added — in one place.</p>
      <ol className="relative border-l border-emerald/15 pl-6">
        {Object.entries(groups).map(([day, events]) => (
          <li key={day} className="mb-8">
            <p className="text-eyebrow -ml-6 mb-3 bg-ivory pr-2 text-muted">{fmtDate(day, { weekday: "short", day: "numeric", month: "long" })}</p>
            <ul className="space-y-3">
              {events.map((e) => {
                const I = icon[e.kind];
                return (
                  <li key={e.id} className="relative rounded-lg bg-white p-4 ring-1 ring-emerald/5">
                    <span className={cn("absolute -left-[37px] top-4 grid size-7 place-items-center rounded-full ring-4 ring-ivory", tone[e.kind])}>
                      <I className="size-3.5" />
                    </span>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="font-semibold text-emerald">{e.title}</p>
                      {e.risk && <RiskPill risk={e.risk} />}
                    </div>
                    {e.detail && <p className="mt-1 text-sm leading-relaxed text-ink/80">{e.detail}</p>}
                    <p className="mt-2 text-xs text-muted">{fmtTime(e.at)} · {e.by}</p>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
