import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/content/faqs";

/**
 * Two-column: heading block left, accordion right, stacking below `lg`.
 * The heading sticks while the list scrolls past on tall viewports.
 *
 * Still a native <details> accordion — keyboard-accessible, findable by
 * in-page search, and open by default before hydration, with no JS at all.
 * The first item is `open` so the section does not read as a wall of closed
 * bars, which is how the reference presents it.
 */
export function Faqs() {
  return (
    <section id="faq" data-band="light" className="section-y border-t border-line-soft">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          accent="Asked Questions"
          lede="Clarity on our process, scope, and standards."
          className="lg:sticky lg:top-32 lg:self-start"
        />

        <div className="flex flex-col gap-2.5">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="group rounded-md border border-line bg-card px-5 py-4 transition-colors duration-200 open:border-fg/20 sm:px-6 sm:py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[0.9375rem] font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="shrink-0 text-xl leading-none text-fg-faint transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
