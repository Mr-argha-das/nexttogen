/**
 * Database seeding — inserts demo content the first time the database is created.
 * It is idempotent: if data already exists it does nothing.
 * `npm run db:seed` (scripts/seed.ts) calls this same function.
 */
import type { DatabaseSync } from "node:sqlite";
import bcrypt from "bcryptjs";
import { DEFAULT_SETTINGS } from "@/content/settings";
import { SEED_COURSES } from "@/content/courses";
import { SEED_POSTS } from "@/content/blog";
import { SEED_TESTIMONIALS } from "@/content/testimonials";
import { SEED_FAQS } from "@/content/faqs";
import { newId } from "./db";

function bulkInsert(db: DatabaseSync, sql: string, rows: unknown[][]) {
  const stmt = db.prepare(sql);
  for (const row of rows) {
    stmt.run(...(row.map((v) => {
      if (v === undefined || v === null) return null;
      if (typeof v === "boolean") return v ? 1 : 0;
      return v as string | number | null;
    }) as never[]));
  }
}

function count(db: DatabaseSync, table: string): number {
  const row = db.prepare(`SELECT COUNT(*) as c FROM ${table}`).get() as { c: number };
  return row?.c ?? 0;
}

const daysFromNow = (days: number) => new Date(Date.now() + days * 864e5).toISOString();
const daysAgo = (days: number) => new Date(Date.now() - days * 864e5).toISOString();

export function seedIfEmpty(db: DatabaseSync) {
  seedSettings(db);

  if (count(db, "users") === 0) seedAdminUser(db);
  if (count(db, "courses") === 0) seedCourses(db);
  if (count(db, "blogs") === 0) seedBlogs(db);
  if (count(db, "testimonials") === 0) seedTestimonials(db);
  if (count(db, "faqs") === 0) seedFaqs(db);
  if (count(db, "applications") === 0) seedApplications(db);
  if (count(db, "messages") === 0) seedMessages(db);
}

export function seedSettings(db: DatabaseSync) {
  const stmt = db.prepare(
    "INSERT INTO settings (key, value, updatedAt) VALUES (?, ?, ?) ON CONFLICT(key) DO NOTHING",
  );
  const now = new Date().toISOString();
  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) stmt.run(key, value, now);
}

export function seedAdminUser(db: DatabaseSync) {
  const email = process.env.ADMIN_EMAIL || "admin@nexttogen.in";
  const password = process.env.ADMIN_PASSWORD || "Admin@12345";
  const name = process.env.ADMIN_NAME || "Institute Admin";
  const now = new Date().toISOString();
  db.prepare(
    "INSERT INTO users (id, name, email, passwordHash, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, 'ADMIN', ?, ?)",
  ).run(newId("usr_"), name, email.toLowerCase(), bcrypt.hashSync(password, 10), now, now);
}

function seedCourses(db: DatabaseSync) {
  bulkInsert(
    db,
    `INSERT INTO courses (id, slug, title, tagline, category, level, mode, duration, fee, discountFee, seats,
      startDate, coverImage, shortDesc, description, syllabus, highlights, tools, eligibility, certification,
      placementSupport, featured, published, sortOrder, seoTitle, seoDescription, createdAt, updatedAt)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    SEED_COURSES.map((c) => [
      newId("crs_"),
      c.slug,
      c.title,
      c.tagline,
      c.category,
      c.level,
      c.mode,
      c.duration,
      c.fee,
      c.discountFee ?? null,
      c.seats,
      daysFromNow(c.startDateDays),
      c.coverImage,
      c.shortDesc,
      c.description,
      JSON.stringify(c.syllabus),
      JSON.stringify(c.highlights),
      JSON.stringify(c.tools),
      c.eligibility,
      c.certification,
      1,
      c.featured ? 1 : 0,
      1,
      c.sortOrder,
      `${c.title} Course in Jaipur | Fees, Syllabus & Duration`,
      c.shortDesc,
      new Date().toISOString(),
      new Date().toISOString(),
    ]),
  );
}

function seedBlogs(db: DatabaseSync) {
  bulkInsert(
    db,
    `INSERT INTO blogs (id, slug, title, excerpt, content, coverImage, author, authorRole, category, tags,
      readMinutes, featured, published, publishedAt, views, seoTitle, seoDescription, createdAt, updatedAt)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    SEED_POSTS.map((p) => [
      newId("blg_"),
      p.slug,
      p.title,
      p.excerpt,
      p.content,
      p.coverImage,
      p.author,
      p.authorRole,
      p.category,
      JSON.stringify(p.tags),
      p.readMinutes,
      p.featured ? 1 : 0,
      1,
      daysAgo(p.daysAgo),
      p.views,
      p.title,
      p.excerpt,
      daysAgo(p.daysAgo),
      daysAgo(p.daysAgo),
    ]),
  );
}

