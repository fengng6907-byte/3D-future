"use client";

import { useState } from "react";

export default function JournalEditor({ onSubmit }) {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text.trim(), imageUrl.trim());
    setText("");
    setImageUrl("");
    setShowImageInput(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div
      className="rounded-2xl p-6 sm:p-7"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EFE5E2",
        boxShadow: "0 1px 3px rgba(74, 62, 61, 0.04)",
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "#FCECEF" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#B3546F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9" />
            <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
          </svg>
        </div>
        <h2
          className="font-serif text-lg"
          style={{ color: "#4A3E3D" }}
        >
          New Entry
        </h2>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What's on your heart today..."
        rows={5}
        className="w-full resize-none rounded-xl text-sm font-sans font-light leading-relaxed transition-all duration-200"
        style={{
          background: "#FFF9F6",
          border: "1px solid #EFE5E2",
          padding: "14px 16px",
          color: "#4A3E3D",
        }}
      />

      {showImageInput && (
        <div className="mt-3" style={{ animation: "fadeIn 0.3s ease-out" }}>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste an image URL..."
            className="w-full rounded-lg text-sm font-sans font-light transition-all duration-200"
            style={{
              background: "#FFF9F6",
              border: "1px solid #EFE5E2",
              padding: "10px 14px",
              color: "#4A3E3D",
            }}
          />
          {imageUrl.trim() && (
            <div className="mt-3 overflow-hidden rounded-t-full" style={{ height: "120px" }}>
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setShowImageInput(!showImageInput)}
          className="flex items-center gap-1.5 text-xs font-sans font-medium transition-colors duration-200"
          style={{ color: showImageInput ? "#B3546F" : "#8A7E7C" }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          {showImageInput ? "Hide image" : "Add photo"}
        </button>

        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="px-5 py-2.5 rounded-xl text-sm font-sans font-semibold tracking-wide transition-all duration-200"
          style={{
            background: text.trim() ? "#B3546F" : "#EFE5E2",
            color: text.trim() ? "#FFFFFF" : "#B5ADAB",
            cursor: text.trim() ? "pointer" : "not-allowed",
            boxShadow: text.trim()
              ? "0 2px 8px rgba(179, 84, 111, 0.25)"
              : "none",
          }}
        >
          Log Entry
        </button>
      </div>

      <p
        className="mt-3 text-xs font-sans"
        style={{ color: "#B5ADAB" }}
      >
        Ctrl + Enter to submit
      </p>
    </div>
  );
}
