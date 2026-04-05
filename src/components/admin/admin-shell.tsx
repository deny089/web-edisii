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

const menuItems = [
  {
    id: "artworks",
    label: "Artwork Management",
    helper: "Certificates",
  },
];

export function AdminShell({
  title,
  description,
  activeMenu,
  children,
}: AdminShellProps) {
  const router = useRouter();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

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
      <main className="mx-auto w-full max-w-[1440px] px-4 py-4 md:px-8 md:py-8">
        <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="flex flex-col rounded-none bg-[#111827] p-4 text-white shadow-[0_16px_40px_rgba(15,23,42,0.16)] md:p-5 lg:min-h-[calc(100vh-7rem)]">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = item.id === activeMenu;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={cn(
                      "flex w-full flex-col rounded-none px-4 py-3 text-left transition-colors",
                      isActive
                        ? "bg-white text-slate-950"
                        : "bg-transparent text-white/80 hover:bg-white/8 hover:text-white"
                    )}
                  >
                    <span className="text-[15px] font-medium leading-none">{item.label}</span>
                    <span
                      className={cn(
                        "mt-2 text-[11px] uppercase tracking-[0.14em]",
                        isActive ? "text-slate-500" : "text-white/45"
                      )}
                    >
                      {item.helper}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-6 lg:mt-auto">
              <button
                type="button"
                onClick={() => setIsLogoutOpen(true)}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-none border border-white/10 bg-white/5 px-4 py-3 text-[14px] font-medium text-white transition-colors hover:bg-white/10"
              >
                Logout
              </button>
            </div>
          </aside>

          <section className="rounded-none border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
            <div className="flex flex-col gap-4 border-b border-slate-200 px-4 py-5 md:px-8">
              <div>
                <h2 className="text-[28px] font-semibold leading-none text-slate-950">{title}</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                  {description}
                </p>
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
            <h3 className="mt-3 text-[24px] font-semibold leading-none text-slate-950">
              Logout from admin?
            </h3>
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
