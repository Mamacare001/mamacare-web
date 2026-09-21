import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { notificationsByRole } from "@/lib/mock/shared";
import { AppShell, portalNav } from "@/components/app/AppShell";

export const metadata = { title: { default: "MamaCare · Research portal", template: "%s · MamaCare Research" } };

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/portal");
  const name = session.user.name?.split(" ").slice(0, 2).join(" ") ?? "there";
  async function doSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }
  return (
    <AppShell name={name} signOutAction={doSignOut} nav={portalNav} unread={(notificationsByRole[session.user.role ?? ""] ?? []).filter((n) => !n.read).length}>
      {children}
    </AppShell>
  );
}
