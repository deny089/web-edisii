import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionValue } from "@/lib/admin-auth";

export default async function EdsAdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!verifyAdminSessionValue(sessionValue)) {
    redirect("/eds-login");
  }

  return <div className="min-h-screen bg-[#f5f6f8] text-slate-900">{children}</div>;
}
