"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Languages, ArrowDown, Users, MessageSquareText, Globe, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { useLang } from "@/components/providers/LanguageProvider";

const ease = [0.16, 1, 0.3, 1] as const;

const COPY = {
  en: {
    benefits: ["Early risk detection", "Connects family, CHWs & clinics", "Works on web, mobile, WhatsApp & SMS", "In Kinyarwanda or English"],
    example: "Illustrative example",
    eyebrow: "AI-supported maternal health · Rwanda",
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
    eyebrow: "AI mu buzima bw'ababyeyi · u Rwanda",
    risk: "Ibyago bike · gukurikirana mu minsi 3",
  },
};
const BENEFIT_ICONS = [ShieldCheck, Users, MessageSquareText, Globe];

export function Hero() {
  const { t, lang } = useLang();
  const c = lang === "en" ? COPY.en : COPY.rw;
  const reduce = useReducedMotion();

  const seq = (delay: number, blur = false) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: blur ? "blur(10px)" : "blur(0px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { delay, duration: 0.9, ease },
        };

  return (
    <section className="relative isolate overflow-hidden bg-[#0c2420] text-ivory lg:min-h-[100svh]">
      {/* photographic backdrop: top band on phones/tablets, full section on desktop */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[min(64svh,32rem)] overflow-hidden lg:inset-0 lg:h-auto">
        {/* soft ambient fill made from the same photo */}
        <Image
          src="/images/mother-hero.jpg"
          alt=""
          fill
          quality={40}
          sizes="100vw"
          className="scale-125 object-cover blur-2xl brightness-[0.75] saturate-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c2420] via-[#0c2420]/40 to-transparent lg:bg-gradient-to-r lg:from-[#0c2420] lg:via-[#0c2420]/75 lg:via-35% lg:to-[#0c2420]/10" />

        {/* the sharp photograph at natural height, never cropped */}
        <div className="absolute inset-y-0 left-1/2 aspect-[501/511] -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0">
          <Image
            src="/images/mother-hero.jpg"
            alt=""
            fill
            priority
            quality={90}
            sizes="(min-width: 1024px) 100vh, 512px"
            className="object-cover [mask-image:linear-gradient(to_bottom,black_72%,transparent)] lg:[mask-image:linear-gradient(to_right,transparent,black_38%)]"
          />
        </div>
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0c2420]/55 to-transparent" />
      </div>
      {/* readability scrim behind the copy (desktop) */}
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#0c2420] from-20% via-[#0c2420]/65 via-40% to-transparent to-60% lg:block" />

      <div className="container-x relative flex flex-col justify-end pb-12 pt-[min(48svh,24rem)] lg:min-h-[100svh] lg:justify-center lg:pb-24 lg:pt-32">
        <div className="max-w-[40rem] 2xl:max-w-[46rem]">
          <TextReveal
            as="h1"
            trigger="mount"
            delay={0.45}
            className="font-sans text-[clamp(2.4rem,1.2rem+3vw,4.25rem)] font-bold leading-[1.06] tracking-tight"
            lines={[t.hero.title1, { text: t.hero.title2, className: "text-coral" }]}
          />

          <motion.p {...seq(0.8, true)} className="text-lead mt-6 max-w-[46ch] text-ivory/90">
            {t.hero.lead}
          </motion.p>

          <motion.div {...seq(0.95)} className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/login?mode=signup" variant="coral" size="lg" arrow>
              {t.hero.ctaPrimary}
            </Button>
            <Button href="/how-it-works" variant="light" size="lg">
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
                  <Icon className="size-7 text-[#3ddc97]" aria-hidden />
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

      {/* decorative cards, anchored to the photo's own box; wide screens only so they never cover text or her face */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden aspect-[501/511] 2xl:block">
        <motion.div
          {...(reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 1.5, duration: 0.8, ease } })}
          className="absolute left-[2%] top-[10%]"
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
          className="absolute bottom-[10%] right-[4%]"
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
      </div>

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
