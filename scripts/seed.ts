/**
 * `npm run db:seed` — database banata hai aur demo content bharta hai.
 * `npm run db:reset` — file delete karke fresh seed karta hai.
 */
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

const dbPath = path.join(process.cwd(), "data", "institute.db");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new DatabaseSync(dbPath);
const { SCHEMA_SQL } = await import("../src/lib/schema");
db.exec(SCHEMA_SQL);

// tsx ke through chala rahe hain, to @/ alias resolve karne ke liye tsconfig paths use hote hain
const { seedIfEmpty } = await import("../src/lib/seed");
seedIfEmpty(db);

const tables = ["courses", "blogs", "testimonials", "faqs", "applications", "messages", "users"];
console.log("\n✅ Database ready:", dbPath);
for (const t of tables) {
  const row = db.prepare(`SELECT COUNT(*) as c FROM ${t}`).get() as { c: number };
  console.log(`   • ${t.padEnd(14)} ${row.c} rows`);
}
console.log("\n🔐 Admin login → http://localhost:3000/admin/login");
console.log(`   Email:    ${process.env.ADMIN_EMAIL || "admin@nexttogen.in"}`);
console.log(`   Password: ${process.env.ADMIN_PASSWORD || "Admin@12345"}\n`);
