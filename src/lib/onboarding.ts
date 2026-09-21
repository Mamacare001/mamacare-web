import { cookies } from "next/headers";

/**
 * Onboarding state is kept in an httpOnly cookie until the API exists.
 * Replace `read/write` with API calls (or a DB row keyed by user id) later.
 */
export type Role = "mother" | "family" | "worker";
export type WorkerKind = "chw" | "provider";

export type Onboarding = {
  role?: Role;
  phone?: string;
  verified?: boolean;
  invite?: string;
  name?: string;
  language?: "rw" | "en";
  channel?: "whatsapp" | "sms" | "app";
  mother?: { edd?: string; weeks?: string; gravida?: string; district?: string; facility?: string; firstPregnancy?: string };
  family?: { motherCode?: string; relation?: string };
  worker?: { kind?: WorkerKind; facility?: string; code?: string; village?: string };
  consent?: { agreed: boolean; at: string };
  token?: string;
};

const KEY = "mc_onboarding";

export async function readOnboarding(): Promise<Onboarding> {
  const c = (await cookies()).get(KEY)?.value;
  if (!c) return {};
  try {
    return JSON.parse(Buffer.from(c, "base64url").toString("utf8")) as Onboarding;
  } catch {
    return {};
  }
}

export async function writeOnboarding(patch: Partial<Onboarding>) {
  const current = await readOnboarding();
  const next = { ...current, ...patch };
  (await cookies()).set(KEY, Buffer.from(JSON.stringify(next)).toString("base64url"), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return next;
}

export async function clearOnboarding() {
  (await cookies()).delete(KEY);
}

export const STEPS: Record<Role, { href: string; label: string }[]> = {
  mother: [
    { href: "/onboarding/role", label: "Who you are" },
    { href: "/onboarding/mother", label: "Your pregnancy" },
    { href: "/onboarding/consent", label: "Consent" },
  ],
  family: [
    { href: "/onboarding/role", label: "Who you are" },
    { href: "/onboarding/family", label: "Link to a mother" },
    { href: "/onboarding/consent", label: "Consent" },
  ],
  worker: [
    { href: "/onboarding/role", label: "Who you are" },
    { href: "/onboarding/worker", label: "Your facility" },
    { href: "/onboarding/consent", label: "Consent" },
  ],
};

export { DISTRICTS } from "@/lib/districts";
