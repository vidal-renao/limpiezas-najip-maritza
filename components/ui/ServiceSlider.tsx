"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    src: "/images/Buero-768x512.jpg",
    alt: "Büroreinigung Basel – saubere Büros in Gundeldingen und Grossbasel",
    title: "Büroreinigung Basel",
    desc: "Professionelle Reinigung für Büros, Arztpraxen und Gewerberäume – in Gundeldingen, Grossbasel und im ganzen Stadtkanton.",
    badge: "Gewerbe",
    href: "/bueroreinigung",
    cta: "Zur Büroreinigung",
  },
  {
    src: "/images/Boden-wischen-768x512.jpg",
    alt: "Haushaltsreinigung Basel – Bodenreinigung in St. Alban und Kleinbasel",
    title: "Haushaltsreinigung",
    desc: "Gründliche Wohnungsreinigung nach Ihrem Terminplan – in St. Alban, Kleinbasel, Gundeldingen und Riehen.",
    badge: "Privat",
    href: "/haushaltsreinigung",
    cta: "Zur Haushaltsreinigung",
  },
  {
    src: "/images/Fenster-blauer-Himmel-768x512.jpg",
    alt: "Glasreinigung Basel – streifenfreie Fenster für Privat und Gewerbe",
    title: "Glasreinigung Basel",
    desc: "Streifenfreie Fenster und Glasfronten – für Privathaushalte und Unternehmen in Riehen, Allschwil und Basel-Stadt.",
    badge: "Privat & Gewerbe",
    href: "/glasreinigung",
    cta: "Zur Glasreinigung",
  },
  {
    src: "/images/Herd-768x512.jpg",
    alt: "Umzugsreinigung Basel – Küchen- und Endreinigung mit Abgabegarantie",
    title: "Umzugsreinigung",
    desc: "Kalkfreier Herd, entfetteter Backofen, blitzsaubere Küche – mit Abgabegarantie für Ihre Wohnungsübergabe in Basel.",
    badge: "Mit Abgabegarantie",
    href: "/umzugsreinigung",
    cta: "Zur Umzugsreinigung",
  },
  {
    src: "/images/Treppe-Vorraum-768x511.jpg",
    alt: "Treppenhausreinigung Basel – Gemeinschaftsflächen in allen Quartieren",
    title: "Treppenhausreinigung",
    desc: "Gepflegte Eingangsbereiche und Treppenhäuser in allen Basler Quartieren – zuverlässig, regelmässig und diskret.",
    badge: "Verwaltungen",
    href: "/treppenhausreinigung",
    cta: "Zur Treppenhausreinigung",
  },
  {
    src: "/images/Gewerberaum-768x512.jpg",
    alt: "Gewerbereinigung Basel – Praxen, Fitnessstudios und Ladengeschäfte",
    title: "Gewerbereinigung",
    desc: "Massgeschneiderte Reinigung für Praxen, Fitnessstudios und Ladengeschäfte in Basel und Umgebung.",
    badge: "Gewerbe",
    href: "/bueroreinigung",
    cta: "Mehr erfahren",
  },
];

export default function ServiceSlider() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = SLIDES.length;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + total) % total);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning, total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (isHovered) return;
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, next]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl shadow-2xl"
      style={{ aspectRatio: "16/9" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={idx !== current}
        >
          {/* Background image */}
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority={idx === 0}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/50 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 lg:p-12">
            <div className="max-w-2xl">
              <span className="inline-block mb-3 rounded-full bg-brand/90 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wider">
                {slide.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                {slide.title}
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-5 max-w-xl">
                {slide.desc}
              </p>
              <Link
                href={slide.href}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-dark transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
              >
                {slide.cta}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Vorherige Leistung"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="Nächste Leistung"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 right-6 z-20 flex gap-1.5">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`rounded-full transition-all duration-300 ${
              idx === current
                ? "w-6 h-2 bg-brand"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!isHovered && (
        <div className="absolute top-0 left-0 right-0 z-20 h-0.5 bg-white/20">
          <div
            key={current}
            className="h-full bg-brand"
            style={{
              animation: "progress 5s linear forwards",
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  );
}
