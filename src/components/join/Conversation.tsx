"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2, CheckCircle2, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fieldCls } from "@/components/auth/fields";
import type { JoinState } from "@/app/join/actions";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

export type Q =
  | { name: string; ask: string; hint?: string; kind: "text" | "textarea" | "contact"; placeholder?: string; optional?: boolean }
  | { name: string; ask: string; hint?: string; kind: "choice"; options: string[]; optional?: boolean }
  | { name: string; ask: string; hint?: string; kind: "file"; accept: string; optional?: boolean }
  | { name: string; ask: string; hint?: string; kind: "yesno"; optional?: boolean };

/**
 * One question at a time — the way MamaCare talks to mothers. State lives in one hidden form so the
 * final submit posts everything to the server action.
 */
export function Conversation({
  questions,
  action,
  hidden = {},
  submitLabel,
  done,
}: {
  questions: Q[];
  action: (prev: JoinState, fd: FormData) => Promise<JoinState>;
  hidden?: Record<string, string>;
  submitLabel: string;
  done: (ref: string) => React.ReactNode;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [state, formAction, pending] = useActionState<JoinState, FormData>(action, null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const q = questions[step];
  const last = step === questions.length - 1;
  const value = answers[q.name] ?? "";
  const canNext = q.optional || value.trim().length > 0 || (q.kind === "file" && !!file);

  useEffect(() => {
    const id = setTimeout(() => inputRef.current?.focus(), 350);
    return () => clearTimeout(id);
  }, [step]);

  if (state?.ok && state.ref) return <>{done(state.ref)}</>;

  const set = (v: string) => setAnswers((a) => ({ ...a, [q.name]: v }));
  const next = () => { if (canNext && !last) setStep((s) => s + 1); };

  return (
    <form
      action={(fd) => {
        Object.entries({ ...hidden, ...answers }).forEach(([k, v]) => fd.set(k, v));
        if (file) fd.set("cv", file);
        formAction(fd);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && q.kind !== "textarea" && !last) { e.preventDefault(); next(); }
      }}
      className="rounded-2xl bg-white p-6 shadow-float ring-1 ring-emerald/10 md:p-10"
    >
      {/* progress */}
      <div className="mb-8 flex items-center gap-2">
        {questions.map((_, i) => <span key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors duration-500", i <= step ? "bg-coral" : "bg-emerald/10")} />)}
        <span className="ml-2 text-xs font-semibold text-muted">{step + 1}/{questions.length}</span>
      </div>

      <div className="grid min-h-[260px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={step} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14, transition: { duration: 0.25 } }} transition={{ duration: 0.5, ease }} className="[grid-area:1/1]">
            {/* the question, as a chat bubble from MamaCare */}
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald text-sm font-bold text-ivory">M</span>
              <div>
                <p className="font-display text-2xl leading-snug text-emerald md:text-3xl">{q.ask}</p>
                {q.hint && <p className="mt-2 text-sm text-muted">{q.hint}</p>}
              </div>
            </div>

            {/* the answer */}
            <div className="mt-6 pl-12">
              {q.kind === "text" || q.kind === "contact" ? (
                <input ref={inputRef as React.RefObject<HTMLInputElement>} value={value} onChange={(e) => set(e.target.value)} placeholder={q.placeholder} type={q.kind === "contact" ? "text" : "text"} autoComplete={q.kind === "contact" ? "email" : "off"} className={cn(fieldCls, "text-lg")} />
              ) : q.kind === "textarea" ? (
                <textarea ref={inputRef as React.RefObject<HTMLTextAreaElement>} value={value} onChange={(e) => set(e.target.value)} placeholder={q.placeholder} rows={5} className={cn(fieldCls, "text-[17px] leading-relaxed")} />
              ) : q.kind === "choice" ? (
                <div className="flex flex-wrap gap-2">
                  {q.options.map((o) => (
                    <button key={o} type="button" onClick={() => { set(o); }} className={cn("rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors", value === o ? "border-emerald bg-emerald text-ivory" : "border-emerald/15 bg-white text-emerald hover:border-emerald/40")}>{o}</button>
                  ))}
                </div>
              ) : q.kind === "yesno" ? (
                <div className="flex gap-2">
                  {["Yes", "No"].map((o) => (
                    <button key={o} type="button" onClick={() => set(o)} className={cn("rounded-full border px-6 py-2.5 text-sm font-semibold transition-colors", value === o ? "border-emerald bg-emerald text-ivory" : "border-emerald/15 bg-white text-emerald hover:border-emerald/40")}>{o}</button>
                  ))}
                </div>
              ) : q.kind === "file" ? (
                <label className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-emerald/30 bg-ivory px-4 py-4 text-sm text-emerald hover:border-emerald">
                  <Paperclip className="size-5" />
                  <span className="font-semibold">{file ? file.name : "Choose a file"}</span>
                  <span className="text-muted">{file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : "PDF, under 5 MB — or skip"}</span>
                  <input type="file" accept={q.accept} className="sr-only" onChange={(e) => { const f = e.target.files?.[0] ?? null; setFile(f); set(f ? f.name : ""); }} />
                </label>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {state?.error && <p role="alert" className="mt-4 rounded-md bg-coral-100 px-3 py-2 text-sm text-coral">{state.error}</p>}

      <div className="mt-8 flex items-center justify-between gap-3 pl-12">
        <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="inline-flex items-center gap-1 text-sm font-semibold text-muted disabled:opacity-30"><ArrowLeft className="size-4" /> Back</button>
        {last ? (
          <Button key="submit" type="submit" variant="coral" size="lg" disabled={pending || !canNext} arrow={!pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : submitLabel}</Button>
        ) : (
          <Button key="next" type="button" variant="primary" size="lg" onClick={next} disabled={!canNext} className="whitespace-nowrap"><span className="inline-flex items-center gap-2">{q.optional && !value ? "Skip" : "Next"} <ArrowRight className="size-4" /></span></Button>
        )}
      </div>
    </form>
  );
}

export function Done({ title, text, refCode, children }: { title: string; text: string; refCode: string; children?: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease }} className="rounded-2xl bg-emerald p-8 text-ivory shadow-float md:p-10">
      <p className="flex items-center gap-2 text-eyebrow text-gold"><CheckCircle2 className="size-4" /> Received · {refCode}</p>
      <h3 className="mt-3 font-display text-3xl md:text-4xl">{title}</h3>
      <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-ivory/80">{text}</p>
      {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
    </motion.div>
  );
}
