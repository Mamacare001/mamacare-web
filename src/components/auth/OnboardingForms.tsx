"use client";

import { useActionState } from "react";
import { Baby, HeartHandshake, Stethoscope, Loader2, MessageCircle, MessageSquare, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormError, fieldCls, ChoiceCard } from "@/components/auth/fields";
import { chooseRole, saveMother, saveFamily, saveWorker, acceptConsent, type ActionState } from "@/app/onboarding/actions";
import type { Onboarding } from "@/lib/onboarding";

function Submit({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <Button type="submit" variant="coral" size="lg" className="w-full" disabled={pending} arrow={!pending}>
      {pending ? <Loader2 className="size-4 animate-spin" /> : children}
    </Button>
  );
}

function ChannelPicker({ defaultValue = "whatsapp" }: { defaultValue?: string }) {
  const opts = [
    { v: "whatsapp", l: "WhatsApp", i: MessageCircle },
    { v: "sms", l: "SMS", i: MessageSquare },
    { v: "app", l: "This app", i: Smartphone },
  ];
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-emerald">How should MamaCare reach you?</legend>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {opts.map((o) => (
          <label key={o.v} className="cursor-pointer">
            <input type="radio" name="channel" value={o.v} defaultChecked={defaultValue === o.v} className="peer sr-only" />
            <span className="flex flex-col items-center gap-1.5 rounded-md border border-emerald/15 bg-white px-2 py-3 text-xs font-semibold text-emerald transition-all peer-checked:border-emerald peer-checked:bg-emerald/5 peer-focus-visible:ring-2 peer-focus-visible:ring-green">
              <o.i className="size-5" aria-hidden />
              {o.l}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function RoleForm({ ob }: { ob: Onboarding }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(chooseRole, null);
  return (
    <form action={action} className="space-y-5" noValidate>
      <input type="hidden" name="name" value={ob.name ?? ""} />
      <input type="hidden" name="phone" value={ob.phone ?? ""} />
      <div className="space-y-3">
        <ChoiceCard name="role" value="mother" title="I am pregnant" text="Ndatwite. Check in about how you feel and get guidance." defaultChecked={ob.role === "mother" || !ob.role} icon={<Baby className="size-5" />} />
        <ChoiceCard name="role" value="family" title="I support a pregnant woman" text="Partner, parent, sister or friend. Report what you notice, with her approval." defaultChecked={ob.role === "family"} icon={<HeartHandshake className="size-5" />} />
        <ChoiceCard name="role" value="worker" title="I am a health worker" text="Community Health Worker, nurse, midwife or doctor with an invite code." defaultChecked={ob.role === "worker"} icon={<Stethoscope className="size-5" />} />
      </div>
      <fieldset>
        <legend className="text-sm font-semibold text-emerald">Language · Ururimi</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {[["rw", "Ikinyarwanda"], ["en", "English"]].map(([v, l]) => (
            <label key={v} className="cursor-pointer">
              <input type="radio" name="language" value={v} defaultChecked={(ob.language ?? "rw") === v} className="peer sr-only" />
              <span className="block rounded-md border border-emerald/15 bg-white px-3 py-2.5 text-center text-sm font-semibold text-emerald transition-all peer-checked:border-emerald peer-checked:bg-emerald/5 peer-focus-visible:ring-2 peer-focus-visible:ring-green">{l}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <FormError message={state?.error} />
      <Submit pending={pending}>Continue</Submit>
    </form>
  );
}

export function MotherForm({ ob, districts }: { ob: Onboarding; districts: string[] }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveMother, null);
  const m = ob.mother ?? {};
  return (
    <form action={action} className="space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Expected due date" hint="If you know it from your ANC card.">
          <input type="date" name="edd" defaultValue={m.edd} className={fieldCls} />
        </Field>
        <Field label="Or weeks pregnant" hint="Roughly is fine.">
          <input type="number" name="weeks" min={1} max={45} inputMode="numeric" defaultValue={m.weeks} className={fieldCls} placeholder="e.g. 28" />
        </Field>
      </div>
      <fieldset>
        <legend className="text-sm font-semibold text-emerald">Is this your first pregnancy?</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {[["yes", "Yes, my first"], ["no", "No, I have been pregnant before"]].map(([v, l]) => (
            <label key={v} className="cursor-pointer">
              <input type="radio" name="firstPregnancy" value={v} defaultChecked={m.firstPregnancy === v} className="peer sr-only" />
              <span className="block rounded-md border border-emerald/15 bg-white px-3 py-2.5 text-center text-sm font-semibold text-emerald transition-all peer-checked:border-emerald peer-checked:bg-emerald/5 peer-focus-visible:ring-2 peer-focus-visible:ring-green">{l}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="District">
          <select name="district" defaultValue={m.district ?? ""} className={fieldCls} required>
            <option value="" disabled>Choose…</option>
            {districts.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="Health centre" hint="Where you go for ANC, if you have started.">
          <input name="facility" defaultValue={m.facility} className={fieldCls} placeholder="e.g. Kinyinya Health Centre" />
        </Field>
      </div>
      <ChannelPicker defaultValue={ob.channel} />
      {ob.invite && <p className="rounded-md bg-green-100 px-3 py-2 text-sm text-emerald">Invited by your CHW · code <span className="font-mono font-bold">{ob.invite}</span></p>}
      <FormError message={state?.error} />
      <Submit pending={pending}>Continue to consent</Submit>
    </form>
  );
}

export function FamilyForm({ ob }: { ob: Onboarding }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveFamily, null);
  const f = ob.family ?? {};
  return (
    <form action={action} className="space-y-5" noValidate>
      <Field label="The mother's MamaCare code" hint="She can find it under “My circle” and share it with you. Nothing is shared until she approves you.">
        <input name="motherCode" defaultValue={f.motherCode} className={`${fieldCls} font-mono uppercase tracking-[0.3em]`} placeholder="ABC123" maxLength={8} autoCapitalize="characters" required />
      </Field>
      <Field label="Your relationship to her">
        <select name="relation" defaultValue={f.relation ?? ""} className={fieldCls} required>
          <option value="" disabled>Choose…</option>
          {["Husband / partner", "Mother", "Mother-in-law", "Sister", "Aunt", "Friend / neighbour", "Other"].map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </Field>
      <ChannelPicker defaultValue={ob.channel} />
      <FormError message={state?.error} />
      <Submit pending={pending}>Send link request</Submit>
    </form>
  );
}

export function WorkerForm({ ob }: { ob: Onboarding }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveWorker, null);
  const w = ob.worker ?? {};
  return (
    <form action={action} className="space-y-5" noValidate>
      <div className="space-y-3">
        <ChoiceCard name="kind" value="chw" title="Community Health Worker" text="Umujyanama w’ubuzima. Caseload for your village, visits and referrals." defaultChecked={w.kind === "chw" || !w.kind} />
        <ChoiceCard name="kind" value="provider" title="Nurse, midwife or doctor" text="Facility staff: review escalations, add clinical data, close the loop." defaultChecked={w.kind === "provider"} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Health facility">
          <input name="facility" defaultValue={w.facility} className={fieldCls} placeholder="e.g. Kinyinya Health Centre" required />
        </Field>
        <Field label="Village / cell" hint="CHWs only.">
          <input name="village" defaultValue={w.village} className={fieldCls} placeholder="e.g. Gasharu" />
        </Field>
      </div>
      <Field label="Invite code" hint="From your facility in-charge or CHW supervisor. Your account stays pending until they approve it.">
        <input name="code" defaultValue={w.code} className={`${fieldCls} font-mono uppercase tracking-[0.2em]`} placeholder="HC-KNY-4F7Q" required />
      </Field>
      <FormError message={state?.error} />
      <Submit pending={pending}>Request access</Submit>
    </form>
  );
}

const points = [
  "MamaCare is not a doctor and does not diagnose. In an emergency I call 912 or go to a facility.",
  "What I share will be seen by my Community Health Worker and my health facility, and by any family member I approve.",
  "A computer system reads my messages to understand them and assess risk. A person always decides what happens next.",
  "My information is protected under Rwanda’s data-protection law and is never sold or used for advertising.",
  "Partners only ever receive figures about many women together, never my name or record, unless I separately join a programme.",
  "I can see who has looked at my record, remove anyone from my circle, export my data, or ask for it to be deleted, at any time.",
];

export function ConsentForm({ ob }: { ob: Onboarding }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(acceptConsent, null);
  const isWorker = ob.role === "worker";
  return (
    <form action={action} className="space-y-5" noValidate>
      <ol className="space-y-2.5">
        {points.map((p, i) => (
          <li key={i}>
            <label className="flex cursor-pointer items-start gap-3 rounded-md border border-emerald/10 bg-white p-3.5 transition-colors has-[:checked]:border-emerald has-[:checked]:bg-emerald/5">
              <input type="checkbox" name={`c${i + 1}`} className="mt-1 size-4 shrink-0 accent-emerald" required />
              <span className="text-[15px] leading-relaxed text-ink/90">{isWorker && i === 1 ? "I will only access records of mothers in my care, and my access is logged and reviewed." : p}</span>
            </label>
          </li>
        ))}
      </ol>
      <p className="text-xs text-muted">
        By continuing you agree to the <a href="/consent" target="_blank" className="underline underline-offset-4">consent terms</a>, <a href="/privacy" target="_blank" className="underline underline-offset-4">privacy policy</a> and <a href="/terms" target="_blank" className="underline underline-offset-4">terms of use</a>.
      </p>
      <FormError message={state?.error} />
      <Submit pending={pending}>I agree · Ndabyemeye</Submit>
    </form>
  );
}
