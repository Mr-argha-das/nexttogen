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
      const res = await fetch("/api/admin/me", { cache: "no-store" });
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
        body: JSON.stringify({ email, password })
      });
      const j = await res.json();
      if (!res.ok || !j.ok) return { ok: false, error: j.error || "Login failed" };
      await check();
      return { ok: true };
    } catch (e: any) {
      return { ok: false, error: e.message };
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
