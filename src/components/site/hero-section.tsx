import Image from "next/image";

type HeroSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  secondaryDescription: string;
  imageUrl: string;
  imageAlt: string;
};

export function HeroSection({
  title,
  description,
  secondaryDescription,
  imageAlt,
}: HeroSectionProps) {
  return (
    <section
      id="about"
      className="relative flex h-[520px] w-full scroll-mt-24 items-end overflow-hidden bg-black text-white sm:h-[580px] md:h-[620px] lg:h-[620px]"
    >
      <div className="absolute inset-0 z-0 select-none">
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/assets/about-bg.jpg"
            alt={imageAlt}
            fill
            sizes="(max-width: 767px) 100vw, 0px"
            className="object-cover object-center grayscale"
            priority
          />
        </div>
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/assets/about-bg.jpg"
            alt={imageAlt}
            fill
            sizes="(max-width: 767px) 0px, 100vw"
            className="object-cover object-center grayscale"
            priority
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/about-bg.jpg"
            className="absolute inset-0 h-full w-full object-cover object-center grayscale"
          >
            <source src="/assets/bg-video-about.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.32),rgba(0,0,0,0.54))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(0,0,0,0.30),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.76))]" />
      </div>

      <div className="container relative z-10 mx-auto w-full px-6 pb-8 md:px-12 md:pb-12 lg:px-16">
        <div className="grid max-w-[1240px] grid-cols-1 gap-6 md:max-w-[620px] md:gap-7 lg:max-w-[1240px] lg:grid-cols-[320px_430px] lg:items-start lg:justify-start lg:gap-24">
          <div className="flex max-w-[340px] flex-col gap-5 md:max-w-[420px]">
            <h1 className="text-[16px] leading-[1.5] text-white">
              {title}
            </h1>
            <p className="text-[16px] leading-[1.65] text-white/96">
              {description}
            </p>
          </div>
          <div className="max-w-[430px] md:max-w-[560px]">
            <p className="text-[15px] leading-[1.65] text-white/96 md:text-[16px] md:leading-[1.75]">
              {secondaryDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
