import { cn } from "@/lib/cn";

/** Small animated arrow used as the eyebrow marker (replaces the static bar). */
export function EyebrowArrow({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex h-4 w-7 items-center", className)} aria-hidden>
      <span className="absolute left-0 h-px w-full bg-current opacity-40" />
      <svg viewBox="0 0 24 24" className="animate-arrow absolute right-0 size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

export function Eyebrow({
  children,
  className,
  tone = "green",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "green" | "coral" | "gold" | "violet" | "light";
}) {
  const tones = {
    green: "text-green",
    coral: "text-coral",
    gold: "text-gold",
    violet: "text-violet",
    light: "text-ivory/70",
  } as const;
  return (
    <p className={cn("text-eyebrow flex items-center gap-3", tones[tone], className)}>
      <EyebrowArrow />
      {children}
    </p>
  );
}
