"use client";

import { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import clsx from "clsx";

export default function ImageUpload({
  value,
  onChange,
  label = "Upload image",
  hint = "JPG/PNG/WEBP · max 5 MB",
  className = "",
  aspect = "aspect-video"
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
  className?: string;
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFile = async (f: File) => {
    setError(null);
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", f);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const j = await res.json();
      if (!res.ok || !j.ok) throw new Error(j.error || "Upload failed");
      onChange(j.url);
    } catch (e: any) {
      setError(e.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      <label className="block text-xs font-semibold uppercase tracking-wider text-ink-500 mb-2">
        {label}
      </label>

      {value ? (
        <div className={clsx("relative rounded-xl overflow-hidden border border-ink-200 bg-ink-50", aspect)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="upload preview" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-red-500 transition"
            aria-label="Remove"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-2 right-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-900 hover:bg-white"
          >
            Change
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={clsx(
            "w-full rounded-xl border-2 border-dashed border-ink-200 bg-ink-50/40 hover:border-brand-500 hover:bg-brand-50/40 transition flex flex-col items-center justify-center text-ink-500 gap-2",
            aspect,
            uploading && "opacity-60 pointer-events-none"
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin text-brand-700" />
              <span className="text-xs font-semibold">Uploading…</span>
            </>
          ) : (
            <>
              <ImageIcon className="h-7 w-7" />
              <div className="text-center">
                <p className="text-sm font-semibold text-ink-700">
                  <Upload className="h-3.5 w-3.5 inline-block mr-1" /> Click to {label.toLowerCase()}
                </p>
                <p className="text-[11px] mt-1">{hint}</p>
              </div>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
          e.target.value = "";
        }}
      />

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}

      {value && (
        <p className="mt-1 text-[11px] text-ink-400 font-mono truncate">{value}</p>
      )}
    </div>
  );
}
