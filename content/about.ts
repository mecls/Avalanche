/**
 * /about — the page-level copy for About Us.
 *
 * THE PAGE IS THREE THINGS AT ONCE and its copy lives in four files. What the
 * firm is comes from `thesis` in content/copy.ts; what it believes from
 * content/manifesto.ts; who runs it from content/team.ts. This file holds only
 * what belongs to the PAGE itself — the header above all of them, and the
 * heading over the portraits.
 *
 * IT WAS TWO ROUTES UNTIL 7 SEP 2026. `/team` carried the portraits and the
 * press quotes and opened on a dark band with a section heading; `/manifesto`
 * carried the divergence, the five beliefs and the three access layers and
 * opened on the shared page header. They were merged by request, the merged
 * page is called About Us, and both old paths now 307 here — see
 * `next.config.ts`.
 *
 * The H1 came from `/manifesto` and is deliberately still a claim rather than
 * an introduction. "About Us" over "We are a private capital advisory" would
 * be the safe version and would say nothing; the page opens on the position
 * the rest of it argues, and the reader meets the firm through what it thinks.
 */

export const about = {
  /**
   * The `page-label` above the H1. It is the PAGE's own name, so it takes
   * `text-accent` at the call site the way /solutions and /customers do —
   * that colour is applied there and must not move into the utility.
   */
  eyebrow: "About Us",

  /**
   * The H1 breaks on AUTHORED lines, the way the hero's does. That is content
   * rather than layout, which is why the break lives here and not as a <br>
   * in the page.
   *
   * It has to be authored: the full line is 33 characters at 72px inside a
   * 720px measure, so it wraps either way — and left to itself it can break
   * as "…scarce. Access / is.", which strands the second sentence's verb and
   * throws away the whole point of the pairing.
   */
  // DRAFT
  titleLines: ["Capital is not scarce.", "Access is."],

  // DRAFT
  lede: "Private markets have absorbed more and more of the value being created, while the machinery for distributing capital into them has narrowed. Two forces moving in opposite directions. Everything we do sits in the space between them.",

  cta: "Get in touch",

  /**
   * The heading over the portraits.
   *
   * IT USED TO BE "Both sides of the table", with the thesis pillar of that
   * name as its lede — the pillar's text, verbatim, standing in for a team
   * heading while the pillar itself was unmounted. `Thesis` is mounted on this
   * page now and renders that pillar in full a few hundred pixels above, so
   * the borrowed version had to go rather than sit there as a duplicate.
   *
   * There is no lede. Any sentence here would be one this repo invented about
   * five named people, and the same restraint applies as to the bios in
   * content/team.ts: the portraits and the titles are the facts, and they
   * carry the section on their own.
   */
  team: {
    eyebrow: "Team",
    // DRAFT
    title: "The people you work with",
    /**
     * The supporting line every other section header on the site carries —
     * eyebrow, heading, then one muted line of context. Four of this page's
     * sections were missing theirs, which is what broke the vertical rhythm
     * against /customers and /solutions.
     *
     * It describes the SHAPE of the team, not any individual: five people,
     * both sides of a raise. That is the same limit the bios keep, for the
     * same reason — see content/team.ts.
     */
    // DRAFT
    lede: "Five people covering both sides of a raise — origination, structuring, investor relationships, and the tooling underneath them.",
  },
} as const;
