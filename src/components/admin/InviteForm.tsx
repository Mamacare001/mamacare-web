"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { createInvite, type State } from "@/app/admin/actions";
import { fieldCls, FormError } from "@/components/auth/fields";

export function InviteForm({ orgs }: { orgs: string[] }) {
  const [state, action, pending] = useActionState<State, FormData>(createInvite, null);
  if (state?.ok) return <p className="flex items-center gap-2 rounded-md bg-green-100 p-3 text-sm text-emerald"><CheckCircle2 className="size-4 text-green" /> Invite created: <span className="font-mono text-lg tracking-widest">{state.message}</span></p>;
  return (
    <form action={action} className="grid gap-3 sm:grid-cols-[160px_1fr_120px_auto]" noValidate>
      <select name="kind" className={fieldCls} defaultValue="chw"><option value="chw">CHW</option><option value="provider">Provider</option><option value="supervisor">Supervisor</option></select>
      <select name="org" className={fieldCls} defaultValue="" required><option value="" disabled>Organisation…</option>{orgs.map((o) => <option key={o}>{o}</option>)}</select>
      <input name="max" type="number" min={1} max={50} defaultValue={5} className={fieldCls} aria-label="Max uses" />
      <button disabled={pending} className="h-12 rounded-full bg-emerald px-5 text-sm font-semibold text-ivory disabled:opacity-50">{pending ? <Loader2 className="size-4 animate-spin" /> : "Create"}</button>
      <FormError message={state?.error} />
    </form>
  );
}
