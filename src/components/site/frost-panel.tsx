import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FrostPanelProps = {
  children: ReactNode;
  className?: string;
};

export function FrostPanel({ children, className }: FrostPanelProps) {
  return (
    <div
      className={cn(
        "bg-[rgba(255,255,255,0.8)] shadow-[0_18px_48px_rgba(0,0,0,0.05)]",
        className
      )}
    >
      {children}
    </div>
  );
}
