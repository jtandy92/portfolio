import { useState } from "react";
import { PROJECTS, type Project } from "@/lib/portfolio";
import { MenuBar } from "./MenuBar";
import { Dock, DockIcon } from "./Dock";
import { DesktopItem } from "./DesktopItem";
import { Window } from "./Window";
import { Tour } from "./Tour";
import { FinderApp, NotesApp, TerminalApp, TrashApp, ProjectApp } from "./apps";

type OpenWindow = {
  key: string;
  title: string;
  z: number;
  x: number;
  y: number;
  width: number;
  content: React.ReactNode;
};

export function Desktop() {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [zTop, setZTop] = useState(10);

  function open(key: string, title: string, content: React.ReactNode, width = 480) {
    setZTop((z) => z + 1);
    setWindows((ws) => {
      if (ws.find((w) => w.key === key)) {
        return ws.map((w) => (w.key === key ? { ...w, z: zTop + 1 } : w));
      }
      const offset = ws.length * 24;
      return [
        ...ws,
        {
          key, title, content, width,
          z: zTop + 1,
          x: 80 + offset,
          y: 80 + offset,
        },
      ];
    });
  }

  function focus(key: string) {
    setZTop((z) => z + 1);
    setWindows((ws) => ws.map((w) => (w.key === key ? { ...w, z: zTop + 1 } : w)));
  }

  function close(key: string) {
    setWindows((ws) => ws.filter((w) => w.key !== key));
  }

  function openProject(p: Project) {
    open(`project:${p.id}`, p.title, <ProjectApp project={p} />, 460);
  }

  function openDockApp(id: string) {
    if (id === "finder") open("finder", "Finder — Projects", <FinderApp onOpenProject={openProject} />, 560);
    else if (id === "notes") open("notes", "Notes — about", <NotesApp />, 480);
    else if (id === "terminal") open("terminal", "Terminal", <TerminalApp />, 520);
    else if (id === "trash") open("trash", "Trash", <TrashApp />, 360);
    else if (id === "mail") open("mail", "Mail", <div className="p-8 text-center text-sm opacity-70">say hi → hello@example.com</div>, 360);
    else if (id === "music") open("music", "Music", <div className="p-8 text-center text-sm opacity-70">🎵 currently on loop: anything ambient</div>, 360);
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden font-sans"
      style={{ background: "var(--desktop-bg)" }}
    >
      <MenuBar />

      <div className="absolute inset-0 pt-7 pb-24">
        {PROJECTS.map((p) => (
          <DesktopItem key={p.id} project={p} onOpen={() => openProject(p)} />
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
