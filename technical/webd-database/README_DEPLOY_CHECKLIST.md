# Checklist przed publikacją

- [ ] Baza WordPressa jest oddzielna od bazy rezerwacji.
- [ ] Baza rezerwacji MySQL/MariaDB jest utworzona na WEBD.
- [ ] `.env` zawiera dane bazy, admina i SMTP.
- [ ] `schema.sql` został uruchomiony bez błędów.
- [ ] `seed.sql` został uruchomiony albo zastąpiony produkcyjnymi danymi.
- [ ] Testowe sloty zostały usunięte lub zastąpione prawdziwą dostępnością.
- [ ] `scripts/test-db-connection.js` potwierdza połączenie.
- [ ] SMTP działa.
- [ ] Hasło admina jest mocne, a w `.env` wpisany jest hash.
- [ ] Panel `/panel` wymaga logowania.
- [ ] Test double booking został wykonany.
- [ ] Formularz rezerwacji zapisuje tylko minimalne dane kontaktowe.
- [ ] Mail do klienta działa.
- [ ] Mail do terapeutki działa.
- [ ] Regulamin i polityka prywatności zostały zatwierdzone.
- [ ] Build, lint i typecheck przechodzą.
