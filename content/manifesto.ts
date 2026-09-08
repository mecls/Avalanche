/**
 * The manifesto - what the firm believes about the market it operates in.
 *
 * IT IS NO LONGER ITS OWN ROUTE. It was `/manifesto` until 7 Sep 2026 and is
 * now the middle of `/about`, between the thesis and the team. The page-level
 * copy that used to live here - the label, the H1's authored lines, the lede
 * and the header CTA - moved to `content/about.ts` with it; what is left is
 * the three blocks themselves, which is all this file was ever really about.
 *
 * MOST OF THIS FILE IS DRAFT, BUT NOT ALL OF IT ANY MORE. What is marked
 * `// DRAFT` was written against a thesis document supplied on 5 Sep 2026 and
 * condensed here, was never lifted from an Avalanche property, and needs the
 * same sign-off pass as the team bios and the FAQ answers. The three blocks
 * added to `layers` on 8 Sep 2026 - the mandate paragraph, the four "why this
 * segment" reasons and the rewritten closing note - were SUPPLIED verbatim
 * and are rendered verbatim, so they carry no DRAFT marker.
 *
 * **THE TITLE CASE IN `aside.reasons` IS THE SUPPLIED CASE AND IS DELIBERATE**
 * (confirmed 8 Sep 2026, after being recased once and put back). Every other
 * heading on this site is sentence case - the beliefs, the layers, the section
 * titles - so these five are the exception, not a slip. Do not "fix" them, and
 * do not recase the rest of the file to match them either.
 *
 * THERE IS NOW EXACTLY ONE FIGURE ON THIS PAGE, AND IT ARRIVED WITH THAT COPY.
 *
 * Reason 03 says "more than seventy mandates". It is the first number this
 * page has ever carried and it was supplied rather than drafted, which is the
 * only reason it is here - see the paragraph below for why nothing else is.
 * **It needs reconciling with `trackRecord.stats` before sign-off**: that band
 * says "30+ active mandates worldwide" and renders on the homepage and
 * /customers. Active and cumulative are not the same count, so the two can
 * both be true, but they are two mandate numbers on one site and a reader
 * will read them against each other.
 *
 * The source document carried roughly twenty cited statistics - listed-company
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
 * both diagrams are shape-only. Apart from the supplied mandate count, nothing
 * on this page can be factually wrong - and that is still the rule for
 * anything added here. Do not follow the one exception with drafted ones.
 *
 * If you want the data version, that is a different page and it needs a
 * sourcing pass first.
 */

export type Belief = {
  /** The position, stated flat. Kept short - it sets at 28px and wants to
   *  land in two lines, not five. */
  title: string;
  body: string;
};

export type Layer = {
  n: string;
  title: string;
  body: string;
  /**
   * Copy for the PICTURE on this layer's panel, which on panels 01 and 02 is
   * not a picture of the layer at all - the threshold diagram is about which
   * issuers sit inside the segment, the both-sides diagram about the same
   * counterparties returning. See `LAYER_MEDIA` in `app/about/page.tsx`.
   *
   * IT REPLACED THE `Figure` CAPTIONS those two panels used to carry. The
   * captions existed only because the pictures had no words of their own;
   * running both would state the same claim twice on one screen. Panel 03
   * never had one, because the rings ARE layer three and `layers.note` is
   * already its claim.
   */
  aside?: LayerAside;
};

/** One panel's picture copy: a paragraph, or a titled numbered list. */
export type LayerAside = {
  note?: string;
  title?: string;
  reasons?: Reason[];
};

export type Reason = {
  /** Set in `page-label`, so it reads as an ordinal rather than a figure. */
  n: string;
  /**
   * Set in TITLE CASE, unlike every other title in this file - that is the
   * supplied copy and it was asked for specifically. See the file header.
   */
  title: string;
  body: string;
};

