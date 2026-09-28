"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Languages, ArrowDown, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EyebrowArrow } from "@/components/ui/Eyebrow";
import { useLang } from "@/components/providers/LanguageProvider";

const ease = [0.16, 1, 0.3, 1] as const;
const seq = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease },
});

export function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-midnight text-ivory">
      {/* background */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_20%,rgb(46_139_112/0.35),transparent_60%),radial-gradient(50%_40%_at_10%_90%,rgb(255_107_94/0.18),transparent_60%)]" />
        <div className="grain absolute inset-0" />
      </motion.div>

      {/* the mark, huge and faint, as a watermark signature behind everything */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease }}
        className="pointer-events-none absolute -right-[8%] top-[6%] -z-10 w-[46vw] max-w-[620px] opacity-[0.07] mix-blend-screen sm:w-[38vw] md:-right-[4%] md:top-[2%]"
      >
        <Image src="/brand/mark.png" alt="" width={974} height={1128} className="h-auto w-full" priority={false} />
      </motion.div>

      <div className="container-x grid min-h-[100svh] items-center gap-12 pb-20 pt-32 md:grid-cols-12 md:gap-8 md:pb-24 md:pt-36 lg:pt-40">
        {/* copy */}
        <div className="md:col-span-6 lg:col-span-6">
          {/* the mark as a small glowing seal, the first thing to appear */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease }}
            className="relative mb-6 inline-flex"
          >
            <span className="absolute inset-0 -z-10 rounded-full bg-gold/25 blur-xl" aria-hidden />
            <span className="absolute inset-0 -z-10 rounded-full bg-coral/20 animate-pulse-ring" aria-hidden />
            <span className="relative grid size-16 place-items-center rounded-full bg-ivory/10 ring-1 ring-ivory/20 backdrop-blur-sm sm:size-[72px]">
              <Image src="/brand/mark.png" alt="MamaCare" width={502} height={580} className="h-10 w-auto sm:h-[46px]" priority />
            </span>
          </motion.div>

          <motion.p {...seq(0.5)} className="text-eyebrow flex items-center gap-3 text-gold">
            <EyebrowArrow />
            {t.hero.eyebrow}
          </motion.p>

          {/* the heartbeat trace — draws itself in once, sits in the normal text flow so it never collides with wrapped headline text */}
          <motion.svg
            aria-hidden
            viewBox="0 0 460 32"
            preserveAspectRatio="none"
            className="mt-3 h-5 w-full max-w-[460px] opacity-70"
          >
            <motion.path
              d="M0,16 L172,16 L188,16 L198,2 L209,29 L220,9 L231,16 L460,16"
              fill="none"
              stroke="#F4C95D"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.65, duration: reduce ? 0 : 1.6, ease: "easeInOut" }}
            />
          </motion.svg>

          <motion.h1 {...seq(0.5)} className="text-display mt-3">
            {t.hero.title1}
            <br />
            <span className="text-coral">{t.hero.title2}</span>
          </motion.h1>
          <motion.p {...seq(0.7)} className="text-lead mt-6 max-w-[52ch] text-ivory/75">
            {t.hero.lead}
          </motion.p>
          <motion.div {...seq(0.9)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/login?mode=signup" variant="coral" size="lg" arrow>
              {t.hero.ctaPrimary}
            </Button>
            <Button href="/how-it-works" variant="light" size="lg">
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>
          <motion.p {...seq(1.05)} className="mt-6 text-sm text-ivory/55">
            {t.common.notDiagnosis}
          </motion.p>
        </div>

        {/* image */}
        <div className="relative md:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.1, duration: 1, ease }}
            className="relative mx-auto aspect-[4/5] w-full max-w-[520px] sm:aspect-square md:aspect-[4/5] lg:aspect-[5/6]"
          >
            <motion.div
              style={{ y: imgY, scale: imgScale }}
              className="relative size-full overflow-hidden rounded-hero shadow-float ring-1 ring-white/10"
            >
              <Image
                src="/images/mother-home-phone.jpg"
                alt="A pregnant woman at home checking in on her phone"
                fill
                quality={90}
                priority
                sizes="(min-width: 768px) 45vw, 92vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/50 via-transparent to-transparent" />
            </motion.div>

            {/* floating badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7, ease }}
              className="absolute -left-3 top-[18%] sm:-left-8"
            >
              <div className="animate-float flex items-center gap-3 rounded-lg bg-ivory p-3 pr-4 text-midnight shadow-float">
                <span className="relative grid size-9 place-items-center rounded-full bg-green-100 text-green">
                  <span className="absolute inset-0 rounded-full bg-green/30 animate-pulse-ring" />
                  <ShieldCheck className="relative size-5" />
                </span>
                <div>
                  <p className="text-xs text-muted">{t.hero.badgeRisk}</p>
                  <p className="text-sm font-bold">Low risk · follow-up in 3 days</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.45, duration: 0.7, ease }}
              className="absolute -right-2 bottom-[16%] sm:-right-8"
            >
              <div className="animate-float-slow flex items-center gap-3 rounded-lg bg-midnight/90 p-3 pr-4 text-ivory shadow-float ring-1 ring-white/10 backdrop-blur">
                <span className="grid size-9 place-items-center rounded-full bg-violet/20 text-violet">
                  <Languages className="size-5" />
                </span>
                <div>
                  <p className="text-xs text-ivory/60">Web · App · WhatsApp · SMS</p>
                  <p className="text-sm font-bold">{t.hero.badgeLang}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.6, ease }}
              className="absolute -top-4 right-[12%] hidden sm:block"
              aria-hidden
            >
              <div className="animate-float grid size-12 place-items-center rounded-full bg-gold text-midnight shadow-float">
                <Activity className="size-5" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ivory/50 hover:text-ivory md:flex"
      >
        {t.hero.scroll}
        <ArrowDown className="size-3.5 animate-bounce" />
      </motion.a>
    </section>
  );
}
