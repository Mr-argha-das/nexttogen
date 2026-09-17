/** SQLite schema — pehli baar DB banne par yahi tables create hote hain. */
export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  passwordHash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'ADMIN',
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  tagline TEXT,
  category TEXT NOT NULL DEFAULT 'Computer',
  level TEXT NOT NULL DEFAULT 'Beginner',
  mode TEXT NOT NULL DEFAULT 'Offline',
  duration TEXT NOT NULL,
  fee INTEGER NOT NULL DEFAULT 0,
  discountFee INTEGER,
  seats INTEGER NOT NULL DEFAULT 30,
  startDate TEXT,
  coverImage TEXT,
  shortDesc TEXT NOT NULL,
  description TEXT NOT NULL,
  syllabus TEXT NOT NULL DEFAULT '[]',
  highlights TEXT NOT NULL DEFAULT '[]',
  tools TEXT NOT NULL DEFAULT '[]',
  eligibility TEXT,
  certification TEXT,
  placementSupport INTEGER NOT NULL DEFAULT 1,
  featured INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 1,
  sortOrder INTEGER NOT NULL DEFAULT 0,
  seoTitle TEXT,
  seoDescription TEXT,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  fullName TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  courseId TEXT REFERENCES courses(id) ON DELETE SET NULL,
  courseName TEXT,
  city TEXT,
  qualification TEXT,
  preferredMode TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'NEW',
  notes TEXT,
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  coverImage TEXT,
  author TEXT NOT NULL DEFAULT 'NextToGen Team',
  authorRole TEXT,
  category TEXT NOT NULL DEFAULT 'Career',
  tags TEXT NOT NULL DEFAULT '[]',
  readMinutes INTEGER NOT NULL DEFAULT 4,
  featured INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 1,
  publishedAt TEXT NOT NULL,
  views INTEGER NOT NULL DEFAULT 0,
  seoTitle TEXT,
  seoDescription TEXT,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  course TEXT,
  rating INTEGER NOT NULL DEFAULT 5,
  message TEXT NOT NULL,
  avatar TEXT,
  city TEXT,
  year TEXT,
  videoUrl TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 1,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'CONTACT',
  amount INTEGER,
  status TEXT NOT NULL DEFAULT 'NEW',
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS subscribers (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  sortOrder INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 1,
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(published, sortOrder);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published, publishedAt);
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(published);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status, createdAt);
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status, createdAt);
`;
