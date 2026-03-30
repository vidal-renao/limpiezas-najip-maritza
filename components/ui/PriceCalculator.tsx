"use client";

import { useState } from "react";
import { Calculator, ArrowRight } from "lucide-react";

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

const BASE_RATE: Record<Service, number> = {
  haushalt: 4.2,       // CHF per m²
  buero: 4.8,
  umzug: 6.5,
  tiefenreinigung: 7.0,
  praxis: 8.0,
};

const FREQUENCY_DISCOUNT: Record<Frequency, number> = {
  einmalig: 1.0,
  monatlich: 0.95,
  zweimal: 0.9,
  woechentlich: 0.85,
};

const MIN_PRICE = 120; // CHF minimum per session

function calculate(service: Service, size: number, frequency: Frequency) {
  const base = BASE_RATE[service] * size * FREQUENCY_DISCOUNT[frequency];
  const price = Math.max(base, MIN_PRICE);
  const low = Math.round(price * 0.9 / 10) * 10;
  const high = Math.round(price * 1.1 / 10) * 10;
  return { low, high };
}

export default function PriceCalculator({ labels }: { labels: Labels }) {
  const [service, setService] = useState<Service>("haushalt");
  const [size, setSize] = useState(60);
  const [frequency, setFrequency] = useState<Frequency>("einmalig");
  const [showResult, setShowResult] = useState(false);

  const { low, high } = calculate(service, size, frequency);

  const services = Object.entries(labels.services) as [Service, string][];
  const frequencies = Object.entries(labels.frequencies) as [Frequency, string][];

  return (
    <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-navy px-6 py-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
          <Calculator className="w-5 h-5 text-brand" />
        </div>
        <div>
          <h3 className="font-bold text-white text-lg">{labels.title}</h3>
          <p className="text-white/55 text-sm">{labels.subtitle}</p>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Service */}
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">{labels.serviceLabel}</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {services.map(([key, label]) => (
              <button
                key={key}
                onClick={() => { setService(key); setShowResult(false); }}
                className={`text-sm px-3 py-2 rounded-xl border font-medium transition-all ${
                  service === key
                    ? "bg-brand text-white border-brand"
                    : "bg-muted text-foreground/70 border-border hover:border-brand/50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Size slider */}
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">
            {labels.sizeLabel}: <span className="text-brand">{size} m²</span>
          </label>
          <input
            type="range"
            min={20}
            max={300}
            step={5}
            value={size}
            onChange={(e) => { setSize(Number(e.target.value)); setShowResult(false); }}
            className="w-full accent-[#4caf82] h-2 rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-foreground/40 mt-1">
            <span>20 m²</span>
            <span>300 m²</span>
          </div>
        </div>

        {/* Frequency */}
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">{labels.frequencyLabel}</label>
          <div className="grid grid-cols-2 gap-2">
            {frequencies.map(([key, label]) => (
              <button
                key={key}
                onClick={() => { setFrequency(key); setShowResult(false); }}
                className={`text-sm px-3 py-2 rounded-xl border font-medium transition-all ${
                  frequency === key
                    ? "bg-brand text-white border-brand"
                    : "bg-muted text-foreground/70 border-border hover:border-brand/50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Calculate button */}
        <button
          onClick={() => setShowResult(true)}
          className="w-full btn-primary py-3 justify-center"
        >
          <Calculator className="w-4 h-4" />
          {labels.ctaLabel}
        </button>

        {/* Result */}
        {showResult && (
          <div className="bg-navy rounded-2xl p-5 text-center">
            <p className="text-white/60 text-sm mb-1">{labels.resultTitle}</p>
            <p className="text-3xl font-bold text-white">
              CHF {low}–{high}
            </p>
            <p className="text-white/40 text-xs mt-2">{labels.resultNote}</p>
            <a
              href="/anfrage"
              className="inline-flex items-center gap-2 mt-4 bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand/90 transition-colors"
            >
              Kostenlose Offerte
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
