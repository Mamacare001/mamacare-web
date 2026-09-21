"use client";

import { useActionState, useState } from "react";
import { Loader2, CheckCircle2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormError, fieldCls } from "@/components/auth/fields";
import { recordEncounter, type State } from "@/app/clinic/actions";
import type { ClinicMother } from "@/lib/mock/clinic";
import { cn } from "@/lib/cn";

/** Live rule hints beside the form — decision support, never a diagnosis. */
function hints(sys: number, dia: number, protein: string, hb: number, fhr: number, weeks: number) {
  const out: { level: "high" | "moderate" | "info"; text: string }[] = [];
  if (sys >= 160 || dia >= 110) out.push({ level: "high", text: "Severe hypertension (≥ 160/110). Consider severe pre-eclampsia: MgSO₄ per protocol, antihypertensive, urgent referral to DH." });
  else if ((sys >= 140 || dia >= 90) && weeks >= 20) out.push({ level: protein && protein !== "neg" ? "high" : "moderate", text: protein && protein !== "neg" ? "BP ≥ 140/90 with proteinuria after 20 weeks — meets pre-eclampsia criteria. Refer to DH." : "BP ≥ 140/90 after 20 weeks. Check urine protein; repeat BP after 4 h rest." });
  if (hb && hb < 7) out.push({ level: "high", text: "Severe anaemia (Hb < 7). Refer for transfusion assessment." });
  else if (hb && hb < 11) out.push({ level: "moderate", text: "Anaemia (Hb < 11). Iron/folate, deworm, malaria test; recheck in 4 weeks." });
  if (fhr && (fhr < 110 || fhr > 160)) out.push({ level: "high", text: `FHR ${fhr} outside 110–160. Reassess; consider urgent referral.` });
  return out;
}

