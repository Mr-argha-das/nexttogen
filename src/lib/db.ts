/**
 * SQLite data layer.
 *
 * Uses Node 22's built-in `node:sqlite` — no native dependency, no engine
 * download and no extra setup. On first run the database file is created and
 * seeded with demo content.
 *
 * A Prisma-style reference model lives in `prisma/schema.prisma` in case you
 * later want to move to Postgres/Prisma.
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

/** Opens the database, falling back to in-memory storage on read-only hosts. */
function openDatabase(): DatabaseSync {
  const dbPath = resolveDbPath();
  try {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    const db = new DatabaseSync(dbPath);
    db.exec("PRAGMA journal_mode = WAL;");
    return db;
  } catch (error) {
    console.warn(
      `[db] Could not open ${dbPath} (${(error as Error).message}). ` +
        "Falling back to an in-memory database — changes will not persist.",
    );
    const memory = new DatabaseSync(":memory:");
    return memory;
  }
}

/** Lazily create, migrate and seed the database (a singleton even across HMR). */
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
    // Lazy require avoids a circular import
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

/** Simple unique-ish id generator (in the spirit of cuid). */
export function newId(prefix = ""): string {
  const time = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 10);
  return `${prefix}${time}${random}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}
