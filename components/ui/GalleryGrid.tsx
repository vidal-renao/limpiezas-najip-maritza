"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

interface GalleryItem {
  src: string;
  alt: string;
  label: string;
}

interface Props {
  items: GalleryItem[];
  title: string;
  subtitle: string;
}

export default function GalleryGrid({ items, title, subtitle }: Props) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <section className="bg-muted py-16 lg:py-20">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">{title}</h2>
          <p className="text-foreground/60 max-w-xl mx-auto text-sm">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((item) => (
            <button
              key={item.src}
              onClick={() => setSelected(item)}
              className="relative group rounded-2xl overflow-hidden aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-brand"
              aria-label={item.alt}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/80 to-transparent px-3 py-2">
                <p className="text-white text-xs font-medium truncate">{item.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setSelected(null)}
            aria-label="Schließen"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div
            className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected.src}
              alt={selected.alt}
              width={1024}
              height={683}
              className="object-contain w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4">
              <p className="text-white font-medium">{selected.label}</p>
              <p className="text-white/60 text-sm">{selected.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
