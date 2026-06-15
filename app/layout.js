import "./globals.css";

export const metadata = {
  title: "DairyBook — Our Shared Journal",
  description:
    "A private, couple-only digital journal for capturing moments together.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
