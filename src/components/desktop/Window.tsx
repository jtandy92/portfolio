import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  title: string;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  initialX: number;
  initialY: number;
  width?: number;
  children: ReactNode;
};

export function Window({ title, onClose, onFocus, zIndex, initialX, initialY, width = 480, children }: Props) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  useEffect(() => {
    function move(e: PointerEvent) {
      if (!drag.current) return;
      setPos({ x: e.clientX - drag.current.dx, y: e.clientY - drag.current.dy });
    }
    function up() { drag.current = null; }
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div
      onPointerDown={onFocus}
      className="fixed rounded-xl overflow-hidden flex flex-col"
      style={{
        left: pos.x,
        top: pos.y,
        width,
        maxWidth: "calc(100vw - 24px)",
        maxHeight: "calc(100vh - 100px)",
        zIndex,
        background: "var(--window-bg)",
        border: "1px solid var(--window-border)",
        boxShadow: "var(--shadow-window)",
        backdropFilter: "blur(20px)",
        animation: "window-in 0.18s ease-out",
      }}
    >
      <div
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
        }}
        className="h-8 px-3 flex items-center gap-2 cursor-grab active:cursor-grabbing select-none"
        style={{ background: "var(--window-titlebar)", borderBottom: "1px solid var(--window-border)" }}
      >
        <div className="flex gap-1.5">
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onClose}
            className="w-3 h-3 rounded-full hover:opacity-80"
            style={{ background: "var(--traffic-close)" }}
            aria-label="Close"
          />
          <span className="w-3 h-3 rounded-full" style={{ background: "var(--traffic-min)" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "var(--traffic-max)" }} />
        </div>
        <div className="flex-1 text-center text-xs font-medium text-foreground/80 truncate">{title}</div>
        <div className="w-12" />
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
