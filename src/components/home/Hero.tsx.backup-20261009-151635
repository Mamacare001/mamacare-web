"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Languages, ArrowDown, Activity, Users, MessageSquareText, Globe, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { useLang } from "@/components/providers/LanguageProvider";

const ease = [0.16, 1, 0.3, 1] as const;

const COPY = {
  en: {
    benefits: ["Early risk detection", "Connects family, CHWs & clinics", "Works on web, mobile, WhatsApp & SMS", "In Kinyarwanda or English"],
    example: "Illustrative example",
    risk: "Low risk · follow-up in 3 days",
  },
  rw: {
    benefits: [
      "Kumenya ibyago hakiri kare",
      "Ihuza umuryango, abajyanama n'amavuriro",
      "Ikora kuri web, telefone, WhatsApp na SMS",
      "Mu Kinyarwanda cyangwa Icyongereza",
    ],
    example: "Urugero rwerekana",
    risk: "Ibyago bike · gukurikirana mu minsi 3",
  },
};
const BENEFIT_ICONS = [ShieldCheck, Users, MessageSquareText, Globe];

export function Hero() {
  const { t, lang } = useLang();
  const c = lang === "en" ? COPY.en : COPY.rw;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06]);

  const seq = (delay: number, blur = false) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: blur ? "blur(10px)" : "blur(0px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { delay, duration: 0.9, ease },
        };

  const [eyebrowMain, eyebrowPlace] = t.hero.eyebrow.split(" · ");

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-midnight text-ivory">
      {/* photographic background */}
      <motion.div className="absolute inset-x-0 top-0 -z-10 h-[min(68svh,36rem)] origin-top lg:inset-0 lg:h-auto" style={{ scale: imgScale }} aria-hidden>
        <Image
          src="/images/mother-hero.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[72%_18%] sm:object-[70%_25%] md:object-[68%_30%] lg:object-[62%_35%] xl:object-[55%_40%]"
        />
      </motion.div>
      {/* readability overlays: bottom-up on phones, left-to-right from md */}
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[min(68svh,36rem)] bg-gradient-to-t from-midnight from-5% via-midnight/60 via-45% to-midnight/0 lg:inset-0 lg:h-auto lg:bg-gradient-to-r lg:from-midnight/90 lg:from-20% lg:via-midnight/55 lg:via-50% lg:to-midnight/0"
        aria-hidden
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-midnight/60 to-transparent" aria-hidden />

      <div className="container-x relative flex flex-col justify-end pb-12 pt-[min(46svh,22rem)] lg:min-h-[100svh] lg:justify-center lg:pb-24 lg:pt-36">
        <div className="max-w-[40rem] 2xl:max-w-[46rem]">
          <motion.p {...seq(0.4)} className="text-eyebrow flex items-center gap-3 text-ivory/90">
            <Activity className="size-4 shrink-0 text-coral" aria-hidden />
            <span>
              {eyebrowMain}
              {eyebrowPlace && <span className="text-coral"> · {eyebrowPlace}</span>}
            </span>
          </motion.p>

          <TextReveal
            as="h1"
            trigger="mount"
            delay={0.45}
            className="mt-5 font-sans text-[clamp(2.4rem,1.5rem+3.4vw,4.6rem)] font-bold leading-[1.06] tracking-tight"
            lines={[t.hero.title1, { text: t.hero.title2, className: "text-coral" }]}
          />

          <motion.p {...seq(0.8, true)} className="text-lead mt-6 max-w-[48ch] text-ivory/90">
            {t.hero.lead}
          </motion.p>

          <motion.div {...seq(0.95)} className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/login?mode=signup" variant="coral" size="lg" arrow className="focus-visible:outline-white">
              {t.hero.ctaPrimary}
            </Button>
            <Button href="/how-it-works" variant="light" size="lg" className="focus-visible:outline-white">
              <span className="inline-flex items-center gap-2">
                <Play className="size-4" aria-hidden />
                {t.hero.ctaSecondary}
              </span>
            </Button>
          </motion.div>

          <motion.ul {...seq(1.1)} className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-x-0">
            {c.benefits.map((label, i) => {
              const Icon = BENEFIT_ICONS[i];
              return (
                <li
                  key={label}
                  className="flex flex-col gap-2.5 lg:border-l lg:border-white/15 lg:pl-4 lg:pr-3 lg:first:border-0 lg:first:pl-0"
                >
                  <Icon className="size-7 text-green" aria-hidden />
                  <span className="text-[13px] font-semibold leading-snug text-ivory sm:text-sm">{label}</span>
                </li>
              );
            })}
          </motion.ul>

          <motion.p {...seq(1.2)} className="mt-6 text-sm text-ivory/65">
            {t.common.notDiagnosis}
          </motion.p>
        </div>
      </div>

      {/* floating cards: decorative, illustrative only, shown where they cannot cover text or her face */}
      <motion.div
        {...(reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 1.5, duration: 0.8, ease } })}
        className="absolute left-[50%] top-[19%] hidden xl:block"
        aria-hidden
      >
        <div className="flex items-center gap-3 rounded-full bg-ivory/95 py-3 pl-3 pr-6 text-midnight shadow-float">
          <span className="grid size-10 place-items-center rounded-full bg-green-100 text-green">
            <ShieldCheck className="size-5" />
          </span>
          <div>
            <p className="text-xs text-muted">{t.hero.badgeRisk}</p>
            <p className="text-sm font-bold">{c.risk}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-coral">{c.example}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        {...(reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 1.7, duration: 0.8, ease } })}
        className="absolute bottom-[9%] right-6 hidden xl:block"
        aria-hidden
      >
        <div className="flex items-center gap-3 rounded-full bg-midnight/85 py-2.5 pl-3 pr-5 text-ivory ring-1 ring-white/10 backdrop-blur">
          <span className="grid size-9 place-items-center rounded-full bg-violet/25 text-ivory">
            <Languages className="size-5" />
          </span>
          <div>
            <p className="text-xs text-ivory/70">Web · App · WhatsApp · SMS</p>
            <p className="text-sm font-bold">{t.hero.badgeLang}</p>
          </div>
        </div>
      </motion.div>

      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ivory/60 hover:text-ivory lg:flex"
      >
        {t.hero.scroll}
        <ArrowDown className="size-3.5 animate-bounce" />
      </motion.a>
    </section>
  );
}
