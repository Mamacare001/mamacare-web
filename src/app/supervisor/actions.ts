"use server";

import { revalidatePath } from "next/cache";

export type State = { ok?: boolean; error?: string; message?: string } | null;
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));
const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

export async function reassignEscalation(id: string, toChwId: string, reason: string) {
  void id; void toChwId; void reason;
  await delay(); // TODO: POST /escalations/{id}/reassign — audit-logged
  revalidatePath("/supervisor");
  revalidatePath("/supervisor/escalations");
  return { ok: true };
}

export async function nudgeChw(chwId: string, escalationId: string) {
  void chwId; void escalationId;
  await delay(300); // TODO: POST /notify — SMS + push to the CHW, logged
  return { ok: true };
}

export async function escalateToFacility(id: string) {
  void id;
  await delay(); // TODO: POST /escalations/{id}/escalate — facility in-charge notified
  revalidatePath("/supervisor/escalations");
  return { ok: true };
}

export async function reassignMothers(_prev: State, fd: FormData): Promise<State> {
  const from = str(fd, "from");
  const to = str(fd, "to");
  const ids = fd.getAll("mother").map(String);
  const reason = str(fd, "reason");
  if (!from || !to) return { error: "Choose both CHWs." };
  if (from === to) return { error: "Choose a different CHW to move to." };
  if (ids.length === 0) return { error: "Select at least one mother." };
  if (!reason) return { error: "Give a reason — it goes in the audit log and both CHWs are told." };
  await delay(700); // TODO: POST /assignments/move
  revalidatePath("/supervisor/mothers");
  return { ok: true, message: `${ids.length} mother${ids.length > 1 ? "s" : ""} moved. Both CHWs and the mothers have been notified.` };
}
