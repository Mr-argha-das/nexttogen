/** Zod schemas — API routes ki input validation. */
import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(10, "Phone number 10 digit ka hona chahiye")
  .max(15, "Phone number bahut lamba hai")
  .regex(/^[+0-9\s-]+$/, "Phone number me sirf digits allowed hain");

export const applicationSchema = z.object({
  fullName: z.string().trim().min(3, "Poora naam likhiye").max(80),
  email: z.string().trim().email("Valid email address dijiye"),
  phone,
  courseId: z.string().trim().optional().nullable(),
  courseName: z.string().trim().optional().nullable(),
  city: z.string().trim().max(60).optional().nullable(),
  qualification: z.string().trim().max(80).optional().nullable(),
  preferredMode: z.string().trim().max(30).optional().nullable(),
  message: z.string().trim().max(1000).optional().nullable(),
  /** honeypot — bots ise bharte hain, insaan nahi */
  website: z.string().max(0).optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(3, "Poora naam likhiye").max(80),
  email: z.string().trim().email("Valid email address dijiye"),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9\s-]*$/, "Phone number me sirf digits allowed hain")
    .max(15)
    .optional()
    .nullable()
    .or(z.literal("")),
  subject: z.string().trim().max(120).optional().nullable(),
  message: z.string().trim().min(10, "Kam se kam 10 character likhiye").max(2000),
  type: z.enum(["CONTACT", "SUPPORT", "PARTNER"]).optional(),
  amount: z.coerce.number().int().min(0).max(10000000).optional().nullable(),
  website: z.string().max(0).optional(),
});

export const subscribeSchema = z.object({
  email: z.string().trim().email("Valid email address dijiye"),
});

export const chatbotSchema = z.object({
  message: z.string().trim().min(1).max(500),
  history: z
    .array(z.object({ role: z.enum(["user", "bot"]), text: z.string().max(1000) }))
    .max(20)
    .optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Valid email dijiye"),
  password: z.string().min(6, "Password kam se kam 6 character ka ho"),
});

export const courseSchema = z.object({
  slug: z.string().trim().min(3).optional(),
  title: z.string().trim().min(3, "Course ka naam likhiye"),
  tagline: z.string().trim().max(160).optional().nullable(),
  category: z.string().trim().min(2),
  level: z.string().trim().min(2),
  mode: z.string().trim().min(2),
  duration: z.string().trim().min(2),
  fee: z.coerce.number().int().min(0),
  discountFee: z.coerce.number().int().min(0).optional().nullable(),
  seats: z.coerce.number().int().min(1).max(1000).optional(),
  startDate: z.string().trim().optional().nullable(),
  coverImage: z.string().trim().optional().nullable(),
  shortDesc: z.string().trim().min(10, "Short description likhiye").max(300),
  description: z.string().trim().min(20, "Description likhiye"),
  syllabus: z
    .array(z.object({ title: z.string().trim().min(1), topics: z.array(z.string().trim()) }))
    .optional(),
  highlights: z.array(z.string().trim()).optional(),
  tools: z.array(z.string().trim()).optional(),
  eligibility: z.string().trim().optional().nullable(),
  certification: z.string().trim().optional().nullable(),
  placementSupport: z.boolean().optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  sortOrder: z.coerce.number().int().optional(),
  seoTitle: z.string().trim().max(70).optional().nullable(),
  seoDescription: z.string().trim().max(180).optional().nullable(),
});

export const postSchema = z.object({
  slug: z.string().trim().min(3).optional(),
  title: z.string().trim().min(5, "Blog title likhiye"),
  excerpt: z.string().trim().min(20, "Excerpt likhiye").max(300),
  content: z.string().trim().min(50, "Content likhiye"),
  coverImage: z.string().trim().optional().nullable(),
  author: z.string().trim().min(2).optional(),
  authorRole: z.string().trim().optional().nullable(),
  category: z.string().trim().min(2),
  tags: z.array(z.string().trim()).optional(),
  readMinutes: z.coerce.number().int().min(1).max(60).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  publishedAt: z.string().trim().optional().nullable(),
  seoTitle: z.string().trim().max(70).optional().nullable(),
  seoDescription: z.string().trim().max(180).optional().nullable(),
});

export const testimonialSchema = z.object({
  name: z.string().trim().min(2, "Student ka naam likhiye"),
  role: z.string().trim().max(100).optional().nullable(),
  course: z.string().trim().max(100).optional().nullable(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  message: z.string().trim().min(20, "Testimonial kam se kam 20 character ka ho").max(1200),
  avatar: z.string().trim().optional().nullable(),
  city: z.string().trim().max(60).optional().nullable(),
  year: z.string().trim().max(10).optional().nullable(),
  videoUrl: z.string().trim().optional().nullable(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

export const faqSchema = z.object({
  question: z.string().trim().min(5, "Sawaal likhiye").max(200),
  answer: z.string().trim().min(10, "Jawab likhiye").max(1000),
  category: z.string().trim().max(40).optional(),
  sortOrder: z.coerce.number().int().optional(),
  published: z.boolean().optional(),
});

export function firstError(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Input sahi nahi hai";
}
