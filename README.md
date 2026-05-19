# D'Namar GmbH — AI-Powered SaaS Infrastructure (Basel, Switzerland)

> **Production-grade cleaning service platform** built with a fullstack AI-assisted architecture. Scalable, multilingual, and optimized for Swiss local SEO — achieving **100/100 Lighthouse scores** across all metrics.

---

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Nodemailer](https://img.shields.io/badge/Email-Nodemailer_SMTP-22C55E?logo=maildotru&logoColor=white)](https://nodemailer.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![i18n](https://img.shields.io/badge/i18n-DE%20%7C%20EN%20%7C%20ES-4caf82)](https://next-intl-docs.vercel.app)
[![Swiss DSG](https://img.shields.io/badge/Compliance-Swiss_DSG-D52B1E?logo=shield&logoColor=white)](https://www.admin.ch/opc/de/classified-compilation/19920153/index.html)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F100-success?logo=googlechrome)](https://pagespeed.web.dev)

---

## Business Context

**D'Namar GmbH** is a professional cleaning company based in Basel, Switzerland. This platform replaces a static brochure site with a fully dynamic, SEO-first web application — an AI-powered SaaS infrastructure capable of handling multi-channel client acquisition (organic search, WhatsApp, contact forms, and review submissions) without a traditional CMS.

**Architecture highlights:**

- **Swiss DSG compliant** — zero tracking cookies, no third-party analytics, data stays in Switzerland
- **Decentralized Swiss hosting** — transactional email delivered via NOVATREND (mail.dnamar.ch), a Swiss provider with SSL/TLS and SPF/DKIM alignment on the `dnamar.ch` domain
- **AI-assisted development** — fullstack architecture designed and implemented with Claude (Anthropic), enabling senior-quality output at SME velocity

**Live site:** [dnamar.ch](https://dnamar.ch)  
**Repository:** [github.com/vidal-renao/limpiezas-najip-maritza](https://github.com/vidal-renao/limpiezas-najip-maritza)

---

## Key Features

### Business-Critical Systems

| Feature | Description |
| --- | --- |
| **Multi-channel Contact** | Dual API routes (`/api/contact`, `/api/anfrage`) with XSS sanitization and HTML email via Nodemailer SMTP |
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

```text
app/
├── [locale]/               # SSG routes (66 pages across 3 locales)
│   ├── page.tsx            # Homepage — FAQ, Maps, Reviews, Hero
│   ├── blog/               # Blog index + 2 article pages
│   ├── referenzen/         # Client references + live review submission
│   ├── kontakt/            # Contact form (SMTP native)
│   ├── anfrage/            # Quote request form (SMTP native)
│   ├── impressum/          # Swiss legal notice (GmbH, full address)
│   ├── datenschutz/        # Swiss DSG-compliant privacy policy
│   ├── tiefenreinigung/    # Deep cleaning service page
│   ├── praxisreinigung/    # Medical practice cleaning page
│   └── renovationsreinigung/ # Post-renovation cleaning page
├── api/
│   ├── contact/route.ts    # Contact form → Nodemailer SMTP (XSS-hardened)
│   ├── anfrage/route.ts    # Quote form → Nodemailer SMTP (XSS-hardened)
│   └── review/route.ts     # Review submission → Supabase + moderation inbox
lib/
├── mailer.ts               # Nodemailer SMTP transporter factory (NOVATREND, port 465 SSL)
├── supabase.ts             # Supabase client (public, anon)
└── supabase-server.ts      # Supabase server client (service role, admin ops)
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
| --- | --- | --- |
| **Framework** | Next.js 16.2 (App Router) | SSG + server API routes |
| **Language** | TypeScript 5 (strict) | Zero `any` — full type safety |
| **Styling** | Tailwind CSS 4 | Mobile-first, Swiss design system |
| **i18n** | next-intl 4.x | Locale routing, typed translations |
| **Email** | Nodemailer 8.x (SMTP SSL) | Swiss-hosted transactional email via NOVATREND |
| **Database** | Supabase (PostgreSQL) | Review storage, admin moderation |
| **Icons** | Lucide-react | Consistent SVG icon system |
| **Images** | next/image | Automatic AVIF/WebP + lazy loading |
| **Deploy** | Vercel Edge Network | Zero-config CI/CD from `main` |

---

## Email Infrastructure

Transactional email is delivered via **Nodemailer** over a native SMTP connection to **NOVATREND** (Swiss hosting provider), replacing the previous Resend integration.

| Parameter | Value |
| --- | --- |
| **SMTP Host** | `mail.dnamar.ch` |
| **Port** | `465` (SSL/TLS) |
| **Sender** | `"Web Dnamar" <info@dnamar.ch>` |
| **SPF/DKIM** | Aligned to `dnamar.ch` domain |
| **Data residency** | Switzerland |

This architecture ensures full control over the email delivery pipeline with no third-party email SaaS dependency — compliant with Swiss DSG data sovereignty requirements.

---

## Security

- **XSS hardening:** `escapeHtml()` utility applied to all user inputs before HTML email composition (contact, anfrage, review routes)
- **No secrets in repo:** `.env*` wildcard in `.gitignore`; `.env.example` documents required vars
- **API routes unlisted:** `robots.txt` disallows `/api/` crawling
- **No tracking cookies:** Swiss DSG compliant — zero third-party analytics
- **Native SMTP:** Email credentials scoped to NOVATREND — no external API keys in the transactional flow

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
| --- | --- |
| `SMTP_HOST` | SMTP server hostname (e.g. `mail.dnamar.ch`) |
| `SMTP_PORT` | SMTP port — `465` for SSL/TLS |
| `SMTP_USER` | SMTP login username (e.g. `info@dnamar.ch`) |
| `SMTP_PASSWORD` | SMTP account password |
| `CONTACT_EMAIL` | Destination for form submissions (default: `info@dnamar.ch`) |

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
2. Set the following in **Project Settings → Environment Variables**:
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`
   - `CONTACT_EMAIL`
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (admin ops only)
   - `ADMIN_SECRET`
3. Push to `main` — Vercel deploys automatically

---

## Performance

Lighthouse audit (mobile + desktop) — [pagespeed.web.dev](https://pagespeed.web.dev/report?url=https://dnamar.ch):

| Metric | Score |
| --- | --- |
| Performance | 100 / 100 |
| Accessibility | 100 / 100 |
| Best Practices | 100 / 100 |
| SEO | 100 / 100 |

**SEO structured data:** JSON-LD schemas for `LocalBusiness`, `Service`, `FAQPage`, `AggregateRating`, `Blog`, and `BlogPosting` — enabling rich results in Google Search for Basel cleaning queries.

---

## Client

**D'Namar GmbH**  
Wiesenstrasse 14, 4057 Basel, Switzerland  
+41 79 252 75 57 · +41 78 241 00 31 · [info@dnamar.ch](mailto:info@dnamar.ch)

---

## Built by

**[VIDAL ECOSYSTEM](https://github.com/vidal-renao)** — Fullstack development & AI-powered product engineering.
