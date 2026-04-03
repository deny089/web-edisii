import Image from "next/image";

type CertificateSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  secondaryDescription: string;
  images: Array<{ url: string; alt: string }>;
};

export function CertificateSection({
  title,
  description,
  secondaryDescription,
  images,
}: CertificateSectionProps) {
  return (
    <section id="certificate" className="scroll-mt-24 bg-white py-20 md:py-32">
      <div className="mx-auto grid max-w-[1460px] grid-cols-1 items-start gap-12 px-6 md:grid-cols-[360px_minmax(0,760px)] md:justify-center md:gap-20 md:px-10">
        <div className="max-w-[360px] space-y-6 md:max-w-[320px] md:space-y-8 md:pt-16">
          <h2 className="text-[30px] font-semibold leading-none tracking-[-0.01em] text-stone-950 md:text-[32px]">
            {title}
          </h2>
          <div className="space-y-6 text-[15px] leading-[1.5] text-stone-800 md:space-y-8 md:text-[16px] md:leading-[1.45]">
            <p>{description}</p>
            <p>{secondaryDescription}</p>
          </div>
        </div>
        <div className="relative min-h-[290px] sm:min-h-[380px] md:min-h-[520px]">
          <div className="relative ml-[2%] h-[250px] w-[56%] overflow-hidden bg-stone-200 sm:h-[340px] md:ml-[4%] md:h-[500px] md:w-[40%]">
            <Image
              src={images[0].url}
              alt={images[0].alt}
              fill
              sizes="(min-width: 768px) 24vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute left-[40%] top-[-18px] h-[250px] w-[56%] bg-white px-[8px] pt-[8px] sm:left-[42%] sm:top-[-24px] sm:h-[340px] sm:px-[10px] sm:pt-[10px] md:left-[41%] md:top-[-46px] md:h-[500px] md:w-[40%] md:px-[12px] md:pt-[12px]">
            <div className="relative h-full w-full overflow-hidden bg-stone-200">
              <Image
                src={images[1].url}
                alt={images[1].alt}
                fill
                sizes="(min-width: 768px) 24vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
