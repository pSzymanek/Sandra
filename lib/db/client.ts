import mysql, { type Pool } from "mysql2/promise";

let pool: Pool | null = null;

export function isDatabaseConfigured() {
  return Boolean(process.env.DB_HOST && process.env.DB_NAME && process.env.DB_USER);
}

export function getPool() {
  if (!isDatabaseConfigured()) {
    throw new Error("Database is not configured");
  }

  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 3306),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DB_SSL === "true" ? {} : undefined,
      waitForConnections: true,
      connectionLimit: 8,
      namedPlaceholders: true,
    });
  }

  return pool;
}

