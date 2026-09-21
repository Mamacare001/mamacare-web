import Link from "next/link";
import { notFound } from "next/navigation";
import { clinicMothers } from "@/lib/mock/clinic";
import { PageTitle, RiskPill } from "@/components/app/ui";
import { EncounterForm } from "@/components/clinic/EncounterForm";

export const metadata = { title: "Encounter" };

export default async function EncounterPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ from?: string }> }) {
  const { id } = await params;
  const { from } = await searchParams;
  const m = clinicMothers.find((x) => x.id === id);
  if (!m) notFound();
  return (
    <div className="mx-auto max-w-6xl">
      <Link href={`/clinic/mother/${m.id}`} className="text-sm font-semibold text-green">← {m.name}</Link>
      <PageTitle eyebrow={`${m.weeks} wk · G${m.gravida}P${m.para} · referred by ${m.chwName}`} title="Clinical encounter" action={<RiskPill risk={m.risk} />} />
      <EncounterForm m={m} fromQueue={from} />
    </div>
  );
}
