import type { Project } from "@/lib/portfolio";

const MOBILE_BREAKPOINT = 768;
const STORAGE_KEYS = {
  desktop: "desktop-tile-positions-v2",
  mobile: "desktop-tile-positions-mobile-v1",
} as const;

export type Positions = Record<string, { x: number; y: number }>;
export type LayoutMode = "desktop" | "mobile";

const MOBILE_LAYOUT: Record<
  string,
  { column: 0 | 1; row: number; align?: "start" | "center"; offsetY?: number }
> = {
  "body-mind-packaging": { column: 0, row: 0 },
  survansix: { column: 1, row: 0 },
  "meu-cabelo": { column: 0, row: 1 },
  ilustration: { column: 1, row: 1 },
  "red-lion-campaign": { column: 0, row: 2 },
  contact: { column: 1, row: 2, align: "center", offsetY: 10 },
  about: { column: 1, row: 3, align: "center", offsetY: 10 },
};

export function getLayoutMode(vw: number) {
  return vw < MOBILE_BREAKPOINT ? "mobile" : "desktop";
}

export function getTileScale(vw: number) {
  return getLayoutMode(vw) === "mobile" ? 0.45 : 0.7;
}

export function getTileSize(project: Project, vw: number) {
  const scale = getTileScale(vw);
  return {
    width: project.w * scale,
    height: project.h * scale,
  };
}

export function loadPositions(layoutMode: LayoutMode): Positions {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS[layoutMode]);
    return raw ? (JSON.parse(raw) as Positions) : {};
  } catch {
    return {};
  }
}

export function savePositions(pos: Positions, layoutMode: LayoutMode) {
  try {
    localStorage.setItem(STORAGE_KEYS[layoutMode], JSON.stringify(pos));
  } catch {
    /* ignore */
  }
}

export function resolvePosition(project: Project, stored: Positions, vw: number, vh: number) {
  const s = stored[project.id];
  const tile = getTileSize(project, vw);
  if (s) {
    return clampPosition(s.x, s.y, tile.width, tile.height, vw, vh);
  }

  if (getLayoutMode(vw) === "mobile") {
    return resolveMobilePosition(project, tile.width, tile.height, vw, vh);
  }

  const cx = (project.x / 100) * vw;
  const cy = (project.y / 100) * vh;
  return clampPosition(cx - tile.width / 2, cy - tile.height / 2, tile.width, tile.height, vw, vh);
}

function resolveMobilePosition(project: Project, tileW: number, tileH: number, vw: number, vh: number) {
  const layout = MOBILE_LAYOUT[project.id];
  if (!layout) {
    const cx = (project.x / 100) * vw;
    const cy = (project.y / 100) * vh;
    return clampPosition(cx - tileW / 2, cy - tileH / 2, tileW, tileH, vw, vh);
  }

  const pagePadding = Math.max(18, Math.min(26, vw * 0.05));
  const columnGap = 18;
  const columnWidth = 350 * getTileScale(vw);
  const totalWidth = columnWidth * 2 + columnGap;
  const leftColumnX = Math.max(pagePadding, (vw - totalWidth) / 2);
  const rightColumnX = leftColumnX + columnWidth + columnGap;
  const topPadding = 54;
  const rowStep = 184;

  let x = layout.column === 0 ? leftColumnX : rightColumnX;
  if (layout.align === "center") {
    x += (columnWidth - tileW) / 2;
  }

  const y = topPadding + layout.row * rowStep + (layout.offsetY ?? 0);
  return clampPosition(x, y, tileW, tileH, vw, Math.max(vh, y + tileH + 96));
}

function clampPosition(x: number, y: number, tileW: number, tileH: number, vw: number, vh: number) {
  return {
    x: Math.max(0, Math.min(vw - tileW, x)),
    y: Math.max(28, Math.min(vh - tileH - 80, y)),
  };
}
