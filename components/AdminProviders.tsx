"use client";

import { ReactNode } from "react";
import { AdminAuthProvider } from "@/lib/adminAuth";
import { SiteDataProvider } from "@/lib/siteData";

export default function AdminProviders({ children }: { children: ReactNode }) {
  return (
    <SiteDataProvider>
      <AdminAuthProvider>{children}</AdminAuthProvider>
    </SiteDataProvider>
  );
}
