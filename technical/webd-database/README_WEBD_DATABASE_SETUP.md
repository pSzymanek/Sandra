# Konfiguracja bazy rezerwacji na WEBD

Ta instrukcja dotyczy osobnej bazy MySQL/MariaDB dla systemu rezerwacji. Nie używaj bazy WordPressa do rezerwacji.

## Kroki

1. Utwórz w panelu WEBD osobną bazę MySQL/MariaDB dla rezerwacji.
2. Zapisz host, nazwę bazy, użytkownika i hasło z panelu WEBD.
3. Uzupełnij zmienne środowiskowe aplikacji:

```env
DB_HOST=mysqlhost
DB_PORT=3306
DB_NAME=nazwa_bazy_rezerwacji
DB_USER=uzytkownik_bazy
DB_PASSWORD=haslo_bazy
DB_SSL=false
```

Konkretne dane należy przepisać z panelu WEBD. `mysqlhost` jest przykładową wartością często spotykaną na hostingu współdzielonym.

4. Uruchom `schema.sql` na pustej bazie.
5. Uruchom `seed.sql`, żeby dodać Sandrę Anczarską jako pierwszego specjalistę i przykładowe sloty testowe.
6. Przed produkcją usuń albo zmień testowe sloty z `seed.sql`.
7. Uruchom skrypt `scripts/test-db-connection.js` po uzupełnieniu `.env`.
8. Skonfiguruj SMTP w `.env`.
9. Wygeneruj hash hasła administratora skryptem `scripts/generate-admin-password-hash.js` i wpisz go do `.env`.
10. Sprawdź `/panel`, `/rezerwacja` oraz testową rezerwację.

## Ważne

- WordPress jest przewidziany wyłącznie dla bloga i treści.
- Rezerwacje, terminy i panel administratora korzystają z osobnej bazy.
- System nie zapisuje PESEL, adresu, diagnoz, opisów problemu ani notatek terapeutycznych.
- Finalne treści regulaminu i polityki prywatności powinny zostać zatwierdzone przez właściciela strony lub prawnika.
