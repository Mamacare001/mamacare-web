"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/components/providers/LanguageProvider";
import type { Lang } from "@/lib/i18n";

const STORAGE_KEY = "mamacare.lang";
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * A full-screen welcome gate shown once, before a first-time visitor ever
 * sees the homepage. An ambient aurora backdrop and a floating signature
 * mark frame two choices — English or Kinyarwanda — then dissolve to
 * reveal the site underneath. Returning visitors (anyone with a saved
 * language) never see it again.
 */
export function LanguageSplash() {
  const { setLang } = useLang();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [chosen, setChosen] = useState<Lang | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisible(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const choose = (lang: Lang) => {
    setLang(lang);
    setChosen(lang);
    window.setTimeout(() => setVisible(false), reduce ? 0 : 650);
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
          {/* aurora backdrop */}
          <div className="absolute inset-0 -z-10" aria-hidden>
            <motion.div
              className="absolute -left-1/3 -top-1/4 size-[65vmax] rounded-full bg-emerald/50 blur-[130px]"
              animate={reduce ? undefined : { x: [0, 50, -20, 0], y: [0, 30, -15, 0] }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -right-1/3 -bottom-1/4 size-[60vmax] rounded-full bg-coral/25 blur-[130px]"
              animate={reduce ? undefined : { x: [0, -40, 25, 0], y: [0, -25, 15, 0] }}
              transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-1/3 top-1/3 size-[42vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/25 blur-[120px]"
              animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-1/4 top-1/4 size-[30vmax] rounded-full bg-gold/20 blur-[100px]"
              animate={reduce ? undefined : { scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-midnight/45" />
            <div className="grain absolute inset-0" />
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
