import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { ResetForm } from "@/components/auth/PasswordForms";

export const metadata: Metadata = { title: "Reset password" };

export default async function ResetPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <AuthShell backHref="/login" backLabel="Back to sign in" quote="Choose something you will remember." sub="Your new password protects a mother's health record. Make it a good one.">
      <h1 className="text-h2 text-emerald">Set a new password</h1>
      <div className="mt-8"><ResetForm token={token} /></div>
    </AuthShell>
  );
}
