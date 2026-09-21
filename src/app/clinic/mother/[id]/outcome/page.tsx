import Link from "next/link";
import { notFound } from "next/navigation";
import { clinicMothers } from "@/lib/mock/clinic";
import { PageTitle } from "@/components/app/ui";
import { OutcomeForm } from "@/components/clinic/SmallForms";

export const metadata = { title: "Outcome" };

export default async function OutcomePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = clinicMothers.find((x) => x.id === id);
  if (!m) notFound();
  return (
    <div className="mx-auto max-w-3xl">
      <Link href={`/clinic/mother/${m.id}`} className="text-sm font-semibold text-green">← {m.name}</Link>
      <PageTitle eyebrow="Closes the pregnancy episode" title="Record outcome" />
      <OutcomeForm motherId={m.id} motherName={m.name} />
    </div>
  );
}
