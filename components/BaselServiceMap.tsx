"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

const AREAS = [
  { id: "riehen",      label: "Riehen",            cx: 322, cy:  65 },
  { id: "kleinbasel",  label: "Kleinbasel",         cx: 260, cy: 122 },
  { id: "innenstadt",  label: "Basel Innenstadt",   cx: 205, cy: 148 },
  { id: "gundeli",     label: "Gundeldingen",       cx: 192, cy: 208 },
  { id: "st-alban",    label: "St. Alban",          cx: 256, cy: 198 },
  { id: "allschwil",   label: "Allschwil",          cx: 116, cy: 170 },
  { id: "birsfelden",  label: "Birsfelden",         cx: 316, cy: 158 },
  { id: "binningen",   label: "Binningen",          cx: 150, cy: 240 },
] as const;

type AreaId = (typeof AREAS)[number]["id"];

export default function BaselServiceMap() {
  const [active, setActive] = useState<AreaId | null>(null);

  const activeArea = AREAS.find((a) => a.id === active);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl h-72 lg:h-80 select-none bg-[#162540]">
      <svg
        viewBox="0 0 480 340"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Karte des Einsatzgebiets D'Namar Basel"
        role="img"
      >
        <defs>
          <radialGradient id="mapBg" cx="45%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#111e30" />
          </radialGradient>
          <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect width="480" height="340" fill="url(#mapBg)" />

        {/* Subtle dot grid */}
        {Array.from({ length: 15 }).map((_, col) =>
          Array.from({ length: 11 }).map((_, row) => (
            <circle
              key={`g-${col}-${row}`}
              cx={col * 32 + 16}
              cy={row * 34 + 17}
              r="0.8"
              fill="rgba(255,255,255,0.08)"
            />
          ))
        )}

        {/* Region outline — dashed perimeter */}
        <path
          d="M 88,92 L 168,50 L 298,38 L 370,70 L 406,130 L 390,210 L 326,262 L 244,280 L 160,268 L 94,238 L 66,186 L 72,126 Z"
          fill="rgba(76,175,130,0.05)"
          stroke="rgba(76,175,130,0.22)"
          strokeWidth="1.5"
          strokeDasharray="7 4"
          strokeLinejoin="round"
        />

        {/* Rhine river */}
        <path
          d="M 64,142 C 118,145 168,152 215,162 C 262,172 296,162 394,140"
          fill="none"
          stroke="#4a90c4"
          strokeWidth="4.5"
          strokeOpacity="0.30"
          strokeLinecap="round"
        />
        {/* Rhine label */}
        <text
          x="228"
          y="183"
          textAnchor="middle"
          fontSize="8.5"
          fill="rgba(74,144,196,0.55)"
          fontStyle="italic"
          letterSpacing="1.5"
        >
          Rhein
        </text>

        {/* Service area: pulse rings + dots */}
        {AREAS.map(({ id, cx, cy }) => {
          const isActive = active === id;
          return (
            <g
              key={id}
              onMouseEnter={() => setActive(id)}
              onMouseLeave={() => setActive(null)}
              style={{ cursor: "pointer" }}
              role="button"
              aria-label={AREAS.find((a) => a.id === id)?.label}
            >
              {/* Outer pulse ring */}
              <circle
                cx={cx}
                cy={cy}
                r={isActive ? 20 : 13}
                fill="rgba(76,175,130,0.10)"
                stroke="rgba(76,175,130,0.25)"
                strokeWidth="1"
                style={{ transition: "r 0.25s ease, fill 0.25s ease" }}
              />
              {/* Middle ring */}
              <circle
                cx={cx}
                cy={cy}
                r={isActive ? 12 : 8}
                fill="rgba(76,175,130,0.15)"
                stroke="rgba(76,175,130,0.40)"
                strokeWidth="1"
                style={{ transition: "r 0.25s ease" }}
              />
              {/* Core dot */}
              <circle
                cx={cx}
                cy={cy}
                r={isActive ? 5 : 3.5}
                fill={isActive ? "#4caf82" : "rgba(76,175,130,0.85)"}
                filter={isActive ? "url(#dotGlow)" : undefined}
                style={{ transition: "all 0.2s ease" }}
              />
            </g>
          );
        })}

        {/* Permanent micro-labels */}
        {AREAS.map(({ id, label, cx, cy }) => (
          <text
            key={`lbl-${id}`}
            x={cx}
            y={cy + 26}
            textAnchor="middle"
            fontSize="7.5"
            fill="rgba(255,255,255,0.28)"
            letterSpacing="0.4"
            pointerEvents="none"
          >
            {label}
          </text>
        ))}

        {/* Corner label */}
        <text x="16" y="322" fontSize="8" fill="rgba(76,175,130,0.35)" letterSpacing="1.5">
          KANTON BASEL-STADT · UMGEBUNG
        </text>
      </svg>

      {/* Floating tooltip on hover */}
      {activeArea && (
        <div
          className="absolute pointer-events-none z-10 bg-navy/95 border border-brand/40 rounded-xl px-3.5 py-2 shadow-2xl backdrop-blur-md"
          style={{
            left:      `${(activeArea.cx / 480) * 100}%`,
            top:       `${(activeArea.cy / 340) * 100}%`,
            transform: "translate(-50%, -140%)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand shrink-0" />
            <span className="text-white text-xs font-semibold whitespace-nowrap">
              {activeArea.label}
            </span>
          </div>
          <p className="text-white/40 text-[10px] mt-0.5 text-center">Reinigung & Kalkschutz</p>
        </div>
      )}

      {/* Google Maps CTA — bottom-right */}
      <a
        href="https://www.google.com/maps/search/D'Namar+GmbH+Basel/@47.5596,7.5886,13z"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 hover:bg-brand hover:border-brand backdrop-blur-sm text-white/70 hover:text-white text-xs font-semibold px-3.5 py-2 transition-all duration-200 shadow-lg"
      >
        <ExternalLink className="w-3 h-3" />
        Google Maps
      </a>
    </div>
  );
}
