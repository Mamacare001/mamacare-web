"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { X, ArrowDown, Pause, Play, ChevronLeft, ChevronRight, AlignLeft, Mic } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { alineStory, tokens, type StoryBeat } from "@/lib/aline";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;
const WORD_MS = 190; // pace of speech
const BASE_HOLD = 900; // silence after every beat

/* ------------------------------------------------------------------ */
/* Spoken beat: words arrive one by one, emphasis lands harder          */
/* ------------------------------------------------------------------ */
function SpokenBeat({ beat, big }: { beat: StoryBeat; big: boolean }) {
  const words = useMemo(() => tokens(beat.text), [beat.text]);
  const tone =
    beat.kind === "quote" ? "text-gold italic" :
    beat.kind === "whisper" ? "text-ivory/70" :
    beat.kind === "turn" ? "text-coral" :
    beat.kind === "end" ? "text-midnight" : "text-ivory";
  return (
    <p className={cn("font-display leading-[1.15] tracking-tight", big ? "text-4xl md:text-6xl lg:text-7xl" : "text-3xl md:text-5xl lg:text-6xl", tone)} aria-live="polite">
      {words.map((t, i) => (
        <motion.span
          key={`${beat.text}-${i}`}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: i * (WORD_MS / 1000), duration: 0.45, ease }}
          className={cn("inline-block", t.em && (beat.kind === "end" ? "font-semibold text-coral" : "font-semibold text-coral"))}
        >
          {t.w}&nbsp;
        </motion.span>
      ))}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Pitch mode — auto-advancing, one beat on screen, like a speaker      */
