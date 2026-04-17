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

export function MailApp() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  function handleSend() {
    const params = new URLSearchParams();
    if (subject) params.set("subject", subject);
    if (body) params.set("body", body);
    const qs = params.toString();
    window.location.href = `mailto:${encodeURIComponent(to)}${qs ? `?${qs}` : ""}`;
    setSent(true);
    setTimeout(() => setSent(false), 2200);
  }

  return (
    <div className="flex flex-col h-[420px] bg-white text-black">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-black/10 bg-gradient-to-b from-black/[0.03] to-black/[0.06]">
        <button
          onClick={handleSend}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium text-white shadow-sm hover:opacity-90 active:scale-[0.98] transition"
          style={{ background: "linear-gradient(180deg, oklch(0.7 0.18 250), oklch(0.55 0.22 260))" }}
        >
          <span>✈️</span> Send
        </button>
        <div className="w-px h-5 bg-black/10 mx-1" />
        <button className="px-2 py-1 rounded text-xs opacity-50 cursor-not-allowed">📎 Attach</button>
        <button className="px-2 py-1 rounded text-xs opacity-50 cursor-not-allowed">A</button>
        {sent && (
          <span className="ml-auto text-xs text-green-700 font-medium animate-pulse">Opening your mail app…</span>
        )}
      </div>

      <div className="px-3 text-xs">
        <FieldRow label="To:">
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="recipient@example.com"
            className="flex-1 bg-transparent outline-none py-2 text-sm"
          />
        </FieldRow>
        <FieldRow label="Subject:">
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="say hi 👋"
            className="flex-1 bg-transparent outline-none py-2 text-sm"
          />
        </FieldRow>
      </div>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={`hey ${NAME},\n\n`}
        className="flex-1 w-full px-4 py-3 text-sm leading-relaxed outline-none resize-none bg-white font-sans"
      />
    </div>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 border-b border-black/10">
      <span className="w-16 text-right text-[11px] uppercase tracking-wide opacity-50">{label}</span>
      {children}
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
