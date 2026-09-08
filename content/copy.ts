/**
 * Site copy, lifted from Avalanche's own properties:
 *   avalanche-capital.com  - hero, thesis pillars, investor verticals, track record
 *   fundraisr.ai           - customers page, stats band
 *   fundraisr.co           - implementation programme figures
 *
 * Blocks marked `DRAFT` were written here, not lifted. The source panels sit
 * inside a Framer carousel on avalanche-capital.com whose body text is not in
 * the page at all - verified by reading the raw HTML, not just by clicking. So
 * they were extrapolated from Avalanche's own published writing (the
 * /blog posts) and from the panels that DO exist. Every one is listed in
 * docs/COPY-REVIEW.md for sign-off. They make no claim the site does not
 * already make elsewhere.
 */

export const site = {
  name: "Avalanche Capital",
  tagline: "Private capital advisory with an edge",
  description:
    "Private capital advisory for funds, founders, and operating companies. Exposure to the right capital sources, the right mandates, and the right counterparties.",
  // NOTE: both Calendly links on avalanche-capital.com and fundraisr.co are
  // dead ("This Calendly URL is not valid"). This is the only live event on the
  // avalancheintrocall account - "Capital Raise | Strategy Call".
  // TODO(miguel): the slug reads like a duplicate; confirm it is the one to use.
  calendly:
    "https://calendly.com/avalancheintrocall/capital-raise-demo-call-ac-clone",
  /**
   * PLACEHOLDER - where the "Book a meeting" button sends people.
   *
   * Points at the Fundraisr booking page, which is live and yours, so the
   * button works today. It runs on LeadConnector (GoHighLevel), not Calendly.
   * Swap this one string when the real calendar link arrives; nothing else
   * needs to change. If the new one is embeddable, see the note at the top of
   * components/sections/booking.tsx.
   */
  booking: "https://www.fundraisr.ai/book-demo",
  entity: "Avalanche Capital LDA (PT 517584271)",
  /** The only public contact channel this repo has. There is no email address
   *  and no phone number anywhere in it - /get-in-touch offers this and the
   *  form, and nothing else, until real ones arrive. */
  linkedin: "https://www.linkedin.com/company/avalanche-capital-advisory",
  /** The header's ghost button. Short by necessity - it sits in a 47.2px
   *  glass rectangle beside the nav pills. */
  navCta: "Get in touch",
  /**
   * The header's client-portal control, left of the ghost button.
   *
   * **IT IS NOT A LINK AND HAS NO DESTINATION.** There is no portal and no URL
   * for one, so `nav.tsx` renders an `aria-disabled` `<button>` rather than an
   * `<a>` - see the comment there. This is the label and nothing else; there
   * is deliberately no `loginHref` beside it, because an empty or placeholder
   * href is exactly the thing that gets shipped by accident.
   *
   * It lives HERE and not in the `nav` array below, for the same reason
   * `navCta` does: that array feeds the header's centre pills and the footer's
   * Overview column, and this belongs in neither.
   *
   * "Log in" (two words, verb) rather than "Login" (one word, noun): the noun
   * is the name of the thing, the verb is what the control will do.
   */
  navLogin: "Log in",
} as const;

/**
 * NOT CURRENTLY RENDERED. Kept, like the other unmounted blocks.
 *
 * This was the fixed bar above the nav - a live-dot, the line below in italic,
 * and an underlined accent link to the booking anchor. It was removed on
 * 4 Sep 2026; `components/site/nav.tsx` is now the nav alone and nothing on
 * the site is `fixed`.
 *
 * The copy itself is still good if the bar ever comes back: it is deliberately
 * a claim about availability rather than about results, so nothing here is a
 * figure and nothing here needs sourcing.
 */
export const announce = {
  text: "Advising funds, founders, and operating companies · Intro call available",
  linkLabel: "Get in touch",
} as const;

/**
 * The site's routes, in one list, feeding BOTH the header and the footer.
 *
 * The header renders it and so does the footer's Overview column, from this
 * one array. A route missing from here is a route nothing on the site links
 * to.
 *
 * THERE IS NO LONGER A `footerOnly` FLAG. /manifesto carried one - it was
 * real and indexed but not one of the header's primary slots, so it showed in
 * the footer and nowhere else, and `nav.tsx` derived a filtered `headerNav`
 * from this array to do it. That route was folded into /about on 7 Sep 2026
 * and took its only user with it, so the flag and the filter went too rather
 * than sitting here as a mechanism with nothing behind it. `git show` this
 * file's history if a footer-only route is ever wanted again; it was six
 * lines.
 *
 * `menu` gives an item a hover/focus dropdown in the desktop nav and an inline
 * sub-list in the mobile sheet. Only Solutions has one.
 *
 * It points at the two REAL ROUTES, not at anchors. The first version of this
 * menu (3 Sep 2026) linked to /solutions#secondaries and /solutions#fundraising
 * because both were sections of one page; they are separate routes now, so the
 * entries resolve to whole pages and the parent link redirects to the first of
 * them.
 *
 * THIS IS NOW THE ONLY WAY TO SWITCH VIEWS. An on-page segmented toggle did
 * the same job for part of 4 Sep 2026 and was removed as redundant, so this
 * list is no longer one of two places the pair is written down - it is the
 * only one. Adding a third view means adding a route, a content object in
 * content/solutions.ts, and an entry here.
 */
