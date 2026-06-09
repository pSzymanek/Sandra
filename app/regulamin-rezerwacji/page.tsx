import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Regulamin rezerwacji wizyt",
  description: "Zasady korzystania z systemu rezerwacji wizyt.",
  alternates: { canonical: "/regulamin-rezerwacji" },
};

const sections = [
  ["Czym jest system rezerwacji", "System rezerwacji umożliwia wybór dostępnego terminu konsultacji oraz przekazanie danych kontaktowych potrzebnych do obsługi wizyty."],
  ["Zasady umawiania wizyt", "Rezerwacji dokonuje osoba zainteresowana konsultacją lub jej opiekun prawny. Termin zostaje przyjęty po poprawnym przesłaniu formularza i otrzymaniu potwierdzenia."],
  ["Dane wymagane do rezerwacji", "Formularz zbiera wyłącznie podstawowe dane kontaktowe: imię, nazwisko, adres e-mail oraz numer telefonu. System nie służy do przekazywania informacji medycznych."],
  ["Potwierdzenie rezerwacji", "Po dokonaniu rezerwacji na podany adres e-mail może zostać wysłane potwierdzenie zawierające termin, typ wizyty oraz imię i nazwisko specjalisty."],
  ["Zmiana lub odwołanie terminu", "W celu zmiany lub odwołania wizyty należy skontaktować się z gabinetem z odpowiednim wyprzedzeniem."],
  ["Kontakt z gabinetem", "Kontakt w sprawach organizacyjnych odbywa się poprzez dane kontaktowe wskazane na stronie internetowej gabinetu."],
  ["Sytuacje nagłe", "System rezerwacji nie służy do kontaktu w sytuacji bezpośredniego zagrożenia życia lub zdrowia. W nagłych przypadkach należy zadzwonić pod numer 112."],
];

export default function TermsPage() {
  return (
    <div>
      <Header />
      <main className="container max-w-3xl py-14 md:py-20">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary/85">Dokument</p>
        <h1 className="font-display text-5xl leading-tight">Regulamin rezerwacji wizyt</h1>
        <div className="mt-10 space-y-8 text-lg leading-relaxed text-muted-foreground">
          {sections.map(([title, content]) => (
            <section key={title}>
              <h2 className="font-display text-3xl text-foreground">{title}</h2>
              <p className="mt-3">{content}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
