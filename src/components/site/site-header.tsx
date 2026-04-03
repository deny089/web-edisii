"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "/#about", hash: "#about" },
  { label: "Collaboration", href: "/#collaboration", hash: "#collaboration" },
  { label: "Event", href: "/#event", hash: "#event" },
  { label: "Certificate", href: "/#certificate", hash: "#certificate" },
  { label: "Our Office", href: "/#office", hash: "#office" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => {
      setHash(window.location.hash || "#about");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-background/85 backdrop-blur-md">
      <div className="container mx-auto flex flex-col gap-4 px-6 py-4 md:h-24 md:flex-row md:items-center md:justify-between md:gap-0 md:px-12 md:py-0">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/edisii-logo.png"
            alt="Edisii logo"
            width={180}
            height={64}
            priority
            className="h-auto w-[132px] md:w-[172px]"
          />
        </Link>
        <nav className="flex w-full items-center gap-5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:w-auto md:gap-8 md:overflow-visible md:pb-0">
          {navItems.map((item) => {
            const isActive = pathname === "/" && hash === item.hash;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setHash(item.hash)}
                className={cn(
                  "shrink-0 whitespace-nowrap text-[14px] uppercase transition-colors hover:text-zinc-500 md:text-[16px]",
                  isActive ? "font-bold text-zinc-950" : "font-normal text-zinc-700"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
