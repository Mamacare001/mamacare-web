"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { homeByRole } from "@/lib/mock/shared";

/** Sets the active role for this session. TODO: the API must verify the user actually holds the role; the JWT should carry `roles[]` and `activeRole`. */
export async function switchRole(fd: FormData) {
  const role = String(fd.get("role") ?? "");
  if (!homeByRole[role]) redirect("/switch-role");
  (await cookies()).set("mc_active_role", role, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 30 });
  redirect(homeByRole[role]);
}
