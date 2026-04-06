"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FrostPanel } from "@/components/site/frost-panel";
import { siteEditorialButtonClassName } from "@/components/site/site-link-button";
import { eventModalTabs } from "@/content/events";
import { EventsModal } from "@/components/site/events-modal";

type EventsSectionProps = {
  title: string;
  description: string;
  ctaLabel: string;
  imageUrl: string;
  imageAlt: string;
};

export function EventsSection({
  title,
  description,
  ctaLabel,
  imageUrl,
  imageAlt,
}: EventsSectionProps) {
  const [isModalMounted, setIsModalMounted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isModalMounted) {
      return;
    }

    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    const frame = window.requestAnimationFrame(() => {
      setIsModalVisible(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isModalMounted]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isModalMounted) {
      document.body.style.removeProperty("overflow");
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.removeProperty("overflow");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalMounted]);

  const openModal = () => {
    setIsModalMounted(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    closeTimerRef.current = window.setTimeout(() => {
      setIsModalMounted(false);
      closeTimerRef.current = null;
    }, 300);
  };

  return (
    <>
      <section id="event" className="scroll-mt-24 bg-white">
        <div className="relative flex h-[470px] items-center overflow-hidden md:h-[560px]">
          <div className="absolute inset-0">
            <Image src={imageUrl} alt={imageAlt} fill sizes="100vw" className="object-cover object-left" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.04))]" />
          </div>

          <div className="relative z-10 ml-auto mr-4 flex w-full justify-end md:mr-[120px]">
            <FrostPanel className="w-full max-w-[340px] px-6 py-6 md:translate-y-[-14px] md:max-w-[430px] md:px-8 md:py-8">
              <h2 className="text-[32px] font-semibold leading-none text-stone-950">{title}</h2>
              <div className="mt-6 text-[16px] leading-[1.45] text-stone-800">
                <p>{description}</p>
              </div>
              <button
                type="button"
                onClick={openModal}
                className={`mt-7 ${siteEditorialButtonClassName}`}
              >
                {ctaLabel}
              </button>
            </FrostPanel>
          </div>
        </div>
      </section>

      {isModalMounted ? (
        <EventsModal
          tabs={eventModalTabs}
          isVisible={isModalVisible}
          onClose={closeModal}
        />
      ) : null}
    </>
  );
}
