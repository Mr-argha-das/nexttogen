/**
 * Data access layer — saare DB queries yahin centralised hain.
 * Frontend (server components) aur API routes dono isi ko use karte hain.
 */
import { execute, newId, nowIso, query, queryOne } from "./db";
import { DEFAULT_SETTINGS } from "@/content/settings";
import type {
  Application,
  ApplicationStatus,
  BlogPost,
  BlogPostRow,
  ContactMessage,
  Course,
  CourseRow,
  Faq,
  FaqRow,
  MessageStatus,
  MessageType,
  SiteSettings,
  Subscriber,
  Testimonial,
  TestimonialRow,
  AdminUser,
} from "./types";

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

const toCourse = (row: CourseRow): Course => ({
  ...row,
  syllabus: parseJson(row.syllabus, [] as Course["syllabus"]),
  highlights: parseJson(row.highlights, [] as string[]),
  tools: parseJson(row.tools, [] as string[]),
  placementSupport: Boolean(row.placementSupport),
  featured: Boolean(row.featured),
  published: Boolean(row.published),
});

const toPost = (row: BlogPostRow): BlogPost => ({
  ...row,
  tags: parseJson(row.tags, [] as string[]),
  featured: Boolean(row.featured),
  published: Boolean(row.published),
});

const toTestimonial = (row: TestimonialRow): Testimonial => ({
  ...row,
  featured: Boolean(row.featured),
  published: Boolean(row.published),
});

/* ------------------------------------------------------------------ */
/* settings                                                            */
/* ------------------------------------------------------------------ */

export function getSettings(): SiteSettings {
  const rows = query<{ key: string; value: string }>("SELECT key, value FROM settings");
  const merged = { ...DEFAULT_SETTINGS } as Record<string, string>;
  for (const row of rows) merged[row.key] = row.value;
  return merged as unknown as SiteSettings;
}

export function updateSettings(values: Record<string, string>) {
  const stmt = execute;
  for (const [key, value] of Object.entries(values)) {
    if (!(key in DEFAULT_SETTINGS)) continue;
    stmt(
      "INSERT INTO settings (key, value, updatedAt) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = ?, updatedAt = ?",
      [key, String(value ?? ""), nowIso(), String(value ?? ""), nowIso()],
    );
  }
}

/* ------------------------------------------------------------------ */
/* courses                                                             */
/* ------------------------------------------------------------------ */

export function listCourses(opts: { includeUnpublished?: boolean; category?: string; featuredOnly?: boolean; limit?: number } = {}): Course[] {
  const where: string[] = [];
  const params: unknown[] = [];
  if (!opts.includeUnpublished) where.push("published = 1");
  if (opts.category) {
    where.push("category = ?");
    params.push(opts.category);
  }
  if (opts.featuredOnly) where.push("featured = 1");
  const sql = `SELECT * FROM courses ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
    ORDER BY sortOrder ASC, createdAt DESC ${opts.limit ? "LIMIT ?" : ""}`;
  if (opts.limit) params.push(opts.limit);
  return query<CourseRow>(sql, params).map(toCourse);
}

export function getCourseBySlug(slug: string, includeUnpublished = false): Course | null {
  const row = queryOne<CourseRow>(
    `SELECT * FROM courses WHERE slug = ? ${includeUnpublished ? "" : "AND published = 1"}`,
    [slug],
  );
  return row ? toCourse(row) : null;
}

export function getCourseById(id: string): Course | null {
  const row = queryOne<CourseRow>("SELECT * FROM courses WHERE id = ?", [id]);
  return row ? toCourse(row) : null;
}

export function listCourseCategories(): { category: string; count: number }[] {
  return query<{ category: string; count: number }>(
    "SELECT category, COUNT(*) as count FROM courses WHERE published = 1 GROUP BY category ORDER BY count DESC",
  );
}

