import { cn } from "@/lib/cn";

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
      <span className="h-px w-8 bg-current opacity-70" aria-hidden />
      {children}
    </p>
  );
}
