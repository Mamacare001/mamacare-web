import Link from "next/link";
import { WifiOff } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";

export const metadata = { title: "Offline" };

export default function OfflinePage() {
  return (
    <section className="flex min-h-[100svh] items-center bg-ivory">
      <div className="container-x py-20">
        <Reveal variant="scale" duration={0.6} as="span" className="grid size-14 place-items-center rounded-full bg-gold-100 text-[#8a6a10]"><WifiOff className="size-7" /></Reveal>
        <TextReveal as="h1" trigger="mount" delay={0.3} className="text-h1 mt-6 max-w-[16ch] text-emerald">
          You are offline.
        </TextReveal>
        <Reveal variant="blur" delay={0.7} as="p" className="text-lead mt-4 max-w-xl text-muted">
          Pages you opened before are still available, and anything you record is saved on this phone and sent when you are back on network.
        </Reveal>
        <Reveal variant="scale" delay={0.9} className="mt-8 flex flex-wrap gap-3">
          <Link href="/chw" className="rounded-full bg-emerald px-6 py-3 font-semibold text-ivory">Open CHW app</Link>
          <a href="tel:912" className="rounded-full bg-coral px-6 py-3 font-semibold text-white">Emergency · 912</a>
        </Reveal>
      </div>
    </section>
  );
}
