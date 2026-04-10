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
  PackageOpen,
  Hammer,
  Layers,
  Sparkles,
  FlaskConical,
  Stethoscope,
  ArrowRight,
  Globe,
} from "lucide-react";

/* ─── Service icons map ──────────────────────────────────────────────────── */
const SERVICE_ICONS = {
  haushaltsreinigung: Home,
  bueroreinigung: Building2,
  umzugsreinigung: PackageOpen,
  renovationsreinigung: Hammer,
  treppenhausreinigung: Layers,
  glasreinigung: Sparkles,
  tiefenreinigung: FlaskConical,
  praxisreinigung: Stethoscope,
} as const;

const SERVICE_KEYS = [
  "haushaltsreinigung",
  "bueroreinigung",
  "umzugsreinigung",
  "renovationsreinigung",
  "treppenhausreinigung",
  "glasreinigung",
  "tiefenreinigung",
  "praxisreinigung",
] as const;

const SERVICE_HREFS: Record<string, string> = {
  haushaltsreinigung: "/haushaltsreinigung",
  bueroreinigung: "/bueroreinigung",
  umzugsreinigung: "/umzugsreinigung",
  renovationsreinigung: "/renovationsreinigung",
  treppenhausreinigung: "/treppenhausreinigung",
  glasreinigung: "/glasreinigung",
  tiefenreinigung: "/tiefenreinigung",
  praxisreinigung: "/praxisreinigung",
};

/* ─── Locale flags & labels ──────────────────────────────────────────────── */
const LOCALE_META: Record<"de" | "en" | "es", { flag: string }> = {
  de: { flag: "🇩🇪" },
  en: { flag: "🇬🇧" },
  es: { flag: "🇪🇸" },
};

/* ─── Language Switcher ──────────────────────────────────────────────────── */
function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");
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

  const switchLocale = (newLocale: "de" | "en" | "es") => {
    const localePrefix = `/${locale}`;
    const rawPath = pathname.startsWith(localePrefix)
      ? pathname.slice(localePrefix.length) || "/"
      : pathname;
    // Preserve scroll position across locale change
    sessionStorage.setItem("__scrollY", String(window.scrollY));
    router.push(rawPath, { locale: newLocale });
    setOpen(false);
  };

  const currentLocale = locale as "de" | "en" | "es";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-border text-xs font-semibold text-navy/70 hover:text-navy hover:border-brand/50 transition-all duration-200"
        aria-expanded={open}
        aria-label="Sprache wechseln"
      >
        <span className="text-sm leading-none" aria-hidden="true">{LOCALE_META[currentLocale].flag}</span>
        <span>{t(`lang.${currentLocale}`)}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-xl border border-border shadow-lg overflow-hidden z-50 min-w-[130px]">
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => switchLocale(l)}
              lang={l}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-left transition-colors hover:bg-muted ${locale === l ? "text-brand bg-brand/5" : "text-navy/70"}`}
            >
              <span className="text-sm leading-none" aria-hidden="true">{LOCALE_META[l].flag}</span>
              {t(`lang.${l}`)}
              {locale === l && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Sub-components ────────────────────────────────────────────────────── */
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
      className="relative group inline-flex items-center px-1 py-1 text-sm font-medium text-navy/75 hover:text-navy transition-colors duration-300"
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
        className="relative group inline-flex items-center gap-1 px-1 py-1 text-sm font-medium text-navy/75 hover:text-navy transition-colors duration-300"
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
          absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[min(540px,95vw)]
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

        <div className="grid grid-cols-2 gap-0.5 p-2">
          {SERVICE_KEYS.map((key) => {
            const href = SERVICE_HREFS[key];
            const Icon = SERVICE_ICONS[key];
            const label = t(`services_items.${key}.label`);
            const desc = t(`services_items.${key}.desc`);
            const isItemActive = activeHref.includes(href);
            return (
              <Link
                key={href}
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

  // Restore scroll position after locale change
  useEffect(() => {
    const saved = sessionStorage.getItem("__scrollY");
    if (saved) {
      sessionStorage.removeItem("__scrollY");
      const y = parseInt(saved, 10);
      if (!isNaN(y)) {
        // Wait for page to fully render before restoring
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
    { label: t("prices"), href: "/preise" },
    { label: t("references"), href: "/referenzen" },
    { label: t("blog"), href: "/blog" },
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

            {/* ── Logo ── */}
            <Link
              href="/"
              onClick={closeMobile}
              className="flex items-center gap-2.5 shrink-0 group"
              aria-label="D'Namar Reinigungsdienst Basel"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-navy text-white font-black text-lg leading-none select-none shadow-sm group-hover:bg-brand transition-colors duration-300">
                D
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-navy font-bold text-[15px] tracking-tight group-hover:text-brand transition-colors duration-300">
                  D&apos;Namar
                </span>
                <span className="text-foreground/40 text-[9px] tracking-[0.18em] uppercase mt-0.5">
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
                className={`
                  inline-flex items-center gap-1.5 rounded-full px-5 py-2.5
                  bg-brand text-white text-sm font-semibold
                  shadow-md shadow-brand/25
                  transition-all duration-300
                  hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/30 hover:scale-105
                  active:scale-95
                `}
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
                          key={href}
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
                          {isItemActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand" />}
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

              {/* Language switcher in mobile */}
              <div className="flex gap-2 px-3 pt-2 pb-1">
                {(["de", "en", "es"] as const).map((l) => (
                  <LanguageMobileButton key={l} locale={l} label={t(`lang.${l}`)} />
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

/* ─── Mobile nav link ────────────────────────────────────────────────────── */
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

/* ─── Mobile language button ─────────────────────────────────────────────── */
function LanguageMobileButton({ locale, label }: { locale: "de" | "en" | "es"; label: string }) {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

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
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${currentLocale === locale ? "bg-brand text-white border-brand" : "border-border text-navy/60 hover:border-brand/50 hover:text-navy"}`}
    >
      <span className="text-sm leading-none" aria-hidden="true">{LOCALE_META[locale].flag}</span>
      {label}
    </button>
  );
}
