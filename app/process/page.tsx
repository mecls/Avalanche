import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBand } from "@/components/site/cta-band";
import { offerings, process } from "@/content/copy";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How Avalanche Capital runs a raise — deal readiness, investor segmentation, and conversion, executed end to end.",
};

export default function ProcessPage() {
  return (
    <>
      <section className="section-y">
        <div className="shell">
          <SectionHeading
            eyebrow={process.eyebrow}
            title={process.title}
            accent={process.accent}
            lede={process.lede}
          />

          <ol className="mt-16 divide-y divide-line border-y border-line">
            {process.steps.map((s) => (
              <li
                key={s.n}
                className="grid gap-5 py-12 md:grid-cols-[auto_1fr] md:gap-14"
              >
                <span className="display text-5xl text-fg-faint md:w-28">{s.n}</span>
                <div className="max-w-2xl">
                  <h3 className="display text-[1.75rem]">{s.title}</h3>
                  <p className="mt-4 leading-relaxed text-fg-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-band="light" className="section-y">
        <div className="shell">
          <SectionHeading
            eyebrow={offerings.eyebrow}
            title={offerings.title}
            accent={offerings.accent}
          />

          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {offerings.items.map((o) => (
              <article key={o.n} className="bg-card p-8 lg:p-10">
                <p className="eyebrow">{o.n}</p>
                <h3 className="display mt-4 text-2xl">{o.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                  {o.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
