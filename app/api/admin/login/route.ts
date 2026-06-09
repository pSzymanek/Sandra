import { NextRequest, NextResponse } from "next/server";

import { setAdminSession, verifyPassword } from "@/lib/auth/admin";

export async function POST(request: NextRequest) {
  const { username, password } = (await request.json()) as { username?: string; password?: string };
  const configuredUsername = process.env.ADMIN_USERNAME;
  const configuredHash = process.env.ADMIN_PASSWORD_HASH;

  if (!configuredUsername || !configuredHash || !username || !password) {
    return NextResponse.json({ error: "Nieprawidłowe dane logowania." }, { status: 401 });
  }

  if (username !== configuredUsername || !verifyPassword(password, configuredHash)) {
    return NextResponse.json({ error: "Nieprawidłowe dane logowania." }, { status: 401 });
  }

  setAdminSession(username);
  return NextResponse.json({ ok: true });
}
