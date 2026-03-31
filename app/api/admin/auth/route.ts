import { NextRequest, NextResponse } from "next/server";

/** POST /api/admin/auth — validates password and sets the admin_token cookie. */
export async function POST(req: NextRequest) {
  const { password } = (await req.json()) as { password?: string };
  const secret = process.env.ADMIN_SECRET;

  if (!secret || !password || password !== secret) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}

/** DELETE /api/admin/auth — clears the admin_token cookie (logout). */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("admin_token");
  return res;
}
