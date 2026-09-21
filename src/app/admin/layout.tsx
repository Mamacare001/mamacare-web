import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = { title: { default: "MamaCare · Admin", template: "%s · MamaCare Admin" } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/admin");
  if (session.user.role !== "admin") redirect("/dashboard");
  async function doSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }
  return (
    <AdminShell name={session.user.name ?? "Admin"} roles="iam-admin · release-manager" signOutAction={doSignOut}>
      {children}
    </AdminShell>
  );
}
