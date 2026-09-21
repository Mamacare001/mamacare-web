import Link from "next/link";
import { notFound } from "next/navigation";
import { clinicMothers } from "@/lib/mock/clinic";
import { PageTitle } from "@/components/app/ui";
import { SupporterForm } from "@/components/shared/SupporterForm";
import { addSupporterAtClinic } from "@/app/clinic/actions";

export const metadata = { title: "Add supporter" };

export default async function ClinicSupportersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = clinicMothers.find((x) => x.id === id);
  if (!m) notFound();
  return (
    <div className="mx-auto max-w-3xl">
      <Link href={`/clinic/mother/${m.id}`} className="text-sm font-semibold text-green">← {m.name}</Link>
      <PageTitle eyebrow="Family circle" title="Add a family supporter" />
      <p className="mb-6 text-sm text-muted">Someone who accompanies her or lives with her. They get an SMS invite; she confirms them from her own phone before they receive anything.</p>
      <SupporterForm motherId={m.id} motherName={m.name} action={addSupporterAtClinic} back={`/clinic/mother/${m.id}`} />
    </div>
  );
}
