import { cn } from "@/lib/cn";

/** Readable long-form text block for legal / FAQ style pages. */
export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "max-w-3xl text-[17px] leading-relaxed text-ink/85",
        "[&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-emerald [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:leading-tight",
        "[&_h3]:font-display [&_h3]:text-xl [&_h3]:text-emerald [&_h3]:mt-8 [&_h3]:mb-2",
        "[&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1.5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6",
        "[&_strong]:text-emerald [&_a]:text-green [&_a]:underline [&_a]:underline-offset-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
