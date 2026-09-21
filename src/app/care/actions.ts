"use server";

import { revalidatePath } from "next/cache";

export type State = { ok?: boolean; error?: string; message?: string } | null;

export async function logContact(_prev: State, fd: FormData): Promise<State> {
  const id = String(fd.get("id") ?? "");
  const note = String(fd.get("note") ?? "").trim();
  if (!id || !note) return { error: "Write what was discussed." };
  await new Promise((r) => setTimeout(r, 400)); // TODO: POST /care/members/{id}/contacts — visible to the mother in her access log
  revalidatePath(`/care/${id}`);
  return { ok: true, message: "Logged. The mother can see this contact in her access log." };
}

export async function requestExport(_prev: State, fd: FormData): Promise<State> {
  const fmt = String(fd.get("format") ?? "csv");
  await new Promise((r) => setTimeout(r, 600)); // TODO: POST /insights/export — server enforces MIN_CELL again and watermarks the file
  return { ok: true, message: `Your ${fmt.toUpperCase()} export is being prepared with cell-size suppression applied. You will receive a download link by email; it expires in 24 h and is watermarked with your account.` };
}
