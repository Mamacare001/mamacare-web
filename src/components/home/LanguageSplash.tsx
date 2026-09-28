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
 * sees the homepage. Lets them pick English or Kinyarwanda in their own
 * words, then dissolves to reveal the site underneath. Returning visitors
 * (anyone with a saved language) never see it again.
 */
export function LanguageSplash() {
  const { setLang } = useLang();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [chosen, setChosen] = useState(false);

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
    setChosen(true);
    window.setTimeout(() => setVisible(false), reduce ? 0 : 550);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight text-ivory"
          role="dialog"
          aria-modal="true"
          aria-label="Choose your language · Hitamo ururimi"
        >
          <div className="absolute inset-0 -z-10" aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,rgb(46_139_112/0.35),transparent_65%)]" />
            <div className="grain absolute inset-0" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: chosen ? 0 : 1, y: 0, scale: chosen ? 0.98 : 1 }}
            transition={{ duration: 0.7, ease }}
            className="container-x flex flex-col items-center px-6 text-center"
          >
            <div className="relative">
              <span className="absolute inset-0 -z-10 rounded-full bg-gold/25 blur-2xl" aria-hidden />
              <span className="absolute inset-0 -z-10 rounded-full bg-coral/20 animate-pulse-ring" aria-hidden />
              <motion.span
                animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative grid size-24 place-items-center rounded-full bg-ivory/10 ring-1 ring-ivory/20 backdrop-blur-sm sm:size-28"
              >
                <Image src="/brand/mark.png" alt="MamaCare" width={502} height={580} className="h-16 w-auto sm:h-[72px]" priority />
              </motion.span>
            </div>

            <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => choose("en")}
                className="flex-1 rounded-full bg-coral px-6 py-4 text-[15px] font-bold text-white shadow-float transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
              >
                Continue in English
              </button>
              <button
                type="button"
                onClick={() => choose("rw")}
                className="flex-1 rounded-full bg-ivory px-6 py-4 text-[15px] font-bold text-emerald shadow-float transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
              >
                Komeza mu Kinyarwanda
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
