"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { demoEnabled, DEMO_OTP } from "@/lib/demo";

export type State = { ok?: boolean; error?: string; message?: string } | null;
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));
const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

/* MFA step-up: admin routes require a fresh second factor. Demo code 123456. In production: WebAuthn / TOTP via the IdP. */
export async function verifyAdminMfa(_prev: State, fd: FormData): Promise<State> {
  const code = [1, 2, 3, 4, 5, 6].map((i) => str(fd, `d${i}`)).join("");
  if (!demoEnabled) return { error: "MFA is not connected to the identity provider yet." }; // TODO: WebAuthn / TOTP
  if (code !== DEMO_OTP) return { error: "Code not accepted." };
  (await cookies()).set("mc_admin_mfa", "1", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/admin", maxAge: 60 * 30 });
  redirect(str(fd, "next") || "/admin");
}

export async function approveUser(id: string) {
  void id; await delay(); // TODO: POST /users/{id}/approve — second approver must differ from first (enforced server-side)
  revalidatePath("/admin/users");
}
export async function suspendUser(id: string, reason: string) {
  void id; void reason; await delay(); // TODO: POST /users/{id}/suspend — removes all roles within minutes, sessions revoked
  revalidatePath("/admin/users");
}
export async function renewUser(id: string) {
  void id; await delay(); // TODO: POST /users/{id}/renew — +90 d internal / contract end partner
  revalidatePath("/admin/users");
}
export async function createInvite(_prev: State, fd: FormData): Promise<State> {
  if (!str(fd, "org")) return { error: "Choose an organisation." };
  await delay();
  const code = `${str(fd, "kind").toUpperCase().slice(0, 3)}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  revalidatePath("/admin/invites");
  return { ok: true, message: code };
}
export async function submitRulesForReview() { await delay(); revalidatePath("/admin/rules"); }
export async function approveRules() { await delay(); revalidatePath("/admin/rules"); } // clinical-lead only
export async function deployRules() { await delay(600); revalidatePath("/admin/rules"); } // release-manager only, requires approval
export async function promoteModel(id: string) { void id; await delay(); revalidatePath("/admin/models"); }
export async function saveContent(_prev: State, fd: FormData): Promise<State> {
  if (!str(fd, "rw")) return { error: "Kinyarwanda text required." };
  await delay(); revalidatePath("/admin/content");
  return { ok: true, message: "Saved to staging. A translator must review before publish." };
}
export async function updateCaseReview(id: string, status: string) { void id; void status; await delay(); revalidatePath("/admin/case-review"); }
export async function fulfilRequest(id: string) { void id; await delay(); revalidatePath("/admin/consent"); }
export async function markBreakGlassReviewed(id: string, note: string) { void id; void note; await delay(); revalidatePath("/admin/break-glass"); }
export async function rotateKey(name: string) { void name; await delay(800); revalidatePath("/admin/integrations"); }
export async function assignTicket(id: string) { void id; await delay(); revalidatePath("/admin/support"); }
export async function toggleFlag(key: string, on: boolean) { void key; void on; await delay(200); revalidatePath("/admin/settings"); }

/* ---------------- Talent & ideas ---------------- */
export async function setApplicationStatus(id: string, status: string, note?: string) {
  void id; void status; void note; await delay(400); // TODO: PATCH /talent/applications/{id} { status, note } → candidate emailed on interview/offer/declined
  revalidatePath("/admin/talent");
  return { ok: true };
}
export async function setIdeaStatus(id: string, status: string, reply?: string) {
  void id; void status; void reply; await delay(400); // TODO: PATCH /talent/ideas/{id} { status, reply } → submitter notified with the reply
  revalidatePath("/admin/talent");
  return { ok: true };
}
