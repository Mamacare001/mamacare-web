"use client";

import { useActionState, useState } from "react";
import { Loader2, CheckCircle2, Copy, Check, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormError, fieldCls } from "@/components/auth/fields";
import { enrolMotherAtClinic, type State } from "@/app/clinic/actions";
import { catchmentChws } from "@/lib/mock/clinic";
import { RELATIONS } from "@/lib/mock/chw";

export function ClinicEnrolForm() {
  const [state, action, pending] = useActionState<State, FormData>(enrolMotherAtClinic, null);
  const [copied, setCopied] = useState(false);

  if (state?.ok) {
    const code = state.message ?? "";
    return (
      <div className="space-y-4">
        <div className="rounded-xl bg-green-100 p-6 text-emerald">
          <p className="flex items-center gap-2 font-display text-2xl"><CheckCircle2 className="size-6 text-green" /> Enrolled.</p>
          <p className="mt-2 text-[15px]">She has been sent an SMS with her link, and the assigned CHW has been notified. Her code:</p>
          <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} }} className="mt-3 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 font-mono text-2xl tracking-[0.3em]">{code} {copied ? <Check className="size-4 text-green" /> : <Copy className="size-4 text-muted" />}</button>
          <p className="mt-2 text-xs text-emerald/80">Write it on her ANC card. Link: mamacare.rw/invite/{code}</p>
        </div>
        <div className="flex gap-3"><Button href="/clinic/enrol" variant="secondary">Enrol another</Button><Button href="/clinic" variant="ghost">Today</Button></div>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6" noValidate>
      <fieldset className="space-y-4">
        <legend className="text-h3 text-emerald">Her details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" className="sm:col-span-2"><input name="name" className={fieldCls} required autoComplete="off" /></Field>
          <Field label="Mobile number" hint="Hers, or a family phone she can use."><input name="phone" type="tel" inputMode="tel" className={fieldCls} placeholder="078 123 4567" required /></Field>
          <Field label="Age"><input name="age" type="number" inputMode="numeric" min={12} max={55} className={fieldCls} /></Field>
          <Field label="National ID / Mutuelle no." hint="Optional. Used only to link her facility record."><input name="nid" className={fieldCls} autoComplete="off" /></Field>
          <Field label="Preferred language"><select name="language" className={fieldCls} defaultValue="rw"><option value="rw">Ikinyarwanda</option><option value="en">English</option></select></Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-h3 text-emerald">This pregnancy</legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Last menstrual period"><input name="lmp" type="date" className={fieldCls} /></Field>
          <Field label="or weeks pregnant"><input name="weeks" type="number" inputMode="numeric" min={1} max={42} className={fieldCls} /></Field>
          <Field label="Gravida / Para" hint="Pregnancies incl. this one / births"><div className="grid grid-cols-2 gap-2"><input name="gravida" type="number" min={1} max={15} className={fieldCls} defaultValue={1} aria-label="Gravida" /><input name="para" type="number" min={0} max={15} className={fieldCls} defaultValue={0} aria-label="Para" /></div></Field>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {["Previous C-section", "Previous stillbirth or neonatal death", "Previous haemorrhage (PPH)", "Known hypertension", "Known diabetes", "HIV positive (on ART)", "Age under 18 or over 35", "Twins suspected"].map((r) => (
            <label key={r} className="flex items-center gap-2 rounded-md border border-emerald/15 bg-white px-3 py-2 text-sm text-ink/90 has-[:checked]:border-emerald has-[:checked]:bg-emerald/5"><input type="checkbox" name="riskFactors" value={r} className="size-4 accent-emerald" /> {r}</label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-h3 text-emerald">Where she lives · who follows her</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Village"><input name="village" className={fieldCls} required /></Field>
          <Field label="Assign CHW" hint="She is followed at home between ANC visits.">
            <select name="chwId" className={fieldCls} defaultValue="" required>
              <option value="" disabled>Choose…</option>
              {catchmentChws.map((c) => <option key={c.id} value={c.id}>{c.name} · {c.cell} / {c.village}</option>)}
            </select>
          </Field>
        </div>
      </fieldset>

      <details className="group rounded-md border border-emerald/15 bg-white p-4 open:bg-emerald/[0.03]">
        <summary className="cursor-pointer list-none text-sm font-semibold text-emerald"><span className="inline-flex items-center gap-2"><Users className="size-4" /> Add a family supporter now <span className="font-normal text-muted">(optional)</span></span></summary>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <Field label="Supporter’s name"><input name="supName" className={fieldCls} autoComplete="off" /></Field>
          <Field label="Relationship"><select name="supRelation" className={fieldCls} defaultValue={RELATIONS[0]}>{RELATIONS.map((r) => <option key={r}>{r}</option>)}</select></Field>
          <Field label="Mobile number"><input name="supPhone" type="tel" inputMode="tel" className={fieldCls} placeholder="078 123 4567" /></Field>
        </div>
      </details>

      <label className="flex items-start gap-3 rounded-md border border-emerald/15 bg-white p-3 text-sm text-ink/90 has-[:checked]:border-emerald has-[:checked]:bg-emerald/5"><input type="checkbox" name="consent" className="mt-0.5 size-4 accent-emerald" required /> I have explained MamaCare to her, what it is not (a doctor), who will see her information, and she agrees to be enrolled. She will confirm on her own phone.</label>
      <FormError message={state?.error} />
      <Button type="submit" variant="coral" size="lg" disabled={pending} arrow={!pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : "Enrol and send SMS"}</Button>
    </form>
  );
}
