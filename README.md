# D'Namar GmbH — Website

Professional cleaning service website for Basel, Switzerland.
Built with Next.js 16 (App Router), Tailwind CSS 4, and next-intl.

## Stack

- **Framework:** Next.js 16 (App Router, SSG)
- **Styling:** Tailwind CSS 4
- **i18n:** next-intl (de / en / es)
- **Email:** Resend API
- **Icons:** Lucide-react

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `CONTACT_EMAIL` | Destination email for form submissions (default: `info@dnamar.ch`) |

> The sending domain `dnamar.ch` must be verified in the Resend dashboard.

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Production build

```bash
npm run build
npm run start
```

## Contact channels

| Channel | Value |
|---------|-------|
| Tel. 1 | +41 79 252 75 57 |
| Tel. 2 | +41 78 241 00 31 |
| Email | info@dnamar.ch |
| WhatsApp | wa.me/41792527557 |

## Deploy

Recommended: [Vercel](https://vercel.com). Set `RESEND_API_KEY` and `CONTACT_EMAIL` in the Vercel project environment variables.
