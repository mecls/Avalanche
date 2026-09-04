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
 * FUNDRAISING is fundraisr.ai/solutions, captured 4 Sep 2026, structure and
 * copy. Five steps, in their order, with their headings. It is genuine
 * published copy from a property we own, so it is NOT marked DRAFT.
 *
 * One change was made throughout, deliberately: the product name is removed.
 * The source says "Fundraisr's pre-marketing agent", "Fundraisr generates
 * personalised messaging", "Fundraisr doesn't just give you data". Naming the
 * sister platform on the Avalanche site is a positioning decision rather than
 * a neutral one — docs/COPY-REVIEW.md already flags the single existing
 * instance of it as needing sign-off — so these read as "our" and "we". No
 * claim changed; only the brand attached to it.
 *
 * SECONDARIES is PLACEHOLDER. Every block below is marked DRAFT and says so on
 * the page. Avalanche has published no secondaries process copy anywhere, and
 * inventing five steps for a live financial service would be fabricating a
 * capability. The real copy is coming; when it does, replace the bodies and
 * drop the `pending` flags. Do not "improve" these into something that reads
 * as final.
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
 * 01 — Fundraising. fundraisr.ai/solutions, five steps, verbatim but for the
 * de-branding described above.
 *
 * Every body here is real, published copy. NONE of these blocks is `pending`,
 * and as of 4 Sep 2026 all five have their own diagram — the four that were
 * showing the pending plate were drawn to finish the view. This side of
 * /solutions has no outstanding gap of either kind.
 */
export const fundraisingView: SolutionView = {
  eyebrow: "Solutions",
  title: "The full-stack fundraising platform.",
  lede: "We consolidate investor research, outreach, pipeline management, and meeting intelligence into one system — purpose-built for teams who treat fundraising as a disciplined operation, not a networking exercise.",
  cta: "Get started",
  blocks: [
    {
      n: "01",
      id: "pre-marketing",
      label: "Pre-marketing",
      title: "Deal packaging support.",
      body: "Our pre-marketing agent analyses your raise — structure, thesis, target profile — and ensures your marketing materials are appropriately positioned to resonate with your target investor profiles. The worst thing you can do is put the right deal in front of the right investor with a poorly positioned deal. Our agent ensures that's not the case.",
    },
    {
      n: "02",
      /** Anchor kept from the single-page era: /solutions#fundraising was a
       *  live deep link, and the nav pointed at it for a day. */
      id: "fundraising",
      label: "Investor sourcing",
      title: "1.2 million investors, one search away.",
      body: "Filter the entire private capital landscape by thesis, geography, cheque size, fund stage, sector focus, and recent deployment activity. We don't just give you data — you get ranked, contextualised profiles based on positive signals, so you spend time on conversations that move the needle.",
    },
    {
      n: "03",
      id: "engagement",
      label: "Personalised engagement",
      title: "Scalable outreach with a personal touch.",
      body: "Build multi-touch campaigns across email and LinkedIn that adapt to each investor's profile and behaviour. We generate personalised messaging, sequence follow-ups based on engagement signals, and keep every touchpoint compliant. One-to-many reach, without sacrificing personalisation.",
    },
    {
      n: "04",
      id: "pipeline",
      label: "Pipeline management",
      title: "From first touch to signed commitment. Every step, tracked.",
      body: "Manage your entire investor pipeline in a single view — who's been contacted, who's engaged, who's in diligence, and who's ready to commit. Built for placement teams managing multiple mandates and GPs who need to report progress to existing LPs.",
    },
    {
      n: "05",
      id: "meetings",
      label: "Meeting intelligence",
      title: "Know who you're speaking with, and why.",
      body: "We report who your next investor meeting is with and where synergies may lie, so you know how to best handle the conversation and which deal parameters matter most to that investor.",
    },
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
 * The five block titles are the SHAPE of a process, not claims about ours:
 * generic stage names any secondaries mandate would pass through. Each body is
 * a single placeholder line that says outright it is awaiting copy, so nobody
 * can mistake it for approved text and it cannot ship to production unnoticed.
 * Every block here is `pending`.
 *
 * Block 03 does get real artwork — the holders-to-counterparties diagram is
 * genuinely about counterparty search, and it was drawn for this service. Real
 * art beside placeholder copy is fine and deliberate; it shows the layout
 * working. The copy note below it still says the words are not final.
 */
export const secondariesView: SolutionView = {
  eyebrow: "Solutions",
  title: secondaries.title,
  // DRAFT — the existing secondaries lede, already flagged at its source.
  lede: secondaries.lede,
  cta: "Get started",
  blocks: [
    {
      n: "01",
      /** Anchor kept from the single-page era, as above. */
      id: "secondaries",
      label: "Position review",
      title: "Awaiting copy.",
      body: "Copy for this step has not been supplied yet. The stage names on this page describe the general shape of a secondaries mandate, not Avalanche's process — nothing here should be read as a claim about how we run one.",
      pending: true,
    },
    {
      n: "02",
      id: "valuation",
      label: "Pricing",
      title: "Awaiting copy.",
      body: "Copy for this step has not been supplied yet.",
      pending: true,
    },
    {
      n: "03",
      id: "counterparties",
      label: "Counterparties",
      title: "Awaiting copy.",
      body: "Copy for this step has not been supplied yet.",
      pending: true,
    },
    {
      n: "04",
      id: "process",
      label: "Process",
      title: "Awaiting copy.",
      body: "Copy for this step has not been supplied yet.",
      pending: true,
    },
    {
      n: "05",
      id: "close",
      label: "Close",
      title: "Awaiting copy.",
      body: "Copy for this step has not been supplied yet.",
      pending: true,
    },
  ],
};
