import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";

const ADMIN_RATE_LIMIT_MAP = new Map<
  string,
  { count: number; resetAt: number; lockedUntil?: number }
>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 min
const LOCKOUT_MS = 30 * 60 * 1000; // 30 min after 5 failures

function checkLoginRateLimit(ip: string): {
  blocked: boolean;
  lockedOut: boolean;
} {
  const now = Date.now();
  const entry = ADMIN_RATE_LIMIT_MAP.get(ip);

  if (!entry || now > entry.resetAt) {
    ADMIN_RATE_LIMIT_MAP.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { blocked: false, lockedOut: false };
  }

  if (entry.lockedUntil && now < entry.lockedUntil) {
    return { blocked: true, lockedOut: true };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_MS;
    return { blocked: true, lockedOut: true };
  }

  entry.count++;
  return { blocked: false, lockedOut: false };
}

function resetLoginAttempts(ip: string) {
  ADMIN_RATE_LIMIT_MAP.delete(ip);
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { blocked, lockedOut } = checkLoginRateLimit(ip);
  if (blocked) {
    return NextResponse.json(
      {
        error: lockedOut
          ? "Trop de tentatives. Réessayez dans 30 minutes."
          : "Trop de requêtes.",
      },
      { status: 429 }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const { username, password } = body;

  if (
    !username ||
    !password ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    return NextResponse.json(
      { error: "Identifiants manquants." },
      { status: 400 }
    );
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminUsername || !adminPasswordHash) {
    console.error("Admin credentials not configured in environment.");
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }

  // Constant-time username comparison to prevent timing attacks
  const usernameMatch =
    username.length === adminUsername.length &&
    username === adminUsername;

  const passwordMatch = await compare(password, adminPasswordHash);

  if (!usernameMatch || !passwordMatch) {
    return NextResponse.json(
      { error: "Identifiants incorrects." },
      { status: 401 }
    );
  }

  resetLoginAttempts(ip);

  const session = await getAdminSession();
  session.isAdmin = true;
  session.username = adminUsername;
  session.loginAt = Date.now();
  await session.save();

  return NextResponse.json({ ok: true });
}
