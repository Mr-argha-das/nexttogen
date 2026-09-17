"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { Loader2, Trash2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function SubmitButton({
  children,
  className = "btn btn-primary",
  pendingText = "Saving…",
}: {
  children: React.ReactNode;
  className?: string;
  pendingText?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> {pendingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function DeleteButton({
  action,
  id,
  label = "Delete",
  confirmText = "Delete permanently? This cannot be undone.",
  className = "btn btn-sm border border-rose-200 bg-white text-rose-600 hover:bg-rose-50",
}: {
  action: (formData: FormData) => void;
  id: string;
  label?: string;
  confirmText?: string;
  className?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirmText)) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className={className}>
        <Trash2 className="h-3.5 w-3.5" /> {label}
      </button>
    </form>
  );
}

export function Toast({ state }: { state: { ok: boolean; message: string } | null }) {
  const [visible, setVisible] = useState(Boolean(state));

  useEffect(() => {
    setVisible(Boolean(state));
    if (state?.ok) {
      const timer = window.setTimeout(() => setVisible(false), 4000);
      return () => window.clearTimeout(timer);
    }
  }, [state]);

  if (!state || !visible) return null;

  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-xl px-4 py-3 text-[13px] font-medium",
        state.ok ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-700",
      )}
      role="status"
    >
      {state.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
      <span className="flex-1">{state.message}</span>
      <button type="button" onClick={() => setVisible(false)} aria-label="Close">
        <X className="h-4 w-4 opacity-60" />
      </button>
    </div>
  );
}

export function Toggle({
  name,
  label,
  defaultChecked,
  hint,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
  hint?: string;
}) {
  const [checked, setChecked] = useState(Boolean(defaultChecked));
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <input
        type="checkbox"
        name={name}
        value="1"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600"
      />
      <span>
        <span className="block text-[13.5px] font-semibold text-ink">{label}</span>
        {hint ? <span className="block text-[12px] text-slate-500">{hint}</span> : null}
      </span>
    </label>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    NEW: "bg-amber-100 text-amber-800",
    CONTACTED: "bg-blue-100 text-blue-800",
    ENROLLED: "bg-emerald-100 text-emerald-800",
    REJECTED: "bg-slate-200 text-slate-700",
    READ: "bg-blue-100 text-blue-800",
    REPLIED: "bg-emerald-100 text-emerald-800",
  };
  const labels: Record<string, string> = {
    NEW: "New",
    CONTACTED: "Contacted",
    ENROLLED: "Enrolled",
    REJECTED: "Rejected",
    READ: "Read",
    REPLIED: "Replied",
  };
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-bold", map[status] ?? "bg-slate-100 text-slate-600")}>
      {labels[status] ?? status}
    </span>
  );
}

export function Field({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  required,
  hint,
  className,
  min,
  step,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
  type?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  min?: number;
  step?: number;
}) {
  return (
    <div className={className}>
      <label className="label" htmlFor={name}>
        {label} {required ? <span className="text-rose-500">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        min={min}
        step={step}
        className="field"
      />
      {hint ? <p className="mt-1 text-[11.5px] text-slate-500">{hint}</p> : null}
    </div>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  placeholder,
  rows = 4,
  required,
  hint,
  className,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="label" htmlFor={name}>
        {label} {required ? <span className="text-rose-500">*</span> : null}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="field resize-y font-[inherit]"
      />
      {hint ? <p className="mt-1 text-[11.5px] text-slate-500">{hint}</p> : null}
    </div>
  );
}
