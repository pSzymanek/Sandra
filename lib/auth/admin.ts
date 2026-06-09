import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const cookieName = "sandra_admin_session";
const sessionMaxAge = 60 * 60 * 8;

export function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const iterations = 120000;
  const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256").toString("hex");
  return `pbkdf2$${iterations}$${salt}$${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [algorithm, iterationsRaw, salt, hash] = storedHash.split("$");
  if (algorithm !== "pbkdf2" || !iterationsRaw || !salt || !hash) return false;

  const calculated = pbkdf2Sync(password, salt, Number(iterationsRaw), 32, "sha256").toString("hex");
  return timingSafeEqual(Buffer.from(calculated, "hex"), Buffer.from(hash, "hex"));
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "development-only-session-secret-change-me";
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

export function createSessionValue(username: string) {
  const expiresAt = Date.now() + sessionMaxAge * 1000;
  const payload = Buffer.from(JSON.stringify({ username, expiresAt })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionValue(value?: string) {
  if (!value) return false;
  const [payload, signature] = value.split(".");
  if (!payload || !signature || sign(payload) !== signature) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { expiresAt?: number };
    return typeof parsed.expiresAt === "number" && parsed.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export function setAdminSession(username: string) {
  cookies().set(cookieName, createSessionValue(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: sessionMaxAge,
    path: "/",
  });
}

export function clearAdminSession() {
  cookies().delete(cookieName);
}

export function isAdminAuthenticated() {
  return verifySessionValue(cookies().get(cookieName)?.value);
}

export function getAdminCookieName() {
  return cookieName;
}
