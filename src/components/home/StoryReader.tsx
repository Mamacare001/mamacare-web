"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { X, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { alineStory } from "@/lib/aline";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Full-screen, scroll-read telling of Aline's story. Opens from the Story section
 * (the aunt's quote card, or any of the four signs → opens at that chapter).
 */
export function StoryReader({ open, chapter, onClose }: { open: boolean; chapter?: number; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [atEnd, setAtEnd] = useState(false);

  // Esc closes; lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  // Jump to the chosen chapter after the panel mounts
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (!el) return;
      if (chapter) {
        const target = el.querySelector<HTMLElement>(`[data-sign="${chapter}"]`);
        if (target) el.scrollTo({ top: Math.max(0, target.offsetTop - el.clientHeight * 0.3), behavior: "instant" as ScrollBehavior });
      } else el.scrollTo({ top: 0 });
    });
    return () => cancelAnimationFrame(id);
  }, [open, chapter]);

  useEffect(() => {
    return progress.on("change", (v) => setAtEnd(v > 0.985));
  }, [progress]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Aline’s story"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          transition={{ duration: 0.5, ease }}
          className="fixed inset-0 z-[100] bg-midnight text-ivory"
        >
          <div className="grain absolute inset-0 opacity-60" aria-hidden />
          {/* progress */}
          <motion.div style={{ scaleX: progress }} className="absolute left-0 top-0 z-10 h-[3px] w-full origin-left bg-coral" aria-hidden />

          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 md:px-10">
            <p className="text-eyebrow text-ivory/50">Aline · what her body was saying</p>
            <button type="button" onClick={onClose} aria-label="Close story" className="grid size-11 place-items-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-coral">
              <X className="size-5" />
            </button>
          </div>

          <div ref={scrollRef} className="relative h-full overflow-y-auto overscroll-contain scroll-smooth">
            <div className="mx-auto max-w-[62ch] px-6 pb-40 pt-32 md:px-8 md:pt-40">
              <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.9, ease }} className="text-eyebrow text-coral">
                The whole week
              </motion.p>
              <motion.h2 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease }} className="text-display mt-4">
                Nothing screamed emergency.
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="mt-10 flex items-center gap-2 text-sm text-ivory/50">
                <ArrowDown className="size-4 animate-bounce" /> Scroll slowly. It happened slowly.
              </motion.p>

              <div className="mt-24 space-y-10">
                {alineStory.map((b, i) => (
                  <motion.div
                    key={i}
                    data-sign={b.sign}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ root: scrollRef, margin: "0px 0px -18% 0px", once: true }}
                    transition={{ duration: 0.9, ease }}
                    className={cn(b.sign && "relative pl-14 md:-ml-16 md:pl-16")}
                  >
                    {b.sign && (
                      <span className="absolute left-0 top-1 grid size-9 place-items-center rounded-full border border-coral/60 font-display text-sm text-coral">
                        {b.sign}
                      </span>
                    )}
                    {b.kind === "quote" ? (
                      <blockquote className="rounded-lg border-l-4 border-gold bg-ivory/5 p-6 font-display text-2xl leading-snug md:text-3xl">
                        {b.text}
                        <footer className="mt-3 font-sans text-xs text-ivory/50">— her aunt.</footer>
                      </blockquote>
                    ) : b.kind === "turn" ? (
                      <p className="font-display text-3xl leading-tight text-gold md:text-4xl">{b.text}</p>
                    ) : b.kind === "end" ? (
                      <div className="mt-6 rounded-xl bg-ivory p-8 text-midnight md:p-10">
                        <p className="font-display text-2xl leading-snug md:text-3xl">{b.text}</p>
                        <div className="mt-8 flex flex-wrap gap-3">
                          <Button href="/how-it-works" variant="coral" size="lg" arrow>See where it goes</Button>
                          <Button href="/login?mode=signup" variant="secondary" size="lg">Create an account</Button>
                        </div>
                      </div>
                    ) : (
                      <p className={cn("font-display text-xl leading-relaxed text-ivory/90 md:text-2xl", b.sign && "text-ivory")}>{b.text}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              <p className="mt-16 text-xs text-ivory/40">
                Aline is a composite of real cases. Preeclampsia affects 2–8% of pregnancies worldwide and is a leading cause of maternal death in sub-Saharan Africa. If you are pregnant and notice these signs, do not wait — <a href="tel:912" className="text-coral underline">call 912</a>.
              </p>
            </div>
          </div>

          <AnimatePresence>
            {atEnd && (
              <motion.button
                type="button"
                onClick={onClose}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-ivory/10 px-5 py-2.5 text-sm font-semibold text-ivory backdrop-blur transition-colors hover:bg-ivory/20"
              >
                Back to the page
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
