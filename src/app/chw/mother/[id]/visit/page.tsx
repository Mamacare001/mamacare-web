import Link from "next/link";
import { notFound } from "next/navigation";
import { caseload } from "@/lib/mock/chw";
import { PageTitle, RiskPill } from "@/components/app/ui";
import { VisitForm } from "@/components/chw/VisitForm";

export const metadata = { title: "Record visit" };

export default async function VisitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = caseload.find((x) => x.id === id);
  if (!m) notFound();
  return (
    <div className="mx-auto max-w-3xl">
      <Link href={`/chw/mother/${m.id}`} className="text-sm font-semibold text-green">← {m.name}</Link>
      <PageTitle eyebrow={`Week ${m.weeks} · G${m.gravida} · current risk`} title="Home visit" action={<RiskPill risk={m.risk} />} />
      <VisitForm m={m} />
    </div>
  );
}
