"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { announce, nav, site } from "@/content/copy";
import { CtaButton } from "@/components/ui/button";

/**
 * Site chrome, in TWO pieces.
 *
 *   1. a 37px announcement bar, `fixed`, which stays on screen;
 *   2. a 79.2px nav, `absolute` at top:37px, which scrolls away with the page.
 *
 * That split is the reference's, and the second half of it is the reason this
 * file lost a lot of machinery. The nav used to be `fixed`, which meant it
 * passed over every band on the page and had to measure the one beneath it on
 * every scroll and resize (`useSyncExternalStore` over scroll + resize, plus a
 * pathname-keyed subscribe to catch route changes where no scroll fires) so it
 * could re-point its own tokens and avoid white-on-white.
 *
 * An absolute nav only ever sits over the FIRST section, and that never
 * changes after first paint — so the whole thing collapses to one `:has()`
 * rule in globals.css. No scroll listener, no tone state, no hydration gap.
 *
 * The combined 116.2px is published as `--header-h`: `main` reserves it and
 * the hero cancels it.
 */

/** Arrow glyph closing the banner link. Inline so it inherits colour and
 *  cannot fall out of sync with the text it trails. */
function ArrowGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="ml-1 inline-block h-[0.7em] w-[0.7em] align-baseline"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Reset the mobile sheet on navigation DURING RENDER, not in an effect —
  // an effect would paint one frame with the old route's sheet still open.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <>
      {/* 1. Announcement bar — fixed, opaque, always on top of the nav. */}
      <div className="fixed inset-x-0 top-0 z-[2] flex h-[var(--header-bar-h)] items-center justify-center gap-2.5 bg-[#151515] py-2">
        <div className="flex h-[21px] items-center gap-2 px-5">
          <span
            aria-hidden
            className="h-3 w-3 shrink-0 rounded-full bg-live shadow-[0_0_8px_rgba(74,222,128,0.6)]"
          />
          <p className="truncate text-[14px] leading-[21px] font-medium text-white/80 italic">
            {announce.text}
          </p>
          <Link
            href="#get-in-touch"
            className="hidden shrink-0 text-[14px] leading-[21px] font-medium text-gold underline italic underline-offset-2 sm:inline"
          >
            {announce.linkLabel}
            <ArrowGlyph />
          </Link>
        </div>
      </div>

      {/*
        2. Nav — ABSOLUTE, not fixed, so it scrolls away. `top` is the bar's
        height. It is transparent at every scroll position and over every
        band; the only thing that changes is its text colour, and that is the
        `:has()` rule in globals.css for pages opening on a light band.
      */}
      <header className="absolute inset-x-0 top-[var(--header-bar-h)] z-[1] h-[var(--header-nav-h)] text-fg">
        <nav className="shell flex h-full items-center justify-center gap-2.5 py-4">
          {/* Left third. `flex-1` on both outer cells is what centres the
              middle group on the VIEWPORT rather than in the space left over,
              so the links stay put as the wordmark and button change width. */}
          <div className="flex flex-1 items-center gap-2.5">
            <Link
              href="/"
              aria-label={`${site.name} home`}
              className="display text-[26px] whitespace-nowrap"
            >
              {site.name}
            </Link>
          </div>

          <div className="hidden shrink-0 items-center gap-1.5 md:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center rounded-full px-3.5 py-2 text-[14px] leading-[16.8px] transition-colors hover:bg-white/[0.08] ${
                    active ? "bg-white/[0.08]" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-1 items-center justify-end gap-2.5">
            <CtaButton
              href="#get-in-touch"
              variant="ghost"
              className="hidden md:inline-flex"
            >
              {site.navCta}
            </CtaButton>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span
                className={`h-px w-5 bg-current transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>

        {/* Mobile sheet. Opaque, because it sits over the hero video. */}
        <div
          id="mobile-nav"
          hidden={!open}
          className="border-t border-line-soft bg-[#151515] md:hidden"
        >
          <div className="shell flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2.5 text-base text-white"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3">
              <CtaButton href="#get-in-touch">{site.navCta}</CtaButton>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
