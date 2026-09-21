"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormError, fieldCls } from "@/components/auth/fields";
import { requestExport, type State } from "@/app/care/actions";
import { MIN_CELL } from "@/lib/mock/partner";

export function ExportForm() {
  const [state, action, pending] = useActionState<State, FormData>(requestExport, null);
  if (state?.ok) return <div className="rounded-xl bg-green-100 p-6 text-emerald"><p className="flex items-center gap-2 font-display text-2xl"><CheckCircle2 className="size-6 text-green" /> Requested.</p><p className="mt-2 text-[15px]">{state.message}</p></div>;
  return (
    <form action={action} className="space-y-5" noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Scope"><select name="scope" className={fieldCls} defaultValue="district"><option value="district">Gasabo district</option><option value="sectors">By sector</option></select></Field>
        <Field label="Period"><select name="period" className={fieldCls} defaultValue="q3"><option value="q3">1 Jul – 21 Sep 2026</option><option value="q2">1 Apr – 30 Jun 2026</option></select></Field>
        <Field label="Breakdown"><select name="breakdown" className={fieldCls} defaultValue="week"><option value="week">By week</option><option value="month">By month</option><option value="none">Totals only</option></select></Field>
        <Field label="Format"><select name="format" className={fieldCls} defaultValue="csv"><option value="csv">CSV</option><option value="xlsx">Excel</option><option value="pdf">PDF report</option></select></Field>
      </div>
      <fieldset>
        <legend className="text-sm font-semibold text-emerald">Indicators</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {["Escalations & reach within 24 h", "High-risk reach within 2 h", "Feedback-loop closure", "ANC 4+ coverage", "Facility deliveries", "Emergency admissions vs cohort", "Escalations by trigger", "Escalations by source"].map((i) => (
            <label key={i} className="flex items-center gap-3 rounded-md border border-emerald/15 bg-white p-3 text-sm text-emerald has-[:checked]:border-emerald has-[:checked]:bg-emerald/5"><input type="checkbox" name="ind" value={i} defaultChecked className="size-4 accent-emerald" /> {i}</label>
          ))}
        </div>
      </fieldset>
      <div className="flex items-start gap-3 rounded-md bg-ivory p-4 text-sm text-ink/85"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-green" /><p>Exports never contain individual records. Cells under {MIN_CELL} are suppressed again server-side, the file is watermarked with your account, and the download link expires after 24 hours. Your data-sharing agreement governs onward use.</p></div>
      <FormError message={state?.error} />
      <Button type="submit" variant="primary" size="lg" disabled={pending} arrow={!pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : "Request export"}</Button>
    </form>
  );
}
