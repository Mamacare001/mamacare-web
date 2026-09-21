import Link from "next/link";
import { WifiOff } from "lucide-react";

export const metadata = { title: "Offline" };

export default function OfflinePage() {
  return (
    <section className="flex min-h-[100svh] items-center bg-ivory">
      <div className="container-x py-20">
        <span className="grid size-14 place-items-center rounded-full bg-gold-100 text-[#8a6a10]"><WifiOff className="size-7" /></span>
        <h1 className="text-h1 mt-6 max-w-[16ch] text-emerald">You are offline.</h1>
        <p className="text-lead mt-4 max-w-xl text-muted">Pages you opened before are still available, and anything you record is saved on this phone and sent when you are back on network.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/chw" className="rounded-full bg-emerald px-6 py-3 font-semibold text-ivory">Open CHW app</Link>
          <a href="tel:912" className="rounded-full bg-coral px-6 py-3 font-semibold text-white">Emergency · 912</a>
        </div>
      </div>
    </section>
  );
}
