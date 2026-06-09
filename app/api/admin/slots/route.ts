import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth/admin";

export async function GET() {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ slots: [] });
}

export async function POST() {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ ok: false, error: "Endpoint przygotowany pod zapis terminów po podłączeniu bazy." }, { status: 501 });
}
