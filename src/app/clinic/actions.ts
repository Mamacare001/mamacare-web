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

const phoneOk = (p: string) => /^(\+?250|0)?7[2389]\d{7}$/.test(p.replace(/\s+/g, ""));

/** ANC booking at the facility. Creates the mother record, assigns a CHW, sends her the invite SMS. */
export async function enrolMotherAtClinic(_prev: State, fd: FormData): Promise<State> {
  const name = str(fd, "name");
  const phone = str(fd, "phone");
  const chwId = str(fd, "chwId");
  if (!name) return { error: "Enter her name." };
  if (!phoneOk(phone)) return { error: "Enter a valid mobile number." };
  if (!str(fd, "weeks") && !str(fd, "lmp")) return { error: "Enter gestational age (weeks) or the date of her last period." };
  if (!chwId) return { error: "Assign a CHW so she is followed at home between visits." };
  const supName = str(fd, "supName");
  if (supName && !phoneOk(str(fd, "supPhone"))) return { error: "Enter a valid mobile number for the supporter, or leave the supporter section empty." };
  const code = Array.from({ length: 6 }, () => "ABCDEFGHJKMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 31)]).join("");
  await delay(700); // TODO: POST /mothers { …, enrolledBy: facility, chwId } → invite code + SMS; CHW notified of the new assignment; optional POST /mothers/{id}/supporters
  revalidatePath("/clinic"); revalidatePath("/clinic/queue");
  return { ok: true, message: code };
}

/** Add a family supporter from the clinic (same rules as the CHW path: SMS invite, mother confirms). */
export async function addSupporterAtClinic(_prev: State, fd: FormData): Promise<State> {
  const motherId = str(fd, "motherId");
  const name = str(fd, "name");
  if (!motherId) return { error: "Missing mother." };
  if (!name) return { error: "Enter the supporter’s name." };
  if (!phoneOk(str(fd, "phone"))) return { error: "Enter a valid mobile number." };
  await delay(); // TODO: POST /mothers/{motherId}/supporters — status "invited" until she confirms from her phone
  revalidatePath(`/clinic/mother/${motherId}`);
  return { ok: true, message: `${name} has been sent an SMS invite. They become active once she confirms them from her phone.` };
}

/** Routine ANC visit report (scheduled visit, not a referral encounter). Rule hints only; the clinician's plan is authoritative. */
export async function recordAncVisit(_prev: State, fd: FormData): Promise<State> {
  const motherId = str(fd, "motherId");
  if (!motherId) return { error: "Missing mother." };
  if (!str(fd, "visitNo")) return { error: "Which ANC visit is this?" };
  if (!str(fd, "sys") || !str(fd, "dia")) return { error: "Blood pressure is required at every ANC visit." };
  if (!str(fd, "nextVisit")) return { error: "Set the next appointment date — she and her CHW get the reminder." };
  const sys = Number(str(fd, "sys")), dia = Number(str(fd, "dia"));
  const signs = fd.getAll("signs").map(String);
  const flagged = sys >= 140 || dia >= 90 || signs.length > 0;
  await delay(700); // TODO: POST /anc-visits → updates ANC count, next-visit reminder (SMS to her + CHW), and re-scores risk
  revalidatePath(`/clinic/mother/${motherId}`); revalidatePath("/clinic");
  return { ok: true, message: flagged ? "Visit saved. Findings raised her risk level — her CHW has been notified to follow up at home this week." : "Visit saved. She and her CHW will get a reminder before the next appointment." };
}
