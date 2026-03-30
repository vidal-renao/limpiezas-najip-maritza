"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
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

/* ─── Service keys ───────────────────────────────────────────────────────── */
const SERVICE_KEYS = [
  "haushaltsreinigung",
  "bueroreinigung",
  "umzugsreinigung",
  "renovationsreinigung",
  "treppenhausreinigung",
  "glasreinigung",
  "tiefenreinigung",
  "anderes",
] as const;

type ServiceId = (typeof SERVICE_KEYS)[number];

const SERVICE_ICONS: Record<ServiceId, React.ElementType> = {
  haushaltsreinigung:   Home,
  bueroreinigung:       Building2,
  umzugsreinigung:      PackageOpen,
  renovationsreinigung: Hammer,
  treppenhausreinigung: Layers,
  glasreinigung:        Sparkles,
  tiefenreinigung:      FlaskConical,
  anderes:              RefreshCw,
};

/** Map URL ?service= values → internal IDs (handles aliases from /preise) */
const SERVICE_ALIASES: Record<string, ServiceId> = {
  haushalt:         "haushaltsreinigung",
  buero:            "bueroreinigung",
  umzug:            "umzugsreinigung",
  renovation:       "renovationsreinigung",
  treppenhaus:      "treppenhausreinigung",
  glas:             "glasreinigung",
  tiefenreinigung:  "tiefenreinigung",
  gewerbereinigung: "renovationsreinigung",
};

function resolveService(param: string | null): string {
  if (!param) return "";
  if ((SERVICE_KEYS as readonly string[]).includes(param)) return param;
  return SERVICE_ALIASES[param] ?? "";
}

/* ─── Frequency keys ─────────────────────────────────────────────────────── */
const FREQUENCY_KEYS = [
  "einmalig",
  "woechentlich",
  "zweiwochentlich",
  "monatlich",
  "unbekannt",
] as const;

type FrequencyId = (typeof FREQUENCY_KEYS)[number];

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

