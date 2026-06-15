"use client";

import EntryCard from "./EntryCard";

export default function Timeline({ entries }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h2
          className="font-serif text-xl"
          style={{ color: "#4A3E3D" }}
        >
          Our Timeline
        </h2>
        <div
          className="flex-1 h-px"
          style={{ background: "#EFE5E2" }}
        />
        <span
          className="text-xs font-sans font-medium"
          style={{ color: "#B5ADAB" }}
        >
          {entries.length} {entries.length === 1 ? "moment" : "moments"}
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {entries.map((entry, i) => (
          <EntryCard key={entry.id} entry={entry} index={i} />
        ))}
      </div>
    </div>
  );
}
