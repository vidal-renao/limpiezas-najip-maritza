"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface Props {
  message: string;
  linkLabel: string;
  linkHref: string;
}

export default function AnnouncementBar({ message, linkLabel, linkHref }: Props) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-brand text-white text-sm py-2 px-4 flex items-center justify-center gap-3 relative">
      <Sparkles className="w-3.5 h-3.5 shrink-0 opacity-80" />
      <p className="text-center">
        {message}{" "}
        <Link
          href={linkHref}
          className="underline underline-offset-2 font-semibold hover:opacity-80 transition-opacity"
        >
          {linkLabel}
        </Link>
      </p>
      <button
        onClick={() => setVisible(false)}
        aria-label="Schließen"
        className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