export function createCourse(data: Record<string, unknown>): string {
  const id = newId("crs_");
  const now = nowIso();
  execute(
    `INSERT INTO courses (id, slug, title, tagline, category, level, mode, duration, fee, discountFee, seats,
      startDate, coverImage, shortDesc, description, syllabus, highlights, tools, eligibility, certification,
      placementSupport, featured, published, sortOrder, seoTitle, seoDescription, createdAt, updatedAt)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      id,
      data.slug,
      data.title,
      data.tagline ?? null,
      data.category ?? "Computer",
      data.level ?? "Beginner",
      data.mode ?? "Offline",
      data.duration ?? "3 Months",
      data.fee ?? 0,
      data.discountFee ?? null,
      data.seats ?? 30,
      data.startDate ?? null,
      data.coverImage ?? null,
      data.shortDesc ?? "",
      data.description ?? "",
      JSON.stringify(data.syllabus ?? []),
      JSON.stringify(data.highlights ?? []),
      JSON.stringify(data.tools ?? []),
      data.eligibility ?? null,
      data.certification ?? null,
      data.placementSupport ? 1 : 0,
      data.featured ? 1 : 0,
      data.published === false ? 0 : 1,
      data.sortOrder ?? 0,
      data.seoTitle ?? null,
      data.seoDescription ?? null,
      now,
      now,
    ],
  );
  return id;
}

export function updateCourse(id: string, data: Record<string, unknown>) {
  const current = getCourseById(id);
  if (!current) return false;
  execute(
    `UPDATE courses SET slug=?, title=?, tagline=?, category=?, level=?, mode=?, duration=?, fee=?, discountFee=?,
      seats=?, startDate=?, coverImage=?, shortDesc=?, description=?, syllabus=?, highlights=?, tools=?,
      eligibility=?, certification=?, placementSupport=?, featured=?, published=?, sortOrder=?, seoTitle=?,
      seoDescription=?, updatedAt=? WHERE id=?`,
    [
      data.slug ?? current.slug,
      data.title ?? current.title,
      data.tagline ?? current.tagline,
      data.category ?? current.category,
      data.level ?? current.level,
      data.mode ?? current.mode,
      data.duration ?? current.duration,
      data.fee ?? current.fee,
      data.discountFee ?? current.discountFee,
      data.seats ?? current.seats,
      data.startDate ?? current.startDate,
      data.coverImage ?? current.coverImage,
      data.shortDesc ?? current.shortDesc,
      data.description ?? current.description,
      JSON.stringify(data.syllabus ?? current.syllabus),
      JSON.stringify(data.highlights ?? current.highlights),
      JSON.stringify(data.tools ?? current.tools),
      data.eligibility ?? current.eligibility,
      data.certification ?? current.certification,
      (data.placementSupport ?? current.placementSupport) ? 1 : 0,
      (data.featured ?? current.featured) ? 1 : 0,
      (data.published ?? current.published) ? 1 : 0,
      data.sortOrder ?? current.sortOrder,
      data.seoTitle ?? current.seoTitle,
      data.seoDescription ?? current.seoDescription,
      nowIso(),
      id,
    ],
  );
  return true;
}

export function deleteCourse(id: string) {
  execute("DELETE FROM courses WHERE id = ?", [id]);
}

/* ------------------------------------------------------------------ */
/* blog                                                                */
/* ------------------------------------------------------------------ */

export function listPosts(
  opts: { includeUnpublished?: boolean; category?: string; tag?: string; featuredOnly?: boolean; limit?: number; offset?: number } = {},
): BlogPost[] {
  const where: string[] = [];
  const params: unknown[] = [];
  if (!opts.includeUnpublished) where.push("published = 1");
  if (opts.category) {
    where.push("category = ?");
    params.push(opts.category);
  }
  if (opts.tag) {
    where.push("tags LIKE ?");
    params.push(`%"${opts.tag}"%`);
  }
  if (opts.featuredOnly) where.push("featured = 1");
  let sql = `SELECT * FROM blogs ${where.length ? `WHERE ${where.join(" AND ")}` : ""} ORDER BY publishedAt DESC`;
  if (opts.limit) {
    sql += " LIMIT ? OFFSET ?";
    params.push(opts.limit, opts.offset ?? 0);
  }
  return query<BlogPostRow>(sql, params).map(toPost);
}

export function countPosts(includeUnpublished = false): number {
  const row = queryOne<{ c: number }>(
    `SELECT COUNT(*) as c FROM blogs ${includeUnpublished ? "" : "WHERE published = 1"}`,
  );
  return row?.c ?? 0;
}

export function getPostBySlug(slug: string, includeUnpublished = false): BlogPost | null {
  const row = queryOne<BlogPostRow>(
    `SELECT * FROM blogs WHERE slug = ? ${includeUnpublished ? "" : "AND published = 1"}`,
    [slug],
  );
  return row ? toPost(row) : null;
}

export function getPostById(id: string): BlogPost | null {
  const row = queryOne<BlogPostRow>("SELECT * FROM blogs WHERE id = ?", [id]);
  return row ? toPost(row) : null;
}

export function listPostCategories(): { category: string; count: number }[] {
  return query<{ category: string; count: number }>(
    "SELECT category, COUNT(*) as count FROM blogs WHERE published = 1 GROUP BY category ORDER BY count DESC",
  );
}

export function listPostTags(): { tag: string; count: number }[] {
  const rows = query<{ tags: string }>("SELECT tags FROM blogs WHERE published = 1");
  const counts = new Map<string, number>();
  for (const row of rows) {
    for (const tag of parseJson<string[]>(row.tags, [])) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function incrementPostViews(id: string) {
  execute("UPDATE blogs SET views = views + 1 WHERE id = ?", [id]);
}

export function createPost(data: Record<string, unknown>): string {
  const id = newId("blg_");
  const now = nowIso();
  const publishedAt = (data.publishedAt as string) || now;
  execute(
    `INSERT INTO blogs (id, slug, title, excerpt, content, coverImage, author, authorRole, category, tags,
      readMinutes, featured, published, publishedAt, views, seoTitle, seoDescription, createdAt, updatedAt)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      id,
      data.slug,
      data.title,
      data.excerpt ?? "",
      data.content ?? "",
      data.coverImage ?? null,
      data.author ?? "NextToGen Team",
      data.authorRole ?? null,
      data.category ?? "Career",
      JSON.stringify(data.tags ?? []),
      data.readMinutes ?? 4,
      data.featured ? 1 : 0,
      data.published === false ? 0 : 1,
      publishedAt,
      data.views ?? 0,
      data.seoTitle ?? null,
      data.seoDescription ?? null,
      now,
      now,
    ],
  );
  return id;
}