export const nav = [
  {
    href: "/solutions",
    label: "Solutions",
    menu: [
      {
        href: "/solutions/fundraising",
        label: "Fundraising",
        // DRAFT
        blurb: "Primary raises run end to end, from readiness to term sheet.",
      },
      {
        href: "/solutions/secondaries",
        label: "Secondaries",
        // DRAFT
        blurb: "Liquidity for GPs, LPs, and shareholders ahead of a full exit.",
      },
    ],
  },
  { href: "/customers", label: "Customers" },
  /**
   * ONE ENTRY, THREE PAGES' WORTH OF CONTENT. /about is the old /team and the
   * old /manifesto merged (7 Sep 2026): the thesis, then the manifesto, then
   * the portraits and the press. Both old paths 307 here - see next.config.ts.
   *
   * The label is "About Us" rather than "About" because that is what was
   * asked for, and it is the only two-word item in the header; it costs about
   * 30px against the `md` breakpoint's budget, which the measurement below
   * covers.
   */
  { href: "/about", label: "About Us" },
] as const;

export const hero = {
  eyebrow: "Private capital advisory",
  /** Kept for metadata and for anything that needs the headline as one
   *  string. What the hero RENDERS is `titleLines` below. */
  title: "Private capital advisory with an edge",
  /**
   * The headline breaks on AUTHORED lines, not on wrapping. That is an
   * editorial decision, so the break lives here rather than as a <br> buried
   * in the component.
   *
   * `lead` USED TO BE SET IN ITALIC and no longer is - the site moved to
   * Satoshi on 4 Sep 2026 and this build of it has no italic face, so an <em>
   * would be a fake slant on the biggest type on the site. The split is kept
   * because it is still where the line breaks; the two halves just render
   * identically now. `rest` carries its own leading space.
   *
   * Re-balancing the
   * lines means editing these two entries - do not add a third without
   * checking the 80px size still holds two lines' worth of measure.
   */
  titleLines: [
    { lead: "Private", rest: " capital" },
    { lead: "advisory", rest: " with an edge" },
  ],
  // the word that would carry the accent. Still ignored - see section-heading.
  accent: "edge",
  lede: "Our unique edge is exposure - to the right capital sources, the right mandates, and the right counterparties.",
  cta: "Get started",
  /**
   * NOT RENDERED IN THE HERO. The reference pairs this line with its
   * mid-page CTA blocks, not with the hero button, so the hero CTA now
   * stands alone. `trackRecord.ctaNote` carries the same line where it is
   * still shown; this is kept because the two could diverge.
   */
  ctaNote: "Intro call · ~30 min · No commitment required",
  /**
   * Opens the hero's logo band, in a fixed 231px column.
   *
   * DELIBERATELY NOT the reference's "Representative investors & strategic
   * partners". That strip carries CLIENT marks - `customers.logoNote` states
   * they are past engagements - and calling past clients investors or
   * partners would be a claim the site cannot support. Same shape, accurate
   * words. See docs/COPY-REVIEW.md.
   */
  stripLabel: "Representative clients & engagements",
  // Sits at the right of the hero's content row, bottom-aligned with the CTA.
  stat: {
    value: "$2B+",
    label: "in active mandates partners brought in for our clients",
  },
} as const;

/** NOT CURRENTLY RENDERED - the "Why Avalanche" section was removed from the
 *  homepage on 1 Sep 2026. Kept because this is genuine copy from
 *  avalanche-capital.com. See components/sections/thesis.tsx. */
export const thesis = {
  eyebrow: "Thesis",
  title: "Why Avalanche",
  accent: "Avalanche",
  lede: "Across venture and private equity, we connect clients to what they're looking for: whether that's capital, deal flow, or secondary liquidity. Precisely, discreetly, and at pace.",
  pillars: [
    {
      title: "Global Network",
      icon: "network",
      body: "Direct relationships with LPs, family offices, and institutional investors across the US, Europe, and the Middle East - and the reach to go beyond them when the mandate demands it.",
    },
    {
      title: "Both Sides of The Table",
      icon: "bothSides",
      body: "Our team has operated as investors and as operators - which means we understand what capital allocators need to see, and how to position an opportunity that gets funded.",
    },
    {
      title: "Precision & Execution",
      icon: "precision",
      body: "We don't approach the market broadly. Every mandate is matched against a curated set of investors whose criteria, geography, and appetite align - minimising meaningless conversations.",
    },
  ],
} as const;

