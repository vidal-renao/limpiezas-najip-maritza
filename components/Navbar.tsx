"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import {
  ChevronDown,
  Menu,
  X,
  Home,
  Building2,
  Layers,
  Sparkles,
  Stethoscope,
  ArrowRight,
  RotateCcw,
  ShoppingBag,
  Wrench,
  Microscope,
  Shirt,
  Dumbbell,
  LayoutGrid,
  Trash2,
  PackageOpen,
  HardHat,
  Zap,
  Check,
} from "lucide-react";

/* ─── Service icons map (13 services) ───────────────────────────────────── */
const SERVICE_ICONS = {
  haushaltsreinigung:   Home,
  bueroreinigung:       Building2,
  praxisreinigung:      Stethoscope,
  treppenhausreinigung: Layers,
  glasreinigung:        Sparkles,
  unterhaltsreinigung:  RotateCcw,
  verkaufsflaeche:      ShoppingBag,
  bauendreinigung:      Wrench,
  grundreinigung:       Microscope,
  haushaltsdienste:     Shirt,
  fitnesscenter:        Dumbbell,
  innenreinigung:       LayoutGrid,
  entsorgung:           Trash2,
  umzugsreinigung:      PackageOpen,
  renovationsreinigung: HardHat,
  tiefenreinigung:      Zap,
} as const;

const SERVICE_KEYS = [
  "haushaltsreinigung",
  "bueroreinigung",
  "praxisreinigung",
  "treppenhausreinigung",
  "glasreinigung",
  "unterhaltsreinigung",
  "verkaufsflaeche",
  "bauendreinigung",
  "grundreinigung",
  "haushaltsdienste",
  "fitnesscenter",
  "innenreinigung",
  "entsorgung",
  "umzugsreinigung",
  "renovationsreinigung",
  "tiefenreinigung",
] as const;

const SERVICE_HREFS: Record<string, string> = {
  haushaltsreinigung:   "/haushaltsreinigung",
  bueroreinigung:       "/bueroreinigung",
  praxisreinigung:      "/praxisreinigung",
  treppenhausreinigung: "/treppenhausreinigung",
  glasreinigung:        "/glasreinigung",
  unterhaltsreinigung:  "/anfrage",
  verkaufsflaeche:      "/anfrage",
  bauendreinigung:      "/anfrage",
  grundreinigung:       "/anfrage",
  haushaltsdienste:     "/anfrage",
  fitnesscenter:        "/anfrage",
  innenreinigung:       "/anfrage",
  entsorgung:           "/anfrage",
  umzugsreinigung:      "/umzugsreinigung",
  renovationsreinigung: "/renovationsreinigung",
  tiefenreinigung:      "/tiefenreinigung",
};

/* ─── SVG Flag Components ────────────────────────────────────────────────── */
function FlagDE({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className={className} aria-hidden="true">
      <rect width="5" height="1" fill="#000" />
      <rect y="1" width="5" height="1" fill="#D00" />
      <rect y="2" width="5" height="1" fill="#FFCE00" />
    </svg>
  );
}

function FlagGB({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className={className} aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 60,30M60,0 0,30" stroke="#fff" strokeWidth="7" />
      <path d="M0,0 60,30M60,0 0,30" stroke="#C8102E" strokeWidth="4.5" />
      <path d="M30,0V30M0,15H60" stroke="#fff" strokeWidth="11" />
      <path d="M30,0V30M0,15H60" stroke="#C8102E" strokeWidth="6.5" />
    </svg>
  );
}

function FlagES({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={className} aria-hidden="true">
      <rect width="3" height="2" fill="#C60B1E" />
      <rect y=".5" width="3" height="1" fill="#FFC400" />
    </svg>
  );
}

const FLAG_COMPONENTS = { de: FlagDE, en: FlagGB, es: FlagES } as const;
const LOCALE_NAMES = { de: "Deutsch", en: "English", es: "Español" } as const;

function FlagBadge({ locale, size = "sm" }: { locale: "de" | "en" | "es"; size?: "sm" | "md" | "lg" }) {
  const Flag = FLAG_COMPONENTS[locale];
  const dims = size === "lg" ? "w-[30px] h-5" : size === "md" ? "w-6 h-4" : "w-5 h-[13px]";
  return (
    <span className={`${dims} rounded-[3px] overflow-hidden border border-black/10 shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.12)] block`}>
      <Flag className="w-full h-full" />
    </span>
  );
}