export const manifesto = {
  // DRAFT
  divergence: {
    eyebrow: "The divergence",
    title: "Two forces, moving apart",
    body: [
      "The pool of capital is widening. Alternatives keep compounding, and the number of people who can commit without a committee - family offices above all - keeps growing.",
      "The routes that reach them are narrowing. Distribution has consolidated into fewer, larger intermediaries serving fewer, larger issuers. Supply of capital and access to capital have decoupled.",
    ],
    note: "The space between those two lines is the whole reason this firm exists.",
  },

  // DRAFT
  beliefs: {
    eyebrow: "What we believe",
    title: "Five positions we build on",
    // DRAFT - the supporting line the site's section headers all carry.
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
        body: "Treated as a contact list, a network is a depreciating asset - worth most on the first mandate and less on every one after it. Treated as infrastructure, it compounds. That distinction is the whole of how this firm is built.",
      },
    ] as Belief[],
  },

  // DRAFT
  layers: {
    eyebrow: "Where the gap sits",
    title: "Every raise runs on three layers of relationships",
    // DRAFT - the supporting line the site's section headers all carry.
    lede: "Most raises exhaust the first two and never reach the third. The third is where the capital actually is.",
    items: [
      {
        n: "01",
        title: "Your own network",
        body: "Family, friends, direct industry contacts. Where the first close comes from, and rarely any further.",
        // SUPPLIED 8 Sep 2026, not drafted. It is the words for this panel's
        // picture - the threshold diagram - and it names the mandate the
        // diagram draws, which is why it is a paragraph rather than a caption.
        aside: {
          note: "We serve emerging fund managers from Fund I to Fund IV, and companies from Seed to Series D. Past that threshold, capital tends to find the issuer. Before it, nothing about track record, traction or networking guarantees the outcome, and most founders and GPs in this bracket are still doing the work of finding capital themselves.",
        },
      },
      {
        n: "02",
        title: "The extended network",
        body: "Existing investors who re-up, and their referrals. Productive until the arithmetic asserts itself: a finite network cannot deliver an increasing amount of capital indefinitely.",
        // SUPPLIED 8 Sep 2026, not drafted. Four reasons, and the FOURTH is
        // the one this panel's picture draws - the both-sides flow. The other
        // three are the argument that arrives at it, so the order is load-
        // bearing: do not sort or trim them.
        aside: {
          title: "Why This Segment, Deliberately",
          reasons: [
            {
              n: "01",
              title: "It Is The Segment The Market Structurally Ignores",
              body: "Concentration at the top is not a temporary cycle. Everyone below the mega-fund tier competes for a shrinking share of visible attention, which is precisely where an access layer produces the most value per unit of effort.",
            },
            {
              n: "02",
              title: "It Is The Segment No Existing Solution Was Designed For",
              body: "Placement firms and investment banks hold institutional networks assembled for established funds and mature issuers writing multi eight-figure cheques. That network was priced and built for a different part of the market, and it does not translate down.",
            },
            {
              // THE ONE FIGURE ON THIS PAGE - "more than seventy mandates".
              // Supplied, not drafted, and flagged at the top of this file:
              // it needs reconciling with `trackRecord.stats`, which says
              // "30+ active mandates worldwide" on two other routes.
              n: "03",
              title: "It Is The Segment Whose Operating Reality We Know",
              body: "Across more than seventy mandates in venture, private equity, private credit and real estate, we settled here on purpose. We understand the pace, the missing internal resources and the level of support this bracket actually requires.",
            },
            {
              n: "04",
              title: "Both Sides Of The Table Compound Each Other",
              body: "Serving funds and companies at the same stage of maturity is not divided focus. The GPs we raise for become allocators we can introduce, and the companies we raise for become the dealflow those GPs want to see. Every mandate deepens the network the next one draws on.",
            },
          ],
        },
      },
      {
        n: "03",
        title: "The addressable universe",
        body: "Allocators who would fund the deal and will never encounter it, because nothing in the process was built to put it in front of them. This is the layer that has been growing while access to it has not.",
      },
    ] as Layer[],
    /**
     * Panel 03's own claim, and the section's closing line. SUPPLIED 8 Sep
     * 2026: it absorbs the sentence that used to be the whole of this string
     * ("reaching it predictably is the whole discipline") and puts the
     * argument in front of it. Panel 03 is the only one without an `aside`
     * because this is it - the rings ARE layer three, so the copy beside them
     * is already about the picture.
     */
    note: "No issuer accesses infinite capital through a finite network. Each available route either works the first two layers harder or automates the same push. The third layer is where the widening capital pool actually sits, and reaching it predictably is the whole discipline.",
    cta: "How we do it",
  },
} as const;
