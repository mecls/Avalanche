import Script from "next/script";
import { site } from "@/content/copy";

/**
 * THE BOOKING CALENDAR on /get-in-touch. A LeadConnector (GoHighLevel) widget,
 * supplied as an embed snippet on 9 Sep 2026 and mounted in place of the
 * qualification questionnaire.
 *
 * This file was the PLACEHOLDER for exactly this, and its instructions were
 * followed rather than replaced: "replace the panel below with the iframe or
 * widget, keep the `<noscript>`-safe link". The old panel was an icon, a line
 * of copy and a button out to `site.booking` in a new tab; `git log -S
 * "Book an intro call"` has it. It also called the platform correctly, which
 * is why `components/sections/calendly.tsx` is still unmounted - a Calendly
 * embed does not fit a LeadConnector calendar.
 *
 * TWO THINGS WERE ADDED TO THE SUPPLIED SNIPPET, and both are why it is worth
 * having a component rather than pasting the markup into the page.
 *
 * **A STARTING HEIGHT.** The snippet sets width and border and no height at
 * all, because `form_embed.js` measures the widget and writes one. Until that
 * script runs - and if it never does - an iframe with no height falls back to
 * about 150px, and `scrolling="no"` means the calendar inside is not reachable
 * by scrolling either. So the frame opens at 760px. The script still resizes
 * it; `min-h` only sets a floor, so a taller calendar still grows past it.
 *
 * **A `<noscript>` ROUTE OUT.** With JavaScript off the iframe still loads and
 * the calendar still works, but nothing resizes it, so the link is what makes
 * the page usable rather than merely present. It goes to `site.booking`, the
 * same scheduler in its own page.
 *
 * `title` is not in the snippet either and is not optional: an untitled iframe
 * is announced as "frame" and nothing else. `allow="payment"` and the `id` ARE
 * verbatim - the id carries the widget's own timestamp suffix and is what
 * `form_embed.js` matches its postMessage against, so do not tidy it.
 *
 * **IT SETS A THIRD-PARTY COOKIE.** LeadConnector does, on load, before anyone
 * interacts with it - the site has no consent banner and this is the first
 * embed that needs one considered. Flagged in docs/COPY-REVIEW.md rather than
 * solved here.
 */
const BOOKING_ID = "b0rSYtZfjJg03J6zg0do";

export function BookingPanel() {
  return (
    // `data-band="light"` makes `card` white and `line` a light hairline, so
    // the frame round the widget matches the panel the questionnaire had in
    // this column. The widget paints its own white, so there is no padding:
    // an inset would read as a white card inside a white card.
    //
    // **`overflow-clip` IS WHAT MAKES `rounded-lg` REAL HERE** (9 Sep 2026, by
    // request - the corners were square against every other panel on the
    // site). The radius is on this div, but the thing painting white is the
    // IFRAME inside it, and an iframe is a replaced element with square
    // corners of its own: without the clip its white punches straight through
    // all four. Same pairing `Plate` uses in components/ui/diagram.tsx, and
    // the same one the unmounted calendly.tsx reached for.
    <div
      data-band="light"
      className="overflow-clip rounded-lg border border-line bg-card"
    >
      <iframe
        src={`https://api.leadconnectorhq.com/widget/booking/${BOOKING_ID}`}
        title="Book a meeting with Avalanche Capital"
        allow="payment"
        scrolling="no"
        id={`${BOOKING_ID}_1788907079129`}
        className="block min-h-[760px] w-full border-none"
      />

      <noscript>
        <p className="border-t border-line p-6 text-sm leading-relaxed text-fg-muted">
          The calendar above needs JavaScript to size itself.{" "}
          <a
            href={site.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg underline underline-offset-4"
          >
            Open the scheduler in its own page
          </a>
          .
        </p>
      </noscript>

      {/* `afterInteractive` rather than `lazyOnload`: the iframe is server
          rendered, so the script has something to measure the moment it runs,
          and deferring it to the load event leaves the calendar at its
          starting height for as long as the page is still fetching images. */}
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
