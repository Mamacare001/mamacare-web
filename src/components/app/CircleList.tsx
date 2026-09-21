"use client";

import { useState, useTransition } from "react";
import { HeartHandshake, Building2, Users, Copy, Check, Eye, EyeOff, Trash2, Loader2 } from "lucide-react";
import type { Member } from "@/lib/mock/mother";
import { approveMember, removeMember, toggleRiskVisibility } from "@/app/app/actions";
import { cn } from "@/lib/cn";

const roleUi = { chw: { icon: Users, label: "Community Health Worker", tone: "bg-green-100 text-green" }, facility: { icon: Building2, label: "Health facility", tone: "bg-violet-100 text-violet" }, family: { icon: HeartHandshake, label: "Family", tone: "bg-coral-100 text-coral" } };

export function ShareCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {}
      }}
      className="inline-flex items-center gap-2 rounded-md border border-emerald/15 bg-white px-3 py-2 font-mono text-lg tracking-[0.3em] text-emerald"
    >
      {code} {copied ? <Check className="size-4 text-green" /> : <Copy className="size-4 text-muted" />}
    </button>
  );
}

export function CircleList({ members }: { members: Member[] }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [, start] = useTransition();
  const run = (id: string, fn: () => Promise<void>) => {
    setBusy(id);
    start(async () => {
      await fn();
      setBusy(null);
    });
  };
  return (
    <ul className="space-y-3">
      {members.map((m) => {
        const r = roleUi[m.role];
        return (
          <li key={m.id} className={cn("rounded-lg bg-white p-4 ring-1 ring-emerald/5", m.status === "pending" && "ring-2 ring-gold")}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={cn("grid size-11 place-items-center rounded-full", r.tone)}><r.icon className="size-5" /></span>
                <div>
                  <p className="font-semibold text-emerald">{m.name}</p>
                  <p className="text-sm text-muted">{m.relation ?? r.label} · since {new Date(m.since).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>
                </div>
              </div>
              {m.status === "pending" ? (
                <div className="flex gap-2">
                  <button disabled={busy === m.id} onClick={() => run(m.id, () => approveMember(m.id))} className="rounded-full bg-emerald px-4 py-2 text-sm font-semibold text-ivory disabled:opacity-50">
                    {busy === m.id ? <Loader2 className="size-4 animate-spin" /> : "Approve"}
                  </button>
                  <button disabled={busy === m.id} onClick={() => run(m.id, () => removeMember(m.id))} className="rounded-full px-4 py-2 text-sm font-semibold text-coral hover:bg-coral-100">Decline</button>
                </div>
              ) : m.role === "family" ? (
                <div className="flex gap-1">
                  <button disabled={busy === m.id} onClick={() => run(m.id, () => toggleRiskVisibility(m.id, !m.canSeeRisk))} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-emerald hover:bg-emerald/5" title="Let this person see your risk level">
                    {m.canSeeRisk ? <Eye className="size-4" /> : <EyeOff className="size-4" />} Risk level
                  </button>
                  <button disabled={busy === m.id} onClick={() => { if (confirm(`Remove ${m.name} from your circle?`)) run(m.id, () => removeMember(m.id)); }} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-coral hover:bg-coral-100" aria-label={`Remove ${m.name}`}>
                    <Trash2 className="size-4" /> Remove
                  </button>
                </div>
              ) : (
                <span className="rounded-full bg-ivory px-3 py-1 text-xs font-semibold text-muted">Care team</span>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {m.sees.map((s) => <span key={s} className="rounded-full bg-ivory px-2.5 py-1 text-xs text-ink/80">{s}</span>)}
              {m.role === "family" && <span className="rounded-full bg-ivory px-2.5 py-1 text-xs text-ink/80">{m.canSeeRisk ? "Risk level: visible" : "Risk level: hidden"}</span>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
