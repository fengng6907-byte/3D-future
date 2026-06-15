"use client";

export default function Header() {
  return (
    <header
      className="relative overflow-hidden"
      style={{ background: "#B3546F" }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #fff 0%, transparent 50%), radial-gradient(circle at 80% 50%, #fff 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <p
              className="text-xs font-sans font-medium uppercase tracking-[0.25em] mb-3"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Our Private Space
            </p>
            <h1
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight"
              style={{ color: "#FFFFFF" }}
            >
              DairyBook
            </h1>
            <p
              className="mt-2 font-sans text-sm font-light leading-relaxed max-w-md"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              A shared journal for two hearts — capturing moments, feelings,
              and the little things that make us, us.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold border-2"
                style={{
                  background: "#FCECEF",
                  color: "#B3546F",
                  borderColor: "#B3546F",
                }}
              >
                Y
              </div>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold border-2"
                style={{
                  background: "#FFF9F6",
                  color: "#4A3E3D",
                  borderColor: "#B3546F",
                }}
              >
                P
              </div>
            </div>
            <span
              className="text-xs font-sans font-medium"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              You &amp; Partner
            </span>
          </div>
        </div>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 40"
        fill="none"
        preserveAspectRatio="none"
        style={{ height: "20px" }}
      >
        <path
          d="M0 40V20C240 0 480 0 720 20C960 40 1200 40 1440 20V40H0Z"
          fill="#FFF9F6"
        />
      </svg>
    </header>
  );
}
