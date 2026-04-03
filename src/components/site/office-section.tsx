"use client";

import { useEffect, useState } from "react";
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

export function OfficeSection({
  eyebrow,
  title,
  description,
  secondaryDescription,
  imageUrl,
  imageAlt,
}: OfficeSectionProps) {
  const slides = [
    { id: 0, align: "right" as const, imageUrl, imageAlt },
    {
      id: 1,
      align: "left" as const,
      imageUrl: "/assets/event-image.png",
      imageAlt: "EDISII gallery space",
    },
    {
      id: 2,
      align: "right" as const,
      imageUrl: "/assets/collab-image-1.png",
      imageAlt: "EDISII studio collaboration",
    },
  ];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="office" className="scroll-mt-24 px-4 pb-8 pt-8 md:px-0 md:pb-14">
      <div className="relative mx-auto w-full overflow-hidden bg-stone-950 shadow-[0_30px_100px_rgba(44,30,17,0.18)]">
        <div className="relative aspect-[4/5] sm:aspect-[16/12] md:aspect-[21/8]">
          <div className="absolute inset-0 overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(${(index - activeSlide) * 100}%)` }}
              >
                <Image
                  src={slide.imageUrl}
                  alt={slide.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
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
                      {eyebrow} · {siteSettings.officeAddress}
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
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeSlide ? "bg-white" : "bg-white/45"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
