"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/eds-auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const payload = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setErrorMessage(payload?.message ?? "Unable to sign in.");
        return;
      }

      router.push("/eds-admin");
      router.refresh();
    } catch {
      setErrorMessage("Unable to sign in right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2.5">
        <label htmlFor="username" className="text-[12px] uppercase tracking-[0.24em] text-slate-500">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter your username"
          className="min-h-[46px] w-full border border-slate-300 bg-transparent px-4 text-[15px] text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-900"
        />
      </div>

      <div className="space-y-2.5">
        <label htmlFor="password" className="text-[12px] uppercase tracking-[0.24em] text-slate-500">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          className="min-h-[46px] w-full border border-slate-300 bg-transparent px-4 text-[15px] text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-900"
        />
      </div>

      {errorMessage ? (
        <p className="text-[13px] leading-relaxed text-rose-600">{errorMessage}</p>
      ) : null}

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-[46px] items-center justify-center bg-slate-900 px-7 text-[14px] font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </div>
    </form>
  );
}
