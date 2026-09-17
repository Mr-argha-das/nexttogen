/**
 * Shared TypeScript types for the whole site.
 * DB rows store a few fields as JSON strings (SQLite me arrays nahi hote),
 * so each of those has a raw type + a parsed type.
 */

export type CourseModule = { title: string; topics: string[] };

export type CourseMode = "Offline" | "Online" | "Hybrid";
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export type CourseRow = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  category: string;
  level: string;
  mode: string;
  duration: string;
  fee: number;
  discountFee: number | null;
  seats: number;
  startDate: string | null;
  coverImage: string | null;
  shortDesc: string;
  description: string;
  syllabus: string;
  highlights: string;
  tools: string;
  eligibility: string | null;
  certification: string | null;
  placementSupport: number;
  featured: number;
  published: number;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Course = Omit<
  CourseRow,
  "syllabus" | "highlights" | "tools" | "placementSupport" | "featured" | "published"
> & {
  syllabus: CourseModule[];
  highlights: string[];
  tools: string[];
  placementSupport: boolean;
  featured: boolean;
  published: boolean;
};

export type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  author: string;
  authorRole: string | null;
  category: string;
  tags: string;
  readMinutes: number;
  featured: number;
  published: number;
  publishedAt: string;
  views: number;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BlogPost = Omit<BlogPostRow, "tags" | "featured" | "published"> & {
  tags: string[];
  featured: boolean;
  published: boolean;
};

export type TestimonialRow = {
  id: string;
  name: string;
  role: string | null;
  course: string | null;
  rating: number;
  message: string;
  avatar: string | null;
  city: string | null;
  year: string | null;
  videoUrl: string | null;
  featured: number;
  published: number;
  createdAt: string;
  updatedAt: string;
};

export type Testimonial = Omit<TestimonialRow, "featured" | "published"> & {
  featured: boolean;
  published: boolean;
};

export type ApplicationStatus = "NEW" | "CONTACTED" | "ENROLLED" | "REJECTED";

export type Application = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  courseId: string | null;
  courseName: string | null;
  city: string | null;
  qualification: string | null;
  preferredMode: string | null;
  message: string | null;
  status: ApplicationStatus;
  notes: string | null;
  createdAt: string;
};

export type MessageType = "CONTACT" | "SUPPORT" | "PARTNER";
export type MessageStatus = "NEW" | "READ" | "REPLIED";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  type: MessageType;
  amount: number | null;
  status: MessageStatus;
  createdAt: string;
};

export type FaqRow = {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  published: number;
  createdAt: string;
};

export type Faq = Omit<FaqRow, "published"> & { published: boolean };

export type Subscriber = { id: string; email: string; createdAt: string };

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

/** Key/value settings → typed shape (admin panel se editable). */
export type SiteSettings = {
  siteName: string;
  siteTagline: string;
  siteShortName: string;
  legalName: string;
  phone: string;
  alternatePhone: string;
  whatsapp: string;
  email: string;
  admissionsEmail: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  mapEmbedUrl: string;
  officeHours: string;
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  twitter: string;
  telegram: string;
  brandPrimary: string;
  brandAccent: string;
  chatbotEnabled: string; // "true" | "false"
  chatbotName: string;
  chatbotWelcome: string;
  foundedYear: string;
  studentsTrained: string;
  placementRate: string;
  averageRating: string;
  googleAnalyticsId: string;
  supportUpiId: string;
  supportBankName: string;
  supportAccountName: string;
  supportAccountNumber: string;
  supportIfsc: string;
};

export type SettingsKey = keyof SiteSettings;
