import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "dark";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-semibold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:brightness-110 hover:-translate-y-0.5",
  outline:
    "border border-border bg-transparent text-foreground hover:border-primary hover:text-primary",
  ghost: "text-foreground hover:text-primary",
  dark: "bg-ink text-ink-foreground hover:bg-charcoal hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-sm md:text-base",
};

export function btnClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Btn({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size; children: ReactNode }) {
  return (
    <button className={btnClass(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

export function BtnLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size; children: ReactNode }) {
  return (
    <Link className={btnClass(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

export function BtnAnchor({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; size?: Size; children: ReactNode }) {
  return (
    <a className={btnClass(variant, size, className)} {...props}>
      {children}
    </a>
  );
}
