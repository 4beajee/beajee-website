"use client";

import { useMemo } from "react";

// Deterministic pseudo-random — consistent across renders
function hash(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function starShadows(count: number, w: number, h: number, seed: number, spread: number): string {
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.round(hash(seed + i * 2) * w);
    const y = Math.round(hash(seed + i * 2 + 1) * h);
    const a = (0.2 + hash(seed + i * 3) * 0.8).toFixed(2);
    out.push(`${x}px ${y}px ${spread}px rgba(255,255,255,${a})`);
  }
  return out.join(",");
}

export function StarryBackground() {
  const small = useMemo(() => starShadows(150, 2560, 1440, 1, 0), []);
  const medium = useMemo(() => starShadows(35, 2560, 1440, 900, 1), []);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "radial-gradient(ellipse at 50% 40%, #06060f 0%, #020206 45%, #000 100%)" }}
      aria-hidden="true"
    >
      <div className="absolute w-px h-px top-0 left-0" style={{ boxShadow: small }} />
      <div className="absolute w-px h-px top-0 left-0" style={{ boxShadow: medium }} />
    </div>
  );
}
