"use client";

/**
 * GallerySlider — premium auto-play image slider for "Unsere Arbeit".
 * No external dependencies. Infinite loop, touch/swipe, thumbnail strip,
 * animated progress bar, pause-on-hover.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const INTERVAL_MS = 4500;

interface Slide {
  src: string;
  alt: string;
  label: string;
}

interface Props {
  items: Slide[];
  title: string;
  subtitle: string;
}

export default function GallerySlider({ items, title, subtitle }: Props) {
  const total = items.length;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0); // forces progress bar re-mount
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchX = useRef(0);

  const go = useCallback(
    (delta: number) => {
      setIdx((i) => (i + delta + total) % total);
      setProgressKey((k) => k + 1);
    },
    [total],
  );

  const goTo = useCallback((n: number) => {
    setIdx(n);
    setProgressKey((k) => k + 1);
  }, []);

  /* ── auto-play ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => go(1), INTERVAL_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, go]);

  /* ── keyboard navigation ───────────────────────────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  return (
    <section className="bg-muted py-16 lg:py-20" aria-label="Unsere Arbeit – Bildergalerie">
      <div className="section-container">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">{title}</h2>
          <p className="text-foreground/60 max-w-xl mx-auto text-sm">{subtitle}</p>
        </div>

        {/* ── Main slider ────────────────────────────────────────────────── */}
        <div
          className="relative rounded-2xl overflow-hidden select-none cursor-grab active:cursor-grabbing shadow-xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const d = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(d) > 48) go(d < 0 ? 1 : -1);
          }}
          role="region"
          aria-roledescription="carousel"
        >
          {/* Progress bar */}
          {!paused && (
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/20 z-20">
              <div
                key={progressKey}
                className="gallery-progress h-full bg-brand"
                style={{ "--gallery-duration": `${INTERVAL_MS}ms` } as React.CSSProperties}
              />
            </div>
          )}

          {/* Slides track */}
          <div
            className="flex transition-transform duration-700 ease-in-out will-change-transform"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {items.map((item, i) => (
              <div
                key={item.src}
                className="relative shrink-0 w-full aspect-[16/9] sm:aspect-[21/9]"
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${total}: ${item.label}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={i === 0}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/10 to-transparent" />

                {/* Caption */}
                <div className="absolute bottom-8 left-6 right-16">
                  <span className="inline-block bg-brand text-white text-xs font-bold px-3 py-1 rounded-full mb-2 shadow-md">
                    {item.label}
                  </span>
                  <p className="text-white/85 text-sm leading-snug">{item.alt}</p>
                </div>

                {/* Slide counter */}
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  {i + 1} / {total}
                </div>
              </div>
            ))}
          </div>

          {/* Prev arrow */}
          <button
            onClick={() => go(-1)}
            aria-label="Vorheriges Bild"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next arrow */}
          <button
            onClick={() => go(1)}
            aria-label="Nächstes Bild"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5" role="tablist">
            {items.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === idx}
                onClick={() => goTo(i)}
                aria-label={`Bild ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === idx
                    ? "w-6 bg-brand"
                    : "w-1.5 bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Thumbnail strip ─────────────────────────────────────────────── */}
        <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {items.map((item, i) => (
            <button
              key={item.src}
              onClick={() => goTo(i)}
              className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-300 ${
                i === idx
                  ? "ring-2 ring-brand ring-offset-2 opacity-100 scale-105 shadow-md"
                  : "opacity-45 hover:opacity-70 hover:scale-105"
              }`}
              aria-label={item.label}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
