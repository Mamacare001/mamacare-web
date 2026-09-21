"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Phone, MessageCircle } from "lucide-react";
import type { HelpSection } from "@/lib/mock/shared";
import { Accordion } from "@/components/pages/Accordion";

export function HelpCentre({ sections, roleLabel }: { sections: HelpSection[]; roleLabel: string }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    if (!q) return sections;
    const t = q.toLowerCase();
    return sections.map((s) => ({ ...s, items: s.items.filter((i) => i.q.toLowerCase().includes(t) || i.a.toLowerCase().includes(t)) })).filter((s) => s.items.length);
  }, [q, sections]);
  return (
    <div className="space-y-8">
      <div className="relative"><Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search help for ${roleLabel.toLowerCase()}s…`} className="h-12 w-full rounded-full border border-emerald/15 bg-white pl-12 pr-4 text-[15px] focus:border-green focus:outline-none" aria-label="Search help" /></div>
      {filtered.map((s) => (
        <section key={s.title}><h2 className="text-h3 mb-2 text-emerald">{s.title}</h2><Accordion name={s.title} items={s.items.map((i) => ({ q: i.q, a: i.a }))} /></section>
      ))}
      {filtered.length === 0 && <p className="rounded-lg bg-white p-6 text-center text-muted">No matches. Try another word, or contact us below.</p>}
      <section className="grid gap-3 sm:grid-cols-2">
        <a href="https://wa.me/250788000000" className="flex items-center gap-3 rounded-lg bg-white p-4 ring-1 ring-emerald/5 hover:bg-ivory"><span className="grid size-10 place-items-center rounded-full bg-green-100 text-green"><MessageCircle className="size-5" /></span><span><span className="block font-semibold text-emerald">WhatsApp support</span><span className="block text-xs text-muted">Mon–Sat 07:00–19:00 · Kinyarwanda / English</span></span></a>
        <a href="tel:+250788000000" className="flex items-center gap-3 rounded-lg bg-white p-4 ring-1 ring-emerald/5 hover:bg-ivory"><span className="grid size-10 place-items-center rounded-full bg-green-100 text-green"><Phone className="size-5" /></span><span><span className="block font-semibold text-emerald">Call support</span><span className="block text-xs text-muted">Not for emergencies — for those, <Link href="/emergency" className="font-semibold text-coral underline underline-offset-2">call 912</Link></span></span></a>
      </section>
      <p className="text-xs text-muted">Support agents see your account details, never your health information, unless you approve a support session for a specific issue.</p>
    </div>
  );
}
