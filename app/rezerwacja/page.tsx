import type { Metadata } from "next";

import { BookingForm } from "@/components/common/BookingForm";
import { FloatingActions } from "@/components/common/FloatingActions";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Rezerwacja wizyty",
  description: "Umów konsultację psychologiczną lub psychoterapeutyczną w Mysłowicach albo online.",
  alternates: { canonical: "/rezerwacja" },
  openGraph: {
    title: "Rezerwacja wizyty | Sandra Anczarska",
    description: "Umów konsultację psychologiczną lub psychoterapeutyczną w Mysłowicach albo online.",
    url: "/rezerwacja",
  },
};

export default function ReservationPage() {
  return (
    <div className="relative overflow-hidden">
      <Header />
      <FloatingActions />
      <main>
        <section className="border-b border-border/60 py-14 md:py-20">
          <div className="container max-w-4xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary/85">Rezerwacja</p>
            <h1 className="font-display text-5xl leading-tight md:text-6xl">Umów wizytę</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Wybierz specjalistę, typ wizyty oraz dostępny termin. Formularz zbiera wyłącznie dane potrzebne do obsługi rezerwacji.
            </p>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container max-w-5xl">
            <BookingForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

