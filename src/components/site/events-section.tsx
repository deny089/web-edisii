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
      <section id="event" className="scroll-mt-24 bg-white pb-36 md:pb-0">
        <div className="relative flex aspect-[1097/381] w-full items-end overflow-visible md:items-center md:overflow-hidden">
          <div className="absolute inset-0">
            <Image src={imageUrl} alt={imageAlt} fill sizes="100vw" className="object-contain object-top" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.04))]" />
          </div>

          <div className="relative z-10 flex w-full translate-y-[128px] justify-center px-8 md:ml-auto md:mr-[120px] md:translate-y-0 md:justify-end md:px-0">
            <FrostPanel className="w-full bg-[#EEEEEE] px-9 pb-9 pt-8 shadow-none md:w-full md:max-w-[430px] md:translate-y-[-14px] md:bg-[rgba(255,255,255,0.8)] md:px-8 md:py-8 md:shadow-[0_18px_48px_rgba(0,0,0,0.05)]">
              <h2 className="text-left text-[32px] font-semibold leading-none text-stone-950">{title}</h2>
              <div className="mt-7 text-[20px] leading-[1.35] text-stone-800 md:mt-6 md:text-[16px] md:leading-[1.45]">
                <p>{description}</p>
              </div>
              <button
                type="button"
                onClick={openModal}
                className={`mt-9 md:mt-7 ${siteEditorialButtonClassName}`}
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
