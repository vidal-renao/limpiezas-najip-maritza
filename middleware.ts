import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Combined middleware:
 * 1. All /admin/* requests are handled here — never forwarded to next-intl.
 *    - /admin/login  → always allow (no cookie required)
 *    - /admin/*      → require admin_token cookie == ADMIN_SECRET
 * 2. Everything else goes through next-intl locale routing.
 *
 * The matcher explicitly excludes /admin so the intl regex never matches it,
 * but we still guard it in the function body as defence-in-depth.
 */
export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Admin routes ────────────────────────────────────────────────────────────
  // Handled entirely here; never passed to intlMiddleware so next-intl cannot
  // redirect /admin/login → /de/admin/login.
  if (pathname.startsWith("/admin")) {
    // Login page is always accessible
    if (pathname.startsWith("/admin/login")) {
      return NextResponse.next();
    }

    // All other admin pages require a valid session cookie
    const token = req.cookies.get("admin_token")?.value;
    const secret = process.env.ADMIN_SECRET;

    if (!secret || token !== secret) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // ── Public routes ────────────────────────────────────────────────────────────
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Admin routes (handled above — excluded from the intl regex below)
    "/admin/:path*",
    // next-intl: exclude api, admin, angebot-infrastruktur, _next, _vercel, and static files
    "/((?!api|admin|angebot-infrastruktur|_next|_vercel|.*\\..*).*)",
  ],
};
