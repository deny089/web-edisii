"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { siteSettings } from "@/content/site";
import { FrostPanel } from "@/components/site/frost-panel";

type OfficeSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  secondaryDescription: string;
  imageUrl: string;
  imageAlt: string;
};

type Slide = {
  id: number;
  align: "left" | "right";
  imageUrl: string;
  imageAlt: string;
};

const staticSlides: Slide[] = [
  {
    id: 1,
    align: "left",
    imageUrl: "/assets/event-image.png",
    imageAlt: "EDISII gallery space",
  },
  {
    id: 2,
    align: "right",
    imageUrl: "/assets/collab-image-1.png",
    imageAlt: "EDISII studio collaboration",
  },
];

export function OfficeSection({
  eyebrow,
  title,
  description,
  secondaryDescription,
  imageUrl,
  imageAlt,
}: OfficeSectionProps) {
  const slides: Slide[] = [{ id: 0, align: "right", imageUrl, imageAlt }, ...staticSlides];
  const loopedSlides = [slides[slides.length - 1], ...slides, slides[0]];
  const maxSlideIndex = slides.length + 1;

  const [activeSlide, setActiveSlide] = useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIsTransitionEnabled(true);
      setActiveSlide((current) => Math.min(current + 1, maxSlideIndex));
    }, 5000);

    return () => window.clearInterval(timer);
  }, [maxSlideIndex]);

  const currentSlideIndex =
    activeSlide === 0 ? slides.length - 1 : activeSlide === slides.length + 1 ? 0 : activeSlide - 1;

  const goToSlide = (index: number) => {
    setIsTransitionEnabled(true);
    setActiveSlide(Math.min(Math.max(index + 1, 1), slides.length));
  };

  const goToNextSlide = () => {
    setIsTransitionEnabled(true);
    setActiveSlide((current) => Math.min(current + 1, maxSlideIndex));
  };

  const goToPreviousSlide = () => {
    setIsTransitionEnabled(true);
    setActiveSlide((current) => Math.max(current - 1, 0));
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    touchDeltaX.current = event.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) {
      return;
    }

    if (Math.abs(touchDeltaX.current) > 48) {
      if (touchDeltaX.current < 0) {
        goToNextSlide();
      } else {
        goToPreviousSlide();
      }
    }

    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const handleTransitionEnd = () => {
    if (activeSlide === slides.length + 1) {
      setIsTransitionEnabled(false);
      setActiveSlide(1);
      return;
    }

    if (activeSlide === 0) {
      setIsTransitionEnabled(false);
      setActiveSlide(slides.length);
    }
  };

  useEffect(() => {
    if (!isTransitionEnabled) {
      const frame = window.requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }
  }, [isTransitionEnabled]);

  return (
    <section id="office" className="scroll-mt-24 pb-0 pt-8 md:pt-10">
      <div className="bg-[#ecebe8] p-3 md:p-4">
        <div
          className="relative w-full overflow-hidden bg-stone-950 shadow-[0_30px_100px_rgba(44,30,17,0.18)] touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative aspect-[4/5] sm:aspect-[16/12] md:aspect-[21/8]">
          <div
            className="absolute inset-0 flex"
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${activeSlide * 100}%)`,
              transitionDuration: isTransitionEnabled ? "700ms" : "0ms",
              transitionProperty: "transform",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {loopedSlides.map((slide, index) => (
              <div key={`${slide.id}-${index}`} className="relative h-full w-full shrink-0 overflow-hidden">
                <Image
                  src={slide.imageUrl}
                  alt={slide.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  loading="eager"
                  priority
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.12),rgba(0,0,0,0.08))]" />
                <div
                  className={`absolute inset-y-0 flex w-full items-end px-3 pb-10 pt-6 sm:items-center sm:px-6 sm:pb-0 md:px-10 lg:px-14 ${
                    slide.align === "right" ? "justify-end" : "justify-start"
                  }`}
                >
                  <FrostPanel className="w-full max-w-[320px] rounded-none px-4 py-4 shadow-[0_16px_32px_rgba(0,0,0,0.08)] sm:max-w-[340px] sm:px-6 sm:py-6 md:max-w-[360px] md:px-8 md:py-9">
                    <h2 className="text-[28px] leading-none text-stone-950 sm:text-[32px]">{title}</h2>
                    <div className="mt-4 h-px w-full bg-black/10" />
                    <div className="mt-4 space-y-3 text-[14px] leading-[1.5] text-stone-800 sm:mt-5 sm:space-y-4 sm:text-[16px] sm:leading-[1.55]">
                      <p>{description}</p>
                      <p>{secondaryDescription}</p>
                    </div>
                    <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-stone-500 sm:mt-6 sm:text-[12px] sm:tracking-[0.18em]">
                      {eyebrow} - {siteSettings.officeAddress}
                    </p>
                  </FrostPanel>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2 md:bottom-7">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to office slide ${index + 1}`}
                onClick={() => goToSlide(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === currentSlideIndex ? "bg-white" : "bg-white/45"
                }`}
              />
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
