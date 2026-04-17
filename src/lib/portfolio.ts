// Edit this file to make the site about you.
// Swap NAME, ABOUT, and PROJECTS — everything else updates automatically.

export const NAME = "yourname";

export const ABOUT = `# hi, i'm ${NAME} 👋

a designer + engineer making playful things on the internet.
this site is my desktop — click around, drag the windows, open the dock.

**reach me:** hello@example.com
**find me:** twitter · github · linkedin
`;

export type ProjectKind = "image" | "video" | "card" | "map" | "chat" | "note";

export type Project = {
  id: string;
  title: string;
  kind: ProjectKind;
  // % position on the desktop (so it's responsive-ish)
  x: number;
  y: number;
  w: number; // tile width in px
  h: number; // tile height in px
  accent: string; // oklch color
  body: string; // markdown-ish content shown when opened
};

export const PROJECTS: Project[] = [
  {
    id: "cut-button",
    title: "cut button",
    kind: "video",
    x: 18, y: 70, w: 200, h: 130,
    accent: "oklch(0.55 0.22 20)",
    body: "A red button. You press it. Things get cut. A short film about commitment.",
  },
  {
    id: "linkedin-interview",
    title: "linkedin interview",
    kind: "video",
    x: 50, y: 48, w: 220, h: 140,
    accent: "oklch(0.55 0.18 240)",
    body: "Mock interview series filmed in a fake corporate apartment.",
  },
  {
    id: "barbie-filter",
    title: "barbie filter",
    kind: "image",
    x: 78, y: 22, w: 160, h: 220,
    accent: "oklch(0.78 0.2 350)",
    body: "AR filter that turns you into a limited edition collectible.",
  },
  {
    id: "greeting-cards",
    title: "greeting cards",
    kind: "card",
    x: 88, y: 8, w: 140, h: 190,
    accent: "oklch(0.92 0.04 80)",
    body: "Eye-chart inspired cards for awkward occasions.",
  },
  {
    id: "slit-scan",
    title: "slit scan",
    kind: "image",
    x: 70, y: 65, w: 130, h: 200,
    accent: "oklch(0.45 0.05 270)",
    body: "Real-time slit-scan webcam toy. Time becomes a column.",
  },
  {
    id: "cut-lineup",
    title: "cut lineup",
    kind: "video",
    x: 38, y: 18, w: 220, h: 140,
    accent: "oklch(0.92 0.02 80)",
    body: "Strangers stand in a line. Half the line gets cut. Tension ensues.",
  },
  {
    id: "grounded",
    title: "grounded",
    kind: "card",
    x: 12, y: 28, w: 150, h: 200,
    accent: "oklch(0.85 0.12 90)",
    body: "A pokémon-style trading card I made for a friend.",
  },
  {
    id: "top-creator",
    title: "top creator",
    kind: "chat",
    x: 42, y: 75, w: 180, h: 230,
    accent: "oklch(0.95 0.01 270)",
    body: "DMs from the day a tiny experiment went weirdly viral.",
  },
  {
    id: "tour-du-mont-blanc",
    title: "tour du mont blanc",
    kind: "map",
    x: 80, y: 50, w: 200, h: 130,
    accent: "oklch(0.78 0.12 145)",
    body: "170km, 11 days, one very tired pair of legs.",
  },
  {
    id: "boyfriend",
    title: "boyfriend",
    kind: "image",
    x: 22, y: 48, w: 160, h: 200,
    accent: "oklch(0.65 0.12 30)",
    body: "Photo series, spring 2024.",
  },
  {
    id: "awwwards",
    title: "awwwards honors",
    kind: "card",
    x: 12, y: 78, w: 130, h: 180,
    accent: "oklch(0.55 0.08 200)",
    body: "Honorable mention, March 2026. Thanks judges 🙏",
  },
  {
    id: "readme",
    title: "README.md",
    kind: "note",
    x: 32, y: 60, w: 170, h: 150,
    accent: "oklch(0.92 0.12 95)",
    body: ABOUT,
  },
];

export const TOUR_STEPS = [
  { title: `welcome to ${NAME}.app`, body: "this is my portfolio dressed up as a desktop. there are easter eggs hidden throughout. press NEXT to waddle through this quick tour, or SKIP to dive in beak first." },
  { title: "the menu bar", body: "up top you'll find my name and the current time. classic." },
  { title: "the desktop", body: "every floating thumbnail is a project. click one to open it in a window." },
  { title: "windows", body: "drag windows by their title bar. close them with the red dot." },
  { title: "the dock", body: "down at the bottom: Finder lists every project, Notes is my about page, Terminal is for the curious." },
  { title: "the trash", body: "drop something in there if you'd like. it might do something. it might not." },
  { title: "you're set", body: "have fun poking around. say hi if anything makes you smile." },
];
