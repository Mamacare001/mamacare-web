import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { readOnboarding, type Onboarding } from "@/lib/onboarding";

/**
 * Onboarding steps are reachable after phone verification, or with a signed-in session
 * (e.g. a Google sign-up). Read-only: pages cannot set cookies, so nothing is written here.
 */
export async function requireOnboardingAccess(): Promise<Onboarding> {
  const ob = await readOnboarding();
  if (ob.verified) return ob;
  const session = await auth();
  if (session?.user) {
    return { ...ob, verified: true, name: ob.name ?? session.user.name ?? undefined, phone: ob.phone ?? session.user.email ?? undefined };
  }
  redirect(ob.phone ? "/verify" : "/login?mode=signup");
}
