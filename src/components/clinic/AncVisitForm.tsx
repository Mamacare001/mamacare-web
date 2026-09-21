"use client";

import { useActionState, useState } from "react";
import { Loader2, CheckCircle2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormError, fieldCls } from "@/components/auth/fields";
import { recordAncVisit, type State } from "@/app/clinic/actions";
import type { ClinicMother } from "@/lib/mock/clinic";
import { cn } from "@/lib/cn";

const DANGER = ["Vaginal bleeding", "Severe headache / blurred vision", "Convulsions", "Fever ≥ 38 °C", "Reduced fetal movement", "Severe abdominal pain", "Fluid leaking", "Difficulty breathing"];
const GIVEN = ["Iron + folic acid", "Tetanus toxoid", "IPTp-SP (malaria)", "Deworming", "Bed net", "Birth plan discussed"];

function hints(sys: number, dia: number, protein: string, hb: number, fhr: number, weeks: number, signs: number) {
  const out: { level: "high" | "moderate" | "info"; text: string }[] = [];
  if (sys >= 160 || dia >= 110) out.push({ level: "high", text: "Severe hypertension (≥ 160/110). Manage per protocol and refer to DH today." });
  else if ((sys >= 140 || dia >= 90) && weeks >= 20) out.push({ level: protein && protein !== "neg" ? "high" : "moderate", text: protein && protein !== "neg" ? "BP ≥ 140/90 with proteinuria after 20 weeks — pre-eclampsia criteria met. Refer." : "BP ≥ 140/90. Check urine protein; repeat BP after rest; CHW follow-up within 3 days." });
  if (hb && hb < 7) out.push({ level: "high", text: "Severe anaemia (Hb < 7). Refer for transfusion assessment." });
  else if (hb && hb < 11) out.push({ level: "moderate", text: "Anaemia. Iron/folate, deworm, malaria test; recheck Hb in 4 weeks." });
  if (fhr && (fhr < 110 || fhr > 160)) out.push({ level: "high", text: `FHR ${fhr} outside 110–160. Reassess now.` });
  if (signs > 0) out.push({ level: "high", text: `${signs} danger sign${signs > 1 ? "s" : ""} ticked — this is no longer a routine visit. Consider an encounter and referral.` });
  if (out.length === 0) out.push({ level: "info", text: "No rule flags. Confirm next appointment and reinforce danger signs with her and her supporter." });
  return out;
}

