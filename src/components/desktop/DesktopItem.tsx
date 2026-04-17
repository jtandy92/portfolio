import type { MouseEvent } from "react";
import type { Project } from "@/lib/portfolio";

export function DesktopItem({ project, onOpen }: { project: Project; onOpen: (e: MouseEvent) => void }) {
  return (
    <button
      onClick={onOpen}
      className="absolute group flex flex-col items-center gap-1.5 focus:outline-none"
      style={{
        left: `${project.x}%`,
        top: `${project.y}%`,
        transform: "translate(-50%, -50%)",
        animation: `tile-float ${4 + (project.x % 3)}s ease-in-out infinite`,
      }}
    >
      <div
        className="rounded-md overflow-hidden transition-transform group-hover:scale-105 group-focus:scale-105 ring-0 group-focus:ring-2 ring-white/70"
        style={{
          width: project.w * 0.7,
          height: project.h * 0.7,
          background: project.accent,
          boxShadow: "var(--shadow-tile)",
        }}
      >
        <TilePreview project={project} />
      </div>
      <span
        className="text-[11px] font-medium tracking-wide px-1.5 py-0.5 rounded"
        style={{ color: "var(--tile-label)", textShadow: "0 1px 4px oklch(0 0 0 / 0.6)" }}
      >
        {project.title}
      </span>
    </button>
  );
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
