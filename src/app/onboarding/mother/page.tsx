import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { MotherForm } from "@/components/auth/OnboardingForms";
import { STEPS, DISTRICTS } from "@/lib/onboarding";
import { requireOnboardingAccess } from "@/lib/onboarding-guard";

export const metadata: Metadata = { title: "Your pregnancy" };

export default async function MotherPage() {
  const ob = await requireOnboardingAccess();
  return (
    <AuthShell steps={STEPS.mother} current="/onboarding/mother" backHref="/onboarding/role" backLabel="Back" image="/images/mother-home-phone.jpg" quote="A few details, so guidance fits your weeks." sub="Everything here can be updated later, and only your care circle sees it.">
      <p className="text-eyebrow text-green">Step 3 of 4</p>
      <h1 className="text-h2 mt-3 text-emerald">About your pregnancy</h1>
      <p className="mt-2 text-muted">Ibyerekeye inda yawe. Approximate answers are fine.</p>
      <div className="mt-8"><MotherForm ob={ob} districts={DISTRICTS} /></div>
    </AuthShell>
  );
}
