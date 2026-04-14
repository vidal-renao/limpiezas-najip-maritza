"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { X, Cookie } from "lucide-react";

const STORAGE_KEY = "dnamar-cookie-consent";

export default function CookieBanner() {
  const locale = useLocale();
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage unavailable (SSR or private mode)
    }
  }, []);

  const handleChoice = (value: "all" | "necessary") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("title")}
      className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:w-[min(640px,calc(100vw-3rem))] z-[110]"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-border p-5 sm:p-6 relative">

        {/* Close */}
        <button
          type="button"
          onClick={() => handleChoice("necessary")}
          aria-label={t("close")}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-foreground/30 hover:text-foreground/70 hover:bg-muted transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4 pr-6">
          {/* Icon */}
          <span className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5 text-brand" />
          </span>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-navy mb-1">{t("title")}</p>
            <p className="text-xs text-foreground/60 leading-relaxed mb-4">{t("desc")}</p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button
                type="button"
                onClick={() => handleChoice("necessary")}
                className="text-xs font-medium text-foreground/65 hover:text-navy border border-border hover:border-navy/30 rounded-full px-5 py-2 transition-all duration-200 whitespace-nowrap"
              >
                {t("decline")}
              </button>
              <button
                type="button"
                onClick={() => handleChoice("all")}
                className="text-xs font-semibold bg-brand hover:bg-brand-dark text-white rounded-full px-5 py-2 transition-all duration-200 whitespace-nowrap shadow-sm shadow-brand/25 hover:shadow-brand/35"
              >
                {t("accept")}
              </button>
              <Link
                href="/datenschutz"
                className="text-xs text-foreground/40 hover:text-brand transition-colors underline underline-offset-2 sm:ml-auto whitespace-nowrap"
              >
                {t("privacy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
