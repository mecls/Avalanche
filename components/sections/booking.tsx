import { CtaButton } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { site, ctaBand } from "@/content/copy";

/**
 * PLACEHOLDER for the booking calendar.
 *
 * The real scheduler is not wired up yet — `site.booking` currently points at
 * the Fundraisr booking page, which is live and ours, so the button works in
 * the meantime.
 *
 * To swap in a real embed later: replace the panel below with the iframe or
 * widget, keep the `<noscript>`-safe link, and delete this comment. Note the
 * Fundraisr page runs on LeadConnector (GoHighLevel) rather than Calendly, so
 * the old `components/sections/calendly.tsx` will not fit it — that component
 * is no longer mounted.
 */
export function BookingPanel() {
  return (
    <div className="flex min-h-[26rem] flex-col items-center justify-center rounded-lg border border-line bg-card p-8 text-center sm:min-h-[32rem] sm:p-12">
      <Icon name="calendar" className="h-8 w-8 text-fg-faint" />

      <p className="display mt-6 text-2xl text-balance">
        Book an intro call
      </p>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">
        {ctaBand.note}. Pick a time that suits you and we&rsquo;ll take it from
        there.
      </p>

      <CtaButton href={site.booking} className="mt-8" target="_blank" rel="noopener noreferrer">
        Book a meeting
      </CtaButton>

      <p className="mt-5 text-[0.6875rem] text-fg-faint">
        Opens the scheduler in a new tab
      </p>
    </div>
  );
}
