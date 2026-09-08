import { secondaries } from "@/content/copy";

/**
 * /solutions — TWO VIEWS behind a toggle, not one page with two blocks.
 *
 * The page used to be a single route carrying one Secondaries block and one
 * Fundraising block. On 4 Sep 2026 it became two routes, `/solutions/
 * fundraising` and `/solutions/secondaries`, each an independent copy of the
 * same layout.
 *
 * SWITCHING BETWEEN THEM IS THE NAV DROPDOWN'S JOB AND ONLY ITS JOB. There was
 * briefly a segmented toggle at the head of the page as well; it was removed
 * the same day as redundant — the dropdown under "Solutions" already lists
 * both, on every page rather than only on these two. One control, one place.
 * If a switcher is ever wanted back on the page, `git show 58684ea` has it.
 *
 * The views are still separate ROUTES rather than a client-side tab, and that
 * has not changed with the toggle going: `/solutions` is the one page on the
 * site with NO client components — its rail and text reveal are CSS
 * `view-timeline` — and a stateful tab would have made the whole page a client
 * component. Routes also keep both views deep-linkable, which the dropdown
 * depends on.
 *
 * `/solutions` itself redirects to `/solutions/fundraising` (next.config.ts).
 *
 * ---------------------------------------------------------------------------
 * PROVENANCE — read this before editing either block list.
 *
 * FUNDRAISING WAS fundraisr.ai/solutions, captured 4 Sep 2026 — five steps in
 * their order, with their headings, de-branded as described below. **It is
 * not any more.** On 9 Sep 2026 the header and the first three blocks were
 * replaced with supplied Avalanche copy and the last two were removed, so the
 * view is three steps of our own words. The de-branding note below is kept
 * because it is the reason the SECONDARIES scaffolding reads as it does, and
 * because `git log` still needs it to make sense of the old bodies.
 *
 * One change was made throughout the fundraisr copy, deliberately: the product
 * name was removed.
 * The source says "Fundraisr's pre-marketing agent", "Fundraisr generates
 * personalised messaging", "Fundraisr doesn't just give you data". Naming the
 * sister platform on the Avalanche site is a positioning decision rather than
 * a neutral one — docs/COPY-REVIEW.md already flags the single existing
 * instance of it as needing sign-off — so these read as "our" and "we". No
 * claim changed; only the brand attached to it.
 *
 * SECONDARIES WAS PLACEHOLDER and is not any more. Five blocks were marked
 * DRAFT and said so on the page, because Avalanche had published no
 * secondaries copy anywhere and inventing five steps for a live financial
 * service would have been fabricating a capability. On 9 Sep 2026 the heading,
 * the lede and two blocks arrived as supplied copy and the other three were
 * removed. Nothing on either view is placeholder now.
 *
 * The instruction the old note carried still stands for whatever comes next:
 * do not "improve" a placeholder into something that reads as final. Mark it
 * `pending` and let it say so on the page.
 * ---------------------------------------------------------------------------
 */

export type SolutionBlock = {
  n: string;
  id: string;
  label: string;
  title: string;
  body: string;
  /**
   * The COPY on this block is placeholder and must not ship as final. It
   * renders a visible note saying so. Drop it when real copy arrives.
   *
   * This says nothing about artwork. Whether a block gets a diagram or the
   * pending plate is decided solely by the MEDIA map in
   * components/sections/solutions-steps.tsx, keyed on `id` — a block can have
   * real copy and no diagram, or real art and placeholder copy (Secondaries
   * 03). Two different gaps, tracked in two different places, so closing
   * one does not silently claim the other is closed.
   */
  pending?: boolean;
};

/**
 * One view's worth of page.
 *
 * Annotated explicitly rather than inferred with `as const`, and that is
 * load-bearing: under `as const` each block literal narrows to its own exact
 * shape, so a block without `pending` has no such property at all and the
 * union of five of them cannot be read for it. `block.pending` stops
 * compiling. The annotation widens every block to the same optional-carrying
 * type, which is what the renderer needs.
 */
export type SolutionView = {
  eyebrow: string;
  title: string;
  lede: string;
  cta: string;
  blocks: SolutionBlock[];
};

/**
 * 01 — Fundraising. THREE steps, and it is no longer fundraisr's page.
 *
 * It was five, lifted from fundraisr.ai/solutions with the brand filed off.
 * On 9 Sep 2026 the header and blocks 01-03 were replaced with supplied copy
 * and blocks 04-05 were removed, which leaves an advisory process in three
 * moves — get ready, get introduced, get closed — rather than a five-feature
 * product tour. Nothing here is fundraisr's copy any more; the de-branding
 * note in the file header now applies to the SECONDARIES placeholders only.
 *
 * NONE of these blocks is `pending` and all three have their own diagram, so
 * this side of /solutions still has no outstanding gap of either kind. Two of
 * the three diagrams MOVED with the copy rather than staying put — see the
 * notes on blocks 01 and 03. That is the rule working, not churn: a picture
 * that keeps labels its own copy has stopped using is the failure mode the
 * MEDIA map exists to prevent.
 */
