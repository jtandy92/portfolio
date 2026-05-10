import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import {
  ABOUT,
  CONTACT_LINKS,
  NAME,
  NOTES_SECTIONS,
  PROJECTS,
  type ExternalLink,
  type NoteEntry,
  type PlaceholderMedia,
  type Project,
  type ProjectFolderItem,
} from "@/lib/portfolio";
import { useIsMobile } from "@/hooks/use-mobile";
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

const FINDER_SECTIONS = [
  {
    id: "branding",
    label: "Branding",
    projectIds: ["body-mind-packaging"],
  },
  {
    id: "games",
    label: "Games",
    projectIds: ["survansix"],
  },
  {
    id: "music-videos",
    label: "Music videos",
    projectIds: ["red-lion-campaign", "meu-cabelo"],
  },
  {
    id: "others",
    label: "Others",
    projectIds: ["contact", "about"],
  },
] as const;

const PROJECTS_BY_ID = new Map(PROJECTS.map((project) => [project.id, project]));

export function FinderApp({ onOpenProject }: { onOpenProject: (p: Project) => void }) {
  const isMobile = useIsMobile();
  const [selectedSectionId, setSelectedSectionId] = useState(FINDER_SECTIONS[0]?.id ?? "");
  const selectedSection =
    FINDER_SECTIONS.find((section) => section.id === selectedSectionId) ?? FINDER_SECTIONS[0];
  const selectedProjects = selectedSection.projectIds
    .map((projectId) => PROJECTS_BY_ID.get(projectId))
    .filter((project): project is Project => Boolean(project));

  return (
    <div className="flex h-full min-h-[360px] flex-col sm:flex-row">
      <div className="w-full shrink-0 border-b border-black/10 bg-black/[0.02] p-3 sm:hidden">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-45">
          Favorites
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {FINDER_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setSelectedSectionId(section.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition ${
                selectedSection.id === section.id
                  ? "bg-black/10 text-black"
                  : "bg-white/70 text-black/60"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
      <div className="hidden w-40 shrink-0 space-y-1 border-r border-black/10 bg-black/[0.02] p-3 text-xs sm:block">
        <div className="font-semibold opacity-60 mb-2">Favorites</div>
        {FINDER_SECTIONS.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => setSelectedSectionId(section.id)}
            className={`w-full px-2 py-1 rounded text-left transition ${
              selectedSection.id === section.id ? "bg-black/10" : "opacity-60 hover:bg-black/5"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto p-3">
        <div className="mb-2 flex items-center justify-between gap-3 text-xs opacity-60">
          <span>{selectedProjects.length} items</span>
          {isMobile ? (
            <span className="truncate text-[11px] uppercase tracking-[0.18em] opacity-45">
              {selectedSection.label}
            </span>
          ) : null}
        </div>
        <section className="space-y-1">
          <div className="px-2 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-45">
            {selectedSection.label}
          </div>
          <div className="space-y-0.5">
            {selectedProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => onOpenProject(project)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm hover:bg-black/5 text-left"
              >
                <div className="w-4 h-4 rounded" style={{ background: project.accent }} />
                <span className="min-w-0 truncate">{project.desktopLabel}</span>
                <span className="ml-auto text-xs opacity-40 hidden sm:inline">{project.type}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function NotesApp() {
  const isMobile = useIsMobile();
  const [selectedSectionId, setSelectedSectionId] = useState(NOTES_SECTIONS[0]?.id ?? "");
  const initialNoteId = NOTES_SECTIONS[0]?.notes[0]?.id ?? "";
  const [selectedNoteId, setSelectedNoteId] = useState(initialNoteId);
  const [mobileStep, setMobileStep] = useState<"sections" | "notes" | "detail">("sections");

  const selectedSection =
    NOTES_SECTIONS.find((section) => section.id === selectedSectionId) ?? NOTES_SECTIONS[0];
  const selectedNote =
    selectedSection?.notes.find((note) => note.id === selectedNoteId) ?? selectedSection?.notes[0];

  function selectSection(sectionId: string) {
    const nextSection = NOTES_SECTIONS.find((section) => section.id === sectionId);
    setSelectedSectionId(sectionId);
    setSelectedNoteId(nextSection?.notes[0]?.id ?? "");
    if (isMobile) {
      setMobileStep("notes");
    }
  }

  function selectNote(note: NoteEntry) {
    setSelectedNoteId(note.id);
    if (isMobile) {
      setMobileStep("detail");
    }
  }

  function goBackMobile() {
    setMobileStep((currentStep) => {
      if (currentStep === "detail") return "notes";
      if (currentStep === "notes") return "sections";
      return "sections";
    });
  }

  if (isMobile) {
    return (
      <div className="flex h-full min-h-0 flex-col bg-[oklch(0.985_0.004_250)] text-black">
        {mobileStep === "sections" ? (
          <>
            <div className="border-b border-black/10 bg-white/70 px-5 py-4">
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-black/35">
                Notes
              </div>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">Browse sections</h3>
              <p className="mt-1 text-sm text-black/45">
                Choose a section to open its text notes.
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              <div className="space-y-2">
                {NOTES_SECTIONS.map((section) => {
                  const isSelected = section.id === selectedSection?.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => selectSection(section.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                        isSelected
                          ? "border-transparent bg-[linear-gradient(180deg,oklch(0.95_0.04_230),oklch(0.89_0.07_225))] text-black shadow-[0_6px_18px_-10px_oklch(0.45_0.05_230_/_0.35)]"
                          : "border-black/8 bg-white/80 text-black/80 hover:border-black/10 hover:bg-white"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-base font-semibold">{section.title}</div>
                        <p className="mt-1 text-sm leading-relaxed text-black/55">
                          {section.notes.length} text note{section.notes.length === 1 ? "" : "s"}
                        </p>
                      </div>
                      <span className="text-sm text-black/35">Open</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        ) : null}

        {mobileStep === "notes" ? (
          <>
            <div className="border-b border-black/10 bg-white/70 px-4 py-4">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={goBackMobile}
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/85 text-black/60 transition hover:text-black"
                  aria-label="Go back"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div className="min-w-0 flex-1">
                  <h3 className="text-2xl font-semibold tracking-[-0.02em]">
                    {selectedSection?.title}
                  </h3>
                  <p className="mt-1 text-sm text-black/45">
                    {selectedSection?.notes.length ?? 0} text note
                    {(selectedSection?.notes.length ?? 0) === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
              <div className="space-y-2">
                {selectedSection?.notes.map((note) => {
                  const isSelected = note.id === selectedNote?.id;

                  return (
                    <button
                      key={note.id}
                      type="button"
                      onClick={() => selectNote(note)}
                      className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                        isSelected
                          ? "border-transparent bg-[linear-gradient(180deg,oklch(0.95_0.04_230),oklch(0.89_0.07_225))] text-black shadow-[0_6px_18px_-10px_oklch(0.45_0.05_230_/_0.35)]"
                          : "border-black/8 bg-white/80 text-black/80 hover:border-black/10 hover:bg-white"
                      }`}
                    >
                      <div className="truncate text-base font-semibold">{note.title}</div>
                      <p
                        className={`mt-1 line-clamp-3 text-sm leading-relaxed ${
                          isSelected ? "text-black/80" : "text-black/55"
                        }`}
                      >
                        {note.preview}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        ) : null}

        {mobileStep === "detail" ? (
          <>
            <div className="border-b border-black/10 bg-white/90 px-4 py-4">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={goBackMobile}
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/85 text-black/60 transition hover:text-black"
                  aria-label="Go back"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium uppercase tracking-[0.22em] text-black/35">
                    {selectedSection?.title}
                  </div>
                  <h4 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">
                    {selectedNote?.title}
                  </h4>
                </div>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 bg-white/90">
              <pre className="m-0 whitespace-pre-wrap font-sans text-[15px] leading-7 text-black/75">
                {selectedNote?.body ?? ABOUT}
              </pre>
            </div>
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 bg-[oklch(0.985_0.004_250)] text-black">
      <aside className="w-44 shrink-0 border-r border-black/10 bg-black/[0.02] p-3 text-xs">
        <div className="mb-2 px-2 font-semibold text-black/55">
          Notes
        </div>
        <div className="space-y-1">
          {NOTES_SECTIONS.map((section) => {
            const isSelected = section.id === selectedSection?.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => selectSection(section.id)}
                className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left transition ${
                  isSelected ? "bg-black/10 text-black" : "text-black/60 hover:bg-black/[0.05]"
                }`}
              >
                <span className="min-w-0 flex-1 truncate text-sm">{section.title}</span>
                <span className={isSelected ? "text-black/55" : "text-black/40"}>
                  {section.notes.length}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <section className="flex min-w-0 flex-1">
        <div className="flex w-72 shrink-0 flex-col border-r border-black/10 bg-white/70">
          <div className="border-b border-black/10 px-5 py-4">
            <h3 className="text-xl font-semibold tracking-[-0.02em]">{selectedSection?.title}</h3>
            <p className="mt-1 text-sm text-black/45">
              {selectedSection?.notes.length ?? 0} text note
              {(selectedSection?.notes.length ?? 0) === 1 ? "" : "s"}
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
            <div className="space-y-2">
              {selectedSection?.notes.map((note) => {
                const isSelected = note.id === selectedNote?.id;

                return (
                  <button
                    key={note.id}
                    type="button"
                    onClick={() => selectNote(note)}
                    className={`w-full rounded-2xl border px-3 py-3 text-left transition ${
                      isSelected
                        ? "border-transparent bg-[linear-gradient(180deg,oklch(0.95_0.04_230),oklch(0.89_0.07_225))] text-black shadow-[0_6px_18px_-10px_oklch(0.45_0.05_230_/_0.35)]"
                        : "border-transparent bg-transparent text-black/80 hover:border-black/10 hover:bg-black/[0.035]"
                    }`}
                  >
                    <div className="truncate text-base font-semibold">{note.title}</div>
                    <p
                      className={`mt-1 line-clamp-3 text-sm leading-relaxed ${
                        isSelected ? "text-black/80" : "text-black/55"
                      }`}
                    >
                      {note.preview}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1 bg-white/90">
          <div className="flex h-full min-h-0 flex-col">
            <div className="border-b border-black/10 px-6 py-4">
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-black/35">
                {selectedSection?.title}
              </div>
              <h4 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">
                {selectedNote?.title}
              </h4>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
              <pre className="m-0 whitespace-pre-wrap font-sans text-[15px] leading-7 text-black/75">
                {selectedNote?.body ?? ABOUT}
              </pre>
            </div>
          </div>
        </div>
      </section>
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
  onOpenFolder,
}: {
  project: Project;
  onOpenAlbum: (project: Project, item?: ProjectFolderItem) => void;
  onOpenVideo: (project: Project, item: ProjectFolderItem) => void;
  onOpenFolder: (project: Project, item: ProjectFolderItem) => void;
}) {
  if (project.windowStyle === "about") return <AboutWindow />;
  if (project.windowStyle === "contact") return <ContactWindow links={project.externalLinks} />;

  return (
    <ProjectFolderApp
      project={project}
      onOpenAlbum={onOpenAlbum}
      onOpenVideo={onOpenVideo}
      onOpenFolder={onOpenFolder}
    />
  );
}

export function ProjectPhotoAlbum({ project, item }: { project: Project; item?: ProjectFolderItem }) {
  return <PhotoAlbumApp project={project} item={item} />;
}

export function ProjectYouTubeVideo({ item }: { item: ProjectFolderItem }) {
  return <YouTubeVideoApp item={item} />;
}

export function ProjectFolderDetail({
  project,
  item,
  onOpenAlbum,
  onOpenVideo,
  onOpenFolder,
}: {
  project: Project;
  item: ProjectFolderItem;
  onOpenAlbum: (project: Project, item?: ProjectFolderItem) => void;
  onOpenVideo: (project: Project, item: ProjectFolderItem) => void;
  onOpenFolder: (project: Project, item: ProjectFolderItem) => void;
}) {
  const nestedProject = buildNestedProject(project, item);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1">
        <ProjectFolderApp
          project={nestedProject}
          onOpenAlbum={onOpenAlbum}
          onOpenVideo={onOpenVideo}
          onOpenFolder={onOpenFolder}
        />
      </div>
    </div>
  );
}

function buildNestedProject(project: Project, item: ProjectFolderItem): Project {
  return {
    id: `${project.id}-${item.id}`,
    title: item.title ?? item.label,
    desktopLabel: item.label,
    category: project.category,
    type: "Nested folder",
    shortDescription: item.shortDescription ?? "Replace with the final project summary.",
    role: project.role,
    windowStyle: "archive-folder",
    placeholderMedia: item.placeholderMedia ?? [],
    externalLinks: item.externalLinks ?? [],
    folderItems: item.folderItems,
    albumImages: item.albumImages,
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    accent: project.accent,
  };
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

function formatExternalLinkValue(link: ExternalLink) {
  if (link.label === "Location") return "Brasilia, DF, Brazil";
  if (link.url.startsWith("mailto:")) return link.url.replace("mailto:", "");
  if (link.url.startsWith("tel:")) return link.url.replace("tel:", "");
  return link.url.replace(/^https?:\/\//, "");
}

function getCopyableLinkValue(link: ExternalLink) {
  if (link.url.startsWith("mailto:")) return link.url.replace("mailto:", "");
  if (link.url.startsWith("tel:")) return link.url.replace("tel:", "");
  return formatExternalLinkValue(link);
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
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  async function handleCopy(link: ExternalLink) {
    const value = getCopyableLinkValue(link);
    try {
      await navigator.clipboard.writeText(value);
      setCopiedLabel(link.label);
      window.setTimeout(() => setCopiedLabel((current) => (current === link.label ? null : current)), 1800);
    } catch {
      setCopiedLabel(null);
    }
  }

  return (
    <div className="p-5 sm:p-6 space-y-4">
      <div>
        <h3 className="text-xl font-semibold">Contact</h3>
        <p className="text-xs uppercase tracking-wide opacity-50 mt-1">links and social media</p>
      </div>
      {/* Replace CONTACT_LINKS in src/lib/portfolio.ts with final email and social URLs. */}
      <div className="grid gap-2">
        {links.map((link) => {
          const isCopyable = link.label === "Email" || link.label === "Phone";

          if (isCopyable) {
            return (
              <button
                key={link.label}
                type="button"
                onClick={() => void handleCopy(link)}
                className="flex items-center justify-between gap-3 rounded-lg border border-black/10 bg-white/55 px-3 py-2 text-left text-sm hover:bg-white/75"
              >
                <span>{link.label}</span>
                <span className="text-xs opacity-50 truncate">
                  {copiedLabel === link.label ? "Copied to clipboard" : formatExternalLinkValue(link)}
                </span>
              </button>
            );
          }

          return (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noreferrer" : undefined}
              className="flex items-center justify-between gap-3 rounded-lg border border-black/10 bg-white/55 px-3 py-2 text-sm hover:bg-white/75"
            >
              <span>{link.label}</span>
              <span className="text-xs opacity-50 truncate">{formatExternalLinkValue(link)}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
