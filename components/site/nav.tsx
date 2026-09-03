"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState, useSyncExternalStore } from "react";
import { nav, site } from "@/content/copy";
import { CtaButton } from "@/components/ui/button";

/**
 * Fixed overlay header. It sits over the hero video at scroll-top with nothing
 * behind it, then takes a ground tint and a hairline on scroll so type stays
 * legible over whatever band is passing underneath.
 *
 * Height is published as `--header-h` (globals.css) — `main` reserves it, and
 * the hero cancels it with a negative margin so the video runs to the top of
 * the viewport.
 */
/**
 * Visual placeholder for the Login entry point fundraisr.ai has. There is no
 * client area on this site yet, so it deliberately does nothing.
 *
 * A <button> rather than an <a>: there is no destination, and a link to `#`
 * or a dead route would be a worse lie than a control that is honestly marked
 * unavailable. `aria-disabled` tells assistive tech it is inert while keeping
 * the muted look — `disabled` would grey it out and drop it from the tab order,
 * which is not the design. Wire it up by swapping this for a <Link>.
 */
function LoginPlaceholder() {
  return (
    <button
      type="button"
      aria-disabled="true"
      title="Coming soon"
      onClick={(e) => e.preventDefault()}
      className="cursor-default text-sm text-fg-muted transition-colors hover:text-fg"
    >
      Login
    </button>
  );
}

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function subscribeViewport(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/** Scroll offset is external state — read directly rather than mirrored into
 *  a setState inside an effect. The server snapshot is `false`, which is the
 *  correct pre-hydration state (the page always starts at the top). */
function useScrolled() {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 8,
    () => false,
  );
}

/**
 * Reads which band is currently passing under the header.
 *
 * The header is fixed and sits outside every section, so it cannot inherit a
 * band's tokens the way shared components do — it has to look them up and
 * re-point them on itself. Probing one pixel above its own bottom edge is
 * what makes this work for any page without the nav knowing the routes.
 *
 * The server snapshot is "dark" because the server cannot measure anything.
 * That is why globals.css carries a `:has()` rule for the first paint: it
 * covers exactly the window between the server's guess and this measurement.
 */
function readBandTone(): "light" | "dark" {
  const header = document.querySelector("header");
  const y = (header?.getBoundingClientRect().bottom ?? 0) - 1;

  for (const band of document.querySelectorAll<HTMLElement>(
    '[data-band="light"]',
  )) {
    const box = band.getBoundingClientRect();
    if (box.top <= y && box.bottom > y) return "light";
  }
  return "dark";
}

function useBandTone(pathname: string) {
  // Re-subscribing is what forces a fresh read, and a route change needs one:
  // the new page's bands sit somewhere else entirely, but if both pages start
  // at the top then no scroll and no resize ever fires to prompt a re-read,
  // and the header would keep the previous page's tone.
  const subscribe = useCallback(
    (onChange: () => void) => {
      void pathname;
      return subscribeViewport(onChange);
    },
    [pathname],
  );

  return useSyncExternalStore(subscribe, readBandTone, () => "dark" as const);
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const tone = useBandTone(pathname);

  // Close the mobile sheet whenever the route changes. Adjusted during render
  // rather than in an effect — this is the documented pattern for resetting
  // state when a prop changes, and it avoids a second render pass showing the
  // sheet still open on the new page.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    // Over a light band the header is never transparent: its type is `text-fg`
    // against nothing, which on a white hero is nothing at all.
    <header
      className={`tone-${tone} fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open || tone === "light"
          ? "border-line bg-ground/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="border-b border-line-soft px-4 py-2 text-center text-[0.6875rem] tracking-[0.14em] text-fg-faint uppercase">
        Advising funds, founders, and operating companies · Intro call available
      </div>

      <nav className="shell relative flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="display text-xl tracking-tight text-fg"
          aria-label={`${site.name} home`}
        >
          {site.shortName}
          <span className="text-fg-faint">.</span>
        </Link>

        {/* Centred on the VIEWPORT, not in the leftover space between the
            wordmark and the buttons — so the links stay put as those two
            change width. This is how fundraisr.ai sets its nav. */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative text-sm transition-colors hover:text-fg ${
                  active ? "text-fg" : "text-fg-muted"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-fg" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <CtaButton href="#get-in-touch" size="sm">
            Book a call
          </CtaButton>
          <LoginPlaceholder />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`h-px w-5 bg-fg transition-transform duration-300 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-fg transition-transform duration-300 ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-ground md:hidden"
      >
        <div className="shell flex flex-col gap-1 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2.5 text-base text-fg-muted"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex items-center gap-5">
            <CtaButton href="#get-in-touch">Book a call</CtaButton>
            <LoginPlaceholder />
          </div>
        </div>
      </div>
    </header>
  );
}
