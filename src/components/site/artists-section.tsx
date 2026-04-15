import Image from "next/image";
import Link from "next/link";
import { siteEditorialButtonClassName } from "@/components/site/site-link-button";

type ArtistsSectionProps = {
  id: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  imageAlt: string;
  columns: string[][];
};

export function ArtistsSection({
  id,
  title,
  ctaLabel,
  ctaHref,
  imageUrl,
  imageAlt,
  columns,
}: ArtistsSectionProps) {
  return (
    <section id={id} className="scroll-mt-24 bg-white">
      <div className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="100vw"
            className="object-cover object-center grayscale"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative z-10 px-6 py-16 md:px-14 md:pb-[104px] md:pt-[248px]">
          <div className="mx-auto flex max-w-[960px] flex-col gap-8 md:flex-row md:items-start md:justify-center md:gap-24">
            <div className="flex flex-col items-start md:w-[220px] md:shrink-0 md:items-end md:pt-1 md:text-right">
              <h2 className="text-left text-[28px] font-semibold leading-none md:text-[34px]">{title}</h2>
              <Link
                href={ctaHref}
                className={`mt-6 inline-flex md:mt-7 ${siteEditorialButtonClassName}`}
                download
              >
                {ctaLabel}
              </Link>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-4 text-[14px] leading-[1.35] md:max-w-[600px] md:grid-cols-3 md:gap-x-10 md:gap-y-5 md:text-[16px]">
              {columns.map((column, columnIndex) => (
                <div key={columnIndex} className="space-y-1">
                  {column.map((artist) => (
                    <p key={artist}>{artist}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
