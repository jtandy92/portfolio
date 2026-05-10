import redLionMusicCampaignPhoto01 from "@/assets/projects/red-lion/music-campaign/photos/red-lion-music-campaign-photo-01.jpg";
import redLionMusicCampaignPhoto02 from "@/assets/projects/red-lion/music-campaign/photos/red-lion-music-campaign-photo-02.jpg";
import redLionMusicCampaignPhoto03 from "@/assets/projects/red-lion/music-campaign/photos/red-lion-music-campaign-photo-03.jpg";
import redLionMusicCampaignPhoto04 from "@/assets/projects/red-lion/music-campaign/photos/red-lion-music-campaign-photo-04.jpg";
import redLionMusicCampaignPhoto05 from "@/assets/projects/red-lion/music-campaign/photos/red-lion-music-campaign-photo-05.jpg";
import bodyMindAlegriaHidratante from "@/assets/projects/body-mind/products/alegria-hidratante.jpg";
import bodyMindAlegriaSais from "@/assets/projects/body-mind/products/alegria-sais.jpg";
import bodyMindAlegriaShower from "@/assets/projects/body-mind/products/alegria-shower.jpg";
import bodyMindAlegriaSpray from "@/assets/projects/body-mind/products/alegria-spray.jpg";
import bodyMindCreme250 from "@/assets/projects/body-mind/products/creme-250.png";
import bodyMindDivine from "@/assets/projects/body-mind/products/divine.jpg";
import bodyMindShampoo from "@/assets/projects/body-mind/products/shampoo.png";
import bodyMindRotuloAlegria from "@/assets/projects/body-mind/packaging/rotulo-alegria.jpg";
import bodyMindRotuloEnergia from "@/assets/projects/body-mind/packaging/rotulo-energia.jpg";
import bodyMindRotuloPaz from "@/assets/projects/body-mind/packaging/rotulo-paz.jpg";
import bodyMindPackaging01 from "@/assets/projects/body-mind/packaging/packaging-01.jpg";
import bodyMindPackaging02 from "@/assets/projects/body-mind/packaging/packaging-02.jpg";
import bodyMindBeautifulManteiga from "@/assets/projects/body-mind/packaging/beautiful-manteiga.jpg";
import bodyMindSiteFrontPage from "@/assets/projects/body-mind/ecommerce/site-front-page.png";
import bodyMindSiteProductPage from "@/assets/projects/body-mind/ecommerce/site-product-page.png";
import bodyMindSiteStoreSearch from "@/assets/projects/body-mind/ecommerce/site-store-search.png";
import bodyMindCarrossel01 from "@/assets/projects/body-mind/promotional/carrossel-01.png";
import bodyMindCarrossel02 from "@/assets/projects/body-mind/promotional/carrossel-02.png";
import bodyMindCarrossel03 from "@/assets/projects/body-mind/promotional/carrossel-03.png";
import bodyMindCarrossel04 from "@/assets/projects/body-mind/promotional/carrossel-04.png";
import bodyMindCarrossel05 from "@/assets/projects/body-mind/promotional/carrossel-05.png";
import bodyMindCarrossel06 from "@/assets/projects/body-mind/promotional/carrossel-06.png";
import bodyMindCarrossel07 from "@/assets/projects/body-mind/promotional/carrossel-07.png";
import bodyMindEcommerceIcon from "@/assets/projects/body-mind/ui/ecommerce-icon.png";
import bodyMindWebsiteIcon from "@/assets/projects/body-mind/ui/website-icon.png";
import blacklusStill01 from "@/assets/projects/meu-cabelo/stills/01.png";
import blacklusStill02 from "@/assets/projects/meu-cabelo/stills/02.png";
import blacklusStill03 from "@/assets/projects/meu-cabelo/stills/03.png";
import blacklusStill04 from "@/assets/projects/meu-cabelo/stills/04.png";
import blacklusStill05 from "@/assets/projects/meu-cabelo/stills/05.png";
import blacklusStill06 from "@/assets/projects/meu-cabelo/stills/06.png";

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

export type NoteEntry = {
  id: string;
  title: string;
  preview: string;
  body: string;
};

export type NoteSection = {
  id: string;
  title: string;
  notes: NoteEntry[];
};

