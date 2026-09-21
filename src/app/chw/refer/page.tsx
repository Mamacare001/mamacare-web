import { caseload } from "@/lib/mock/chw";
import { PageTitle } from "@/components/app/ui";
import { ReferForm } from "@/components/chw/ReferEnrolForms";

export const metadata = { title: "Refer" };

export default async function ReferPage({ searchParams }: { searchParams: Promise<{ mother?: string; urgency?: string }> }) {
  const { mother, urgency } = await searchParams;
  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow="Kohereza ku kigo nderabuzima" title="Refer to a facility" />
      <ReferForm mothers={caseload} preselect={mother} urgency={urgency} />
    </div>
  );
}