/* ------------------------------------------------------------------ */
function PitchMode({ start, onClose, onSwitch }: { start: number; onClose: () => void; onSwitch: () => void }) {
  const [i, setI] = useState(start);
  const [playing, setPlaying] = useState(true);
  const beat = alineStory[i];
  const isEnd = beat.kind === "end";
  const total = alineStory.length;

  // duration of this beat = words × pace + hold
  const duration = useMemo(() => tokens(beat.text).length * WORD_MS + BASE_HOLD + (beat.hold ?? 0), [beat]);

  useEffect(() => {
    if (!playing || isEnd) return;
    const t = setTimeout(() => setI((n) => Math.min(n + 1, total - 1)), duration);
    return () => clearTimeout(t);
  }, [i, playing, duration, isEnd, total]);

  const prev = useCallback(() => setI((n) => Math.max(0, n - 1)), []);
  const next = useCallback(() => setI((n) => Math.min(total - 1, n + 1)), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " ") { e.preventDefault(); setPlaying((p) => !p); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const bg = isEnd ? "bg-ivory" : beat.kind === "whisper" ? "bg-black" : "bg-midnight";

  return (
    <motion.div animate={{ backgroundColor: isEnd ? "#F8F7F2" : beat.kind === "whisper" ? "#060d0c" : "#102522" }} transition={{ duration: 1.2 }} className={cn("absolute inset-0", bg)}>
      {/* progress: one segment per beat */}
      <div className="absolute inset-x-5 top-5 z-10 flex gap-1 md:inset-x-10" aria-hidden>
        {alineStory.map((_, k) => (
          <span key={k} className={cn("h-[3px] flex-1 rounded-full transition-colors duration-500", k < i ? "bg-coral" : k === i ? "bg-coral/60" : isEnd ? "bg-midnight/10" : "bg-ivory/15")}>
            {k === i && !isEnd && playing && <motion.span key={i} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: duration / 1000, ease: "linear" }} className="block h-full w-full origin-left rounded-full bg-coral" />}
          </span>
        ))}
      </div>

      {/* sign marker */}
      <AnimatePresence>
        {beat.sign && (
          <motion.p key={beat.sign} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="absolute left-5 top-12 z-10 flex items-center gap-3 text-eyebrow text-coral md:left-10 md:top-14">
            <span className="grid size-8 place-items-center rounded-full border border-coral/60 font-display text-sm">{beat.sign}</span> Sign {beat.sign} of 4
          </motion.p>
        )}
      </AnimatePresence>

      {/* the beat */}
      <div className="flex h-full items-center justify-center px-6 md:px-16">
        <div className="grid w-full max-w-5xl">
          <AnimatePresence initial={false}>
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -18, filter: "blur(6px)", transition: { duration: 0.35 } }} transition={{ duration: 0.3 }} className="[grid-area:1/1]">
              {beat.kind === "quote" && <p className="mb-4 text-eyebrow text-ivory/50">her aunt said —</p>}
              <SpokenBeat beat={beat} big={beat.kind === "turn" || beat.kind === "whisper"} />
              {isEnd && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: tokens(beat.text).length * (WORD_MS / 1000) + 0.6, duration: 0.8, ease }} className="mt-10 flex flex-wrap gap-3">
                  <Button href="/how-it-works" variant="coral" size="lg" arrow>See where the warning goes</Button>
                  <Button href="/login?mode=signup" variant="secondary" size="lg">Create an account</Button>
                  <button type="button" onClick={onClose} className="link-underline px-2 text-sm font-semibold text-emerald">Back to the page</button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* controls */}
      <div className={cn("absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 px-5 py-4 md:px-10", isEnd ? "text-midnight" : "text-ivory")}>
        <div className="flex items-center gap-1">
          <button type="button" onClick={prev} aria-label="Previous" className="grid size-10 place-items-center rounded-full bg-current/10 transition-colors hover:bg-coral hover:text-white"><ChevronLeft className="size-5" /></button>
          <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause" : "Play"} className="grid size-12 place-items-center rounded-full bg-coral text-white shadow-float transition-transform hover:scale-105">{playing && !isEnd ? <Pause className="size-5" /> : <Play className="ml-0.5 size-5" />}</button>
          <button type="button" onClick={next} aria-label="Next" className="grid size-10 place-items-center rounded-full bg-current/10 transition-colors hover:bg-coral hover:text-white"><ChevronRight className="size-5" /></button>
          <span className="ml-3 hidden text-xs opacity-60 sm:inline">{i + 1} / {total} · space to pause · → to skip</span>
        </div>
        <button type="button" onClick={onSwitch} className="inline-flex items-center gap-2 rounded-full bg-current/10 px-4 py-2 text-xs font-semibold transition-colors hover:bg-coral hover:text-white"><AlignLeft className="size-4" /> Read at my own pace</button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Read mode — the whole text, scroll-revealed                          */
