"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import type { Faq } from "@/lib/types";
import { saveFaqAction, type ActionState } from "@/app/admin/actions";
import { Field, TextArea, Toast, Toggle } from "./ui";

export function FaqForm({ faq, onDone }: { faq?: Faq; onDone?: () => void }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<ActionState>(null);

  function submit(formData: FormData) {
    const payload: Record<string, unknown> = Object.fromEntries(formData.entries());
    payload.id = faq?.id;
    payload.sortOrder = Number(formData.get("sortOrder")) || 0;
    payload.published = formData.get("published") === "1";

    startTransition(async () => {
      const result = await saveFaqAction(payload);
      setState(result);
      if (result?.ok) {
        router.refresh();
        onDone?.();
      }
    });
  }

  return (
    <form action={submit} className="space-y-4">
      <Toast state={state} />
      <Field label="Question" name="question" defaultValue={faq?.question ?? ""} required placeholder="How does the EMI for fees work?" />
      <TextArea label="Answer" name="answer" defaultValue={faq?.answer ?? ""} required rows={3} />
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Category" name="category" defaultValue={faq?.category ?? "General"} hint="Admission, Fees, Classes, Placement..." />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={faq?.sortOrder ?? 0} />
        <div className="flex items-end">
          <Toggle name="published" label="Show on the website" defaultChecked={faq?.published ?? true} />
        </div>
      </div>
      <button type="submit" disabled={pending} className="btn btn-primary">
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Saving…
          </>
        ) : faq ? (
          "Save changes"
        ) : (
          "Add FAQ"
        )}
      </button>
    </form>
  );
}