/* ─── Language Switcher ──────────────────────────────────────────────────── */
function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const LOCALES = ["de", "en", "es"] as const;
  const currentLocale = locale as "de" | "en" | "es";

  const switchLocale = (newLocale: "de" | "en" | "es") => {
    const localePrefix = `/${locale}`;
    const rawPath = pathname.startsWith(localePrefix)
      ? pathname.slice(localePrefix.length) || "/"
      : pathname;
    sessionStorage.setItem("__scrollY", String(window.scrollY));
    router.push(rawPath, { locale: newLocale });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-xl border select-none
          transition-all duration-200
          ${open
            ? "border-brand/40 bg-white/95 shadow-sm shadow-navy/8"
            : "border-navy/12 hover:border-brand/35 hover:bg-white/40 hover:shadow-sm hover:shadow-navy/6"
          }
        `}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Sprache wechseln"
      >
        <FlagBadge locale={currentLocale} size="sm" />
        <span className="text-[13px] font-semibold text-navy/80 leading-none tracking-wide">
          {LOCALE_NAMES[currentLocale]}
        </span>
        <ChevronDown className={`w-3 h-3 text-navy/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`
          absolute top-full right-0 mt-2.5 min-w-[188px] z-50
          bg-white/98 backdrop-blur-xl rounded-2xl
          border border-navy/8
          shadow-[0_8px_32px_rgba(26,46,74,0.14),0_2px_8px_rgba(26,46,74,0.06)]
          overflow-hidden
          transition-all duration-200 ease-out origin-top-right
          ${open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-1.5 pointer-events-none"
          }
        `}
        role="listbox"
        aria-label="Sprache auswählen"
      >
        <div className="px-4 pt-3 pb-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-navy/30">Sprache</p>
        </div>
        <div className="px-1.5 pb-1.5 flex flex-col gap-0.5">
          {LOCALES.map((l) => {
            const isActive = l === currentLocale;
            return (
              <button
                key={l}
                type="button"
                onClick={() => switchLocale(l)}
                role="option"
                aria-selected={isActive}
                lang={l}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left
                  transition-all duration-150
                  ${isActive
                    ? "bg-brand/8 text-navy"
                    : "text-navy/60 hover:text-navy hover:bg-navy/4"
                  }
                `}
              >
                <FlagBadge locale={l} size="md" />
                <span className={`text-sm leading-none ${isActive ? "font-semibold" : "font-medium"}`}>
                  {LOCALE_NAMES[l]}
                </span>
                {isActive && <Check className="w-3.5 h-3.5 text-brand ml-auto shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── NavLink ────────────────────────────────────────────────────────────── */
function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative group inline-flex items-center px-2.5 py-1 text-sm font-medium tracking-wide text-navy/75 hover:text-navy transition-colors duration-300"
    >
      {label}
      <span
        className={`
          absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-brand
          transition-all duration-300 ease-out
          ${active ? "w-full" : "w-0 group-hover:w-full"}
        `}
      />
    </Link>
  );
}

/* ─── ServicesDropdown ───────────────────────────────────────────────────── */
function ServicesDropdown({
  activeHref,
  onNavigate,
}: {
  activeHref: string;
  onNavigate: () => void;
}) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const serviceHrefsList = Object.values(SERVICE_HREFS);
  const isActive = serviceHrefsList.some((href) => activeHref.includes(href));

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative group inline-flex items-center gap-1 px-2.5 py-1 text-sm font-medium tracking-wide text-navy/75 hover:text-navy transition-colors duration-300"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {t("services")}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`} />
        <span
          className={`
            absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-brand
            transition-all duration-300 ease-out
            ${isActive || open ? "w-full" : "w-0 group-hover:w-full"}
          `}
        />
      </button>

      <div
        className={`
          absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[min(700px,95vw)]
          bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60
          ring-1 ring-navy/5 overflow-hidden
          transition-all duration-300 ease-out origin-top
          ${open ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"}
        `}
        role="menu"
      >
        <div className="px-5 py-3 border-b border-border/60 flex items-center justify-between">
          <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
            {t("ourServices")}
          </p>
          <Link
            href="/anfrage"
            onClick={() => { setOpen(false); onNavigate(); }}
            className="text-xs font-semibold text-brand hover:text-brand-dark transition-colors flex items-center gap-1"
          >
            {t("allServices")} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-0.5 p-2">
          {SERVICE_KEYS.map((key) => {
            const href = SERVICE_HREFS[key];
            const Icon = SERVICE_ICONS[key];
            const label = t(`services_items.${key}.label`);
            const desc = t(`services_items.${key}.desc`);
            const isItemActive = activeHref.includes(href);
            return (
              <Link
                key={key}
                href={href}
                role="menuitem"
                onClick={() => { setOpen(false); onNavigate(); }}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl text-left
                  transition-all duration-200 group
                  ${isItemActive ? "bg-brand/8 text-navy" : "hover:bg-muted text-foreground/75 hover:text-navy"}
                `}
              >
                <span
                  className={`
                    w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                    transition-colors duration-200
                    ${isItemActive ? "bg-brand text-white" : "bg-muted group-hover:bg-brand/10 text-foreground/40 group-hover:text-brand"}
                  `}
                >
                  <Icon className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-tight">{label}</p>
                  <p className="text-xs text-foreground/45 mt-0.5">{desc}</p>
                </div>
                {isItemActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand shrink-0" />}
              </Link>
            );
          })}
        </div>

        <div className="mx-2 mb-2 p-3 rounded-xl bg-navy text-white flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">{t("freeOffer")}</p>
            <p className="text-xs text-white/60">{t("answerIn24h")}</p>
          </div>
          <Link
            href="/anfrage"
            onClick={() => { setOpen(false); onNavigate(); }}
            className="bg-brand hover:bg-brand-dark text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
          >
            {t("request")}
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Navbar ────────────────────────────────────────────────────────── */
export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("__scrollY");
    if (saved) {
      sessionStorage.removeItem("__scrollY");
      const y = parseInt(saved, 10);
      if (!isNaN(y)) {
        requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "instant" }));
      }
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, []);

  const isServiceActive = Object.values(SERVICE_HREFS).some((href) => pathname.includes(href));

  const NAV_ITEMS = [
    { label: t("home"), href: "/" },
    { label: t("references"), href: "/referenzen" },
    { label: t("about"), href: "/ueber-uns" },
  ];

  return (
    <>
      <header
        className={`
          fixed top-0 inset-x-0 z-50
          transition-all duration-300 ease-out
          ${scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_32px_0_rgba(26,46,74,0.10)] border-b border-white/60"
            : "bg-white/70 backdrop-blur-xl border-b border-white/30"
          }
        `}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">

            {/* ── Wordmark ── */}
            <Link
              href="/"
              onClick={closeMobile}
              className="flex items-center shrink-0 group select-none px-4 py-2 rounded-md border border-navy/12 hover:border-brand/35 bg-transparent hover:bg-white/25 transition-all duration-300"
              aria-label="D'Namar Reinigungsdienst Basel"
            >
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-[20px] tracking-tighter text-navy group-hover:text-brand transition-colors duration-300">
                  D<span className="text-brand group-hover:text-navy transition-colors duration-300">&apos;</span>NAMAR
                </span>
                <span className="text-foreground/40 text-[8px] tracking-[0.22em] uppercase font-semibold mt-[2px]">
                  Reinigungsdienst · Basel
                </span>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-5">
              <NavLink href="/" label={t("home")} active={pathname === "/" || pathname.match(/^\/[a-z]{2}$/) !== null} />
              <ServicesDropdown activeHref={pathname} onNavigate={closeMobile} />
              {NAV_ITEMS.slice(1).map(({ href, label }) => (
                <NavLink key={href} href={href} label={label} active={pathname.includes(href)} />
              ))}
            </nav>

            {/* ── Desktop right side ── */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <LanguageSwitcher />
              <Link
                href="/kontakt"
                className="text-sm font-medium text-navy/70 hover:text-navy transition-colors duration-300"
              >
                {t("contact")}
              </Link>
              <Link
                href="/anfrage"
                className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 bg-brand text-white text-sm font-semibold shadow-md shadow-brand/25 transition-all duration-300 hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/30 hover:scale-105 active:scale-95"
              >
                {t("requestOffer")}
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-navy/70 hover:text-navy hover:bg-muted transition-all duration-200"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            >
              <span className={`absolute transition-all duration-300 ${mobileOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}>
                <X className="w-5 h-5" />
              </span>
              <span className={`absolute transition-all duration-300 ${mobileOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}>
                <Menu className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <div
          className={`
            lg:hidden border-t transition-all duration-300 ease-in-out overflow-hidden
            ${mobileOpen ? "border-border/50 max-h-[85vh] opacity-100" : "border-transparent max-h-0 opacity-0"}
          `}
          aria-hidden={!mobileOpen}
        >
          <div className="bg-white/95 backdrop-blur-xl overflow-y-auto max-h-[calc(85vh-1px)]">
            <nav className="section-container py-4 flex flex-col gap-0.5" aria-label="Mobile Navigation">

              <MobileNavLink href="/" label={t("home")} active={pathname === "/" || !!pathname.match(/^\/[a-z]{2}$/)} onClick={closeMobile} />

              {/* Services accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className={`
                    w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium
                    transition-colors duration-200
                    ${isServiceActive ? "text-navy bg-brand/8" : "text-navy/75 hover:text-navy hover:bg-muted"}
                  `}
                >
                  <span className="flex items-center gap-2">
                    {isServiceActive && <span className="w-1.5 h-1.5 rounded-full bg-brand" />}
                    {t("services")}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                </button>

                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${mobileServicesOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <div className="pl-3 pb-1 pt-0.5 flex flex-col gap-0.5">
                    {SERVICE_KEYS.map((key) => {
                      const href = SERVICE_HREFS[key];
                      const Icon = SERVICE_ICONS[key];
                      const label = t(`services_items.${key}.label`);
                      const isItemActive = pathname.includes(href);
                      return (
                        <Link
                          key={key}
                          href={href}
                          onClick={closeMobile}
                          className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                            transition-all duration-200
                            ${isItemActive ? "bg-brand/10 text-navy font-semibold" : "text-foreground/65 hover:text-navy hover:bg-muted"}
                          `}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${isItemActive ? "text-brand" : "text-foreground/35"}`} />
                          {label}
                          {isItemActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand shrink-0" />}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {NAV_ITEMS.slice(1).map(({ href, label }) => (
                <MobileNavLink key={href} href={href} label={label} active={pathname.includes(href)} onClick={closeMobile} />
              ))}
              <MobileNavLink href="/kontakt" label={t("contact")} active={pathname.includes("/kontakt")} onClick={closeMobile} />

              {/* Language switcher mobile */}
              <div className="flex gap-2 px-3 pt-2 pb-1">
                {(["de", "en", "es"] as const).map((l) => (
                  <LanguageMobileButton key={l} locale={l} />
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="pt-2 pb-2">
                <Link href="/anfrage" onClick={closeMobile} className="btn-primary w-full justify-center text-sm py-3.5">
                  {t("requestOffer")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-navy/20 backdrop-blur-sm lg:hidden" aria-hidden="true" onClick={closeMobile} />
      )}
    </>
  );
}

/* ─── MobileNavLink ──────────────────────────────────────────────────────── */
function MobileNavLink({ href, label, active, onClick }: { href: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium
        transition-all duration-200
        ${active ? "bg-brand/8 text-navy" : "text-navy/70 hover:text-navy hover:bg-muted"}
      `}
    >
      {active && <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />}
      {label}
    </Link>
  );
}

/* ─── LanguageMobileButton ───────────────────────────────────────────────── */
function LanguageMobileButton({ locale }: { locale: "de" | "en" | "es" }) {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isActive = currentLocale === locale;

  const switchLocale = () => {
    const localePrefix = `/${currentLocale}`;
    const rawPath = pathname.startsWith(localePrefix)
      ? pathname.slice(localePrefix.length) || "/"
      : pathname;
    sessionStorage.setItem("__scrollY", String(window.scrollY));
    router.push(rawPath, { locale });
  };

  return (
    <button
      type="button"
      onClick={switchLocale}
      lang={locale}
      aria-label={LOCALE_NAMES[locale]}
      aria-pressed={isActive}
      className={`
        flex-1 flex flex-col items-center gap-1.5 py-3 min-h-[56px] rounded-xl border
        transition-all duration-200
        ${isActive
          ? "border-brand bg-brand/8 shadow-sm shadow-brand/10"
          : "border-border hover:border-brand/40 hover:bg-muted"
        }
      `}
    >
      <FlagBadge locale={locale} size="lg" />
      <span className={`text-[10px] font-bold uppercase tracking-widest leading-none ${isActive ? "text-brand" : "text-navy/45"}`}>
        {locale.toUpperCase()}
      </span>
    </button>
  );
}
