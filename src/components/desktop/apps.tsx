import { useState } from "react";
import {
  ABOUT,
  CONTACT_LINKS,
  NAME,
  PROJECTS,
  type ExternalLink,
  type GroupedProjectItem,
  type PlaceholderMedia,
  type Project,
  type ProjectFolderItem,
} from "@/lib/portfolio";
import { PhotoAlbumApp, ProjectFolderApp, YouTubeVideoApp } from "./ProjectMedia";

function getMediaEmbed(url: string) {
  try {
    const parsed = new URL(url, "https://portfolio.local");
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      const videoId =
        parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean).at(-1);

      if (videoId) {
        return {
          kind: "iframe" as const,
          src: `https://www.youtube.com/embed/${videoId}`,
        };
      }
    }

    if (host === "youtu.be") {
      const videoId = parsed.pathname.split("/").filter(Boolean)[0];
      if (videoId) {
        return {
          kind: "iframe" as const,
          src: `https://www.youtube.com/embed/${videoId}`,
        };
      }
    }

    if (host === "youtube-nocookie.com") {
      return {
        kind: "iframe" as const,
        src: `https://${host}${parsed.pathname}`,
      };
    }

    if (host === "vimeo.com") {
      const videoId = parsed.pathname.split("/").filter(Boolean)[0];
      if (videoId) {
        return {
          kind: "iframe" as const,
          src: `https://player.vimeo.com/video/${videoId}`,
        };
      }
    }

    if (/\.(mp4|webm|ogg)(\?|#|$)/i.test(url)) {
      return { kind: "video" as const, src: url };
    }
  } catch {
    return null;
  }

  return null;
}

export function FinderApp({ onOpenProject }: { onOpenProject: (p: Project) => void }) {
  return (
    <div className="flex h-full min-h-[360px]">
      <div className="w-40 shrink-0 p-3 text-xs space-y-1 border-r border-black/10 bg-black/[0.02] hidden sm:block">
        <div className="font-semibold opacity-60 mb-2">Favorites</div>
        <div className="px-2 py-1 rounded bg-black/10">Projects</div>
        <div className="px-2 py-1 opacity-60">Games</div>
        <div className="px-2 py-1 opacity-60">Identity</div>
        <div className="px-2 py-1 opacity-60">System</div>
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
              <span className="min-w-0 truncate">{p.desktopLabel}</span>
              <span className="ml-auto text-xs opacity-40 hidden sm:inline">{p.type}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NotesApp() {
  return (
    <div className="p-6">
      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed bg-transparent p-0 m-0">
        {ABOUT}
      </pre>
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
    else if (c === "ls") out.push(PROJECTS.map((p) => p.desktopLabel).join("  "));
    else if (c === "whoami") out.push(NAME);
    else if (c === "projects") out.push(`${PROJECTS.length} desktop items`);
    else if (c === "contact")
      out.push(CONTACT_LINKS.map((link) => `${link.label}: ${link.url}`).join("  "));
    else if (c === "clear") {
      setHistory([`${NAME}@portfolio ~ %`]);
      setInput("");
      return;
    } else if (c === "") {
      /* noop */
    } else out.push(`zsh: command not found: ${cmd}`);
    out.push(`${NAME}@portfolio ~ %`);
    setHistory((h) => [...h.slice(0, -1), ...out]);
    setInput("");
  }

  return (
    <div
      className="h-full min-h-[320px] p-3 font-mono text-xs bg-black text-green-300 overflow-auto"
      onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement)?.focus()}
    >
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {i === history.length - 1 ? (
            <span className="flex">
              <span>{line} </span>
              <input
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") run(input);
                }}
                className="flex-1 bg-transparent outline-none text-green-300"
              />
            </span>
          ) : (
            line
          )}
        </div>
      ))}
    </div>
  );
}

export function TrashApp() {
  return (
    <div className="p-8 text-center space-y-2">
      <div className="text-4xl">Trash</div>
      <p className="text-sm opacity-70">the trash is empty.</p>
      <p className="text-sm opacity-70">placeholder projects removed.</p>
    </div>
  );
}

