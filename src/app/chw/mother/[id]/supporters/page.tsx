import Link from "next/link";
import { notFound } from "next/navigation";
import { caseload } from "@/lib/mock/chw";
import { PageTitle } from "@/components/app/ui";
import { SupporterForm } from "@/components/shared/SupporterForm";
import { addSupporter } from "@/app/chw/actions";

export const metadata = { title: "Add supporter" };

export default async function ChwSupportersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = caseload.find((x) => x.id === id);
  if (!m) notFound();
  return (
    <div className="mx-auto max-w-3xl">
      <Link href={`/chw/mother/${m.id}`} className="text-sm font-semibold text-green">← {m.name}</Link>
      <PageTitle eyebrow="Umuryango · family circle" title="Add a family supporter" />
      <p className="mb-6 text-sm text-muted">Someone at home who can spot danger signs and get her to care. They get an SMS invite; she confirms them from her own phone.</p>
      <SupporterForm motherId={m.id} motherName={m.name} action={addSupporter} back={`/chw/mother/${m.id}`} offlineCapable />
    </div>
  );
}
