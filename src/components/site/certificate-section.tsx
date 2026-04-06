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
}: CertificateSectionProps) {
  return (
    <section id="certificate" className="scroll-mt-24 bg-white py-8 md:py-10">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center justify-center gap-12 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-24 md:px-10">
        <div className="max-w-[520px] justify-self-center space-y-6 text-left md:max-w-[480px] md:space-y-8">
          <h2 className="text-[30px] font-semibold leading-none tracking-[-0.01em] text-stone-950 md:text-[32px]">
            {title}
          </h2>
          <div className="space-y-6 text-[15px] leading-[1.5] text-stone-800 md:space-y-8 md:text-[16px] md:leading-[1.45]">
            <p>{description}</p>
            <p>{secondaryDescription}</p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[520px]">
          <div className="relative aspect-[10/11] w-full overflow-hidden">
            <Image
              src="/assets/certificate-img.png"
              alt="Certificate artwork presentation"
              fill
              sizes="(min-width: 768px) 34vw, 100vw"
              className="object-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
