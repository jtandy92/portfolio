import type { Project } from "@/lib/portfolio";

const STORAGE_KEY = "desktop-tile-positions-v1";

export type Positions = Record<string, { x: number; y: number }>;

export function loadPositions(): Positions {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Positions) : {};
  } catch {
    return {};
  }
}

export function savePositions(pos: Positions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
  } catch {
    /* ignore */
  }
}

export function resolvePosition(project: Project, stored: Positions, vw: number, vh: number) {
  const s = stored[project.id];
  if (s) return s;
  const tileW = project.w * 0.7;
  const tileH = project.h * 0.7;
  const cx = (project.x / 100) * vw;
  const cy = (project.y / 100) * vh;
  return {
    x: Math.max(0, Math.min(vw - tileW, cx - tileW / 2)),
    y: Math.max(28, Math.min(vh - tileH - 80, cy - tileH / 2)),
  };
}
