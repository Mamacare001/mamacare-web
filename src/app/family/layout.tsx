import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { notificationsByRole } from "@/lib/mock/shared";
import { AppShell, familyNav } from "@/components/app/AppShell";

export const metadata = { title: { default: "MamaCare · Family", template: "%s · MamaCare" } };

export default async function FamilyLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/family");
  const name = session.user.name?.split(" ")[0] ?? "there";
  async function doSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }
  return (
    <AppShell name={name} signOutAction={doSignOut} nav={familyNav} unread={(notificationsByRole[session.user.role ?? ""] ?? []).filter((n) => !n.read).length}>
      {children}
    </AppShell>
  );
}
