"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export type QA = { q: string; a: React.ReactNode };

export function Accordion({ items, name }: { items: QA[]; name: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-emerald/10 border-y border-emerald/10">
      {items.map((it, i) => {
        const isOpen = open === i;
        const id = `${name}-${i}`;
        return (
          <div key={id}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={id}
              className="group flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className={cn("font-display text-xl transition-colors md:text-2xl", isOpen ? "text-emerald" : "text-ink/80 group-hover:text-emerald")}>
                {it.q}
              </span>
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-full border border-emerald/15 text-emerald transition-all duration-300",
                  isOpen ? "rotate-45 bg-emerald text-ivory" : "group-hover:bg-emerald/5",
                )}
                aria-hidden
              >
                <Plus className="size-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="max-w-2xl pb-6 text-[16px] leading-relaxed text-muted">{it.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
