"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { FlagGB, FlagRW } from "@/components/ui/Flags";
import type { Lang } from "@/lib/i18n";
import { TextReveal } from "@/components/ui/TextReveal";

const ease = [0.16, 1, 0.3, 1] as const;

const SLIDES = [
  { src: "/images/chw-visit.jpg", alt: "A Community Health Worker visiting a mother at home" },
  { src: "/images/mother-home-phone.jpg", alt: "A mother checking in with MamaRindwa from her phone" },
  { src: "/images/telehealth-call.jpg", alt: "A telehealth video call with a clinician" },
  { src: "/images/provider-tablet.jpg", alt: "A health provider reviewing a case on a tablet" },
  { src: "/images/family-together.jpg", alt: "A family together at home" },
  { src: "/images/chat-on-phone.jpg", alt: "Chatting with MamaRindwa on a phone" },
];

const SLIDE_SECONDS = 5.5;

/**
 * A full-screen welcome gate at "/" — the first thing any visitor lands
 * on, every time. A slow-panning slideshow of real MamaRindwa moments (a
 * CHW home visit, a telehealth call, a mother on her phone) plays behind
 * a floating signature mark and two choices: English or Kinyarwanda.
 * Picking one sends the visitor on to "/home". The choice is still saved
 * so the rest of the site opens in that language, but "/" itself always
 * shows this screen — it's the front door, and a visitor arriving here
 * should always see it, not sometimes be skipped past it.
 */
export function LanguageSplash() {
  const { setLang } = useLang();
  const router = useRouter();
  const reduce = useReducedMotion();
  const [visible] = useState(true);
  const [chosen, setChosen] = useState<Lang | null>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const id = window.setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), SLIDE_SECONDS * 1000);
    return () => window.clearInterval(id);
  }, [visible]);

  const choose = (lang: Lang) => {
    setLang(lang);
    setChosen(lang);
    window.setTimeout(() => router.push("/home"), reduce ? 0 : 650);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-midnight text-ivory"
          role="dialog"
          aria-modal="true"
          aria-label="Choose your language · Hitamo ururimi"
        >
          {/* photo slideshow – the whole layer is wiped up from the bottom on first load */}
          <motion.div
            className="absolute inset-0 -z-20"
            aria-hidden
            initial={{ clipPath: reduce ? "inset(0 0 0 0)" : "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 1.4, ease }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={slide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 1.2, ease } }}
                transition={{ duration: 1.2, ease }}
                className="absolute inset-0"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: reduce ? 1 : 1.09 }}
                  transition={{ duration: SLIDE_SECONDS + 1.2, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={SLIDES[slide].src}
                    alt={SLIDES[slide].alt}
                    fill
                    priority={slide === 0}
                    sizes="100vw"
                    className="object-cover object-[50%_15%]"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* legibility wash + grain */}
          <div className="absolute inset-0 -z-10" aria-hidden>
            <div className="absolute inset-0 bg-midnight/72" />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/35 to-midnight/25" />
            <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_35%,rgb(46_139_112/0.3),transparent_65%)]" />
            <div className="grain absolute inset-0 opacity-70" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: chosen ? 0 : 1, y: 0, scale: chosen ? 0.97 : 1 }}
            transition={{ duration: 0.7, ease, delay: chosen ? 0 : 0.3 }}
            className="container-x flex flex-col items-center px-6 text-center"
          >
            {/* signature mark – a ring draws itself around the mark as it blooms in */}
            <motion.div
              className="relative"
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="absolute inset-0 -z-10 rounded-full bg-gold/30 blur-2xl" aria-hidden />
              <svg className="absolute -inset-4 -z-10 size-[calc(100%+2rem)] -rotate-90" viewBox="0 0 100 100" fill="none" aria-hidden>
                <motion.circle
                  cx="50"
                  cy="50"
                  r="48.5"
                  stroke="rgb(248 247 242 / 0.45)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ pathLength: { duration: 1.6, ease, delay: 0.5 }, opacity: { duration: 0.3, delay: 0.5 } }}
                />
              </svg>
              <motion.span
                className="absolute -inset-4 -z-10 rounded-full bg-coral/15 animate-pulse-ring"
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.6 }}
              />
              <motion.span
                initial={{ scale: reduce ? 1 : 0.6, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: reduce ? 1 : [0.6, 1.05, 1], opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease, delay: 0.35 }}
                className="relative grid size-28 place-items-center rounded-full bg-ivory/10 ring-1 ring-ivory/20 backdrop-blur-md sm:size-32"
              >
                <Image
                  src="/brand/mark.png"
                  alt="MamaRindwa"
                  width={502}
                  height={580}
                  className="h-[72px] w-auto sm:h-20"
                  priority
                />
              </motion.span>
            </motion.div>

            {/* language choices */}
            <TextReveal
              as="p"
              trigger="mount"
              delay={1.1}
              stagger={0.06}
              duration={0.7}
              className="mt-14 text-[11px] font-semibold uppercase tracking-[0.28em] text-ivory/45"
            >
              Choose your language · Hitamo ururimi
            </TextReveal>
            <div className="mt-5 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
              <motion.button
                type="button"
                onClick={() => choose("en")}
                initial={{ opacity: 0, y: 28, scale: 0.96, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ delay: 1.35, duration: 0.8, ease }}
                whileHover={reduce ? undefined : { y: -3 }}
                whileTap={{ scale: 0.99 }}
                className="group relative flex flex-1 items-center gap-4 overflow-hidden rounded-2xl border border-ivory/15 bg-ivory/[0.06] px-6 py-5 text-left backdrop-blur-xl transition-colors duration-300 hover:border-ivory/30 hover:bg-ivory/[0.1]"
              >
                <span className="relative flex h-11 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg ring-1 ring-ivory/20">
                  <FlagGB className="h-full w-full object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg font-semibold text-ivory sm:text-xl">
                    Continue in English
                  </span>
                  <span className="mt-0.5 block text-sm text-ivory/50">English</span>
                </span>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-ivory/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ivory/80"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ivory/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-coral to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden
                />
              </motion.button>

              <motion.button
                type="button"
                onClick={() => choose("rw")}
                initial={{ opacity: 0, y: 28, scale: 0.96, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ delay: 1.5, duration: 0.8, ease }}
                whileHover={reduce ? undefined : { y: -3 }}
                whileTap={{ scale: 0.99 }}
                className="group relative flex flex-1 items-center gap-4 overflow-hidden rounded-2xl border border-ivory/15 bg-ivory/[0.06] px-6 py-5 text-left backdrop-blur-xl transition-colors duration-300 hover:border-ivory/30 hover:bg-ivory/[0.1]"
              >
                <span className="relative flex h-11 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg ring-1 ring-ivory/20">
                  <FlagRW className="h-full w-full object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg font-semibold text-ivory sm:text-xl">
                    Komeza mu Kinyarwanda
                  </span>
                  <span className="mt-0.5 block text-sm text-ivory/50">Ikinyarwanda</span>
                </span>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-ivory/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ivory/80"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ivory/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden
                />
              </motion.button>
            </div>
          </motion.div>

          {/* slide progress */}
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden>
            {SLIDES.map((s, i) => (
              <span
                key={s.src}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === slide ? "w-6 bg-ivory/80" : "w-1.5 bg-ivory/30"
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
