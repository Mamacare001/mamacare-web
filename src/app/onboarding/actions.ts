"use server";

import { redirect } from "next/navigation";
import { randomBytes } from "node:crypto";
import { signIn } from "@/auth";
import { readOnboarding, writeOnboarding, clearOnboarding, type Role, type WorkerKind } from "@/lib/onboarding";

export type ActionState = { error?: string } | null;

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

/** Step 0 — phone submitted from the signup form: send OTP, go to /verify. */
export async function startSignup(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const name = str(fd, "name");
  const phone = str(fd, "phone").replace(/\s+/g, "");
  if (!name) return { error: "Please tell us your name." };
  if (!/^(\+?250|0)?7[2389]\d{7}$/.test(phone)) return { error: "Enter a valid Rwandan mobile number (e.g. 078 123 4567)." };
  const normalised = phone.startsWith("+") ? phone : phone.startsWith("0") ? "+25" + phone : phone.startsWith("250") ? "+" + phone : "+250" + phone;
  // TODO: call the API to send an OTP via SMS/WhatsApp. Demo code is 123456.
  await writeOnboarding({ name, phone: normalised, verified: false });
  redirect("/verify");
}

export async function verifyOtp(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const code = [1, 2, 3, 4, 5, 6].map((i) => str(fd, `d${i}`)).join("");
  if (code.length !== 6) return { error: "Enter the 6-digit code." };
  // TODO: verify against the API. Demo accepts 123456.
  if (code !== "123456") return { error: "That code is not right. Try again or resend." };
  const ob = await readOnboarding();
  await writeOnboarding({ verified: true });
  redirect(ob.role ? `/onboarding/${ob.role}` : "/onboarding/role");
}

export async function resendOtp(): Promise<void> {
  // TODO: call the API to resend. No-op in demo.
  await new Promise((r) => setTimeout(r, 300));
}

export async function chooseRole(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const role = str(fd, "role") as Role;
  if (!["mother", "family", "worker"].includes(role)) return { error: "Choose one option." };
  const language = (str(fd, "language") || "rw") as "rw" | "en";
  // A Google sign-up reaches here with no cookie yet: persist name/phone from the form's hidden fields.
  const patch: Parameters<typeof writeOnboarding>[0] = { role, language, verified: true };
  const name = str(fd, "name"); const phone = str(fd, "phone");
  if (name) patch.name = name;
  if (phone) patch.phone = phone;
  await writeOnboarding(patch);
  redirect(`/onboarding/${role}`);
}

export async function saveMother(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const edd = str(fd, "edd");
  const weeks = str(fd, "weeks");
  const district = str(fd, "district");
  if (!edd && !weeks) return { error: "Tell us your due date, or how many weeks pregnant you are." };
  if (!district) return { error: "Choose your district." };
  await writeOnboarding({
    role: "mother",
    channel: (str(fd, "channel") || "whatsapp") as "whatsapp" | "sms" | "app",
    mother: { edd, weeks, gravida: str(fd, "gravida"), district, facility: str(fd, "facility"), firstPregnancy: str(fd, "firstPregnancy") },
  });
  redirect("/onboarding/consent");
}

export async function saveFamily(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const motherCode = str(fd, "motherCode").toUpperCase().replace(/[^A-Z0-9]/g, "");
  const relation = str(fd, "relation");
  if (motherCode.length < 6) return { error: "Enter the 6-character code the mother shares with you." };
  if (!relation) return { error: "Tell us how you are related." };
  // TODO: look up the code via the API and create a pending link request for the mother to approve.
  await writeOnboarding({ role: "family", channel: (str(fd, "channel") || "whatsapp") as "whatsapp" | "sms" | "app", family: { motherCode, relation } });
  redirect("/onboarding/consent");
}

export async function saveWorker(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const kind = str(fd, "kind") as WorkerKind;
  const code = str(fd, "code").toUpperCase().replace(/[^A-Z0-9-]/g, "");
  const facility = str(fd, "facility");
  if (!["chw", "provider"].includes(kind)) return { error: "Choose your role." };
  if (!facility) return { error: "Enter your health facility." };
  if (code.length < 6) return { error: "Enter the invite code from your facility or supervisor." };
  // TODO: validate the invite code via the API; account stays pending until an admin approves.
  await writeOnboarding({ role: "worker", worker: { kind, facility, code, village: str(fd, "village") } });
  redirect("/onboarding/consent");
}

export async function acceptConsent(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const ob = await readOnboarding();
  if (!ob.role) redirect("/onboarding/role");
  const required = ["c1", "c2", "c3", "c4", "c5", "c6"];
  if (!required.every((k) => fd.get(k) === "on")) return { error: "Please read and tick every point to continue." };

  const token = randomBytes(16).toString("hex");
  await writeOnboarding({ consent: { agreed: true, at: new Date().toISOString() }, token });

  // TODO: create the account via the API, then sign in properly.
  // Demo: sign in through the credentials provider using the one-time onboarding token.
  const email = `${(ob.phone ?? "user").replace(/\D/g, "")}@onboarding.mamacare.rw`;
  await signIn("credentials", { email, password: `onboarding:${token}`, redirectTo: ob.role === "mother" ? "/app?welcome=1" : ob.role === "family" ? "/family?welcome=1" : ob.role === "worker" && ob.worker?.kind === "chw" ? "/chw?welcome=1" : ob.role === "worker" ? "/clinic?welcome=1" : "/dashboard?welcome=1" });
  return null;
}

export async function restartOnboarding() {
  await clearOnboarding();
  redirect("/onboarding/role");
}
