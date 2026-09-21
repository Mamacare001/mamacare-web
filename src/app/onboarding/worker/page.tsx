import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { WorkerForm } from "@/components/auth/OnboardingForms";
import { STEPS } from "@/lib/onboarding";
import { requireOnboardingAccess } from "@/lib/onboarding-guard";

export const metadata: Metadata = { title: "Your facility" };

export default async function WorkerPage() {
  const ob = await requireOnboardingAccess();
  return (
    <AuthShell steps={STEPS.worker} current="/onboarding/worker" backHref="/onboarding/role" backLabel="Back" image="/images/chw-visit.jpg" quote="One timeline. No retyping. A closed loop." sub="Health-worker accounts are approved by your facility, so a mother’s record only reaches the people caring for her.">
      <p className="text-eyebrow text-green">Step 3 of 4</p>
      <h1 className="text-h2 mt-3 text-emerald">Your role and facility</h1>
      <p className="mt-2 text-muted">You will need the invite code from your in-charge or supervisor.</p>
      <div className="mt-8"><WorkerForm ob={ob} /></div>
    </AuthShell>
  );
}
