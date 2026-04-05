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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const syncHash = () => {
      setHash(window.location.hash || "#about");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, hash]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-background/85 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 md:h-24 md:px-12 md:py-0">
        <div className="flex items-center justify-between gap-4 md:h-full md:justify-start">
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
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center border border-black/10 bg-white/70 text-zinc-900 md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-5 bg-current transition-all duration-300",
                  isMenuOpen && "top-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] h-px w-5 bg-current transition-opacity duration-300",
                  isMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[14px] h-px w-5 bg-current transition-all duration-300",
                  isMenuOpen && "top-[7px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>

        <nav className="hidden h-full items-center gap-8 md:flex md:justify-end">
          {navItems.map((item) => {
            const isActive = pathname === "/" && hash === item.hash;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setHash(item.hash)}
                className={cn(
                  "shrink-0 whitespace-nowrap text-[16px] uppercase transition-colors hover:text-zinc-500",
                  isActive ? "font-bold text-zinc-950" : "font-normal text-zinc-700"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-300 md:hidden",
            isMenuOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <nav className="min-h-0 border-t border-black/10 pt-4">
            <div className="flex flex-col gap-3 pb-1">
              {navItems.map((item) => {
                const isActive = pathname === "/" && hash === item.hash;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setHash(item.hash);
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      "whitespace-nowrap text-[14px] uppercase transition-colors hover:text-zinc-500",
                      isActive ? "font-bold text-zinc-950" : "font-normal text-zinc-700"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
