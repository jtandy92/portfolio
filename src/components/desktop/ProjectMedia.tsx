import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Images, Play, Youtube } from "lucide-react";
import folderIcon from "@/assets/ui/folder-icon.png";
import type {
  PlaceholderMedia,
  Project,
  ProjectAlbumImage,
  ProjectFolderItem,
} from "@/lib/portfolio";

const FOLDER_CANVAS_PADDING = 24;
const FOLDER_ITEM_WIDTH = 132;
const FOLDER_ITEM_HEIGHT = 164;
const FOLDER_ITEM_GAP = 18;
const DRAG_THRESHOLD = 4;
const CLICK_MAX_MS = 220;
const NESTED_FOLDER_ICON_WIDTH = 125;
const NESTED_FOLDER_ICON_HEIGHT = 101;

type Point = {
  x: number;
  y: number;
};

export function ProjectFolderApp({
  project,
  onOpenAlbum,
  onOpenVideo,
  onOpenFolder,
}: {
  project: Project;
  onOpenAlbum: (project: Project, item?: ProjectFolderItem) => void;
  onOpenVideo: (project: Project, item: ProjectFolderItem) => void;
  onOpenFolder: (project: Project, item: ProjectFolderItem) => void;
}) {
  const folderItems = getProjectFolderItems(project);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 680, height: 420 });
  const [positions, setPositions] = useState<Record<string, Point>>(() =>
    loadFolderPositions(project.id),
  );
  const [tileZ, setTileZ] = useState<Record<string, number>>({});
  const [topTileZ, setTopTileZ] = useState(1);

  useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setCanvasSize({
        width: Math.max(width, FOLDER_ITEM_WIDTH + FOLDER_CANVAS_PADDING * 2),
        height: Math.max(height, FOLDER_ITEM_HEIGHT + FOLDER_CANVAS_PADDING * 2),
      });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function focusItem(id: string) {
    const nextZ = topTileZ + 1;
    setTopTileZ(nextZ);
    setTileZ((current) => ({ ...current, [id]: nextZ }));
  }

  function moveItem(id: string, x: number, y: number) {
    setPositions((current) => {
      const next = {
        ...current,
        [id]: clampFolderPoint({ x, y }, canvasSize.width, canvasSize.height),
      };
      saveFolderPositions(project.id, next);
      return next;
    });
  }

  return (
    <div className="flex min-h-[460px] flex-col bg-white/50">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 bg-white/45 px-4 py-3">
        <div>
          <div className="text-sm font-semibold text-black/80">{project.title}</div>
          <div className="text-[11px] uppercase tracking-wide text-black/45">
            assets / {project.id}
          </div>
        </div>
        <div className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-[11px] uppercase tracking-wide text-black/55">
          {folderItems.length} items
        </div>
      </div>

      <div
        ref={canvasRef}
        className="relative flex-1 overflow-hidden bg-[radial-gradient(circle_at_top,oklch(1_0_0/0.6),transparent_55%),linear-gradient(180deg,oklch(0.98_0.008_255),oklch(0.94_0.015_255))]"
      >
        {folderItems.map((item, index) => {
          const position = resolveFolderPosition(
            item.id,
            index,
            positions,
            canvasSize.width,
            canvasSize.height,
          );

          return (
            <FolderItemTile
              key={item.id}
              item={item}
              x={position.x}
              y={position.y}
              zIndex={tileZ[item.id] ?? 1}
              bounds={canvasSize}
              onMove={(x, y) => moveItem(item.id, x, y)}
              onFocus={() => focusItem(item.id)}
              onOpen={() => {
                if (item.kind === "folder") {
                  onOpenFolder(project, item);
                  return;
                }

                if (item.kind === "link") {
                  if (item.url) {
                    window.open(item.url, "_blank", "noopener,noreferrer");
                  }
                  return;
                }

                if (item.opensAlbum) {
                  onOpenAlbum(project, item);
                  return;
                }

                onOpenVideo(project, item);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function FolderItemTile({
  item,
  x,
  y,
  zIndex,
  bounds,
  onMove,
  onFocus,
  onOpen,
}: {
  item: ProjectFolderItem;
  x: number;
  y: number;
  zIndex: number;
  bounds: { width: number; height: number };
  onMove: (x: number, y: number) => void;
  onFocus: () => void;
  onOpen?: () => void;
}) {
  const [dragging, setDragging] = useState(false);
  const xRef = useRef(x);
  const yRef = useRef(y);
  const onMoveRef = useRef(onMove);
  const onOpenRef = useRef(onOpen);
  const boundsRef = useRef(bounds);

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

  useEffect(() => {
    boundsRef.current = bounds;
  }, [bounds]);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    onFocus();

    const startX = event.clientX;
    const startY = event.clientY;
    const startTime = performance.now();
    const originX = xRef.current;
    const originY = yRef.current;
    let moved = false;

    const handleMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      if (!moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;

      if (!moved) {
        moved = true;
        setDragging(true);
      }

      const next = clampFolderPoint(
        { x: originX + dx, y: originY + dy },
        boundsRef.current.width,
        boundsRef.current.height,
      );

      onMoveRef.current(next.x, next.y);
    };

    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
      setDragging(false);

      if (!moved && performance.now() - startTime < CLICK_MAX_MS) {
        onOpenRef.current?.();
      }
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      className="absolute flex select-none flex-col items-center gap-2 text-center"
      style={{
        left: x,
        top: y,
        width: FOLDER_ITEM_WIDTH,
        zIndex,
        cursor: dragging ? "grabbing" : "grab",
        transition: dragging ? "none" : "transform 0.14s ease, box-shadow 0.14s ease",
        transform: dragging ? "scale(1.04)" : undefined,
      }}
    >
      <FolderIcon item={item} />
      <div className="space-y-0.5">
        <div className="rounded bg-black/50 px-1.5 py-0.5 text-[12px] font-medium leading-tight text-white">
          {item.label}
        </div>
        {item.note && item.kind !== "folder" ? (
          <div className="text-[11px] leading-tight text-black/42">{item.note}</div>
        ) : null}
      </div>
    </div>
  );
}

function FolderIcon({ item }: { item: ProjectFolderItem }) {
  if (item.kind === "folder") {
    const thumbnailSrc = getFolderItemThumbnail(item);

    return (
      <div
        className="relative drop-shadow-[0_14px_22px_rgba(0,0,0,0.22)]"
        style={{ width: NESTED_FOLDER_ICON_WIDTH, height: NESTED_FOLDER_ICON_HEIGHT }}
      >
        <img
          src={folderIcon}
          alt=""
          className="h-full w-full object-contain"
          draggable={false}
        />
        <div className="absolute left-1/2 top-[56%] h-[44%] w-[42%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[9px] border border-black/12 bg-white/75 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.5)]">
          {thumbnailSrc ? (
            <img src={thumbnailSrc} alt="" className="h-full w-full object-cover" draggable={false} />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(135deg,oklch(0.88_0.08_92),oklch(0.72_0.13_72))]" />
          )}
        </div>
      </div>
    );
  }

  if (item.kind === "photos") {
    if (item.thumbnailUrl) {
      return (
        <div className="h-[84px] w-[84px] overflow-hidden rounded-[18px] border border-white/65 bg-black shadow-[0_16px_36px_-20px_oklch(0_0_0/0.6)]">
          <img src={item.thumbnailUrl} alt="" className="h-full w-full object-cover" />
        </div>
      );
    }

    return (
      <div className="flex h-[84px] w-[84px] items-center justify-center rounded-[22px] border border-white/65 bg-[linear-gradient(180deg,oklch(0.985_0.005_255),oklch(0.91_0.02_255))] text-black shadow-[0_16px_36px_-20px_oklch(0_0_0/0.6)]">
        <Images className="h-9 w-9 stroke-[1.7]" />
      </div>
    );
  }

  if (item.kind === "link") {
    if (item.thumbnailUrl) {
      return (
        <div className="flex h-[84px] w-[84px] items-center justify-center overflow-hidden rounded-[22px] border border-white/65 bg-white shadow-[0_16px_36px_-20px_oklch(0_0_0/0.6)]">
          <img
            src={item.thumbnailUrl}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      );
    }

    return (
      <div className="flex h-[84px] w-[84px] items-center justify-center rounded-[22px] border border-white/65 bg-[linear-gradient(180deg,oklch(0.975_0.008_255),oklch(0.9_0.02_255))] text-black shadow-[0_16px_36px_-20px_oklch(0_0_0/0.6)]">
        <ExternalLink className="h-9 w-9 stroke-[1.7]" />
      </div>
    );
  }

  const thumbnailSrc = getYouTubeThumbnailSrc(item);

  return (
    <div className="relative h-[84px] w-[84px] overflow-hidden rounded-[18px] border border-white/65 bg-black shadow-[0_16px_36px_-20px_oklch(0_0_0/0.6)]">
      {thumbnailSrc ? (
        <img src={thumbnailSrc} alt="" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,oklch(0.22_0.02_260),oklch(0.08_0.02_25))] text-white">
          <Youtube className="h-8 w-8" />
        </div>
      )}
      <div className="absolute inset-0 bg-black/18" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_8px_18px_-8px_oklch(0_0_0/0.7)]">
          <Play className="ml-0.5 h-4 w-4 fill-current" />
        </div>
      </div>
    </div>
  );
}

export function PhotoAlbumApp({ project, item }: { project: Project; item?: ProjectFolderItem }) {
  const images = getAlbumImages(project, item);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  const title = useMemo(() => {
    if (!activeImage) return "No photos";
    return `${item?.label ?? project.desktopLabel} / ${activeImage.slot}`;
  }, [activeImage, item?.label, project.desktopLabel]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((current) => wrapIndex(current - 1, images.length));
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((current) => wrapIndex(current + 1, images.length));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  if (!activeImage) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center bg-black text-sm text-white/70">
        No photos loaded for this album yet.
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-black text-white">
      <div className="shrink-0 border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-medium">{title}</div>
            <div className="text-[11px] uppercase tracking-wide text-white/45">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
          <div className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[11px] uppercase tracking-wide text-white/55">
            Photos
          </div>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-4 sm:px-6">
        <AlbumArrow
          direction="left"
          onClick={() => setActiveIndex((current) => wrapIndex(current - 1, images.length))}
        />

        <div className="flex h-full min-h-0 w-full items-center justify-center overflow-hidden rounded-lg bg-black">
          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className="h-auto max-h-full w-auto max-w-full object-contain"
          />
        </div>

        <AlbumArrow
          direction="right"
          onClick={() => setActiveIndex((current) => wrapIndex(current + 1, images.length))}
        />
      </div>

      <div className="shrink-0 border-t border-white/10 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <ThumbnailButton
              key={image.id}
              image={image}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function YouTubeVideoApp({ item }: { item: ProjectFolderItem }) {
  const embedUrl = getYouTubeEmbedUrl(item.youtubeUrl);
  const directVideoUrl = getDirectVideoUrl(item.url);

  return (
    <div className="h-full min-h-0 bg-black">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={item.label}
          className="h-full w-full border-0 bg-black"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : directVideoUrl ? (
        <video src={directVideoUrl} className="h-full w-full bg-black" controls autoPlay />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-black text-sm text-white/45">
          Video link pending.
        </div>
      )}
    </div>
  );
}

function getProjectFolderItems(project: Project) {
  if (project.folderItems?.length) return project.folderItems;

  return project.placeholderMedia.map((media): ProjectFolderItem => {
    if (media.kind === "image") {
      return {
        id: media.id,
        label: media.label,
        kind: "photos",
        note: media.note,
        opensAlbum: true,
        thumbnailUrl: media.url,
        url: media.url,
      };
    }

    return {
      id: media.id,
      label: media.label,
      kind: "video",
      note: media.note,
      youtubeUrl: isYouTubeUrl(media.url) ? media.url : undefined,
      url: media.url,
    };
  });
}

function getAlbumImages(project: Project, item?: ProjectFolderItem) {
  if (item?.albumImages?.length) return item.albumImages;

  if (item?.placeholderMedia?.length) {
    return item.placeholderMedia
      .filter((media) => media.kind === "image" && media.url)
      .map((media) => mediaToAlbumImage(project, media));
  }

  if (project.albumImages?.length) return project.albumImages;

  return project.placeholderMedia
    .filter((media) => media.kind === "image" && media.url)
    .map((media) => mediaToAlbumImage(project, media));
}

function mediaToAlbumImage(project: Project, media: PlaceholderMedia): ProjectAlbumImage {
  return {
    id: `${project.id}-${media.id}`,
    slot: media.id,
    alt: media.label,
    src: media.url ?? "",
  };
}

function AlbumArrow({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const positionClass = direction === "left" ? "left-6" : "right-6";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute ${positionClass} top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/55 text-white/80 backdrop-blur transition hover:bg-black/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30`}
      aria-label={direction === "left" ? "Previous image" : "Next image"}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

function ThumbnailButton({
  image,
  isActive,
  onClick,
}: {
  image: ProjectAlbumImage;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border transition ${
        isActive
          ? "border-white/65 ring-1 ring-white/35"
          : "border-white/10 opacity-65 hover:opacity-100"
      }`}
      aria-label={`Open ${image.slot}`}
      aria-pressed={isActive}
    >
      <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-black/55 px-1 py-0.5 text-[10px] uppercase tracking-wide text-white/80">
        {image.slot}
      </div>
    </button>
  );
}

function resolveFolderPosition(
  id: string,
  index: number,
  positions: Record<string, Point>,
  width: number,
  height: number,
) {
  const stored = positions[id];
  if (stored) {
    return clampFolderPoint(stored, width, height);
  }

  return getDefaultFolderPoint(index, width, height);
}

function getDefaultFolderPoint(index: number, width: number, height: number) {
  const safeWidth = Math.max(width, FOLDER_ITEM_WIDTH + FOLDER_CANVAS_PADDING * 2);
  const columns = Math.max(
    1,
    Math.floor(
      (safeWidth - FOLDER_CANVAS_PADDING * 2 + FOLDER_ITEM_GAP) /
        (FOLDER_ITEM_WIDTH + FOLDER_ITEM_GAP),
    ),
  );

  const point = {
    x: FOLDER_CANVAS_PADDING + (index % columns) * (FOLDER_ITEM_WIDTH + FOLDER_ITEM_GAP),
    y: FOLDER_CANVAS_PADDING + Math.floor(index / columns) * (FOLDER_ITEM_HEIGHT + FOLDER_ITEM_GAP),
  };

  return clampFolderPoint(point, width, height);
}

function clampFolderPoint(point: Point, width: number, height: number) {
  const maxX = Math.max(FOLDER_CANVAS_PADDING, width - FOLDER_ITEM_WIDTH - FOLDER_CANVAS_PADDING);
  const maxY = Math.max(FOLDER_CANVAS_PADDING, height - FOLDER_ITEM_HEIGHT - FOLDER_CANVAS_PADDING);

  return {
    x: Math.min(Math.max(point.x, FOLDER_CANVAS_PADDING), maxX),
    y: Math.min(Math.max(point.y, FOLDER_CANVAS_PADDING), maxY),
  };
}

function loadFolderPositions(projectId: string) {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(getFolderStorageKey(projectId));
    return raw ? (JSON.parse(raw) as Record<string, Point>) : {};
  } catch {
    return {};
  }
}

function saveFolderPositions(projectId: string, positions: Record<string, Point>) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(getFolderStorageKey(projectId), JSON.stringify(positions));
  } catch {
    // Ignore storage failures and keep the in-memory layout.
  }
}

