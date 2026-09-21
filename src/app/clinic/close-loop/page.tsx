import { pendingFeedback } from "@/lib/mock/clinic";
import { PageTitle } from "@/components/app/ui";
import { FeedbackCard } from "@/components/clinic/SmallForms";

export const metadata = { title: "Close the loop" };

export default function CloseLoopPage() {
  const sorted = [...pendingFeedback].sort((a, b) => b.daysWaiting - a.daysWaiting);
  return (
    <div className="mx-auto max-w-4xl">
      <PageTitle eyebrow="The gap 100% of interviewed CHWs identified" title="Close the loop" />
      <p className="mb-5 text-sm text-muted">Each referral below has a CHW waiting to hear what happened. One line from you reaches their app and phone, closes the escalation, and tells them what to do at the next visit.</p>
      <ul className="space-y-3">{sorted.map((f) => <FeedbackCard key={f.id} f={f} />)}</ul>
    </div>
  );
}
