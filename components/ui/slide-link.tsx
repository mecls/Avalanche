"use client";

import type { ReactNode } from "react";
import { ctaClass } from "@/components/ui/button";

/**
 * A control of the homepage case-study carousel - the prev/next buttons and
 * the dots both wear it.
 *
 * **THIS IS A CLIENT COMPONENT AND IT WAS THE LAST RESORT, NOT THE FIRST
 * IDEA.** The carousel is a CSS scroll-snap container precisely so the
 * section could stay server-rendered - see the `.case-carousel` note in
 * globals.css - and the controls shipped as bare `<a href="#slide-id">` on
 * that reasoning. They did not work, and the reason is worth writing down so
 * nobody removes this file and "simplifies" back:
 *
 * **A FRAGMENT NAVIGATION DOES NOT SCROLL A HORIZONTAL SCROLL CONTAINER
 * HERE.** Measured in Chrome against this exact markup: clicking the anchor
 * sets `location.hash` and leaves the container at `scrollLeft: 0`. Setting
 * `location.hash` directly does the same nothing. It is not the snap type, not
 * `scroll-margin`, and not smooth scrolling - all three were ruled out one at
 * a time. `scrollIntoView` on the same element, in the same conditions, lands
 * it exactly. So the browser's own fragment handling is what cannot be relied
 * on, and one imperative call is what replaces it.
 *
 * It holds NO STATE - no `useState`, no effect, nothing to hydrate but a
 * click handler. The active slide is the container's scroll position, which
 * the browser already keeps and which swipe and trackpad already write to. That is why this is a five-line island around the control
 * rather than a client boundary around the section.
 *
 * `block: "nearest"` is deliberate: it moves the carousel horizontally and
 * leaves the page's vertical scroll alone, so the studies swap in place
 * instead of the page jumping under the reader. And `behavior` is left
 * UNSET on purpose - the container's own `scroll-behavior` decides, which is
 * `smooth` normally and `auto` under reduced motion, both set in CSS. Passing
 * `behavior: "smooth"` here would override the reduced-motion rule.
 *
 * The `href` is real and stays real. With JS off the control does nothing, but
 * the carousel itself still scrolls, swipes and takes arrow keys, and both
 * studies are in the DOM either way - so this enhances a working thing rather
 * than being the only way in.
 *
 * `className` REPLACES the button look rather than extending it: the dots are
 * the same navigation with none of the chrome, and passing them a ghost
 * button's border and padding to override would be worse than opting out.
 * `label` is for those dots - a bare dot has no text to name it.
 */
export function SlideLink({
  targetId,
  children,
  className,
  label,
}: {
  targetId: string;
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={`#${targetId}`}
      aria-label={label}
      className={className ?? ctaClass("sm", "ghost", "group")}
      onClick={(e) => {
        const el = document.getElementById(targetId);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ block: "nearest", inline: "start" });
      }}
    >
      {children}
    </a>
  );
}
