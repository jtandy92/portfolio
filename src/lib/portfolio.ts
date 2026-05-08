import redLionMusicCampaignPhoto01 from "@/assets/projects/red-lion/music-campaign/photos/red-lion-music-campaign-photo-01.jpg";
import redLionMusicCampaignPhoto02 from "@/assets/projects/red-lion/music-campaign/photos/red-lion-music-campaign-photo-02.jpg";
import redLionMusicCampaignPhoto03 from "@/assets/projects/red-lion/music-campaign/photos/red-lion-music-campaign-photo-03.jpg";
import redLionMusicCampaignPhoto04 from "@/assets/projects/red-lion/music-campaign/photos/red-lion-music-campaign-photo-04.jpg";
import redLionMusicCampaignPhoto05 from "@/assets/projects/red-lion/music-campaign/photos/red-lion-music-campaign-photo-05.jpg";

// Central portfolio content.
// Replace the placeholder text, media URLs, and links here as final assets become ready.

export const SITE_TITLE = "James Tandy PorfoliOS";
export const MENU_BAR_NAME = "JamesTandy";
export const NAME = "James Tandy";

export const ABOUT = `Multidisciplinary designer and creative technologist working across branding, games, web interfaces, audiovisual campaigns, and interactive tools.

This is temporary copy. Replace it with the final short professional introduction.`;

export const CONTACT_LINKS = [
  { label: "Email", url: "mailto:hello@example.com" },
  { label: "Instagram", url: "https://example.com" },
  { label: "LinkedIn", url: "https://example.com" },
  { label: "Itch.io", url: "https://example.com" },
];

export type PlaceholderMediaKind = "image" | "video" | "gif" | "embed" | "link";

export type PlaceholderMedia = {
  id: string;
  label: string;
  kind: PlaceholderMediaKind;
  note?: string;
  url?: string;
};

export type ExternalLink = {
  label: string;
  url: string;
};

export type ProjectFolderItem = {
  id: string;
  label: string;
  kind: "photos" | "video";
  note?: string;
  opensAlbum?: boolean;
  youtubeUrl?: string;
  thumbnailUrl?: string;
};

export type ProjectAlbumImage = {
  id: string;
  slot: string;
  alt: string;
  src: string;
};

export type GroupedProjectItem = {
  id: string;
  title: string;
  shortDescription: string;
  placeholderMedia: PlaceholderMedia[];
  externalLinks: ExternalLink[];
};

export type ProjectWindowStyle =
  | "editorial-gallery"
  | "website-preview"
  | "audiovisual-campaign"
  | "video-case"
  | "game-artbook"
  | "tool-demo"
  | "game-launcher"
  | "archive-folder"
  | "about"
  | "contact";

export type Project = {
  id: string;
  title: string;
  desktopLabel: string;
  category: string;
  type: string;
  shortDescription: string;
  role: string;
  windowStyle: ProjectWindowStyle;
  placeholderMedia: PlaceholderMedia[];
  externalLinks: ExternalLink[];
  folderItems?: ProjectFolderItem[];
  albumImages?: ProjectAlbumImage[];
  groupedItems?: GroupedProjectItem[];
  // Desktop icon placement and size. Tweak these values to rearrange the desktop.
  x: number;
  y: number;
  w: number;
  h: number;
  accent: string;
};

