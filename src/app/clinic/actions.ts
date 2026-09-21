"use server";

import { revalidatePath } from "next/cache";

export type State = { ok?: boolean; error?: string; message?: string } | null;
const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));
const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

export async function setQueueStatus(id: string, status: "in-progress" | "seen" | "referred-up") {
  void id; void status;
  await delay(300); // TODO: PATCH /queue/{id}
  revalidatePath("/clinic"); revalidatePath("/clinic/queue");
  return { ok: true };
}

/** Clinical encounter. Returns a suggested impression from the rules; the clinician's own impression is authoritative. */
export async function recordEncounter(_prev: State, fd: FormData): Promise<State> {
  const motherId = str(fd, "motherId");
  if (!motherId) return { error: "Missing mother." };
  if (!str(fd, "impression")) return { error: "Enter your clinical impression." };
  if (!str(fd, "plan")) return { error: "Enter the plan." };
  const feedback = str(fd, "chwFeedback");
  await delay(700); // TODO: POST /encounters — also closes the open escalation and sends chwFeedback to the CHW
  revalidatePath(`/clinic/mother/${motherId}`); revalidatePath("/clinic/close-loop"); revalidatePath("/clinic");
  return { ok: true, message: feedback ? "Encounter saved. The CHW has been sent your feedback and the escalation is closed." : "Encounter saved. Remember to close the loop with the CHW." };
}

export async function sendFeedback(_prev: State, fd: FormData): Promise<State> {
  const id = str(fd, "id");
  const outcome = str(fd, "outcome");
  const text = str(fd, "text");
  if (!id || !outcome) return { error: "Choose an outcome." };
  if (!text) return { error: "Write one line for the CHW — what happened and what they should do next." };
  await delay(500); // TODO: POST /referrals/{id}/feedback → CHW app + SMS; escalation → closed
  revalidatePath("/clinic/close-loop");
  return { ok: true, message: "Sent to the CHW. Escalation closed." };
}

export async function referUp(_prev: State, fd: FormData): Promise<State> {
  const motherId = str(fd, "motherId");
  const reason = str(fd, "reason");
  if (!reason) return { error: "Give the reason for referral." };
  await delay(600); // TODO: POST /referrals/up — DH notified, ambulance requested if ticked, CHW informed
  revalidatePath(`/clinic/mother/${motherId}`);
  return { ok: true, message: `Referral sent to Kibagabaga District Hospital${fd.get("ambulance") === "on" ? ". Ambulance requested" : ""}. The CHW has been informed.` };
}

export async function recordOutcome(_prev: State, fd: FormData): Promise<State> {
  const motherId = str(fd, "motherId");
  const type = str(fd, "type");
  if (!type) return { error: "Choose the outcome." };
  await delay(600); // TODO: POST /outcomes — closes the pregnancy episode; CHW notified for postnatal follow-up
  revalidatePath(`/clinic/mother/${motherId}`);
  return { ok: true, message: "Outcome recorded. The CHW has been notified to start postnatal follow-up (days 1, 3, 7)." };
}

export async function requestStaffAccount(_prev: State, fd: FormData): Promise<State> {
  if (!str(fd, "name") || !str(fd, "email")) return { error: "Name and work email are required." };
  await delay(500); // TODO: POST /accounts/request → iam-admin two-person approval
  revalidatePath("/clinic/staff");
  return { ok: true, message: "Request sent. MamaCare admin and your in-charge must both approve; usually within 1 working day." };
}