/* ------------------------------------------------------------------ */
function ReadMode({ chapter, onClose, onSwitch }: { chapter?: number; onClose: () => void; onSwitch: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (!el) return;
      const target = chapter ? el.querySelector<HTMLElement>(`[data-sign="${chapter}"]`) : null;
      el.scrollTo({ top: target ? Math.max(0, target.offsetTop - el.clientHeight * 0.3) : 0 });
    });
    return () => cancelAnimationFrame(id);
  }, [chapter]);

  const plain = (t: string) => t.replace(/\*/g, "");

  return (
    <div className="absolute inset-0 bg-midnight">
      <motion.div style={{ scaleX: progress }} className="absolute left-0 top-0 z-10 h-[3px] w-full origin-left bg-coral" aria-hidden />
      <div ref={scrollRef} className="h-full overflow-y-auto overscroll-contain">
        <div className="mx-auto max-w-[62ch] px-6 pb-40 pt-28 md:px-8 md:pt-36">
          <p className="text-eyebrow text-coral">The whole week</p>
          <h2 className="text-display mt-4">Nothing screamed emergency.</h2>
          <p className="mt-8 flex items-center gap-2 text-sm text-ivory/50"><ArrowDown className="size-4 animate-bounce" /> Scroll slowly. It happened slowly.</p>
          <div className="mt-20 space-y-8">
            {alineStory.map((b, i) => (
              <motion.div key={i} data-sign={b.sign} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ root: scrollRef, margin: "0px 0px -15% 0px", once: true }} transition={{ duration: 0.8, ease }} className={cn(b.sign && "relative pl-14 md:-ml-16 md:pl-16")}>
                {b.sign && <span className="absolute left-0 top-1 grid size-9 place-items-center rounded-full border border-coral/60 font-display text-sm text-coral">{b.sign}</span>}
                {b.kind === "quote" ? (
                  <blockquote className="rounded-lg border-l-4 border-gold bg-ivory/5 p-6 font-display text-2xl italic leading-snug text-gold md:text-3xl">{plain(b.text)}<footer className="mt-3 font-sans text-xs not-italic text-ivory/50">— her aunt.</footer></blockquote>
                ) : b.kind === "turn" ? (
                  <p className="font-display text-3xl leading-tight text-coral md:text-4xl">{plain(b.text)}</p>
                ) : b.kind === "end" ? (
                  <div className="mt-6 rounded-xl bg-ivory p-8 text-midnight md:p-10">
                    <p className="font-display text-2xl leading-snug md:text-3xl">{plain(b.text)}</p>
                    <div className="mt-8 flex flex-wrap gap-3"><Button href="/how-it-works" variant="coral" size="lg" arrow>See where the warning goes</Button><Button href="/login?mode=signup" variant="secondary" size="lg">Create an account</Button></div>
                  </div>
                ) : (
                  <p className={cn("font-display text-xl leading-relaxed md:text-2xl", b.kind === "whisper" ? "text-ivory/60" : "text-ivory/90")}>{plain(b.text)}</p>
                )}
              </motion.div>
            ))}
          </div>
          <p className="mt-16 text-xs text-ivory/40">If you are pregnant and notice these signs, do not wait — <a href="tel:912" className="text-coral underline">call 912</a>.</p>
          <button type="button" onClick={onClose} className="mt-8 rounded-full bg-ivory/10 px-5 py-2.5 text-sm font-semibold text-ivory transition-colors hover:bg-ivory/20">Back to the page</button>
        </div>
      </div>
      <button type="button" onClick={onSwitch} className="absolute bottom-5 right-5 z-10 inline-flex items-center gap-2 rounded-full bg-ivory/10 px-4 py-2 text-xs font-semibold text-ivory backdrop-blur transition-colors hover:bg-coral md:right-10"><Mic className="size-4" /> Hear it instead</button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function ReaderBody({ chapter, initialMode, onClose }: { chapter?: number; initialMode: "pitch" | "read"; onClose: () => void }) {
  const [mode, setMode] = useState<"pitch" | "read">(initialMode);
  const startIndex = chapter ? Math.max(0, alineStory.findIndex((b) => b.sign === chapter)) : 0;
  return mode === "pitch" ? <PitchMode start={startIndex} onClose={onClose} onSwitch={() => setMode("read")} /> : <ReadMode chapter={chapter} onClose={onClose} onSwitch={() => setMode("pitch")} />;
}

export function StoryReader({ open, chapter, mode = "pitch", onClose }: { open: boolean; chapter?: number; mode?: "pitch" | "read"; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-modal="true" aria-label="Aline’s story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.35 } }} transition={{ duration: 0.5, ease }} className="fixed inset-0 z-[100] text-ivory">
          <div className="grain pointer-events-none absolute inset-0 z-[1] opacity-60" aria-hidden />
          <ReaderBody chapter={chapter} initialMode={mode} onClose={onClose} />
          <div className="absolute right-5 top-9 z-20 md:right-10 md:top-11">
            <button type="button" onClick={onClose} aria-label="Close story" className="grid size-11 place-items-center rounded-full bg-coral/90 text-white shadow-float backdrop-blur transition-transform hover:scale-105"><X className="size-5" /></button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
