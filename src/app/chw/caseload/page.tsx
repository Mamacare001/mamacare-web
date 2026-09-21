import { caseload, chw } from "@/lib/mock/chw";
import { PageTitle } from "@/components/app/ui";
import { CaseloadList } from "@/components/chw/CaseloadList";

export const metadata = { title: "Caseload" };

export default async function CaseloadPage({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  const { filter } = await searchParams;
  return (
    <div className="mx-auto max-w-4xl">
      <PageTitle eyebrow={`${chw.village} & Rugando`} title="Caseload" />
      <CaseloadList mothers={caseload} initial={filter} />
    </div>
  );
}
