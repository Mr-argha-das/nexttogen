"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

type AuthContextType = {
  isAuthenticated: boolean;
  email: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  check: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  email: null,
  loading: true,
  login: async () => ({ ok: false }),
  logout: async () => {},
  check: async () => {}
});

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const check = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/me", { cache: "no-store", credentials: "same-origin" });
      if (res.ok) {
        const j = await res.json();
        setIsAuthenticated(true);
        setEmail(j.email);
      } else {
        setIsAuthenticated(false);
        setEmail(null);
      }
    } catch {
      setIsAuthenticated(false);
      setEmail(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { check(); }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password })
      });
      // The response may be a non-JSON error page (e.g. a 502 from the
      // preview proxy when the dev server is restarting). Parse defensively.
      const ct = res.headers.get("content-type") || "";
      let j: any = null;
      if (ct.includes("application/json")) {
        j = await res.json().catch(() => null);
      } else {
        await res.text().catch(() => "");
      }
      if (!j) {
        return {
          ok: false,
          error:
            res.status >= 500 || res.status === 0
              ? "Server is not responding. Please wait a moment and try again."
              : `Login failed (HTTP ${res.status}).`
        };
      }
      if (!res.ok || !j.ok) return { ok: false, error: j.error || "Login failed" };
      // Login succeeded and the auth cookie is set — mark authenticated
      // immediately so navigation to the dashboard is not blocked by a
      // subsequent verification round-trip. Refresh details in the background.
      setIsAuthenticated(true);
      setEmail(email.trim().toLowerCase());
      setLoading(false);
      check();
      return { ok: true };
    } catch (e: any) {
      return {
        ok: false,
        error: "Could not reach the server. Please check your connection and try again."
      };
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    setEmail(null);
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, loading, login, logout, check }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AuthContext);
}
