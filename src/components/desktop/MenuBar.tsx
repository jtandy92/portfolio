import { useEffect, useState } from "react";
import { NAME } from "@/lib/portfolio";

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(i);
  }, []);
  return now;
}

export function MenuBar() {
  const now = useClock();
  const day = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return (
    <div
      className="fixed top-0 inset-x-0 z-50 h-7 px-3 flex items-center justify-between text-[13px] backdrop-blur-md"
      style={{ background: "var(--menubar-bg)", color: "var(--menubar-fg)" }}
    >
      <div className="flex items-center gap-4">
        <span className="font-semibold">{NAME}</span>
        <span className="opacity-80 hidden sm:inline">File</span>
        <span className="opacity-80 hidden sm:inline">Edit</span>
        <span className="opacity-80 hidden sm:inline">View</span>
        <span className="opacity-80 hidden sm:inline">Help</span>
      </div>
      <div className="flex items-center gap-3 tabular-nums">
        <span className="opacity-90">{day}</span>
        <span>{time}</span>
      </div>
    </div>
  );
}
