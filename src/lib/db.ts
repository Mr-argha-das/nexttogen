/**
 * SQLite data layer.
 *
 * Node 22 ka built-in `node:sqlite` use hota hai — koi native dependency,
 * koi engine download, koi extra setup nahi. Pehli baar chalane par DB file
 * khud ban jaati hai aur demo content se seed ho jaati hai.
 *
 * Prisma-style reference model `prisma/schema.prisma` me rakha hai, agar aap
 * baad me Postgres/Prisma par shift hona chahein.
 */
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { SCHEMA_SQL } from "./schema";

export type SqlValue = string | number | bigint | null | Uint8Array;


type DbGlobal = typeof globalThis & {
  __nexttogenDb?: DatabaseSync;
  __nexttogenSeeded?: boolean;
};

const globalForDb = globalThis as DbGlobal;

function resolveDbPath(): string {
  const fromEnv = process.env.DATABASE_URL ?? process.env.DATABASE_PATH ?? "";
  const cleaned = fromEnv.replace(/^file:/, "").trim();
  if (cleaned) {
    return path.isAbsolute(cleaned) ? cleaned : path.join(/* turbopackIgnore: true */ process.cwd(), cleaned);
  }
  return path.join(process.cwd(), "data", "institute.db");
}

/** DB kholta hai; write access na ho to in-memory fallback (read-only hosts). */
function openDatabase(): DatabaseSync {
  const dbPath = resolveDbPath();
  try {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    const db = new DatabaseSync(dbPath);
    db.exec("PRAGMA journal_mode = WAL;");
    return db;
  } catch (error) {
    console.warn(
      `[db] ${dbPath} open nahi ho paya (${(error as Error).message}). ` +
        "In-memory DB par fallback kar raha hoon — changes persist nahi honge.",
    );
    const memory = new DatabaseSync(":memory:");
    return memory;
  }
}

/** Lazily create + migrate + seed the database (HMR me bhi singleton). */
export function getDb(): DatabaseSync {
  if (!globalForDb.__nexttogenDb) {
    const db = openDatabase();
    db.exec("PRAGMA foreign_keys = ON;");
    db.exec(SCHEMA_SQL);
    globalForDb.__nexttogenDb = db;
  }
  const db = globalForDb.__nexttogenDb;
  if (!globalForDb.__nexttogenSeeded) {
    globalForDb.__nexttogenSeeded = true;
    // Circular import se bachne ke liye lazy require
    const { seedIfEmpty } = require("./seed") as typeof import("./seed");
    try {
      seedIfEmpty(db);
    } catch (error) {
      console.error("[db] seeding failed:", error);
    }
  }
  return db;
}

function normalize(value: unknown): SqlValue {
  if (value === undefined || value === null) return null;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object" && !(value instanceof Uint8Array)) return JSON.stringify(value);
  return value as SqlValue;
}

export function query<T = Record<string, unknown>>(sql: string, params: unknown[] = []): T[] {
  const stmt = getDb().prepare(sql);
  return stmt.all(...params.map(normalize)) as T[];
}

export function queryOne<T = Record<string, unknown>>(sql: string, params: unknown[] = []): T | null {
  const stmt = getDb().prepare(sql);
  const row = stmt.get(...params.map(normalize));
  return (row as T | undefined) ?? null;
}

export function execute(sql: string, params: unknown[] = []) {
  const stmt = getDb().prepare(sql);
  return stmt.run(...params.map(normalize));
}

export function transaction<T>(fn: () => T): T {
  const db = getDb();
  db.exec("BEGIN");
  try {
    const result = fn();
    db.exec("COMMIT");
    return result;
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

/** Simple unique-ish id generator (cuid jaisa). */
export function newId(prefix = ""): string {
  const time = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 10);
  return `${prefix}${time}${random}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}
