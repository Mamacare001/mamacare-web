import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotForm } from "@/components/auth/PasswordForms";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPage() {
  return (
    <AuthShell backHref="/login" backLabel="Back to sign in" quote="It happens. Let's fix it." sub="Tell us the email or phone number on your account.">
      <h1 className="text-h2 text-emerald">Forgot your password?</h1>
      <p className="mt-2 text-muted">We will send a link to reset it.</p>
      <div className="mt-8"><ForgotForm /></div>
    </AuthShell>
  );
}
