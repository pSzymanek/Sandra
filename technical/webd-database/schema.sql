CREATE TABLE IF NOT EXISTS specialists (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(190) NOT NULL,
  slug VARCHAR(190) NOT NULL,
  bio TEXT NULL,
  photo_url VARCHAR(500) NULL,
  tags JSON NOT NULL,
  appointment_types JSON NOT NULL,
  notification_email VARCHAR(190) NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_specialists_slug (slug),
  KEY idx_specialists_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS availability_slots (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  specialist_id INT UNSIGNED NOT NULL,
  start_at DATETIME NOT NULL,
  end_at DATETIME NOT NULL,
  status ENUM('available','booked','blocked') NOT NULL DEFAULT 'available',
  allowed_appointment_types JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_slots_specialist (specialist_id),
  KEY idx_slots_start_at (start_at),
  KEY idx_slots_status (status),
  UNIQUE KEY uq_specialist_start (specialist_id, start_at),
  CONSTRAINT fk_slots_specialist FOREIGN KEY (specialist_id) REFERENCES specialists(id) ON DELETE CASCADE,
  CONSTRAINT chk_slot_time CHECK (end_at > start_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS bookings (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  specialist_id INT UNSIGNED NOT NULL,
  slot_id INT UNSIGNED NOT NULL,
  appointment_type VARCHAR(190) NOT NULL,
  first_name VARCHAR(120) NOT NULL,
  last_name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  status ENUM('confirmed','cancelled','completed','no_show') NOT NULL DEFAULT 'confirmed',
  privacy_accepted_at DATETIME NOT NULL,
  terms_accepted_at DATETIME NOT NULL,
  contact_consent_at DATETIME NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_booking_slot (slot_id),
  KEY idx_bookings_specialist (specialist_id),
  KEY idx_bookings_slot (slot_id),
  KEY idx_bookings_status (status),
  KEY idx_bookings_created_at (created_at),
  CONSTRAINT fk_bookings_specialist FOREIGN KEY (specialist_id) REFERENCES specialists(id) ON DELETE RESTRICT,
  CONSTRAINT fk_bookings_slot FOREIGN KEY (slot_id) REFERENCES availability_slots(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
