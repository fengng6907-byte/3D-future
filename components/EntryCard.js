"use client";

function formatTimestamp(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function AuthorBadge({ author }) {
  const styles = {
    You: { bg: "#FCECEF", color: "#B3546F", letter: "Y" },
    Partner: { bg: "#FFF9F6", color: "#4A3E3D", letter: "P" },
    Together: { bg: "#B3546F", color: "#FFFFFF", letter: "T" },
  };
  const s = styles[author] || styles.You;

  return (
    <div className="flex items-center gap-2.5">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold"
        style={{ background: s.bg, color: s.color }}
      >
        {s.letter}
      </div>
      <div>
        <p className="text-sm font-sans font-semibold" style={{ color: "#4A3E3D" }}>
          {author}
        </p>
      </div>
    </div>
  );
}

function ArchedImage({ src }) {
  return (
    <div
      className="overflow-hidden mt-4 mb-1"
      style={{
        borderRadius: "9999px 9999px 16px 16px",
        height: "200px",
      }}
    >
      <img
        src={src}
        alt="Journal memory"
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          e.target.parentElement.style.display = "none";
        }}
      />
    </div>
  );
}

function MoodTag({ tag }) {
  return (
    <span
      className="inline-block px-2.5 py-1 rounded-full text-[11px] font-sans font-medium"
      style={{
        background: "#FCECEF",
        color: "#B3546F",
      }}
    >
      {tag}
    </span>
  );
}

export default function EntryCard({ entry, index }) {
  return (
    <article
      className="entry-card rounded-2xl p-5 sm:p-6 transition-shadow duration-300"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EFE5E2",
        animationDelay: `${index * 60}ms`,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <AuthorBadge author={entry.author} />
        <time
          className="text-xs font-sans font-light"
          style={{ color: "#B5ADAB" }}
        >
          {formatTimestamp(entry.timestamp)}
        </time>
      </div>

      <p
        className="text-sm font-sans font-light leading-relaxed"
        style={{ color: "#4A3E3D" }}
      >
        {entry.text}
      </p>

      {entry.image && <ArchedImage src={entry.image} />}

      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {entry.tags.map((tag) => (
            <MoodTag key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
