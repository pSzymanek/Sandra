import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminLogoutButton } from "@/components/common/AdminLogoutButton";
import { isAdminAuthenticated } from "@/lib/auth/admin";
import { type AdminUpcomingBooking, getAdminDashboard } from "@/lib/booking/adminRepository";

export const metadata: Metadata = {
  title: "Panel administratora",
  robots: { index: false, follow: false },
};

export default async function AdminPanelPage() {
  if (!isAdminAuthenticated()) redirect("/panel/login");
  const dashboard = await getAdminDashboard();

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/85">Panel administratora</p>
            <h1 className="font-display text-5xl">Dashboard</h1>
          </div>
          <AdminLogoutButton />
        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-[2rem] border border-border/70 bg-card/92 p-6 shadow-panel">
            <p className="text-sm text-muted-foreground">Rezerwacje w ostatnich 7 dniach</p>
            <p className="mt-3 font-display text-5xl">{dashboard.bookingsThisWeek}</p>
          </div>
          <div className="rounded-[2rem] border border-border/70 bg-card/92 p-6 shadow-panel">
            <p className="text-sm text-muted-foreground">Wolne przyszłe terminy</p>
            <p className="mt-3 font-display text-5xl">{dashboard.availableSlots}</p>
          </div>
          <div className="rounded-[2rem] border border-border/70 bg-card/92 p-6 shadow-panel">
            <p className="text-sm text-muted-foreground">Najbliższe wizyty</p>
            <p className="mt-3 font-display text-5xl">{dashboard.upcomingBookings.length}</p>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-border/70 bg-card/92 p-6 shadow-panel">
          <h2 className="font-display text-3xl">Najbliższe wizyty</h2>
          {dashboard.upcomingBookings.length > 0 ? (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="text-muted-foreground">
                  <tr><th className="py-3">Termin</th><th>Klient</th><th>Typ wizyty</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {dashboard.upcomingBookings.map((booking: AdminUpcomingBooking) => (
                    <tr key={booking.id} className="border-t border-border/60">
                      <td className="py-3">{new Date(booking.start_at).toLocaleString("pl-PL")}</td>
                      <td>{booking.first_name} {booking.last_name}</td>
                      <td>{booking.appointment_type}</td>
                      <td>{booking.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 rounded-2xl border border-border/70 bg-background/70 p-5 text-muted-foreground">Brak najbliższych wizyt do wyświetlenia.</p>
          )}
        </section>
      </div>
    </main>
  );
}
