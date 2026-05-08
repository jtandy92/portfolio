import type { MouseEvent, ReactNode } from "react";

export type DockApp = { id: string; label: string; icon: ReactNode };

export function Dock({
  apps,
  onOpen,
}: {
  apps: DockApp[];
  onOpen: (id: string, e: MouseEvent) => void;
}) {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[10000]">
      <div
        className="flex items-end gap-2 px-3 py-2 rounded-2xl backdrop-blur-xl"
        style={{
          background: "var(--dock-bg)",
          border: "1px solid var(--dock-border)",
          boxShadow: "0 10px 40px -10px oklch(0 0 0 / 0.45)",
        }}
      >
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={(e) => onOpen(app.id, e)}
            title={app.label}
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform hover:scale-110 hover:-translate-y-1 active:scale-95"
            aria-label={app.label}
          >
            {app.icon}
          </button>
        ))}
      </div>
    </div>
  );
}

export function DockIcon({ children, gradient }: { children: ReactNode; gradient: string }) {
  return (
    <div
      className="w-full h-full rounded-xl flex items-center justify-center text-white text-xl"
      style={{ background: gradient, boxShadow: "0 4px 12px -2px oklch(0 0 0 / 0.4)" }}
    >
      {children}
    </div>
  );
}
