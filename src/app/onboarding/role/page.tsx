import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { RoleForm } from "@/components/auth/OnboardingForms";
import { STEPS } from "@/lib/onboarding";
import { requireOnboardingAccess } from "@/lib/onboarding-guard";

export const metadata: Metadata = { title: "Who are you?" };

export default async function RolePage() {
  const ob = await requireOnboardingAccess();
  return (
    <AuthShell steps={STEPS[ob.role ?? "mother"]} current="/onboarding/role" backHref="/verify" backLabel="Back" image="/images/family-together.jpg" quote="Four voices. One picture." sub="Tell us which voice you are so we can set MamaCare up for you.">
      <p className="text-eyebrow text-green">Step 2 of 4</p>
      <h1 className="text-h2 mt-3 text-emerald">Who are you, {ob.name?.split(" ")[0]}?</h1>
      <p className="mt-2 text-muted">Uri nde? You can change this later.</p>
      <div className="mt-8"><RoleForm ob={ob} /></div>
    </AuthShell>
  );
}
