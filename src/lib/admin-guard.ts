import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/** Admin pages call this first: requires a fresh MFA step-up (cookie set by /admin/mfa, 30 min). */
export async function requireAdminMfa(next: string) {
  const ok = (await cookies()).get("mc_admin_mfa")?.value === "1";
  if (!ok) redirect(`/admin/mfa?next=${encodeURIComponent(next)}`);
}
