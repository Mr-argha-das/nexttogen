"use client";

import { useEffect, useRef, useState } from "react";
import { Eraser, Check } from "lucide-react";

/**
 * Lightweight canvas signature pad (no dependencies).
 * Produces a transparent-background PNG data URL via onSave.
 */
export default function SignaturePad({
  onSave,
  color = "#0f1330"
}: {
  onSave: (dataUrl: string) => void;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [hasInk, setHasInk] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(ratio, ratio);
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = color;
    }
  }, [color]);

  const pos = (e: React.PointerEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e: React.PointerEvent) => {
    e.preventDefault();
    drawing.current = true;
    last.current = pos(e);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(last.current!.x, last.current!.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    if (!hasInk) setHasInk(true);
  };
  const end = () => {
    drawing.current = false;
    last.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
  };

  const save = () => {
    if (!hasInk) return;
    onSave(canvasRef.current!.toDataURL("image/png"));
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        className="w-full h-32 rounded-xl border border-white/15 bg-white touch-none cursor-crosshair"
        style={{ touchAction: "none" }}
      />
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-ink-700 hover:text-white hover:border-gold-400/50 transition"
        >
          <Eraser className="h-3.5 w-3.5" /> Clear
        </button>
        <button
          type="button"
          onClick={save}
          disabled={!hasInk}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gold-400/15 border border-gold-400/40 px-3 py-1.5 text-xs text-gold-200 hover:bg-gold-400/25 transition disabled:opacity-40"
        >
          <Check className="h-3.5 w-3.5" /> Use signature
        </button>
      </div>
    </div>
  );
}
