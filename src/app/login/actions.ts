"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export async function signInWithGoogle(formData: FormData) {
  const callbackUrl = String(formData.get("callbackUrl") ?? "/dashboard");
  await signIn("google", { redirectTo: callbackUrl });
}

export type CredState = { error?: string } | null;

export async function signInWithEmail(_prev: CredState, formData: FormData): Promise<CredState> {
  const callbackUrl = String(formData.get("callbackUrl") ?? "/dashboard");
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: callbackUrl,
    });
    return null;
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: err.type === "CredentialsSignin" ? "Incorrect email or password." : "Sign-in failed. Please try again." };
    }
    throw err; // NEXT_REDIRECT must propagate
  }
}
