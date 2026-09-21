import { clinicMothers } from "@/lib/mock/clinic";
import { PageTitle } from "@/components/app/ui";
import { MotherPicker } from "@/components/shared/MotherPicker";

export const metadata = { title: "Report a visit" };

export default function ClinicVisitPickPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow="ANC · Raporo y’uruzinduko" title="Report an ANC visit" />
      <p className="mb-4 text-sm text-muted">Routine scheduled visit. For a referred or walk-in emergency, open her record and start an encounter instead.</p>
      <MotherPicker mothers={clinicMothers.map((m) => ({ id: m.id, name: m.name, village: m.village, weeks: m.weeks, risk: m.risk, sub: `${m.encounters.length} visit${m.encounters.length === 1 ? "" : "s"} here · CHW ${m.chwName.split(" ")[0]}` }))} hrefTemplate="/clinic/mother/{id}/visit" />
    </div>
  );
}
