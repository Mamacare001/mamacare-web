import { mothers } from "@/lib/mock/family";
import { PageTitle } from "@/components/app/ui";
import { ObservationForm } from "@/components/app/ObservationForm";

export const metadata = { title: "Report what you noticed" };

export default async function ReportPage({ searchParams }: { searchParams: Promise<{ about?: string }> }) {
  const { about } = await searchParams;
  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow="Menyesha · One minute" title="I noticed something" />
      <p className="mb-6 text-muted">Your report goes through the same medically reviewed rules as her own check-ins, and reaches her CHW. She will be told you made it.</p>
      <ObservationForm mothers={mothers} preselect={about} />
    </div>
  );
}
