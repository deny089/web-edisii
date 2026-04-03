import Image from "next/image";
import Link from "next/link";

export default function CertArtPage() {
  return (
    <main className="min-h-screen bg-[#fdfdfc] text-zinc-900">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col bg-white">
        <section className="relative h-[226px] overflow-hidden border border-black/5">
          <Image
            src="/assets/nfc-bg.png"
            alt="EDISII certificate background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center grayscale"
          />
          <div className="absolute inset-0 bg-black/36" />
          <div className="absolute inset-0 flex items-center justify-center px-10 pt-0">
            <Image
              src="/assets/edisii-footer.png"
              alt="EDISII Art Print Publisher"
              width={218}
              height={70}
              priority
              className="h-auto w-[168px]"
            />
          </div>
        </section>

        <section className="flex flex-1 flex-col px-6 pb-6 pt-6">
          <div className="mx-auto w-full max-w-[246px] bg-[#e6e3df] px-4 py-3.5 text-center">
            <p className="whitespace-nowrap text-center text-[14px] font-semibold uppercase tracking-[0.08em] text-zinc-900">
              Wednesday - Knifmare #1/7
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-[220px] text-center">
            <p className="text-[12px] leading-[1.42] text-zinc-500">
              This code serves as a verification mark confirming that the art is a genuine and
              authentic piece, officially created by an artist affiliated with EDISII.
            </p>
          </div>

          <div className="min-h-[228px] flex-1" />

          <div className="mx-auto w-full max-w-[178px]">
            <Link
              href="/"
              className="inline-flex min-h-10 w-full items-center justify-center whitespace-nowrap bg-[#d9d9d7] px-5 py-2.5 text-center text-[14px] font-semibold uppercase tracking-[0.12em] text-zinc-900 transition-colors hover:bg-[#cececc]"
            >
              Visit Our Website
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 items-center gap-2 text-center text-[12px] text-zinc-900">
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
        </section>
      </div>
    </main>
  );
}