export function EncounterForm({ m, fromQueue }: { m: ClinicMother; fromQueue?: string }) {
  const [state, action, pending] = useActionState<State, FormData>(recordEncounter, null);
  const [v, setV] = useState({ sys: 0, dia: 0, protein: "", hb: 0, fhr: 0 });
  const h = hints(v.sys, v.dia, v.protein, v.hb, v.fhr, m.weeks);

  if (state?.ok)
    return (
      <div className="space-y-4">
        <div className="rounded-xl bg-green-100 p-6 text-emerald"><p className="flex items-center gap-2 font-display text-2xl"><CheckCircle2 className="size-6 text-green" /> Saved.</p><p className="mt-2 text-[15px]">{state.message}</p></div>
        <div className="flex gap-3"><Button href={`/clinic/mother/${m.id}`} variant="primary">Back to record</Button><Button href="/clinic/queue" variant="secondary">Queue</Button></div>
      </div>
    );

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1fr_320px]" noValidate>
      <input type="hidden" name="motherId" value={m.id} />
      {fromQueue && <input type="hidden" name="queueId" value={fromQueue} />}
      <div className="space-y-6">
        <fieldset>
          <legend className="text-sm font-semibold text-emerald">Vitals & examination</legend>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Field label="BP systolic"><input name="bp_sys" type="number" inputMode="numeric" className={fieldCls} onChange={(e) => setV((s) => ({ ...s, sys: +e.target.value }))} /></Field>
            <Field label="BP diastolic"><input name="bp_dia" type="number" inputMode="numeric" className={fieldCls} onChange={(e) => setV((s) => ({ ...s, dia: +e.target.value }))} /></Field>
            <Field label="Temp °C"><input name="temp" type="number" step="0.1" inputMode="decimal" className={fieldCls} /></Field>
            <Field label="Weight kg"><input name="weight" type="number" step="0.1" inputMode="decimal" className={fieldCls} /></Field>
            <Field label="Urine protein"><select name="urine" className={fieldCls} defaultValue="" onChange={(e) => setV((s) => ({ ...s, protein: e.target.value }))}><option value="">—</option><option value="neg">Negative</option><option value="trace">Trace</option><option value="1+">1+</option><option value="2+">2+</option><option value="3+">3+ or more</option></select></Field>
            <Field label="Hb g/dL"><input name="hb" type="number" step="0.1" inputMode="decimal" className={fieldCls} onChange={(e) => setV((s) => ({ ...s, hb: +e.target.value }))} /></Field>
            <Field label="Fundal height cm"><input name="fh" type="number" inputMode="numeric" className={fieldCls} /></Field>
            <Field label="FHR bpm"><input name="fhr" type="number" inputMode="numeric" className={fieldCls} onChange={(e) => setV((s) => ({ ...s, fhr: +e.target.value }))} /></Field>
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold text-emerald">Presentation & findings</legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <Field label="Presentation"><select name="presentation" className={fieldCls} defaultValue=""><option value="">—</option><option>Cephalic</option><option>Breech</option><option>Transverse</option><option>Not palpable yet</option></select></Field>
            <Field label="Oedema"><select name="oedema" className={fieldCls} defaultValue=""><option value="">—</option><option>None</option><option>Feet only</option><option>Face / hands</option><option>Generalised</option></select></Field>
          </div>
          <Field label="Examination notes" className="mt-3"><textarea name="exam" rows={2} className={fieldCls} /></Field>
        </fieldset>
        <Field label="Clinical impression" hint="Your assessment. The hints on the right are decision support only."><input name="impression" className={fieldCls} required /></Field>
        <Field label="Plan" hint="Treatment, investigations, follow-up date."><textarea name="plan" rows={3} className={fieldCls} required /></Field>
        <fieldset>
          <legend className="text-sm font-semibold text-emerald">Disposition</legend>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[["home", "Home · follow-up"], ["observe", "Observe here"], ["admit", "Admit"], ["refer", "Refer to DH"]].map(([val, l]) => (
              <label key={val} className="cursor-pointer"><input type="radio" name="disposition" value={val} defaultChecked={val === "home"} className="peer sr-only" /><span className="block rounded-md border border-emerald/15 bg-white px-3 py-2.5 text-center text-sm font-semibold text-emerald peer-checked:border-emerald peer-checked:bg-emerald/5">{l}</span></label>
            ))}
          </div>
        </fieldset>
        <Field label={`Feedback to ${m.chwName} (CHW) — closes the loop`} hint="One or two lines: what you found, what happened, what the CHW should do at the next visit. Sent to their app and by SMS.">
          <textarea name="chwFeedback" rows={2} className={cn(fieldCls, "border-green/40")} placeholder="e.g. Seen 21 Sept. BP 148/94, protein 1+. Started on methyldopa, referred to Kibagabaga DH. Please visit on 24 Sept, check she took her tablets." />
        </Field>
        <FormError message={state?.error} />
        <Button type="submit" variant="coral" size="lg" disabled={pending} arrow={!pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : "Save encounter"}</Button>
      </div>

      <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-lg bg-white p-4 ring-1 ring-emerald/5">
          <p className="flex items-center gap-2 text-eyebrow text-violet"><Lightbulb className="size-3.5" /> Decision support · rule set v0.4</p>
          {h.length === 0 ? <p className="mt-2 text-sm text-muted">Enter BP, urine, Hb or FHR to see protocol hints.</p> : (
            <ul className="mt-2 space-y-2">
              {h.map((x, i) => <li key={i} className={cn("rounded-md p-3 text-sm", x.level === "high" ? "bg-coral-100/80 text-ink" : x.level === "moderate" ? "bg-gold-100/80 text-ink" : "bg-ivory text-ink/80")}>{x.text}</li>)}
            </ul>
          )}
          <p className="mt-3 text-xs text-muted">Hints follow Rwanda ANC / EmONC protocols and are reviewed by the clinical lead. They never replace your judgement.</p>
        </div>
        <div className="rounded-lg bg-white p-4 ring-1 ring-emerald/5 text-sm">
          <p className="text-eyebrow text-muted">Context</p>
          <p className="mt-1 text-ink/85">{m.weeks} wk · G{m.gravida}P{m.para}{m.bloodGroup && ` · ${m.bloodGroup}`}</p>
          {m.chwVisits[0]?.bp && <p className="text-ink/85">CHW BP today: <span className="font-mono">{m.chwVisits[0].bp}</span></p>}
          {m.encounters[0]?.bp && <p className="text-ink/85">Last clinic BP: <span className="font-mono">{m.encounters[0].bp}</span> ({new Date(m.encounters[0].at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })})</p>}
          {m.history.slice(0, 2).map((x) => <p key={x} className="text-xs text-muted">· {x}</p>)}
        </div>
      </aside>
    </form>
  );
}
