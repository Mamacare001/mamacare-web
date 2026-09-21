import { supporter, mothers } from "@/lib/mock/family";
import { PageTitle } from "@/components/app/ui";
import { FamilySettingsForm } from "@/components/app/FamilySettingsForm";

export const metadata = { title: "Settings" };

export default function FamilySettingsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow={supporter.name} title="Settings" />
      <FamilySettingsForm language={supporter.language} channel={supporter.channel} mothers={mothers} />
    </div>
  );
}
