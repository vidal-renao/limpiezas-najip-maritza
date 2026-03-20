"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────────────────── */
const SERVICES = [
  { label: "Haushaltsreinigung",   href: "/haushaltsreinigung",   icon: Home,         desc: "Privathaushalte & Wohnungen" },
  { label: "Büroreinigung",        href: "/bueroreinigung",        icon: Building2,    desc: "Büros & Gewerbeflächen" },
  { label: "Umzugsreinigung",      href: "/umzugsreinigung",       icon: PackageOpen,  desc: "Endreinigung mit Garantie" },
  { label: "Renovationsreinigung", href: "/renovationsreinigung",  icon: Hammer,       desc: "Nach Umbau & Neubau" },
  { label: "Treppenhausreinigung", href: "/treppenhausreinigung",  icon: Layers,       desc: "Gemeinschaftsflächen" },
  { label: "Glasreinigung",        href: "/glasreinigung",         icon: Sparkles,     desc: "Fenster & Glasflächen" },
  { label: "Tiefenreinigung",      href: "/tiefenreinigung",       icon: FlaskConical, desc: "Gründliche Grundreinigung" },
  { label: "Praxisreinigung",      href: "/praxisreinigung",       icon: Stethoscope,  desc: "Arztpraxen & Studios" },
] as const;

const NAV_LINKS = [
  { label: "Startseite",  href: "/" },
  { label: "Preise",      href: "/preise" },
  { label: "Referenzen",  href: "/referenzen" },
  { label: "Blog",        href: "/blog" },
  { label: "Über uns",    href: "/ueber-uns" },
] as const;

/* ─── Sub-components ────────────────────────────────────────────────────── */

/** Single nav link with animated center-grow underline */
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
      {/* Underline: grows from center */}
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

/** Leistungen mega-dropdown trigger + panel */
function ServicesDropdown({
  activeHref,
  onNavigate,
}: {
  activeHref: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = SERVICES.some((s) => s.href === activeHref);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative group inline-flex items-center gap-1 px-1 py-1 text-sm font-medium text-navy/75 hover:text-navy transition-colors duration-300"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Leistungen
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
        />
        {/* Underline */}
        <span
          className={`
            absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-brand
            transition-all duration-300 ease-out
            ${isActive || open ? "w-full" : "w-0 group-hover:w-full"}
          `}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`
          absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[540px]
          bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60
          ring-1 ring-navy/5 overflow-hidden
          transition-all duration-300 ease-out origin-top
          ${open ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"}
        `}
        role="menu"
      >
        {/* Header */}
        <div className="px-5 py-3 border-b border-border/60 flex items-center justify-between">
          <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
            Unsere Leistungen
          </p>
          <Link
            href="/anfrage"
            onClick={() => { setOpen(false); onNavigate(); }}
            className="text-xs font-semibold text-brand hover:text-brand-dark transition-colors flex items-center gap-1"
          >
            Alle anfragen <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-0.5 p-2">
          {SERVICES.map(({ label, href, icon: Icon, desc }) => {
            const isItemActive = activeHref === href;
            return (
              <Link
                key={href}
                href={href}
                role="menuitem"
                onClick={() => { setOpen(false); onNavigate(); }}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl text-left
                  transition-all duration-200 group
                  ${isItemActive
                    ? "bg-brand/8 text-navy"
                    : "hover:bg-muted text-foreground/75 hover:text-navy"
                  }
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
                {isItemActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mx-2 mb-2 p-3 rounded-xl bg-navy text-white flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Kostenlose Offerte</p>
            <p className="text-xs text-white/60">Antwort in 24 Stunden</p>
          </div>
          <Link
            href="/anfrage"
            onClick={() => { setOpen(false); onNavigate(); }}
            className="bg-brand hover:bg-brand-dark text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
          >
            Anfragen
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Navbar ────────────────────────────────────────────────────────── */
export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Close mobile menu on route change */
  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, []);

  const isServiceActive = SERVICES.some((s) => s.href === pathname);

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
              aria-label="D'Namar Reinigungsdienst Basel – Startseite"
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
            <nav
              aria-label="Hauptnavigation"
              className="hidden lg:flex items-center gap-5"
            >
              {NAV_LINKS.slice(0, 1).map(({ href, label }) => (
                <NavLink key={href} href={href} label={label} active={pathname === href} />
              ))}

              <ServicesDropdown activeHref={pathname} onNavigate={closeMobile} />

              {NAV_LINKS.slice(1).map(({ href, label }) => (
                <NavLink key={href} href={href} label={label} active={pathname === href} />
              ))}
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              <Link
                href="/kontakt"
                className="text-sm font-medium text-navy/70 hover:text-navy transition-colors duration-300"
              >
                Kontakt
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
                Offerte anfordern
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-navy/70 hover:text-navy hover:bg-muted transition-all duration-200"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Menü schliessen" : "Menü öffnen"}
            >
              <span
                className={`absolute transition-all duration-300 ${mobileOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}
              >
                <X className="w-5 h-5" />
              </span>
              <span
                className={`absolute transition-all duration-300 ${mobileOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}
              >
                <Menu className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>

        {/* ── Mobile menu (CSS grid-rows animation) ── */}
        <div
          className={`
            lg:hidden border-t transition-all duration-300 ease-in-out overflow-hidden
            ${mobileOpen
              ? "border-border/50 max-h-[85vh] opacity-100"
              : "border-transparent max-h-0 opacity-0"
            }
          `}
          aria-hidden={!mobileOpen}
        >
          <div className="bg-white/95 backdrop-blur-xl overflow-y-auto max-h-[calc(85vh-1px)]">
            <nav className="section-container py-4 flex flex-col gap-0.5" aria-label="Mobile Navigation">

              {/* Home */}
              <MobileNavLink
                href="/"
                label="Startseite"
                active={pathname === "/"}
                onClick={closeMobile}
              />

              {/* Leistungen accordion */}
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
                    Leistungen
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Accordion inner */}
                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${mobileServicesOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <div className="pl-3 pb-1 pt-0.5 flex flex-col gap-0.5">
                    {SERVICES.map(({ label, href, icon: Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={closeMobile}
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                          transition-all duration-200
                          ${pathname === href
                            ? "bg-brand/10 text-navy font-semibold"
                            : "text-foreground/65 hover:text-navy hover:bg-muted"
                          }
                        `}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${pathname === href ? "text-brand" : "text-foreground/35"}`} />
                        {label}
                        {pathname === href && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand" />}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Other links */}
              {NAV_LINKS.slice(1).map(({ href, label }) => (
                <MobileNavLink
                  key={href}
                  href={href}
                  label={label}
                  active={pathname === href}
                  onClick={closeMobile}
                />
              ))}
              <MobileNavLink
                href="/kontakt"
                label="Kontakt"
                active={pathname === "/kontakt"}
                onClick={closeMobile}
              />

              {/* Mobile CTA */}
              <div className="pt-3 pb-2">
                <Link
                  href="/anfrage"
                  onClick={closeMobile}
                  className="btn-primary w-full justify-center text-sm py-3.5"
                >
                  Offerte anfordern
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy/20 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
          onClick={closeMobile}
        />
      )}
    </>
  );
}

/* ─── Mobile nav link ────────────────────────────────────────────────────── */
function MobileNavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium
        transition-all duration-200
        ${active
          ? "bg-brand/8 text-navy"
          : "text-navy/70 hover:text-navy hover:bg-muted"
        }
      `}
    >
      {active && <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />}
      {label}
    </Link>
  );
}
