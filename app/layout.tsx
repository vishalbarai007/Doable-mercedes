import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { CookieBanner } from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Mercedes-Maybach | Welcome to Beyond.",
  description: "Welcome to a mythical place, where vision becomes reality. Welcome to couture, class and craftsmanship.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Adobe Fonts kit for futura-pt-condensed (licensed; swap for your own kit in production) */}
        <link rel="stylesheet" href="https://use.typekit.net/tlc3auc.css" />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
        <Header />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
