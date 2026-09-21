import { RoleShell, currentRole } from "@/components/shared/RoleShell";
import { helpByRole, roleLabel } from "@/lib/mock/shared";
import { HelpCentre } from "@/components/shared/HelpCentre";
import { PageTitle } from "@/components/app/ui";

export const metadata = { title: "Help" };

export default async function HelpPage() {
  const { role } = await currentRole();
  return (
    <RoleShell callback="/help">
      <div className="mx-auto max-w-3xl">
        <PageTitle eyebrow={`For ${roleLabel[role] ?? "you"}`} title="Help" />
        <HelpCentre sections={helpByRole[role] ?? helpByRole.mother} roleLabel={roleLabel[role] ?? "user"} />
      </div>
    </RoleShell>
  );
}
