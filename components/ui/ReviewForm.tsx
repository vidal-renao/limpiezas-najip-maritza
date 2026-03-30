"use client";

import { useState } from "react";
import { Star, CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

const SERVICES_DE = [
  "Haushaltsreinigung",
  "Büroreinigung",
  "Umzugsreinigung / Endreinigung",
  "Renovationsreinigung",
  "Treppenhausreinigung",
  "Glasreinigung",
  "Tiefenreinigung",
  "Praxisreinigung",
  "Andere",
];

const SERVICES_EN = [
  "Household Cleaning",
  "Office Cleaning",
  "Move-Out Cleaning",
  "Renovation Cleaning",
  "Stairwell Cleaning",
  "Glass Cleaning",
  "Deep Cleaning",
  "Practice Cleaning",
  "Other",
];

const SERVICES_ES = [
  "Limpieza del hogar",
  "Limpieza de oficinas",
  "Limpieza de mudanza",
  "Limpieza de renovación",
  "Limpieza de escaleras",
  "Limpieza de cristales",
  "Limpieza profunda",
  "Limpieza de consultorios",
  "Otro",
];

type Status = "idle" | "sending" | "success" | "error";

type Props = {
  locale: string;
  labels: {
    title: string;
    subtitle: string;
    ratingLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    nameHint: string;
    serviceLabel: string;
    servicePlaceholder: string;
    commentLabel: string;
    commentPlaceholder: string;
    submitBtn: string;
    sending: string;
    successTitle: string;
    successText: string;
    errorText: string;
    retry: string;
  };
};

export default function ReviewForm({ locale, labels }: Props) {
  const services =
    locale === "en" ? SERVICES_EN : locale === "es" ? SERVICES_ES : SERVICES_DE;

  const [rating, setRating]   = useState(0);
  const [hovered, setHovered] = useState(0);
  const [name, setName]       = useState("");
  const [service, setService] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus]   = useState<Status>("idle");
  const [errors, setErrors]   = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!rating) e.rating = "★";
    if (!service) e.service = "!";
    if (comment.trim().length < 10) e.comment = "!";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() || undefined, rating, service, comment }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-10 gap-4">
        <CheckCircle2 className="w-12 h-12 text-brand" />
        <h3 className="text-xl font-bold text-navy">{labels.successTitle}</h3>
        <p className="text-sm text-foreground/60 max-w-xs leading-relaxed">{labels.successText}</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center text-center py-10 gap-4">
        <AlertCircle className="w-12 h-12 text-red-400" />
        <p className="text-sm text-foreground/60">{labels.errorText}</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-primary text-sm px-6 py-2.5">
          {labels.retry}
        </button>
      </div>
    );
  }

  const displayRating = hovered || rating;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <h3 className="text-lg font-bold text-navy">{labels.title}</h3>
        <p className="text-sm text-foreground/55 mt-1">{labels.subtitle}</p>
      </div>

      {/* Star rating */}
      <div>
        <p className={`text-sm font-medium mb-2 ${errors.rating ? "text-red-600" : "text-navy"}`}>
          {labels.ratingLabel} <span className="text-red-500">*</span>
        </p>
        <div className="flex gap-1" role="radiogroup" aria-label={labels.ratingLabel}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={rating === star}
              onClick={() => { setRating(star); setErrors((e) => ({ ...e, rating: "" })); }}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="p-0.5 transition-transform hover:scale-110 active:scale-95"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= displayRating
                    ? "text-amber-400 fill-amber-400"
                    : "text-border fill-none"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Name (optional) */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-navy">{labels.nameLabel}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={labels.namePlaceholder}
            className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-brand focus:border-brand placeholder:text-foreground/35 transition-colors"
          />
          <span className="text-xs text-foreground/40">{labels.nameHint}</span>
        </div>

        {/* Service */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-navy">
            {labels.serviceLabel} <span className="text-red-500">*</span>
          </label>
          <select
            value={service}
            onChange={(e) => { setService(e.target.value); setErrors((er) => ({ ...er, service: "" })); }}
            className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-brand focus:border-brand appearance-none cursor-pointer transition-colors ${errors.service ? "border-red-400" : "border-border"}`}
          >
            <option value="">{labels.servicePlaceholder}</option>
            {services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Comment */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-navy">
            {labels.commentLabel} <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-foreground/40">{comment.length} / 500</span>
        </div>
        <textarea
          rows={4}
          maxLength={500}
          value={comment}
          onChange={(e) => { setComment(e.target.value); setErrors((er) => ({ ...er, comment: "" })); }}
          placeholder={labels.commentPlaceholder}
          className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-brand focus:border-brand placeholder:text-foreground/35 resize-none transition-colors ${errors.comment ? "border-red-400" : "border-border"}`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary text-sm px-7 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <><Loader2 className="w-4 h-4 animate-spin" />{labels.sending}</>
        ) : (
          <><Send className="w-4 h-4" />{labels.submitBtn}</>
        )}
      </button>
    </form>
  );
}
