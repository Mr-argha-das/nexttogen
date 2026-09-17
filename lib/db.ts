import fs from "node:fs/promises";
import path from "node:path";
import { allCourses, allPosts, testimonials, faqs } from "@/lib/data";
import bcrypt from "bcryptjs";

// This module is SERVER-ONLY. It must never be imported from client components.
// Use @/lib/utils for slugify on the client; use /api/admin/data for persistence.

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "site.json");
const AUTH_FILE = path.join(DATA_DIR, "auth.json");

export type SiteData = {
  siteName: string;
  tagline: string;
  heroHeadline: string;
  heroItalic: string;
  heroDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  courses: typeof allCourses;
  testimonials: typeof testimonials;
  posts: typeof allPosts;
  faqs: { q: string; a: string }[];
};

const defaultData: SiteData = {
  siteName: "NextToGen",
  tagline: "Academy",
  heroHeadline: "Shaping tomorrow's leaders,",
  heroItalic: "one mind at a time.",
  heroDescription:
    "NextToGen is a premium academy delivering industry-led courses, 1:1 mentorship from world-class practitioners, and career programs designed to turn ambition into achievement.",
  contactEmail: "hello@nexttogen.app",
  contactPhone: "+91 12345 67890",
  contactAddress:
    "221B Knowledge Avenue, Education Hub, Jaipur, Rajasthan 302001, India",
  courses: allCourses,
  testimonials: testimonials,
  posts: allPosts,
  faqs
};

type AuthUser = {
  email: string;
  passwordHash: string;
};

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function getSiteData(): Promise<SiteData> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return { ...defaultData, ...JSON.parse(raw) };
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
}

export async function saveSiteData(data: SiteData): Promise<SiteData> {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  return data;
}

export async function getAuthUser(): Promise<AuthUser> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(AUTH_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    const email = process.env.ADMIN_EMAIL || "admin@nexttogen.app";
    const password = process.env.ADMIN_PASSWORD || "admin123";
    const passwordHash = await bcrypt.hash(password, 10);
    const user = { email, passwordHash };
    await fs.writeFile(AUTH_FILE, JSON.stringify(user, null, 2));
    return user;
  }
}

export async function verifyCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const user = await getAuthUser();
  if (email.trim().toLowerCase() !== user.email.toLowerCase()) return false;
  return bcrypt.compare(password, user.passwordHash);
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
