/**
 * "Why Avalanche" — three pillars. It opens the body of /about.
 *
 * MOUNTED AGAIN AFTER A WEEK OFF. It was on the homepage until 1 Sep 2026 and
 * was kept unmounted rather than deleted because the copy is genuine — one of
 * the few blocks on this site lifted from avalanche-capital.com rather than
 * drafted. It went back on 7 Sep 2026, when /team and /manifesto merged into
 * /about and a "why this firm" block finally had somewhere it belonged.
 *
 * **ITS SECOND PILLAR USED TO BE THE TEAM SECTION'S HEADING.** While this was
 * unmounted, /team borrowed "Both Sides of The Table" and that pillar's body
 * verbatim as its own heading and lede. Mounting this put both on one page, so
 * the borrowed version came off and the team section took a heading of its own
 * — `about.team` in content/about.ts. If this is ever unmounted again, that is
 * the block to check before deleting anything.
 *
 * `data-band="dark"` rather than a bare section, and on this page that is
 * load-bearing: /about opens light, so the `:has()` rule in globals.css paints
 * `main` with `--color-paper`, and a section that does not paint ITSELF sits on
 * white while still inheriting the root's dark text tokens — white type on a
 * white ground. The band also does the separating that `border-t
 * border-line-soft` used to, which is why that came off with it.
 */
import { SectionHeading } from "@/components/ui/section-heading";
import { thesis } from "@/content/copy";

export function Thesis() {
  return (
    <section id="thesis" data-band="dark" className="section-y">
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
