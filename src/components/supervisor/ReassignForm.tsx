"use client";

import { useActionState, useState } from "react";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormError, fieldCls } from "@/components/auth/fields";
import { reassignMothers, type State } from "@/app/supervisor/actions";
import type { Chw, SectorMother } from "@/lib/mock/supervisor";
import { RiskPill } from "@/components/app/ui";

export function ReassignForm({ chws, mothers }: { chws: Chw[]; mothers: SectorMother[] }) {
  const [state, action, pending] = useActionState<State, FormData>(reassignMothers, null);
  const [from, setFrom] = useState("");
  const pool = mothers.filter((m) => m.chwId === from);
  if (state?.ok)
    return (
      <div className="space-y-4">
        <div className="rounded-xl bg-green-100 p-6 text-emerald"><p className="flex items-center gap-2 font-display text-2xl"><CheckCircle2 className="size-6 text-green" /> Done.</p><p className="mt-2 text-[15px]">{state.message}</p></div>
        <Button href="/supervisor/chws" variant="primary">Back to CHWs</Button>
      </div>
    );
  return (
    <form action={action} className="space-y-6" noValidate>
      <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <Field label="From CHW">
          <select name="from" value={from} onChange={(e) => setFrom(e.target.value)} className={fieldCls} required>
            <option value="" disabled>Choose…</option>
            {chws.filter((c) => c.caseload > 0).map((c) => <option key={c.id} value={c.id}>{c.name} · {c.caseload} mothers</option>)}
          </select>
        </Field>
        <ArrowRight className="mb-3 hidden size-5 text-muted sm:block" />
        <Field label="To CHW">
          <select name="to" className={fieldCls} required defaultValue="">
            <option value="" disabled>Choose…</option>
            {chws.filter((c) => c.status === "active").map((c) => <option key={c.id} value={c.id}>{c.name} · {c.cell} · {c.caseload} mothers</option>)}
          </select>
        </Field>
      </div>
      <fieldset>
        <legend className="text-sm font-semibold text-emerald">Mothers to move {from && `(${pool.length})`}</legend>
        {!from ? <p className="mt-2 text-sm text-muted">Choose the CHW you are moving from.</p> : (
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {pool.map((m) => (
              <li key={m.id}><label className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-emerald/15 bg-white p-3 has-[:checked]:border-emerald has-[:checked]:bg-emerald/5"><span className="flex items-center gap-3"><input type="checkbox" name="mother" value={m.id} className="size-4 accent-emerald" /><span><span className="block font-semibold text-emerald">{m.name}</span><span className="block text-xs text-muted">{m.weeks} wk · {m.village}</span></span></span><RiskPill risk={m.risk} /></label></li>
            ))}
          </ul>
        )}
      </fieldset>
      <Field label="Reason" hint="Goes in the audit log. Both CHWs and each mother are notified of the change."><input name="reason" className={fieldCls} placeholder="e.g. Claudine on leave until 5 Oct" required /></Field>
      <FormError message={state?.error} />
      <Button type="submit" variant="coral" size="lg" disabled={pending} arrow={!pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : "Move mothers"}</Button>
    </form>
  );
}
