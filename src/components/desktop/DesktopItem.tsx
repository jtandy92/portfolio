import { useEffect, useRef, useState, type MouseEvent } from "react";
import folderIcon from "@/assets/ui/folder-icon.png";
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
const CLICK_MAX_MS = 200; // press shorter than this without movement opens the window

export function DesktopItem({ project, x, y, onOpen, onMove, onFocus, zIndex }: Props) {
  const [dragging, setDragging] = useState(false);
  const xRef = useRef(x);
  const yRef = useRef(y);
  const onMoveRef = useRef(onMove);
  const onOpenRef = useRef(onOpen);

  useEffect(() => {
    xRef.current = x;
  }, [x]);
  useEffect(() => {
    yRef.current = y;
  }, [y]);
  useEffect(() => {
    onMoveRef.current = onMove;
  }, [onMove]);
  useEffect(() => {
    onOpenRef.current = onOpen;
  }, [onOpen]);

  const tileW = project.w * 0.7;
  const tileH = project.h * 0.7;
  const useFolderDesktopIcon = shouldUseFolderDesktopIcon(project);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    onFocus();

    const startX = e.clientX;
    const startY = e.clientY;
    const startTime = performance.now();
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
      const elapsed = performance.now() - startTime;
      if (!moved && elapsed < CLICK_MAX_MS) {
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
        animation: dragging
          ? "none"
          : `tile-float ${4 + (project.id.length % 3)}s ease-in-out infinite`,
        transition: dragging ? "none" : "transform 0.15s",
        transform: dragging ? "scale(1.05)" : undefined,
        userSelect: "none",
      }}
    >
      <div
        className={`w-full ${useFolderDesktopIcon ? "overflow-visible" : "overflow-hidden rounded-md"}`}
        style={{
          height: tileH,
          background: useFolderDesktopIcon ? "transparent" : project.accent,
          boxShadow: useFolderDesktopIcon
            ? "none"
            : dragging
              ? "0 20px 40px -8px oklch(0 0 0 / 0.5)"
              : "var(--shadow-tile)",
          pointerEvents: "none",
        }}
      >
        <TilePreview project={project} />
      </div>
      <span
        className="text-[11px] font-medium tracking-wide px-1.5 py-0.5 rounded pointer-events-none text-center leading-tight"
        style={{ color: "var(--tile-label)", textShadow: "0 1px 4px oklch(0 0 0 / 0.6)" }}
      >
        {project.desktopLabel}
      </span>
    </div>
  );
}

function TilePreview({ project }: { project: Project }) {
  if (shouldUseFolderDesktopIcon(project)) {
    return <FolderDesktopPreview project={project} />;
  }

  return <ProjectDesktopArtwork project={project} />;
}

function ProjectDesktopArtwork({ project }: { project: Project }) {
  switch (project.windowStyle) {
    case "video-case":
    case "audiovisual-campaign":
      return (
        <div className="w-full h-full flex items-center justify-center relative">
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: "linear-gradient(135deg, white 0%, transparent 60%)" }}
          />
          <div className="absolute inset-x-2 top-2 flex gap-1">
            <span className="h-1.5 flex-1 rounded bg-black/25" />
            <span className="h-1.5 w-5 rounded bg-black/20" />
          </div>
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
            <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-black ml-1" />
          </div>
        </div>
      );
    case "editorial-gallery":
    case "website-preview":
      return (
        <div className="w-full h-full p-2 grid grid-cols-2 gap-1.5">
          <div className="rounded-sm bg-white/45 col-span-2" />
          <div className="rounded-sm bg-black/20" />
          <div className="rounded-sm bg-white/30" />
        </div>
      );
    case "game-artbook":
    case "game-launcher":
      return (
        <div className="w-full h-full p-2 flex flex-col justify-between">
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="aspect-square rounded-[2px] bg-black/25" />
            ))}
          </div>
          <div className="h-5 rounded bg-black/35 border border-white/25" />
        </div>
      );
    case "tool-demo":
      return (
        <div className="w-full h-full p-2">
          <div className="h-full rounded border border-white/35 bg-black/20 overflow-hidden">
            <div className="h-4 bg-white/30" />
            <div className="grid grid-cols-[1fr_2fr] gap-1 p-1.5 h-[calc(100%-1rem)]">
              <div className="rounded bg-black/25" />
              <div className="space-y-1">
                <div className="h-3 rounded bg-white/35" />
                <div className="h-10 rounded bg-black/20" />
              </div>
            </div>
          </div>
        </div>
      );
    case "archive-folder":
      return (
        <div className="w-full h-full p-2">
          <div className="h-4 w-1/2 rounded-t bg-white/50" />
          <div className="h-[calc(100%-1rem)] rounded-b rounded-tr bg-white/35 p-2 grid grid-cols-3 gap-1">
            <span className="rounded-sm bg-black/20" />
            <span className="rounded-sm bg-black/20" />
            <span className="rounded-sm bg-black/20" />
          </div>
        </div>
      );
    case "contact":
      return (
        <div className="w-full h-full p-3 flex flex-col justify-center gap-1.5">
          <div className="h-5 rounded bg-white/50" />
          <div className="h-1.5 rounded bg-black/25 w-3/4" />
          <div className="h-1.5 rounded bg-black/25 w-1/2" />
        </div>
      );
    case "about":
      return (
        <div className="w-full h-full p-2.5 flex flex-col gap-1">
          <div className="text-[9px] font-mono opacity-60">{project.desktopLabel}</div>
          <div className="h-1 rounded bg-black/20 w-3/4" />
          <div className="h-1 rounded bg-black/20 w-1/2" />
          <div className="h-1 rounded bg-black/20 w-2/3" />
        </div>
      );
    default:
      return (
        <div
          className="w-full h-full"
          style={{ background: `linear-gradient(135deg, ${project.accent}, oklch(0.4 0.2 290))` }}
        />
      );
  }
}

function FolderDesktopPreview({ project }: { project: Project }) {
  const thumbnailSrc = getProjectDesktopThumbnail(project);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <img
        src={folderIcon}
        alt=""
        className="h-full w-full object-contain drop-shadow-[0_18px_32px_rgba(0,0,0,0.28)]"
        draggable={false}
      />
      <div className="absolute left-1/2 top-[55%] h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[10px] border border-black/12 bg-white/70 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.45)]">
        {thumbnailSrc ? (
          <img src={thumbnailSrc} alt="" className="h-full w-full object-cover" draggable={false} />
        ) : (
          <div className="h-full w-full overflow-hidden rounded-[inherit] bg-white/55">
            <ProjectDesktopArtwork project={project} />
          </div>
        )}
      </div>
    </div>
  );
}

function shouldUseFolderDesktopIcon(project: Project) {
  return project.windowStyle !== "about" && project.windowStyle !== "contact";
}

function getProjectDesktopThumbnail(project: Project) {
  if (project.desktopThumbnailUrl) return project.desktopThumbnailUrl;

  const folderItemThumbnail = project.folderItems?.find((item) => item.thumbnailUrl)?.thumbnailUrl;
  if (folderItemThumbnail) return folderItemThumbnail;

  const nestedFolderThumbnail = project.folderItems
    ?.flatMap((item) => item.placeholderMedia ?? [])
    .find((media) => media.kind === "image" && media.url)?.url;
  if (nestedFolderThumbnail) return nestedFolderThumbnail;

  if (project.albumImages?.length) return project.albumImages[0]?.src ?? null;

  return (
    project.placeholderMedia.find((media) => media.kind === "image" && media.url)?.url ?? null
  );
}
