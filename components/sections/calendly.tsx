"use client";

/**
 * NOT CURRENTLY MOUNTED. Replaced by components/sections/booking.tsx on
 * 1 Sep 2026 while the real calendar link is pending.
 *
 * Kept rather than deleted: the Calendly event it points at is still live
 * (verified 200, "Capital Raise | Strategy Call"), and nothing in this repo is
 * committed yet, so a delete would be unrecoverable. Note the Fundraisr
 * booking page runs on LeadConnector (GoHighLevel), so if that becomes the
 * scheduler this component is the wrong shape for it.
 */

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/copy";

const WIDGET_SRC = "https://assets.calendly.com/assets/external/widget.js";

/**
 * Calendly inline embed, deferred until it scrolls into view — the widget
 * pulls ~100KB and an iframe, and it always sits below the fold.
 */
export function CalendlyEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) return;

    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    script.onerror = () => setFailed(true);
    document.body.appendChild(script);
  }, [visible]);

  return (
    <div ref={ref} className="min-h-[var(--cal-h)] [--cal-h:68rem]">
      {visible && !failed && (
        <div
          className="calendly-inline-widget overflow-hidden rounded-lg border border-line bg-card"
          data-url={`${site.calendly}?hide_gdpr_banner=1&background_color=0e0e13&text_color=ffffff&primary_color=ffffff`}
          // Calendly's inline widget needs an explicit height and does not
          // self-size; the full month grid clips below ~66rem.
          style={{ minWidth: 320, height: "var(--cal-h)" }}
        />
      )}

      {/* Always reachable, and the whole fallback if the widget is blocked. */}
      <p className={failed ? "text-sm text-fg-muted" : "sr-only"}>
        {failed && "The scheduler could not load. "}
        <a
          href={site.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          Book an intro call with {site.name}
        </a>
      </p>
    </div>
  );
}
