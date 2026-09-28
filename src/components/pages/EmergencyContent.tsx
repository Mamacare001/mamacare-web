"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, AlertTriangle, Baby, Droplets, Eye, Thermometer, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;
/** Quick, non-blocking entrance for the critical top content - never gated on scroll,
 *  never slow: someone here needs the call button now, not after an animation. */
const seq = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4, ease },
});

const signs = [
  { icon: Droplets, en: "Heavy bleeding", rw: "Kuva amaraso menshi" },
  { icon: Activity, en: "Fits or seizures", rw: "Kugagara / gufatwa n'igicuri" },
  { icon: Eye, en: "Severe headache with blurred vision", rw: "Umutwe ukabije n'amaso atabona neza" },
  { icon: Thermometer, en: "High fever", rw: "Umuriro mwinshi" },
  { icon: Baby, en: "Baby has stopped moving", rw: "Umwana yahagaritse kunyeganyega" },
  { icon: AlertTriangle, en: "Severe belly pain or water breaking early", rw: "Kubabara inda cyane cyangwa amazi asohotse hakiri kare" },
];

/**
 * The call-to-action above the fold (title, lead, call/map buttons) fades in fast on
 * mount - no scroll gate, so it's never hidden behind a trigger someone in a hurry
 * hasn't crossed yet. The signs grid and disclaimer, both already below the fold on
 * a phone, use the site's normal scroll-reveal so the page still feels consistent
 * with the rest of MamaCare rather than abruptly static.
 */
export function EmergencyContent() {
  return (
    <section className="min-h-[100svh] bg-coral pb-16 pt-28 text-white md:pt-40">
      <div className="container-x">
        <motion.p {...seq(0)} className="text-eyebrow text-white/80">
          Emergency · Ibyihutirwa
        </motion.p>
        <motion.h1 {...seq(0.08)} className="text-display mt-4 max-w-[14ch]">
          Do not wait. Ntutegereze.
        </motion.h1>
        <motion.p {...seq(0.16)} className="mt-6 max-w-xl text-xl leading-relaxed text-white/90">
          If a pregnant woman has any of the signs below, get help now. Call 912 or go to the nearest health centre or
          hospital.
        </motion.p>

        <motion.div {...seq(0.24)} className="mt-10 flex flex-wrap gap-3">
          <Button href="tel:912" variant="light" size="lg" className="!text-coral">
            <Phone className="size-5" /> Call 912
          </Button>
          <Button
            href="https://www.google.com/maps/search/health+centre+near+me"
            variant="ghost"
            size="lg"
            className="!text-white ring-1 ring-white/50 hover:!bg-white/10"
          >
            <MapPin className="size-5" /> Nearest health facility
          </Button>
        </motion.div>

        <RevealGroup as="ul" className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06} variant="scale" duration={0.6}>
          {signs.map((s) => (
            <RevealItem as="li" key={s.en}>
              <div className="flex items-center gap-4 rounded-lg bg-white/15 p-5 ring-1 ring-white/25">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-coral">
                  <s.icon className="size-6" aria-hidden />
                </span>
                <div>
                  <p className="text-lg font-bold leading-tight">{s.en}</p>
                  <p className="text-sm text-white/85">{s.rw}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12 max-w-2xl text-sm leading-relaxed text-white/80" as="p">
          MamaCare is not an emergency service and does not replace medical care. If you are unsure whether it is an
          emergency, treat it as one.
        </Reveal>
      </div>
    </section>
  );
}
