"use client";

import { useActionState, useTransition } from "react";
import { CheckCircle2, Loader2, Unlink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/auth/fields";
import { updateFamilySettings, unlinkMother, type State } from "@/app/family/actions";
import type { LinkedMother } from "@/lib/mock/family";

function Radio({ name, v, l, on }: { name: string; v: string; l: string; on: boolean }) {
  return (
    <label className="cursor-pointer"><input type="radio" name={name} value={v} defaultChecked={on} className="peer sr-only" /><span className="block rounded-md border border-emerald/15 bg-white px-3 py-2.5 text-center text-sm font-semibold text-emerald peer-checked:border-emerald peer-checked:bg-emerald/5">{l}</span></label>
  );
}

export function FamilySettingsForm({ language, channel, mothers }: { language: string; channel: string; mothers: LinkedMother[] }) {
  const [state, action, pending] = useActionState<State, FormData>(updateFamilySettings, null);
  const [, start] = useTransition();
  return (
    <div className="space-y-8">
      <form action={action} className="space-y-6" noValidate>
        <fieldset><legend className="text-eyebrow mb-2 text-muted">Language · Ururimi</legend><div className="grid grid-cols-2 gap-2"><Radio name="language" v="rw" l="Ikinyarwanda" on={language === "rw"} /><Radio name="language" v="en" l="English" on={language === "en"} /></div></fieldset>
        <fieldset><legend className="text-eyebrow mb-2 text-muted">How MamaCare reaches you</legend><div className="grid grid-cols-3 gap-2"><Radio name="channel" v="whatsapp" l="WhatsApp" on={channel === "whatsapp"} /><Radio name="channel" v="sms" l="SMS" on={channel === "sms"} /><Radio name="channel" v="app" l="This app" on={channel === "app"} /></div></fieldset>
        <fieldset className="space-y-3">
          <legend className="text-eyebrow mb-2 text-muted">Notifications</legend>
          {[["n_guidance", "Guidance sent to her", "So you know what she has been advised to do."], ["n_escalation", "Escalations", "When her CHW or facility is alerted. Always on for high risk."], ["n_visits", "Visit reminders", "Two days before each ANC visit, so you can help her get there."]].map(([n, l, h]) => (
            <label key={n} className="flex cursor-pointer items-start justify-between gap-4 rounded-md bg-white p-4 ring-1 ring-emerald/5"><span><span className="block font-semibold text-emerald">{l}</span><span className="block text-sm text-muted">{h}</span></span><input type="checkbox" name={n} defaultChecked className="mt-1 size-5 accent-emerald" /></label>
          ))}
        </fieldset>
        <FormError message={state?.error} />
        {state?.ok && <p className="flex items-center gap-2 rounded-md bg-green-100 px-3 py-2 text-sm text-emerald"><CheckCircle2 className="size-4 text-green" /> {state.message}</p>}
        <Button type="submit" variant="primary" disabled={pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : "Save settings"}</Button>
      </form>

      <section>
        <p className="text-eyebrow mb-2 text-muted">Women you support</p>
        <ul className="space-y-2">
          {mothers.map((m) => (
            <li key={m.id} className="flex items-center justify-between gap-3 rounded-md bg-white p-4 ring-1 ring-emerald/5">
              <div><p className="font-semibold text-emerald">{m.name}</p><p className="text-sm text-muted">{m.relation} · {m.status === "active" ? "linked" : "pending her approval"}</p></div>
              <button type="button" onClick={() => { if (confirm(`Stop supporting ${m.name}? You will no longer see her guidance.`)) start(() => unlinkMother(m.id)); }} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-coral hover:bg-coral-100"><Unlink className="size-4" /> Unlink</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
