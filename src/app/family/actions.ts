"use server";

import { revalidatePath } from "next/cache";
import { observationSigns } from "@/lib/mock/family";
import type { Risk } from "@/lib/mock/mother";

export type ReportResult = {
  ok: true;
  risk: Risk;
  headline: string;
  steps: string[];
  notified: string[];
} | { ok: false; error: string } | null;

/**
 * Family observation report. In production this goes through the same
 * understand → assess → rules pipeline as the mother's own check-in, and the
 * mother is notified that a report was made about her.
 * Demo: a weighted sum over the ticked signs, mirroring the clinical rule set v0.
 */
export async function submitObservation(_prev: ReportResult, fd: FormData): Promise<ReportResult> {
  const motherId = String(fd.get("motherId") ?? "");
  const signs = observationSigns.filter((s) => fd.get(`sign_${s.id}`) === "on");
  const note = String(fd.get("note") ?? "").trim();
  const when = String(fd.get("when") ?? "now");
  if (!motherId) return { ok: false, error: "Choose who you are reporting about." };
  if (signs.length === 0 && !note) return { ok: false, error: "Tick at least one sign, or describe what you noticed." };

  const ids = new Set(signs.map((s) => s.id));
  const immediate = ids.has("bleeding") || ids.has("fits") || ids.has("waters");
  const score = signs.reduce((n, s) => n + s.weight, 0) + (ids.has("headache") && (ids.has("vision") || ids.has("swelling")) ? 3 : 0) + (when === "days" ? 1 : 0);
  const risk: Risk = immediate || score >= 6 ? "high" : score >= 3 ? "moderate" : "low";

  await new Promise((r) => setTimeout(r, 700)); // TODO: POST /reports

  if (risk === "high")
    return { ok: true, risk, headline: "Take her to the health centre now.", steps: ["Do not wait to see if it passes.", "Use the transport in her emergency plan, or call 912.", "Bring her ANC card and mutuelle card.", "Tell the CHW you are on the way — she has been alerted."], notified: ["Marie (CHW)", "Kinyinya Health Centre", "Uwase"] };
  if (risk === "moderate")
    return { ok: true, risk, headline: "She should be seen by a health worker within 24 hours.", steps: ["Encourage her to rest and drink water.", "Marie (CHW) has been notified and will contact her.", "If anything gets worse — especially bleeding, fits, or blurred vision — go to the facility immediately."], notified: ["Marie (CHW)", "Uwase"] };
  return { ok: true, risk, headline: "Thank you. This has been added to her record.", steps: ["Keep an eye on her and report again if it continues or changes.", "Her CHW will see this at the next check-in."], notified: ["Uwase"] };
}

export async function acknowledgeUpdate(id: string) {
  void id;
  revalidatePath("/family"); // TODO: PATCH /updates/{id}/ack
}

export type State = { ok?: boolean; error?: string; message?: string } | null;
export async function updateFamilySettings(_prev: State, fd: FormData): Promise<State> {
  void fd;
  await new Promise((r) => setTimeout(r, 400)); // TODO: PATCH /me/settings
  revalidatePath("/family/settings");
  return { ok: true, message: "Settings saved." };
}
export async function unlinkMother(id: string) {
  void id;
  await new Promise((r) => setTimeout(r, 400)); // TODO: DELETE /links/{id}
  revalidatePath("/family");
}
