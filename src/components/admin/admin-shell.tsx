"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";

type AdminShellProps = {
  title: string;
  description: string;
  activeMenu: string;
  children: ReactNode;
};

type MenuItem = {
  id: string;
  label: string;
  helper: string;
};

const menuItems: MenuItem[] = [
  {
    id: "artworks",
    label: "Artwork Management",
    helper: "Certificates",
  },
];

function MenuButton({
  item,
  isActive,
  onClick,
  mobile = false,
}: {
  item: MenuItem;
  isActive: boolean;
  onClick?: () => void;
  mobile?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full flex-col border text-left transition-colors",
        mobile ? "px-4 py-3" : "px-4 py-3",
        isActive
          ? mobile
            ? "border-slate-950 bg-slate-950 text-white"
            : "border-transparent bg-white text-slate-950"
          : mobile
            ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            : "border-transparent bg-transparent text-white/80 hover:bg-white/8 hover:text-white"
      )}
    >
      <span className={cn("font-medium leading-none", mobile ? "text-[14px]" : "text-[15px]")}>{item.label}</span>
      <span
        className={cn(
          "mt-2 text-[11px] uppercase tracking-[0.14em]",
          isActive ? (mobile ? "text-white/60" : "text-slate-500") : mobile ? "text-slate-500" : "text-white/45"
        )}
      >
        {item.helper}
      </span>
    </button>
  );
}

export function AdminShell({
  title,
  description,
  activeMenu,
  children,
}: AdminShellProps) {
  const router = useRouter();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLogoutOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isLogoutOpen]);

  return (
    <>
      <header id="admin-header" className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-4 py-4 md:px-8 md:py-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Admin Dashboard</p>
            <h1 className="mt-1 text-[22px] font-semibold leading-none text-slate-950">EDISII</h1>
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close admin menu" : "Open admin menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center border border-slate-200 bg-white text-slate-950 md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-5 bg-current transition-all duration-300",
                  isMobileMenuOpen && "top-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] h-px w-5 bg-current transition-opacity duration-300",
                  isMobileMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[14px] h-px w-5 bg-current transition-all duration-300",
                  isMobileMenuOpen && "top-[7px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>

        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-300 md:hidden",
            isMobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="min-h-0 border-t border-slate-200 bg-white">
            <div className="mx-auto w-full max-w-[1440px] px-4 py-4 md:px-8">
              <nav className="space-y-px">
                {menuItems.map((item) => (
                  <MenuButton
                    key={item.id}
                    item={item}
                    isActive={item.id === activeMenu}
                    mobile
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsLogoutOpen(true);
                  }}
                  className="mt-3 inline-flex min-h-11 w-full items-center justify-center border border-slate-300 bg-white px-4 py-3 text-[14px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] px-4 py-4 md:px-8 md:py-8">
        <div className="grid gap-6 md:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="hidden flex-col bg-[#111827] p-4 text-white shadow-[0_16px_40px_rgba(15,23,42,0.16)] md:flex md:min-h-[calc(100vh-8.5rem)] md:p-5">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <MenuButton key={item.id} item={item} isActive={item.id === activeMenu} />
              ))}
            </nav>

            <div className="pt-6 lg:mt-auto">
              <button
                type="button"
                onClick={() => setIsLogoutOpen(true)}
                className="inline-flex min-h-11 w-full items-center justify-center border border-white/10 bg-white/5 px-4 py-3 text-[14px] font-medium text-white transition-colors hover:bg-white/10"
              >
                Logout
              </button>
            </div>
          </aside>

          <section className="border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
            <div className="flex flex-col gap-4 border-b border-slate-200 px-4 py-5 md:px-8">
              <div>
                <h2 className="text-[28px] font-semibold leading-none text-slate-950">{title}</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">{description}</p>
              </div>
            </div>

            <div className="px-4 py-5 md:px-8 md:py-6">{children}</div>
          </section>
        </div>
      </main>

      {isLogoutOpen ? (
        <Modal
          onClose={() => setIsLogoutOpen(false)}
          overlayClassName="bg-slate-950/40"
          containerClassName="overflow-y-auto"
          contentClassName="w-full max-w-[380px] rounded-none border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.2)] sm:p-6"
        >
          <p className="text-[12px] uppercase tracking-[0.16em] text-slate-500">Confirmation</p>
          <h3 className="mt-3 text-[24px] font-semibold leading-none text-slate-950">Logout from admin?</h3>
          <p className="mt-4 text-[14px] leading-relaxed text-slate-600">
            This action currently only closes the confirmation flow. Authentication is not yet connected.
          </p>
          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
            <button
              type="button"
              onClick={() => setIsLogoutOpen(false)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-none bg-slate-900 px-5 py-3 text-[13px] font-medium text-white transition-colors hover:bg-slate-800 sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-none border border-rose-200 bg-rose-50 px-5 py-3 text-[13px] font-medium text-rose-600 transition-colors hover:bg-rose-100 sm:w-auto"
            >
              Confirm Logout
            </button>
          </div>
        </Modal>
      ) : null}
    </>
  );
}
