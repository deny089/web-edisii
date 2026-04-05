"use client";

import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ModalProps = {
  children: ReactNode;
  visible?: boolean;
  onClose?: () => void;
  closeOnBackdrop?: boolean;
  overlayClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
};

export function Modal({
  children,
  visible = true,
  onClose,
  closeOnBackdrop = true,
  overlayClassName,
  containerClassName,
  contentClassName,
}: ModalProps) {
  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!closeOnBackdrop || !onClose || event.target !== event.currentTarget) {
      return;
    }

    onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className={cn(
        "fixed inset-0 z-[120] p-4 transition-opacity duration-300",
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        overlayClassName
      )}
    >
      <div className={cn("flex min-h-full items-center justify-center", containerClassName)}>
        <div className={contentClassName}>{children}</div>
      </div>
    </div>
  );
}
