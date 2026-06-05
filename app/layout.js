import "./globals.css";

export const metadata = {
  title: "VIBE-SPACE 3D — Immersive Event Visualization",
  description:
    "Transform event concepts into immersive 3D walkthroughs for live client pitches.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
