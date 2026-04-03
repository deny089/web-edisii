import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SiteLinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "editorial" | "solid" | "outline" | "light";
  className?: string;
};

const baseClassName =
  "inline-flex min-h-11 items-center justify-center px-8 py-3 text-[16px] transition-colors";

const variantClassName: Record<NonNullable<SiteLinkButtonProps["variant"]>, string> = {
  editorial:
    "border border-[#d0d0d0] bg-[#d9d9d7] text-black tracking-[0.18em] uppercase hover:bg-[#cececc]",
  solid: "bg-stone-950 text-white hover:bg-stone-800",
  outline: "border border-stone-950 text-stone-950 hover:bg-stone-950 hover:text-white",
  light: "bg-white text-stone-950 hover:bg-stone-200",
};

export function SiteLinkButton({
  href,
  children,
  variant = "editorial",
  className,
}: SiteLinkButtonProps) {
  return (
    <Link href={href} className={cn(baseClassName, variantClassName[variant], className)}>
      {children}
    </Link>
  );
}
