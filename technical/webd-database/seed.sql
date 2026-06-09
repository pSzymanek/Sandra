INSERT INTO specialists (name, slug, bio, photo_url, tags, appointment_types, notification_email, is_active)
VALUES (
  'Sandra Anczarska',
  'sandra-anczarska',
  'Psycholog, psychoterapeutka Gestalt w procesie szkolenia.',
  '/images/sandra-anczarska.jpg',
  JSON_ARRAY('psychoterapia', 'konsultacja psychologiczna', 'Gestalt'),
  JSON_ARRAY('Konsultacja psychoterapeutyczna', 'Psychoterapia indywidualna', 'Konsultacja online'),
  NULL,
  1
)
ON DUPLICATE KEY UPDATE
  bio = VALUES(bio),
  photo_url = VALUES(photo_url),
  tags = VALUES(tags),
  appointment_types = VALUES(appointment_types),
  is_active = VALUES(is_active);

-- Testowe sloty można usunąć przed produkcją.
INSERT IGNORE INTO availability_slots (specialist_id, start_at, end_at, status, allowed_appointment_types)
SELECT id, '2026-07-01 10:00:00', '2026-07-01 10:50:00', 'available', JSON_ARRAY('Konsultacja psychoterapeutyczna', 'Psychoterapia indywidualna')
FROM specialists WHERE slug = 'sandra-anczarska';

INSERT IGNORE INTO availability_slots (specialist_id, start_at, end_at, status, allowed_appointment_types)
SELECT id, '2026-07-02 17:00:00', '2026-07-02 17:50:00', 'available', JSON_ARRAY('Konsultacja online')
FROM specialists WHERE slug = 'sandra-anczarska';
