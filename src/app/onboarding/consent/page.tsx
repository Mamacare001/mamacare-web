import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { ConsentForm } from "@/components/auth/OnboardingForms";
import { STEPS } from "@/lib/onboarding";
import { requireOnboardingAccess } from "@/lib/onboarding-guard";

export const metadata: Metadata = { title: "Consent" };

export default async function ConsentStepPage() {
  const ob = await requireOnboardingAccess();
  if (!ob.role) redirect("/onboarding/role");
  const back = `/onboarding/${ob.role}`;
  return (
    <AuthShell steps={STEPS[ob.role]} current="/onboarding/consent" backHref={back} backLabel="Back" image="/images/mother-outdoors.jpg" quote="Your information, your control." sub="Six points, written to be read. Tick each one to continue.">
      <p className="text-eyebrow text-green">Step 4 of 4</p>
      <h1 className="text-h2 mt-3 text-emerald">Before we begin</h1>
      <p className="mt-2 text-muted">Uburenganzira bwawe. This is what you are agreeing to.</p>
      <div className="mt-8"><ConsentForm ob={ob} /></div>
    </AuthShell>
  );
}
