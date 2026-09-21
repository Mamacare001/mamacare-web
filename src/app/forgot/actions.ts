"use server";

export type ActionState = { ok?: boolean; error?: string } | null;

export async function requestReset(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const id = String(fd.get("identifier") ?? "").trim();
  if (!id) return { error: "Enter your email or phone number." };
  // TODO: call the API. Always respond the same way so we don't reveal which accounts exist.
  await new Promise((r) => setTimeout(r, 500));
  return { ok: true };
}

export async function resetPassword(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const pw = String(fd.get("password") ?? "");
  const pw2 = String(fd.get("password2") ?? "");
  if (pw.length < 8) return { error: "Use at least 8 characters." };
  if (pw !== pw2) return { error: "The two passwords do not match." };
  // TODO: verify the token from the URL and set the password via the API.
  await new Promise((r) => setTimeout(r, 500));
  return { ok: true };
}
