import { NextResponse } from "next/server";

import { getActiveSpecialists } from "@/lib/booking/repository";

export async function GET() {
  try {
    return NextResponse.json({ specialists: await getActiveSpecialists() });
  } catch {
    return NextResponse.json({ specialists: [] });
  }
}

