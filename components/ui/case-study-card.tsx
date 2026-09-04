import Image from "next/image";
import type { CaseStudy } from "@/content/case-studies";

/**
 * One case study. `featured` is the wide treatment used for Neurable on the
 * homepage; the default is the grid card on /customers.
 */
export function CaseStudyCard({
  study,
  featured = false,
}: {
  study: CaseStudy;
  featured?: boolean;
}) {
  return (
    <article
      // min-w-0: grid items default to min-width:auto, so the pill below would
      // otherwise set a min-content floor and overflow the page on narrow screens.
      className={`flex min-w-0 flex-col rounded-lg border border-line bg-card transition-colors duration-300 hover:border-fg/20 ${
        featured ? "gap-8 p-9 sm:p-12" : "gap-6 p-7"
      }`}
    >
      <div className="flex items-start justify-between gap-4 sm:gap-6">
        <div className="relative h-9 w-24 shrink-0 sm:w-32">
          <Image
            src={study.logo}
            alt={study.name}
            fill
            sizes="(max-width: 640px) 96px, 128px"
            className="logo-mark object-contain object-left"
          />
        </div>
        {/* The metric is the one number on a card, so it takes the accent
            rather than the fg/ground inversion the buttons use. `text-ground`
            still does the work: white on #3056EE in a light band (5.7:1),
            #151515 on #8aa4ff in a dark one (7.7:1). */}
        <span className="rounded-full bg-accent px-3 py-1 text-right text-[0.6875rem] font-medium text-balance text-ground">
          {study.metric}
        </span>
      </div>

      <p
        className={`leading-relaxed text-fg-muted ${
          featured ? "max-w-2xl text-lg" : "text-sm"
        }`}
      >
        {study.result}
      </p>

      <p className="eyebrow mt-auto pt-2">{study.category}</p>
    </article>
  );
}

/**
 * The /customers grid treatment: a square tile carrying the client's mark,
 * with the result sentence set BELOW it rather than inside.
 *
 * No border and no metric pill. The tile's own ground is what separates it
 * from the section, so this only reads as a tile while the section around it
 * is darker than `card` — hence `bg-ground-deep` on that section rather than
 * plain `ground`. The marks are white-on-transparent, so the tile must stay
 * dark; do not put this grid in a `data-band="light"` section.
 */
export function CaseStudyTile({ study }: { study: CaseStudy }) {
  return (
    <article className="group min-w-0">
      <div className="flex aspect-square items-center justify-center rounded-md bg-card p-10 transition-colors duration-300 group-hover:bg-card/60">
        <div className="relative h-11 w-36 sm:w-40">
          <Image
            src={study.logo}
            alt={study.name}
            fill
            sizes="(max-width: 640px) 144px, 160px"
            className="logo-mark object-contain"
          />
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-fg-muted">
        {study.result}
      </p>
    </article>
  );
}
