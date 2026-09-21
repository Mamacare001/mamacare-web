"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormError, fieldCls } from "@/components/auth/fields";
import { sendFeedback, referUp, recordOutcome, requestStaffAccount, type State } from "@/app/clinic/actions";
import type { PendingFeedback } from "@/lib/mock/clinic";
import { fmtDate } from "@/components/app/ui";
import { cn } from "@/lib/cn";

function Done({ state, back, backLabel }: { state: State; back: string; backLabel: string }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-green-100 p-6 text-emerald"><p className="flex items-center gap-2 font-display text-2xl"><CheckCircle2 className="size-6 text-green" /> Done.</p><p className="mt-2 text-[15px]">{state?.message}</p></div>
      <Button href={back} variant="primary">{backLabel}</Button>
    </div>
  );
}

export function FeedbackCard({ f }: { f: PendingFeedback }) {
  const [state, action, pending] = useActionState<State, FormData>(sendFeedback, null);
  if (state?.ok) return <li id={f.id} className="rounded-lg bg-green-100 p-4 text-emerald"><p className="flex items-center gap-2 font-semibold"><CheckCircle2 className="size-5 text-green" /> {f.motherName} — {state.message}</p></li>;
  return (
    <li id={f.id} className={cn("scroll-mt-24 rounded-lg bg-white p-4 ring-1 ring-emerald/5", f.daysWaiting >= 2 && "ring-2 ring-gold/60")}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-display text-xl text-emerald">{f.motherName}</p>
          <p className="text-xs text-muted">Referred {fmtDate(f.referredAt)} by {f.chwName} · {f.reason}{f.seenAt && ` · seen ${fmtDate(f.seenAt)}`}</p>
        </div>
        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", f.daysWaiting >= 2 ? "bg-gold text-midnight" : "bg-ivory text-muted")}>{f.daysWaiting === 0 ? "today" : `${f.daysWaiting} d waiting`}</span>
      </div>
      <form action={action} className="mt-3 grid gap-2 sm:grid-cols-[180px_1fr_auto]" noValidate>
        <input type="hidden" name="id" value={f.id} />
        <select name="outcome" className={fieldCls} defaultValue="" required>
          <option value="" disabled>Outcome…</option>
          <option value="seen-treated">Seen · treated · home</option>
          <option value="seen-observed">Seen · observing</option>
          <option value="admitted">Admitted</option>
          <option value="referred-up">Referred to DH</option>
          <option value="no-show">Did not arrive</option>
        </select>
        <input name="text" className={fieldCls} placeholder={`Message to ${f.chwName.split(" ")[0]}: what happened, what to do at the next visit`} required />
        <button disabled={pending} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-emerald px-5 text-sm font-semibold text-ivory disabled:opacity-50">{pending ? <Loader2 className="size-4 animate-spin" /> : <><Send className="size-4" /> Send</>}</button>
        <FormError message={state?.error} />
      </form>
    </li>
  );
}

export function ReferUpForm({ motherId, motherName, to }: { motherId: string; motherName: string; to: string }) {
  const [state, action, pending] = useActionState<State, FormData>(referUp, null);
  if (state?.ok) return <Done state={state} back={`/clinic/mother/${motherId}`} backLabel={`Back to ${motherName.split(" ")[0]}`} />;
  return (
    <form action={action} className="space-y-5" noValidate>
      <input type="hidden" name="motherId" value={motherId} />
      <Field label="Refer to"><input value={to} readOnly className={fieldCls} /></Field>
      <fieldset><legend className="text-sm font-semibold text-emerald">Urgency</legend><div className="mt-2 grid grid-cols-2 gap-2">{[["emergency", "Emergency · now"], ["urgent", "Urgent · today"]].map(([v, l]) => <label key={v} className="cursor-pointer"><input type="radio" name="urgency" value={v} defaultChecked={v === "emergency"} className="peer sr-only" /><span className="block rounded-md border border-emerald/15 bg-white px-3 py-2.5 text-center text-sm font-semibold text-emerald peer-checked:border-coral peer-checked:bg-coral-100/60">{l}</span></label>)}</div></fieldset>
      <Field label="Reason & findings" hint="Vitals, treatment given, time given. The DH sees this before she arrives."><textarea name="reason" rows={4} className={fieldCls} required /></Field>
      <label className="flex items-center gap-3 rounded-md border border-emerald/15 bg-white p-3 text-sm text-emerald has-[:checked]:border-emerald has-[:checked]:bg-emerald/5"><input type="checkbox" name="ambulance" className="size-4 accent-emerald" defaultChecked /> Request ambulance</label>
      <label className="flex items-center gap-3 rounded-md border border-emerald/15 bg-white p-3 text-sm text-emerald has-[:checked]:border-emerald has-[:checked]:bg-emerald/5"><input type="checkbox" name="escort" className="size-4 accent-emerald" /> Nurse escort</label>
      <FormError message={state?.error} />
      <Button type="submit" variant="coral" size="lg" disabled={pending} arrow={!pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : "Send referral"}</Button>
    </form>
  );
}

