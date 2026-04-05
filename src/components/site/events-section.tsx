"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FrostPanel } from "@/components/site/frost-panel";

const EventsModal = dynamic(
  () => import("@/components/site/events-modal").then((module) => module.EventsModal),
  { ssr: false }
);

const eventGallery = [
  "/images/events/Rectangle%2023.png",
  "/images/events/Rectangle%2024.png",
  "/images/events/Rectangle%2025.png",
  "/images/events/Rectangle%2027.png",
  "/images/events/Rectangle%2028.png",
  "/images/events/Rectangle%2029.png",
];

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
            <Image src={imageUrl} alt={imageAlt} fill sizes="100vw" className="object-cover" />
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
                className="mt-7 inline-flex min-h-11 w-full items-center justify-center border border-[#d0d0d0] bg-[#d9d9d7] px-6 py-3 text-[14px] tracking-[0.16em] uppercase text-black transition-colors hover:bg-[#cececc] sm:min-w-[230px] sm:w-auto sm:px-8 sm:text-[16px]"
              >
                {ctaLabel}
              </button>
            </FrostPanel>
          </div>
        </div>
      </section>

      {isModalMounted ? (
        <EventsModal
          eventGallery={eventGallery}
          isVisible={isModalVisible}
          onClose={closeModal}
        />
      ) : null}
    </>
  );
}
