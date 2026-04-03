import type { ReactNode } from "react";
import Image from "next/image";
import { siteSettings } from "@/content/site";
import { SiteHeader } from "@/components/site/site-header";

type PublicShellProps = {
  children: ReactNode;
};

export function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="min-h-screen flex flex-col text-zinc-950 font-sans selection:bg-zinc-900 selection:text-white">
      <SiteHeader />

      <main className="flex-1">{children}</main>

      <footer className="bg-[#D8D6D6] py-10 md:py-10">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-8 px-6 md:flex-row md:items-start md:px-12">
          <div className="flex flex-col items-start">
            <Image
              src="/assets/edisii-footer.png"
              alt={`${siteSettings.companyName} logo`}
              width={154}
              height={40}
              className="h-auto w-[148px] md:w-[154px]"
            />
            <p className="mt-1.5 text-[12px] uppercase tracking-[0.04em] text-zinc-800">
              {siteSettings.companyTagline}
            </p>
            <p className="mt-5 text-[12px] text-zinc-900">
              Copyright 2026 by EDISII. All right reserved.
            </p>
          </div>

          <div className="flex flex-col gap-1.5 text-[14px] leading-[1.25] text-zinc-900 md:pt-0.5">
            <div className="flex items-start gap-2">
              <span className="w-3 text-[14px] text-zinc-500">E.</span>
              <a href={`mailto:${siteSettings.contactEmail}`} className="hover:underline">
                {siteSettings.contactEmail}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-3 text-[14px] text-zinc-500">T.</span>
              <a href={`tel:${siteSettings.contactPhone}`} className="hover:underline">
                {siteSettings.contactPhone}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-3 text-[14px] text-zinc-500">I.</span>
              <a
                href={siteSettings.contactInstagramUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                {siteSettings.contactInstagram}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