export const whoWeServe = {
  eyebrow: "Who we serve",
  title: "Investor Types We Work With",
  accent: "Work With",
  /**
   * SUPPLIED 8 Sep 2026, and it no longer describes CLIENTS.
   *
   * The old line ("We are used by placement agents, boutique investment
   * banks...") named who hires Avalanche; this one names the investor types
   * the block below actually lists, which is what a lede over a list of
   * investor types should do. That is also why it stopped being shared:
   * /customers ran it beside "Trusted by" and a grid of CLIENT logos, where
   * an investor-side sentence reads as a caption for the wrong pictures. The
   * old wording is kept intact as `customers.trustedByBody` and still runs
   * there. Do not re-point that page back at this key.
   */
  lede: "We operate across the entire spectrum of investor types and profiles which are suitable for the lower/mid-market venture ecosystem.",
  verticals: [
    {
      // SUPPLIED 8 Sep 2026 - replaced the lifted avalanche-capital.com body,
      // which named banks, insurance firms and pension funds. This one names
      // the vehicles that actually appear in a venture cap table.
      title: "Institutional Investors",
      body: "Sophisticated entities such as VCs, Funds of Funds, Sovereigns and Asset Managers, characterised by their substantial capital base and rigorous investment protocols. Institutional investors typically prioritise stable, long-term returns and typically engage in diversified investment portfolios.",
    },
    {
      // SUPPLIED 8 Sep 2026. It replaced "Accredited Retail", a DRAFT block -
      // the slot is a different investor type now, not a rewrite of that one,
      // so the accreditation caveat in docs/COPY-REVIEW.md went with it.
      title: "Family Offices",
      body: "Patient capital with a multi-generational mandate, often willing to move faster and more flexibly than institutions on deals that fit the family's thesis. They still expect the same rigor on structuring and terms, but decisions run through fewer hands and less committee process.",
    },
    {
      // DRAFT
      title: "High Net Worth Individuals (HNWI) / Angels",
      body: "Principals, founders, and operators deploying personal capital, often into sectors they have worked in themselves. Decisions are relationship-led and conviction-led rather than committee-led, and they frequently bring operating insight and onward introductions alongside the cheque.",
    },
  ],
} as const;

export const trackRecord = {
  eyebrow: "Track record",
  title: "Proven Track Record",
  accent: "Track Record",
  lede: "Quantitative metrics showing consistent success and impact across venture, private credit, real estate, and private equity.",
  /**
   * SUPPLIED 8 Sep 2026, and these are AVALANCHE'S OWN figures now.
   *
   * They used to be the stats band from fundraisr.ai, which is why one of
   * them credited the platform rather than the firm ("Capital raising powered
   * by Fundraisr") and another counted the platform's database ("1.2M+ active
   * investor profiles"). The database card was dropped outright and the rest
   * restated as the advisory's own numbers, so every figure in this block is
   * now the same kind of claim. **They are load-bearing financial claims -
   * do not adjust one to make a layout work.**
   *
   * THERE ARE FOUR OF THEM AND THE GRID IS TUNED TO FOUR. Dropping the fifth
   * changed the row shape; see the span comment in
   * components/sections/track-record.tsx before adding or removing one.
   *
   * `to` drives the count-up and `prefix`/`suffix` frame it, so the displayed
   * string is `prefix + to + suffix`. Values under 10 skip the count entirely
   * (a 0 → 2 tick reads as broken, not impressive). `decimals` is 0 on all
   * four now - it existed for the 1.2M+ card and is kept because the next
   * supplied figure may need it again.
   */
  stats: [
    {
      prefix: "",
      to: 25,
      suffix: "+",
      decimals: 0,
      label: "Active mandates worldwide",
    },
    {
      prefix: "$",
      to: 650,
      suffix: "M+",
      decimals: 0,
      label: "Active dealbook",
    },
    {
      prefix: "",
      to: 850,
      suffix: "+",
      decimals: 0,
      label: "Qualified investor introductions made",
    },
    {
      prefix: "<",
      to: 14,
      suffix: " days",
      decimals: 0,
      label: "Average time to first investor meeting",
    },
  ],
  cta: "Get started",
  ctaNote: "Intro call · ~30 min · No commitment required",
} as const;

