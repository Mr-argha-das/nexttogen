"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createCourse,
  createFaq,
  createPost,
  createTestimonial,
  deleteApplication,
  deleteCourse,
  deleteFaq,
  deleteMessage,
  deletePost,
  deleteSubscriber,
  deleteTestimonial,
  findUserByEmail,
  getCourseById,
  getPostById,
  subscribe,
  updateApplication,
  updateCourse,
  updateFaq,
  updateMessageStatus,
  updatePost,
  updateSettings,
  updateTestimonial,
} from "@/lib/data";
import { createSession, destroySession, hashPassword, requireAdmin, verifyCredentials } from "@/lib/auth";
import { firstError, loginSchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { execute } from "@/lib/db";

export type ActionState = { ok: boolean; message: string } | null;

/* ------------------------------- auth ---------------------------------- */

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { ok: false, message: firstError(parsed.error) };

  const user = await verifyCredentials(parsed.data.email, parsed.data.password);
  if (!user) return { ok: false, message: "Incorrect email or password. Please try again." };

  await createSession(user);
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

export async function changePasswordAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireAdmin();
  const current = String(formData.get("currentPassword") ?? "");
  const next = String(formData.get("newPassword") ?? "");
  if (next.length < 6) return { ok: false, message: "The new password must be at least 6 characters long." };

  const record = findUserByEmail(user.email);
  if (!record || !(await bcrypt.compare(current, record.passwordHash))) {
    return { ok: false, message: "The current password is incorrect." };
  }
  execute("UPDATE users SET passwordHash = ?, updatedAt = ? WHERE id = ?", [
    hashPassword(next),
    new Date().toISOString(),
    user.id,
  ]);
  return { ok: true, message: "Password updated ✅" };
}

/* ------------------------------ courses -------------------------------- */

export async function saveCourseAction(data: Record<string, unknown>): Promise<ActionState> {
  await requireAdmin();
  const slug = (data.slug as string) || slugify(String(data.title ?? ""));
  const payload = { ...data, slug };

  try {
    if (data.id) {
      updateCourse(String(data.id), payload);
    } else {
      createCourse(payload);
    }
  } catch (error) {
    const message = (error as Error).message.includes("UNIQUE")
      ? "A course with this slug already exists — please use a different slug."
      : "Could not save the course: " + (error as Error).message;
    return { ok: false, message };
  }

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  revalidatePath(`/courses/${slug}`);
  revalidatePath("/");
  return { ok: true, message: data.id ? "Course updated ✅" : "New course added ✅" };
}

export async function deleteCourseAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const course = getCourseById(id);
  deleteCourse(id);
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  if (course) revalidatePath(`/courses/${course.slug}`);
}

/* -------------------------------- blogs -------------------------------- */

export async function savePostAction(data: Record<string, unknown>): Promise<ActionState> {
  await requireAdmin();
  const slug = (data.slug as string) || slugify(String(data.title ?? ""));
  const payload = { ...data, slug };

  try {
    if (data.id) {
      updatePost(String(data.id), payload);
    } else {
      createPost(payload);
    }
  } catch (error) {
    const message = (error as Error).message.includes("UNIQUE")
      ? "A blog post with this slug already exists — please use a different slug."
      : "Could not save the blog post: " + (error as Error).message;
    return { ok: false, message };
  }

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  return { ok: true, message: data.id ? "Blog post updated ✅" : "Blog post published ✅" };
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const post = getPostById(id);
  deletePost(id);
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  if (post) revalidatePath(`/blog/${post.slug}`);
}

/* ---------------------------- testimonials ----------------------------- */

export async function saveTestimonialAction(data: Record<string, unknown>): Promise<ActionState> {
  await requireAdmin();
  try {
    if (data.id) updateTestimonial(String(data.id), data);
    else createTestimonial(data);
  } catch (error) {
    return { ok: false, message: "Could not save the testimonial: " + (error as Error).message };
  }
  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  revalidatePath("/");
  return { ok: true, message: data.id ? "Testimonial updated ✅" : "Testimonial added ✅" };
}

export async function deleteTestimonialAction(formData: FormData) {
  await requireAdmin();
  deleteTestimonial(String(formData.get("id") ?? ""));
  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  revalidatePath("/");
}

/* --------------------------------- faqs -------------------------------- */

export async function saveFaqAction(data: Record<string, unknown>): Promise<ActionState> {
  await requireAdmin();
  try {
    if (data.id) updateFaq(String(data.id), data);
    else createFaq(data as { question: string; answer: string; category?: string; sortOrder?: number; published?: boolean });
  } catch (error) {
    return { ok: false, message: "Could not save the FAQ: " + (error as Error).message };
  }
  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  revalidatePath("/");
  return { ok: true, message: data.id ? "FAQ updated ✅" : "New FAQ added ✅" };
}

export async function deleteFaqAction(formData: FormData) {
  await requireAdmin();
  deleteFaq(String(formData.get("id") ?? ""));
  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  revalidatePath("/");
}

/* ---------------------------- applications ----------------------------- */

export async function updateApplicationAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "NEW") as "NEW" | "CONTACTED" | "ENROLLED" | "REJECTED";
  const notes = String(formData.get("notes") ?? "");
  updateApplication(id, { status, notes });
  revalidatePath("/admin/applications");
  revalidatePath("/admin");
}

export async function deleteApplicationAction(formData: FormData) {
  await requireAdmin();
  deleteApplication(String(formData.get("id") ?? ""));
  revalidatePath("/admin/applications");
  revalidatePath("/admin");
}

/* ------------------------------- messages ------------------------------ */

export async function updateMessageAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "READ") as "NEW" | "READ" | "REPLIED";
  updateMessageStatus(id, status);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessageAction(formData: FormData) {
  await requireAdmin();
  deleteMessage(String(formData.get("id") ?? ""));
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

/* ----------------------------- subscribers ----------------------------- */

export async function addSubscriberAction(formData: FormData) {
  await requireAdmin();
  const email = String(formData.get("email") ?? "").trim();
  if (email) subscribe(email);
  revalidatePath("/admin/subscribers");
}

export async function deleteSubscriberAction(formData: FormData) {
  await requireAdmin();
  deleteSubscriber(String(formData.get("id") ?? ""));
  revalidatePath("/admin/subscribers");
}

/* ------------------------------- settings ------------------------------ */

export async function saveSettingsAction(data: Record<string, string>): Promise<ActionState> {
  await requireAdmin();
  try {
    updateSettings(data);
  } catch (error) {
    return { ok: false, message: "Could not save the settings: " + (error as Error).message };
  }
  // Poori site dobara render ho
  revalidatePath("/", "layout");
  return { ok: true, message: "Settings saved. The website is updated instantly." };
}

export async function resetViewsAction() {
  await requireAdmin();
  execute("UPDATE blogs SET views = 0", []);
  revalidatePath("/admin/blogs");
}
