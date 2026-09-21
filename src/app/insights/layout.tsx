import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { AppShell, insightsNav, careNav } from "@/components/app/AppShell";

export const metadata = { title: { default: "MamaCare · Insights", template: "%s · MamaCare Insights" } };

export default async function InsightsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/insights");
  const name = session.user.name?.split(" ")[0] ?? "there";
  async function doSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }
  return (
    <AppShell name={name} signOutAction={doSignOut} nav={session.user.role === "care-manager" ? careNav : insightsNav}>
      {children}
    </AppShell>
  );
}