export function OutcomeForm({ motherId, motherName }: { motherId: string; motherName: string }) {
  const [state, action, pending] = useActionState<State, FormData>(recordOutcome, null);
  if (state?.ok) return <Done state={state} back={`/clinic/mother/${motherId}`} backLabel={`Back to ${motherName.split(" ")[0]}`} />;
  return (
    <form action={action} className="space-y-5" noValidate>
      <input type="hidden" name="motherId" value={motherId} />
      <fieldset>
        <legend className="text-sm font-semibold text-emerald">Outcome</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {[["svd", "Normal vaginal delivery"], ["assisted", "Assisted delivery"], ["cs", "Caesarean section"], ["stillbirth", "Stillbirth"], ["miscarriage", "Miscarriage"], ["maternal-death", "Maternal death"], ["discharged", "Discharged (not delivered)"]].map(([v, l]) => (
            <label key={v} className="cursor-pointer"><input type="radio" name="type" value={v} className="peer sr-only" required /><span className={cn("block rounded-md border border-emerald/15 bg-white px-3 py-2.5 text-sm font-semibold text-emerald peer-checked:border-emerald peer-checked:bg-emerald/5", (v === "stillbirth" || v === "maternal-death") && "peer-checked:border-coral peer-checked:bg-coral-100/60")}>{l}</span></label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Date"><input type="date" name="date" className={fieldCls} /></Field>
        <Field label="Baby weight g"><input type="number" name="weight" inputMode="numeric" className={fieldCls} /></Field>
        <Field label="Apgar 5 min"><input type="number" name="apgar" inputMode="numeric" min={0} max={10} className={fieldCls} /></Field>
      </div>
      <Field label="Complications" hint="PPH, eclampsia, sepsis, obstructed labour… or none."><input name="complications" className={fieldCls} /></Field>
      <Field label="Notes for the CHW’s postnatal visits (day 1, 3, 7)"><textarea name="pnc" rows={2} className={fieldCls} /></Field>
      <FormError message={state?.error} />
      <Button type="submit" variant="coral" size="lg" disabled={pending} arrow={!pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : "Record outcome"}</Button>
      <p className="text-xs text-muted">Adverse outcomes (stillbirth, maternal death, eclampsia) automatically open a case review with the clinical lead.</p>
    </form>
  );
}

export function StaffRequestForm() {
  const [state, action, pending] = useActionState<State, FormData>(requestStaffAccount, null);
  if (state?.ok) return <p className="flex items-center gap-2 rounded-md bg-green-100 p-4 text-sm text-emerald"><CheckCircle2 className="size-5 text-green" /> {state.message}</p>;
  return (
    <form action={action} className="grid gap-3 sm:grid-cols-[1fr_1fr_180px_auto]" noValidate>
      <input name="name" placeholder="Full name" className={fieldCls} required />
      <input name="email" type="email" placeholder="Work email" className={fieldCls} required />
      <select name="role" className={fieldCls} defaultValue="nurse"><option value="nurse">Nurse / midwife</option><option value="doctor">Doctor</option><option value="data">Data clerk</option></select>
      <button disabled={pending} className="h-12 rounded-full bg-emerald px-5 text-sm font-semibold text-ivory disabled:opacity-50">{pending ? <Loader2 className="size-4 animate-spin" /> : "Request"}</button>
      <FormError message={state?.error} />
    </form>
  );
}
