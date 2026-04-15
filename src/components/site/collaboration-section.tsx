import Image from "next/image";
import { cn } from "@/lib/utils";

type CollaborationSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  secondaryDescription: string;
  images: Array<{ url: string; alt: string }>;
};

export function CollaborationSection({
  title,
  description,
  secondaryDescription,
  images,
}: CollaborationSectionProps) {
  const supportingParagraphs = secondaryDescription
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
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
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 shadow-lg md:h-14 md:w-14">
                        <div className="ml-1 h-0 w-0 border-y-[9px] border-y-transparent border-l-[14px] border-l-black" />
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}
