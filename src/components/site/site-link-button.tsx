import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SiteLinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "editorial" | "solid" | "outline" | "light";
  className?: string;
  download?: boolean | string;
};

const baseClassName =
  "inline-flex items-center justify-center transition-colors";

export const siteEditorialButtonClassName =
  "relative inline-flex h-[36px] items-center justify-center whitespace-nowrap bg-[#d8d8d8] px-6 text-[14px] font-semibold uppercase leading-none tracking-[0.16em] text-black shadow-[0_4px_0_0_#bcbcbc] hover:bg-[#d2d2d2] md:px-8";

const variantClassName: Record<NonNullable<SiteLinkButtonProps["variant"]>, string> = {
  editorial: siteEditorialButtonClassName,
  solid: "bg-stone-950 text-white hover:bg-stone-800",
  outline: "border border-stone-950 text-stone-950 hover:bg-stone-950 hover:text-white",
  light: "bg-white text-stone-950 hover:bg-stone-200",
};

export function SiteLinkButton({
  href,
  children,
  variant = "editorial",
  className,
  download,
}: SiteLinkButtonProps) {
  if (download) {
    return (
      <a
        href={href}
        download={download}
        className={cn(baseClassName, variantClassName[variant], className)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(baseClassName, variantClassName[variant], className)}>
      {children}
    </Link>
  );
}
