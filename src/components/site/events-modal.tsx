import Image from "next/image";
import { Modal } from "@/components/ui/modal";

type EventsModalProps = {
  eventGallery: string[];
  isVisible: boolean;
  onClose: () => void;
};

export function EventsModal({ eventGallery, isVisible, onClose }: EventsModalProps) {
  return (
    <Modal
      visible={isVisible}
      onClose={onClose}
      overlayClassName="z-[100] bg-black/20 px-2 py-2 md:px-6 md:py-4"
      containerClassName="items-stretch justify-center"
      contentClassName={`h-full w-full max-w-[1180px] overflow-y-auto bg-white shadow-[0_24px_80px_rgba(0,0,0,0.16)] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
        <div className="flex items-start justify-between px-4 pb-4 pt-4 md:px-8 md:pt-6">
          <h2 className="text-[24px] leading-none text-black md:text-[32px]">EVENT</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close event modal"
            className="text-[34px] leading-none text-zinc-700 transition-colors hover:text-black"
          >
            &times;
          </button>
        </div>

        <div className="px-4 pb-6 md:px-8 md:pb-8">
          <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-3 text-[14px] uppercase tracking-[0.02em]">
            <button type="button" className="font-semibold text-black">
              ART JAKARTA PAPERS 2026
            </button>
            <button type="button" className="text-black/30">
              ART JAKARTA 2025
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-2 text-[14px] text-black">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
                <path d="M7 3.5v4M17 3.5v4M3.5 9.5h17" />
              </svg>
              <span>5-8 Februari 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M12 21s6-5.686 6-11a6 6 0 1 0-12 0c0 5.314 6 11 6 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span>City Hall, PIM 3</span>
            </div>
          </div>

          <div className="mt-5 grid gap-6 text-[14px] leading-[1.45] text-black md:grid-cols-2">
            <p>
              Art Jakarta Papers is a new, specialized art fair that is part of the Art Jakarta
              ecosystem. This edition brings together 28 galleries from across Asia, featuring
              diverse presentations that focus on the medium of paper.
            </p>
            <p>
              For Art Jakarta Papers, EDISII brought together a selection of fine art prints by
              Indonesian contemporary artists, ranging from emerging to established figures. Each
              print in the presentation was created through a careful and collaborative process
              between EDISII and the artist.
            </p>
          </div>

          <div className="mt-6 columns-1 gap-4 sm:columns-2 md:columns-4">
            {eventGallery.map((src, index) => (
              <div key={src} className="mb-4 break-inside-avoid">
                <div className="relative overflow-hidden bg-[#f5f5f2]">
                  <Image
                    src={src}
                    alt={`Art Jakarta Papers gallery ${index + 1}`}
                    width={320}
                    height={index === 1 ? 440 : 320}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
    </Modal>
  );
}
