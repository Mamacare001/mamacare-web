import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "coral" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = BaseProps &
  (
    | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">)
    | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">)
  );

const base =
  "group inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-[background-color,color,box-shadow,transform] duration-200 ease-out select-none disabled:opacity-60 disabled:pointer-events-none active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-emerald text-ivory hover:bg-emerald-700 shadow-soft",
  secondary: "bg-green/10 text-emerald hover:bg-green/20",
  coral: "bg-coral text-white hover:bg-[#f25b4e] shadow-[0_12px_30px_-12px_rgb(255_107_94/0.6)]",
  ghost: "bg-transparent text-emerald hover:bg-emerald/5",
  light: "bg-ivory text-emerald hover:bg-white",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-base",
};

export function Button({ variant = "primary", size = "md", arrow, className, children, ...rest }: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          className="size-[1.1em] transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden
        />
      )}
    </>
  );
  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest as { href: string } & Record<string, unknown>;
    return (
      <Link href={href} className={classes} {...(linkRest as object)}>
        {content}
      </Link>
    );
  }
  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
