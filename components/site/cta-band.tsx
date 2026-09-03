import { BookingPanel } from "@/components/sections/booking";
import { SectionHeading } from "@/components/ui/section-heading";
import { ctaBand } from "@/content/copy";

/**
 * "Get in touch" — the calendar. Sits at the foot of every page and is the
 * anchor target for every CTA on the site.
 */
export function CtaBand() {
  return (
    <section
      id="get-in-touch"
      className="scroll-mt-28 border-t border-line bg-ground-alt"
    >
      <div className="shell section-y">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow={ctaBand.eyebrow}
              title={ctaBand.title}
              accent={ctaBand.accent}
              lede={ctaBand.body}
            />
            <p className="mt-8 text-[0.8125rem] text-fg-faint">
              {ctaBand.note}
            </p>
          </div>

          <BookingPanel />
        </div>
      </div>
    </section>
  );
}
