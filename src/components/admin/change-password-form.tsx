"use client";

import { useActionState } from "react";
import { KeyRound } from "lucide-react";
import { changePasswordAction, type ActionState } from "@/app/admin/actions";
import { SubmitButton, Toast } from "./ui";

export function ChangePasswordForm() {
  const [state, action] = useActionState<ActionState, FormData>(changePasswordAction, null);

  return (
    <div className="card p-5">
      <h2 className="flex items-center gap-2 font-heading text-[15px] font-bold">
        <KeyRound className="h-4 w-4 text-brand-600" /> Password badlein
      </h2>
      <form action={action} className="mt-3 space-y-3">
        <Toast state={state} />
        <div>
          <label className="label" htmlFor="currentPassword">
            Current password
          </label>
          <input id="currentPassword" name="currentPassword" type="password" required className="field" />
        </div>
        <div>
          <label className="label" htmlFor="newPassword">
            Naya password
          </label>
          <input id="newPassword" name="newPassword" type="password" required minLength={6} className="field" />
        </div>
        <SubmitButton className="btn btn-primary w-full" pendingText="Update ho raha hai…">
          Password update karein
        </SubmitButton>
      </form>
    </div>
  );
}
