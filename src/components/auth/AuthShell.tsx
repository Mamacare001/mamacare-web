import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

type Step = { href: string; label: string };

/** Split layout shared by login, verification and onboarding screens. */
export function AuthShell({
  children,
  image = "/images/mother-outdoors.jpg",
  quote = "The warning can come before the emergency.",
  sub = "One continuous picture of every pregnancy — for mothers, families, CHWs and clinics.",
  steps,
  current,
  backHref = "/",
  backLabel = "Back to site",
}: {
  children: React.ReactNode;
  image?: string;
  quote?: string;
  sub?: string;
  steps?: Step[];
  current?: string;
  backHref?: string;
  backLabel?: string;
}) {
  const idx = steps?.findIndex((s) => s.href === current) ?? -1;
  return (
    <section className="min-h-[100svh] bg-ivory md:grid md:grid-cols-12">
      <aside className="relative hidden overflow-hidden bg-midnight text-ivory md:col-span-5 md:block lg:col-span-5">
        <Image src={image} alt="" fill priority quality={90} sizes="45vw" className="object-cover object-[50%_25%] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
        <div className="grain absolute inset-0" aria-hidden />
        <div className="relative flex h-full flex-col justify-between p-10 lg:p-14">
          <Link href="/" aria-label="MamaCare home" className="inline-flex items-center gap-2.5">
            <Image src="/brand/mark.png" alt="" width={40} height={46} className="h-10 w-auto" />
            <Image src="/brand/wordmark-white.png" alt="MamaCare" width={135} height={20} className="h-5 w-auto" />
          </Link>
          <div>
            {steps && (
              <ol className="mb-10 space-y-3">
                {steps.map((s, i) => {
                  const done = i < idx;
                  const active = i === idx;
                  return (
                    <li key={s.href} className="flex items-center gap-3 text-sm">
                      <span
                        className={cn(
                          "grid size-7 place-items-center rounded-full text-xs font-bold ring-1 transition-colors",
                          done ? "bg-gold text-midnight ring-gold" : active ? "bg-coral text-white ring-coral" : "bg-transparent text-ivory/60 ring-ivory/30",
                        )}
                      >
                        {done ? <Check className="size-3.5" /> : i + 1}
                      </span>
                      <span className={cn(active ? "font-semibold text-ivory" : "text-ivory/60")}>{s.label}</span>
                    </li>
                  );
                })}
              </ol>
            )}
            <p className="text-h2 max-w-[16ch]">{quote}</p>
            <p className="mt-4 max-w-md text-ivory/70">{sub}</p>
          </div>
        </div>
      </aside>

      <div className="flex min-h-[100svh] flex-col px-5 pb-10 pt-6 sm:px-10 md:col-span-7 md:min-h-0 lg:col-span-7">
        <div className="flex items-center justify-between md:hidden">
          <Link href="/" aria-label="MamaCare home" className="inline-flex items-center gap-2">
            <Image src="/brand/mark.png" alt="" width={36} height={42} className="h-9 w-auto" />
            <Image src="/brand/wordmark.png" alt="MamaCare" width={120} height={18} className="h-[18px] w-auto" />
          </Link>
          <Link href={backHref} className="text-sm font-semibold text-emerald">← {backLabel}</Link>
        </div>
        {steps && (
          <ol className="mt-6 flex gap-2 md:hidden" aria-label="Progress">
            {steps.map((s, i) => (
              <li key={s.href} className={cn("h-1 flex-1 rounded-full", i <= idx ? "bg-coral" : "bg-emerald/10")} aria-current={i === idx ? "step" : undefined} />
            ))}
          </ol>
        )}
        <div className="hidden justify-end md:flex">
          <Link href={backHref} className="link-underline text-sm font-semibold text-emerald">← {backLabel}</Link>
        </div>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[480px]">{children}</div>
        </div>
        <p className="text-center text-xs text-muted">
          MamaCare does not diagnose. In an emergency, <Link href="/emergency" className="font-semibold text-coral underline underline-offset-4">call 912</Link>.
        </p>
      </div>
    </section>
  );
}
