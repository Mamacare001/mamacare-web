"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormError, fieldCls } from "@/components/auth/fields";
import { logContact, type State } from "@/app/care/actions";

export function ContactLogForm({ id }: { id: string }) {
  const [state, action, pending] = useActionState<State, FormData>(logContact, null);
  if (state?.ok) return <p className="flex items-center gap-2 rounded-md bg-green-100 p-3 text-sm text-emerald"><CheckCircle2 className="size-4 text-green" /> {state.message}</p>;
  return (
    <form action={action} className="space-y-3" noValidate>
      <input type="hidden" name="id" value={id} />
      <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
        <Field label="Type"><select name="type" className={fieldCls} defaultValue="call"><option value="call">Phone call</option><option value="sms">SMS</option><option value="visit">Visit</option><option value="transport">Transport arranged</option></select></Field>
        <Field label="Note"><input name="note" className={fieldCls} placeholder="What was discussed, what was arranged" required /></Field>
      </div>
      <FormError message={state?.error} />
      <Button type="submit" variant="primary" size="sm" disabled={pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : "Log contact"}</Button>
    </form>
  );
}
