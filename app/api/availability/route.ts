import { NextRequest, NextResponse } from "next/server";

import { getAvailableSlots } from "@/lib/booking/repository";

export async function GET(request: NextRequest) {
  const specialistId = Number(request.nextUrl.searchParams.get("specialistId"));
  if (!specialistId) return NextResponse.json({ slots: [] });

  try {
    return NextResponse.json({ slots: await getAvailableSlots(specialistId) });
  } catch {
    return NextResponse.json({ slots: [] });
  }
}

