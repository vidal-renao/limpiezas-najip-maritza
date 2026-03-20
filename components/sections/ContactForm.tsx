"use client";

import { useState, useId, useCallback } from "react";
import { CheckCircle2, Send, AlertCircle, Clock, Phone, Mail } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  size: string;
  preferredTime: string;
  message: string;
  contactMethod: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const SERVICES = [
  { value: "", label: "Bitte Leistung wählen" },
  { value: "Haushaltsreinigung", label: "Haushaltsreinigung (Privat)" },
  { value: "Büroreinigung", label: "Büroreinigung (Gewerbe)" },
  { value: "Umzugsreinigung", label: "Umzugsreinigung / Endreinigung" },
  { value: "Glasreinigung", label: "Glasreinigung / Fensterreinigung" },
  { value: "Treppenhausreinigung", label: "Treppenhaus & Gemeinschaftsflächen" },
  { value: "Bauendreinigung", label: "Bauendreinigung / Renovationsreinigung" },
  { value: "Tiefenreinigung", label: "Tiefenreinigung" },
  { value: "Anderes", label: "Anderes / Nicht sicher" },
];

const SIZES = ["Studio / 1.5 Zi", "2–3 Zimmer", "4–5 Zimmer", "5+ Zimmer", "Gewerbe / Büro"];
const TIMES = ["Morgens (08–12)", "Mittags (12–14)", "Nachmittags (14–18)", "Flexibel"];

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function validatePhone(v: string) {
  return /^[+\d\s\-()]{7,}$/.test(v);
}

function validate(data: FormData): Errors {
  const e: Errors = {};
  if (!data.name.trim()) e.name = "Bitte geben Sie Ihren Namen an.";
  if (!data.email.trim()) e.email = "E-Mail-Adresse ist erforderlich.";
  else if (!validateEmail(data.email)) e.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  if (data.phone && !validatePhone(data.phone)) e.phone = "Bitte geben Sie eine gültige Telefonnummer ein.";
  if (!data.service) e.service = "Bitte wählen Sie eine Leistung aus.";
  if (!data.message.trim()) e.message = "Bitte beschreiben Sie kurz Ihr Anliegen.";
  return e;
}

const INITIAL: FormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  size: "",
  preferredTime: "",
  message: "",
  contactMethod: "email",
};

