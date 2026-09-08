import { ArrowGlyph, CtaButton } from "@/components/ui/button";

/**
 * The page header shared by /solutions, /customers and /about: a
 * `page-label` run, a 72px H1, a 16/24 lede, and a CTA bottom-aligned hard
 * right.
 *
 * IT WAS DUPLICATED JSX AND THAT IS WHY THIS EXISTS. /solutions and
 * /customers were separate builds until 4 Sep 2026 and had drifted to a
 * different value in every row - 64px vs 80px H1 (both now 72), a 600-weight
 * grey label against a 500-weight ink one, a 15px lede against 16px, a 576px
 * column against 720 - which is what made /customers read as a different
 * site. They were hand-aligned and both carried a "keep them in step"
 * comment. A third page would have made three copies of a construction that
 * has already drifted once, so the copies were collapsed into this.
 *
 * Renders ONLY the inner `shell` div. The `<section>` stays with the caller
 * because the wrappers genuinely differ: /customers adds
 * `flex flex-col overflow-hidden` for the logo strip it hangs below the
 * header, /solutions does not.
 *
 * Two traps this has to keep holding:
 *
 *  - `display-72` HAS NO BASE RULE. It exists only inside
 *    `@media (max-width: 809px)` in globals.css, so the base size has to come
 *    from the `text-[72px]` beside it. Drop either and the heading is unsized
 *    at one end of the range.
 *  - `page-label` carries no colour of its own. The accent is applied here,
 *    at the call site, and must not be folded into the utility - the
 *    /solutions block labels and rail numbers take the same utility and
 *    deliberately stay ink.
 *
 * `items-end` bottom-aligns the CTA with the last line of the lede, the same
 * pairing the hero uses. It stacks below 809px, where a 146px button beside a
 * 44px heading leaves the heading no measure to wrap in.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  cta,
  ctaHref = "/get-in-touch",
  align = "left",
}: {
  eyebrow: string;
  /**
   * `ReactNode` rather than `string` so a page can author its own line
   * breaks. /about does - it inherited the two-line H1 from /manifesto when
   * that page was folded into it - and the other two pass a plain string and
   * render byte-identically to the markup this replaced.
   */
  title: React.ReactNode;
  lede: string;
  cta: string;
  ctaHref?: string;
  /**
   * `center` stacks the whole header on the centre line - eyebrow, H1, lede
   * and CTA - which is what /about uses. The other two pass nothing and render
   * the left-aligned row they always have, byte for byte.
   *
   * It replaced an inset visual in the right half (a small dark plate, added
   * and removed on 7 Sep 2026). Centring solves the same problem better: the
   * complaint was an empty right half, and a centred header has no right half
   * to leave empty. `git show 44846ba` has the inset and its mark.
   */
  align?: "left" | "center";
}) {
  const button = (
    <CtaButton href={ctaHref} className="group">
      {cta}
      <ArrowGlyph />
    </CtaButton>
  );

  if (align === "center") {
    return (
      <div className="shell flex flex-col items-center gap-5 overflow-clip pt-[120px] pb-16 text-center max-[809px]:pt-[72px] max-[809px]:pb-12">
        <p className="page-label text-accent">{eyebrow}</p>

        {/* Wider measure than the left-aligned variant's 720px: a centred H1
            with nothing beside it can use the full column, and the authored
            two-line break wants the room. */}
        <h1 className="display display-72 max-w-[900px] text-[72px]">
          {title}
        </h1>

        <p className="max-w-[680px] text-[16px] leading-6 text-fg-muted">
          {lede}
        </p>

        <div className="mt-3">{button}</div>
      </div>
    );
  }

  return (
    <div className="shell flex flex-col items-center justify-center gap-2.5 overflow-clip pt-[100px] pb-12 max-[809px]:pt-[60px] max-[809px]:pb-8">
      <div className="flex w-full flex-row items-end justify-center gap-6 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-8">
        <div className="flex flex-1 flex-col items-start justify-center gap-4 overflow-clip max-[809px]:w-full max-[809px]:flex-none">
          {/* Accented, matching the section eyebrows - this is the page's own
              name and does the same job. */}
          <p className="page-label text-accent">{eyebrow}</p>

          <div className="max-w-[720px]">
            <h1 className="display display-72 text-[72px]">{title}</h1>
          </div>

          <div className="max-w-[680px]">
            <p className="text-[16px] leading-6 text-fg-muted">{lede}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center">{button}</div>
      </div>
    </div>
  );
}
