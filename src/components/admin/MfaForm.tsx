"use client";

import { useActionState, useRef } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/auth/fields";
import { verifyAdminMfa, type State } from "@/app/admin/actions";

export function MfaForm({ next, demoEnabled = false }: { next: string; demoEnabled?: boolean }) {
  const [state, action, pending] = useActionState<State, FormData>(verifyAdminMfa, null);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  return (
    <form action={action} className="space-y-5" noValidate>
      <input type="hidden" name="next" value={next} />
      <div className="flex justify-between gap-2">
        {[1, 2, 3, 4, 5, 6].map((n, i) => (
          <input key={n} ref={(el) => { inputs.current[i] = el; }} name={`d${n}`} inputMode="numeric" maxLength={1} autoComplete={i === 0 ? "one-time-code" : "off"} aria-label={`Digit ${n}`}
            onChange={(e) => { e.target.value = e.target.value.replace(/\D/g, "").slice(-1); if (e.target.value && i < 5) inputs.current[i + 1]?.focus(); }}
            onKeyDown={(e) => { if (e.key === "Backspace" && !e.currentTarget.value && i > 0) inputs.current[i - 1]?.focus(); }}
            className="h-14 w-full rounded-md border border-emerald/15 bg-white text-center font-display text-2xl text-emerald focus:border-green focus:outline-none" />
        ))}
      </div>
      <FormError message={state?.error} />
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : <><ShieldCheck className="size-4" /> Verify</>}</Button>
      {demoEnabled && <p className="text-center text-xs text-muted">Demo code: 123456 · In production this is your authenticator app or security key.</p>}
    </form>
  );
}
