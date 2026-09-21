import type { Metadata } from "next";
import { Phone, MapPin, AlertTriangle, Baby, Droplets, Eye, Thermometer, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Emergency",
  description: "If you or someone near you is in danger: call 912 or go to the nearest health facility now.",
};

const signs = [
  { icon: Droplets, en: "Heavy bleeding", rw: "Kuva amaraso menshi" },
  { icon: Activity, en: "Fits or seizures", rw: "Kugagara / gufatwa n'igicuri" },
  { icon: Eye, en: "Severe headache with blurred vision", rw: "Umutwe ukabije n'amaso atabona neza" },
  { icon: Thermometer, en: "High fever", rw: "Umuriro mwinshi" },
  { icon: Baby, en: "Baby has stopped moving", rw: "Umwana yahagaritse kunyeganyega" },
  { icon: AlertTriangle, en: "Severe belly pain or water breaking early", rw: "Kubabara inda cyane cyangwa amazi asohotse hakiri kare" },
];

/** Kept deliberately simple and static so it renders fast on any connection. */
export default function EmergencyPage() {
  return (
    <section className="min-h-[100svh] bg-coral pb-16 pt-28 text-white md:pt-40">
      <div className="container-x">
        <p className="text-eyebrow text-white/80">Emergency · Ibyihutirwa</p>
        <h1 className="text-display mt-4 max-w-[14ch]">Do not wait. Ntutegereze.</h1>
        <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/90">
          If a pregnant woman has any of the signs below, get help now. Call 912 or go to the nearest health centre or hospital.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="tel:912" variant="light" size="lg" className="!text-coral">
            <Phone className="size-5" /> Call 912
          </Button>
          <Button href="https://www.google.com/maps/search/health+centre+near+me" variant="ghost" size="lg" className="!text-white ring-1 ring-white/50 hover:!bg-white/10">
            <MapPin className="size-5" /> Nearest health facility
          </Button>
        </div>

        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {signs.map((s) => (
            <li key={s.en} className="flex items-center gap-4 rounded-lg bg-white/15 p-5 ring-1 ring-white/25">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-coral">
                <s.icon className="size-6" aria-hidden />
              </span>
              <div>
                <p className="text-lg font-bold leading-tight">{s.en}</p>
                <p className="text-sm text-white/85">{s.rw}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-white/80">
          MamaCare is not an emergency service and does not replace medical care. If you are unsure whether it is an
          emergency, treat it as one.
        </p>
      </div>
    </section>
  );
}
