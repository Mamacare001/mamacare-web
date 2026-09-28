"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from "framer-motion";
import { Fingerprint, HeartHandshake, Languages, BellRing, UserCheck, Signal, MapPin } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { useLang } from "@/components/providers/LanguageProvider";
import type { Dict } from "@/lib/i18n";

const ease = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* 1. Who we are — an identity card you can tilt                        */
/* ------------------------------------------------------------------ */
function IdCard({ id }: { id: Dict["about"]["idCard"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 150, damping: 20 });
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(my, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={ref}
      className="[perspective:1400px]"
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
    >
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative mx-auto w-full max-w-[520px] rounded-2xl bg-emerald p-6 text-ivory shadow-float ring-1 ring-white/10 [transform-style:preserve-3d] md:p-8">
        <div className="grain absolute inset-0 rounded-2xl opacity-70" aria-hidden />
        {/* glare */}
        <motion.div style={{ left: glareX, top: glareY }} className="pointer-events-none absolute size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(248_247_242/0.18),transparent_60%)]" aria-hidden />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-eyebrow text-gold">{id.eyebrow}</p>
            <p className="mt-1 font-display text-3xl">{id.title}</p>
          </div>
          <span className="grid size-14 shrink-0 place-items-center rounded-lg bg-ivory/10 ring-1 ring-white/15"><Fingerprint className="size-7 text-gold" /></span>
        </div>

        <dl className="relative mt-6 space-y-3">
          {id.fields.map((f, i) => (
            <motion.div key={f.k} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease }} className="grid grid-cols-[130px_1fr] gap-3 border-b border-white/10 pb-2.5 text-sm md:grid-cols-[160px_1fr]">
              <dt className="text-eyebrow text-ivory/50">{f.k}</dt>
              <dd className="font-semibold">{f.v}</dd>
            </motion.div>
          ))}
        </dl>

        <div className="relative mt-6 flex items-end justify-between gap-4">
          <p className="max-w-[28ch] text-xs leading-relaxed text-ivory/60">{id.footer}</p>
          <span className="rotate-[-8deg] rounded-md border-2 border-coral px-3 py-1 font-display text-lg uppercase tracking-widest text-coral [translate:0_0_30px]">{id.stamp}</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Values — five promises to a mother, stacking as you scroll        */
/* ------------------------------------------------------------------ */
const promiseMeta = [
  { label: "Uruhushya", icon: HeartHandshake, tone: "bg-white text-emerald" },
  { label: "Ikinyarwanda", icon: Languages, tone: "bg-emerald text-ivory" },
  { label: "Gukurikirana", icon: BellRing, tone: "bg-coral text-white" },
  { label: "Umuntu", icon: UserCheck, tone: "bg-gold text-midnight" },
  { label: "Umudugudu", icon: Signal, tone: "bg-midnight text-ivory" },
];

type Promise = { label: string; title: string; why: string; icon: typeof HeartHandshake; tone: string };

function PromiseCard({ p, i, total, promiseLabel, ofLabel }: { p: Promise; i: number; total: number; promiseLabel: string; ofLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.35", "end 0.35"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - i) * 0.03]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -(total - i) * 6]);
  return (
    <div ref={ref} className="sticky" style={{ top: `calc(6rem + ${i * 14}px)` }}>
      <motion.article style={{ scale, y }} className={cn("origin-top rounded-2xl p-7 shadow-float ring-1 ring-emerald/10 md:p-10", p.tone)}>
        <div className="flex items-center justify-between gap-4">
          <p className="text-eyebrow opacity-70">{promiseLabel} {i + 1} {ofLabel} {total} · {p.label}</p>
          <span className="grid size-11 place-items-center rounded-full bg-current/10"><p.icon className="size-5" /></span>
        </div>
        <h3 className="mt-4 font-display text-3xl leading-tight md:text-5xl">{p.title}</h3>
        <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed opacity-85 md:text-base">{p.why}</p>
      </motion.article>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Vision & mission — the far hill and the road                      */
/* ------------------------------------------------------------------ */
function Hills({ visionLabel }: { visionLabel: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  return (
    <svg ref={ref} viewBox="0 0 800 300" className="h-auto w-full" aria-hidden>
      <defs>
        <linearGradient id="hill1" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2E8B70" /><stop offset="1" stopColor="#123C35" /></linearGradient>
        <linearGradient id="hill2" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#123C35" /><stop offset="1" stopColor="#102522" /></linearGradient>
      </defs>
      {/* far hills */}
      <motion.path initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2, ease }} d="M0 200 C120 120 220 110 330 150 C420 185 470 90 560 80 C640 72 720 120 800 110 L800 300 L0 300 Z" fill="url(#hill2)" opacity="0.9" />
      {/* near hills */}
      <motion.path initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2, delay: 0.15, ease }} d="M0 250 C100 210 180 200 260 225 C360 255 430 190 520 200 C620 212 700 260 800 240 L800 300 L0 300 Z" fill="url(#hill1)" />
      {/* the road */}
      <motion.path initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 2.6, delay: 0.6, ease: "easeInOut" }} d="M40 270 C140 262 170 230 250 232 C330 234 360 262 440 240 C520 218 540 160 600 130 C640 110 680 100 720 96" fill="none" stroke="#F4C95D" strokeWidth="3" strokeDasharray="8 10" strokeLinecap="round" />
      {/* here */}
      <motion.g initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.5, duration: 0.5 }} style={{ transformOrigin: "40px 270px" }}>
        <circle cx="40" cy="270" r="7" fill="#FF6B5E" /><circle cx="40" cy="270" r="14" fill="#FF6B5E" opacity="0.25" />
      </motion.g>
      {/* the hill top */}
      <motion.g initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 3.2, duration: 0.8, ease }}>
        <circle cx="720" cy="96" r="8" fill="#F4C95D" /><circle cx="720" cy="96" r="18" fill="#F4C95D" opacity="0.25" />
        <text x="720" y="70" textAnchor="middle" fill="#F4C95D" fontSize="13" fontFamily="var(--font-sans)" fontWeight="700" letterSpacing="2">{visionLabel}</text>
      </motion.g>
      <motion.text initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }} x="40" y="295" fill="#FF6B5E" fontSize="13" fontFamily="var(--font-sans)" fontWeight="700" letterSpacing="2">HERE · 2026</motion.text>
    </svg>
  );
}

