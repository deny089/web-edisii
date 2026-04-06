import Image from "next/image";
import Link from "next/link";
import { siteEditorialButtonClassName } from "@/components/site/site-link-button";

export default function CertArtPage() {
  return (
    <main className="h-[100dvh] overflow-x-hidden overflow-y-auto bg-[#f7f6f3] text-zinc-900">
      <div className="mx-auto flex min-h-[100svh] w-full max-w-[420px] flex-col bg-white">
        <section className="relative h-[33dvh] min-h-[220px] max-h-[262px] overflow-hidden border border-black/5">
          <Image
            src="/assets/nfc-bg.png"
            alt="EDISII certificate background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center grayscale"
          />
          <div className="absolute inset-0 bg-black/34" />
          <div className="absolute inset-0 flex items-center justify-center px-10">
            <Image
              src="/assets/edisii-footer.svg"
              alt="EDISII Art Print Publisher"
              width={218}
              height={70}
              priority
              className="h-auto w-[174px]"
            />
          </div>
        </section>

        <section className="flex flex-1 flex-col justify-between px-6 pb-5 pt-7">
          <div className="mx-auto w-full max-w-[242px] bg-[#e6e3df] px-4 py-3 text-center">
            <p className="whitespace-nowrap text-center text-[14px] font-semibold uppercase tracking-[0.08em] text-zinc-900">
              Wednesday - Knifmare #1/7
            </p>
          </div>

          <div className="flex flex-1 flex-col pt-7">
            <div className="mx-auto max-w-[214px] text-center">
              <p className="text-[12px] leading-[1.46] text-zinc-500">
                This code serves as a verification mark confirming that the art is a genuine and
                authentic piece, officially created by an artist affiliated with EDISII.
              </p>
            </div>

            <div className="mt-auto pt-10">
              <div className="mx-auto flex justify-center">
                <Link
                  href="/"
                  className={siteEditorialButtonClassName}
                >
                  Visit Our Website
                </Link>
              </div>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center text-[12px] text-zinc-900">
                <a href="mailto:info@edisii.com" className="truncate">
                  info@edisii.com
                </a>
                <a href="tel:+6283832288860" className="truncate">
                  +62 833 322 8860
                </a>
                <a
                  href="https://instagram.com/the_edisii"
                  target="_blank"
                  rel="noreferrer"
                  className="truncate"
                >
                  @the_edisii
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