export default function ContactFormSection() {
  const id = useId();
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = useCallback(
    (field: keyof FormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setData((prev) => ({ ...prev, [field]: e.target.value }));
        if (touched[field]) {
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      },
    [touched]
  );

  const blur = useCallback(
    (field: keyof FormData) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const fieldError = validate({ ...data })[field];
      setErrors((prev) => ({ ...prev, [field]: fieldError }));
    },
    [data]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(INITIAL).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as Record<keyof FormData, boolean>
    );
    setTouched(allTouched);
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    try {
      // TODO: Replace with real API call (e.g. /api/contact or Resend)
      await new Promise((r) => setTimeout(r, 1800));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputCls = (field: keyof FormData) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none transition-all duration-200 focus:ring-2 focus:ring-brand/30 ${
      touched[field] && errors[field]
        ? "border-red-400 bg-red-50 focus:border-red-400"
        : "border-border bg-white focus:border-brand"
    }`;

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-brand/15 flex items-center justify-center mb-5">
          <CheckCircle2 className="w-8 h-8 text-brand" />
        </div>
        <h3 className="text-2xl font-bold text-navy mb-3">Vielen Dank!</h3>
        <p className="text-foreground/65 max-w-sm leading-relaxed mb-6">
          Wir haben Ihre Nachricht erhalten und melden uns innerhalb von{" "}
          <strong className="text-navy">24 Stunden</strong> bei Ihnen.
        </p>
        <div className="flex gap-4 text-sm text-foreground/60">
          <a href="tel:+41792527557" className="flex items-center gap-1.5 hover:text-brand transition-colors">
            <Phone className="w-4 h-4" /> +41 79 252 75 57
          </a>
          <a href="mailto:info@dnamar.ch" className="flex items-center gap-1.5 hover:text-brand transition-colors">
            <Mail className="w-4 h-4" /> info@dnamar.ch
          </a>
        </div>
        <button
          onClick={() => { setData(INITIAL); setStatus("idle"); setTouched({}); setErrors({}); }}
          className="mt-8 text-sm text-brand hover:text-brand-dark underline transition-colors"
        >
          Neue Anfrage stellen
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      {/* Name + Email */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${id}-name`} className="block text-sm font-medium text-navy mb-1.5">
            Vollständiger Name <span className="text-brand">*</span>
          </label>
          <input
            id={`${id}-name`}
            type="text"
            autoComplete="name"
            placeholder="Max Mustermann"
            value={data.name}
            onChange={set("name")}
            onBlur={blur("name")}
            className={inputCls("name")}
          />
          {touched.name && errors.name && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-email`} className="block text-sm font-medium text-navy mb-1.5">
            E-Mail-Adresse <span className="text-brand">*</span>
          </label>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            placeholder="max@beispiel.ch"
            value={data.email}
            onChange={set("email")}
            onBlur={blur("email")}
            className={inputCls("email")}
          />
          {touched.email && errors.email && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Phone + Service */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${id}-phone`} className="block text-sm font-medium text-navy mb-1.5">
            Telefon <span className="text-foreground/40 font-normal text-xs">(optional)</span>
          </label>
          <input
            id={`${id}-phone`}
            type="tel"
            autoComplete="tel"
            placeholder="+41 79 000 00 00"
            value={data.phone}
            onChange={set("phone")}
            onBlur={blur("phone")}
            className={inputCls("phone")}
          />
          {touched.phone && errors.phone && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-service`} className="block text-sm font-medium text-navy mb-1.5">
            Gewünschte Leistung <span className="text-brand">*</span>
          </label>
          <select
            id={`${id}-service`}
            value={data.service}
            onChange={set("service")}
            onBlur={blur("service")}
            className={`${inputCls("service")} cursor-pointer`}
          >
            {SERVICES.map(({ value, label }) => (
              <option key={value} value={value} disabled={!value}>
                {label}
              </option>
            ))}
          </select>
          {touched.service && errors.service && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.service}
            </p>
          )}
        </div>
      </div>

      {/* Objekt size */}
      <div>
        <p className="block text-sm font-medium text-navy mb-2">
          Grösse des Objekts <span className="text-foreground/40 font-normal text-xs">(optional)</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setData((prev) => ({ ...prev, size: prev.size === size ? "" : size }))}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-150 ${
                data.size === size
                  ? "border-brand bg-brand text-white"
                  : "border-border bg-white text-foreground/65 hover:border-brand/50"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Preferred contact time */}
      <div>
        <p className="flex items-center gap-1.5 text-sm font-medium text-navy mb-2">
          <Clock className="w-4 h-4 text-brand" />
          Bevorzugte Erreichbarkeit <span className="text-foreground/40 font-normal text-xs">(optional)</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {TIMES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setData((prev) => ({ ...prev, preferredTime: prev.preferredTime === t ? "" : t }))}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-150 ${
                data.preferredTime === t
                  ? "border-brand bg-brand text-white"
                  : "border-border bg-white text-foreground/65 hover:border-brand/50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor={`${id}-message`} className="block text-sm font-medium text-navy mb-1.5">
          Ihre Nachricht <span className="text-brand">*</span>
        </label>
        <textarea
          id={`${id}-message`}
          rows={4}
          placeholder="Beschreiben Sie kurz Ihr Anliegen: Adresse, gewünschter Termin, besondere Anforderungen..."
          value={data.message}
          onChange={set("message")}
          onBlur={blur("message")}
          className={`${inputCls("message")} resize-none`}
        />
        {touched.message && errors.message && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.message}
          </p>
        )}
      </div>

      {/* Preferred contact method */}
      <div>
        <p className="text-sm font-medium text-navy mb-2">Bevorzugter Kontaktweg</p>
        <div className="flex gap-3">
          {[
            { value: "email", label: "E-Mail", icon: Mail },
            { value: "phone", label: "Telefon", icon: Phone },
            { value: "whatsapp", label: "WhatsApp", icon: null },
          ].map(({ value, label, icon: Icon }) => (
            <label
              key={value}
              className={`flex items-center gap-2 cursor-pointer rounded-xl border px-4 py-2.5 text-sm transition-all duration-150 ${
                data.contactMethod === value
                  ? "border-brand bg-brand/5 text-navy font-medium"
                  : "border-border bg-white text-foreground/65 hover:border-brand/40"
              }`}
            >
              <input
                type="radio"
                name="contactMethod"
                value={value}
                checked={data.contactMethod === value}
                onChange={set("contactMethod")}
                className="sr-only"
              />
              {Icon && <Icon className="w-4 h-4" />}
              {value === "whatsapp" && (
                <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              )}
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="pt-2">
        {status === "error" && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.
          </div>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full btn-primary py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Wird gesendet…
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Nachricht senden
            </>
          )}
        </button>
        <p className="mt-3 text-center text-xs text-foreground/45">
          Kostenlos & unverbindlich · Antwort innerhalb von 24 Stunden
        </p>
      </div>
    </form>
  );
}
