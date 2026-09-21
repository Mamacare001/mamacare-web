"use client";

import { useActionState, useState } from "react";
import { Loader2, CheckCircle2, WifiOff, Copy, Check, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormError, fieldCls } from "@/components/auth/fields";
import { createReferral, enrolMother, type State } from "@/app/chw/actions";
import { RELATIONS, type CaseMother } from "@/lib/mock/chw";
import { enqueue, formToPayload, useOnline } from "@/lib/offline/queue";

function OfflineNote() {
  return <p className="flex items-center gap-2 rounded-md bg-gold-100 px-3 py-2 text-sm font-semibold text-[#8a6a10]"><WifiOff className="size-4" /> Offline — this will be saved on the phone and sent when you are back on network.</p>;
}

export function ReferForm({ mothers, preselect, urgency }: { mothers: CaseMother[]; preselect?: string; urgency?: string }) {
  const online = useOnline();
  const [state, action, pending] = useActionState<State, FormData>(createReferral, null);
  const [saved, setSaved] = useState(false);
  if (saved || state?.ok)
    return (
      <div className="space-y-4">
        <div className={saved ? "rounded-xl bg-gold-100 p-6 text-midnight" : "rounded-xl bg-green-100 p-6 text-emerald"}>
          <p className="flex items-center gap-2 font-display text-2xl">{saved ? <WifiOff className="size-6" /> : <CheckCircle2 className="size-6 text-green" />} {saved ? "Saved on this phone." : "Referral sent."}</p>
          <p className="mt-2 text-[15px]">{saved ? "It will be sent when you are back on network. If she needs care now, take her to the facility — do not wait for sync." : state?.message}</p>
        </div>
        <Button href="/chw" variant="primary">Back to today</Button>
      </div>
    );
  return (
    <form action={action} onSubmit={(e) => { if (online) return; e.preventDefault(); enqueue({ kind: "referral", label: "Referral", payload: formToPayload(new FormData(e.currentTarget)) }); setSaved(true); }} className="space-y-5" noValidate>
      {!online && <OfflineNote />}
      <Field label="Mother">
        <select name="motherId" defaultValue={preselect ?? ""} className={fieldCls} required>
          <option value="" disabled>Choose…</option>
          {mothers.map((m) => <option key={m.id} value={m.id}>{m.name} · {m.weeks} wk · {m.village}</option>)}
        </select>
      </Field>
      <fieldset>
        <legend className="text-sm font-semibold text-emerald">Urgency</legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[["now", "Now", "Emergency"], ["24h", "Within 24 h", "Same/next day"], ["routine", "Routine", "Next ANC visit"]].map(([v, l, h]) => (
            <label key={v} className="cursor-pointer"><input type="radio" name="urgency" value={v} defaultChecked={(urgency ?? "24h") === v} className="peer sr-only" /><span className={`block rounded-md border border-emerald/15 bg-white px-3 py-2.5 text-center peer-checked:border-emerald peer-checked:bg-emerald/5 ${v === "now" ? "peer-checked:border-coral peer-checked:bg-coral-100/60" : ""}`}><span className="block text-sm font-semibold text-emerald">{l}</span><span className="block text-[11px] text-muted">{h}</span></span></label>
          ))}
        </div>
      </fieldset>
      <Field label="Reason for referral" hint="What you observed and measured. The clinic sees this before she arrives."><textarea name="reason" rows={3} className={fieldCls} required /></Field>
      <Field label="Refer to">
        <select name="facility" className={fieldCls} defaultValue="Kinyinya Health Centre">
          <option>Kinyinya Health Centre</option><option>Kibagabaga District Hospital</option><option>Other</option>
        </select>
      </Field>
      <label className="flex items-center gap-3 rounded-md border border-emerald/15 bg-white p-3 text-sm text-emerald has-[:checked]:border-emerald has-[:checked]:bg-emerald/5"><input type="checkbox" name="transport" className="size-4 accent-emerald" /> Request transport (ambulance / community moto)</label>
      <FormError message={state?.error} />
      <Button type="submit" variant="coral" size="lg" disabled={pending} arrow={!pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : <><Send className="size-4" /> {online ? "Send referral" : "Save on phone"}</>}</Button>
    </form>
  );
}

