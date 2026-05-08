import { useEffect, useRef, useState, type MouseEvent } from "react";
import { FolderOpen, Mail, Music4, StickyNote, TerminalSquare, Trash2 } from "lucide-react";
import { PROJECTS, type Project, type ProjectFolderItem } from "@/lib/portfolio";
import { MenuBar } from "./MenuBar";
import { Dock, DockIcon } from "./Dock";
import { DesktopItem } from "./DesktopItem";
import { loadPositions, savePositions, resolvePosition, type Positions } from "./DesktopPositions";
import { Window } from "./Window";
import {
  FinderApp,
  NotesApp,
  TerminalApp,
  TrashApp,
  ProjectApp,
  ProjectPhotoAlbum,
  ProjectYouTubeVideo,
  MailApp,
} from "./apps";
import wallpaper from "@/assets/wallpaper.jpg";

type OpenWindow = {
  key: string;
  title: string;
  z: number;
  x: number;
  y: number;
  width: number;
  height?: number | string;
  origin: { x: number; y: number } | null;
  contentOverflow: "auto" | "hidden";
  content: React.ReactNode;
};

const WINDOW_LAYER_Z = 100;

export function Desktop() {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const zTopRef = useRef(10);
  const [positions, setPositions] = useState<Positions>({});
  const [tileZ, setTileZ] = useState<Record<string, number>>({});
  const [topTileZ, setTopTileZ] = useState(1);
  const [viewport, setViewport] = useState({ w: 1024, h: 768 });

  function claimTopWindowZ() {
    const nextZ = zTopRef.current + 1;
    zTopRef.current = nextZ;
    return nextZ;
  }

  useEffect(() => {
    setViewport({ w: window.innerWidth, h: window.innerHeight });
    setPositions(loadPositions());
    const bootTimer = window.setTimeout(() => setIsBooting(false), 1350);
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(bootTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function moveTile(id: string, x: number, y: number) {
    setPositions((current) => {
      const next = { ...current, [id]: { x, y } };
      savePositions(next);
      return next;
    });
  }

  function focusTile(id: string) {
    const z = topTileZ + 1;
    setTopTileZ(z);
    setTileZ((current) => ({ ...current, [id]: z }));
  }

  function resetLayout() {
    setPositions({});
    savePositions({});
  }

  function open(
    key: string,
    title: string,
    content: React.ReactNode,
    width = 480,
    origin: { x: number; y: number } | null = null,
    contentOverflow: "auto" | "hidden" = "auto",
    height?: number | string,
  ) {
    const newZ = claimTopWindowZ();
    setWindows((current) => {
      const existing = current.find((windowItem) => windowItem.key === key);
      if (existing) {
        return current.map((windowItem) =>
          windowItem.key === key
            ? { ...windowItem, z: newZ, width, height, contentOverflow, content }
            : windowItem,
        );
      }

      const offset = current.length * 24;
      const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1024;
      const x = Math.max(
        20,
        Math.min(viewportWidth - width - 20, viewportWidth / 2 - width / 2 + offset),
      );

      return [
        ...current,
        { key, title, content, width, height, z: newZ, x, y: 80 + offset, origin, contentOverflow },
      ];
    });
  }

  function focus(key: string) {
    const newZ = claimTopWindowZ();
    setWindows((current) =>
      current.map((windowItem) =>
        windowItem.key === key ? { ...windowItem, z: newZ } : windowItem,
      ),
    );
  }

  function close(key: string) {
    setWindows((current) => current.filter((windowItem) => windowItem.key !== key));
  }

  function openProject(project: Project, event?: MouseEvent) {
    const origin = event ? { x: event.clientX, y: event.clientY } : null;
    open(
      `project:${project.id}`,
      project.desktopLabel,
      <ProjectApp
        project={project}
        onOpenAlbum={openProjectAlbum}
        onOpenVideo={openProjectVideo}
      />,
      getProjectWindowWidth(project),
      origin,
    );
  }

  function openProjectAlbum(project: Project, event?: MouseEvent) {
    const origin = event ? { x: event.clientX, y: event.clientY } : null;
    open(
      `project:${project.id}:photos`,
      `${project.desktopLabel} / photos`,
      <ProjectPhotoAlbum project={project} />,
      getAlbumWindowWidth(project),
      origin,
      "hidden",
      getAlbumWindowHeight(),
    );
  }

  function openProjectVideo(project: Project, item: ProjectFolderItem, event?: MouseEvent) {
    const origin = event ? { x: event.clientX, y: event.clientY } : null;
    open(
      `project:${project.id}:video:${item.id}`,
      `${project.desktopLabel} / ${item.label}`,
      <ProjectYouTubeVideo item={item} />,
      getVideoWindowWidth(),
      origin,
      "hidden",
      getVideoWindowHeight(),
    );
  }

  function openDockApp(id: string, event?: MouseEvent) {
    const origin = event ? { x: event.clientX, y: event.clientY } : null;

    if (id === "finder") {
      open("finder", "Finder - Projects", <FinderApp onOpenProject={openProject} />, 560, origin);
      return;
    }

    if (id === "notes") {
      open("notes", "Notes - about", <NotesApp />, 480, origin);
      return;
    }

    if (id === "terminal") {
      open("terminal", "Terminal", <TerminalApp />, 520, origin);
      return;
    }

    if (id === "trash") {
      open("trash", "Trash", <TrashApp />, 360, origin);
      return;
    }

    if (id === "mail") {
      open("mail", "New Message", <MailApp />, 520, origin);
      return;
    }

    if (id === "music") {
      open(
        "music",
        "Music",
        <div className="p-8 text-center text-sm opacity-70">
          currently on loop: anything ambient
        </div>,
        360,
        origin,
      );
    }
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
      <MenuBar onResetLayout={resetLayout} />

      <div className="absolute inset-0 z-10 pt-7 pb-24">
        {PROJECTS.map((project) => {
          const position = resolvePosition(project, positions, viewport.w, viewport.h);
          return (
            <DesktopItem
              key={project.id}
              project={project}
              x={position.x}
              y={position.y}
              zIndex={tileZ[project.id] ?? 1}
              onOpen={(event) => openProject(project, event)}
              onMove={(x, y) => moveTile(project.id, x, y)}
              onFocus={() => focusTile(project.id)}
            />
          );
        })}
      </div>

      {windows.map((windowItem) => (
        <Window
          key={windowItem.key}
          title={windowItem.title}
          zIndex={WINDOW_LAYER_Z + windowItem.z}
          initialX={windowItem.x}
          initialY={windowItem.y}
          width={windowItem.width}
          height={windowItem.height}
          origin={windowItem.origin}
          contentOverflow={windowItem.contentOverflow}
          onClose={() => close(windowItem.key)}
          onFocus={() => focus(windowItem.key)}
        >
          {windowItem.content}
        </Window>
      ))}

      <Dock
        onOpen={openDockApp}
        apps={[
          {
            id: "finder",
            label: "Finder",
            icon: (
              <DockIcon gradient="linear-gradient(135deg, oklch(0.7 0.15 240), oklch(0.5 0.2 260))">
                <FolderOpen className="h-6 w-6" />
              </DockIcon>
            ),
          },
          {
            id: "mail",
            label: "Mail",
            icon: (
              <DockIcon gradient="linear-gradient(135deg, oklch(0.75 0.15 220), oklch(0.55 0.2 240))">
                <Mail className="h-6 w-6" />
              </DockIcon>
            ),
          },
          {
            id: "notes",
            label: "Notes",
            icon: (
              <DockIcon gradient="linear-gradient(135deg, oklch(0.92 0.15 95), oklch(0.78 0.18 80))">
                <StickyNote className="h-6 w-6" />
              </DockIcon>
            ),
          },
          {
            id: "music",
            label: "Music",
            icon: (
              <DockIcon gradient="linear-gradient(135deg, oklch(0.7 0.2 350), oklch(0.55 0.22 20))">
                <Music4 className="h-6 w-6" />
              </DockIcon>
            ),
          },
          {
            id: "terminal",
            label: "Terminal",
            icon: (
              <DockIcon gradient="linear-gradient(135deg, oklch(0.25 0.02 270), oklch(0.1 0 0))">
                <TerminalSquare className="h-6 w-6" />
              </DockIcon>
            ),
          },
          {
            id: "trash",
            label: "Trash",
            icon: (
              <DockIcon gradient="linear-gradient(135deg, oklch(0.85 0.02 270), oklch(0.65 0.04 270))">
                <Trash2 className="h-6 w-6" />
              </DockIcon>
            ),
          },
        ]}
      />

      {isBooting ? (
        <div
          className="fixed inset-0 z-[20000] bg-black pointer-events-none"
          style={{ animation: "computer-boot-fade 1.35s ease-in-out forwards" }}
        />
      ) : null}
    </div>
  );
}

function getProjectWindowWidth(project: Project) {
  if (project.id === "red-lion-campaign") return 760;
  if (project.windowStyle === "about" || project.windowStyle === "contact") return 440;
  if (project.windowStyle === "archive-folder") return 720;
  return 680;
}

function getAlbumWindowWidth(project: Project) {
  if (project.id === "red-lion-campaign") return 1100;
  return 920;
}

function getAlbumWindowHeight() {
  return "calc(100vh - 100px)";
}

function getVideoWindowWidth() {
  return 920;
}

function getVideoWindowHeight() {
  return "min(70vh, 560px)";
}