export function updatePost(id: string, data: Record<string, unknown>) {
  const current = getPostById(id);
  if (!current) return false;
  execute(
    `UPDATE blogs SET slug=?, title=?, excerpt=?, content=?, coverImage=?, author=?, authorRole=?, category=?,
      tags=?, readMinutes=?, featured=?, published=?, publishedAt=?, seoTitle=?, seoDescription=?, updatedAt=?
     WHERE id=?`,
    [
      data.slug ?? current.slug,
      data.title ?? current.title,
      data.excerpt ?? current.excerpt,
      data.content ?? current.content,
      data.coverImage ?? current.coverImage,
      data.author ?? current.author,
      data.authorRole ?? current.authorRole,
      data.category ?? current.category,
      JSON.stringify(data.tags ?? current.tags),
      data.readMinutes ?? current.readMinutes,
      (data.featured ?? current.featured) ? 1 : 0,
      (data.published ?? current.published) ? 1 : 0,
      data.publishedAt ?? current.publishedAt,
      data.seoTitle ?? current.seoTitle,
      data.seoDescription ?? current.seoDescription,
      nowIso(),
      id,
    ],
  );
  return true;
}

export function deletePost(id: string) {
  execute("DELETE FROM blogs WHERE id = ?", [id]);
}

/* ------------------------------------------------------------------ */
/* testimonials                                                        */
/* ------------------------------------------------------------------ */