export const offerings = {
  eyebrow: "Offerings",
  title: "Dive Deeper Into Our Offerings",
  accent: "Offerings",
  items: [
    {
      n: "01",
      title: "Deal Readiness",
      body: "Before a conversation starts, your materials need to meet the market where it is. We benchmark your dataroom, pitch decks, and supporting documentation against comparable raises we've conducted - ensuring every opportunity we take to market is structured for the highest likelihood of success.",
    },
    {
      n: "02",
      // DRAFT
      title: "LP Capital",
      body: "For managers raising a fund, the work is matching strategy, track record, and terms to the LPs whose mandate actually fits. We position the fund against the variables allocators screen on - strategy, team, size, focus, fee structure, minimum commitment - and take it to institutions, family offices, and private allocators already active in that shape of deal.",
    },
    {
      n: "03",
      // DRAFT
      title: "Growth Capital",
      body: "Primary capital for operating companies and funds with a raise in front of them. We work the round end to end: positioning the opportunity, building the mandate-specific investor list, running the outreach, and holding the process together through diligence to a signed term sheet.",
    },
  ],
} as const;

/**
 * The Secondaries solution page. Deliberately thin - "Secondary Liquidity"
 * below is the only copy Avalanche has ever published specifically about
 * secondaries (it used to be offering 04, folded into the Process page). It
 * is reused verbatim here rather than padded out with invented material. See
 * docs/COPY-REVIEW.md.
 */
/**
 * The logo band at the foot of /solutions/secondaries. SUPPLIED 9 Sep 2026.
 *
 * **THE MARKS ARE A CLAIM, and a sharper one than the client roster's.** The
 * strips on the homepage and /customers say "these firms hired us", and
 * `customers.logoNote` says so in words. This one says we currently hold
 * access to secondary opportunities in these named, listed-adjacent companies
 * - a statement about live inventory rather than about past work. The body
 * below is the disclaimer that makes it survivable: it says "a selection",
 * says the list is not exhaustive, and points a reader with a specific request
 * at the team rather than at the grid. **Do not drop that paragraph and keep
 * the logos**, and see docs/COPY-REVIEW.md, which flags the whole band for
 * sign-off.
 *
 * The heading ends in a colon on purpose - it runs INTO the grid rather than
 * standing over it, which is why the body sits beside it rather than beneath.
 */
export const directAccess = {
  eyebrow: "Direct Access",
  title: "We provide direct access to:",
  body: "A selection of the companies in which we currently hold direct access to secondary opportunities. This list is not exhaustive - buyers and sellers with specific requests are welcome to contact our team to discuss further.",
} as const;

export const secondaries = {
  eyebrow: "Secondaries",
  title: "Secondary Liquidity",
  /**
   * SUPPLIED 9 Sep 2026, and it is no longer DRAFT - this is the first real
   * copy this service has had anywhere. The drafted line it replaces read
   * "Not every position should be held to the end of the fund's life. We work
   * with GPs, LPs, and shareholders seeking liquidity ahead of a full exit -
   * sourcing counterparties, framing the position for them, and running the
   * process discreetly."
   *
   * Note what CHANGED and not just that it did, because it is a different
   * service description rather than a rewrite of the same one. The draft
   * described GPs and LPs selling fund positions; this describes PRE-IPO
   * secondaries in operating companies - shareholders and founders on one
   * side, and buyers wanting late-stage exposure ahead of a listing on the
   * other. **The five placeholder BLOCKS below it in content/solutions.ts
   * still describe the draft's version**: "Position review", "Pricing",
   * "Counterparties", and the counterparty diagram drawn for them. They are
   * marked `pending` and say so on the page, so nothing false ships, but the
   * page's heading and its steps now describe two different trades - that is
   * the gap to close when the block copy arrives.
   */
  lede: "We advise shareholders, founders, and buyers navigating pre-IPO secondary transactions - from pricing and structuring to counterparty identification. For investors seeking exposure to late-stage private companies ahead of a listing, we provide curated access to verified secondary opportunities.",
} as const;

/**
 * NOT CURRENTLY RENDERED, and `steps[0]` IS NOW LIVE ANYWAY - read this before
 * editing either copy of it.
 *
 * The three-step fundraising process - Deal Readiness, Investor Segment,
 * Conversion - had its own page until /solutions was cut back on 4 Sep 2026.
 * Kept because `steps[0]` and `steps[1]` are genuine copy from
 * avalanche-capital.com and the voice in all three is grounded in the blog
 * posts (see docs/COPY-REVIEW.md). The graphics that went with them are
 * recoverable from commit ac09735.
 *
 * **`steps[0].body` IS BYTE-IDENTICAL TO `fundraisingView` BLOCK 01's BODY**
 * in content/solutions.ts, and that is not a copy-paste slip - the block 01
 * copy supplied on 9 Sep 2026 turned out to be this exact paragraph, which
 * means it is published Avalanche copy rather than anything drafted here. Two
 * places now hold one sentence, so they CAN drift. They are deliberately not
 * coupled: pointing live page copy at an unmounted object would make this
 * object load-bearing while still reading as dead, which is worse than a
 * documented duplicate. **If you edit one, edit the other or delete this
 * one.**
 */
