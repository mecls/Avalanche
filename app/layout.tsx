import type { Metadata } from "next";
import { Cormorant_Garamond, Cormorant_Infant, Inter } from "next/font/google";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { site } from "@/content/copy";
import "./globals.css";

/**
 * Three faces, each with one job.
 *
 * Satoshi was retired from headings when the design moved back to the serif
 * reference. It is no longer loaded at all — nothing on the site sets it, and
 * keeping a 42KB self-hosted file for no renderer is dead weight. The woff2 is
 * still in app/fonts/ if that decision reverses again.
 *
 * Garamond carries BOTH italic and roman because the H1 sets the first word of
 * each line in italic; dropping the italic face would silently synthesise a
 * slant and the headline is the most visible type on the site.
 */
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/** Figures only. Infant's numerals are the ones the reference sets its stats in. */
const numeric = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cormorant-infant",
  display: "swap",
});

/** Every UI run: nav, buttons, body, captions, eyebrows. */
const ui = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avalanche-capital.com"),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    siteName: site.name,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${numeric.variable} ${ui.variable} h-full antialiased`}
    >
      {/*
        `main` reserves the full chrome height and the hero cancels it, rather
        than both being dropped as the spec's checklist says. The spec was
        measured from a one-page reference; this site has four routes, and on
        the three without a hero an absolutely-positioned header with no
        reserved space lands directly on top of the first section's heading.
        Net effect on the homepage is identical — the hero still starts at y:0.
      */}
      <body className="flex min-h-full flex-col bg-ground text-fg">
        <SiteNav />
        <main className="flex-1 pt-[var(--header-h)]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