function Highlight({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="relative inline">
      <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay, duration: 0.8, ease }} className="absolute inset-x-0 bottom-[0.08em] -z-0 h-[0.42em] origin-left bg-coral/35" aria-hidden />
      <span className="relative">{children}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
export function Manifesto() {
  const { t } = useLang();
  const id = t.about.idCard;
  const v = t.about.values;
  const vis = t.about.vision;
  const promises: Promise[] = v.promises.map((p, i) => ({ ...p, ...promiseMeta[i] }));

  return (
    <>
      {/* 1 — Who we are */}
      <section className="relative overflow-hidden bg-ivory py-24 md:py-32">
        <div className="container-x grid items-center gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <div>
            <Reveal variant="fade" duration={0.6}><Eyebrow tone="coral">{id.whoEyebrow}</Eyebrow></Reveal>
            <TextReveal as="h2" className="text-h1 mt-5 text-emerald" delay={0.1}>{id.whoHeading}</TextReveal>
            <Reveal variant="blur" delay={0.35}>
              <p className="text-lead mt-6 text-muted">{id.whoLead}</p>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted"><MapPin className="size-4 text-coral" /> {id.hint}</p>
            </Reveal>
          </div>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.1}><IdCard id={id} /></Reveal>
          </div>
        </div>
      </section>

      {/* 2 — Values as promises */}
      <section className="relative bg-ivory-200/60 py-24 md:py-32">
        <div className="container-x">
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-32">
                <div>
            <Reveal variant="fade" duration={0.6}><Eyebrow tone="coral">{v.eyebrow}</Eyebrow></Reveal>
            <TextReveal as="h2" className="text-h1 mt-5 text-emerald" delay={0.1}>{v.heading}</TextReveal>
            <Reveal variant="blur" delay={0.35}>
                  <p className="text-lead mt-6 text-muted">{v.lead}</p>
                  <p className="mt-6 text-sm text-muted">{v.scrollHint}</p>
            </Reveal>
          </div>
              </div>
            </div>
            <div className="space-y-6 md:col-span-8">
              {promises.map((p, i) => <PromiseCard key={p.label} p={p} i={i} total={promises.length} promiseLabel={v.promiseLabel} ofLabel={v.ofLabel} />)}
              <div className="h-8" />
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Vision & mission */}
      <section className="relative overflow-hidden bg-midnight py-24 text-ivory md:py-32">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="container-x relative">
          <div className="max-w-3xl">
            <Reveal variant="fade" duration={0.6}><Eyebrow tone="gold">{vis.eyebrow}</Eyebrow></Reveal>
            <TextReveal as="h2" className="text-h1 mt-5" delay={0.1}>{vis.heading}</TextReveal>
            <Reveal variant="blur" delay={0.35}>
            <p className="text-lead mt-6 text-ivory/70">{vis.lead}</p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7"><Reveal delay={0.1}><Hills visionLabel={vis.svgLabel} /></Reveal></div>
            <div className="space-y-8 md:col-span-5">
              <Reveal delay={0.2}>
                <p className="text-eyebrow text-gold">{vis.visionLabel}</p>
                <p className="mt-3 font-display text-3xl leading-tight md:text-4xl">
                  {vis.visionPre}<Highlight delay={0.6}>{vis.visionHighlight}</Highlight>
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-eyebrow text-coral">{vis.missionLabel}</p>
                <p className="mt-3 text-lg leading-relaxed text-ivory/85 md:text-xl">
                  {vis.missionPre}<Highlight delay={0.9}>{vis.missionHighlight}</Highlight>{vis.missionSuffix}
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="grid grid-cols-3 gap-3 border-t border-ivory/10 pt-6">
                  {vis.stats.map((s) => (
                    <div key={s.l}><p className="font-display text-3xl text-gold">{s.n}</p><p className="text-xs text-ivory/60">{s.l}</p></div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
