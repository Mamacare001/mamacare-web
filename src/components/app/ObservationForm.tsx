"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Loader2, Phone, ShieldAlert, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormError, fieldCls } from "@/components/auth/fields";
import { submitObservation, type ReportResult } from "@/app/family/actions";
import { observationSigns, type LinkedMother } from "@/lib/mock/family";
import { useLang } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/cn";

export function ObservationForm({ mothers, preselect }: { mothers: LinkedMother[]; preselect?: string }) {
  const { lang } = useLang();
  const [state, action, pending] = useActionState<ReportResult, FormData>(submitObservation, null);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const active = mothers.filter((m) => m.status === "active");
  const t = (en: string, rw: string) => (lang === "rw" ? rw : en);

  if (state?.ok) {
    const tone = state.risk === "high" ? "bg-coral text-white" : state.risk === "moderate" ? "bg-gold text-midnight" : "bg-green text-ivory";
    return (
      <div className="space-y-4">
        <div className={cn("rounded-xl p-6", tone)}>
          <div className="flex items-center gap-3">
            {state.risk === "low" ? <ShieldCheck className="size-7" /> : <ShieldAlert className="size-7" />}
            <p className="font-display text-2xl leading-tight md:text-3xl">{state.headline}</p>
          </div>
          <ol className="mt-5 space-y-2">
            {state.steps.map((s, i) => (
              <li key={i} className="flex gap-3 text-[15px]"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/25 text-xs font-bold">{i + 1}</span>{s}</li>
            ))}
          </ol>
          {state.risk === "high" && (
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="tel:912" variant="light" className="!text-coral"><Phone className="size-4" /> Call 912</Button>
              <Button href="tel:+250788000111" variant="ghost" className="!text-white ring-1 ring-white/50 hover:!bg-white/10">Call Marie (CHW)</Button>
            </div>
          )}
        </div>
        <div className="rounded-lg bg-white p-4 text-sm ring-1 ring-emerald/5">
          <p className="flex items-center gap-2 font-semibold text-emerald"><CheckCircle2 className="size-4 text-green" /> Report recorded and shared with:</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">{state.notified.map((n) => <li key={n} className="rounded-full bg-ivory px-2.5 py-1 text-xs text-ink/80">{n}</li>)}</ul>
          <p className="mt-3 text-xs text-muted">She is always told when a report is made about her.</p>
        </div>
        <div className="flex gap-3">
          <Button href="/family" variant="secondary">Back to home</Button>
          <Button href="/family/report" variant="ghost">Report something else</Button>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6" noValidate>
      <fieldset>
        <legend className="text-sm font-semibold text-emerald">{t("Who is this about?", "Ni kubera nde?")}</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {active.map((m) => (
            <label key={m.id} className="cursor-pointer">
              <input type="radio" name="motherId" value={m.id} defaultChecked={preselect ? preselect === m.id : active.length === 1} className="peer sr-only" required />
              <span className="flex items-center gap-3 rounded-md border border-emerald/15 bg-white p-3 peer-checked:border-emerald peer-checked:bg-emerald/5 peer-focus-visible:ring-2 peer-focus-visible:ring-green">
                <span className="grid size-9 place-items-center rounded-full bg-coral-100 text-coral text-sm font-bold">{m.name.slice(0, 1)}</span>
                <span><span className="block font-semibold text-emerald">{m.name}</span><span className="block text-xs text-muted">{m.relation} · week {m.weeks}</span></span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-emerald">{t("What did you notice? Tick all that apply.", "Wabonye iki? Shyira akamenyetso kuri byose.")}</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {observationSigns.map((s) => {
            const on = picked.has(s.id);
            const urgent = s.weight >= 4;
            return (
              <label key={s.id} className="cursor-pointer">
                <input type="checkbox" name={`sign_${s.id}`} className="peer sr-only" checked={on} onChange={(e) => setPicked((p) => { const n = new Set(p); if (e.target.checked) n.add(s.id); else n.delete(s.id); return n; })} />
                <span className={cn("flex items-center justify-between gap-3 rounded-md border bg-white p-3 text-[15px] transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-green", on ? (urgent ? "border-coral bg-coral-100/60" : "border-emerald bg-emerald/5") : "border-emerald/15")}>
                  <span><span className="block font-semibold text-emerald">{lang === "rw" ? s.rw : s.en}</span><span className="block text-xs text-muted">{lang === "rw" ? s.en : s.rw}</span></span>
                  {urgent && <span className="rounded-full bg-coral px-2 py-0.5 text-[10px] font-bold uppercase text-white">urgent</span>}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-emerald">{t("Since when?", "Kuva ryari?")}</legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[["now", t("Just now", "Ubu")], ["today", t("Today", "Uyu munsi")], ["days", t("A few days", "Iminsi mike")]].map(([v, l]) => (
            <label key={v} className="cursor-pointer"><input type="radio" name="when" value={v} defaultChecked={v === "now"} className="peer sr-only" /><span className="block rounded-md border border-emerald/15 bg-white px-3 py-2.5 text-center text-sm font-semibold text-emerald peer-checked:border-emerald peer-checked:bg-emerald/5">{l}</span></label>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-1.5">
        <span className="text-sm font-semibold text-emerald">{t("Anything else, in your own words", "Ikindi wongeraho, mu magambo yawe")}</span>
        <textarea name="note" rows={3} className={fieldCls} placeholder={t("e.g. She said the headache is worse in the morning", "urugero: Yavuze ko umutwe urushaho kuryana mu gitondo")} />
      </label>

      <FormError message={state && !state.ok ? state.error : null} />
      <Button type="submit" variant="coral" size="lg" className="w-full" disabled={pending} arrow={!pending}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : t("Send report", "Ohereza")}
      </Button>
      <p className="text-center text-xs text-muted">
        {t("If she is bleeding heavily, having fits, or unconscious, do not fill this form —", "Niba ava amaraso menshi, agagara, cyangwa ataramuka, ntutegereze —")} <Link href="/emergency" className="font-semibold text-coral underline underline-offset-4">{t("call 912 now", "hamagara 912 ubu")}</Link>.
      </p>
    </form>
  );
}
