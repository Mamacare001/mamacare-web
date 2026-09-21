import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { notificationsByRole } from "@/lib/mock/shared";
import { AppShell, supervisorNav } from "@/components/app/AppShell";

export const metadata = { title: { default: "MamaCare · Supervisor", template: "%s · MamaCare Supervisor" } };

export default async function SupervisorLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/supervisor");
  const name = session.user.name?.split(" ")[0] ?? "there";
  async function doSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }
  return (
    <AppShell name={name} signOutAction={doSignOut} nav={supervisorNav} unread={(notificationsByRole[session.user.role ?? ""] ?? []).filter((n) => !n.read).length}>
      {children}
    </AppShell>
  );
}
