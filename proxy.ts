import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Combined middleware:
 * 1. Protects /admin/* routes (requires admin_token cookie == ADMIN_SECRET).
 * 2. Handles next-intl locale routing for all other public routes.
 */
export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin route protection — skip /admin/login itself
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = req.cookies.get("admin_token")?.value;
    const secret = process.env.ADMIN_SECRET;

    if (!secret || token !== secret) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Authenticated admin request — skip intl middleware
    return NextResponse.next();
  }

  // Default: next-intl locale routing
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Admin routes
    "/admin/:path*",
    // next-intl: skip API, _next, _vercel, and static files
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