export const fundraising = {
  eyebrow: "Fundraising",
  title: "Dive Deeper Into Our Fundraising Process",
  accent: "Fundraising Process",
  lede: "A structured framework designed to deliver precision, momentum, and investor confidence.",
  /** Shown twice on /process: beside the page heading, and again under the
   *  last step. Both point at the closing band on the same page. */
  cta: "Get started",
  steps: [
    {
      n: "01",
      title: "Solving For Deal Readiness",
      body: "Before a conversation starts, your materials need to meet the market where it is. We benchmark your dataroom, pitch decks, and supporting documentation against comparable raises we've conducted - ensuring every opportunity we take to market is structured for the highest likelihood of success.",
    },
    {
      n: "02",
      title: "Solving For Investor Segment",
      body: "Identify and segment investor types based on key variables like stage, valuation, and industry, compiling a curated list of mandate-specific investors using proprietary technology and personal networks. Further, granular firm and individual identification ensures precision targeting for effective outreach efforts and investor commitments.",
    },
    {
      n: "03",
      // DRAFT
      title: "Solving For Conversion",
      body: "Meetings are not the milestone - term sheets and signed agreements are. This phase aligns the remaining variables: the message that earns the meeting, the channel it goes out on, the presentation itself, and a data room that carries the same story straight through diligence. Each is refined against what investors actually respond to, so interest converts rather than stalling.",
    },
  ],
} as const;

/**
 * /solutions - the page the step timeline carries.
 *
 * TWO blocks, not three, and they are the two things Avalanche actually does.
 *
 * The rail numbers them 01 and 02, but the LABEL beside each is the service
 * name rather than "Step n". That is deliberate: these are two parallel
 * offerings, not a sequence a client moves through. A shareholder selling a
 * position does not go on to run a primary raise, and labelling them as steps
 * would claim a progression the business does not run. The numbering is an
 * index, which is what the rail already reads as.
 *
 * `title`, `lede` and both bodies are existing copy - `offerings.title`,
 * `thesis.lede`, `secondaries.lede` and the Growth Capital offering
 * respectively. The one authored string is "Primary Capital", a standard
 * category name paired against "Secondary Liquidity". See docs/COPY-REVIEW.md.
 */
export const solutions = {
  eyebrow: "Solutions",
  title: offerings.title,
  lede: thesis.lede,
  cta: "Get started",
  blocks: [
    {
      n: "01",
      /** Anchor. /solutions#secondaries was a live link before this rebuild;
       *  keeping the ids means neither of the old deep links breaks. */
      id: "secondaries",
      label: secondaries.eyebrow,
      title: secondaries.title,
      body: secondaries.lede,
    },
    {
      n: "02",
      id: "fundraising",
      label: fundraising.eyebrow,
      // Authored - the category name opposite "Secondary Liquidity".
      title: "Primary Capital",
      // The Growth Capital offering, verbatim. DRAFT at its source.
      body: offerings.items[2].body,
    },
  ],
} as const;

/**
 * Raise types, above the featured case study.
 *
 * PLACEHOLDER BODIES - the stage and structure names are standard capital
 * market categories and line up with fundraisr.ai's own Solutions set, but the
 * descriptions were written here, not lifted from an Avalanche property. They
 * make no claim the site does not already make. See docs/COPY-REVIEW.md.
 */
/**
 * "What we raise". **IT RENDERS ON /solutions/fundraising, NOT ON THE
 * HOMEPAGE** - moved there 8 Sep 2026, by request. It is a list of the raise
 * shapes Avalanche runs, which is a fundraising-page argument; the homepage
 * slot it vacated now carries `whoWeWorkWith` below, which names the CLIENTS
 * rather than the instruments.
 *
 * The two headings are close enough to notice if they ever land on one page:
 * this one is "Built for Funds and Operators Raising Growth Capital" and its
 * replacement is "Built for Emerging Fund Managers and Operators Raising
 * Growth Capital". They are one route apart today. Do not mount both in the
 * same document without renaming one.
 */
