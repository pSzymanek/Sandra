"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { AvailabilitySlot, Specialist } from "@/lib/booking/types";

type BookingStep = "specialist" | "type" | "slot" | "details" | "success";

function formatSlot(value: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Warsaw",
  }).format(new Date(value));
}

export function BookingForm() {
  const [step, setStep] = useState<BookingStep>("specialist");
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [specialistId, setSpecialistId] = useState<number | null>(null);
  const [appointmentType, setAppointmentType] = useState("");
  const [slotId, setSlotId] = useState<number | null>(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", website: "" });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [contactConsent, setContactConsent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ startAt: string; appointmentType: string; specialistName: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/specialists")
      .then((response) => response.json())
      .then((data: { specialists: Specialist[] }) => {
        setSpecialists(data.specialists);
        if (data.specialists[0]) setSpecialistId(data.specialists[0].id);
      })
      .catch(() => setSpecialists([]));
  }, []);

  useEffect(() => {
    if (!specialistId) return;
    fetch(`/api/availability?specialistId=${specialistId}`)
      .then((response) => response.json())
      .then((data: { slots: AvailabilitySlot[] }) => setSlots(data.slots))
      .catch(() => setSlots([]));
  }, [specialistId]);

  const selectedSpecialist = useMemo(
    () => specialists.find((specialist) => specialist.id === specialistId) ?? specialists[0],
    [specialistId, specialists],
  );

  async function submitBooking() {
    if (!specialistId || !slotId || !appointmentType) return;
    setLoading(true);
    setError("");

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        specialistId,
        slotId,
        appointmentType,
        ...form,
        termsAccepted,
        privacyAccepted,
        contactConsent,
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? "Nie udało się przyjąć rezerwacji.");
      return;
    }

    setSuccess(data.booking);
    setStep("success");
  }

  return (
    <div className="rounded-[2rem] border border-border/70 bg-card/92 p-5 shadow-panel md:p-8">
      <div className="mb-8 grid gap-2 text-sm font-medium text-muted-foreground md:grid-cols-5">
        {["Specjalista", "Typ wizyty", "Termin", "Dane", "Potwierdzenie"].map((label, index) => (
          <div key={label} className="rounded-full border border-border/60 bg-background/70 px-3 py-2 text-center">
            {index + 1}. {label}
          </div>
        ))}
      </div>

      {step === "specialist" ? (
        <section>
          <h2 className="font-display text-3xl">Wybierz specjalistę</h2>
          <div className="mt-5 grid gap-4">
            {specialists.map((specialist) => (
              <button
                key={specialist.id}
                type="button"
                onClick={() => setSpecialistId(specialist.id)}
                className={`rounded-3xl border p-5 text-left transition ${specialistId === specialist.id ? "border-primary bg-primary/8" : "border-border bg-background/70 hover:border-primary/50"}`}
              >
                <span className="block font-display text-2xl">{specialist.name}</span>
                <span className="mt-2 block text-muted-foreground">{specialist.bio}</span>
                <span className="mt-3 flex flex-wrap gap-2">
                  {specialist.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs uppercase tracking-[0.12em] text-primary">
                      {tag}
                    </span>
                  ))}
                </span>
              </button>
            ))}
          </div>
          <Button className="mt-6" onClick={() => setStep("type")}>Dalej</Button>
        </section>
      ) : null}

      {step === "type" && selectedSpecialist ? (
        <section>
          <h2 className="font-display text-3xl">Wybierz typ wizyty</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {selectedSpecialist.appointmentTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setAppointmentType(type)}
                className={`rounded-2xl border px-4 py-5 text-left transition ${appointmentType === type ? "border-primary bg-primary/8" : "border-border bg-background/70 hover:border-primary/50"}`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <Button variant="outline" onClick={() => setStep("specialist")}>Wstecz</Button>
            <Button onClick={() => setStep("slot")} disabled={!appointmentType}>Dalej</Button>
          </div>
        </section>
      ) : null}

      {step === "slot" ? (
        <section>
          <h2 className="font-display text-3xl">Wybierz termin</h2>
          {slots.length > 0 ? (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {slots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSlotId(slot.id)}
                  className={`rounded-2xl border px-4 py-4 text-left transition ${slotId === slot.id ? "border-primary bg-primary/8" : "border-border bg-background/70 hover:border-primary/50"}`}
                >
                  {formatSlot(slot.startAt)}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-5 rounded-2xl border border-border/70 bg-background/70 p-5 text-muted-foreground">
              Aktualnie nie ma dostępnych terminów w kalendarzu. W sprawie wizyty można skontaktować się z gabinetem.
            </p>
          )}
          <div className="mt-6 flex gap-3">
            <Button variant="outline" onClick={() => setStep("type")}>Wstecz</Button>
            <Button onClick={() => setStep("details")} disabled={!slotId}>Dalej</Button>
          </div>
        </section>
      ) : null}

      {step === "details" ? (
        <section>
          <h2 className="font-display text-3xl">Dane kontaktowe</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              ["firstName", "Imię"],
              ["lastName", "Nazwisko"],
              ["email", "Adres e-mail"],
              ["phone", "Numer telefonu"],
            ].map(([name, label]) => (
              <label key={name} className="grid gap-2 text-sm font-medium">
                {label}
                <input
                  className="h-12 rounded-2xl border border-border bg-background px-4 outline-none focus:ring-2 focus:ring-ring"
                  value={form[name as keyof typeof form]}
                  onChange={(event) => setForm((current) => ({ ...current, [name]: event.target.value }))}
                />
              </label>
            ))}
            <label className="hidden">
              Strona internetowa
              <input value={form.website} onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))} />
            </label>
          </div>

          <div className="mt-5 space-y-3 text-sm text-muted-foreground">
            <label className="flex gap-3"><input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} /> Akceptuję <Link className="text-primary" href="/regulamin-rezerwacji">regulamin rezerwacji wizyt</Link>.</label>
            <label className="flex gap-3"><input type="checkbox" checked={privacyAccepted} onChange={(e) => setPrivacyAccepted(e.target.checked)} /> Zapoznałem/am się z <Link className="text-primary" href="/polityka-prywatnosci">polityką prywatności</Link>.</label>
            <label className="flex gap-3"><input type="checkbox" checked={contactConsent} onChange={(e) => setContactConsent(e.target.checked)} /> Wyrażam zgodę na kontakt w celu obsługi rezerwacji.</label>
          </div>

          {error ? <p className="mt-5 rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm text-foreground">{error}</p> : null}

          <div className="mt-6 flex gap-3">
            <Button variant="outline" onClick={() => setStep("slot")}>Wstecz</Button>
            <Button onClick={submitBooking} disabled={loading}>{loading ? "Rezerwuję..." : "Potwierdź rezerwację"}</Button>
          </div>
        </section>
      ) : null}

      {step === "success" && success ? (
        <section>
          <h2 className="font-display text-3xl">Rezerwacja została przyjęta</h2>
          <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/8 p-5 text-muted-foreground">
            <p><strong className="text-foreground">Specjalista:</strong> {success.specialistName}</p>
            <p><strong className="text-foreground">Termin:</strong> {formatSlot(success.startAt)}</p>
            <p><strong className="text-foreground">Typ wizyty:</strong> {success.appointmentType}</p>
            <p className="mt-4">Potwierdzenie zostało wysłane mailowo. Jeśli wiadomość nie dotrze, warto skontaktować się z gabinetem.</p>
          </div>
        </section>
      ) : null}

      <p className="mt-8 rounded-2xl border border-border/70 bg-background/70 p-4 text-sm leading-relaxed text-muted-foreground">
        System rezerwacji nie służy do kontaktu w sytuacji bezpośredniego zagrożenia życia lub zdrowia. W nagłych przypadkach zadzwoń pod numer 112.
      </p>
    </div>
  );
}