/* ─── Sub-components ─────────────────────────────────────────────────────── */
function StepBar({ current, steps }: { current: number; steps: string[] }) {
  return (
    <div className="flex items-center gap-0 mb-10" aria-label="Fortschritt">
      {steps.map((label, i) => (
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
          {i < steps.length - 1 && (
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
  const t = useTranslations("anfrage.form");
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

  const steps = t.raw("steps") as string[];

  /* ── Validation ── */
  function validateStep(s: number): FormErrors {
    const e: FormErrors = {};
    if (s === 0) {
      if (!form.service) e.service = t("step0.errorService");
    }
    if (s === 1) {
      if (!form.size)      e.size      = t("step1.errorSize");
      if (!form.frequency) e.frequency = t("step1.errorFrequency");
    }
    if (s === 2) {
      if (!form.name.trim())
        e.name = t("step2.errorName");
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = t("step2.errorEmail");
      if (!form.phone.trim())
        e.phone = t("step2.errorPhone");
      if (!form.address.trim())
        e.address = t("step2.errorAddress");
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
    try {
      const res = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  /* ─── ERROR screen ───────────────────────────────────────────────────── */
  if (status === "error") {
    return (
      <div className="flex flex-col items-center text-center py-12 gap-6">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-navy mb-3">{t("error.title")}</h3>
          <p className="text-foreground/65 text-base leading-relaxed max-w-sm">
            {t("error.subtitle")}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-primary text-sm px-8 py-3"
        >
          {t("error.retry")}
        </button>
      </div>
    );
  }

  /* ─── SUCCESS screen ─────────────────────────────────────────────────── */
  if (status === "success") {
    const serviceKey = form.service as ServiceId;
    const serviceData = (SERVICE_KEYS as readonly string[]).includes(serviceKey)
      ? (t.raw(`services.${serviceKey}`) as { label: string; desc: string })
      : null;
    const serviceLabel = serviceData?.label ?? "–";

    return (
      <div className="flex flex-col items-center text-center py-12 gap-6">
        <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-brand" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-navy mb-3">
            {t("success.title", { name: form.name })}
          </h3>
          <p className="text-foreground/65 text-base leading-relaxed max-w-sm">
            {t("success.subtitle")}{" "}
            <strong className="text-navy">
              {t("success.subtitleBold")}
            </strong>
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid sm:grid-cols-2 gap-3 text-left w-full max-w-md mt-2">
          {[
            { label: t("step3.summaryKeys.service"),  value: serviceLabel },
            { label: t("step3.summaryKeys.size"),      value: form.size || "–" },
            { label: t("step3.summaryKeys.email"),     value: form.email },
            { label: t("step3.summaryKeys.address"),   value: form.address || "–" },
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
          {t("success.noReply")}{" "}
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
      <h2 className="text-xl font-bold text-navy mb-1">{t("step0.title")}</h2>
      <p className="text-sm text-foreground/55 mb-6">{t("step0.subtitle")}</p>

      {errors.service && (
        <p className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 mb-5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.service}
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        {SERVICE_KEYS.map((id) => {
          const Icon = SERVICE_ICONS[id];
          const svc = t.raw(`services.${id}`) as { label: string; desc: string };
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
                  {svc.label}
                </p>
                <p className="text-xs text-foreground/45 mt-0.5">{svc.desc}</p>
              </div>
              {active && <CheckCircle2 className="w-4 h-4 text-brand ml-auto shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );

  /* ─── STEP 1 – Details ───────────────────────────────────────────────── */
  const m2Options   = t.raw("sizes.m2")     as string[];
  const zimmerOptions = t.raw("sizes.zimmer") as string[];
  const sizeOptions = form.sizeMode === "m2" ? m2Options : zimmerOptions;

  const Step1 = (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-bold text-navy mb-1">{t("step1.title")}</h2>
        <p className="text-sm text-foreground/55">{t("step1.subtitle")}</p>
      </div>

      {/* Size mode toggle + grid */}
      <Field label={t("step1.sizeLabel")} required error={errors.size}>
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
                ? <><Ruler className="w-3.5 h-3.5" /> {t("step1.squareMeters")}</>
                : <><SquareStack className="w-3.5 h-3.5" /> {t("step1.roomCount")}</>
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
      <Field label={t("step1.frequencyLabel")} required error={errors.frequency}>
        <div className="grid sm:grid-cols-2 gap-2">
          {FREQUENCY_KEYS.map((id) => {
            const freq = t.raw(`frequencies.${id}`) as { label: string; sub: string };
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
                  <p className={`text-sm font-semibold ${active ? "text-navy" : "text-foreground/75"}`}>{freq.label}</p>
                  <p className="text-xs text-foreground/40">{freq.sub}</p>
                </div>
                {active && <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />}
              </button>
            );
          })}
        </div>
      </Field>

      {/* Desired date */}
      <Field
        label={t("step1.dateLabel")}
        hint={t("step1.dateHint")}
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
      <Field label={t("step1.notesLabel")}>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-foreground/35 pointer-events-none" />
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder={t("step1.notesPlaceholder")}
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
        <h2 className="text-xl font-bold text-navy mb-1">{t("step2.title")}</h2>
        <p className="text-sm text-foreground/55">{t("step2.subtitle")}</p>
      </div>

      <Field label={t("step2.nameLabel")} required error={errors.name}>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/35 pointer-events-none" />
          <input
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder={t("step2.namePlaceholder")}
            autoComplete="name"
            className={inputCls(!!errors.name) + " pl-10"}
          />
        </div>
      </Field>

      <Field label={t("step2.emailLabel")} required error={errors.email}>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/35 pointer-events-none" />
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder={t("step2.emailPlaceholder")}
            autoComplete="email"
            className={inputCls(!!errors.email) + " pl-10"}
          />
        </div>
      </Field>

      <Field
        label={t("step2.phoneLabel")}
        required
        error={errors.phone}
        hint={t("step2.phoneHint")}
      >
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/35 pointer-events-none" />
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder={t("step2.phonePlaceholder")}
            autoComplete="tel"
            className={inputCls(!!errors.phone) + " pl-10"}
          />
        </div>
      </Field>

      <Field
        label={t("step2.addressLabel")}
        required
        error={errors.address}
        hint={t("step2.addressHint")}
      >
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/35 pointer-events-none" />
          <input
            type="text"
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            placeholder={t("step2.addressPlaceholder")}
            autoComplete="street-address"
            className={inputCls(!!errors.address) + " pl-10"}
          />
        </div>
      </Field>
    </div>
  );

  /* ─── STEP 3 – Summary ───────────────────────────────────────────────── */
  const serviceKey = form.service as ServiceId;
  const serviceData = (SERVICE_KEYS as readonly string[]).includes(serviceKey)
    ? (t.raw(`services.${serviceKey}`) as { label: string; desc: string })
    : null;
  const serviceLabel = serviceData?.label ?? "–";

  const freqData = (FREQUENCY_KEYS as readonly string[]).includes(form.frequency)
    ? (t.raw(`frequencies.${form.frequency as FrequencyId}`) as { label: string; sub: string })
    : null;
  const freqLabel = freqData?.label ?? "–";

  const sk = t.raw("step3.summaryKeys") as Record<string, string>;

  const summaryRows: [string, string, number][] = [
    [sk.service,   serviceLabel,                           0],
    [sk.size,      form.size || "–",                       1],
    [sk.frequency, freqLabel,                              1],
    [sk.date,      form.date || sk.dateDefault,            1],
    [sk.name,      form.name || "–",                       2],
    [sk.email,     form.email || "–",                      2],
    [sk.phone,     form.phone || "–",                      2],
    [sk.address,   form.address || "–",                    2],
  ];

  const Step3 = (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-navy mb-1">{t("step3.title")}</h2>
        <p className="text-sm text-foreground/55">{t("step3.subtitle")}</p>
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
              {t("step3.changeLabel")}
            </button>
          </div>
        ))}
        {form.message && (
          <div className="px-5 py-3.5 bg-white">
            <p className="text-xs text-foreground/40 font-semibold uppercase tracking-wider mb-0.5">{sk.notes}</p>
            <p className="text-sm text-foreground/65 leading-relaxed">{form.message}</p>
          </div>
        )}
      </div>

      <p className="text-xs text-foreground/45 leading-relaxed border-t border-border pt-4">
        {t("step3.privacyNote")}
      </p>
    </div>
  );

  const STEP_CONTENT = [Step0, Step1, Step2, Step3];

  /* ─── Render ─────────────────────────────────────────────────────────── */
  return (
    <div>
      <StepBar current={step} steps={steps} />

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
            {steps[step - 1]}
          </button>
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            className="btn-primary text-sm px-7 py-3"
          >
            {steps[step + 1]}
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
              <><Loader2 className="w-4 h-4 animate-spin" /> {t("step3.sending")}</>
            ) : (
              <><CheckCircle2 className="w-4 h-4" /> {t("step3.submitBtn")}</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
