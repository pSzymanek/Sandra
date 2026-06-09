const { pbkdf2Sync, randomBytes } = require("crypto");

const password = process.argv[2];
if (!password) {
  console.error("Usage: node generate-admin-password-hash.js <password>");
  process.exit(1);
}

const iterations = 120000;
const salt = randomBytes(16).toString("hex");
const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256").toString("hex");
console.log(`pbkdf2$${iterations}$${salt}$${hash}`);
