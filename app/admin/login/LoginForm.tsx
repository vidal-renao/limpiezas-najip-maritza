"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin/reviews";

  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(from);
    } else {
      setStatus("error");
      setPassword("");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Image
              src="/images/N.webp"
              alt="D'Namar Logo"
              width={48}
              height={48}
              className="rounded-xl object-cover"
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
            <span className="font-bold text-xl text-[#1a2e4a]">D&apos;Namar</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1a2e4a]">Admin-Bereich</h1>
          <p className="text-slate-500 text-sm mt-1">Rezensionen verwalten</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#4caf82]/10 mx-auto mb-6">
            <Lock className="w-6 h-6 text-[#4caf82]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1a2e4a] mb-1.5">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setStatus("idle"); }}
                placeholder="Admin-Passwort eingeben"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#4caf82] focus:border-[#4caf82] transition-colors"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                Falsches Passwort. Bitte erneut versuchen.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading" || !password}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-[#1a2e4a] text-white font-semibold py-3 text-sm hover:bg-[#1a2e4a]/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Prüfe…</>
              ) : (
                <><ShieldCheck className="w-4 h-4" /> Anmelden</>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Nur für autorisierte Mitarbeiter von D&apos;Namar Basel.
        </p>
      </div>
    </div>
  );
}
