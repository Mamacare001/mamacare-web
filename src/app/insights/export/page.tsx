import { PageTitle } from "@/components/app/ui";
import { ExportForm } from "@/components/partner/ExportForm";

export const metadata = { title: "Export" };

export default function ExportPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow="Aggregates only" title="Export" />
      <ExportForm />
    </div>
  );
}
