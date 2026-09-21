"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { BellRing, MessageSquareText, Users, CalendarDays, Cpu, CheckCircle2, BookOpen, Check } from "lucide-react";
import type { Notif } from "@/lib/mock/shared";
import { markRead, markAllRead } from "@/app/notifications/actions";
import { cn } from "@/lib/cn";

const icon = { escalation: BellRing, feedback: MessageSquareText, circle: Users, visit: CalendarDays, system: Cpu, approval: CheckCircle2, guidance: BookOpen };
const tone = { escalation: "bg-coral-100 text-coral", feedback: "bg-green-100 text-green", circle: "bg-gold-100 text-[#8a6a10]", visit: "bg-violet-100 text-violet", system: "bg-ivory text-muted", approval: "bg-green-100 text-green", guidance: "bg-green-100 text-green" };

export function NotificationList({ items }: { items: Notif[] }) {
  const [list, setList] = useState(items);
  const [, start] = useTransition();
  const unread = list.filter((n) => !n.read).length;
  const read = (id: string) => { setList((l) => l.map((n) => (n.id === id ? { ...n, read: true } : n))); start(() => markRead(id)); };
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between"><p className="text-sm text-muted">{unread} unread</p>{unread > 0 && <button type="button" onClick={() => { setList((l) => l.map((n) => ({ ...n, read: true }))); start(() => markAllRead()); }} className="inline-flex items-center gap-1.5 text-sm font-semibold text-green"><Check className="size-4" /> Mark all read</button>}</div>
      <ul className="divide-y divide-emerald/10 rounded-lg bg-white ring-1 ring-emerald/5">
        {list.map((n) => {
          const I = icon[n.kind];
          return (
            <li key={n.id} className={cn("flex items-start gap-3 p-4", !n.read && "bg-green-100/30")}>
              <span className={cn("mt-0.5 grid size-9 shrink-0 place-items-center rounded-full", tone[n.kind])}><I className="size-4" /></span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3"><p className={cn("text-[15px]", !n.read ? "font-bold text-emerald" : "font-semibold text-emerald")}>{n.title}</p>{!n.read && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-coral" aria-label="Unread" />}</div>
                <p className="mt-0.5 text-sm text-ink/80">{n.text}</p>
                <div className="mt-1.5 flex items-center gap-3 text-xs text-muted"><span>{new Date(n.at).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>{n.href && <Link href={n.href} onClick={() => read(n.id)} className="font-semibold text-green">Open →</Link>}{!n.read && <button type="button" onClick={() => read(n.id)} className="text-muted underline underline-offset-2">Mark read</button>}</div>
              </div>
            </li>
          );
        })}
        {list.length === 0 && <li className="p-6 text-center text-muted">Nothing yet.</li>}
      </ul>
    </div>
  );
}
