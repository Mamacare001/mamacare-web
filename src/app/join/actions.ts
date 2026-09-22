"use server";

export type JoinState = { ok?: boolean; error?: string; ref?: string } | null;
const delay = (ms = 700) => new Promise((r) => setTimeout(r, ms));
const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const ref = (p: string) => `${p}-${Math.floor(1000 + Math.random() * 9000)}`;

/** Job application — a listed role or "write your own role". */
export async function submitApplication(_prev: JoinState, fd: FormData): Promise<JoinState> {
  if (!str(fd, "name")) return { error: "Tell us your name." };
  if (!str(fd, "contact")) return { error: "How do we reach you? An email or a phone number." };
  if (str(fd, "pitch").length < 40) return { error: "Give us a few sentences — what would you do here?" };
  const cv = fd.get("cv");
  if (cv instanceof File && cv.size > 5 * 1024 * 1024) return { error: "CV must be under 5 MB." };
  await delay(); // TODO: POST /talent/applications (multipart) → notify hiring inbox; auto-reply by email/SMS with the reference
  return { ok: true, ref: ref("APP") };
}

/** Idea box — anyone: mother, family, CHW, clinician, developer. */
export async function submitIdea(_prev: JoinState, fd: FormData): Promise<JoinState> {
  if (!str(fd, "title")) return { error: "Give your idea a name." };
  if (str(fd, "idea").length < 30) return { error: "A few more words — what would it do?" };
  await delay(); // TODO: POST /talent/ideas → product inbox; reply promised within 14 days
  return { ok: true, ref: ref("IDEA") };
}
