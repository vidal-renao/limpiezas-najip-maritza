"use client";

import { useState } from "react";
import { ClipboardList, ArrowRight } from "lucide-react";

type Service = "haushalt" | "buero" | "umzug" | "tiefenreinigung" | "praxis";
type Frequency = "einmalig" | "woechentlich" | "zweimal" | "monatlich";

interface Labels {
  title: string;
  subtitle: string;
  serviceLabel: string;
  sizeLabel: string;
  frequencyLabel: string;
  resultTitle: string;
  resultNote: string;
  ctaLabel: string;
  services: Record<Service, string>;
  frequencies: Record<Frequency, string>;
}

/**
 * Quote configurator. It deliberately does not estimate or display a price:
 * every property is assessed individually before D'Namar confirms an offer.
 */
export default function PriceCalculator({ labels }: { labels: Labels }) {
  const [service, setService] = useState<Service>("haushalt");
  const [size, setSize] = useState(60);
  const [frequency, setFrequency] = useState<Frequency>("einmalig");

  const services = Object.entries(labels.services) as [Service, string][];
  const frequencies = Object.entries(labels.frequencies) as [Frequency, string][];

  return (
    <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
      <div className="bg-navy px-6 py-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
          <ClipboardList className="w-5 h-5 text-brand" />
        </div>
        <div>
          <h3 className="font-bold text-white text-lg">{labels.title}</h3>
          <p className="text-white/55 text-sm">{labels.subtitle}</p>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">{labels.serviceLabel}</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {services.map(([key, label]) => (
              <button key={key} type="button" onClick={() => setService(key)} className={`text-sm px-3 py-2 rounded-xl border font-medium transition-all ${service === key ? "bg-brand text-white border-brand" : "bg-muted text-foreground/70 border-border hover:border-brand/50"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy mb-2">
            {labels.sizeLabel}: <span className="text-brand">{size} m²</span>
          </label>
          <input type="range" min={20} max={300} step={5} value={size} onChange={(event) => setSize(Number(event.target.value))} className="w-full accent-[#4caf82] h-2 rounded-full cursor-pointer" />
          <div className="flex justify-between text-xs text-foreground/40 mt-1"><span>20 m²</span><span>300 m²</span></div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy mb-2">{labels.frequencyLabel}</label>
          <div className="grid grid-cols-2 gap-2">
            {frequencies.map(([key, label]) => (
              <button key={key} type="button" onClick={() => setFrequency(key)} className={`text-sm px-3 py-2 rounded-xl border font-medium transition-all ${frequency === key ? "bg-brand text-white border-brand" : "bg-muted text-foreground/70 border-border hover:border-brand/50"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-navy rounded-2xl p-5 text-center">
          <p className="text-white font-semibold">{labels.resultTitle}</p>
          <p className="text-white/55 text-sm mt-2">{labels.resultNote}</p>
          <a href="/anfrage" className="inline-flex items-center gap-2 mt-4 bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand/90 transition-colors">
            {labels.ctaLabel}<ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
