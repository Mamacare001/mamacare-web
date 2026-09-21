"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Loader2, ShieldAlert, ShieldCheck, WifiOff, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormError, fieldCls } from "@/components/auth/fields";
import { recordVisit, type State } from "@/app/chw/actions";
import { dangerSignChecklist, type CaseMother } from "@/lib/mock/chw";
import { enqueue, formToPayload, useOnline } from "@/lib/offline/queue";
import { cn } from "@/lib/cn";

export function VisitForm({ m }: { m: CaseMother }) {
  const online = useOnline();
  const [state, action, pending] = useActionState<State, FormData>(recordVisit, null);
  const [savedOffline, setSavedOffline] = useState(false);
  const [signs, setSigns] = useState<Set<string>>(new Set());

  if (savedOffline)
    return (
      <div className="space-y-4">
        <div className="rounded-xl bg-gold-100 p-6 text-midnight">
          <p className="flex items-center gap-2 font-display text-2xl"><WifiOff className="size-6" /> Saved on this phone.</p>
          <p className="mt-2 text-[15px]">You are offline. The visit will be sent automatically when you are back on network — you will see it in the sync badge at the top.</p>
          {signs.size > 0 && <p className="mt-3 rounded-md bg-white/60 p-3 text-sm font-semibold">You ticked {signs.size} danger sign{signs.size > 1 ? "s" : ""}. If she needs care now, do not wait for sync: <a href="tel:912" className="text-coral underline">call 912</a> or take her to the facility.</p>}
        </div>
        <Button href={`/chw/mother/${m.id}`} variant="primary">Back to {m.name.split(" ")[0]}</Button>
      </div>
    );

  if (state?.ok) {
    const tone = state.risk === "high" ? "bg-coral text-white" : state.risk === "moderate" ? "bg-gold text-midnight" : "bg-green text-ivory";
    return (
      <div className="space-y-4">
        <div className={cn("rounded-xl p-6", tone)}>
          <p className="flex items-center gap-2 text-eyebrow opacity-80"><CheckCircle2 className="size-4" /> Visit recorded</p>
          <p className="mt-2 flex items-center gap-3 font-display text-2xl leading-tight md:text-3xl">{state.risk === "low" ? <ShieldCheck className="size-7" /> : <ShieldAlert className="size-7" />} {state.risk === "high" ? "Refer now" : state.risk === "moderate" ? "Refer within 24 h" : "Routine"}</p>
          <p className="mt-3 text-[15px]">{state.action}</p>
          {state.risk !== "low" && (
            <div className="mt-5 flex flex-wrap gap-2">
              <Button href={`/chw/refer?mother=${m.id}&urgency=${state.risk === "high" ? "now" : "24h"}`} variant="light" className={state.risk === "high" ? "!text-coral" : "!text-midnight"}>Create referral</Button>
              {state.risk === "high" && <Button href="tel:912" variant="ghost" className="!text-white ring-1 ring-white/50"><Phone className="size-4" /> 912</Button>}
            </div>
          )}
        </div>
        <p className="text-xs text-muted">The recommendation comes from rule set v0.4. The server re-checks it; if it differs you will be notified.</p>
        <Button href={`/chw/mother/${m.id}`} variant="secondary">Back to {m.name.split(" ")[0]}</Button>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (online) return; // let the server action run
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    enqueue({ kind: "visit", label: `Visit · ${m.name}`, payload: formToPayload(fd) });
    setSavedOffline(true);
  };

  return (
    <form action={action} onSubmit={onSubmit} className="space-y-6" noValidate>
      <input type="hidden" name="motherId" value={m.id} />
      {!online && <p className="flex items-center gap-2 rounded-md bg-gold-100 px-3 py-2 text-sm font-semibold text-[#8a6a10]"><WifiOff className="size-4" /> Offline — this visit will be saved on the phone and synced later.</p>}

      <fieldset>
        <legend className="text-sm font-semibold text-emerald">Measurements</legend>
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Field label="BP systolic"><input name="bp_sys" type="number" inputMode="numeric" min={60} max={250} placeholder="120" className={fieldCls} /></Field>
          <Field label="BP diastolic"><input name="bp_dia" type="number" inputMode="numeric" min={30} max={150} placeholder="80" className={fieldCls} /></Field>
          <Field label="Temp °C"><input name="temp" type="number" inputMode="decimal" step="0.1" min={34} max={42} placeholder="36.8" className={fieldCls} /></Field>
          <Field label="Weight kg"><input name="weight" type="number" inputMode="decimal" step="0.1" min={30} max={150} placeholder="68" className={fieldCls} /></Field>
        </div>
        <p className="mt-1 text-xs text-muted">Leave blank if you could not measure. BP ≥ 140/90 triggers a referral.</p>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-emerald">Danger signs — ask and look</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {dangerSignChecklist.map((s) => {
            const on = signs.has(s.id);
            return (
              <label key={s.id} className="cursor-pointer">
                <input type="checkbox" name={`sign_${s.id}`} className="peer sr-only" checked={on} onChange={(e) => setSigns((p) => { const n = new Set(p); if (e.target.checked) n.add(s.id); else n.delete(s.id); return n; })} />
                <span className={cn("flex items-center justify-between rounded-md border bg-white p-3 text-[15px] transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-green", on ? (s.urgent ? "border-coral bg-coral-100/60 font-semibold" : "border-emerald bg-emerald/5 font-semibold") : "border-emerald/15")}>
                  <span className="text-emerald">{s.label}</span>
                  {s.urgent && <span className="rounded-full bg-coral px-2 py-0.5 text-[10px] font-bold uppercase text-white">urgent</span>}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-emerald">Fetal movement</legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[["normal", "Normal"], ["reduced", "Reduced"], ["none", "None felt"], ].map(([v, l]) => (
            <label key={v} className="cursor-pointer"><input type="radio" name="fm" value={v} defaultChecked={v === "normal"} className="peer sr-only" /><span className="block rounded-md border border-emerald/15 bg-white px-3 py-2.5 text-center text-sm font-semibold text-emerald peer-checked:border-emerald peer-checked:bg-emerald/5">{l}</span></label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-emerald">Counselling done</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {[["c_danger", "Danger signs explained"], ["c_iron", "Iron / folic acid tablets"], ["c_anc", "Next ANC visit date confirmed"], ["c_birth", "Birth plan & transport"], ["c_nutrition", "Nutrition & rest"], ["c_net", "Bed net / malaria"]].map(([n, l]) => (
            <label key={n} className="flex cursor-pointer items-center gap-3 rounded-md border border-emerald/15 bg-white p-3 text-sm text-emerald has-[:checked]:border-emerald has-[:checked]:bg-emerald/5"><input type="checkbox" name={n} className="size-4 accent-emerald" /> {l}</label>
          ))}
        </div>
      </fieldset>

      <Field label="Notes" hint="What she said, what you saw, anything the clinic should know.">
        <textarea name="note" rows={3} className={fieldCls} />
      </Field>

      <FormError message={state?.error} />
      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="coral" size="lg" disabled={pending} arrow={!pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : online ? "Save visit" : "Save on phone"}</Button>
        <Link href={`/chw/mother/${m.id}`} className="inline-flex h-14 items-center px-4 text-sm font-semibold text-muted">Cancel</Link>
      </div>
    </form>
  );
}
