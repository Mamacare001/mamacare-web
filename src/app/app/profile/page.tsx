import { profile } from "@/lib/mock/mother";
import { PageTitle, Card } from "@/components/app/ui";
import { ProfileForm } from "@/components/app/SettingsForms";

export const metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow="Umwirondoro" title="Your profile" />
      <Card><ProfileForm p={profile} /></Card>
    </div>
  );
}
