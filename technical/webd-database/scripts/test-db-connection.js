const mysql = require("mysql2/promise");

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === "true" ? {} : undefined,
  });

  const [rows] = await connection.query("SELECT 1 AS ok");
  console.log("Database connection OK:", rows);
  await connection.end();
}

main().catch((error) => {
  console.error("Database connection failed:", error.message);
  process.exit(1);
});
