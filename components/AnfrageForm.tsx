"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Home,
  Building2,
  PackageOpen,
  Hammer,
  Layers,
  Sparkles,
  FlaskConical,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Calendar,
  RefreshCw,
  User,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  SquareStack,
  Ruler,
} from "lucide-react";

/* ─── Services ───────────────────────────────────────────────────────────── */
const SERVICES = [
  { id: "haushaltsreinigung",   label: "Haushaltsreinigung",    icon: Home,         desc: "Privathaushalte & Wohnungen" },
  { id: "bueroreinigung",       label: "Büroreinigung",         icon: Building2,    desc: "Büros, Praxen & Gewerbe" },
  { id: "umzugsreinigung",      label: "Umzugsreinigung",       icon: PackageOpen,  desc: "Endreinigung mit Garantie" },
  { id: "renovationsreinigung", label: "Renovationsreinigung",  icon: Hammer,       desc: "Nach Umbau, Neubau & Bau" },
  { id: "treppenhausreinigung", label: "Treppenhausreinigung",  icon: Layers,       desc: "Gemeinschaftsflächen & Lifte" },
  { id: "glasreinigung",        label: "Glasreinigung",         icon: Sparkles,     desc: "Fenster & Glasflächen" },
  { id: "tiefenreinigung",      label: "Tiefenreinigung",       icon: FlaskConical, desc: "Gründliche Grundreinigung" },
  { id: "anderes",              label: "Anderes / Kombination", icon: RefreshCw,    desc: "Sonstiges oder mehrere Leistungen" },
] as const;

type ServiceId = (typeof SERVICES)[number]["id"];

/** Map URL ?service= values → internal IDs (handles aliases from /preise) */
const SERVICE_ALIASES: Record<string, ServiceId> = {
  haushalt:          "haushaltsreinigung",
  buero:             "bueroreinigung",
  umzug:             "umzugsreinigung",
  renovation:        "renovationsreinigung",
  treppenhaus:       "treppenhausreinigung",
  glas:              "glasreinigung",
  tiefenreinigung:   "tiefenreinigung",
  gewerbereinigung:  "renovationsreinigung", // alias from /preise
};

function resolveService(param: string | null): string {
  if (!param) return "";
  if (SERVICES.some((s) => s.id === param)) return param;
  return SERVICE_ALIASES[param] ?? "";
}

/* ─── Frequency ──────────────────────────────────────────────────────────── */
const FREQUENCIES = [
  { id: "einmalig",         label: "Einmalig",      sub: "Nur dieser Einsatz" },
  { id: "woechentlich",     label: "Wöchentlich",   sub: "1× pro Woche" },
  { id: "zweiwöchentlich",  label: "2× pro Monat",  sub: "Alle 2 Wochen" },
  { id: "monatlich",        label: "Monatlich",     sub: "1× pro Monat" },
  { id: "unbekannt",        label: "Noch unklar",   sub: "Beratung gewünscht" },
] as const;

/* ─── Size options ───────────────────────────────────────────────────────── */
const M2_OPTIONS   = ["< 50 m²", "50–80 m²", "80–120 m²", "120–200 m²", "> 200 m²", "Nicht relevant"] as const;
const ROOM_OPTIONS = ["1 Zimmer", "2 Zimmer", "3–4 Zimmer", "5+ Zimmer", "Nicht relevant"] as const;

/* ─── Types ──────────────────────────────────────────────────────────────── */
type SizeMode = "m2" | "zimmer";

type FormState = {
  service:   string;
  sizeMode:  SizeMode;
  size:      string;
  frequency: string;
  date:      string;
  message:   string;
  name:      string;
  email:     string;
  phone:     string;
  address:   string;
};

