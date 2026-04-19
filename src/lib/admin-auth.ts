import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "eds_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getAdminSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("Missing ADMIN_SESSION_SECRET environment variable.");
  }

  return secret;
}

function createSignature(payload: string) {
  return createHmac("sha256", getAdminSessionSecret()).update(payload).digest("hex");
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME ?? "",
    password: process.env.ADMIN_PASSWORD ?? "",
  };
}

export function createAdminSessionValue(username: string) {
  const issuedAt = Date.now().toString();
  const payload = `${username}:${issuedAt}`;
  const signature = createSignature(payload);

  return `${payload}:${signature}`;
}

export function verifyAdminSessionValue(sessionValue?: string | null) {
  if (!sessionValue) {
    return false;
  }

  const parts = sessionValue.split(":");
  if (parts.length !== 3) {
    return false;
  }

  const [username, issuedAt, signature] = parts;
  if (!username || !issuedAt || !signature) {
    return false;
  }

  const expectedSignature = createSignature(`${username}:${issuedAt}`);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }

  try {
    return timingSafeEqual(actualBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

export function getAdminSessionMaxAge() {
  return SESSION_MAX_AGE;
}
