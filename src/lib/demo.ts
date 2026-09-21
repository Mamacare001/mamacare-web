/**
 * Demo mode gate.
 *
 * Demo accounts (demo@mamacare.rw …, password "mamacare"), the demo OTP (123456)
 * and the demo admin MFA code (123456) are only accepted when:
 *   - running locally (NODE_ENV !== "production"), or
 *   - ALLOW_DEMO=true is set in the environment (e.g. on Vercel for a reviewer link).
 *
 * Remove ALLOW_DEMO from production once real accounts exist and the API is wired in.
 */
export const demoEnabled = process.env.ALLOW_DEMO === "true" || process.env.NODE_ENV !== "production";
export const DEMO_OTP = "123456";
export const DEMO_PASSWORD = "mamacare";