export function EnrolForm() {
  const online = useOnline();
  const [state, action, pending] = useActionState<State, FormData>(enrolMother, null);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  if (saved)
    return (<div className="space-y-4"><div className="rounded-xl bg-gold-100 p-6 text-midnight"><p className="flex items-center gap-2 font-display text-2xl"><WifiOff className="size-6" /> Saved on this phone.</p><p className="mt-2 text-[15px]">Her invite code will be generated and sent to her by SMS when you are back on network.</p></div><Button href="/chw" variant="primary">Back to today</Button></div>);
  if (state?.ok) {
    const code = state.message ?? "";
    return (
      <div className="space-y-4">
        <div className="rounded-xl bg-green-100 p-6 text-emerald">
          <p className="flex items-center gap-2 font-display text-2xl"><CheckCircle2 className="size-6 text-green" /> Enrolled.</p>
          <p className="mt-2 text-[15px]">She has been sent an SMS with the link. If she has no smartphone, she can reply to that SMS to check in. Her code:</p>
          <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} }} className="mt-3 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 font-mono text-2xl tracking-[0.3em]">{code} {copied ? <Check className="size-4 text-green" /> : <Copy className="size-4 text-muted" />}</button>
          <p className="mt-2 text-xs text-emerald/80">Write it on her ANC card. Link: mamacare.rw/invite/{code}</p>
        </div>
        <div className="flex gap-3"><Button href="/chw/enrol" variant="secondary">Enrol another</Button><Button href="/chw/caseload" variant="ghost">Caseload</Button></div>
      </div>
    );
  }
  return (
    <form action={action} onSubmit={(e) => { if (online) return; e.preventDefault(); enqueue({ kind: "enrol", label: "Enrolment", payload: formToPayload(new FormData(e.currentTarget)) }); setSaved(true); }} className="space-y-5" noValidate>
      {!online && <OfflineNote />}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" className="sm:col-span-2"><input name="name" className={fieldCls} required autoComplete="off" /></Field>
        <Field label="Mobile number" hint="Hers, or a family phone she can use."><input name="phone" type="tel" inputMode="tel" className={fieldCls} placeholder="078 123 4567" required /></Field>
        <Field label="Age"><input name="age" type="number" inputMode="numeric" min={12} max={55} className={fieldCls} /></Field>
        <Field label="Weeks pregnant (approx.)"><input name="weeks" type="number" inputMode="numeric" min={1} max={42} className={fieldCls} /></Field>
        <Field label="Pregnancies so far (incl. this)"><input name="gravida" type="number" inputMode="numeric" min={1} max={15} className={fieldCls} defaultValue={1} /></Field>
        <Field label="Village"><input name="village" className={fieldCls} defaultValue="Gasharu" /></Field>
        <Field label="Preferred language"><select name="language" className={fieldCls} defaultValue="rw"><option value="rw">Ikinyarwanda</option><option value="en">English</option></select></Field>
      </div>
      <details className="group rounded-md border border-emerald/15 bg-white p-4 open:bg-emerald/[0.03]">
        <summary className="cursor-pointer list-none text-sm font-semibold text-emerald">
          <span className="inline-flex items-center gap-2"><Users className="size-4" /> Add a family supporter now <span className="font-normal text-muted">(optional — you can add more later)</span></span>
        </summary>
        <p className="mt-2 text-xs text-muted">Husband, mother, sister, neighbour… They get an SMS invite and can report danger signs and receive her reminders. She confirms them from her phone.</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <Field label="Supporter’s name"><input name="supName" className={fieldCls} autoComplete="off" /></Field>
          <Field label="Relationship"><select name="supRelation" className={fieldCls} defaultValue={RELATIONS[0]}>{RELATIONS.map((r) => <option key={r}>{r}</option>)}</select></Field>
          <Field label="Mobile number"><input name="supPhone" type="tel" inputMode="tel" className={fieldCls} placeholder="078 123 4567" /></Field>
        </div>
      </details>
      <label className="flex items-start gap-3 rounded-md border border-emerald/15 bg-white p-3 text-sm text-ink/90 has-[:checked]:border-emerald has-[:checked]:bg-emerald/5"><input type="checkbox" name="consent" className="mt-0.5 size-4 accent-emerald" required /> I have explained MamaCare to her in Kinyarwanda, what it is not (a doctor), who will see her information, and she agrees to be enrolled. She will confirm on her own phone.</label>
      <FormError message={state?.error} />
      <Button type="submit" variant="coral" size="lg" disabled={pending} arrow={!pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : online ? "Enrol and send SMS" : "Save on phone"}</Button>
    </form>
  );
}
