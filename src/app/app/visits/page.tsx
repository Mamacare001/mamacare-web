import { CheckCircle2, CalendarDays, Circle, MapPin } from "lucide-react";
import { visits, profile } from "@/lib/mock/mother";
import { PageTitle, Card, fmtDate } from "@/components/app/ui";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export const metadata = { title: "Visits" };

export default function VisitsPage() {
  const done = visits.filter((v) => v.status === "done").length;
  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow="Antenatal care" title="Your ANC visits" />
      <Card className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-display text-3xl text-emerald">{done} <span className="text-lg text-muted">of {visits.length} visits</span></p>
          <p className="text-sm text-muted">Rwanda recommends at least 4 ANC visits. You are on track.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted"><MapPin className="size-4" /> {profile.facility}</div>
      </Card>
      <ol className="space-y-3">
        {visits.map((v) => (
          <li key={v.id} className={cn("flex flex-wrap items-center gap-4 rounded-lg bg-white p-4 ring-1 ring-emerald/5", v.status === "upcoming" && "ring-2 ring-gold")}>
            <span className={cn("grid size-10 shrink-0 place-items-center rounded-full", v.status === "done" ? "bg-green-100 text-green" : v.status === "upcoming" ? "bg-gold-100 text-[#8a6a10]" : "bg-ivory-200 text-muted")}>
              {v.status === "done" ? <CheckCircle2 className="size-5" /> : v.status === "upcoming" ? <CalendarDays className="size-5" /> : <Circle className="size-5" />}
            </span>
            <div className="min-w-[200px] flex-1">
              <p className="font-semibold text-emerald">Visit {v.n} · {fmtDate(v.date, { day: "numeric", month: "long", year: "numeric" })}</p>
              <p className="text-sm text-muted">{v.note}</p>
            </div>
            {v.status === "upcoming" && <Button href="/app/chat" variant="secondary" size="sm">Need to reschedule?</Button>}
          </li>
        ))}
      </ol>
      <p className="mt-6 text-xs text-muted">Visit dates come from your facility. If one is wrong, tell your CHW or the health centre.</p>
    </div>
  );
}
