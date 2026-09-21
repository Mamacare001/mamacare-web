import { escalations } from "@/lib/mock/chw";
import { PageTitle } from "@/components/app/ui";
import { EscalationList } from "@/components/chw/EscalationList";

export const metadata = { title: "Alerts" };

export default function EscalationsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow="Open → acknowledged → acted → closed" title="Alerts" />
      <p className="mb-4 text-sm text-muted">Every alert has an owner: you. Acknowledge it when you have seen it, mark it acted when you have visited or referred, and it closes when the clinic records what happened.</p>
      <EscalationList items={escalations} />
    </div>
  );
}