export const fundraisingView: SolutionView = {
  eyebrow: "Solutions",
  // SUPPLIED 9 Sep 2026, replacing fundraisr.ai's own header. The page used to
  // open "The full-stack fundraising platform." over a lede about consolidating
  // research, outreach, pipeline and meeting intelligence "into one system" —
  // which described a PRODUCT. This is an advisory firm, and the new pair says
  // approach and segment rather than software and features. The de-branding
  // note above still applies to the five blocks; the header is no longer
  // fundraisr's copy at all.
  title: "A Definitive Solution For Fundraising",
  lede: "Our validated approach for raising capital has been specifically tailored for our segment of the market, and the types of clients we serve.",
  cta: "Get started",
  blocks: [
    {
      n: "01",
      /** The id is the MEDIA key and the anchor, so it is NOT renamed with the
       *  label — same reason block 02 still says "fundraising". */
      id: "pre-marketing",
      // SUPPLIED 9 Sep 2026, all three lines. The old body described "our
      // pre-marketing agent" analysing the raise, which was fundraisr product
      // copy with the brand filed off; this is the firm doing the work.
      //
      // THE BODY IS NOT NEW COPY. It is byte-identical to
      // `fundraising.steps[0].body` in content/copy.ts — the unmounted
      // three-step process lifted from avalanche-capital.com — so it is
      // PUBLISHED Avalanche copy, not something drafted, and the title
      // follows that object's "Solving For ..." pattern too. One sentence in
      // two files can drift; see the note over `fundraising` there. The
      // DIAGRAM MOVED WITH IT — its three input chips were the old body's
      // "structure, thesis, target profile" and are now the new body's
      // dataroom, decks and supporting documentation. A picture that names
      // three things its copy no longer mentions is exactly what the "do not
      // reuse a diagram" rule is about.
      label: "Deal-readiness",
      title: "Solving for deal readiness",
      body: "Before a conversation starts, your materials need to meet the market where it is. We benchmark your dataroom, pitch decks, and supporting documentation against comparable raises we've conducted - ensuring every opportunity we take to market is structured for the highest likelihood of success.",
    },
    {
      n: "02",
      /** Anchor kept from the single-page era: /solutions#fundraising was a
       *  live deep link, and the nav pointed at it for a day. */
      id: "fundraising",
      // SUPPLIED 9 Sep 2026. This retires the "1.2 million investors" headline,
      // which was a platform-database claim and one of the figures
      // docs/COPY-REVIEW.md had flagged as unverified — see the remaining
      // citations listed there. The diagram beside it still describes the new
      // body: it draws a mandate filter selecting investors out of a universe,
      // which is "identify the LPs and investors whose mandates align with your
      // deal parameters" exactly.
      label: "Investor introductions",
      title: "Solving for LP capital & growth capital.",
      body: "Whether you're a GP raising a fund or a founder raising growth capital, the right introductions make the difference. We craft credible narratives, identify the LPs and investors whose mandates align with your deal parameters. With established networks across the US, Europe, and the Middle East, and the capability to source beyond them, we make sure every fund and every company we work with gets in front of the right capital, with a heavy emphasis on introductions to investors who bring more to the table than just a cheque.",
    },
    {
      n: "03",
      /**
       * RENAMED FROM "engagement" on 9 Sep 2026 with the copy. The two ids
       * that keep a name they have outgrown — "fundraising" here and
       * "secondaries" below — do so because they were live deep links from
       * the single-page era; this one never was, so it says what the block
       * says. It is the MEDIA key as well as the anchor, so renaming it means
       * renaming it in solutions-steps.tsx too, which is where its diagram
       * moved in the same change.
       */
      id: "closure",
      // SUPPLIED 9 Sep 2026, replacing "Personalised engagement / Scalable
      // outreach with a personal touch." — a body about multi-touch email and
      // LinkedIn campaigns, which was fundraisr platform copy de-branded.
      // THE DIAGRAM CHANGED WITH IT and this is the important half: the
      // outreach-sequence picture that used to sit here draws follow-ups
      // branching on an engagement signal, which is not term sheets, not a
      // dataroom and not a signed commitment. The four-stage progression that
      // was block 04's took its place — Contacted, Engaged, Diligence,
      // Committed, with only the committed column accented — because that IS
      // this block's claim. See solutions-steps.tsx.
      label: "Deal closure",
      title: "Solving for deal closure",
      body: "We stay in the room through term sheet negotiations, dataroom reviews, and every step in between, until there's a signed commitment, ensuring momentum is kept throughout the entirety of the raise.",
    },
    /**
     * BLOCKS 04 AND 05 WERE REMOVED ON 9 Sep 2026, by request. They were
     * "Pipeline management / From first touch to signed commitment. Every
     * step, tracked." and "Meeting intelligence / Know who you're speaking
     * with, and why." — the last two fundraisr platform steps, and the two
     * that read most like software features on a page that now describes an
     * advisory process in three moves: get ready, get introduced, get closed.
     *
     * Their artwork was NOT deleted. `PipelineDiagram` moved up to block 03,
     * where it is a better fit than it ever was here, and `MeetingDiagram` is
     * kept unrendered in solutions-media.tsx. `git log -S "Meeting
     * intelligence"` has the bodies if either step comes back.
     */
  ],
};

