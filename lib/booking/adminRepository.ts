import { type RowDataPacket } from "mysql2/promise";

import { getPool, isDatabaseConfigured } from "@/lib/db/client";

export interface AdminUpcomingBooking {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  appointment_type: string;
  status: string;
  start_at: string;
  specialist_name: string;
}

export async function getAdminDashboard() {
  if (!isDatabaseConfigured()) {
    return { upcomingBookings: [] as AdminUpcomingBooking[], bookingsThisWeek: 0, availableSlots: 0 };
  }

  const pool = getPool();
  const [upcomingBookings] = await pool.execute<RowDataPacket[]>(
    `SELECT b.id, b.first_name, b.last_name, b.email, b.phone, b.appointment_type, b.status,
            s.start_at, sp.name AS specialist_name
     FROM bookings b
     JOIN availability_slots s ON s.id = b.slot_id
     JOIN specialists sp ON sp.id = b.specialist_id
     WHERE s.start_at >= NOW()
     ORDER BY s.start_at ASC
     LIMIT 10`,
  );
  const [weekRows] = await pool.execute<RowDataPacket[]>(
    "SELECT COUNT(*) AS count FROM bookings WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)",
  );
  const [slotRows] = await pool.execute<RowDataPacket[]>(
    "SELECT COUNT(*) AS count FROM availability_slots WHERE status = 'available' AND start_at >= NOW()",
  );

  return {
    upcomingBookings: upcomingBookings as AdminUpcomingBooking[],
    bookingsThisWeek: Number(weekRows[0]?.count ?? 0),
    availableSlots: Number(slotRows[0]?.count ?? 0),
  };
}
