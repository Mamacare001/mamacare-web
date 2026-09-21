"use client";

import { useActionState, useState } from "react";
import { Loader2, CheckCircle2, WifiOff, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormError, fieldCls } from "@/components/auth/fields";
import { RELATIONS } from "@/lib/mock/chw";
import { enqueue, formToPayload, useOnline } from "@/lib/offline/queue";

type State = { ok?: boolean; error?: string; message?: string } | null;

/**
 * Add a family supporter to a mother's circle. Used by CHWs (offline-aware) and clinic staff.
 * The supporter receives an SMS invite; the mother confirms the person from her own phone before
 * they can see anything about her (consent stays with her).
 */
export function SupporterForm({
  motherId,
  motherName,
  action,
  back,
  offlineCapable = false,
}: {
  motherId: string;
  motherName: string;
  action: (prev: State, fd: FormData) => Promise<State>;
  back: string;
  offlineCapable?: boolean;
}) {
  const online = useOnline();
  const [state, formAction, pending] = useActionState<State, FormData>(action, null);
  const [saved, setSaved] = useState(false);
  const first = motherName.split(" ")[0];
  const offline = offlineCapable && !online;

  if (saved || state?.ok)
    return (
      <div className="space-y-4">
        <div className={saved ? "rounded-xl bg-gold-100 p-6 text-midnight" : "rounded-xl bg-green-100 p-6 text-emerald"}>
          <p className="flex items-center gap-2 font-display text-2xl">{saved ? <WifiOff className="size-6" /> : <CheckCircle2 className="size-6 text-green" />} {saved ? "Saved on this phone." : "Supporter added."}</p>
          <p className="mt-2 text-[15px]">{saved ? "The invite SMS will go out when you are back on network." : state?.message}</p>
        </div>
        <div className="flex gap-3">
          <Button href={back} variant="primary">Back to {first}</Button>
          <Button href={`${back}/supporters`} variant="ghost">Add another</Button>
        </div>
      </div>
    );

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!offline) return;
        e.preventDefault();
        enqueue({ kind: "supporter", label: `Supporter for ${first}`, payload: formToPayload(new FormData(e.currentTarget)) });
        setSaved(true);
      }}
      className="space-y-5"
      noValidate
    >
      {offline && <p className="flex items-center gap-2 rounded-md bg-gold-100 px-3 py-2 text-sm font-semibold text-[#8a6a10]"><WifiOff className="size-4" /> Offline — this will be saved on the phone and sent when you are back on network.</p>}
      <input type="hidden" name="motherId" value={motherId} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Supporter’s full name" className="sm:col-span-2"><input name="name" className={fieldCls} required autoComplete="off" /></Field>
        <Field label="Relationship to her">
          <select name="relation" className={fieldCls} defaultValue={RELATIONS[0]}>{RELATIONS.map((r) => <option key={r}>{r}</option>)}</select>
        </Field>
        <Field label="Mobile number" hint="They get an SMS invite. She confirms them from her phone."><input name="phone" type="tel" inputMode="tel" className={fieldCls} placeholder="078 123 4567" required /></Field>
      </div>
      <fieldset className="rounded-md border border-emerald/15 bg-white p-4">
        <legend className="px-1 text-sm font-semibold text-emerald">What they can do</legend>
        <div className="grid gap-2 text-sm text-ink/90 sm:grid-cols-2">
          {[["observe", "Report observations (bleeding, fits, fever…)", true], ["reminders", "Receive her visit reminders", true], ["alerts", "Be alerted when she is escalated", true], ["transport", "Be the transport contact for emergencies", false]].map(([v, l, on]) => (
            <label key={String(v)} className="flex items-start gap-2"><input type="checkbox" name="perm" value={String(v)} defaultChecked={Boolean(on)} className="mt-0.5 size-4 accent-emerald" /> {l}</label>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">Supporters never see her conversations or clinical notes. She can remove them at any time.</p>
      </fieldset>
      <label className="flex items-start gap-3 rounded-md border border-emerald/15 bg-white p-3 text-sm text-ink/90 has-[:checked]:border-emerald has-[:checked]:bg-emerald/5"><input type="checkbox" name="consent" className="mt-0.5 size-4 accent-emerald" required /> {first} has asked for this person to be added and understands what they will be told.</label>
      <FormError message={state?.error} />
      <Button type="submit" variant="coral" size="lg" disabled={pending} arrow={!pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : <><UserPlus className="size-4" /> {offline ? "Save on phone" : "Add and send invite"}</>}</Button>
    </form>
  );
}
