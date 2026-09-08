import Image from "next/image";
import type { CaseStudy } from "@/content/case-studies";

/*
 * `CaseStudyCard` USED TO LIVE HERE AND IS GONE (9 Sep 2026, by request).
 * It was the homepage's wide treatment - the client's mark, the accent metric
 * pill and our result sentence in a bordered panel - and the case-study slide
 * was rebuilt around a full-column picture instead, with the headline saying
 * what the pill and the sentence both said. Nothing else ever rendered it:
 * /customers draws the tile below, which is a different shape entirely. Two
 * things it took with it, so they are findable: the SITE'S LAST METRIC PILL,
 * which was one of the four documented homes of the accent, and the featured/
 * grid variant switch. `git log -S CaseStudyCard` has both.
 */

/**
 * The /customers grid treatment: a square tile carrying the client's mark,
 * with the result sentence set BELOW it rather than inside.
 *
 * No border and no metric pill. The tile's own ground is what separates it
 * from the section, so this only reads as a tile while the section around it
 * is darker than `card` - hence `bg-ground-deep` on that section rather than
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
