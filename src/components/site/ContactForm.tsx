"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { sendContact, type ContactState } from "@/app/contact/actions";
import { Button } from "@/components/ui/Button";

const field =
  "w-full rounded-md border border-emerald/15 bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] focus:border-green focus:shadow-[0_0_0_4px_rgb(46_139_112/0.15)] focus:outline-none";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, null);

  if (state?.ok) {
    return (
      <div className="flex items-start gap-3 rounded-lg bg-green-100 p-6 text-emerald">
        <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-green" />
        <div>
          <p className="font-display text-2xl">Message sent.</p>
          <p className="mt-1 text-[15px]">{state.message}</p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2" noValidate>
      <label className="grid gap-1.5">
        <span className="text-sm font-semibold text-emerald">Name</span>
        <input name="name" required autoComplete="name" className={field} placeholder="Your full name" />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm font-semibold text-emerald">Email</span>
        <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm font-semibold text-emerald">Organisation <span className="font-normal text-muted">(optional)</span></span>
        <input name="org" autoComplete="organization" className={field} placeholder="Health centre, NGO, university…" />
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm font-semibold text-emerald">Topic</span>
        <select name="topic" className={field} defaultValue="partnership">
          <option value="partnership">Partnership</option>
          <option value="research">Research collaboration</option>
          <option value="pilot">Join the pilot</option>
          <option value="press">Press</option>
          <option value="other">Something else</option>
        </select>
      </label>
      <label className="grid gap-1.5 sm:col-span-2">
        <span className="text-sm font-semibold text-emerald">Message</span>
        <textarea name="message" required rows={5} className={field} placeholder="How can we help?" />
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
              <Loader2 className="size-4 animate-spin" /> Sending…
            </span>
          ) : (
            "Send message"
          )}
        </Button>
      </div>
    </form>
  );
}
