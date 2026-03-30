"use client";

import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";

type FaqItem = { q: string; a: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <dl className="space-y-3">
      {items.map(({ q, a }, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={q}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "border-brand/40 bg-white shadow-md shadow-brand/5"
                : "border-border bg-white shadow-sm hover:border-brand/20 hover:shadow"
            }`}
          >
            <dt>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between px-7 py-5 text-left gap-4 group"
              >
                <span
                  className={`font-semibold text-sm sm:text-base leading-snug transition-colors ${
                    isOpen ? "text-brand" : "text-navy group-hover:text-brand"
                  }`}
                >
                  {q}
                </span>
                <span
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? "bg-brand text-white rotate-0"
                      : "bg-muted text-foreground/40 group-hover:bg-brand/10 group-hover:text-brand"
                  }`}
                >
                  {isOpen ? (
                    <Minus className="w-3.5 h-3.5" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" />
                  )}
                </span>
              </button>
            </dt>

            <dd
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="px-7 pb-6 text-sm text-foreground/65 leading-relaxed">
                {a}
              </p>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
