import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { site } from "@/content/copy";
import "./globals.css";

/**
 * Satoshi is the face fundraisr.ai runs on. It is not on Google Fonts, so the
 * two variable files are self-hosted (85KB for the pair) — no third-party
 * connection, nothing render-blocking.
 */
const satoshi = localFont({
  // Roman only: nothing on the site is set in italic, and the italic face is
  // another 43KB. Add it back the day something needs it.
  src: [
    { path: "./fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" },
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
      <body className="flex min-h-full flex-col bg-ground text-fg">
        <SiteNav />
        <main className="flex-1 pt-[var(--header-h)]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
