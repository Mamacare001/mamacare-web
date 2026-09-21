"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormError, fieldCls } from "@/components/auth/fields";
import { updateProfile, updateSettings, requestExport, requestDeletion, type State } from "@/app/app/actions";
import { DISTRICTS } from "@/lib/districts";
import type { profile as P } from "@/lib/mock/mother";

function Ok({ state }: { state: State }) {
  if (!state?.ok) return null;
  return <p className="flex items-center gap-2 rounded-md bg-green-100 px-3 py-2 text-sm text-emerald"><CheckCircle2 className="size-4 text-green" /> {state.message}</p>;
}

export function ProfileForm({ p }: { p: typeof P }) {
  const [state, action, pending] = useActionState<State, FormData>(updateProfile, null);
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2" noValidate>
      <Field label="Full name" className="sm:col-span-2"><input name="name" defaultValue={p.name} className={fieldCls} required /></Field>
      <Field label="Phone number" hint="Used for SMS and WhatsApp. To change it, contact support."><input value={p.phone} className={fieldCls} disabled readOnly /></Field>
      <Field label="Expected due date"><input type="date" name="edd" defaultValue={p.edd} className={fieldCls} /></Field>
      <Field label="District"><select name="district" defaultValue={p.district} className={fieldCls}>{DISTRICTS.map((d) => <option key={d}>{d}</option>)}</select></Field>
      <Field label="Health centre"><input name="facility" defaultValue={p.facility} className={fieldCls} /></Field>
      <div className="sm:col-span-2 space-y-3">
        <FormError message={state?.error} /><Ok state={state} />
        <Button type="submit" variant="primary" disabled={pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : "Save changes"}</Button>
      </div>
    </form>
  );
}

function Toggle({ name, label, hint, on }: { name: string; label: string; hint: string; on?: boolean }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-md bg-white p-4 ring-1 ring-emerald/5">
      <span><span className="block font-semibold text-emerald">{label}</span><span className="block text-sm text-muted">{hint}</span></span>
      <input type="checkbox" name={name} defaultChecked={on} className="mt-1 size-5 accent-emerald" />
    </label>
  );
}

export function SettingsForm({ p }: { p: typeof P }) {
  const [state, action, pending] = useActionState<State, FormData>(updateSettings, null);
  return (
    <form action={action} className="space-y-6" noValidate>
      <fieldset className="space-y-3">
        <legend className="text-eyebrow mb-2 text-muted">Language · Ururimi</legend>
        <div className="grid grid-cols-2 gap-2">
          {[["rw", "Ikinyarwanda"], ["en", "English"]].map(([v, l]) => (
            <label key={v} className="cursor-pointer"><input type="radio" name="language" value={v} defaultChecked={p.language === v} className="peer sr-only" /><span className="block rounded-md border border-emerald/15 bg-white px-3 py-2.5 text-center text-sm font-semibold text-emerald peer-checked:border-emerald peer-checked:bg-emerald/5">{l}</span></label>
          ))}
        </div>
      </fieldset>
      <fieldset className="space-y-3">
        <legend className="text-eyebrow mb-2 text-muted">How MamaCare reaches you</legend>
        <div className="grid grid-cols-3 gap-2">
          {[["whatsapp", "WhatsApp"], ["sms", "SMS"], ["app", "This app"]].map(([v, l]) => (
            <label key={v} className="cursor-pointer"><input type="radio" name="channel" value={v} defaultChecked={p.channel === v} className="peer sr-only" /><span className="block rounded-md border border-emerald/15 bg-white px-3 py-2.5 text-center text-sm font-semibold text-emerald peer-checked:border-emerald peer-checked:bg-emerald/5">{l}</span></label>
          ))}
        </div>
      </fieldset>
      <fieldset className="space-y-3">
        <legend className="text-eyebrow mb-2 text-muted">Notifications</legend>
        <Toggle name="n_checkin" label="Check-in reminders" hint="A short message every few days asking how you feel." on />
        <Toggle name="n_visits" label="Visit reminders" hint="Two days before each ANC visit." on />
        <Toggle name="n_guidance" label="Weekly guidance" hint="One tip for your week of pregnancy." on />
        <Toggle name="n_circle" label="Circle activity" hint="When someone joins, or your CHW records a visit." on />
      </fieldset>
      <FormError message={state?.error} /><Ok state={state} />
      <Button type="submit" variant="primary" disabled={pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : "Save settings"}</Button>
    </form>
  );
}

export function ExportCard() {
  const [state, action, pending] = useActionState<State, FormData>(requestExport, null);
  return (
    <form action={action} className="rounded-lg bg-white p-5 ring-1 ring-emerald/5">
      <div className="flex items-center gap-3"><Download className="size-5 text-green" /><p className="font-display text-xl text-emerald">Export my data</p></div>
      <p className="mt-2 text-sm text-muted">A copy of everything MamaCare holds about you — your record, conversations, and the access log — as a file you can keep.</p>
      <div className="mt-4 space-y-3"><Ok state={state} /><Button type="submit" variant="secondary" disabled={pending || !!state?.ok}>{pending ? <Loader2 className="size-4 animate-spin" /> : "Request export"}</Button></div>
    </form>
  );
}

export function DeleteCard() {
  const [state, action, pending] = useActionState<State, FormData>(requestDeletion, null);
  return (
    <form action={action} className="rounded-lg bg-white p-5 ring-1 ring-coral/20">
      <div className="flex items-center gap-3"><Trash2 className="size-5 text-coral" /><p className="font-display text-xl text-emerald">Delete my account and data</p></div>
      <p className="mt-2 text-sm text-muted">Your CHW and facility will no longer see you in MamaCare. Where a health-record rule requires something to be kept, our Data Protection Officer will tell you exactly what and why.</p>
      {state?.ok ? <div className="mt-4"><Ok state={state} /></div> : (
        <div className="mt-4 space-y-3">
          <Field label="Type DELETE to confirm"><input name="confirm" className={fieldCls} autoComplete="off" /></Field>
          <FormError message={state?.error} />
          <Button type="submit" variant="coral" disabled={pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : "Request deletion"}</Button>
        </div>
      )}
    </form>
  );
}