export function MailApp() {
  const [to, setTo] = useState(CONTACT_LINKS[0]?.url.replace("mailto:", "") ?? "");
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
          style={{
            background: "linear-gradient(180deg, oklch(0.7 0.18 250), oklch(0.55 0.22 260))",
          }}
        >
          Send
        </button>
        <div className="w-px h-5 bg-black/10 mx-1" />
        <button className="px-2 py-1 rounded text-xs opacity-50 cursor-not-allowed">Attach</button>
        {sent && (
          <span className="ml-auto text-xs text-green-700 font-medium animate-pulse">
            Opening your mail app...
          </span>
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
            placeholder="say hi"
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
      <span className="w-16 text-right text-[11px] uppercase tracking-wide opacity-50">
        {label}
      </span>
      {children}
    </div>
  );
}

export function ProjectApp({
  project,
  onOpenAlbum,
  onOpenVideo,
}: {
  project: Project;
  onOpenAlbum: (project: Project) => void;
  onOpenVideo: (project: Project, item: ProjectFolderItem) => void;
}) {
  if (project.windowStyle === "about") return <AboutWindow />;
  if (project.windowStyle === "contact") return <ContactWindow links={project.externalLinks} />;
  if (project.windowStyle === "archive-folder") return <ArchiveWindow project={project} />;
  if (project.id === "red-lion-campaign") {
    return (
      <ProjectFolderApp project={project} onOpenAlbum={onOpenAlbum} onOpenVideo={onOpenVideo} />
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <ProjectHeader project={project} />
      {/* Replace project.placeholderMedia entries in src/lib/portfolio.ts with final images, videos, GIFs, and embeds. */}
      <WindowLayout project={project} />
      <ExternalLinks links={project.externalLinks} />
    </div>
  );
}

export function ProjectPhotoAlbum({ project }: { project: Project }) {
  return <PhotoAlbumApp project={project} />;
}

export function ProjectYouTubeVideo({ item }: { item: ProjectFolderItem }) {
  return <YouTubeVideoApp item={item} />;
}

function ProjectHeader({ project }: { project: Project }) {
  return (
    <header className="space-y-2">
      <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wide opacity-60">
        <span>{project.category}</span>
        <span>/</span>
        <span>{project.role}</span>
      </div>
      <div>
        <h3 className="text-xl sm:text-2xl font-semibold leading-tight">{project.title}</h3>
        <p className="text-sm opacity-75 leading-relaxed mt-1">{project.shortDescription}</p>
      </div>
    </header>
  );
}

function WindowLayout({ project }: { project: Project }) {
  switch (project.windowStyle) {
    case "editorial-gallery":
      return (
        <div className="grid gap-3 sm:grid-cols-3">
          <PlaceholderSlot
            media={project.placeholderMedia[0]}
            className="sm:col-span-2 h-56"
            accent={project.accent}
          />
          <PlaceholderStack items={project.placeholderMedia.slice(1)} accent={project.accent} />
        </div>
      );
    case "website-preview":
      return (
        <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
          <PlaceholderSlot
            media={project.placeholderMedia[0]}
            className="h-60"
            accent={project.accent}
            frame="browser"
          />
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
            {project.placeholderMedia.slice(1).map((item) => (
              <PlaceholderSlot
                key={item.id}
                media={item}
                className="h-28"
                accent={project.accent}
                frame="phone"
              />
            ))}
          </div>
        </div>
      );
    case "audiovisual-campaign":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {project.placeholderMedia.map((item, index) => (
            <PlaceholderSlot
              key={item.id}
              media={item}
              className={index === 0 ? "h-56" : "h-40"}
              accent={project.accent}
              frame="video"
            />
          ))}
        </div>
      );
    case "video-case":
      return (
        <div className="space-y-3">
          <PlaceholderSlot
            media={project.placeholderMedia[0]}
            className="h-64"
            accent={project.accent}
            frame="video"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {project.placeholderMedia.slice(1).map((item) => (
              <PlaceholderSlot
                key={item.id}
                media={item}
                className="h-36"
                accent={project.accent}
              />
            ))}
          </div>
        </div>
      );
    case "game-artbook":
    case "game-launcher":
      return (
        <div className="grid gap-3 sm:grid-cols-[1.2fr_1fr]">
          <PlaceholderSlot
            media={project.placeholderMedia[0]}
            className="h-64"
            accent={project.accent}
            frame="game"
          />
          <div className="grid grid-cols-2 gap-3">
            {project.placeholderMedia.slice(1).map((item) => (
              <PlaceholderSlot
                key={item.id}
                media={item}
                className="h-30 min-h-30"
                accent={project.accent}
              />
            ))}
          </div>
        </div>
      );
    case "tool-demo":
      return (
        <div className="grid gap-3">
          <PlaceholderSlot
            media={project.placeholderMedia[0]}
            className="h-56"
            accent={project.accent}
            frame="browser"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {project.placeholderMedia.slice(1).map((item) => (
              <PlaceholderSlot
                key={item.id}
                media={item}
                className="h-36"
                accent={project.accent}
              />
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {project.placeholderMedia.map((item) => (
            <PlaceholderSlot key={item.id} media={item} className="h-40" accent={project.accent} />
          ))}
        </div>
      );
  }
}

function PlaceholderStack({ items, accent }: { items: PlaceholderMedia[]; accent: string }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <PlaceholderSlot key={item.id} media={item} className="h-28" accent={accent} />
      ))}
    </div>
  );
}

