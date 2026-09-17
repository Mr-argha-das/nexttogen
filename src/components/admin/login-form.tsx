"use client";

import { useActionState } from "react";
import { Lock, Mail, LogIn } from "lucide-react";
import { loginAction, type ActionState } from "@/app/admin/actions";
import { SubmitButton, Toast } from "./ui";

export function LoginForm() {
  const [state, action] = useActionState<ActionState, FormData>(loginAction, null);

  return (
    <form action={action} className="space-y-4">
      <Toast state={state} />

      <div>
        <label className="label" htmlFor="email">
          Email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            defaultValue="admin@nexttogen.in"
            className="field pl-9"
            placeholder="admin@nexttogen.in"
          />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="field pl-9"
            placeholder="••••••••"
          />
        </div>
      </div>

      <SubmitButton className="btn btn-primary btn-lg w-full" pendingText="Login ho raha hai…">
        <LogIn className="h-4 w-4" /> Login karein
      </SubmitButton>
    </form>
  );
}
