import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pilah Tumbuhan Pintar - Media Interaktif Papan Digital & Tablet",
  description:
    "Game edukasi memilah bagian tumbuhan (buah, daun, batang, akar, bunga) dirancang khusus untuk papan interaktif digital dan tablet touchscreen.",
  keywords: [
    "game edukasi",
    "papan interaktif",
    "smartboard",
    "tablet edukasi",
    "bagian tumbuhan",
    "soal interaktif",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans select-none">{children}</body>
    </html>
  );
}
