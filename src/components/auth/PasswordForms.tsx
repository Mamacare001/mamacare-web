"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormError, fieldCls } from "@/components/auth/fields";
import { requestReset, resetPassword, type ActionState } from "@/app/forgot/actions";

export function ForgotForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(requestReset, null);
  if (state?.ok)
    return (
      <div className="flex items-start gap-3 rounded-lg bg-green-100 p-5 text-emerald">
        <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-green" />
        <div>
          <p className="font-display text-2xl">Check your messages.</p>
          <p className="mt-1 text-[15px]">If an account exists for that email or number, we have sent a reset link. It expires in 30 minutes.</p>
          <Link href="/login" className="mt-4 inline-block text-sm font-semibold text-green underline underline-offset-4">Back to sign in</Link>
        </div>
      </div>
    );
  return (
    <form action={action} className="space-y-5" noValidate>
      <Field label="Email or phone number">
        <input name="identifier" className={fieldCls} placeholder="you@example.com or 078 123 4567" autoComplete="username" required />
      </Field>
      <FormError message={state?.error} />
      <Button type="submit" variant="coral" size="lg" className="w-full" disabled={pending} arrow={!pending}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : "Send reset link"}
      </Button>
      <p className="text-center text-sm text-muted">
        Remembered it? <Link href="/login" className="link-underline font-semibold text-emerald">Sign in</Link>
      </p>
    </form>
  );
}

export function ResetForm({ token }: { token?: string }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(resetPassword, null);
  const [show, setShow] = useState(false);
  if (!token)
    return (
      <div className="rounded-lg bg-coral-100 p-5 text-ink">
        <p className="font-display text-2xl text-emerald">This link is missing its token.</p>
        <p className="mt-1 text-[15px]">Open the link from your message again, or <Link href="/forgot" className="font-semibold text-coral underline underline-offset-4">request a new one</Link>.</p>
      </div>
    );
  if (state?.ok)
    return (
      <div className="flex items-start gap-3 rounded-lg bg-green-100 p-5 text-emerald">
        <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-green" />
        <div>
          <p className="font-display text-2xl">Password updated.</p>
          <p className="mt-1 text-[15px]">You can sign in with your new password now.</p>
          <div className="mt-4"><Button href="/login" variant="primary" arrow>Sign in</Button></div>
        </div>
      </div>
    );
  return (
    <form action={action} className="space-y-5" noValidate>
      <input type="hidden" name="token" value={token} />
      <Field label="New password" hint="At least 8 characters.">
        <div className="relative">
          <input name="password" type={show ? "text" : "password"} autoComplete="new-password" className={`${fieldCls} pr-12`} required minLength={8} />
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted hover:text-emerald" aria-label={show ? "Hide password" : "Show password"}>
            {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
      </Field>
      <Field label="Repeat new password">
        <input name="password2" type={show ? "text" : "password"} autoComplete="new-password" className={fieldCls} required minLength={8} />
      </Field>
      <FormError message={state?.error} />
      <Button type="submit" variant="coral" size="lg" className="w-full" disabled={pending} arrow={!pending}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : "Set new password"}
      </Button>
    </form>
  );
}
