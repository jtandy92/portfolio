import { useState } from "react";
import { TOUR_STEPS } from "@/lib/portfolio";

const STORAGE_KEY = "desktop-tour-seen-v1";

export function Tour() {
  const [step, setStep] = useState(() => {
    if (typeof window === "undefined") return -1;
    return localStorage.getItem(STORAGE_KEY) ? -1 : 0;
  });

  if (step < 0) return null;
  const current = TOUR_STEPS[step];
  const isLast = step === TOUR_STEPS.length - 1;

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setStep(-1);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 px-4 pointer-events-none">
      <div
        className="pointer-events-auto max-w-md w-full rounded-2xl p-5 backdrop-blur-xl"
        style={{
          background: "var(--tour-bg)",
          color: "var(--tour-fg)",
          border: "1px solid oklch(1 0 0 / 0.15)",
          boxShadow: "var(--shadow-window)",
          animation: "window-in 0.25s ease-out",
        }}
      >
        <h2 className="text-lg font-semibold mb-1">{current.title}</h2>
        <p className="text-sm opacity-90 leading-relaxed">{current.body}</p>
        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={dismiss}
            className="text-xs px-3 py-1.5 rounded-md border border-white/30 hover:bg-white/10 transition-colors"
          >
            Skip tour
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs opacity-70">Step {step + 1} of {TOUR_STEPS.length}</span>
            <button
              onClick={() => (isLast ? dismiss() : setStep(step + 1))}
              className="text-xs font-medium px-4 py-1.5 rounded-md bg-white text-black hover:bg-white/90 transition-colors"
            >
              {isLast ? "Done" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
