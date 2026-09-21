import { NextResponse, type NextRequest } from "next/server";
import { readOnboarding, writeOnboarding } from "@/lib/onboarding";

/**
 * Deep link a CHW gives a mother (printed on a card or sent by SMS): /invite/ABC123
 * Records the invite and lands her in signup already marked as a mother.
 * A route handler (not a page) because it sets a cookie.
 * TODO: validate the code via the API and prefill district/facility from the CHW's record.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const clean = code.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
  const ob = await readOnboarding();
  await writeOnboarding({ invite: clean, role: "mother" });
  const to = ob.verified ? "/onboarding/mother" : `/login?mode=signup&invite=${clean}`;
  return NextResponse.redirect(new URL(to, req.url));
}
