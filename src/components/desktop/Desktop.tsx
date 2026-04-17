import { useEffect, useState, type MouseEvent } from "react";
import { PROJECTS, type Project } from "@/lib/portfolio";
import { MenuBar } from "./MenuBar";
import { Dock, DockIcon } from "./Dock";
import { DesktopItem, loadPositions, savePositions, resolvePosition, type Positions } from "./DesktopItem";
import { Window } from "./Window";
import { Tour } from "./Tour";
import { FinderApp, NotesApp, TerminalApp, TrashApp, ProjectApp } from "./apps";
import wallpaper from "@/assets/wallpaper.jpg";

type OpenWindow = {
  key: string;
  title: string;
  z: number;
  x: number;
  y: number;
  width: number;
  origin: { x: number; y: number } | null;
  content: React.ReactNode;
};

export function Desktop() {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [zTop, setZTop] = useState(10);
  const [positions, setPositions] = useState<Positions>({});
  const [tileZ, setTileZ] = useState<Record<string, number>>({});
  const [topTileZ, setTopTileZ] = useState(1);
  const [viewport, setViewport] = useState({ w: 1024, h: 768 });

  // Initialize positions from storage + viewport on mount, and listen for resize.
  useEffect(() => {
    setViewport({ w: window.innerWidth, h: window.innerHeight });
    setPositions(loadPositions());
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function moveTile(id: string, x: number, y: number) {
    setPositions((p) => {
      const next = { ...p, [id]: { x, y } };
      savePositions(next);
      return next;
    });
  }

  function focusTile(id: string) {
    const z = topTileZ + 1;
    setTopTileZ(z);
    setTileZ((m) => ({ ...m, [id]: z }));
  }

  function resetLayout() {
    setPositions({});
    savePositions({});
  }

  function open(key: string, title: string, content: React.ReactNode, width = 480, origin: { x: number; y: number } | null = null) {
    const newZ = zTop + 1;
    setZTop(newZ);
    setWindows((ws) => {
      const existing = ws.find((w) => w.key === key);
      if (existing) {
        return ws.map((w) => (w.key === key ? { ...w, z: newZ } : w));
      }
      const offset = ws.length * 24;
      const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
      const x = Math.max(20, Math.min(vw - width - 20, vw / 2 - width / 2 + offset));
      return [
        ...ws,
        { key, title, content, width, z: newZ, x, y: 80 + offset, origin },
      ];
    });
  }

  function focus(key: string) {
    const newZ = zTop + 1;
    setZTop(newZ);
    setWindows((ws) => ws.map((w) => (w.key === key ? { ...w, z: newZ } : w)));
  }

  function close(key: string) {
    setWindows((ws) => ws.filter((w) => w.key !== key));
  }

  function openProject(p: Project, e?: MouseEvent) {
    const origin = e ? { x: e.clientX, y: e.clientY } : null;
    open(`project:${p.id}`, p.title, <ProjectApp project={p} />, 460, origin);
  }

  function openDockApp(id: string, e?: MouseEvent) {
    const origin = e ? { x: e.clientX, y: e.clientY } : null;
    if (id === "finder") open("finder", "Finder — Projects", <FinderApp onOpenProject={(p) => openProject(p)} />, 560, origin);
    else if (id === "notes") open("notes", "Notes — about", <NotesApp />, 480, origin);
    else if (id === "terminal") open("terminal", "Terminal", <TerminalApp />, 520, origin);
    else if (id === "trash") open("trash", "Trash", <TrashApp />, 360, origin);
    else if (id === "mail") open("mail", "Mail", <div className="p-8 text-center text-sm opacity-70">say hi → hello@example.com</div>, 360, origin);
    else if (id === "music") open("music", "Music", <div className="p-8 text-center text-sm opacity-70">🎵 currently on loop: anything ambient</div>, 360, origin);
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden font-sans"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <MenuBar />

      <div className="absolute inset-0 pt-7 pb-24">
        {PROJECTS.map((p) => (
          <DesktopItem key={p.id} project={p} onOpen={(e) => openProject(p, e)} />
        ))}
      </div>

      {windows.map((w) => (
        <Window
          key={w.key}
          title={w.title}
          zIndex={w.z}
          initialX={w.x}
          initialY={w.y}
          width={w.width}
          origin={w.origin}
          onClose={() => close(w.key)}
          onFocus={() => focus(w.key)}
        >
          {w.content}
        </Window>
      ))}

      <Dock
        onOpen={openDockApp}
        apps={[
          { id: "finder", label: "Finder", icon: <DockIcon gradient="linear-gradient(135deg, oklch(0.7 0.15 240), oklch(0.5 0.2 260))">📁</DockIcon> },
          { id: "mail", label: "Mail", icon: <DockIcon gradient="linear-gradient(135deg, oklch(0.75 0.15 220), oklch(0.55 0.2 240))">✉️</DockIcon> },
          { id: "notes", label: "Notes", icon: <DockIcon gradient="linear-gradient(135deg, oklch(0.92 0.15 95), oklch(0.78 0.18 80))">📝</DockIcon> },
          { id: "music", label: "Music", icon: <DockIcon gradient="linear-gradient(135deg, oklch(0.7 0.2 350), oklch(0.55 0.22 20))">🎵</DockIcon> },
          { id: "terminal", label: "Terminal", icon: <DockIcon gradient="linear-gradient(135deg, oklch(0.25 0.02 270), oklch(0.1 0 0))">{">_"}</DockIcon> },
          { id: "trash", label: "Trash", icon: <DockIcon gradient="linear-gradient(135deg, oklch(0.85 0.02 270), oklch(0.65 0.04 270))">🗑️</DockIcon> },
        ]}
      />

      <Tour />
    </div>
  );
}
