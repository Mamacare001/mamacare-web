import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { readOnboarding } from "@/lib/onboarding";

/**
 * Auth.js (NextAuth v5) configuration.
 *
 * Providers
 *  - Google OAuth  → set AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET (see README)
 *  - Credentials   → demo only (demo@mamacare.rw / mamacare). Replace `authorize`
 *                    with a call to your backend once the API exists.
 */
const isProd = process.env.NODE_ENV === "production";

export const authConfig = {
  secret: process.env.AUTH_SECRET ?? (isProd ? undefined : "mamacare-dev-secret-change-me"),
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login", error: "/login" },
  providers: [
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET })]
      : []),
    Credentials({
      name: "Email",
      credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
      async authorize(creds) {
        const email = String(creds?.email ?? "").toLowerCase().trim();
        const password = String(creds?.password ?? "");
        // TODO: replace with a real lookup against the MamaCare API.
        if (email === "demo@mamacare.rw" && password === "mamacare") {
          return { id: "demo-user", name: "Demo CHW", email, role: "chw" };
        }
        // Onboarding hand-off: the consent step signs the new user in with a one-time token.
        if (password.startsWith("onboarding:")) {
          const ob = await readOnboarding();
          if (ob.token && password === `onboarding:${ob.token}` && ob.consent?.agreed) {
            const role = ob.role === "worker" ? (ob.worker?.kind ?? "chw") : (ob.role ?? "mother");
            return { id: `ob-${ob.token.slice(0, 8)}`, name: ob.name ?? "MamaCare user", email, role };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const isProtected = ["/dashboard", "/app", "/family"].some((r) => request.nextUrl.pathname.startsWith(r));
      return isProtected ? !!auth?.user : true;
    },
    jwt({ token, user }) {
      if (user && "role" in user) token.role = (user as { role?: string }).role;
      return token;
    },
    session({ session, token }) {
      if (token.role) (session.user as { role?: string }).role = token.role as string;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export const googleEnabled = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
