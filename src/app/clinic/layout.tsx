import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { notificationsByRole } from "@/lib/mock/shared";
import { AppShell, clinicNav } from "@/components/app/AppShell";

export const metadata = { title: { default: "MamaCare · Clinic", template: "%s · MamaCare Clinic" } };

export default async function ClinicLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/clinic");
  const name = session.user.name?.split(" ").slice(0, 2).join(" ") ?? "there";
  async function doSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }
  return (
    <AppShell name={name} signOutAction={doSignOut} nav={clinicNav} unread={(notificationsByRole[session.user.role ?? ""] ?? []).filter((n) => !n.read).length}>
      {children}
    </AppShell>
  );
}
