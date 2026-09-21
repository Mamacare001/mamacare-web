import { RoleShell, currentRole } from "@/components/shared/RoleShell";
import { notificationsByRole } from "@/lib/mock/shared";
import { NotificationList } from "@/components/shared/NotificationList";
import { PageTitle } from "@/components/app/ui";

export const metadata = { title: "Notifications" };

export default async function NotificationsPage() {
  const { role } = await currentRole();
  const items = notificationsByRole[role] ?? [];
  return (
    <RoleShell callback="/notifications">
      <div className="mx-auto max-w-3xl">
        <PageTitle eyebrow="Inbox" title="Notifications" />
        <NotificationList items={items} />
        <p className="mt-4 text-xs text-muted">High-risk escalations are always also sent by SMS and push, whatever your notification settings.</p>
      </div>
    </RoleShell>
  );
}
