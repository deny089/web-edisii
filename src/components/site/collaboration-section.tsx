"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

type CollaborationSectionProps = {
  eyebrow: string;
  title: string;
  youtubeUrl: string;
  description: string;
  secondaryDescription: string;
  images: Array<{ url: string; alt: string }>;
};

export function CollaborationSection({
  title,
  youtubeUrl,
  description,
  secondaryDescription,
  images,
}: CollaborationSectionProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const supportingParagraphs = secondaryDescription
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const youtubeVideoId = useMemo(() => {
    try {
      const url = new URL(youtubeUrl);

      if (url.hostname.includes("youtu.be")) {
        return url.pathname.replace("/", "");
      }

      if (url.hostname.includes("youtube.com")) {
        return url.searchParams.get("v") ?? "";
      }
    } catch {
      return "";
    }

    return "";
  }, [youtubeUrl]);

  useEffect(() => {
    if (!isVideoOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVideoOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoOpen]);

  return (
    <>
    <section
      id="collaboration"
      className="scroll-mt-24 bg-[#e7e5e2] py-16 md:py-24"
    >
      <div className="grid grid-cols-1 items-center gap-7 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.42fr)] md:gap-0">
          <div className="relative z-10 md:mr-[-20px] lg:mr-[-28px]">
            <div className="bg-transparent px-6 py-12 md:bg-[#f7f7f6] md:px-12 md:py-20 lg:px-14">
              <div className="ml-auto flex max-w-[360px] flex-col items-end text-right lg:max-w-[380px]">
                <h2 className="text-[30px] font-semibold leading-none text-black md:text-[32px]">
                  {title}
                </h2>
                <div className="mt-10 flex flex-col items-end gap-6 text-[15px] leading-[1.5] text-black md:mt-12 md:gap-7 md:text-[16px] md:leading-[1.45]">
                  <p>{description}</p>
                  {supportingParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-20 px-4 sm:px-6 md:px-0">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_300px] lg:grid-cols-[minmax(0,1fr)_320px] md:items-stretch">
              {images.map((image, index) => (
                <div
                  key={image.url}
                  className={cn(
                    "relative h-[250px] overflow-hidden bg-stone-200 sm:h-[320px] md:h-[385px]",
                    index === 0 ? "md:min-w-0" : "md:min-w-[300px] lg:min-w-[320px]"
                  )}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes={index === 0 ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 768px) 22vw, 100vw"}
                    className={cn(
                      "grayscale",
                      index === 0 ? "object-cover object-top" : "object-cover object-center"
                    )}
                  />
                  {index === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        type="button"
                        aria-label="Play EDISII collaboration video"
                        onClick={() => setIsVideoOpen(true)}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 shadow-lg transition-transform duration-200 hover:scale-[1.03] md:h-14 md:w-14"
                      >
                        <div className="ml-1 h-0 w-0 border-y-[9px] border-y-transparent border-l-[14px] border-l-black" />
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
    {youtubeVideoId ? (
      <Modal
        visible={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        overlayClassName="bg-black/70 backdrop-blur-sm"
        containerClassName="items-center"
        contentClassName="w-full max-w-[760px]"
      >
        <div className="overflow-hidden rounded-none bg-black shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-end border-b border-white/10 px-3 py-2">
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setIsVideoOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center text-white/80 transition-colors hover:text-white"
            >
              <span className="relative block h-4 w-4">
                <span className="absolute left-0 top-[7px] h-[1.5px] w-4 rotate-45 bg-current" />
                <span className="absolute left-0 top-[7px] h-[1.5px] w-4 -rotate-45 bg-current" />
              </span>
            </button>
          </div>
          <div className="relative aspect-video w-full bg-black">
            {isVideoOpen ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title="EDISII collaboration video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : null}
          </div>
        </div>
      </Modal>
    ) : null}
    </>
  );
}
