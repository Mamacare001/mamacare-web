"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { sendContact, type ContactState } from "@/app/contact/actions";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/components/providers/LanguageProvider";

const field =
  "w-full rounded-md border border-emerald/15 bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] focus:border-green focus:shadow-[0_0_0_4px_rgb(46_139_112/0.15)] focus:outline-none";

export function ContactForm({ defaultTopic }: { defaultTopic?: string }) {
  const { t } = useLang();
  const f = t.contact.form;
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, null);

  if (state?.ok) {
    return (
      <div className="flex items-start gap-3 rounded-lg bg-green-100 p-6 text-emerald">
        <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-green" />
        <div>
          <p className="font-display text-2xl">{f.sentTitle}</p>
          <p className="mt-1 text-[15px]">{state.message}</p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2" noValidate>
      <label className="grid gap-1.5">
        <span className="text-sm font-semibold text-emerald">{f.nameLabel}</span>
        <input name="name" required autoComplete="name" className={field} placeholder={f.namePlaceholder} />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm font-semibold text-emerald">{f.emailLabel}</span>
        <input name="email" type="email" required autoComplete="email" className={field} placeholder={f.emailPlaceholder} />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm font-semibold text-emerald">{f.orgLabel} <span className="font-normal text-muted">{f.orgOptional}</span></span>
        <input name="org" autoComplete="organization" className={field} placeholder={f.orgPlaceholder} />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm font-semibold text-emerald">{f.topicLabel}</span>
        <select name="topic" className={field} defaultValue={defaultTopic && ["partnership","research","pilot","press","other"].includes(defaultTopic) ? defaultTopic : "partnership"}>
          <option value="partnership">{f.topicOptions.partnership}</option>
          <option value="research">{f.topicOptions.research}</option>
          <option value="pilot">{f.topicOptions.pilot}</option>
          <option value="press">{f.topicOptions.press}</option>
          <option value="other">{f.topicOptions.other}</option>
        </select>
      </label>
      <label className="grid gap-1.5 sm:col-span-2">
        <span className="text-sm font-semibold text-emerald">{f.messageLabel}</span>
        <textarea name="message" required rows={5} className={field} placeholder={f.messagePlaceholder} />
      </label>
      {state && !state.ok && (
        <p className="flex items-center gap-2 text-sm text-coral sm:col-span-2" role="alert">
          <AlertCircle className="size-4" /> {state.message}
        </p>
      )}
      <div className="sm:col-span-2">
        <Button type="submit" variant="coral" size="lg" arrow={!pending} disabled={pending}>
          {pending ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" /> {f.sendingBtn}
            </span>
          ) : (
            f.sendBtn
          )}
        </Button>
      </div>
    </form>
  );
}
