import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { getDashboardStats, getSettings } from "@/lib/data";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  title: "Admin Panel",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  const settings = getSettings();
  const stats = getDashboardStats();

  return (
    <AdminShell
      user={{ name: user.name, email: user.email }}
      siteName={settings.siteName}
      counts={{ applications: stats.newApplications, messages: stats.newMessages }}
    >
      {children}
    </AdminShell>
  );
}