export const PROJECTS: Project[] = [
  {
    id: "body-mind-packaging",
    title: "Body and Mind Beautiful - Packaging System",
    desktopLabel: "body & mind packaging",
    category: "branding / packaging / visual identity",
    type: "Packaging system",
    shortDescription: "Packaging and identity system foundation. Replace with final case text.",
    role: "Branding, packaging, visual identity",
    windowStyle: "editorial-gallery",
    placeholderMedia: [
      {
        id: "hero-mockup",
        label: "Hero packaging mockup",
        kind: "image",
        note: "Replace with main packaging render or photo.",
      },
      {
        id: "label-system",
        label: "Label system",
        kind: "image",
        note: "Replace with label close-ups.",
      },
      {
        id: "product-line",
        label: "Product line",
        kind: "image",
        note: "Replace with full product lineup.",
      },
      {
        id: "detail-shot",
        label: "Material/detail shot",
        kind: "image",
        note: "Replace with texture or print details.",
      },
    ],
    externalLinks: [],
    x: 14,
    y: 22,
    w: 180,
    h: 210,
    accent: "oklch(0.74 0.1 80)",
  },
  {
    id: "bmb-website",
    title: "Body and Mind Beautiful - Website",
    desktopLabel: "bmb website",
    category: "UI / web design",
    type: "Website design",
    shortDescription: "Responsive website case shell. Replace with final web design notes.",
    role: "UI design, web direction",
    windowStyle: "website-preview",
    placeholderMedia: [
      {
        id: "desktop-screen",
        label: "Desktop screenshots",
        kind: "image",
        note: "Replace with full-page desktop captures.",
      },
      {
        id: "mobile-screen",
        label: "Mobile screenshots",
        kind: "image",
        note: "Replace with mobile captures.",
      },
      {
        id: "interaction",
        label: "Interaction GIF",
        kind: "gif",
        note: "Replace with scroll or interaction GIF.",
      },
    ],
    externalLinks: [],
    x: 34,
    y: 18,
    w: 210,
    h: 145,
    accent: "oklch(0.58 0.12 185)",
  },
  {
    id: "red-lion-campaign",
    title: "RED LION - Music Campaign",
    desktopLabel: "red lion campaign",
    category: "audiovisual / music video / album identity",
    type: "Music campaign",
    shortDescription:
      "Folder-style campaign archive with photo selects, reels, lyric videos, and artwork.",
    role: "Creative direction, audiovisual identity",
    windowStyle: "audiovisual-campaign",
    placeholderMedia: [
      { id: "reels", label: "Reels", kind: "video", note: "Replace with reels or vertical cuts." },
      {
        id: "cinematic-frames",
        label: "Cinematic frames",
        kind: "image",
        note: "Replace with selected stills.",
      },
      {
        id: "lyric-video",
        label: "Lyric videos",
        kind: "video",
        note: "Replace with YouTube/Vimeo embeds.",
      },
      {
        id: "album-artwork",
        label: "Album artwork",
        kind: "image",
        note: "Replace with cover art and variants.",
      },
    ],
    externalLinks: [],
    folderItems: [
      {
        id: "photos",
        label: "photos",
        kind: "photos",
        note: "5-image album",
        opensAlbum: true,
        thumbnailUrl: redLionMusicCampaignPhoto05,
      },
      {
        id: "video-1",
        label: "Coração Quebrado",
        kind: "video",
        youtubeUrl:
          "https://www.youtube.com/watch?v=L1FafNFQUTM&list=PLDT31jtu2Wfe-djoeNzi_4euAM82tggj4",
      },
      {
        id: "video-2",
        label: "Quando Brigamos",
        kind: "video",
        youtubeUrl:
          "https://www.youtube.com/watch?v=n0Pl9lHzeBw&list=PLDT31jtu2Wfe-djoeNzi_4euAM82tggj4&index=2",
      },
      {
        id: "video-3",
        label: "Passa Tempo",
        kind: "video",
        youtubeUrl:
          "https://www.youtube.com/watch?v=79yMIgIccLw&list=PLDT31jtu2Wfe-djoeNzi_4euAM82tggj4&index=3",
      },
      {
        id: "video-4",
        label: "Mais uma de amor",
        kind: "video",
        youtubeUrl:
          "https://www.youtube.com/watch?v=gZC1hTePz1s&list=PLDT31jtu2Wfe-djoeNzi_4euAM82tggj4&index=4",
      },
      {
        id: "video-5",
        label: "Berlinda",
        kind: "video",
        youtubeUrl:
          "https://www.youtube.com/watch?v=YfTp4twa36M&list=PLDT31jtu2Wfe-djoeNzi_4euAM82tggj4&index=5",
      },
    ],
    albumImages: [
      {
        id: "red-lion-photo-01",
        slot: "photo-01",
        alt: "Red Lion portrait wearing sunglasses in moody window light.",
        src: redLionMusicCampaignPhoto01,
      },
      {
        id: "red-lion-photo-02",
        slot: "photo-02",
        alt: "Red Lion smoking in a blue shirt inside a dim interior.",
        src: redLionMusicCampaignPhoto02,
      },
      {
        id: "red-lion-photo-03",
        slot: "photo-03",
        alt: "Red Lion portrait lit with red and blue light.",
        src: redLionMusicCampaignPhoto03,
      },
      {
        id: "red-lion-photo-04",
        slot: "photo-04",
        alt: "Red Lion silhouette by a bright window while lighting a cigarette.",
        src: redLionMusicCampaignPhoto04,
      },
      {
        id: "red-lion-photo-05",
        slot: "photo-05",
        alt: "Red Lion covering his face with both hands under red and blue lighting.",
        src: redLionMusicCampaignPhoto05,
      },
    ],
    x: 58,
    y: 20,
    w: 220,
    h: 150,
    accent: "oklch(0.52 0.22 28)",
  },
  {
    id: "meu-cabelo",
    title: "BLACKLAS - Meu Cabelo",
    desktopLabel: "meu cabelo.mov",
    category: "music video / creative direction / cinematography",
    type: "Music video",
    shortDescription: "Video case shell for the final embed, stills, and BTS notes.",
    role: "Creative direction, cinematography",
    windowStyle: "video-case",
    placeholderMedia: [
      {
        id: "youtube-embed",
        label: "YouTube embed",
        kind: "embed",
        note: "Paste the final YouTube URL here.",
      },
      {
        id: "still-frames",
        label: "Still frames",
        kind: "image",
        note: "Replace with frame selects.",
      },
      {
        id: "bts",
        label: "Behind the scenes",
        kind: "image",
        note: "Replace with BTS photos or clips.",
      },
    ],
    externalLinks: [],
    x: 80,
    y: 24,
    w: 190,
    h: 130,
    accent: "oklch(0.32 0.06 265)",
  },
  {
    id: "liminality",
    title: "Liminality",
    desktopLabel: "liminality.exe",
    category: "game art direction / pixel art / UI / worldbuilding",
    type: "Game art direction",
    shortDescription: "Game artbook and launcher shell for art, UI, and animation assets.",
    role: "Art direction, pixel art, UI, worldbuilding",
    windowStyle: "game-artbook",
    placeholderMedia: [
      { id: "cover-art", label: "Cover art", kind: "image", note: "Replace with key art." },
      { id: "sprites", label: "Sprites", kind: "image", note: "Replace with sprite sheets." },
      {
        id: "gameplay-gifs",
        label: "Gameplay GIFs",
        kind: "gif",
        note: "Replace with animations.",
      },
      {
        id: "ui-screens",
        label: "UI screens",
        kind: "image",
        note: "Replace with menu and HUD captures.",
      },
    ],
    externalLinks: [],
    x: 18,
    y: 55,
    w: 180,
    h: 150,
    accent: "oklch(0.42 0.13 280)",
  },
  {
    id: "aether-edit",
    title: "Aether Edit",
    desktopLabel: "aether edit.app",
    category: "tool / UI / game design / programming",
    type: "Interactive tool",
    shortDescription: "Software demo shell for interface screenshots and usage examples.",
    role: "UI design, game design, programming",
    windowStyle: "tool-demo",
    placeholderMedia: [
      {
        id: "usage-gif",
        label: "Usage GIFs",
        kind: "gif",
        note: "Replace with editing workflow captures.",
      },
      {
        id: "interface",
        label: "Interface screenshots",
        kind: "image",
        note: "Replace with UI screenshots.",
      },
      {
        id: "examples",
        label: "Created examples",
        kind: "image",
        note: "Replace with output examples.",
      },
    ],
    externalLinks: [{ label: "Itch.io link", url: "https://example.com" }],
    x: 40,
    y: 56,
    w: 180,
    h: 160,
    accent: "oklch(0.68 0.15 220)",
  },
  {
    id: "phantom-of-the-grove",
    title: "Phantom of the Grove",
    desktopLabel: "phantom of the grove",
    category: "browser game / pixel art / UI",
    type: "Browser game",
    shortDescription: "Playable game case shell for GIFs, screenshots, and UI.",
    role: "Pixel art, UI, browser game design",
    windowStyle: "game-launcher",
    placeholderMedia: [
      {
        id: "gameplay-gifs",
        label: "Gameplay GIFs",
        kind: "gif",
        note: "Replace with gameplay loops.",
      },
      {
        id: "screenshots",
        label: "Screenshots",
        kind: "image",
        note: "Replace with gameplay screenshots.",
      },
      {
        id: "pixel-art",
        label: "Pixel art",
        kind: "image",
        note: "Replace with asset sheets or art crops.",
      },
      { id: "ui", label: "UI", kind: "image", note: "Replace with HUD/menu captures." },
    ],
    externalLinks: [{ label: "Playable link", url: "https://example.com" }],
    x: 62,
    y: 58,
    w: 210,
    h: 150,
    accent: "oklch(0.5 0.14 145)",
  },
  {
    id: "itch-experiments",
    title: "Itch.io Experiments",
    desktopLabel: "itch experiments",
    category: "grouped game experiments",
    type: "Archive folder",
    shortDescription: "Grouped archive for smaller game experiments.",
    role: "Game experiments, pixel art, interaction design",
    windowStyle: "archive-folder",
    placeholderMedia: [],
    externalLinks: [{ label: "Itch.io profile", url: "https://example.com" }],
    groupedItems: [
      {
        id: "whale-songs",
        title: "Whale Songs",
        shortDescription: "Temporary description. Replace with final game summary.",
        placeholderMedia: [
          { id: "cover", label: "Cover art", kind: "image" },
          { id: "gif", label: "Gameplay GIF", kind: "gif" },
          { id: "screens", label: "Screenshots", kind: "image" },
        ],
        externalLinks: [{ label: "Game link", url: "https://example.com" }],
      },
      {
        id: "snow-rest",
        title: "Snow Rest",
        shortDescription: "Temporary description. Replace with final game summary.",
        placeholderMedia: [
          { id: "cover", label: "Cover art", kind: "image" },
          { id: "gif", label: "Gameplay GIF", kind: "gif" },
          { id: "screens", label: "Screenshots", kind: "image" },
        ],
        externalLinks: [{ label: "Game link", url: "https://example.com" }],
      },
      {
        id: "overgrown",
        title: "Overgrown",
        shortDescription: "Temporary description. Replace with final game summary.",
        placeholderMedia: [
          { id: "cover", label: "Cover art", kind: "image" },
          { id: "gif", label: "Gameplay GIF", kind: "gif" },
          { id: "screens", label: "Screenshots", kind: "image" },
        ],
        externalLinks: [{ label: "Game link", url: "https://example.com" }],
      },
    ],
    x: 82,
    y: 58,
    w: 175,
    h: 155,
    accent: "oklch(0.8 0.11 95)",
  },
  {
    id: "about",
    title: "About",
    desktopLabel: "about.txt",
    category: "system",
    type: "Text file",
    shortDescription: "Short professional introduction.",
    role: "About",
    windowStyle: "about",
    placeholderMedia: [],
    externalLinks: [],
    x: 26,
    y: 82,
    w: 150,
    h: 115,
    accent: "oklch(0.93 0.08 95)",
  },
  {
    id: "contact",
    title: "Contact",
    desktopLabel: "contact.card",
    category: "system",
    type: "Contact card",
    shortDescription: "Contact links, email, and social media.",
    role: "Contact",
    windowStyle: "contact",
    placeholderMedia: [],
    externalLinks: CONTACT_LINKS,
    x: 45,
    y: 82,
    w: 150,
    h: 115,
    accent: "oklch(0.72 0.16 245)",
  },
];

export const TOUR_STEPS = [
  {
    title: `welcome to ${NAME}.app`,
    body: "this desktop opens project windows, folders, notes, and contact cards. replace this tour copy if you turn the tour back on.",
  },
  {
    title: "the desktop",
    body: "each icon is backed by the centralized PROJECTS array in src/lib/portfolio.ts.",
  },
  {
    title: "project windows",
    body: "window layouts use placeholder media slots until final images, videos, GIFs, and copy are ready.",
  },
];
