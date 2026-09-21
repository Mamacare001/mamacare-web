import Link from "next/link";
import { notFound } from "next/navigation";
import { clinicMothers, facility } from "@/lib/mock/clinic";
import { PageTitle } from "@/components/app/ui";
import { ReferUpForm } from "@/components/clinic/SmallForms";

export const metadata = { title: "Refer up" };

export default async function ReferUpPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = clinicMothers.find((x) => x.id === id);
  if (!m) notFound();
  return (
    <div className="mx-auto max-w-3xl">
      <Link href={`/clinic/mother/${m.id}`} className="text-sm font-semibold text-green">← {m.name}</Link>
      <PageTitle eyebrow={`${m.weeks} wk · G${m.gravida}P${m.para}`} title={`Refer ${m.name.split(" ")[0]} to ${facility.referral.split(" ")[0]} DH`} />
      <ReferUpForm motherId={m.id} motherName={m.name} to={facility.referral} />
    </div>
  );
}
