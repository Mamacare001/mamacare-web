"use server";

export type ContactState = { ok: boolean; message: string } | null;

/**
 * Contact form handler. Wire this to your email provider or CRM
 * (Resend, SendGrid, HubSpot…) --- for now it validates and logs.
 */
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const org = String(formData.get("org") ?? "").trim();
  const topic = String(formData.get("topic") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) return { ok: false, message: "Please fill in your name, email and message." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: "That email address doesn't look right." };

  // TODO: replace with a real delivery. Example with Resend:
  // await resend.emails.send({ from: "MamaCare <hello@mamacare.rw>", to: "team@mamacare.rw", subject: `[${topic}] ${name}`, text: message });
  console.info("[contact]", { name, email, org, topic, message });
  await new Promise((r) => setTimeout(r, 600));

  return { ok: true, message: "Thank you --- we'll reply within two working days." };
}
