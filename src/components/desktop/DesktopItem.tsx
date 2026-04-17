import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { Project } from "@/lib/portfolio";

type Props = {
  project: Project;
  x: number;
  y: number;
  onOpen: (e: MouseEvent) => void;
  onMove: (x: number, y: number) => void;
  onFocus: () => void;
  zIndex: number;
};

const DRAG_THRESHOLD = 4;
const CLICK_MAX_MS = 200; // press shorter than this (without movement) opens the window

export function DesktopItem({ project, x, y, onOpen, onMove, onFocus, zIndex }: Props) {
  const [dragging, setDragging] = useState(false);
  const xRef = useRef(x);
  const yRef = useRef(y);
  const onMoveRef = useRef(onMove);
  const onOpenRef = useRef(onOpen);
  useEffect(() => { xRef.current = x; }, [x]);
  useEffect(() => { yRef.current = y; }, [y]);
  useEffect(() => { onMoveRef.current = onMove; }, [onMove]);
  useEffect(() => { onOpenRef.current = onOpen; }, [onOpen]);

  const tileW = project.w * 0.7;
  const tileH = project.h * 0.7;

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    onFocus();

    const startX = e.clientX;
    const startY = e.clientY;
    const originX = xRef.current;
    const originY = yRef.current;
    let moved = false;

    const onMoveWin = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      if (!moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      if (!moved) {
        moved = true;
        setDragging(true);
      }
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const nx = Math.max(0, Math.min(vw - tileW, originX + dx));
      const ny = Math.max(28, Math.min(vh - tileH - 80, originY + dy));
      onMoveRef.current(nx, ny);
    };

    const onUpWin = (ev: PointerEvent) => {
      window.removeEventListener("pointermove", onMoveWin);
      window.removeEventListener("pointerup", onUpWin);
      window.removeEventListener("pointercancel", onUpWin);
      setDragging(false);
      if (!moved) {
        onOpenRef.current({ clientX: ev.clientX, clientY: ev.clientY } as unknown as MouseEvent);
      }
    };

    window.addEventListener("pointermove", onMoveWin);
    window.addEventListener("pointerup", onUpWin);
    window.addEventListener("pointercancel", onUpWin);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      className="absolute group flex flex-col items-center gap-1.5 focus:outline-none touch-none select-none"
      style={{
        left: x,
        top: y,
        width: tileW,
        cursor: dragging ? "grabbing" : "grab",
        zIndex,
        animation: dragging ? "none" : `tile-float ${4 + (project.id.length % 3)}s ease-in-out infinite`,
        transition: dragging ? "none" : "transform 0.15s",
        transform: dragging ? "scale(1.05)" : undefined,
        userSelect: "none",
      }}
    >
      <div
        className="rounded-md overflow-hidden w-full"
        style={{
          height: tileH,
          background: project.accent,
          boxShadow: dragging
            ? "0 20px 40px -8px oklch(0 0 0 / 0.5)"
            : "var(--shadow-tile)",
          pointerEvents: "none",
        }}
      >
        <TilePreview project={project} />
      </div>
      <span
        className="text-[11px] font-medium tracking-wide px-1.5 py-0.5 rounded pointer-events-none"
        style={{ color: "var(--tile-label)", textShadow: "0 1px 4px oklch(0 0 0 / 0.6)" }}
      >
        {project.title}
      </span>
    </div>
  );
}

// keep position lookup helpers next to the tile
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
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(pos)); } catch { /* ignore */ }
}

// Resolve a project's position: stored override → derived from project x/y % of viewport
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

function TilePreview({ project }: { project: Project }) {
  switch (project.kind) {
    case "video":
      return (
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(135deg, white 0%, transparent 60%)" }} />
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
            <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-black ml-1" />
          </div>
        </div>
      );
    case "card":
      return (
        <div className="w-full h-full p-3 flex flex-col justify-between">
          <div className="text-[10px] font-mono opacity-70">w.</div>
          <div className="space-y-1">
            <div className="h-1.5 rounded bg-black/20 w-2/3" />
            <div className="h-1.5 rounded bg-black/20 w-1/2" />
          </div>
        </div>
      );
    case "map":
      return (
        <div className="w-full h-full relative">
          <svg viewBox="0 0 100 80" className="w-full h-full opacity-90">
            <path d="M5,60 Q20,40 35,50 T65,30 T95,45" fill="none" stroke="white" strokeWidth="2" strokeDasharray="3 2" />
            <circle cx="5" cy="60" r="2.5" fill="white" />
            <circle cx="95" cy="45" r="2.5" fill="white" />
          </svg>
        </div>
      );
    case "chat":
      return (
        <div className="w-full h-full p-2 flex flex-col gap-1.5 justify-end">
          <div className="self-start max-w-[70%] rounded-2xl rounded-bl-sm bg-white/80 px-2 py-1 text-[9px]">you're the top creator on platform x by a big stretch 🚀</div>
          <div className="self-end max-w-[60%] rounded-2xl rounded-br-sm bg-blue-500 text-white px-2 py-1 text-[9px]">oh thanks!</div>
        </div>
      );
    case "note":
      return (
        <div className="w-full h-full p-2.5 flex flex-col gap-1">
          <div className="text-[9px] font-mono opacity-60">README.md</div>
          <div className="h-1 rounded bg-black/20 w-3/4" />
          <div className="h-1 rounded bg-black/20 w-1/2" />
          <div className="h-1 rounded bg-black/20 w-2/3" />
        </div>
      );
    case "image":
    default:
      return (
        <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${project.accent}, oklch(0.4 0.2 290))` }} />
      );
  }
}

// avoid unused import warning
void useEffect;
