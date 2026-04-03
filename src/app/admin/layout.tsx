import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-4 py-4 md:h-16 md:flex-row md:items-center md:justify-between md:gap-0 md:px-8 md:py-0">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Admin Dashboard</p>
            <h1 className="mt-1 text-[22px] font-semibold leading-none">EDISII</h1>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
