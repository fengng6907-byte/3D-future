"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

/* Dynamic import with SSR disabled to prevent Three.js hydration issues */
const ExhibitionCanvas = dynamic(
  () => import("@/components/ExhibitionCanvas"),
  { ssr: false }
);

/* ─── Brand Logo ─── */
function Logo() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #4f6ef7 0%, #2a3a80 100%)",
            boxShadow: "0 4px 16px rgba(79, 110, 247, 0.3)",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3L2 9l10 6 10-6-10-6z" />
            <path d="M2 17l10 6 10-6" />
            <path d="M2 13l10 6 10-6" />
          </svg>
        </div>
        <div>
          <h1
            className="text-xl font-bold tracking-tight"
            style={{ color: "#e8e9ed" }}
          >
            VIBE-SPACE
            <span style={{ color: "#4f6ef7" }}> 3D</span>
          </h1>
        </div>
      </div>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "#6b6f83" }}
      >
        Transform event concepts into immersive 3D walkthroughs.
        Pitch your vision in real-time with interactive spatial
        environments.
      </p>
    </div>
  );
}

/* ─── Spinning Loader ─── */
function Spinner() {
  return (
    <svg
      className="inline-block mr-2"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="3"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Main Page Component ─── */
export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTheme, setActiveTheme] = useState(null);

  const handleGenerate = useCallback(() => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);

    /* Simulate a generation delay for the build process —
       in production this would call an AI generation endpoint */
    setTimeout(() => {
      setActiveTheme(prompt.trim());
      setIsGenerating(false);
    }, 2200);
  }, [prompt, isGenerating]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        handleGenerate();
      }
    },
    [handleGenerate]
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background: "#0a0b0f" }}>
      {/* ─── Left Sidebar Panel (1/4) ─── */}
      <aside
        className="flex flex-col h-full overflow-y-auto"
        style={{
          width: "25%",
          minWidth: "320px",
          maxWidth: "420px",
          background: "#0e0f15",
          borderRight: "1px solid #1a1c28",
          padding: "32px 28px",
        }}
      >
        <Logo />

        {/* Divider */}
        <div
          className="mb-6"
          style={{ height: "1px", background: "linear-gradient(90deg, #1a1c28, transparent)" }}
        />

        {/* Prompt Section */}
        <div className="flex-1">
          <label
            className="block text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#5a5e72" }}
          >
            Event Concept
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Luxury tech product launch with neon blue accents, floating display pedestals, and a dramatic reveal stage..."
            rows={6}
            className="w-full resize-none rounded-xl text-sm leading-relaxed transition-all duration-200"
            style={{
              background: "#12131b",
              border: "1px solid #1e2030",
              padding: "16px",
              color: "#c8cad4",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(79, 110, 247, 0.5)";
              e.target.style.boxShadow = "0 0 0 3px rgba(79, 110, 247, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#1e2030";
              e.target.style.boxShadow = "none";
            }}
          />
          <p
            className="mt-2 text-xs"
            style={{ color: "#3d4052" }}
          >
            Ctrl + Enter to generate
          </p>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full mt-5 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200"
            style={{
              background:
                !prompt.trim() || isGenerating
                  ? "#1a1c28"
                  : "linear-gradient(135deg, #4f6ef7 0%, #3a52c5 100%)",
              color:
                !prompt.trim() || isGenerating
                  ? "#3d4052"
                  : "#ffffff",
              border: "none",
              cursor:
                !prompt.trim() || isGenerating
                  ? "not-allowed"
                  : "pointer",
              boxShadow:
                prompt.trim() && !isGenerating
                  ? "0 4px 20px rgba(79, 110, 247, 0.3)"
                  : "none",
            }}
            onMouseEnter={(e) => {
              if (prompt.trim() && !isGenerating) {
                e.target.style.boxShadow =
                  "0 6px 28px rgba(79, 110, 247, 0.45)";
                e.target.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              if (prompt.trim() && !isGenerating) {
                e.target.style.boxShadow =
                  "0 4px 20px rgba(79, 110, 247, 0.3)";
                e.target.style.transform = "translateY(0)";
              }
            }}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <Spinner />
                Generating Environment...
              </span>
            ) : (
              "Generate 3D Walkthrough"
            )}
          </button>
        </div>

        {/* Active Theme Indicator */}
        {activeTheme && (
          <div
            className="mt-6 rounded-xl p-4"
            style={{
              background: "rgba(79, 110, 247, 0.06)",
              border: "1px solid rgba(79, 110, 247, 0.15)",
              animation: "fadeIn 0.4s ease-out",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 8px rgba(74, 222, 128, 0.5)",
                  display: "inline-block",
                }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#4f6ef7" }}
              >
                Environment Active
              </span>
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "#6b6f83" }}
            >
              {activeTheme}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-6">
          <div
            style={{ height: "1px", background: "linear-gradient(90deg, #1a1c28, transparent)" }}
            className="mb-4"
          />
          <p className="text-xs" style={{ color: "#2a2d3e" }}>
            VIBE-SPACE 3D v1.0 — Immersive Event Visualization
          </p>
        </div>
      </aside>

      {/* ─── Right 3D Viewport (3/4) ─── */}
      <main className="flex-1 h-full relative" style={{ background: "#0b0c10" }}>
        {activeTheme ? (
          <ExhibitionCanvas theme={activeTheme} />
        ) : (
          /* Empty state before generation */
          <div className="flex items-center justify-center h-full">
            <div className="text-center" style={{ maxWidth: "400px" }}>
              <div
                className="mx-auto mb-6 w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(79, 110, 247, 0.06)",
                  border: "1px solid rgba(79, 110, 247, 0.12)",
                }}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4f6ef7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0.6 }}
                >
                  <path d="M12 3L2 9l10 6 10-6-10-6z" />
                  <path d="M2 17l10 6 10-6" />
                  <path d="M2 13l10 6 10-6" />
                </svg>
              </div>
              <h2
                className="text-lg font-semibold mb-2"
                style={{ color: "#3d4052" }}
              >
                No Environment Loaded
              </h2>
              <p className="text-sm" style={{ color: "#2a2d3e" }}>
                Enter an event concept in the sidebar and generate your
                immersive 3D walkthrough.
              </p>
            </div>
          </div>
        )}

        {/* Loading overlay */}
        {isGenerating && (
          <div
            className="absolute inset-0 flex items-center justify-center z-30"
            style={{
              background: "rgba(10, 11, 15, 0.85)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="text-center">
              <div
                className="mx-auto mb-5 w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  border: "2px solid rgba(79, 110, 247, 0.3)",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
              >
                <Spinner />
              </div>
              <p
                className="text-sm font-medium"
                style={{ color: "#8b8fa3" }}
              >
                Building 3D environment...
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
