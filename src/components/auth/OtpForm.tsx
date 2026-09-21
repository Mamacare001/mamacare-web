"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/auth/fields";
import { verifyOtp, resendOtp, type ActionState } from "@/app/onboarding/actions";

export function OtpForm({ phone }: { phone: string }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(verifyOtp, null);
  const [cooldown, setCooldown] = useState(30);
  const [resent, setResent] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  const onInput = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, "");
    e.target.value = v.slice(-1);
    if (v && i < 5) inputs.current[i + 1]?.focus();
  };
  const onKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value && i > 0) inputs.current[i - 1]?.focus();
  };
  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text.length < 2) return;
    e.preventDefault();
    text.split("").forEach((ch, i) => {
      const el = inputs.current[i];
      if (el) el.value = ch;
    });
    inputs.current[Math.min(text.length, 5)]?.focus();
  };

  return (
    <form action={action} className="space-y-6" noValidate>
      <div className="flex justify-between gap-2" onPaste={onPaste}>
        {[1, 2, 3, 4, 5, 6].map((n, i) => (
          <input
            key={n}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            name={`d${n}`}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            maxLength={1}
            aria-label={`Digit ${n}`}
            onChange={(e) => onInput(i, e)}
            onKeyDown={(e) => onKey(i, e)}
            className="h-14 w-full rounded-md border border-emerald/15 bg-white text-center font-display text-2xl text-emerald transition-[border-color,box-shadow] focus:border-green focus:shadow-[0_0_0_4px_rgb(46_139_112/0.15)] focus:outline-none sm:h-16"
          />
        ))}
      </div>
      <FormError message={state?.error} />
      <Button type="submit" variant="coral" size="lg" className="w-full" disabled={pending} arrow={!pending}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : "Verify"}
      </Button>
      <p className="text-center text-sm text-muted">
        Sent to <span className="font-semibold text-emerald">{phone}</span>.{" "}
        {cooldown > 0 ? (
          <span>Resend in {cooldown}s</span>
        ) : (
          <button
            type="button"
            className="font-semibold text-green underline underline-offset-4"
            onClick={async () => {
              await resendOtp();
              setResent(true);
              setCooldown(30);
            }}
          >
            Resend code
          </button>
        )}
        {resent && cooldown > 25 && <span className="ml-2 text-green">Sent.</span>}
      </p>
      <p className="text-center text-xs text-muted">Demo code: 123456</p>
    </form>
  );
}
