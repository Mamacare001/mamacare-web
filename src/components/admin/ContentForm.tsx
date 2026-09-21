"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { saveContent, type State } from "@/app/admin/actions";
import { fieldCls, FormError } from "@/components/auth/fields";

export function ContentForm({ k, en, rw }: { k: string; en: string; rw: string }) {
  const [state, action, pending] = useActionState<State, FormData>(saveContent, null);
  return (
    <form action={action} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]" noValidate>
      <input type="hidden" name="key" value={k} />
      <textarea name="en" defaultValue={en} rows={2} className={fieldCls} aria-label="English" />
      <textarea name="rw" defaultValue={rw} rows={2} className={fieldCls} aria-label="Kinyarwanda" lang="rw" />
      <button disabled={pending} className="h-12 self-start rounded-full bg-emerald px-4 text-sm font-semibold text-ivory disabled:opacity-50">{pending ? <Loader2 className="size-4 animate-spin" /> : "Save"}</button>
      <div className="sm:col-span-3"><FormError message={state?.error} />{state?.ok && <p className="flex items-center gap-2 text-xs text-green"><CheckCircle2 className="size-3.5" /> {state.message}</p>}</div>
    </form>
  );
}
