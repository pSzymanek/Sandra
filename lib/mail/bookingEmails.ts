import nodemailer from "nodemailer";

import type { BookingInput, BookingResult } from "@/lib/booking/types";

function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.MAIL_FROM);
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Warsaw",
  }).format(new Date(value));
}

export async function sendBookingEmails(booking: BookingResult, input: BookingInput) {
  if (!isSmtpConfigured()) return;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
  });

  const when = formatDateTime(booking.startAt);
  const from = process.env.MAIL_FROM!;
  const adminTo = process.env.ADMIN_NOTIFICATION_EMAIL;

  await transporter.sendMail({
    from,
    to: input.email,
    subject: "Potwierdzenie rezerwacji wizyty",
    text: `Dziękuję za rezerwację wizyty.\n\nSpecjalista: ${booking.specialistName}\nTermin: ${when}\nTyp wizyty: ${booking.appointmentType}\n\nRegulamin rezerwacji: /regulamin-rezerwacji\nPolityka prywatności: /polityka-prywatnosci`,
  });

  if (adminTo) {
    await transporter.sendMail({
      from,
      to: adminTo,
      subject: "Nowa rezerwacja wizyty",
      text: `Nowa rezerwacja wizyty.\n\nKlient: ${input.firstName} ${input.lastName}\nE-mail: ${input.email}\nTelefon: ${input.phone}\nSpecjalista: ${booking.specialistName}\nTermin: ${when}\nTyp wizyty: ${booking.appointmentType}`,
    });
  }
}

