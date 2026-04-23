"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

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
  const [prev, setPrev] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = SLIDES.length;

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setPrev(current);
      setCurrent((index + total) % total);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 700);
    },
    [animating, current, total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prevSlide = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (isHovered) return;
    intervalRef.current = setInterval(next, 5500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, next]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl shadow-2xl bg-navy"
      style={{ aspectRatio: "16/9" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      {SLIDES.map((slide, idx) => {
        const isActive = idx === current;
        const isPrev = idx === prev;
        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100 z-10" : isPrev ? "opacity-0 z-5" : "opacity-0 z-0"
            }`}
            aria-hidden={!isActive}
          >
            {/* Background image with Ken Burns zoom */}
            <div className={`absolute inset-0 transition-transform duration-[8000ms] ease-out ${isActive ? "scale-110" : "scale-100"}`}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority={idx === 0}
              />
            </div>

            {/* Multi-layer gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-transparent to-transparent" />

            {/* Content with slide-up animation */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-8 sm:p-10 lg:p-12 transition-all duration-700 ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <div className="max-w-2xl">
                <span className="inline-block mb-3 rounded-full bg-brand px-3.5 py-1 text-xs font-bold text-white uppercase tracking-widest shadow-lg">
                  {slide.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                  {slide.title}
                </h3>
                <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                  {slide.desc}
                </p>
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/30 hover:bg-brand-dark hover:shadow-brand/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group"
                >
                  {slide.cta}
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* Prev / Next arrows — glassmorphism */}
      <button
        onClick={prevSlide}
        aria-label="Vorherige Leistung"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 hover:border-white/40 hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="Nächste Leistung"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 hover:border-white/40 hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide counter + dots */}
      <div className="absolute bottom-5 right-8 z-20 flex flex-col items-end gap-2">
        <span className="text-white/50 text-xs font-mono tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="flex gap-1.5">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`rounded-full transition-all duration-400 ${
                idx === current
                  ? "w-7 h-2 bg-brand shadow-sm shadow-brand/50"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      {!isHovered && (
        <div className="absolute top-0 left-0 right-0 z-20 h-0.5 bg-white/10">
          <div
            key={current}
            className="h-full bg-brand rounded-full"
            style={{ animation: "sliderProgress 5.5s linear forwards" }}
          />
        </div>
      )}

      <style>{`
        @keyframes sliderProgress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  );
}
