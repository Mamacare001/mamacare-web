import { redirect } from "next/navigation";
import { readOnboarding } from "@/lib/onboarding";

export default async function OnboardingIndex() {
  const ob = await readOnboarding();
  if (!ob.phone) redirect("/login?mode=signup");
  if (!ob.verified) redirect("/verify");
  redirect(ob.role ? `/onboarding/${ob.role}` : "/onboarding/role");
}
