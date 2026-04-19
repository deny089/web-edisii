import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionValue } from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (verifyAdminSessionValue(sessionValue)) {
    redirect("/eds-admin");
  }

  return (
    <main className="min-h-screen bg-[#f5f6f8] px-6 py-10 text-slate-900 md:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[1440px] items-center justify-center">
        <section className="w-full max-w-[560px] border border-slate-200 bg-white px-7 py-8 shadow-[0_14px_36px_rgba(15,23,42,0.05)] md:px-8 md:py-9">
          <p className="text-[12px] uppercase tracking-[0.28em] text-slate-500">EDISII Dashboard</p>
          <h1 className="mt-4 text-[32px] font-semibold leading-none text-slate-950 md:text-[38px]">
            Welcome back
          </h1>

          <LoginForm />
        </section>
      </div>
    </main>
  );
}
