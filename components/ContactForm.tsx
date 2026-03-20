"use client";

import { useState, useId } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const SERVICES = [
  "Haushaltsreinigung",
  "Büroreinigung",
  "Umzugsreinigung / Endreinigung",
  "Renovationsreinigung",
  "Treppenhausreinigung",
  "Glasreinigung / Fensterreinigung",
  "Tiefenreinigung",
  "Praxisreinigung",
  "Anderes",
] as const;

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = "Bitte geben Sie Ihren Namen ein.";
  if (!data.email.trim()) {
    errors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  }
  if (data.phone && !/^[\d\s+\-().]{7,20}$/.test(data.phone)) {
    errors.phone = "Bitte geben Sie eine gültige Telefonnummer ein.";
  }
  if (!data.service) errors.service = "Bitte wählen Sie eine Leistung aus.";
  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = "Bitte beschreiben Sie Ihr Anliegen (mind. 10 Zeichen).";
  }
  return errors;
}

export default function ContactForm() {
  const id = useId();
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name as keyof FormData]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      (Object.keys(form) as (keyof FormData)[]).map((k) => [k, true])
    );
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    // TODO: Replace with your API route or email service (e.g. Resend, Formspree)
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-10 gap-4">
        <CheckCircle2 className="w-12 h-12 text-brand" />
        <h3 className="text-xl font-bold text-navy">Vielen Dank!</h3>
        <p className="text-foreground/65 text-sm max-w-xs leading-relaxed">
          Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24
          Stunden bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name + Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          id={`${id}-name`}
          label="Name"
          required
          error={touched.name ? errors.name : undefined}
        >
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Max Mustermann"
            className={inputClass(touched.name && !!errors.name)}
          />
        </Field>

        <Field
          id={`${id}-email`}
          label="E-Mail"
          required
          error={touched.email ? errors.email : undefined}
        >
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="max@beispiel.ch"
            className={inputClass(touched.email && !!errors.email)}
          />
        </Field>
      </div>

      {/* Phone + Service */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          id={`${id}-phone`}
          label="Telefon"
          error={touched.phone ? errors.phone : undefined}
          hint="Optional"
        >
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+41 79 000 00 00"
            className={inputClass(touched.phone && !!errors.phone)}
          />
        </Field>

        <Field
          id={`${id}-service`}
          label="Gewünschte Leistung"
          required
          error={touched.service ? errors.service : undefined}
        >
          <select
            id={`${id}-service`}
            name="service"
            value={form.service}
            onChange={handleChange}
            onBlur={handleBlur}
            className={selectClass(touched.service && !!errors.service)}
          >
            <option value="">Bitte wählen…</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Message */}
      <Field
        id={`${id}-message`}
        label="Ihre Nachricht"
        required
        error={touched.message ? errors.message : undefined}
        hint={`${form.message.length} / 1000`}
      >
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          maxLength={1000}
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Beschreiben Sie Ihr Anliegen – z.B. Grösse der Wohnung, gewünschter Termin, besondere Anforderungen…"
          className={`${inputClass(touched.message && !!errors.message)} resize-none`}
        />
      </Field>

      {/* Error summary */}
      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full sm:w-auto text-base px-8 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Wird gesendet…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Anfrage senden
          </>
        )}
      </button>
    </form>
  );
}

/* ─── Helpers ───────────────────────────────────────────────────────────── */
function inputClass(hasError?: boolean) {
  return [
    "w-full rounded-xl border px-4 py-2.5 text-sm text-foreground bg-white",
    "placeholder:text-foreground/35 outline-none transition-colors",
    "focus:ring-2 focus:ring-brand focus:border-brand",
    hasError
      ? "border-red-400 focus:ring-red-300 focus:border-red-400"
      : "border-border hover:border-foreground/30",
  ]
    .filter(Boolean)
    .join(" ");
}

function selectClass(hasError?: boolean) {
  return inputClass(hasError) + " cursor-pointer appearance-none";
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-navy">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {hint && !error && (
          <span className="text-xs text-foreground/40">{hint}</span>
        )}
      </div>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-600 mt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
