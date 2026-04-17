import { createFileRoute } from "@tanstack/react-router";
import { Desktop } from "@/components/desktop/Desktop";
import { NAME } from "@/lib/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${NAME} — desktop portfolio` },
      { name: "description", content: `the personal site of ${NAME}, dressed up as a desktop. click around, drag the windows, open the dock.` },
      { property: "og:title", content: `${NAME} — desktop portfolio` },
      { property: "og:description", content: `a playful desktop-style portfolio.` },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Desktop />;
}
