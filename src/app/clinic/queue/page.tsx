import { queue } from "@/lib/mock/clinic";
import { PageTitle } from "@/components/app/ui";
import { QueueList } from "@/components/clinic/QueueList";

export const metadata = { title: "Queue" };

export default function ClinicQueue() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageTitle eyebrow="Escalations · referrals · walk-ins" title="Queue" />
      <p className="mb-4 text-sm text-muted">Sorted by risk, then arrival. Opening an encounter marks the case in progress; saving it with CHW feedback closes the loop.</p>
      <QueueList items={queue} />
    </div>
  );
}
