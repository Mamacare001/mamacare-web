"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dangerSignChecklist } from "@/lib/mock/chw";
import type { Risk } from "@/lib/mock/mother";

export type State = { ok?: boolean; error?: string; message?: string; risk?: Risk; action?: string } | null;
const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));
const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

/** Visit form: observations + measurements + danger-sign checklist → rule-based recommendation. */
export async function recordVisit(_prev: State, fd: FormData): Promise<State> {
  const motherId = str(fd, "motherId");
  if (!motherId) return { error: "Missing mother." };
  const sys = Number(str(fd, "bp_sys")) || 0;
  const dia = Number(str(fd, "bp_dia")) || 0;
  const temp = Number(str(fd, "temp")) || 0;
  const signs = dangerSignChecklist.filter((s) => fd.get(`sign_${s.id}`) === "on");
  const urgent = signs.some((s) => s.urgent);
  const htn = sys >= 140 || dia >= 90;
  const preeclampsia = htn && signs.some((s) => ["headache", "vision", "swelling"].includes(s.id));
  const fever = temp >= 38;
  const movement = signs.some((s) => s.id === "movement");

  let risk: Risk = "low";
  let action = "Routine: continue ANC schedule. Next visit as planned.";
  if (urgent || preeclampsia || (sys >= 160 || dia >= 110)) {
    risk = "high";
    action = "Refer to Kinyinya Health Centre NOW. Arrange transport. Call the facility to say you are coming.";
  } else if (htn || fever || movement || signs.length >= 2) {
    risk = "moderate";
    action = "Refer to the health centre within 24 hours. Recheck BP/temperature. Record kick count if movement reduced.";
  } else if (signs.length === 1) {
    risk = "moderate";
    action = "Follow up within 3 days. Counsel on danger signs. Refer if it persists or worsens.";
  }

  await delay(); // TODO: POST /visits — the server re-runs the rules; client-side result is provisional.
  revalidatePath(`/chw/mother/${motherId}`);
  revalidatePath("/chw");
  return { ok: true, risk, action, message: "Visit recorded." };
}

export async function updateEscalation(id: string, status: "acknowledged" | "acted" | "closed", note?: string) {
  void id; void note;
  await delay(300); // TODO: PATCH /escalations/{id}
  revalidatePath("/chw/escalations");
  revalidatePath("/chw");
  return { ok: true, status };
}

export async function createReferral(_prev: State, fd: FormData): Promise<State> {
  const motherId = str(fd, "motherId");
  const urgency = str(fd, "urgency");
  const reason = str(fd, "reason");
  if (!motherId) return { error: "Choose the mother." };
  if (!reason) return { error: "Say why you are referring her." };
  await delay(); // TODO: POST /referrals → facility notified, transport requested if urgent
  return { ok: true, message: urgency === "now" ? "Referral sent. Kinyinya HC notified. Transport requested." : "Referral sent. Kinyinya HC will expect her within 24 hours." };
}

export async function enrolMother(_prev: State, fd: FormData): Promise<State> {
  const name = str(fd, "name");
  const phone = str(fd, "phone").replace(/\s+/g, "");
  if (!name) return { error: "Enter her name." };
  if (!/^(\+?250|0)?7[2389]\d{7}$/.test(phone)) return { error: "Enter a valid mobile number." };
  const code = Array.from({ length: 6 }, () => "ABCDEFGHJKMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 31)]).join("");
  await delay(); // TODO: POST /mothers → returns invite code; SMS sent to her with the link
  return { ok: true, message: code };
}

export async function syncQueued(kind: string, payload: Record<string, string>): Promise<{ ok: boolean }> {
  // Replays an item recorded offline. Each kind maps to the same server-side handler as the online path.
  const fd = new FormData();
  Object.entries(payload).forEach(([k, v]) => fd.append(k, v));
  if (kind === "visit") await recordVisit(null, fd);
  else if (kind === "referral") await createReferral(null, fd);
  else if (kind === "enrol") await enrolMother(null, fd);
  else await delay(200);
  return { ok: true };
}

export async function goToMother(fd: FormData) {
  redirect(`/chw/mother/${str(fd, "id")}`);
}
