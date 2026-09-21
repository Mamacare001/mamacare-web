import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { OtpForm } from "@/components/auth/OtpForm";
import { readOnboarding } from "@/lib/onboarding";

export const metadata: Metadata = { title: "Verify your number" };

export default async function VerifyPage() {
  const ob = await readOnboarding();
  if (!ob.phone) redirect("/login?mode=signup");
  if (ob.verified) redirect(ob.role ? `/onboarding/${ob.role}` : "/onboarding/role");
  return (
    <AuthShell backHref="/login?mode=signup" backLabel="Change number" quote="One code. Then we begin." sub="We sent a 6-digit code by SMS. It expires in 10 minutes.">
      <p className="text-eyebrow text-green">Step 1 of 4</p>
      <h1 className="text-h2 mt-3 text-emerald">Enter the code we sent you</h1>
      <p className="mt-2 text-muted">Muraho {ob.name?.split(" ")[0]}. Andika kode y’imibare 6 twakoherereje.</p>
      <div className="mt-8">
        <OtpForm phone={ob.phone} />
      </div>
    </AuthShell>
  );
}
