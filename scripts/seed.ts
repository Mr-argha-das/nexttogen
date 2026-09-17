/**
 * `npm run db:seed` — creates the database and inserts the demo content.
 * `npm run db:reset` — deletes the file and seeds it fresh.
 */
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

async function main() {
  const dbPath = path.join(process.cwd(), "data", "institute.db");
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  const db = new DatabaseSync(dbPath);
  const { SCHEMA_SQL } = await import("../src/lib/schema");
  db.exec(SCHEMA_SQL);

  // We run this through tsx, so the tsconfig paths are used to resolve the @/ alias
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
}

main().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
