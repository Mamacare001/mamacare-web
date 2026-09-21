import { chws, sectorMothers } from "@/lib/mock/supervisor";
import { PageTitle } from "@/components/app/ui";
import { ReassignForm } from "@/components/supervisor/ReassignForm";

export const metadata = { title: "Reassign" };

export default function ReassignPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow="Leave, overload, or a village with no CHW" title="Reassign mothers" />
      <ReassignForm chws={chws} mothers={sectorMothers} />
    </div>
  );
}