export const raiseTypes = {
  eyebrow: "What we raise",
  title: "Built for Funds and Operators Raising Growth Capital",
  accent: "Growth Capital",
  lede: "From funds to pre-seed through Series C+ - we support structured raises across equity, debt, and hybrid structures.",
  items: [
    {
      name: "Funds",
      icon: "funds",
      body: "Capital formation for private funds across multiple industries.",
    },
    {
      name: "Pre-Seed / Seed",
      icon: "preseed",
      body: "Institutional setup: narrative, terms framing, and mandate-fit investor targeting to secure the first committed capital.",
    },
    {
      name: "Series A–C+",
      icon: "growth",
      body: "Growth rounds with sharper diligence and tighter mandate fit - pipeline management and conversion support through commitment.",
    },
    {
      name: "Project-Level Real Estate",
      icon: "realestate",
      body: "Single-asset equity and debt stacks with sponsor-level underwriting and structured capital formation.",
    },
    {
      name: "Private Credit / Debt Facilities",
      icon: "credit",
      body: "Debt raises, structured credit, and specialty finance capital with lender targeting and closing coordination.",
    },
  ],
} as const;

/**
 * The homepage's "who we work with" block - SUPPLIED 8 Sep 2026, every word.
 * Nothing here was drafted or extrapolated, so it carries no DRAFT marker and
 * needs no sign-off.
 *
 * It took the slot `raiseTypes` used to hold, and it is deliberately the same
 * IDIOM: a `BracketGrid` in a centred-heading light band, so the homepage's
 * rhythm did not change when the content did.
 *
 * **THE CELLS CARRY NO ICON, AND THAT IS NOT AN OVERSIGHT.** `raiseTypes` has
 * one per cell because every one of its entries is a raise shape with a mark
 * in components/ui/icons.tsx. These three are not: "Funds" has a mark,
 * "Companies" and "Special Cases" do not, and that set is a sector list rather
 * than a general-purpose icon library. One cell with a glyph and two without
 * reads as a missing asset, and inventing marks for the other two would put a
 * sector icon on an abstract block - the rule in AGENTS.md. `TrackRecord` and
 * `Thesis` are already iconless for the same reason.
 */
export const whoWeWorkWith = {
  eyebrow: "Who we work with",
  title:
    "Built for Emerging Fund Managers and Operators Raising Growth Capital",
  accent: "Growth Capital",
  lede: "Our unique experience and curated network of investors is most specifically tailored to the following cases.",
  items: [
    {
      name: "Funds",
      body: "Capital formation for emerging Growth Equity, Private Equity and Venture Capital funds across a variety of industries. We work with first-time and emerging managers who need full fundraising assistance, and a process built to go from first close to final close seamlessly.",
    },
    {
      name: "Companies",
      body: "Fundraising from Seed to Series C. The toughest stages for most founders, and precisely where we excel. Whether it's your first time raising, or if you're heading into your second institutional round, we ensure you reach your fundraising goal faster.",
    },
    {
      name: "Special Cases",
      body: "Outside these two lanes, we still take on select mandates - project-level real estate, private credit, and secondary transactions - where our network and process are able to add value.",
    },
  ],
} as const;

/**
 * Verticals grid on the homepage.
 *
 * PLACEHOLDER - neither avalanche-capital.com nor fundraisr.ai publishes an
 * industry list, so these ten are a standard capital-advisory vertical set
 * standing in until the real list arrives. `icon` keys map to the inline SVGs
 * in components/sections/industries.tsx; add a matching icon if you add a row.
 * See docs/COPY-REVIEW.md.
 */
export const industries = {
  eyebrow: "Verticals",
  title: "Industries We Serve",
  accent: "We Serve",
  lede: "Industry-agnostic. Multi-stage. From pre-seed to growth capital, we advise across sectors without limitation.",
  items: [
    { name: "Consumer & E-Commerce", icon: "consumer" },
    { name: "Construction & Infrastructure", icon: "construction" },
    { name: "Entertainment, Media, & Sports", icon: "media" },
    { name: "Environment & Sustainability", icon: "environment" },
    { name: "Financial Services", icon: "finance" },
    { name: "Healthcare & BioTech", icon: "health" },
    { name: "Mining & Natural Resources", icon: "mining" },
    { name: "Real Estate", icon: "realestate" },
    { name: "Technology & Software", icon: "technology" },
    { name: "Transportation & Aviation", icon: "transport" },
  ],
} as const;

/**
 * The homepage case-study block: one entry per study in
 * `featuredCaseStudies`, keyed by the SAME SLUG so the two lists cannot drift
 * apart. It was a single `testimonial` object until 8 Sep 2026.
 *
 * Three fields carry structure rather than words, and each exists because one
 * of the two entries needs it:
 *
 * `title` and `subject` are the block's own headline and the line under it.
 * They are NOT derived from the case study record: `metric` is a pill ("$35M
 * Series A") and `result` is a sentence about the process, while these two
 * say what closed, how fast, and who the client is. Supplied 8 Sep 2026.
 *
 * `quote` is an ARRAY of paragraphs, not a string. Neurable's is one
 * paragraph and Nobody Studios' is two, and joining them with a line break
 * inside one string would leave the closing quotation mark attached to the
 * wrong run.
 *
 * `photo` IS THE SLIDE'S PICTURE, and since 9 Sep 2026 it is the whole left
 * half of the slide rather than a plate beside the quote - big, square, and
 * the first thing on the slide a reader sees. It is REQUIRED for that reason:
 * a slide without one has an empty column, not a tidier layout.
 *
 * `logo: true` means that picture is the CLIENT'S MARK, not a portrait.
 * Nobody Studios supplied positioning copy rather than a person's words and
 * no photograph, so its slide shows the same white-on-transparent mark the
 * /customers grid uses. That changes the fit from `cover` to `contain` and
 * needs padding, a plate and `logo-mark` - see the component. A portrait
 * entry must not take it. Note the mark is a 320px-wide source and the column
 * is ~450px: it is drawn inside its native width at 1x and will be soft on a
 * HiDPI screen until a larger file exists.
 */
