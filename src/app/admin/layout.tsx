import Link from "next/link";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f6f1e9,#fbfaf7)] text-stone-950">
      <header className="border-b border-black/10 bg-white/80 backdrop-blur">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Admin Dashboard</p>
            <h1 className="text-2xl font-serif tracking-[0.18em] uppercase">EDISII</h1>
          </div>
          <Link href="/" className="text-sm font-medium underline underline-offset-4">
            View public site
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
