import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { AppShell, careNav } from "@/components/app/AppShell";

export const metadata = { title: { default: "MamaCare · Care management", template: "%s · MamaCare Care" } };

export default async function CareLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/care");
  const name = session.user.name?.split(" ")[0] ?? "there";
  async function doSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }
  return (
    <AppShell name={name} signOutAction={doSignOut} nav={careNav}>
      {children}
    </AppShell>
  );
}
