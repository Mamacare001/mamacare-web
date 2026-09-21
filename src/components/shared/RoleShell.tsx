import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { AppShell, motherNav, familyNav, chwNav, supervisorNav, clinicNav, insightsNav, careNav, portalNav } from "@/components/app/AppShell";
import { AdminShell } from "@/components/admin/AdminShell";
import { notificationsByRole } from "@/lib/mock/shared";

const navs = { mother: motherNav, family: familyNav, chw: chwNav, supervisor: supervisorNav, provider: clinicNav, analyst: insightsNav, "care-manager": careNav, researcher: portalNav } as const;

/** Wraps a shared page (notifications, help, switch-role) in whichever shell matches the signed-in role. */
export async function RoleShell({ children, callback }: { children: React.ReactNode; callback: string }) {
  const session = await auth();
  if (!session?.user) redirect(`/login?callbackUrl=${encodeURIComponent(callback)}`);
  const role = session.user.role ?? "mother";
  const name = session.user.name?.split(" ")[0] ?? "there";
  async function doSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }
  if (role === "admin") return <AdminShell name={session.user.name ?? "Admin"} roles="iam-admin · release-manager" signOutAction={doSignOut}>{children}</AdminShell>;
  const nav = navs[role as keyof typeof navs] ?? motherNav;
  return <AppShell name={name} signOutAction={doSignOut} nav={nav} unread={(notificationsByRole[role] ?? []).filter((n) => !n.read).length}>{children}</AppShell>;
}

export async function currentRole() {
  const session = await auth();
  return { role: session?.user?.role ?? "mother", name: session?.user?.name ?? "" };
}
