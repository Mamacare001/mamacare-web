"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/components/providers/LanguageProvider";
import { signInWithEmail, signInWithGoogle, type CredState } from "@/app/login/actions";
import { startSignup, type ActionState } from "@/app/onboarding/actions";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;
const field =
  "peer w-full rounded-md border border-emerald/15 bg-white px-4 pb-2.5 pt-6 text-[15px] text-ink transition-[border-color,box-shadow] focus:border-green focus:shadow-[0_0_0_4px_rgb(46_139_112/0.15)] focus:outline-none";
const floatLabel =
  "pointer-events-none absolute left-4 top-2 text-[11px] font-bold uppercase tracking-wider text-muted transition-all";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.8-5.5 3.8-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.1 14.6 2 12 2 6.5 2 2 6.5 2 12s4.5 10 10 10c5.8 0 9.6-4.1 9.6-9.8 0-.7-.1-1.2-.2-1.7H12z" />
      <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.2-.2-1.7H12v3.9h5.5c-.2 1.1-.9 2.3-2 3.1l3.1 2.4c1.9-1.7 3-4.3 3-7.7z" />
      <path fill="#FBBC05" d="M6 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L2.8 7.2C2.3 8.7 2 10.3 2 12s.3 3.3.8 4.8L6 14.3z" />
      <path fill="#34A853" d="M12 22c2.6 0 4.8-.9 6.4-2.4l-3.1-2.4c-.9.6-2 1-3.3 1-3.9 0-5.3-2.5-5.5-3.8L2.8 16.8C4.4 20 7.9 22 12 22z" />
    </svg>
  );
}

export function LoginForm({
  mode,
  googleEnabled,
  demoEnabled = false,
  callbackUrl,
  error,
}: {
  mode: "signin" | "signup";
  googleEnabled: boolean;
  demoEnabled?: boolean;
  callbackUrl: string;
  error?: string;
}) {
  const { t, lang, setLang } = useLang();
  const [show, setShow] = useState(false);
  const [state, action, pending] = useActionState<CredState, FormData>(signInWithEmail, null);
  const [suState, suAction, suPending] = useActionState<ActionState, FormData>(startSignup, null);
  const isSignup = mode === "signup";
  const errorMsg = (isSignup ? suState?.error : state?.error) ?? (error ? "Sign-in failed. Please try again." : null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease, delay: 0.2 }}
      className="w-full max-w-[440px]"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-h2 text-emerald">{isSignup ? (lang === "en" ? "Create your account" : "Fungura konti yawe") : t.login.title}</h1>
          <p className="mt-2 text-muted">{isSignup ? (lang === "en" ? "Free for mothers. Always." : "Ku buntu ku babyeyi. Buri gihe.") : t.login.subtitle}</p>
        </div>
        <div className="flex rounded-full bg-emerald/5 p-1 text-xs font-bold" role="group" aria-label="Language">
          {(["en", "rw"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={cn("rounded-full px-3 py-1.5 transition-colors", lang === l ? "bg-emerald text-ivory" : "text-emerald hover:bg-emerald/10")}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {googleEnabled ? (
        <form action={signInWithGoogle}>
          <input type="hidden" name="callbackUrl" value={isSignup ? "/onboarding/role" : callbackUrl} />
          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-emerald/15 bg-white text-[15px] font-semibold text-ink transition-[box-shadow,transform] hover:shadow-soft active:scale-[0.99]"
          >
            <GoogleIcon />
            {t.login.google}
          </button>
        </form>
      ) : (
        <button
          type="button"
          disabled
          title="Add AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET to .env.local to enable"
          className="flex h-12 w-full cursor-not-allowed items-center justify-center gap-3 rounded-full border border-dashed border-emerald/20 bg-white/60 text-[15px] font-semibold text-muted"
        >
          <GoogleIcon />
          {t.login.google}
          <span className="ml-1 rounded-full bg-gold-100 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#8a6a10]">setup</span>
        </button>
      )}

      <div className="my-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-muted">
        <span className="h-px flex-1 bg-emerald/10" />
        {t.login.or}
        <span className="h-px flex-1 bg-emerald/10" />
      </div>

      {isSignup ? (
        <form action={suAction} className="space-y-4" noValidate>
          <div className="relative">
            <input id="name" name="name" autoComplete="name" required placeholder=" " className={field} />
            <label htmlFor="name" className={floatLabel}>{lang === "en" ? "Full name" : "Amazina yombi"}</label>
          </div>
          <div className="relative">
            <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder=" " className={field} />
            <label htmlFor="phone" className={floatLabel}>{lang === "en" ? "Mobile number" : "Nimero ya telefoni"}</label>
          </div>
          <p className="text-xs text-muted">{lang === "en" ? "We will send a 6-digit code by SMS to confirm it is you." : "Tuzakoherereza kode y’imibare 6 kuri SMS."}</p>
          {errorMsg && (
            <p role="alert" className="flex items-center gap-2 rounded-md bg-coral-100 px-3 py-2 text-sm text-coral">
              <AlertCircle className="size-4" /> {errorMsg}
            </p>
          )}
          <Button type="submit" variant="coral" size="lg" className="w-full" disabled={suPending} arrow={!suPending}>
            {suPending ? <Loader2 className="size-4 animate-spin" /> : t.nav.getStarted}
          </Button>
        </form>
      ) : (
        <form action={action} className="space-y-4" noValidate>
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <div className="relative">
            <input id="email" name="email" type="email" autoComplete="email" required placeholder=" " className={field} />
            <label htmlFor="email" className={floatLabel}>
              {t.login.email}
            </label>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              autoComplete={isSignup ? "new-password" : "current-password"}
              required
              placeholder=" "
              className={cn(field, "pr-12")}
            />
            <label htmlFor="password" className={floatLabel}>
              {t.login.password}
            </label>
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted hover:text-emerald"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>

          {!isSignup && (
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-muted">
                <input type="checkbox" name="remember" className="size-4 accent-emerald" /> {lang === "en" ? "Remember me" : "Unyibuke"}
              </label>
              <Link href="/forgot" className="link-underline font-semibold text-emerald">
                {t.login.forgot}
              </Link>
            </div>
          )}

          {errorMsg && (
            <p role="alert" className="flex items-center gap-2 rounded-md bg-coral-100 px-3 py-2 text-sm text-coral">
              <AlertCircle className="size-4" /> {errorMsg}
            </p>
          )}

          <Button type="submit" variant="coral" size="lg" className="w-full" disabled={pending} arrow={!pending}>
            {pending ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" /> …
              </span>
            ) : isSignup ? (
              t.nav.getStarted
            ) : (
              t.login.submit
            )}
          </Button>

          {demoEnabled && <p className="text-center text-xs text-muted">{t.login.demoHint}</p>}
        </form>
      )}

      <p className="mt-8 text-center text-sm text-muted">
        {isSignup ? (lang === "en" ? "Already have an account?" : "Usanzwe ufite konti?") : t.login.noAccount}{" "}
        <Link href={isSignup ? "/login" : "/login?mode=signup"} className="link-underline font-semibold text-emerald">
          {isSignup ? t.login.submit : t.login.create}
        </Link>
      </p>
    </motion.div>
  );
}
