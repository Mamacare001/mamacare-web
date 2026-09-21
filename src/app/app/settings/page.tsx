import { profile } from "@/lib/mock/mother";
import { PageTitle } from "@/components/app/ui";
import { SettingsForm } from "@/components/app/SettingsForms";

export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow="Igenamiterere" title="Settings" />
      <SettingsForm p={profile} />
    </div>
  );
}
