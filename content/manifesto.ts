/**
 * The manifesto — what the firm believes about the market it operates in.
 *
 * IT IS NO LONGER ITS OWN ROUTE. It was `/manifesto` until 7 Sep 2026 and is
 * now the middle of `/about`, between the thesis and the team. The page-level
 * copy that used to live here — the label, the H1's authored lines, the lede
 * and the header CTA — moved to `content/about.ts` with it; what is left is
 * the three blocks themselves, which is all this file was ever really about.
 *
 * EVERY STRING IN THIS FILE IS DRAFT. None of it was lifted from an Avalanche
 * property; it was written against a thesis document supplied on 5 Sep 2026
 * and condensed here. It is logged in docs/COPY-REVIEW.md and needs the same
 * sign-off pass as the team bios and the FAQ answers.
 *
 * THERE ARE NO FIGURES ON THIS PAGE, AND THAT IS THE DESIGN.
 *
 * The source document carried roughly twenty cited statistics — listed-company
 * counts, family-office growth, median age at IPO, mega-fund share of
 * committed capital. Not one of them could be verified from here, and the
 * track-record figures already on the site are the most load-bearing claims we
 * make: adding twenty more unverified ones to state a set of opinions would be
 * spending the site's credibility to say something that does not need a number
 * to be true.
 *
 * So the page argues from position instead. Every directional claim below
 * ("the listed universe has been shrinking", "concentration has risen for a
 * decade") is a widely-documented shape, stated without a figure attached, and
 * both diagrams are shape-only. Nothing on this page can be factually wrong.
 *
 * If you want the data version, that is a different page and it needs a
 * sourcing pass first.
 */

export type Belief = {
  /** The position, stated flat. Kept short — it sets at 28px and wants to
   *  land in two lines, not five. */
  title: string;
  body: string;
};

export type Layer = {
  n: string;
  title: string;
  body: string;
};

export const manifesto = {
  // DRAFT
  divergence: {
    eyebrow: "The divergence",
    title: "Two forces, moving apart",
    body: [
      "The pool of capital is widening. Alternatives keep compounding, and the number of people who can commit without a committee — family offices above all — keeps growing.",
      "The routes that reach them are narrowing. Distribution has consolidated into fewer, larger intermediaries serving fewer, larger issuers. Supply of capital and access to capital have decoupled.",
    ],
    note: "The space between those two lines is the whole reason this firm exists.",
  },

  // DRAFT
  beliefs: {
    eyebrow: "What we believe",
    title: "Five positions we build on",
    // DRAFT — the supporting line the site's section headers all carry.
    lede: "Not predictions. These are the structural features of private markets that every mandate we take is built to work with.",
    items: [
      {
        title: "Private markets are where value is created now.",
        body: "The listed universe has been shrinking for a generation while the private one has multiplied, and companies stay private for years longer than they used to. This is not a cycle. It is a permanent relocation of where enterprise value is built, held and traded.",
      },
      {
        title: "The capital pool is widening. The channels into it are not.",
        body: "There is more capital than ever, and more people with the authority to commit it. Distribution has moved the other way, consolidating into fewer, larger intermediaries serving fewer, larger issuers. Supply of capital and access to capital have decoupled.",
      },
      {
        title: "Concentration at the top is structural, not a phase.",
        body: "Mega funds and mega rounds have taken a rising share of committed capital for a decade, through bull markets and bear ones alike. Any plan for the lower and mid-market that assumes a return to a flatter distribution is a plan built on a wish.",
      },
      {
        title: "Relationships are the settlement layer of private capital.",
        body: "No allocator has ever wired money because of a scoring model. They wire it because someone they trust brought the deal. What has changed is not the role of relationships but how systematically a firm can build, hold and deploy them.",
      },
      {
        title: "Access is infrastructure, not a rolodex.",
        body: "Treated as a contact list, a network is a depreciating asset — worth most on the first mandate and less on every one after it. Treated as infrastructure, it compounds. That distinction is the whole of how this firm is built.",
      },
    ] as Belief[],
  },

  // DRAFT
  layers: {
    eyebrow: "Where the gap sits",
    title: "Every raise runs on three layers of relationships",
    // DRAFT — the supporting line the site's section headers all carry.
    lede: "Most raises exhaust the first two and never reach the third. The third is where the capital actually is.",
    items: [
      {
        n: "01",
        title: "Your own network",
        body: "Family, friends, direct industry contacts. Where the first close comes from, and rarely any further.",
      },
      {
        n: "02",
        title: "The extended network",
        body: "Existing investors who re-up, and their referrals. Productive until the arithmetic asserts itself: a finite network cannot deliver an increasing amount of capital indefinitely.",
      },
      {
        n: "03",
        title: "The addressable universe",
        body: "Allocators who would fund the deal and will never encounter it, because nothing in the process was built to put it in front of them. This is the layer that has been growing while access to it has not.",
      },
    ] as Layer[],
    note: "Reaching the third layer predictably is the whole discipline.",
    cta: "How we do it",
  },
} as const;
