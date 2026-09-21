import { cn } from "@/lib/cn";

export const fieldCls =
  "w-full rounded-md border border-emerald/15 bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] focus:border-green focus:shadow-[0_0_0_4px_rgb(46_139_112/0.15)] focus:outline-none disabled:opacity-60";

export function Field({ label, hint, children, className }: { label: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("grid gap-1.5", className)}>
      <span className="text-sm font-semibold text-emerald">{label}</span>
      {children}
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function ChoiceCard({
  name,
  value,
  title,
  text,
  defaultChecked,
  icon,
}: {
  name: string;
  value: string;
  title: string;
  text: string;
  defaultChecked?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <label className="group relative block cursor-pointer">
      <input type="radio" name={name} value={value} defaultChecked={defaultChecked} className="peer sr-only" required />
      <span className="flex items-start gap-4 rounded-lg border border-emerald/15 bg-white p-4 transition-all peer-checked:border-emerald peer-checked:bg-emerald/5 peer-checked:shadow-soft peer-focus-visible:ring-2 peer-focus-visible:ring-green group-hover:border-emerald/40">
        {icon && <span className="grid size-11 shrink-0 place-items-center rounded-full bg-green-100 text-green">{icon}</span>}
        <span>
          <span className="block font-display text-xl text-emerald">{title}</span>
          <span className="mt-0.5 block text-sm leading-relaxed text-muted">{text}</span>
        </span>
      </span>
    </label>
  );
}

export function FormError({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-md bg-coral-100 px-3 py-2 text-sm text-coral">
      {message}
    </p>
  );
}
