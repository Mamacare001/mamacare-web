import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { AppShell, chwNav } from "@/components/app/AppShell";
import { SyncStatus } from "@/components/chw/SyncStatus";

export const metadata = { title: { default: "MamaCare · CHW", template: "%s · MamaCare CHW" } };

export default async function ChwLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/chw");
  const name = session.user.name?.split(" ")[0] ?? "there";
  async function doSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }
  return (
    <AppShell name={name} signOutAction={doSignOut} nav={chwNav} status={<SyncStatus />}>
      {children}
    </AppShell>
  );
}