function seedTestimonials(db: DatabaseSync) {
  const now = new Date().toISOString();
  bulkInsert(
    db,
    `INSERT INTO testimonials (id, name, role, course, rating, message, avatar, city, year, videoUrl,
      featured, published, createdAt, updatedAt)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    SEED_TESTIMONIALS.map((t) => [
      newId("tst_"),
      t.name,
      t.role,
      t.course,
      t.rating,
      t.message,
      null,
      t.city,
      t.year,
      null,
      t.featured ? 1 : 0,
      1,
      now,
      now,
    ]),
  );
}

function seedFaqs(db: DatabaseSync) {
  const now = new Date().toISOString();
  bulkInsert(
    db,
    "INSERT INTO faqs (id, question, answer, category, sortOrder, published, createdAt) VALUES (?,?,?,?,?,1,?)",
    SEED_FAQS.map((f) => [newId("faq_"), f.question, f.answer, f.category, f.sortOrder, now]),
  );
}

function seedApplications(db: DatabaseSync) {
  const courses = db.prepare("SELECT id, title FROM courses LIMIT 8").all() as {
    id: string;
    title: string;
  }[];
  const pick = (i: number) => courses[i % courses.length];

  const demo = [
    ["Aarti Kumari", "aarti.kumari@example.com", "9829012345", 0, "Jaipur", "12th", "Offline", "I would prefer the morning batch", "NEW", -1],
    ["Harsh Vardhan", "harsh.v@example.com", "9988776655", 1, "Sikar", "B.Tech", "Online", "Weekend classes possible?", "CONTACTED", -2],
    ["Ritu Sharma", "ritu.sharma@example.com", "9765432109", 2, "Jaipur", "B.Com", "Online", "I would like to know about the EMI option", "ENROLLED", -5],
    ["Salman Khan", "salman.k@example.com", "9123456780", 3, "Tonk", "12th", "Offline", "Design me career banana chahta hoon", "NEW", -1],
    ["Neha Gupta", "neha.g@example.com", "9876501234", 4, "Jaipur", "Graduate", "Offline", "", "CONTACTED", -3],
    ["Pankaj Meena", "pankaj.m@example.com", "9090909090", 5, "Alwar", "B.Tech", "Hybrid", "I am interested in the security field", "NEW", -1],
    ["Sunita Devi", "sunita.d@example.com", "9345678123", 6, "Dausa", "10th", "Offline", "Hindi medium me padhna chahti hoon", "ENROLLED", -8],
    ["Yash Agarwal", "yash.a@example.com", "9456123789", 7, "Jaipur", "12th", "Hybrid", "I want to improve my spoken English", "REJECTED", -12],
  ] as const;

  const now = Date.now();
  bulkInsert(
    db,
    `INSERT INTO applications (id, fullName, email, phone, courseId, courseName, city, qualification,
      preferredMode, message, status, notes, createdAt)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    demo.map(([name, email, phone, ci, city, qual, mode, msg, status, days]) => {
      const c = pick(ci as number);
      return [
        newId("app_"),
        name,
        email,
        phone,
        c.id,
        c.title,
        city,
        qual,
        mode,
        msg || null,
        status,
        null,
        new Date(now + (days as number) * 864e5).toISOString(),
      ];
    }),
  );
}

function seedMessages(db: DatabaseSync) {
  const now = Date.now();
  const demo: (string | number | null)[][] = [
    ["Kapil Jain", "kapil.jain@example.com", "9812345670", "Slot request for a demo class", "I would like to enrol my daughter in the DCA course. Is a Sunday slot possible?", "CONTACT", null, "NEW", -1],
    ["Meena Kumari", "meena.k@example.com", "9900112233", null, "What would the EMI amount be? I could not reach your number earlier.", "CONTACT", null, "READ", -2],
    ["Sanjay Tibrewal", "sanjay.t@company.com", "9867001122", "CSR collaboration", "Our manufacturing company would like to sponsor one lab from its CSR budget. Please share the process.", "PARTNER", 150000, "NEW", -3],
    ["Ankit Bansal", "ankit.b@example.com", null, null, "I am an alumnus of the 2019 batch and would like to contribute ₹5,000 towards the annual fund.", "SUPPORT", 5000, "REPLIED", -6],
    ["Farhan Ali", "farhan.a@example.com", "9765001234", "Online batch timings", "I am based in Bangalore. Please share the online batch timings and how recording access works.", "CONTACT", null, "NEW", -1],
    ["Rekha Yadav", "rekha.y@example.com", "9871234509", "Scholarship", "I scored 82% in 12th. How does the scholarship process work?", "CONTACT", null, "READ", -4],
  ];

  bulkInsert(
    db,
    `INSERT INTO messages (id, name, email, phone, subject, message, type, amount, status, createdAt)
     VALUES (?,?,?,?,?,?,?,?,?,?)`,
    demo.map(([name, email, phone, subject, message, type, amount, status, days]) => [
      newId("msg_"),
      name,
      email,
      phone,
      subject,
      message,
      type,
      amount,
      status,
      new Date(now + (days as number) * 864e5).toISOString(),
    ]),
  );
}
