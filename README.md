# D'Namar GmbH — AI-Powered SaaS Infrastructure (Basel, Switzerland)

> **Production-grade cleaning service platform** built with a fullstack AI-assisted architecture. Scalable, multilingual, and optimized for Swiss local SEO — achieving **100/100 Lighthouse scores** across all metrics.

---

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![Resend](https://img.shields.io/badge/Email-Resend-000000?logo=mail&logoColor=white)](https://resend.com)
[![i18n](https://img.shields.io/badge/i18n-DE%20%7C%20EN%20%7C%20ES-4caf82)](https://next-intl-docs.vercel.app)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F100-success?logo=googlechrome)](https://pagespeed.web.dev)

---

## Overview

**D'Namar GmbH** is a professional cleaning company based in Basel, Switzerland. This platform replaces a static brochure site with a fully dynamic, SEO-first web application capable of handling multi-channel client acquisition (organic search, WhatsApp, contact forms, and review submissions) — all without a traditional CMS.

**Live site:** [dnamar.ch](https://dnamar.ch)
**Repository:** [github.com/vidal-renao/limpiezas-najip-maritza](https://github.com/vidal-renao/limpiezas-najip-maritza)

---

## Key Features

### Business-Critical Systems

| Feature | Description |
|---|---|
| **Multi-channel Contact** | Dual API routes (`/api/contact`, `/api/anfrage`) with XSS sanitization and HTML email via Resend |
| **Dynamic Review System** | Client reviews submitted via `/api/review`, routed to moderation inbox before publication |
| **WhatsApp Integration** | Floating CTA linked to `wa.me/41792527557` — primary conversion channel for Swiss mobile users |
| **FAQ Accordion** | Click-to-reveal answers (`FaqAccordion` component) — 9 localized Q&As, zero layout shift |
| **ScrollToTop Button** | SVG circular progress ring tracking scroll depth — smooth, animated, brand-consistent |

### Internationalization (i18n)

- **3 locales:** German (`de`, default), English (`en`), Spanish (`es`)
- **Scroll restoration:** `sessionStorage` preserves scroll position across locale switches — no jarring scroll-to-top
- **Locale routing:** `proxy.ts` convention (Next.js 16 standard, not deprecated `middleware.ts`)
- All 66 static pages pre-rendered at build time via `generateStaticParams`

### SEO & Performance

- **100/100 Lighthouse** — Performance, Accessibility, Best Practices, SEO
- **JSON-LD Schemas:** `LocalBusiness`, `Service`, `FAQPage`, `AggregateRating`, `Blog`, `BlogPosting`
- **Sitemap** auto-generated at `/sitemap.xml` with priority weights per page type
- **Robots.txt** disallows `/api/` — protects server routes from indexing
- **Kalkschutz** keyword strategy (Basel hard-water USP) woven into all water-related service pages

---

## Architecture

```
app/
├── [locale]/               # SSG routes (66 pages across 3 locales)
│   ├── page.tsx            # Homepage — FAQ, Maps, Reviews, Hero
│   ├── blog/               # Blog index + 2 article pages
│   ├── referenzen/         # Client references + live review submission
│   ├── kontakt/            # Contact form (Resend)
│   ├── anfrage/            # Quote request form (Resend)
│   ├── impressum/          # Swiss legal notice (GmbH, full address)
│   ├── datenschutz/        # Swiss DSG-compliant privacy policy
│   ├── tiefenreinigung/    # Deep cleaning service page
│   ├── praxisreinigung/    # Medical practice cleaning page
│   └── renovationsreinigung/ # Post-renovation cleaning page
├── api/
│   ├── contact/route.ts    # Contact form → Resend (XSS-hardened)
│   ├── anfrage/route.ts    # Quote form → Resend (XSS-hardened)
│   └── review/route.ts     # Review submission → moderation inbox
components/
├── ui/
│   ├── FaqAccordion.tsx    # Accessible accordion with brand transitions
│   ├── ScrollToTop.tsx     # SVG ring progress + scroll-to-top CTA
│   └── ReviewForm.tsx      # Star rating + anonymous submission
├── Navbar.tsx              # Language switcher with scroll restoration
└── AnfrageForm.tsx         # Multi-step quote request form
messages/
├── de.json                 # ~400 translation keys (German)
├── en.json                 # ~400 translation keys (English)
└── es.json                 # ~400 translation keys (Spanish)
```

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16.2 (App Router) | SSG + server API routes |
| **Language** | TypeScript 5 (strict) | Zero `any` — full type safety |
| **Styling** | Tailwind CSS 4 | Mobile-first, Swiss design system |
| **i18n** | next-intl 4.x | Locale routing, typed translations |
| **Email** | Resend API | Transactional email delivery |
| **Icons** | Lucide-react | Consistent SVG icon system |
| **Images** | next/image | Automatic AVIF/WebP + lazy loading |
| **Deploy** | Vercel Edge Network | Zero-config CI/CD from `main` |

---

## Security

- **XSS hardening:** `escapeHtml()` utility applied to all user inputs before HTML email composition (contact, anfrage, review routes)
- **No secrets in repo:** `.env*` wildcard in `.gitignore`; `.env.example` documents required vars
- **API routes unlisted:** `robots.txt` disallows `/api/` crawling
- **No tracking cookies:** Swiss DSG compliant — zero third-party analytics

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `CONTACT_EMAIL` | Destination for form submissions (default: `info@dnamar.ch`) |

> The sending domain `dnamar.ch` must be verified in the Resend dashboard.

### 3. Development server

```bash
npm run dev
# → http://localhost:3000
```

### 4. Production build

```bash
npm run build   # Verify: 66 pages, 0 errors, 0 warnings
npm run start
```

---

## Deploy to Vercel

1. Connect the GitHub repo to a Vercel project
2. Set `RESEND_API_KEY` and `CONTACT_EMAIL` in **Project Settings → Environment Variables**
3. Push to `main` — Vercel deploys automatically

---

## Client

**D'Namar GmbH**
Wiesenstrasse 14, 4057 Basel, Switzerland
+41 79 252 75 57 · +41 78 241 00 31 · info@dnamar.ch

---

## Built by

**[VIDAL ECOSYSTEM](https://github.com/vidal-renao)** — Fullstack development & AI-powered product engineering.
