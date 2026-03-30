"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollY > 400);
      setProgress(docH > 0 ? Math.round((scrollY / docH) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  /* SVG circle progress */
  const r = 20;
  const circ = 2 * Math.PI * r;
  const dash = circ - (progress / 100) * circ;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-24 right-6 z-40
        w-14 h-14 rounded-full
        bg-white border border-border shadow-lg shadow-navy/10
        flex items-center justify-center
        transition-all duration-300 ease-out
        hover:scale-110 hover:shadow-xl hover:border-brand/40 active:scale-95
        ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        {/* Track */}
        <circle cx="24" cy="24" r={r} fill="none" stroke="#e5e7eb" strokeWidth="2.5" />
        {/* Progress */}
        <circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          stroke="#4caf82"
          strokeWidth="2.5"
          strokeDasharray={circ}
          strokeDashoffset={dash}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.2s ease" }}
        />
      </svg>
      <ArrowUp className="w-5 h-5 text-navy relative z-10" />
    </button>
  );
}