function PlaceholderSlot({
  media,
  accent,
  className = "",
  frame,
}: {
  media?: PlaceholderMedia;
  accent: string;
  className?: string;
  frame?: "browser" | "phone" | "video" | "game";
}) {
  const embed = media?.url ? getMediaEmbed(media.url) : null;

  if (embed?.kind === "iframe") {
    return (
      <div className={`overflow-hidden rounded-lg bg-black ${className}`}>
        <iframe
          src={embed.src}
          title={media?.label ?? "Embedded media"}
          className="h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  if (embed?.kind === "video") {
    return (
      <video
        src={embed.src}
        controls
        className={`rounded-lg bg-black object-cover w-full ${className}`}
      />
    );
  }

  return (
    <div
      className={`rounded-lg border border-black/10 overflow-hidden bg-white/50 ${className}`}
      style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.45)" }}
    >
      {frame === "browser" && <FrameBar />}
      <div
        className="h-full min-h-[7rem] p-3 flex flex-col justify-between"
        style={{ background: `linear-gradient(135deg, ${accent}, oklch(0.96 0.01 260))` }}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-[11px] uppercase tracking-wide text-black/55">
            {media?.kind ?? "media"}
          </span>
          {frame === "video" && (
            <span className="rounded-full bg-black/70 text-white text-[10px] px-2 py-0.5">
              play
            </span>
          )}
          {frame === "game" && (
            <span className="rounded bg-black/70 text-white text-[10px] px-2 py-0.5">start</span>
          )}
        </div>
        <div>
          <div className="text-sm font-semibold text-black/75">
            {media?.label ?? "Placeholder media"}
          </div>
          <div className="text-xs text-black/55 mt-1">
            {media?.note ?? "Replace this slot with final media."}
          </div>
        </div>
      </div>
    </div>
  );
}

function FrameBar() {
  return (
    <div className="h-7 bg-white/80 border-b border-black/10 flex items-center gap-1.5 px-3">
      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
      <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
      <span className="ml-2 h-3 flex-1 rounded bg-black/10" />
    </div>
  );
}

function ArchiveWindow({ project }: { project: Project }) {
  return (
    <div className="p-4 sm:p-6 space-y-5">
      <ProjectHeader project={project} />
      {/* Replace groupedItems placeholderMedia and links in src/lib/portfolio.ts with final game covers, GIFs, screenshots, descriptions, and URLs. */}
      <div className="grid gap-3 sm:grid-cols-3">
        {project.groupedItems?.map((item) => (
          <ArchiveCard key={item.id} item={item} accent={project.accent} />
        ))}
      </div>
      <ExternalLinks links={project.externalLinks} />
    </div>
  );
}

function ArchiveCard({ item, accent }: { item: GroupedProjectItem; accent: string }) {
  return (
    <article className="rounded-lg border border-black/10 bg-white/55 overflow-hidden">
      <PlaceholderSlot
        media={item.placeholderMedia[0]}
        accent={accent}
        className="h-32 rounded-none border-0"
      />
      <div className="p-3 space-y-3">
        <div>
          <h4 className="font-semibold text-sm">{item.title}</h4>
          <p className="text-xs opacity-70 mt-1">{item.shortDescription}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {item.placeholderMedia.slice(1).map((media) => (
            <PlaceholderSlot key={media.id} media={media} accent={accent} className="h-20" />
          ))}
        </div>
        <ExternalLinks links={item.externalLinks} compact />
      </div>
    </article>
  );
}

function AboutWindow() {
  return (
    <div className="p-5 sm:p-6 space-y-4">
      <div>
        <h3 className="text-xl font-semibold">About</h3>
        <p className="text-xs uppercase tracking-wide opacity-50 mt-1">professional introduction</p>
      </div>
      {/* Replace ABOUT in src/lib/portfolio.ts with the final short professional bio. */}
      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed bg-white/45 border border-black/10 rounded-lg p-4">
        {ABOUT}
      </pre>
    </div>
  );
}

function ContactWindow({ links }: { links: ExternalLink[] }) {
  return (
    <div className="p-5 sm:p-6 space-y-4">
      <div>
        <h3 className="text-xl font-semibold">Contact</h3>
        <p className="text-xs uppercase tracking-wide opacity-50 mt-1">links and social media</p>
      </div>
      {/* Replace CONTACT_LINKS in src/lib/portfolio.ts with final email and social URLs. */}
      <div className="grid gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target={link.url.startsWith("http") ? "_blank" : undefined}
            rel={link.url.startsWith("http") ? "noreferrer" : undefined}
            className="flex items-center justify-between gap-3 rounded-lg border border-black/10 bg-white/55 px-3 py-2 text-sm hover:bg-white/75"
          >
            <span>{link.label}</span>
            <span className="text-xs opacity-50 truncate">{link.url}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function ExternalLinks({ links, compact = false }: { links: ExternalLink[]; compact?: boolean }) {
  if (!links.length) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${compact ? "" : "pt-1"}`}>
      {links.map((link) => (
        <a
          key={`${link.label}-${link.url}`}
          href={link.url}
          target={link.url.startsWith("http") ? "_blank" : undefined}
          rel={link.url.startsWith("http") ? "noreferrer" : undefined}
          className="rounded-md border border-black/10 bg-white/60 px-3 py-1.5 text-xs font-medium hover:bg-white/85"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
