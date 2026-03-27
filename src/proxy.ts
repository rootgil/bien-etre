import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getIronSession } from "iron-session";
import type { AdminSessionData } from "./lib/admin-session";
import { sessionOptions } from "./lib/admin-session";

const intlMiddleware = createMiddleware(routing);

// ─── Rate limiting ──────────────────────────────────────────────────────────

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;
const ipRequestMap = new Map<string, { count: number; resetAt: number }>();

const ADMIN_API_WINDOW_MS = 60_000;
const ADMIN_API_MAX = 5;
const adminApiMap = new Map<string, { count: number; resetAt: number }>();

function rateLimit(
  ip: string,
  map: Map<string, { count: number; resetAt: number }>,
  max: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const entry = map.get(ip);

  if (!entry || now > entry.resetAt) {
    map.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= max) return true;
  entry.count++;
  return false;
}

function getIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

// ─── Security headers ────────────────────────────────────────────────────────

function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  return response;
}

// ─── Admin session check (Edge-compatible) ───────────────────────────────────

async function isAdminAuthenticated(request: NextRequest): Promise<boolean> {
  try {
    const response = new NextResponse();
    const session = await getIronSession<AdminSessionData>(
      request,
      response,
      sessionOptions
    );
    return session.isAdmin === true;
  } catch {
    return false;
  }
}

// ─── Main proxy ──────────────────────────────────────────────────────────────

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const ip = getIp(request);

  // ── Admin API: strict rate limit (5 req/min, except login which has its own)
  if (
    pathname.startsWith("/api/admin/") &&
    pathname !== "/api/admin/login"
  ) {
    if (rateLimit(ip, adminApiMap, ADMIN_API_MAX, ADMIN_API_WINDOW_MS)) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }
  }

  // ── General API rate limit
  if (pathname.startsWith("/api/")) {
    if (rateLimit(ip, ipRequestMap, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }
    return NextResponse.next();
  }

  // ── Admin route guard: temporarily bypassed for development
  if (pathname.startsWith("/admin")) {
    return addSecurityHeaders(NextResponse.next());
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/api/:path*",
    "/admin/:path*",
    "/admin",
    "/",
    "/(fr|en)/:path*",
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
