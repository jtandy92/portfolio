import { useEffect, useState } from "react";
import { MENU_BAR_NAME } from "@/lib/portfolio";

export const MENU_BAR_HEIGHT = 28;

export function MenuBar({ onResetLayout }: { onResetLayout?: () => void } = {}) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(i);
  }, []);

  const day =
    now?.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) ?? "";
  const time = now?.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) ?? "";

  return (
    <div
      className="fixed top-0 inset-x-0 z-[10000] px-3 flex items-center justify-between text-[13px] backdrop-blur-md"
      style={{
        height: MENU_BAR_HEIGHT,
        background: "var(--menubar-bg)",
        color: "var(--menubar-fg)",
      }}
    >
      <div className="flex items-center gap-4">
        <span className="font-semibold">{MENU_BAR_NAME}</span>
        <span className="opacity-80 hidden sm:inline">File</span>
        <span className="opacity-80 hidden sm:inline">Edit</span>
        <span className="opacity-80 hidden sm:inline">View</span>
        {onResetLayout && (
          <button
            onClick={onResetLayout}
            className="opacity-80 hover:opacity-100 underline-offset-2 hover:underline"
            title="Reset desktop layout"
          >
            Reset layout
          </button>
        )}
        <span className="opacity-80 hidden sm:inline">Help</span>
      </div>
      <div className="flex items-center gap-3 tabular-nums" suppressHydrationWarning>
        <span className="opacity-90">{day}</span>
        <span>{time}</span>
      </div>
    </div>
  );
}
