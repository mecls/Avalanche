/**
 * NOT CURRENTLY MOUNTED. The "Why Avalanche" section was taken off the
 * homepage on 1 Sep 2026. Component and copy (`thesis` in content/copy.ts) are
 * kept because the text is genuine copy from avalanche-capital.com and nothing
 * in this repo is committed yet — deleting it now would be unrecoverable.
 * Delete both if it is not coming back.
 */
import { SectionHeading } from "@/components/ui/section-heading";
import { thesis } from "@/content/copy";

export function Thesis() {
  return (
    <section id="thesis" className="section-y border-t border-line-soft">
      <div className="shell">
        <SectionHeading
          eyebrow={thesis.eyebrow}
          title={thesis.title}
          accent={thesis.accent}
          lede={thesis.lede}
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
          {thesis.pillars.map((p, i) => (
            <article key={p.title} className="bg-card p-8 lg:p-10">
              <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="display mt-5 text-2xl">{p.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