/**
 * The case-study block's own framing, which was hardcoded in the section
 * until 8 Sep 2026 - eyebrow, lede and button label all sat as literals in
 * JSX, which is exactly how editable copy stops being editable.
 *
 * The eyebrow is PLURAL now and the lede says "These show" rather than "This
 * one shows": the block carried a single study until the same day and both
 * lines counted it. Nothing else about the sentence changed.
 */
export const caseStudySection = {
  eyebrow: "Selected case studies",
  lede: "Every mandate is different. These show what mandate-fit targeting, investor readiness, and pipeline execution produce when they run end to end.",
  cta: "See more customer stories",
  /** The scroll region's accessible name. It is not rendered - the pager,
   *  the dots and the two arrows are what a sighted reader gets - so it has
   *  to say in words what those say in position. */
  carouselLabel: "Selected case studies, one at a time",
} as const;

export const caseTestimonials = {
  neurable: {
    title: "$35M Series closed in 3 months",
    subject: "Neurable - BCI (brain computer interface) innovation",
    quote: [
      "Our mission is to make understanding your brain as natural and intuitive as checking your steps. This funding allows us to scale Neurable AI into new devices and new industries, making cognitive health an accessible, daily utility for everyone.",
    ],
    name: "Dr. Ramses Alcaide",
    role: "CEO and Co-Founder of Neurable ($35 Million Series A)",
    company: "Neurable",
    photo: "/testimonials/ramses-alcaide.webp",
  },
  "nobody-studios": {
    title: "$20M Fund I closed in 4 months",
    subject:
      "Nobody Studios - on a mission to scale and exit 100 AI-native companies in the next 5 years.",
    /**
     * SUPPLIED 8 Sep 2026, and it is a statement about the FIRM rather than a
     * quotation from a person - which is why there is no `name` and no
     * `role`. Do not attribute it to a founder to make the figure match
     * Neurable's; the two are shaped differently on purpose and the component
     * renders the caption it is given.
     */
    quote: [
      "Nobody Studios is an AI-native, high-velocity venture studio scaling 100 companies in 5 years for rapid exits",
      "We focus on building startups that achieve profitable milestones quickly - because acquisition is the new exit in today's market.",
    ],
    company: "Nobody Studios",
    photo: "/logos/cases/nobody-studios.webp",
    logo: true,
  },
} as const;

