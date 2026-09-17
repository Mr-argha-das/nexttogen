/** Zod schemas — input validation for the API routes. */
import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(10, "Phone number must be at least 10 digits")
  .max(15, "Phone number is too long")
  .regex(/^[+0-9\s-]+$/, "Phone number may contain digits only");

export const applicationSchema = z.object({
  fullName: z.string().trim().min(3, "Please enter your full name").max(80),
  email: z.string().trim().email("Please enter a valid email address"),
  phone,
  courseId: z.string().trim().optional().nullable(),
  courseName: z.string().trim().optional().nullable(),
  city: z.string().trim().max(60).optional().nullable(),
  qualification: z.string().trim().max(80).optional().nullable(),
  preferredMode: z.string().trim().max(30).optional().nullable(),
  message: z.string().trim().max(1000).optional().nullable(),
  /** honeypot — bots fill this in, humans never see it */
  website: z.string().max(0).optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(3, "Please enter your full name").max(80),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9\s-]*$/, "Phone number may contain digits only")
    .max(15)
    .optional()
    .nullable()
    .or(z.literal("")),
  subject: z.string().trim().max(120).optional().nullable(),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(2000),
  type: z.enum(["CONTACT", "SUPPORT", "PARTNER"]).optional(),
  amount: z.coerce.number().int().min(0).max(10000000).optional().nullable(),
  website: z.string().max(0).optional(),
});

export const subscribeSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export const chatbotSchema = z.object({
  message: z.string().trim().min(1).max(500),
  history: z
    .array(z.object({ role: z.enum(["user", "bot"]), text: z.string().max(1000) }))
    .max(20)
    .optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const courseSchema = z.object({
  slug: z.string().trim().min(3).optional(),
  title: z.string().trim().min(3, "Please enter the course name"),
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
  shortDesc: z.string().trim().min(10, "Please write a short description").max(300),
  description: z.string().trim().min(20, "Please write a description"),
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
  title: z.string().trim().min(5, "Please enter the blog title"),
  excerpt: z.string().trim().min(20, "Please write an excerpt").max(300),
  content: z.string().trim().min(50, "Please write the content"),
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
  name: z.string().trim().min(2, "Please enter the student's name"),
  role: z.string().trim().max(100).optional().nullable(),
  course: z.string().trim().max(100).optional().nullable(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  message: z.string().trim().min(20, "A testimonial must be at least 20 characters").max(1200),
  avatar: z.string().trim().optional().nullable(),
  city: z.string().trim().max(60).optional().nullable(),
  year: z.string().trim().max(10).optional().nullable(),
  videoUrl: z.string().trim().optional().nullable(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

export const faqSchema = z.object({
  question: z.string().trim().min(5, "Please enter the question").max(200),
  answer: z.string().trim().min(10, "Please enter the answer").max(1000),
  category: z.string().trim().max(40).optional(),
  sortOrder: z.coerce.number().int().optional(),
  published: z.boolean().optional(),
});

export function firstError(error: z.ZodError): string {
  return error.issues[0]?.message ?? "The input is not valid";
}
