import { caseload } from "@/lib/mock/chw";
import { PageTitle } from "@/components/app/ui";
import { MotherPicker } from "@/components/shared/MotherPicker";

export const metadata = { title: "Report a visit" };

export default function ChwVisitPickPage() {
  const today = "2026-09-21";
  const sorted = [...caseload].sort((a, b) => (a.nextVisitDue < b.nextVisitDue ? -1 : 1));
  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow="Raporo y’uruzinduko" title="Report a visit" />
      <p className="mb-4 text-sm text-muted">Pick the mother you visited. The form works offline and syncs when you are back on network. Mothers due today are listed first.</p>
      <MotherPicker mothers={sorted.map((m) => ({ id: m.id, name: m.name, village: m.village, weeks: m.weeks, risk: m.risk, due: m.nextVisitDue, sub: m.nextVisitDue <= today ? "visit due" : undefined }))} hrefTemplate="/chw/mother/{id}/visit" />
    </div>
  );
}