export const customers = {
  eyebrow: "Customers",
  /**
   * SUPPLIED 9 Sep 2026, title and lede both.
   *
   * The title was "Built for the firms and GPs moving private capital." -
   * `accent` still ends the sentence the same way, so it did not need
   * revisiting. "Working with" rather than "Built for" is the same shift the
   * /solutions header made the same day: "built for" is how a product
   * describes its user, and this is a firm describing its clients.
   *
   * The lede lost the last fundraisr claim on this page with it. It read
   * "Used by placement agents, boutique investment banks, emerging fund
   * managers, and founding teams raising capital from HNWIs, family offices,
   * and institutional investors. Our clients don't need another CRM - they
   * need infrastructure that makes their fundraise executable." - a list of
   * segments followed by a positioning line about software. Note what that
   * takes with it: **this page no longer names the investor types it sells
   * to**, and `whoWeServe` on the homepage is now the only place that list
   * lives. If a reviewer wants the segments back on /customers, that is a
   * deliberate addition rather than a restoration.
   */
  title: "Working with the GPs and founders moving private capital.",
  accent: "moving private capital.",
  lede: "Avalanche Capital works with eager fund managers and founders who aim to bring innovative initiatives to their respective industries.",
  /** The page-header CTA. It was hardcoded in app/customers/page.tsx while
   *  every other page header read its label from content - which is exactly
   *  how a label drifts when it is renamed. */
  cta: "Get in touch",
  /**
   * NOT RENDERED since 9 Sep 2026, by request. These two were a
   * `SectionHeading` in a light band of its own between the page header and
   * the tile grid; the section was removed and the grid now follows the header
   * directly. Kept because they are the only sentence on the site that names
   * the asset classes - venture, private credit, real estate, private equity -
   * and the geography, so deleting them would lose that phrasing rather than
   * merely unmount it. Nothing else says it; `whoWeServe` names investor types
   * and `customers.lede` now names client types.
   */
  gridTitle: "From first mandate to billion-dollar deal books.",
  gridLede:
    "We work across venture, private credit, real estate, and private equity - with clients from the US, Australia, and everywhere in between. Here's what that looks like in practice.",
  logoNote: "Client logos represent past engagements of Avalanche Capital.",
  /**
   * NOT CURRENTLY RENDERED - the strips were unlabelled by request on
   * 3 Sep 2026. Kept because if a caption ever goes back under the venture
   * strip at the foot of the /customers hero, it has to be this careful:
   * those marks are firms active in the market, NOT Avalanche clients or
   * partners. `logoNote` above is the client claim and belongs to the roster
   * grid. Do not merge the two or let this one drift toward implying a
   * relationship. DRAFT. See content/ecosystem-logos.ts.
   */
  ecosystemNote:
    "Logos represent venture capital firms and institutional investors active in the ecosystem.",
  trustedByEyebrow: "Trusted by",
  // DRAFT - the only line on this page not lifted from an Avalanche property.
  // It heads the client logo grid; the paragraph beside it is `trustedByBody`
  // below. See docs/COPY-REVIEW.md.
  trustedByTitle: "Trusted by top teams across private capital.",
  /**
   * The paragraph set against `trustedByTitle`, over the client logo grid.
   *
   * IT USED TO BE `whoWeServe.lede` AND IS NOT ANY MORE. That key was
   * rewritten on 8 Sep 2026 to describe INVESTOR types, which is right over
   * the list of investor types it heads on the homepage and wrong here: the
   * grid under this paragraph is CLIENT marks, so an investor-side sentence
   * captions the wrong pictures. This is the original wording, unchanged and
   * still sourced - it names who hires Avalanche, which is what a "Trusted
   * by" band is claiming. Do not re-point this at `whoWeServe.lede`.
   */
  trustedByBody:
    "We are used by placement agents, boutique investment banks, emerging fund managers, and founding teams raising from HNWIs, family offices, and institutional investors.",
} as const;

export const ctaBand = {
  eyebrow: "Get in touch",
  title: "Start with a consultation",
  accent: "consultation",
  body: "Every successful raise begins with a clear strategy. Our consultation uncovers your goals, challenges, and positioning, so we can design an approach that reaches the right investors.",
  /** The block's own button. It opens the scheduler in a new tab, which is
   *  the job `components/sections/booking.tsx` used to do here. */
  cta: "Book a meeting",
  note: "Intro call · No commitment required",
} as const;

/**
 * NOT CURRENTLY RENDERED. It was "In the press" at the foot of /about and came
 * off on 7 Sep 2026.
 *
 * The block was three white cards on a white band, separated only by a
 * hairline, with the outlet set as an eyebrow rather than its mark, no link to
 * any article and no hover state - while the same site runs real logo lockups
 * in the hero strip and across /customers. It could not be fixed in place:
 * there are no outlet marks in `public/logos/` for these three and no article
 * URLs anywhere in the repo, and inventing either is not available. So it was
 * removed rather than restyled, and 593px of filler went with it.
 *
 * Kept because the quotes are still wanted if the articles are real. Bring it
 * back with marks, anchors and a hover state, on the `BracketGrid` lattice
 * rather than as filled panels - see docs/COPY-REVIEW.md.
 */
export const media = [
  {
    quote:
      "Redefining Fundraising: Avalanche Capital's Methods Open New Doors for Fintech Startup",
    outlet: "CEO Weekly",
  },
  {
    quote:
      "The Future of Fundraising: Avalanche Capital's Fresh Solutions for Startups and Funds",
    outlet: "Forbes",
  },
  {
    quote: "Avalanche Capital: Modernizing the Outmoded World of Fundraising",
    outlet: "Global Banking & Finance Review",
  },
] as const;

export const legal = `Avalanche Capital provides strategic guidance, fundraising education, and advisory support to operating companies, real estate sponsors and developers, investment funds, and other businesses. Client logos and case studies represent past engagements of ${site.entity}. References are for illustrative purposes only and do not constitute endorsement.

Nothing on this website constitutes an offer to sell, a solicitation of an offer to buy, or a recommendation of any security or investment. Browsing this website does not create a client, advisory, or fiduciary relationship. No such relationship exists unless and until a written engagement agreement has been executed by both parties.

Avalanche Capital does not guarantee any specific fundraising outcome, investor interest, capital commitment, or financial result. Results featured on this website represent individual client experiences and are not indicative of typical outcomes.`;
