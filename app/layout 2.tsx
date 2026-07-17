import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://szamowski.dev"),
  title: "Maciej Szamowski | Fullstack Developer",
  description:
    "Fullstack developer building native Apple apps and modern web products with Swift, React, Next.js and TypeScript.",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0A0A0B",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