export function listTestimonials(
  opts: { includeUnpublished?: boolean; featuredOnly?: boolean; limit?: number } = {},
): Testimonial[] {
  const where: string[] = [];
  if (!opts.includeUnpublished) where.push("published = 1");
  if (opts.featuredOnly) where.push("featured = 1");
  const sql = `SELECT * FROM testimonials ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
    ORDER BY featured DESC, createdAt DESC ${opts.limit ? "LIMIT ?" : ""}`;
  return query<TestimonialRow>(sql, opts.limit ? [opts.limit] : []).map(toTestimonial);
}

export function getTestimonialById(id: string): Testimonial | null {
  const row = queryOne<TestimonialRow>("SELECT * FROM testimonials WHERE id = ?", [id]);
  return row ? toTestimonial(row) : null;
}

export function createTestimonial(data: Record<string, unknown>): string {
  const id = newId("tst_");
  const now = nowIso();
  execute(
    `INSERT INTO testimonials (id, name, role, course, rating, message, avatar, city, year, videoUrl,
      featured, published, createdAt, updatedAt)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      id,
      data.name,
      data.role ?? null,
      data.course ?? null,
      data.rating ?? 5,
      data.message ?? "",
      data.avatar ?? null,
      data.city ?? null,
      data.year ?? null,
      data.videoUrl ?? null,
      data.featured ? 1 : 0,
      data.published === false ? 0 : 1,
      now,
      now,
    ],
  );
  return id;
}

export function updateTestimonial(id: string, data: Record<string, unknown>) {
  const current = getTestimonialById(id);
  if (!current) return false;
  execute(
    `UPDATE testimonials SET name=?, role=?, course=?, rating=?, message=?, avatar=?, city=?, year=?, videoUrl=?,
      featured=?, published=?, updatedAt=? WHERE id=?`,
    [
      data.name ?? current.name,
      data.role ?? current.role,
      data.course ?? current.course,
      data.rating ?? current.rating,
      data.message ?? current.message,
      data.avatar ?? current.avatar,
      data.city ?? current.city,
      data.year ?? current.year,
      data.videoUrl ?? current.videoUrl,
      (data.featured ?? current.featured) ? 1 : 0,
      (data.published ?? current.published) ? 1 : 0,
      nowIso(),
      id,
    ],
  );
  return true;
}

export function deleteTestimonial(id: string) {
  execute("DELETE FROM testimonials WHERE id = ?", [id]);
}

/* ------------------------------------------------------------------ */
/* applications                                                        */
/* ------------------------------------------------------------------ */

export function listApplications(opts: { status?: string; limit?: number } = {}): Application[] {
  const where: string[] = [];
  const params: unknown[] = [];
  if (opts.status && opts.status !== "ALL") {
    where.push("status = ?");
    params.push(opts.status);
  }
  const sql = `SELECT * FROM applications ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
    ORDER BY createdAt DESC ${opts.limit ? "LIMIT ?" : ""}`;
  if (opts.limit) params.push(opts.limit);
  return query<Application>(sql, params);
}

export function getApplicationById(id: string): Application | null {
  return queryOne<Application>("SELECT * FROM applications WHERE id = ?", [id]);
}

export function createApplication(data: {
  fullName: string;
  email: string;
  phone: string;
  courseId?: string | null;
  courseName?: string | null;
  city?: string | null;
  qualification?: string | null;
  preferredMode?: string | null;
  message?: string | null;
}): string {
  const id = newId("app_");
  execute(
    `INSERT INTO applications (id, fullName, email, phone, courseId, courseName, city, qualification,
      preferredMode, message, status, notes, createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,'NEW',NULL,?)`,
    [
      id,
      data.fullName,
      data.email,
      data.phone,
      data.courseId ?? null,
      data.courseName ?? null,
      data.city ?? null,
      data.qualification ?? null,
      data.preferredMode ?? null,
      data.message ?? null,
      nowIso(),
    ],
  );
  return id;
}

export function updateApplication(
  id: string,
  data: { status?: ApplicationStatus; notes?: string | null },
) {
  const current = getApplicationById(id);
  if (!current) return false;
  execute("UPDATE applications SET status = ?, notes = ? WHERE id = ?", [
    data.status ?? current.status,
    data.notes ?? current.notes,
    id,
  ]);
  return true;
}

export function deleteApplication(id: string) {
  execute("DELETE FROM applications WHERE id = ?", [id]);
}

/* ------------------------------------------------------------------ */
/* contact messages / subscriptions                                    */
/* ------------------------------------------------------------------ */

export function listMessages(opts: { type?: string; status?: string; limit?: number } = {}): ContactMessage[] {
  const where: string[] = [];
  const params: unknown[] = [];
  if (opts.type && opts.type !== "ALL") {
    where.push("type = ?");
    params.push(opts.type);
  }
  if (opts.status && opts.status !== "ALL") {
    where.push("status = ?");
    params.push(opts.status);
  }
  const sql = `SELECT * FROM messages ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
    ORDER BY createdAt DESC ${opts.limit ? "LIMIT ?" : ""}`;
  if (opts.limit) params.push(opts.limit);
  return query<ContactMessage>(sql, params);
}

export function createMessage(data: {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  type?: MessageType;
  amount?: number | null;
}): string {
  const id = newId("msg_");
  execute(
    "INSERT INTO messages (id, name, email, phone, subject, message, type, amount, status, createdAt) VALUES (?,?,?,?,?,?,?,?,'NEW',?)",
    [
      id,
      data.name,
      data.email,
      data.phone ?? null,
      data.subject ?? null,
      data.message,
      data.type ?? "CONTACT",
      data.amount ?? null,
      nowIso(),
    ],
  );
  return id;
}

export function updateMessageStatus(id: string, status: MessageStatus) {
  execute("UPDATE messages SET status = ? WHERE id = ?", [status, id]);
}

export function deleteMessage(id: string) {
  execute("DELETE FROM messages WHERE id = ?", [id]);
}

export function subscribe(email: string): boolean {
  const existing = queryOne<Subscriber>("SELECT * FROM subscribers WHERE email = ?", [email.toLowerCase()]);
  if (existing) return false;
  execute("INSERT INTO subscribers (id, email, createdAt) VALUES (?,?,?)", [
    newId("sub_"),
    email.toLowerCase(),
    nowIso(),
  ]);
  return true;
}

export function listSubscribers(): Subscriber[] {
  return query<Subscriber>("SELECT * FROM subscribers ORDER BY createdAt DESC");
}

export function deleteSubscriber(id: string) {
  execute("DELETE FROM subscribers WHERE id = ?", [id]);
}

/* ------------------------------------------------------------------ */
/* faqs                                                                */
/* ------------------------------------------------------------------ */

export function listFaqs(includeUnpublished = false): Faq[] {
  const rows = query<FaqRow>(
    `SELECT * FROM faqs ${includeUnpublished ? "" : "WHERE published = 1"} ORDER BY sortOrder ASC, createdAt ASC`,
  );
  return rows.map((row) => ({ ...row, published: Boolean(row.published) }));
}

export function getFaqById(id: string): Faq | null {
  const row = queryOne<FaqRow>("SELECT * FROM faqs WHERE id = ?", [id]);
  return row ? { ...row, published: Boolean(row.published) } : null;
}

export function createFaq(data: { question: string; answer: string; category?: string; sortOrder?: number; published?: boolean }): string {
  const id = newId("faq_");
  execute("INSERT INTO faqs (id, question, answer, category, sortOrder, published, createdAt) VALUES (?,?,?,?,?,?,?)", [
    id,
    data.question,
    data.answer,
    data.category ?? "General",
    data.sortOrder ?? 0,
    data.published === false ? 0 : 1,
    nowIso(),
  ]);
  return id;
}

export function updateFaq(id: string, data: Record<string, unknown>) {
  const current = getFaqById(id);
  if (!current) return false;
  execute("UPDATE faqs SET question=?, answer=?, category=?, sortOrder=?, published=? WHERE id=?", [
    data.question ?? current.question,
    data.answer ?? current.answer,
    data.category ?? current.category,
    data.sortOrder ?? current.sortOrder,
    (data.published ?? current.published) ? 1 : 0,
    id,
  ]);
  return true;
}

export function deleteFaq(id: string) {
  execute("DELETE FROM faqs WHERE id = ?", [id]);
}

/* ------------------------------------------------------------------ */
/* users / stats                                                       */
/* ------------------------------------------------------------------ */

export function findUserByEmail(email: string): AdminUser | null {
  return queryOne<AdminUser>("SELECT * FROM users WHERE email = ?", [email.toLowerCase()]);
}

export function listUsers(): AdminUser[] {
  return query<AdminUser>("SELECT * FROM users ORDER BY createdAt ASC");
}

export function createUser(data: { name: string; email: string; passwordHash: string; role?: string }): string {
  const id = newId("usr_");
  const now = nowIso();
  execute(
    "INSERT INTO users (id, name, email, passwordHash, role, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?)",
    [id, data.name, data.email.toLowerCase(), data.passwordHash, data.role ?? "ADMIN", now, now],
  );
  return id;
}

export function updateUserPassword(id: string, passwordHash: string) {
  execute("UPDATE users SET passwordHash = ?, updatedAt = ? WHERE id = ?", [passwordHash, nowIso(), id]);
}

export function deleteUser(id: string) {
  execute("DELETE FROM users WHERE id = ?", [id]);
}

export type DashboardStats = {
  courses: number;
  publishedCourses: number;
  posts: number;
  testimonials: number;
  applications: number;
  newApplications: number;
  messages: number;
  newMessages: number;
  subscribers: number;
  supportRaised: number;
  totalViews: number;
  applicationsByStatus: { status: string; count: number }[];
  monthlyApplications: { month: string; count: number }[];
  recentApplications: Application[];
  recentMessages: ContactMessage[];
};

export function getDashboardStats(): DashboardStats {
  const scalar = (sql: string): number => queryOne<{ c: number }>(sql)?.c ?? 0;

  const monthlyApplications = query<{ month: string; count: number }>(
    `SELECT substr(createdAt, 1, 7) as month, COUNT(*) as count FROM applications
     WHERE createdAt >= ? GROUP BY month ORDER BY month ASC LIMIT 12`,
    [new Date(Date.now() - 365 * 864e5).toISOString()],
  );

  return {
    courses: scalar("SELECT COUNT(*) as c FROM courses"),
    publishedCourses: scalar("SELECT COUNT(*) as c FROM courses WHERE published = 1"),
    posts: scalar("SELECT COUNT(*) as c FROM blogs"),
    testimonials: scalar("SELECT COUNT(*) as c FROM testimonials"),
    applications: scalar("SELECT COUNT(*) as c FROM applications"),
    newApplications: scalar("SELECT COUNT(*) as c FROM applications WHERE status = 'NEW'"),
    messages: scalar("SELECT COUNT(*) as c FROM messages"),
    newMessages: scalar("SELECT COUNT(*) as c FROM messages WHERE status = 'NEW'"),
    subscribers: scalar("SELECT COUNT(*) as c FROM subscribers"),
    supportRaised: scalar("SELECT COALESCE(SUM(amount), 0) as c FROM messages WHERE type = 'SUPPORT'"),
    totalViews: scalar("SELECT COALESCE(SUM(views), 0) as c FROM blogs"),
    applicationsByStatus: query<{ status: string; count: number }>(
      "SELECT status, COUNT(*) as count FROM applications GROUP BY status",
    ),
    monthlyApplications,
    recentApplications: listApplications({ limit: 5 }),
    recentMessages: listMessages({ limit: 5 }),
  };
}
