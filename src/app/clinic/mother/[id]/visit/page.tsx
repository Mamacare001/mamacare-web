import Link from "next/link";
import { notFound } from "next/navigation";
import { clinicMothers } from "@/lib/mock/clinic";
import { PageTitle, RiskPill } from "@/components/app/ui";
import { AncVisitForm } from "@/components/clinic/AncVisitForm";

export const metadata = { title: "ANC visit" };

export default async function ClinicAncVisitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = clinicMothers.find((x) => x.id === id);
  if (!m) notFound();
  return (
    <div className="mx-auto max-w-6xl">
      <Link href={`/clinic/mother/${m.id}`} className="text-sm font-semibold text-green">← {m.name}</Link>
      <PageTitle eyebrow={`G${m.gravida}P${m.para} · week ${m.weeks} · ${m.encounters.length} previous visit${m.encounters.length === 1 ? "" : "s"} here`} title="ANC visit report" action={<RiskPill risk={m.risk} />} />
      <AncVisitForm m={m} />
    </div>
  );
}