function getFolderStorageKey(projectId: string) {
  return `portfolio-folder-layout:${projectId}`;
}

function getYouTubeThumbnailSrc(item: ProjectFolderItem) {
  if (item.thumbnailUrl) return item.thumbnailUrl;

  const videoId = getYouTubeVideoId(item.youtubeUrl ?? item.url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}

function getFolderItemThumbnail(item: ProjectFolderItem) {
  if (item.thumbnailUrl) return item.thumbnailUrl;

  return item.placeholderMedia?.find((media) => media.kind === "image" && media.url)?.url ?? null;
}

function getYouTubeEmbedUrl(url?: string) {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
}

function getYouTubeVideoId(url?: string) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return parsed.pathname.split("/").filter(Boolean)[0] ?? null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname.startsWith("/shorts/") || parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/").filter(Boolean)[1] ?? null;
      }

      return parsed.searchParams.get("v");
    }
  } catch {
    return null;
  }

  return null;
}

function isYouTubeUrl(url?: string) {
  return Boolean(getYouTubeVideoId(url));
}

function getDirectVideoUrl(url?: string) {
  if (!url || isYouTubeUrl(url)) return null;
  return /\.(mp4|webm|ogg)(\?|#|$)/i.test(url) ? url : null;
}

function wrapIndex(index: number, length: number) {
  if (length === 0) return 0;
  return (index + length) % length;
}
