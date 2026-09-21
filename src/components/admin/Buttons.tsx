"use client";

import { useState, useTransition } from "react";
import { Loader2, Check } from "lucide-react";
import { cn } from "@/lib/cn";

/** Small action button that runs a server action and shows a done state. Optional confirm + reason prompt. */
export function ActionButton({ label, doneLabel = "Done", action, tone = "primary", confirm: confirmText, reason }: { label: string; doneLabel?: string; action: (reason?: string) => Promise<unknown>; tone?: "primary" | "coral" | "ghost"; confirm?: string; reason?: boolean }) {
  const [pending, start] = useTransition();
  const [done, setDone] = useState(false);
  const cls = { primary: "bg-emerald text-ivory", coral: "bg-coral text-white", ghost: "text-emerald ring-1 ring-emerald/15" }[tone];
  return (
    <button
      type="button"
      disabled={pending || done}
      onClick={() => {
        let r: string | undefined;
        if (reason) { r = window.prompt(confirmText ?? "Reason (audit-logged):") ?? undefined; if (!r) return; }
        else if (confirmText && !window.confirm(confirmText)) return;
        start(async () => { await action(r); setDone(true); });
      }}
      className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold disabled:opacity-60", done ? "bg-green-100 text-green" : cls)}
    >
      {pending ? <Loader2 className="size-3.5 animate-spin" /> : done ? <><Check className="size-3.5" /> {doneLabel}</> : label}
    </button>
  );
}

export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => Promise<unknown>; label: string }) {
  const [v, setV] = useState(on);
  const [pending, start] = useTransition();
  return (
    <button type="button" role="switch" aria-checked={v} aria-label={label} disabled={pending} onClick={() => start(async () => { await onChange(!v); setV(!v); })} className={cn("relative h-6 w-11 rounded-full transition-colors", v ? "bg-green" : "bg-emerald/20")}>
      <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform", v ? "translate-x-5" : "translate-x-0.5")} />
    </button>
  );
}
