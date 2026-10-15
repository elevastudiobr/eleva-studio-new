
import type { Metadata } from "next";
import "@fontsource/michroma/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eleva Studio — Experiências digitais",
  description: "Experiências digitais que elevam negócios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
