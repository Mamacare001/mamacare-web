import { Baby, HeartPulse, CalendarDays, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { guidanceByTrimester, weeksPregnant } from "@/lib/mock/mother";
import { PageTitle, Card } from "@/components/app/ui";
import { cn } from "@/lib/cn";

export const metadata = { title: "Guidance" };

const danger = [
  ["Bleeding from the vagina", "Kuva amaraso"],
  ["Severe headache or blurred vision", "Umutwe ukabije cyangwa amaso atabona neza"],
  ["Swollen face or hands", "Mu maso cyangwa ibiganza byabyimbye"],
  ["Fits or convulsions", "Kugagara"],
  ["High fever", "Umuriro mwinshi"],
  ["Baby moving much less or not at all", "Umwana atanyeganyega"],
  ["Severe belly pain", "Kubabara inda cyane"],
  ["Waters breaking before 37 weeks", "Amazi asohotse mbere y’ibyumweru 37"],
];

export default function GuidancePage() {
  const weeks = weeksPregnant();
  const current = weeks < 13 ? 1 : weeks < 28 ? 2 : 3;
  return (
    <div className="mx-auto max-w-4xl">
      <PageTitle eyebrow={`Week ${weeks}`} title="Guidance for your pregnancy" />
      <Card className="mb-8 border-l-4 border-coral">
        <div className="flex items-center gap-3">
          <AlertTriangle className="size-5 text-coral" />
          <p className="font-display text-xl text-emerald">Danger signs — report the same day</p>
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {danger.map(([en, rw]) => (
            <li key={en} className="rounded-md bg-coral-100/60 px-3 py-2 text-sm">
              <span className="font-semibold text-ink">{en}</span>
              <span className="block text-xs text-muted">{rw}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">Message MamaCare in the <Link href="/app/chat" className="font-semibold text-green underline underline-offset-4">chat</Link>, or if it is severe, <Link href="/emergency" className="font-semibold text-coral underline underline-offset-4">call 912</Link>.</p>
      </Card>

      {([1, 2, 3] as const).map((tri) => (
        <section key={tri} className={cn("mb-8", tri !== current && "opacity-70")}>
          <div className="mb-3 flex items-center gap-3">
            <h2 className="text-h3 text-emerald">Trimester {tri}</h2>
            {tri === current && <span className="rounded-full bg-green text-ivory px-2.5 py-0.5 text-xs font-bold">You are here</span>}
            <span className="text-sm text-muted">{tri === 1 ? "weeks 1–12" : tri === 2 ? "weeks 13–27" : "weeks 28–40"}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {guidanceByTrimester[tri].map((g, i) => (
              <Card key={g.t}>
                <span className="grid size-9 place-items-center rounded-full bg-green-100 text-green">{i === 0 ? <Baby className="size-4" /> : i === 1 ? <HeartPulse className="size-4" /> : <CalendarDays className="size-4" />}</span>
                <p className="mt-3 font-semibold text-emerald">{g.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{g.d}</p>
              </Card>
            ))}
          </div>
        </section>
      ))}
      <p className="text-xs text-muted">Guidance is reviewed by MamaCare’s clinical lead and follows Rwanda ANC guidance. It is general information, not a diagnosis.</p>
    </div>
  );
}
