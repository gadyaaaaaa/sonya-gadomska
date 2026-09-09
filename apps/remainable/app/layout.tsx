// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/shell";
export const metadata: Metadata = {
  title: {
    default: "Remainable — Document the damage",
    template: "%s · Remainable",
  },
  description:
    "Document the damage. Know what to inspect next. Preliminary building-damage documentation for professional review.",
  authors: [{ name: "Sonya Gadomska" }],
  creator: "Sonya Gadomska",
  publisher: "Sonya Gadomska",
  icons: { icon: "/icon.svg" },
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
