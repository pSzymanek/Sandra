import { NextRequest, NextResponse } from "next/server";

import { createBooking } from "@/lib/booking/repository";
import type { BookingInput } from "@/lib/booking/types";
import { sendBookingEmails } from "@/lib/mail/bookingEmails";

const recentRequests = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const requests = (recentRequests.get(ip) ?? []).filter((time) => now - time < windowMs);
  requests.push(now);
  recentRequests.set(ip, requests);
  return requests.length > 8;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Spróbuj ponownie za chwilę." }, { status: 429 });
  }

  try {
    const input = (await request.json()) as BookingInput;
    const booking = await createBooking(input);

    try {
      await sendBookingEmails(booking, input);
    } catch (error) {
      console.error("Booking email failed", error);
    }

    return NextResponse.json({ booking });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Nie udało się przyjąć rezerwacji.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

