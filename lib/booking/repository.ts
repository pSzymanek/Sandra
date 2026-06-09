import { type RowDataPacket } from "mysql2/promise";

import { getPool, isDatabaseConfigured } from "@/lib/db/client";
import type { AvailabilitySlot, BookingInput, BookingResult, Specialist } from "./types";

const defaultSpecialist: Specialist = {
  id: 1,
  name: "Sandra Anczarska",
  slug: "sandra-anczarska",
  bio: "Psycholog, psychoterapeutka Gestalt w procesie szkolenia.",
  photoUrl: "/images/sandra-anczarska.jpg",
  tags: ["psychoterapia", "konsultacja psychologiczna", "Gestalt"],
  appointmentTypes: ["Konsultacja psychoterapeutyczna", "Psychoterapia indywidualna", "Konsultacja online"],
  notificationEmail: null,
  isActive: true,
};

function parseJsonArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string");
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function mapSpecialist(row: RowDataPacket): Specialist {
  return {
    id: Number(row.id),
    name: String(row.name),
    slug: String(row.slug),
    bio: String(row.bio ?? ""),
    photoUrl: row.photo_url ? String(row.photo_url) : null,
    tags: parseJsonArray(row.tags),
    appointmentTypes: parseJsonArray(row.appointment_types),
    notificationEmail: row.notification_email ? String(row.notification_email) : null,
    isActive: Boolean(row.is_active),
  };
}

function mapSlot(row: RowDataPacket): AvailabilitySlot {
  return {
    id: Number(row.id),
    specialistId: Number(row.specialist_id),
    startAt: new Date(row.start_at).toISOString(),
    endAt: new Date(row.end_at).toISOString(),
    status: row.status,
    allowedAppointmentTypes: parseJsonArray(row.allowed_appointment_types),
  };
}

export async function getActiveSpecialists(): Promise<Specialist[]> {
  if (!isDatabaseConfigured()) return [defaultSpecialist];

  const [rows] = await getPool().execute<RowDataPacket[]>(
    "SELECT * FROM specialists WHERE is_active = 1 ORDER BY name ASC",
  );
  return rows.map(mapSpecialist);
}

export async function getAvailableSlots(specialistId: number): Promise<AvailabilitySlot[]> {
  if (!isDatabaseConfigured()) return [];

  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT * FROM availability_slots
     WHERE specialist_id = ? AND status = 'available' AND start_at >= NOW()
     ORDER BY start_at ASC
     LIMIT 120`,
    [specialistId],
  );
  return rows.map(mapSlot);
}

export function validateBookingInput(input: BookingInput): string | null {
  if (input.website) return "Nie udało się przyjąć rezerwacji.";
  if (!input.firstName.trim() || !input.lastName.trim()) return "Podaj imię i nazwisko.";
  if (!/^\S+@\S+\.\S+$/.test(input.email)) return "Podaj poprawny adres e-mail.";
  if (!/^[+0-9 ()-]{6,20}$/.test(input.phone)) return "Podaj poprawny numer telefonu.";
  if (!input.termsAccepted || !input.privacyAccepted || !input.contactConsent) {
    return "Zaznacz wymagane zgody.";
  }
  if (!input.specialistId || !input.slotId || !input.appointmentType) return "Wybierz termin i typ wizyty.";
  return null;
}

export async function createBooking(input: BookingInput): Promise<BookingResult> {
  const validationError = validateBookingInput(input);
  if (validationError) throw new Error(validationError);
  if (!isDatabaseConfigured()) throw new Error("Aktualnie nie można przyjąć rezerwacji online.");

  const connection = await getPool().getConnection();
  try {
    await connection.beginTransaction();

    const [slotRows] = await connection.execute<RowDataPacket[]>(
      `SELECT s.*, sp.name AS specialist_name, sp.notification_email
       FROM availability_slots s
       JOIN specialists sp ON sp.id = s.specialist_id
       WHERE s.id = ? AND s.specialist_id = ?
       FOR UPDATE`,
      [input.slotId, input.specialistId],
    );

    const slot = slotRows[0];
    if (!slot || slot.status !== "available") {
      throw new Error("Wybrany termin nie jest już dostępny.");
    }

    const allowedTypes = parseJsonArray(slot.allowed_appointment_types);
    if (allowedTypes.length > 0 && !allowedTypes.includes(input.appointmentType)) {
      throw new Error("Wybrany typ wizyty nie jest dostępny dla tego terminu.");
    }

    const nowSql = new Date().toISOString().slice(0, 19).replace("T", " ");
    const [bookingRows] = await connection.execute(
      `INSERT INTO bookings
       (specialist_id, slot_id, appointment_type, first_name, last_name, email, phone, status,
        privacy_accepted_at, terms_accepted_at, contact_consent_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'confirmed', ?, ?, ?)`,
      [
        input.specialistId,
        input.slotId,
        input.appointmentType,
        input.firstName.trim(),
        input.lastName.trim(),
        input.email.trim().toLowerCase(),
        input.phone.trim(),
        nowSql,
        nowSql,
        nowSql,
      ],
    );

    await connection.execute("UPDATE availability_slots SET status = 'booked' WHERE id = ?", [input.slotId]);
    await connection.commit();

    const insertId = Number((bookingRows as { insertId?: number }).insertId);
    return {
      id: insertId,
      specialistName: String(slot.specialist_name),
      appointmentType: input.appointmentType,
      startAt: new Date(slot.start_at).toISOString(),
      endAt: new Date(slot.end_at).toISOString(),
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

