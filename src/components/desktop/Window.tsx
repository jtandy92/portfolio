import { useEffect, useRef, useState, type ReactNode } from "react";
import { MENU_BAR_HEIGHT } from "./MenuBar";

type Props = {
  title: string;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  initialX: number;
  initialY: number;
  width?: number;
  height?: number | string;
  origin?: { x: number; y: number } | null;
  contentOverflow?: "auto" | "hidden";
  children: ReactNode;
};

export function Window({
  title,
  onClose,
  onFocus,
  zIndex,
  initialX,
  initialY,
  width = 480,
  height,
  origin,
  contentOverflow = "auto",
  children,
}: Props) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [closing, setClosing] = useState(false);
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  useEffect(() => {
    function move(e: PointerEvent) {
      if (!drag.current) return;
      setPos({
        x: e.clientX - drag.current.dx,
        y: Math.max(MENU_BAR_HEIGHT, e.clientY - drag.current.dy),
      });
    }
    function up() {
      drag.current = null;
    }
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  function handleClose() {
    setClosing(true);
    setTimeout(onClose, 220);
  }

  // Compute transform-origin relative to the window's own top-left
  const transformOrigin = origin ? `${origin.x - pos.x}px ${origin.y - pos.y}px` : "center center";

  return (
    <div
      onPointerDown={onFocus}
      className="fixed rounded-xl overflow-hidden flex flex-col"
      style={{
        left: pos.x,
        top: pos.y,
        width,
        height,
        maxWidth: "calc(100vw - 24px)",
        maxHeight: "calc(100vh - 100px)",
        zIndex,
        background: "var(--window-bg)",
        border: "1px solid var(--window-border)",
        boxShadow: "var(--shadow-window)",
        backdropFilter: "blur(20px)",
        transformOrigin,
        animation: closing
          ? "window-pop-out 0.22s cubic-bezier(0.5, 0, 0.75, 0) forwards"
          : "window-pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
        }}
        className="h-8 px-3 flex items-center gap-2 cursor-grab active:cursor-grabbing select-none"
        style={{
          background: "var(--window-titlebar)",
          borderBottom: "1px solid var(--window-border)",
        }}
      >
        <div className="flex gap-1.5">
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleClose}
            className="w-3 h-3 rounded-full hover:opacity-80"
            style={{ background: "var(--traffic-close)" }}
            aria-label="Close"
          />
          <span className="w-3 h-3 rounded-full" style={{ background: "var(--traffic-min)" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "var(--traffic-max)" }} />
        </div>
        <div className="flex-1 text-center text-xs font-medium text-foreground/80 truncate">
          {title}
        </div>
        <div className="w-12" />
      </div>
      <div
        className={`min-h-0 flex-1 ${
          contentOverflow === "hidden" ? "overflow-hidden" : "overflow-auto"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