const EMPTY: FormState = {
  service: "", sizeMode: "m2", size: "", frequency: "", date: "", message: "",
  name: "", email: "", phone: "", address: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

/* ─── Steps ──────────────────────────────────────────────────────────────── */
const STEPS = ["Leistung", "Details", "Kontakt", "Absenden"] as const;

/* ─── Sub-components ─────────────────────────────────────────────────────── */
function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-10" aria-label="Fortschritt">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                i < current
                  ? "bg-brand text-white"
                  : i === current
                  ? "bg-navy text-white ring-2 ring-brand ring-offset-2"
                  : "bg-border text-foreground/35"
              }`}
            >
              {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider hidden sm:block transition-colors ${
                i === current ? "text-navy" : "text-foreground/35"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-2 mb-4 transition-colors duration-300 ${
                i < current ? "bg-brand" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Field({
  label, required, error, hint, children,
}: {
  label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-navy">
        {label}
        {required && <span className="text-red-500 ml-0.5" aria-hidden>*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-foreground/45 leading-snug">{hint}</p>}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function inputCls(err?: boolean) {
  return [
    "w-full rounded-xl border px-4 py-2.5 text-sm bg-white text-foreground placeholder:text-foreground/35",
    "outline-none transition-colors focus:ring-2 focus:ring-brand focus:border-brand",
    err ? "border-red-400 bg-red-50/30" : "border-border hover:border-foreground/30",
  ].join(" ");
}

/* ─── Main form ──────────────────────────────────────────────────────────── */
export default function AnfrageForm() {
  const searchParams = useSearchParams();

  const [step, setStep]     = useState(0);
  const [form, setForm]     = useState<FormState>(() => ({
    ...EMPTY,
    service: resolveService(searchParams.get("service")),
  }));
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (key: keyof FormState, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  /* ── Validation ── */
  function validateStep(s: number): FormErrors {
    const e: FormErrors = {};
    if (s === 0) {
      if (!form.service) e.service = "Bitte wählen Sie eine Leistung aus.";
    }
    if (s === 1) {
      if (!form.size)      e.size      = "Bitte wählen Sie eine Grösse.";
      if (!form.frequency) e.frequency = "Bitte wählen Sie eine Häufigkeit.";
    }
    if (s === 2) {
      if (!form.name.trim())
        e.name = "Name ist erforderlich.";
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
      if (!form.phone.trim())
        e.phone = "Telefonnummer ist erforderlich.";
      if (!form.address.trim())
        e.address = "Adresse in Basel ist erforderlich.";
    }
    return e;
  }

  function next() {
    const e = validateStep(step);
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    setStatus("sending");
    // TODO: replace with real API route (e.g. POST /api/contact using Resend)
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  }

  /* ─── SUCCESS screen ─────────────────────────────────────────────────── */
  if (status === "success") {
    const serviceLabel = SERVICES.find((s) => s.id === form.service)?.label ?? "–";
    return (
      <div className="flex flex-col items-center text-center py-12 gap-6">
        <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-brand" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-navy mb-3">
            Vielen Dank, {form.name}!
          </h3>
          <p className="text-foreground/65 text-base leading-relaxed max-w-sm">
            Ihre Anfrage ist bei uns eingegangen.{" "}
            <strong className="text-navy">
              Wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </strong>
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid sm:grid-cols-2 gap-3 text-left w-full max-w-md mt-2">
          {[
            { label: "Leistung",  value: serviceLabel },
            { label: "Grösse",    value: form.size || "–" },
            { label: "E-Mail",    value: form.email },
            { label: "Adresse",   value: form.address || "–" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-muted rounded-xl px-4 py-3 border border-border">
              <p className="text-xs text-foreground/45 font-semibold uppercase tracking-wide mb-0.5">
                {label}
              </p>
              <p className="text-sm font-medium text-navy truncate">{value}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-foreground/40 max-w-sm leading-relaxed">
          Keine Antwort erhalten? Rufen Sie uns direkt an:{" "}
          <a href="tel:+41792527557" className="text-brand font-semibold hover:underline">
            +41 79 252 75 57
          </a>
        </p>
      </div>
    );
  }

  /* ─── STEP 0 – Service ───────────────────────────────────────────────── */
  const Step0 = (
    <div>
      <h2 className="text-xl font-bold text-navy mb-1">Welche Leistung wünschen Sie?</h2>
      <p className="text-sm text-foreground/55 mb-6">Wählen Sie eine Reinigungsart aus.</p>

      {errors.service && (
        <p className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 mb-5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.service}
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        {SERVICES.map(({ id, label, icon: Icon, desc }) => {
          const active = form.service === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => set("service", id)}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-150 ${
                active
                  ? "border-brand bg-brand/8 ring-2 ring-brand shadow-sm"
                  : "border-border bg-white hover:border-brand/40 hover:bg-muted/60"
              }`}
            >
              <span
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  active ? "bg-brand text-white" : "bg-muted text-foreground/50"
                }`}
              >
                <Icon className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <p className={`text-sm font-semibold leading-tight ${active ? "text-navy" : "text-foreground/80"}`}>
                  {label}
                </p>
                <p className="text-xs text-foreground/45 mt-0.5">{desc}</p>
              </div>
              {active && <CheckCircle2 className="w-4 h-4 text-brand ml-auto shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );

  /* ─── STEP 1 – Details ───────────────────────────────────────────────── */
  const sizeOptions = form.sizeMode === "m2" ? M2_OPTIONS : ROOM_OPTIONS;

  const Step1 = (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-bold text-navy mb-1">Objekt & Häufigkeit</h2>
        <p className="text-sm text-foreground/55">Damit wir Ihnen ein genaues Angebot erstellen können.</p>
      </div>

      {/* Size mode toggle + grid */}
      <Field label="Grösse des Objekts" required error={errors.size}>
        {/* Toggle: m² ↔ Zimmer */}
        <div className="inline-flex rounded-xl border border-border bg-muted p-1 mb-3 self-start">
          {(["m2", "zimmer"] as SizeMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => { setForm((f) => ({ ...f, sizeMode: mode, size: "" })); }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                form.sizeMode === mode
                  ? "bg-white text-navy shadow-sm border border-border"
                  : "text-foreground/50 hover:text-foreground/75"
              }`}
            >
              {mode === "m2"
                ? <><Ruler className="w-3.5 h-3.5" /> Quadratmeter</>
                : <><SquareStack className="w-3.5 h-3.5" /> Zimmeranzahl</>
              }
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {sizeOptions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => set("size", s)}
              className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                form.size === s
                  ? "border-brand bg-brand/8 text-navy ring-2 ring-brand"
                  : "border-border bg-white text-foreground/65 hover:border-brand/40 hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </Field>

      {/* Frequency */}
      <Field label="Gewünschte Häufigkeit" required error={errors.frequency}>
        <div className="grid sm:grid-cols-2 gap-2">
          {FREQUENCIES.map(({ id, label, sub }) => {
            const active = form.frequency === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => set("frequency", id)}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                  active
                    ? "border-brand bg-brand/8 ring-2 ring-brand"
                    : "border-border bg-white hover:border-brand/40"
                }`}
              >
                <div>
                  <p className={`text-sm font-semibold ${active ? "text-navy" : "text-foreground/75"}`}>{label}</p>
                  <p className="text-xs text-foreground/40">{sub}</p>
                </div>
                {active && <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />}
              </button>
            );
          })}
        </div>
      </Field>

      {/* Desired date */}
      <Field
        label="Gewünschter Termin"
        hint="Optional – kann auch telefonisch vereinbart werden."
      >
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/35 pointer-events-none" />
          <input
            type="date"
            value={form.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => set("date", e.target.value)}
            className={inputCls() + " pl-10"}
          />
        </div>
      </Field>

      {/* Extra notes */}
      <Field label="Besondere Anforderungen oder Hinweise">
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-foreground/35 pointer-events-none" />
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="z.B. Haustiere, schwer zugängliche Flächen, Kalkschutz gewünscht…"
            className={inputCls() + " pl-10 resize-none"}
          />
        </div>
      </Field>
    </div>
  );

  /* ─── STEP 2 – Contact ───────────────────────────────────────────────── */
  const Step2 = (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-navy mb-1">Ihre Kontaktdaten</h2>
        <p className="text-sm text-foreground/55">Alle mit * markierten Felder sind erforderlich.</p>
      </div>

      <Field label="Vollständiger Name" required error={errors.name}>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/35 pointer-events-none" />
          <input
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Erika Mustermann"
            autoComplete="name"
            className={inputCls(!!errors.name) + " pl-10"}
          />
        </div>
      </Field>

      <Field label="E-Mail-Adresse" required error={errors.email}>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/35 pointer-events-none" />
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="erika@beispiel.ch"
            autoComplete="email"
            className={inputCls(!!errors.email) + " pl-10"}
          />
        </div>
      </Field>

      <Field
        label="Telefon / WhatsApp"
        required
        error={errors.phone}
        hint="Für schnelle Rückfragen – auch per WhatsApp."
      >
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/35 pointer-events-none" />
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+41 79 000 00 00"
            autoComplete="tel"
            className={inputCls(!!errors.phone) + " pl-10"}
          />
        </div>
      </Field>

      <Field
        label="Adresse des Objekts in Basel"
        required
        error={errors.address}
        hint="Strasse, Hausnummer und Quartier – damit wir Anfahrt und Preis berechnen können."
      >
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/35 pointer-events-none" />
          <input
            type="text"
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            placeholder="Musterstrasse 12, 4051 Basel"
            autoComplete="street-address"
            className={inputCls(!!errors.address) + " pl-10"}
          />
        </div>
      </Field>
    </div>
  );

  /* ─── STEP 3 – Summary ───────────────────────────────────────────────── */
  const serviceLabel = SERVICES.find((s) => s.id === form.service)?.label ?? "–";
  const freqLabel    = FREQUENCIES.find((f) => f.id === form.frequency)?.label ?? "–";

  const summaryRows: [string, string, number][] = [
    ["Leistung",   serviceLabel,                   0],
    ["Grösse",     form.size || "–",               1],
    ["Häufigkeit", freqLabel,                      1],
    ["Termin",     form.date || "Nach Absprache",  1],
    ["Name",       form.name || "–",               2],
    ["E-Mail",     form.email || "–",              2],
    ["Telefon",    form.phone || "–",              2],
    ["Adresse",    form.address || "–",            2],
  ];

  const Step3 = (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-navy mb-1">Zusammenfassung</h2>
        <p className="text-sm text-foreground/55">Bitte prüfen Sie Ihre Angaben – dann absenden.</p>
      </div>

      <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
        {summaryRows.map(([key, val, targetStep]) => (
          <div key={key} className="flex items-center justify-between px-5 py-3.5 bg-white">
            <div className="min-w-0 mr-4">
              <p className="text-xs text-foreground/40 font-semibold uppercase tracking-wider">{key}</p>
              <p className="text-sm font-medium text-navy truncate">{val}</p>
            </div>
            <button
              type="button"
              onClick={() => setStep(targetStep)}
              className="text-xs text-brand hover:text-brand-dark hover:underline font-semibold shrink-0 transition-colors"
            >
              Ändern
            </button>
          </div>
        ))}
        {form.message && (
          <div className="px-5 py-3.5 bg-white">
            <p className="text-xs text-foreground/40 font-semibold uppercase tracking-wider mb-0.5">Hinweise</p>
            <p className="text-sm text-foreground/65 leading-relaxed">{form.message}</p>
          </div>
        )}
      </div>

      <p className="text-xs text-foreground/45 leading-relaxed border-t border-border pt-4">
        Mit dem Absenden bestätigen Sie, dass wir Ihre Daten ausschliesslich zur
        Bearbeitung dieser Anfrage verwenden dürfen. Keine Weitergabe an Dritte.
      </p>
    </div>
  );

  const STEP_CONTENT = [Step0, Step1, Step2, Step3];

  /* ─── Render ─────────────────────────────────────────────────────────── */
  return (
    <div>
      <StepBar current={step} />

      <div className="min-h-[340px]">{STEP_CONTENT[step]}</div>

      {/* Navigation */}
      <div className={`flex mt-10 gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}>
        {step > 0 && (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-2 rounded-full border-2 border-border px-6 py-3 text-sm font-semibold text-foreground/65 hover:border-navy hover:text-navy transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Zurück
          </button>
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            className="btn-primary text-sm px-7 py-3"
          >
            Weiter
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={status === "sending"}
            className="btn-primary text-sm px-8 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "sending" ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Wird gesendet…</>
            ) : (
              <><CheckCircle2 className="w-4 h-4" /> Kostenlose Offerte anfordern</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