export const NOTES_SECTIONS: NoteSection[] = [
  {
    id: "profile",
    title: "Profile",
    notes: [
      {
        id: "profile-summary",
        title: "Professional Summary",
        preview:
          "Graphic designer with 10+ years across beauty, lifestyle, e-commerce, print, and digital marketing.",
        body: `James Marcelo Tandy
Brasilia, DF, Brazil
+55 61 99100-9459
jamestandy1@gmail.com
linkedin.com/in/jamesmtandy

Graphic Designer | E-Commerce | Brand Production

Graphic designer with 10+ years creating customer-facing visuals for beauty, lifestyle, e-commerce, print, and digital marketing channels.

Production-forward and detail-focused, with experience supporting online storefronts, promotional campaigns, brand collateral, asset organization, and cross-functional workflows in remote, fast-turnaround environments.`,
      },
      {
        id: "profile-focus",
        title: "Capabilities",
        preview:
          "Brand production, promotional design, e-commerce support, and organized visual systems.",
        body: `Key strengths:

- Customer-facing visual design
- E-commerce content and online store support
- Brand collateral for print and digital channels
- Product visual organization and digital asset management
- Production coordination and remote collaboration
- Detail, accuracy, and consistent delivery

Skills:

Photoshop
Illustrator
InDesign
Premiere
After Effects
Webdesign
UX/UI
Brand Identity Systems
Email Blast Layouts
Digital Mailers
Print
Packaging/Label Design
Promotional Graphics
E-commerce Visuals
Brand Collateral
Asset Management
AI-Assisted Development
Prototyping`,
      },
    ],
  },
  {
    id: "skills",
    title: "Skills",
    notes: [
      {
        id: "skills-design",
        title: "Design and Brand Skills",
        preview:
          "Brand identity systems, promotional graphics, print collateral, and digital marketing assets.",
        body: `Design and brand production:

Brand Identity Systems
Promotional Graphics
Print Collateral
Digital Collateral
Marketing Assets
Brand Collateral

Commerce and storefront support:

E-Commerce Visuals
Online Store Content
Product Visual Organization
Digital Asset Management`,
      },
      {
        id: "skills-operations",
        title: "Production and Workflow Skills",
        preview:
          "Production coordination, organization, cross-functional support, and remote collaboration.",
        body: `Production and operations:

Production Coordination
Asset Organization
Cross-functional workflow support
Remote Collaboration
Accuracy
Organization

This work sits at the intersection of visual production, operational support, and dependable delivery across fast-turnaround environments.`,
      },
    ],
  },
  {
    id: "experience",
    title: "Experience",
    notes: [
      {
        id: "experience-body-mind-2025",
        title: "Body and Mind Beautiful",
        preview:
          "Graphic Designer and E-Commerce Content Specialist, Franca, SP | Jul 2025 - Mar 2026",
        body: `Graphic Designer and E-Commerce Content Specialist
Body and Mind Beautiful, Franca, SP
Jul 2025 - Mar 2026

- Worked in a hybrid graphic design, e-commerce support, internal IT, and administrative operations role for a beauty and lifestyle consumer brand with multiple branches.
- Designed, optimized, and managed the online store, including product visuals, digital assets, organized product information, promotional graphics, labels, marketing images, and brand collateral.
- Supported multiple branches with day-to-day technical assistance, system setup, data organization, backups, electronic records, internal troubleshooting, and cross-department operational follow-up.
- Managed reports, inventory information, formal communications, and confidential business data with accuracy, consistency, and strong deadline awareness.`,
      },
      {
        id: "experience-survanix",
        title: "Survanix",
        preview:
          "Art Director / Graphic Designer, Brasilia, DF | Jul 2019 - Jul 2025",
        body: `Art Director / Graphic Designer
Survanix, Brasilia, DF
Jul 2019 - Jul 2025

- Led art direction and visual development for a full top-down game prototype, including style direction, asset planning, and creative systems from concept through prototype delivery.
- Designed visual assets, interface concepts, characters, environments, and organized design systems while coordinating creative and technical workflows.
- Managed project planning, task scheduling, documentation, and production priorities to keep a complex development cycle on track.`,
      },
      {
        id: "experience-pom",
        title: "POM",
        preview:
          "Creative Director / Video Production Coordinator, Sao Paulo, SP | Dec 2017 - Jul 2019",
        body: `Creative Director / Video Production Coordinator
POM, Sao Paulo, SP
Dec 2017 - Jul 2019

- Planned shoots, production schedules, and creative workflows for music videos, promotional content, and design-focused media projects.
- Edited footage and managed post-production files, backups, digital assets, and deliverables with strong attention to timing, visual quality, and organization.`,
      },
      {
        id: "experience-body-mind-2015",
        title: "Body and Mind Beautiful Archive",
        preview:
          "Graphic Designer / Customer Service Support, Franca, SP | Jan 2015 - Nov 2017",
        body: `Graphic Designer / Customer Service Support
Body and Mind Beautiful, Franca, SP
Jan 2015 - Nov 2017

- Created branding materials, product labels, print layouts, promotional graphics, and digital marketing content for a beauty consumer brand.
- Produced customer-facing visuals and organized print-ready artwork, brand assets, and production files to support consistent delivery across digital and print needs.`,
      },
    ],
  },
  {
    id: "background",
    title: "Background",
    notes: [
      {
        id: "background-education",
        title: "Education",
        preview:
          "Bachelor's Degree in Industrial Design from FAAP, completed in 2014.",
        body: `Bachelor's Degree in Industrial Design
FAAP - Fundacao Armando Alvares Penteado
Graduated 2014`,
      },
      {
        id: "background-certification",
        title: "Certification",
        preview:
          "CS50: Introduction to Computer Science by HarvardX.",
        body: `CS50: Introduction to Computer Science
HarvardX`,
      },
      {
        id: "background-languages",
        title: "Languages",
        preview:
          "Fluent in English and Portuguese.",
        body: `English: Fluent
Portuguese: Fluent`,
      },
    ],
  },
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
  kind: "photos" | "video" | "folder" | "link";
  note?: string;
  opensAlbum?: boolean;
  youtubeUrl?: string;
  url?: string;
  thumbnailUrl?: string;
  title?: string;
  shortDescription?: string;
  placeholderMedia?: PlaceholderMedia[];
  externalLinks?: ExternalLink[];
  albumImages?: ProjectAlbumImage[];
  folderItems?: ProjectFolderItem[];
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
  desktopThumbnailUrl?: string;
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

function createAlbumPlaceholderSrc(
  title: string,
  caption: string,
  background: string,
  panel: string,
  accent: string,
) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 980">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${background}" />
          <stop offset="100%" stop-color="${panel}" />
        </linearGradient>
      </defs>
      <rect width="1400" height="980" fill="url(#bg)" />
      <rect x="110" y="96" width="1180" height="788" rx="42" fill="rgba(255,255,255,0.7)" />
      <rect x="180" y="180" width="360" height="520" rx="28" fill="${accent}" opacity="0.8" />
      <rect x="590" y="180" width="330" height="160" rx="26" fill="rgba(255,255,255,0.84)" />
      <rect x="590" y="380" width="490" height="120" rx="22" fill="rgba(255,255,255,0.6)" />
      <rect x="590" y="540" width="560" height="120" rx="22" fill="rgba(255,255,255,0.5)" />
      <rect x="180" y="748" width="970" height="48" rx="18" fill="rgba(255,255,255,0.42)" />
      <text x="180" y="112" fill="#211F22" font-family="Arial, Helvetica, sans-serif" font-size="34" letter-spacing="6">BODY &amp; MIND COSMETICS</text>
      <text x="180" y="806" fill="#211F22" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700">${title}</text>
      <text x="180" y="866" fill="#413D41" font-family="Arial, Helvetica, sans-serif" font-size="34">${caption}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createAlbumCollection(
  collectionId: string,
  collectionTitle: string,
  palette: [string, string, string],
  captions: [string, string, string],
): ProjectAlbumImage[] {
  return captions.map((caption, index) => ({
    id: `${collectionId}-${index + 1}`,
    slot: `${String(index + 1).padStart(2, "0")}`,
    alt: `${collectionTitle} - ${caption}`,
    src: createAlbumPlaceholderSrc(collectionTitle, caption, palette[0], palette[1], palette[2]),
  }));
}

const bodyMindHeroAlbum: ProjectAlbumImage[] = [
  {
    id: "body-mind-products-01",
    slot: "01",
    alt: "Sentidos Alegria shower gel",
    src: bodyMindAlegriaShower,
  },
  {
    id: "body-mind-products-02",
    slot: "02",
    alt: "Sentidos Alegria bath salts",
    src: bodyMindAlegriaSais,
  },
  {
    id: "body-mind-products-03",
    slot: "03",
    alt: "Body & Mind For Men shampoo",
    src: bodyMindShampoo,
  },
  {
    id: "body-mind-products-04",
    slot: "04",
    alt: "Sentidos Alegria hidratante",
    src: bodyMindAlegriaHidratante,
  },
  {
    id: "body-mind-products-05",
    slot: "05",
    alt: "Sentidos Alegria body splash",
    src: bodyMindAlegriaSpray,
  },
  {
    id: "body-mind-products-06",
    slot: "06",
    alt: "Body & Mind Divine anti-aging cream",
    src: bodyMindDivine,
  },
  {
    id: "body-mind-products-07",
    slot: "07",
    alt: "Body & Mind Alivio aromaterapia cream",
    src: bodyMindCreme250,
  },
];

const bodyMindPackagingAlbum: ProjectAlbumImage[] = [
  {
    id: "body-mind-packaging-01",
    slot: "01",
    alt: "Body & Mind creme redutor e firmador packaging",
    src: bodyMindPackaging01,
  },
  {
    id: "body-mind-packaging-02",
    slot: "02",
    alt: "Body & Mind agua virtuosa packaging",
    src: bodyMindPackaging02,
  },
  {
    id: "body-mind-packaging-03",
    slot: "03",
    alt: "Body & Mind manteiga mousse packaging",
    src: bodyMindBeautifulManteiga,
  },
  {
    id: "body-mind-packaging-04",
    slot: "04",
    alt: "Sentidos Paz label design",
    src: bodyMindRotuloPaz,
  },
  {
    id: "body-mind-packaging-05",
    slot: "05",
    alt: "Sentidos Alegria label design",
    src: bodyMindRotuloAlegria,
  },
  {
    id: "body-mind-packaging-06",
    slot: "06",
    alt: "Sentidos Energia label design",
    src: bodyMindRotuloEnergia,
  },
];

const bodyMindLabelAlbum: ProjectAlbumImage[] = [
  {
    id: "body-mind-ecommerce-01",
    slot: "01",
    alt: "Body & Mind front page",
    src: bodyMindSiteFrontPage,
  },
  {
    id: "body-mind-ecommerce-02",
    slot: "02",
    alt: "Body & Mind product page",
    src: bodyMindSiteProductPage,
  },
  {
    id: "body-mind-ecommerce-03",
    slot: "03",
    alt: "Body & Mind store search page",
    src: bodyMindSiteStoreSearch,
  },
];

const bodyMindDetailAlbum: ProjectAlbumImage[] = [
  {
    id: "body-mind-promotional-01",
    slot: "01",
    alt: "Promotional carousel slide 1",
    src: bodyMindCarrossel01,
  },
  {
    id: "body-mind-promotional-02",
    slot: "02",
    alt: "Promotional carousel slide 2",
    src: bodyMindCarrossel02,
  },
  {
    id: "body-mind-promotional-03",
    slot: "03",
    alt: "Promotional carousel slide 3",
    src: bodyMindCarrossel03,
  },
  {
    id: "body-mind-promotional-04",
    slot: "04",
    alt: "Promotional carousel slide 4",
    src: bodyMindCarrossel04,
  },
  {
    id: "body-mind-promotional-05",
    slot: "05",
    alt: "Promotional carousel slide 5",
    src: bodyMindCarrossel05,
  },
  {
    id: "body-mind-promotional-06",
    slot: "06",
    alt: "Promotional carousel slide 6",
    src: bodyMindCarrossel06,
  },
  {
    id: "body-mind-promotional-07",
    slot: "07",
    alt: "Promotional carousel slide 7",
    src: bodyMindCarrossel07,
  },
];

const blacklusStillFrames: ProjectAlbumImage[] = [
  {
    id: "blacklus-still-01",
    slot: "01",
    alt: "Blacklus - Meu Cabelo still frame 1",
    src: blacklusStill01,
  },
  {
    id: "blacklus-still-02",
    slot: "02",
    alt: "Blacklus - Meu Cabelo still frame 2",
    src: blacklusStill02,
  },
  {
    id: "blacklus-still-03",
    slot: "03",
    alt: "Blacklus - Meu Cabelo still frame 3",
    src: blacklusStill03,
  },
  {
    id: "blacklus-still-04",
    slot: "04",
    alt: "Blacklus - Meu Cabelo still frame 4",
    src: blacklusStill04,
  },
  {
    id: "blacklus-still-05",
    slot: "05",
    alt: "Blacklus - Meu Cabelo still frame 5",
    src: blacklusStill05,
  },
  {
    id: "blacklus-still-06",
    slot: "06",
    alt: "Blacklus - Meu Cabelo still frame 6",
    src: blacklusStill06,
  },
];

export const PROJECTS: Project[] = [
  {
    id: "body-mind-packaging",
    title: "Body & Mind Cosmetics",
    desktopLabel: "Body & Mind Cosmetics",
    desktopThumbnailUrl: bodyMindHeroAlbum[0]?.src,
    category: "branding / cosmetics / packaging",
    type: "Cosmetics packaging",
    shortDescription: "A cosmetics packaging archive organized into four photo collections.",
    role: "Branding, packaging, visual identity",
    windowStyle: "editorial-gallery",
    placeholderMedia: [],
    externalLinks: [],
    folderItems: [
      {
        id: "label-system",
        label: "E-Comerce",
        kind: "photos",
        note: "3 photos",
        opensAlbum: true,
        thumbnailUrl: bodyMindEcommerceIcon,
        albumImages: bodyMindLabelAlbum,
      },
      {
        id: "packaging-set",
        label: "Packaging",
        kind: "photos",
        note: "6 photos",
        opensAlbum: true,
        thumbnailUrl: bodyMindPackagingAlbum[0]?.src,
        albumImages: bodyMindPackagingAlbum,
      },
      {
        id: "hero-set",
        label: "Products",
        kind: "photos",
        note: "7 photos",
        opensAlbum: true,
        thumbnailUrl: bodyMindHeroAlbum[0]?.src,
        albumImages: bodyMindHeroAlbum,
      },
      {
        id: "detail-set",
        label: "Promotional",
        kind: "photos",
        note: "7 photos",
        opensAlbum: true,
        thumbnailUrl: bodyMindDetailAlbum[0]?.src,
        albumImages: bodyMindDetailAlbum,
      },
      {
        id: "live-site",
        label: "Website",
        kind: "link",
        note: "Opens live site",
        url: "https://www.bodyandmindbeautiful.com/",
        thumbnailUrl: bodyMindWebsiteIcon,
      },
    ],
    x: 17,
    y: 28,
    w: 350,
    h: 250,
    accent: "oklch(0.74 0.1 80)",
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
    x: 16,
    y: 69,
    w: 350,
    h: 250,
    accent: "oklch(0.52 0.22 28)",
  },
  {
    id: "meu-cabelo",
    title: "Blacklus - Meu Cabelo",
    desktopLabel: "Blacklus - Meu Cabelo",
    category: "music video / creative direction / cinematography",
    type: "Music video",
    shortDescription: "Video case shell for the final embed, stills, and BTS notes.",
    role: "Creative direction, cinematography",
    windowStyle: "video-case",
    placeholderMedia: [],
    externalLinks: [],
    folderItems: [
      {
        id: "youtube-embed",
        label: "YouTube embed",
        kind: "video",
        note: "Paste the final YouTube URL here.",
        youtubeUrl: "https://www.youtube.com/watch?v=TutB9AiCz3U&list=RDTutB9AiCz3U&start_radio=1",
      },
      {
        id: "still-frames",
        label: "Still frames",
        kind: "photos",
        note: "6 photos",
        opensAlbum: true,
        thumbnailUrl: blacklusStillFrames[0]?.src,
        albumImages: blacklusStillFrames,
      },
      {
        id: "bts",
        label: "Behind the scenes",
        kind: "folder",
        title: "Behind the scenes",
        shortDescription: "BTS photos and clips.",
        placeholderMedia: [
          {
            id: "bts-photos",
            label: "BTS photos",
            kind: "image",
            note: "Replace with BTS selects.",
          },
          {
            id: "bts-clips",
            label: "BTS clips",
            kind: "video",
            note: "Replace with BTS clips.",
          },
        ],
      },
    ],
    x: 32,
    y: 76,
    w: 350,
    h: 250,
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
    x: 69,
    y: 27,
    w: 350,
    h: 250,
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
    x: 85,
    y: 63,
    w: 350,
    h: 250,
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
    x: 70,
    y: 64,
    w: 350,
    h: 250,
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
    folderItems: [
      {
        id: "whale-songs",
        label: "whale songs",
        kind: "folder",
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
        label: "snow rest",
        kind: "folder",
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
        label: "overgrown",
        kind: "folder",
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
    x: 86,
    y: 33,
    w: 350,
    h: 250,
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
    x: 37,
    y: 45,
    w: 250,
    h: 170,
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
    x: 54,
    y: 53,
    w: 250,
    h: 170,
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
