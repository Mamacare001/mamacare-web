"use server";

import { revalidatePath } from "next/cache";

/** All mother-app mutations. Each is a stub — replace the body with an API call. */
export type State = { ok?: boolean; error?: string; message?: string } | null;
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export async function approveMember(id: string) {
  void id;
  await delay(); // TODO: POST /circle/{id}/approve
  revalidatePath("/app/circle");
}
export async function removeMember(id: string) {
  void id;
  await delay(); // TODO: DELETE /circle/{id}
  revalidatePath("/app/circle");
}
export async function toggleRiskVisibility(id: string, visible: boolean) {
  void id; void visible;
  await delay(); // TODO: PATCH /circle/{id} { canSeeRisk }
  revalidatePath("/app/circle");
}
export async function updateProfile(_prev: State, fd: FormData): Promise<State> {
  const name = String(fd.get("name") ?? "").trim();
  if (!name) return { error: "Name cannot be empty." };
  await delay(); // TODO: PATCH /me
  revalidatePath("/app/profile");
  return { ok: true, message: "Profile updated." };
}
export async function updateSettings(_prev: State, fd: FormData): Promise<State> {
  void fd;
  await delay(); // TODO: PATCH /me/settings
  revalidatePath("/app/settings");
  return { ok: true, message: "Settings saved." };
}
export async function requestExport(_prev: State, _fd: FormData): Promise<State> {
  void _fd;
  await delay(800); // TODO: POST /me/export → the API emails/SMSes a download link
  return { ok: true, message: "We are preparing your file. You will get a link by SMS within an hour." };
}
export async function requestDeletion(_prev: State, fd: FormData): Promise<State> {
  if (String(fd.get("confirm") ?? "") !== "DELETE") return { error: "Type DELETE to confirm." };
  await delay(800); // TODO: POST /me/delete → starts the retention-policy review
  return { ok: true, message: "Deletion requested. Our Data Protection Officer will confirm by SMS within 5 working days." };
}
