"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { allCourses, allPosts, testimonials, faqs } from "@/lib/data";
import type { Course, Testimonial, BlogPost } from "@/lib/data";

export type SiteDataClient = {
  siteName: string;
  tagline: string;
  heroHeadline: string;
  heroItalic: string;
  heroDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  courses: Course[];
  testimonials: Testimonial[];
  posts: BlogPost[];
  faqs: { q: string; a: string }[];
};

const CACHE_KEY = "ntg_site_cache_v1";
type Status = "idle" | "loading" | "ready" | "error";

const fallbackData: SiteDataClient = {
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

type DataContextType = {
  data: SiteDataClient;
  status: Status;
  ready: boolean;
  savePatch: (patch: Partial<SiteDataClient>) => Promise<{ ok: boolean; error?: string }>;
  reload: () => Promise<void>;
};

const DataContext = createContext<DataContextType>({
  data: fallbackData,
  status: "idle",
  ready: false,
  savePatch: async () => ({ ok: false }),
  reload: async () => {}
});

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteDataClient>(fallbackData);
  const [status, setStatus] = useState<Status>("loading");
  const [ready, setReady] = useState(false);

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/data", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.ok && json.data) {
          const merged: SiteDataClient = { ...fallbackData, ...json.data };
          setData(merged);
          try { localStorage.setItem(CACHE_KEY, JSON.stringify(merged)); } catch {}
        }
      }
    } catch {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          setData({ ...fallbackData, ...JSON.parse(cached) });
        }
      } catch {}
    } finally {
      setStatus("ready");
      setReady(true);
    }
  }, []);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) setData({ ...fallbackData, ...JSON.parse(cached) });
    } catch {}
    load();
  }, [load]);

  const savePatch = async (patch: Partial<SiteDataClient>) => {
    const next: SiteDataClient = { ...data, ...patch };
    setData(next);
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(next)); } catch {}
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return { ok: false, error: err.error || "Failed to save" };
      }
      const json = await res.json();
      if (json.ok && json.data) setData({ ...fallbackData, ...json.data });
      return { ok: true };
    } catch (e: any) {
      return { ok: false, error: e.message || "Network error" };
    }
  };

  return (
    <DataContext.Provider value={{ data, status, ready, savePatch, reload: load }}>
      {children}
    </DataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(DataContext);
}
