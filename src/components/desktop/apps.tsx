import { useState } from "react";
import { ABOUT, NAME, PROJECTS, type Project } from "@/lib/portfolio";

export function FinderApp({ onOpenProject }: { onOpenProject: (p: Project) => void }) {
  return (
    <div className="flex h-full">
      <div className="w-40 p-3 text-xs space-y-1 border-r border-black/10 bg-black/[0.02]">
        <div className="font-semibold opacity-60 mb-2">Favorites</div>
        <div className="px-2 py-1 rounded bg-black/10">📁 Projects</div>
        <div className="px-2 py-1 opacity-60">🖼️ Images</div>
        <div className="px-2 py-1 opacity-60">🎬 Videos</div>
      </div>
      <div className="flex-1 p-3 overflow-auto">
        <div className="text-xs opacity-60 mb-2">{PROJECTS.length} items</div>
        <div className="space-y-0.5">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => onOpenProject(p)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm hover:bg-black/5 text-left"
            >
              <div className="w-4 h-4 rounded" style={{ background: p.accent }} />
              <span>{p.title}</span>
              <span className="ml-auto text-xs opacity-40">{p.kind}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NotesApp() {
  return (
    <div className="p-6 prose prose-sm max-w-none">
      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed bg-transparent p-0 m-0">{ABOUT}</pre>
    </div>
  );
}

export function TerminalApp() {
  const [history, setHistory] = useState<string[]>([
    `Last login: today on console`,
    `${NAME}@portfolio ~ %`,
  ]);
  const [input, setInput] = useState("");

  function run(cmd: string) {
    const out: string[] = [`${NAME}@portfolio ~ % ${cmd}`];
    const c = cmd.trim().toLowerCase();
    if (c === "help") out.push("commands: help, ls, whoami, projects, contact, clear");
    else if (c === "ls") out.push(PROJECTS.map((p) => p.title).join("  "));
    else if (c === "whoami") out.push(NAME);
    else if (c === "projects") out.push(`${PROJECTS.length} projects on the desktop`);
    else if (c === "contact") out.push("hello@example.com");
    else if (c === "clear") { setHistory([`${NAME}@portfolio ~ %`]); setInput(""); return; }
    else if (c === "") { /* noop */ }
    else out.push(`zsh: command not found: ${cmd}`);
    out.push(`${NAME}@portfolio ~ %`);
    setHistory((h) => [...h.slice(0, -1), ...out]);
    setInput("");
  }

  return (
    <div className="h-full p-3 font-mono text-xs bg-black text-green-300 overflow-auto" onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement)?.focus()}>
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {i === history.length - 1 ? (
            <span className="flex">
              <span>{line} </span>
              <input
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") run(input); }}
                className="flex-1 bg-transparent outline-none text-green-300"
              />
            </span>
          ) : line}
        </div>
      ))}
    </div>
  );
}

export function TrashApp() {
  const messages = [
    "the trash is empty.",
    "(this is where bad ideas go to die.)",
    "drag something here. or don't. i'm not your boss.",
  ];
  return (
    <div className="p-8 text-center space-y-2">
      <div className="text-5xl">🗑️</div>
      {messages.map((m, i) => <p key={i} className="text-sm opacity-70">{m}</p>)}
    </div>
  );
}

export function ProjectApp({ project }: { project: Project }) {
  return (
    <div className="p-6">
      <div
        className="w-full h-48 rounded-lg mb-4 flex items-center justify-center text-white/80 text-sm"
        style={{ background: `linear-gradient(135deg, ${project.accent}, oklch(0.3 0.15 280))` }}
      >
        {project.kind} preview
      </div>
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-sm opacity-80 leading-relaxed">{project.body}</p>
    </div>
  );
}