/**
 * 02 — Secondaries. AWAITING COPY.
 *
 * The heading and lede are the two strings that already exist for this service
 * (`secondaries.title` / `secondaries.lede` in copy.ts, itself DRAFT), so the
 * page is not empty and the toggle has somewhere real to land. Everything
 * below them is scaffolding.
 *
 * **IT IS TWO BLOCKS OF SUPPLIED COPY AS OF 9 Sep 2026, AND NOTHING HERE IS
 * PLACEHOLDER ANY MORE.** Buy-side advisory and Sell-side advisory, with a
 * diagram each. The three generic stage names that used to follow them —
 * "Counterparties", "Process", "Close" — were removed by request rather than
 * filled in, because 01 and 02 are two SIDES of a trade and those three were
 * STAGES of one mandate: the page was describing itself two ways at once.
 *
 * So NO block on either view carries `pending` now. The flag, the visible
 * "awaiting approved copy" note and `PendingPlate` all remain wired up and
 * unused, which is correct — they are the mechanism for the next block that
 * arrives without copy or artwork, and the whole point of them is that such a
 * block cannot ship silently.
 */
export const secondariesView: SolutionView = {
  eyebrow: "Solutions",
  title: secondaries.title,
  // DRAFT — the existing secondaries lede, already flagged at its source.
  lede: secondaries.lede,
  cta: "Get started",
  blocks: [
    /**
     * 01 AND 02 ARE REAL AS OF 9 Sep 2026, and they changed what this page IS.
     *
     * They were "Position review" and "Pricing" — two stages of one mandate,
     * placeholder names for the general shape of a secondaries process. The
     * supplied copy replaced them with the TWO SIDES OF THE TRADE, buy and
     * sell, which are not stages of anything: a buyer does not go on to become
     * a seller. That is the same reading the original two-block /solutions had
     * of Fundraising and Secondaries, and the note in copy.ts explains why the
     * rail still numbers parallel offerings — the number is position, not
     * sequence.
     *
     * **BLOCKS 03-05 WERE REMOVED THE SAME DAY, by request, and that is what
     * settles the shape.** "Counterparties", "Process" and "Close" were
     * placeholder STAGES sitting under two real SERVICES, so the page
     * described itself two ways at once. Dropping them is the same answer
     * Fundraising gave when its last two blocks came off: the view is what has
     * copy, not a fixed number of slots. `git log -S "id: \"counterparties\""`
     * has the three if a process view is ever wanted back.
     *
     * `title` is the supplied phrase and `label` is that phrase minus the word
     * "advisory", so the small label and the display heading say the same
     * thing at two sizes — the pattern blocks 01-03 of Fundraising already
     * use. Neither is invented; there is no third string here that nobody
     * supplied.
     */
    {
      n: "01",
      /** Anchor kept from the single-page era, as above. It no longer matches
       *  the block's own name, which is the same trade `fundraising` makes on
       *  the other view: a live deep link outranks a tidy id. */
      id: "secondaries",
      label: "Buy-side",
      title: "Buy-side advisory",
      body: "For investors seeking exposure to late-stage private companies ahead of a listing, we provide curated access to verified secondary opportunities. We source and vet positions across our network, handle counterparty identification, and support pricing and structuring so buyers get clean exposure without doing the legwork of finding a credible seller themselves.",
    },
    {
      n: "02",
      /** RENAMED from "valuation" with the copy — it was never a deep link,
       *  unlike the id above, so it says what the block says. It is the MEDIA
       *  key too; see solutions-steps.tsx. */
      id: "sell-side",
      label: "Sell-side",
      title: "Sell-side advisory",
      body: "For shareholders and founders looking to generate liquidity ahead of an IPO, we advise on pricing and structuring and run a discreet process to identify the right buyer. We manage the transaction end-to-end, from sourcing buyers, all the way through negotiations and closing.",
    },
  ],
};
