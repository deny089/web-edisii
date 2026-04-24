import Image from "next/image";
import { useMemo, useState } from "react";
import { Modal } from "@/components/ui/modal";
import type { EventModalTab } from "@/content/events";

type EventsModalProps = {
  tabs: EventModalTab[];
  isVisible: boolean;
  onClose: () => void;
};

export function EventsModal({ tabs, isVisible, onClose }: EventsModalProps) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? "");
  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTabId) ?? tabs[0],
    [activeTabId, tabs]
  );

  return (
    <Modal
      visible={isVisible}
      onClose={onClose}
      overlayClassName="z-[100] bg-white/90 p-0 md:px-6 md:py-4"
      containerClassName="items-stretch justify-center"
      contentClassName={`flex h-[100dvh] w-full max-w-[1180px] flex-col overflow-hidden bg-white shadow-[0_24px_80px_rgba(0,0,0,0.16)] transition-opacity duration-300 md:h-full md:max-h-[min(680px,calc(100dvh-48px))] lg:max-h-[min(880px,calc(100dvh-48px))] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="shrink-0">
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

        <div className="px-4 pb-4 md:px-8 md:pb-6">
          <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-3 text-[14px] uppercase tracking-[0.02em]">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab?.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={isActive ? "font-semibold text-black" : "text-black/30"}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab?.date || activeTab?.location ? (
            <div className="mt-4 flex flex-col gap-2 text-[14px] text-black">
              {activeTab?.date ? (
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
                    <path d="M7 3.5v4M17 3.5v4M3.5 9.5h17" />
                  </svg>
                  <span>{activeTab.date}</span>
                </div>
              ) : null}
              {activeTab?.location ? (
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M12 21s6-5.686 6-11a6 6 0 1 0-12 0c0 5.314 6 11 6 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <span>{activeTab.location}</span>
                </div>
              ) : null}
            </div>
          ) : null}

          {activeTab?.paragraphs?.length ? (
            <div className="mt-5 grid gap-6 text-[14px] leading-[1.45] text-black lg:grid-cols-2">
              {activeTab.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : activeTab?.emptyState ? (
            <div className="mt-5 max-w-[520px] text-[14px] leading-[1.55] text-black">
              <p className="font-semibold">{activeTab.emptyState.title}</p>
              <p className="mt-3 text-black/72">{activeTab.emptyState.description}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="min-h-0 flex-1 px-4 pb-6 md:flex-none md:px-8 md:pb-8">
        <div className="h-full overflow-y-auto pt-6 md:h-[360px]">
          {activeTab?.gallery?.length ? (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-4">
              {activeTab.gallery.map((src, index) => (
                <div key={src} className="mb-4 break-inside-avoid">
                  <div className="relative overflow-hidden bg-[#f5f5f2]">
                    <Image
                      src={src}
                      alt={`${activeTab.label} gallery ${index + 1}`}
                      width={320}
                      height={index === 1 ? 440 : 320}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center bg-[#f7f6f3] px-6 text-center text-[14px] leading-[1.55] text-black/72">
              <div className="max-w-[420px]">
                <p className="font-semibold text-black">
                  We are preparing something special for you.
                </p>
                <p className="mt-3">
                  Please do not worry, we are carefully putting this story together and will share it as soon as it is ready.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
