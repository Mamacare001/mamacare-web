"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/components/providers/LanguageProvider";
import type { Lang } from "@/lib/i18n";

const STORAGE_KEY = "mamacare.lang";
const ease = [0.16, 1, 0.3, 1] as const;

const SLIDES = [
  { src: "/images/chw-visit.jpg", alt: "A Community Health Worker visiting a mother at home" },
  { src: "/images/mother-home-phone.jpg", alt: "A mother checking in with MamaCare from her phone" },
  { src: "/images/telehealth-call.jpg", alt: "A telehealth video call with a clinician" },
  { src: "/images/provider-tablet.jpg", alt: "A health provider reviewing a case on a tablet" },
  { src: "/images/family-together.jpg", alt: "A family together at home" },
  { src: "/images/chat-on-phone.jpg", alt: "Chatting with MamaCare on a phone" },
];

const SLIDE_SECONDS = 5.5;

/**
 * A full-screen welcome gate at "/" — the first thing any visitor lands
 * on. A slow-panning slideshow of real MamaCare moments (a CHW home
 * visit, a telehealth call, a mother on her phone) plays behind a
 * floating signature mark and two choices: English or Kinyarwanda.
 * Picking one sends the visitor on to "/home". Anyone who already has a
 * saved language is sent straight there without seeing this screen again.
 */
export function LanguageSplash() {
  const { setLang } = useLang();
  const router = useRouter();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [chosen, setChosen] = useState<Lang | null>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        router.replace("/home");
        return;
      }
    } catch {
      /* ignore */
    }
    setVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {/* photo slideshow */}
          <div className="absolute inset-0 -z-20" aria-hidden>
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
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

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
            transition={{ duration: 0.7, ease }}
            className="container-x flex flex-col items-center px-6 text-center"
          >
            {/* signature mark */}
            <motion.div
              className="relative"
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="absolute inset-0 -z-10 rounded-full bg-gold/30 blur-2xl" aria-hidden />
              <span className="absolute -inset-4 -z-10 rounded-full border border-ivory/10" aria-hidden />
              <span className="absolute -inset-4 -z-10 rounded-full bg-coral/15 animate-pulse-ring" aria-hidden />
              <motion.span
                animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                className="relative grid size-28 place-items-center rounded-full bg-ivory/10 ring-1 ring-ivory/20 backdrop-blur-md sm:size-32"
              >
                <Image
                  src="/brand/mark.png"
                  alt="MamaCare"
                  width={502}
                  height={580}
                  className="h-[72px] w-auto sm:h-20"
                  priority
                />
              </motion.span>
            </motion.div>

            {/* language choices */}
            <div className="mt-14 flex w-full max-w-lg flex-col gap-4 sm:flex-row">
              <motion.button
                type="button"
                onClick={() => choose("en")}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease }}
                whileHover={reduce ? undefined : { y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-coral to-[#ff8a75] px-8 py-6 text-left shadow-[0_20px_60px_-15px_rgb(255_107_94/0.5)] transition-shadow duration-300 hover:shadow-[0_24px_70px_-12px_rgb(255_107_94/0.65)]"
              >
                <span
                  className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 ease-out group-hover:translate-x-0"
                  aria-hidden
                />
                <span className="relative block text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                  EN
                </span>
                <span className="relative mt-1.5 block font-display text-xl font-bold text-white sm:text-2xl">
                  Continue in English
                </span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => choose("rw")}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease }}
                whileHover={reduce ? undefined : { y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-ivory to-[#ece7d6] px-8 py-6 text-left shadow-[0_20px_60px_-15px_rgb(244_201_93/0.35)] transition-shadow duration-300 hover:shadow-[0_24px_70px_-12px_rgb(244_201_93/0.5)]"
              >
                <span
                  className="absolute inset-0 -translate-x-full bg-emerald/10 transition-transform duration-700 ease-out group-hover:translate-x-0"
                  aria-hidden
                />
                <span className="relative block text-xs font-semibold uppercase tracking-[0.28em] text-emerald/60">
                  RW
                </span>
                <span className="relative mt-1.5 block font-display text-xl font-bold text-emerald sm:text-2xl">
                  Komeza mu Kinyarwanda
                </span>
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
