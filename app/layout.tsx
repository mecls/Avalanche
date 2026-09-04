import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { site } from "@/content/copy";
import "./globals.css";

/**
 * ONE face for the whole site: Satoshi, on everything. Headings, figures,
 * body, buttons, nav. No secondary display face and no serif anywhere.
 *
 * SELF-HOSTED, not from Google Fonts — Satoshi is a Fontshare (Indian Type
 * Foundry) release and is not on Google's catalogue at all. One 42KB variable
 * woff2, so no third-party connection and nothing render-blocking. The file
 * has been in app/fonts/ since the first fundraisr-matched build; it went
 * unused through the Cormorant era and is loaded again as of 4 Sep 2026.
 *
 * `weight: "300 900"` declares the file's real `wght` axis range rather than a
 * list of static cuts, so 400/500/600 all interpolate from this one file.
 *
 * ROMAN ONLY, and that constrains the design rather than the other way round:
 * this build carries no `ital` or `slnt` axis and reports `italicAngle: 0`, so
 * ANY italic on the site would be a browser-synthesised slant. Nothing is set
 * in italic — the hero H1's lead words and the closing note both dropped theirs
 * when this landed. Do not add an `italic` class anywhere without adding
 * Satoshi-VariableItalic.woff2 (~43KB) alongside this.
 *
 * One quirk worth knowing: the variable file's DEFAULT instance is wght 900,
 * not 400. Anything that somehow renders without a resolved weight comes out
 * Black rather than Regular.
 */
const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
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
      className={`${satoshi.variable} h-full antialiased`}
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
