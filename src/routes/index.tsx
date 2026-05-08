import { createFileRoute } from "@tanstack/react-router";
import { Desktop } from "@/components/desktop/Desktop";
import { NAME, SITE_TITLE } from "@/lib/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      {
        name: "description",
        content: `the personal site of ${NAME}, dressed up as a desktop. click around, drag the windows, open the dock.`,
      },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: `a playful desktop-style portfolio.` },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Desktop />;
}
