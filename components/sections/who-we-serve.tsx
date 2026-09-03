import { SectionHeading } from "@/components/ui/section-heading";
import { whoWeServe } from "@/content/copy";

export function WhoWeServe() {
  return (
    <section id="who-we-serve" data-band="light" className="section-y">
      <div className="shell">
        <SectionHeading
          eyebrow={whoWeServe.eyebrow}
          title={whoWeServe.title}
          accent={whoWeServe.accent}
          lede={whoWeServe.lede}
        />

        <dl className="mt-16 divide-y divide-line border-y border-line">
          {whoWeServe.verticals.map((v, i) => (
            // A <dl> may only contain <dt>/<dd> (optionally wrapped in a
            // <div>), so the index lives inside the <dt> rather than beside it.
            <div
              key={v.title}
              className="grid gap-4 py-9 md:grid-cols-[1fr_1.4fr] md:items-baseline md:gap-10"
            >
              <dt className="flex items-baseline gap-5">
                <span className="eyebrow shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display text-2xl md:text-[1.75rem]">
                  {v.title}
                </span>
              </dt>
              <dd className="text-sm leading-relaxed text-fg-muted">
                {v.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
