import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Informacje o przetwarzaniu danych osobowych w związku z korzystaniem ze strony i rezerwacją wizyt.",
  alternates: { canonical: "/polityka-prywatnosci" },
};

const sections = [
  ["Administrator danych", "Administratorem danych jest podmiot prowadzący gabinet Sandry Anczarskiej, dostępny poprzez dane kontaktowe wskazane na stronie."],
  ["Zakres przetwarzanych danych", "W związku z rezerwacją wizyty przetwarzane mogą być: imię, nazwisko, adres e-mail, numer telefonu, wybrany termin, typ wizyty oraz zgody wymagane do obsługi rezerwacji."],
  ["Cel przetwarzania", "Dane są przetwarzane w celu obsługi rezerwacji, kontaktu organizacyjnego oraz realizacji obowiązków związanych z prowadzeniem gabinetu."],
  ["Podstawa przetwarzania", "Podstawą przetwarzania jest podjęcie działań na żądanie osoby dokonującej rezerwacji, zgoda na kontakt oraz prawnie uzasadniony interes administratora w obsłudze wizyt."],
  ["Czas przechowywania danych", "Dane są przechowywane przez okres niezbędny do obsługi rezerwacji oraz przez czas wymagany obowiązującymi przepisami lub uzasadnioną potrzebą organizacyjną."],
  ["Odbiorcy danych i dostawcy techniczni", "Dane mogą być przetwarzane przez dostawców hostingu, poczty e-mail oraz narzędzi technicznych potrzebnych do działania strony i systemu rezerwacji."],
  ["Prawa osoby, której dane dotyczą", "Osobie, której dane dotyczą, przysługuje prawo dostępu do danych, sprostowania, usunięcia, ograniczenia przetwarzania, sprzeciwu oraz wniesienia skargi do organu nadzorczego."],
  ["Kontakt w sprawie danych", "W sprawach dotyczących danych osobowych można skontaktować się z gabinetem poprzez dane kontaktowe wskazane na stronie."],
  ["Cookies", "Strona może wykorzystywać podstawowe pliki cookies niezbędne do działania serwisu oraz bezpieczeństwa panelu administracyjnego."],
];

export default function PrivacyPage() {
  return (
    <div>
      <Header />
      <main className="container max-w-3xl py-14 md:py-20">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary/85">Dokument</p>
        <h1 className="font-display text-5xl leading-tight">Polityka prywatności</h1>
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