export function AncVisitForm({ m }: { m: ClinicMother }) {
  const [state, action, pending] = useActionState<State, FormData>(recordAncVisit, null);
  const [v, setV] = useState({ sys: 0, dia: 0, protein: "", hb: 0, fhr: 0, signs: 0 });
  const h = hints(v.sys, v.dia, v.protein, v.hb, v.fhr, m.weeks, v.signs);
  const nextNo = m.encounters.length + 1;

  if (state?.ok)
    return (
      <div className="space-y-4">
        <div className="rounded-xl bg-green-100 p-6 text-emerald"><p className="flex items-center gap-2 font-display text-2xl"><CheckCircle2 className="size-6 text-green" /> Visit reported.</p><p className="mt-2 text-[15px]">{state.message}</p></div>
        <div className="flex gap-3"><Button href={`/clinic/mother/${m.id}`} variant="primary">Back to record</Button><Button href="/clinic/visit" variant="secondary">Report another</Button></div>
      </div>
    );

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1fr_320px]" noValidate>
      <input type="hidden" name="motherId" value={m.id} />
      <div className="space-y-6">
        <fieldset>
          <legend className="text-h3 text-emerald">Visit</legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <Field label="ANC visit number"><select name="visitNo" className={fieldCls} defaultValue={String(Math.min(nextNo, 8))}>{[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n}{n >= 4 ? " (4+)" : ""}</option>)}</select></Field>
            <Field label="Date"><input name="date" type="date" className={fieldCls} defaultValue="2026-09-21" /></Field>
            <Field label="Gestational age (weeks)"><input name="weeks" type="number" min={1} max={42} className={fieldCls} defaultValue={m.weeks} /></Field>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-h3 text-emerald">Measurements</legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <Field label="BP systolic" hint="mmHg"><input name="sys" type="number" inputMode="numeric" className={fieldCls} required onChange={(e) => setV((s) => ({ ...s, sys: Number(e.target.value) }))} /></Field>
            <Field label="BP diastolic"><input name="dia" type="number" inputMode="numeric" className={fieldCls} required onChange={(e) => setV((s) => ({ ...s, dia: Number(e.target.value) }))} /></Field>
            <Field label="Weight (kg)"><input name="weight" type="number" inputMode="decimal" step="0.1" className={fieldCls} /></Field>
            <Field label="Fundal height (cm)"><input name="fh" type="number" inputMode="numeric" className={fieldCls} /></Field>
            <Field label="Fetal heart rate"><input name="fhr" type="number" inputMode="numeric" className={fieldCls} onChange={(e) => setV((s) => ({ ...s, fhr: Number(e.target.value) }))} /></Field>
            <Field label="Haemoglobin (g/dL)"><input name="hb" type="number" inputMode="decimal" step="0.1" className={fieldCls} onChange={(e) => setV((s) => ({ ...s, hb: Number(e.target.value) }))} /></Field>
            <Field label="Urine protein"><select name="protein" className={fieldCls} defaultValue="" onChange={(e) => setV((s) => ({ ...s, protein: e.target.value }))}><option value="">Not tested</option><option value="neg">Negative</option><option value="+">+</option><option value="++">++</option><option value="+++">+++</option></select></Field>
            <Field label="Presentation"><select name="presentation" className={fieldCls} defaultValue=""><option value="">—</option><option>Cephalic</option><option>Breech</option><option>Transverse</option><option>Not assessed</option></select></Field>
            <Field label="Malaria RDT"><select name="rdt" className={fieldCls} defaultValue=""><option value="">Not done</option><option>Negative</option><option>Positive</option></select></Field>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-h3 text-emerald">Danger signs today</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {DANGER.map((d) => (
              <label key={d} className="flex items-center gap-2 rounded-md border border-emerald/15 bg-white px-3 py-2 text-sm text-ink/90 has-[:checked]:border-coral has-[:checked]:bg-coral-100/60"><input type="checkbox" name="signs" value={d} className="size-4 accent-coral" onChange={(e) => setV((s) => ({ ...s, signs: s.signs + (e.target.checked ? 1 : -1) }))} /> {d}</label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-h3 text-emerald">Given / done today</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {GIVEN.map((g) => <label key={g} className="flex items-center gap-2 rounded-md border border-emerald/15 bg-white px-3 py-2 text-sm text-ink/90 has-[:checked]:border-emerald has-[:checked]:bg-emerald/5"><input type="checkbox" name="given" value={g} className="size-4 accent-emerald" /> {g}</label>)}
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-h3 text-emerald">Plan</legend>
          <Field label="Notes for the record"><textarea name="notes" rows={3} className={fieldCls} /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Next appointment" hint="She and her CHW get an SMS reminder 2 days before."><input name="nextVisit" type="date" className={fieldCls} required /></Field>
            <Field label="Message to her CHW" hint="Optional. What to watch for at home."><input name="chwNote" className={fieldCls} placeholder={`e.g. recheck BP on ${m.chwName.split(" ")[0]}’s next visit`} /></Field>
          </div>
        </fieldset>

        <FormError message={state?.error} />
        <Button type="submit" variant="coral" size="lg" disabled={pending} arrow={!pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : "Save visit report"}</Button>
      </div>

      <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
        <p className="flex items-center gap-2 text-eyebrow text-violet"><Lightbulb className="size-3.5" /> Rule hints · not a diagnosis</p>
        {h.map((x, i) => (
          <div key={i} className={cn("rounded-lg p-3 text-sm", x.level === "high" ? "bg-coral-100 text-coral" : x.level === "moderate" ? "bg-gold-100 text-[#8a6a10]" : "bg-violet-100 text-violet")}>{x.text}</div>
        ))}
        <div className="rounded-lg bg-white p-3 text-sm ring-1 ring-emerald/5">
          <p className="text-eyebrow text-muted">Last visit</p>
          {m.encounters[0] ? <p className="mt-1 text-ink/85">BP {m.encounters[0].bp ?? "—"} · Hb {m.encounters[0].hb ?? "—"} · FH {m.encounters[0].fh ?? "—"} · {m.encounters[0].impression}</p> : <p className="mt-1 text-muted">First visit here.</p>}
        </div>
        <p className="text-xs text-muted">Rule set v0.4. Thresholds need clinical-lead sign-off before real use.</p>
      </aside>
    </form>
  );
}
