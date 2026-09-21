import Link from "next/link";
import { PageTitle } from "@/components/app/ui";
import { ExportCard, DeleteCard } from "@/components/app/SettingsForms";

export const metadata = { title: "My data" };

export default function DataPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <PageTitle eyebrow="Your rights" title="My data" />
      <p className="text-muted">Under Rwanda’s data-protection law you can see, take, or delete what we hold about you. Read the <Link href="/privacy" className="font-semibold text-green underline underline-offset-4">privacy policy</Link> and <Link href="/app/access-log" className="font-semibold text-green underline underline-offset-4">who has viewed your record</Link>.</p>
      <ExportCard />
      <DeleteCard />
    </div>
  );
}
