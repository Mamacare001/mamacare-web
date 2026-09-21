import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { FamilyForm } from "@/components/auth/OnboardingForms";
import { STEPS } from "@/lib/onboarding";
import { requireOnboardingAccess } from "@/lib/onboarding-guard";

export const metadata: Metadata = { title: "Link to a mother" };

export default async function FamilyPage() {
  const ob = await requireOnboardingAccess();
  return (
    <AuthShell steps={STEPS.family} current="/onboarding/family" backHref="/onboarding/role" backLabel="Back" image="/images/family-together.jpg" quote="You notice things she might not mention." sub="Link to her with her code. She approves before you see anything.">
      <p className="text-eyebrow text-green">Step 3 of 4</p>
      <h1 className="text-h2 mt-3 text-emerald">Who are you supporting?</h1>
      <p className="mt-2 text-muted">Ask her for her MamaCare code. She stays in control of what you see.</p>
      <div className="mt-8"><FamilyForm ob={ob} /></div>
    </AuthShell>
  );
}
