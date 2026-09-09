# Copy review - everything I wrote, and what it was built from

**Date:** 1 September 2026
**Purpose:** one pass to approve or replace. Nothing here was lifted from an Avalanche property; everything else on the site was.

Each block is marked `// DRAFT` at its source location. Search the repo for `DRAFT` to find them all.

---

## Why these had to be drafted

The previous session reported that three offering panels "could not be captured" from `avalanche-capital.com`. I re-tested that from scratch rather than take it on trust, and it is not an automation failure that more effort would fix:

- Clicking the `02 LP Capital` tab with real pointer events does not change the rendered panel.
- Fetching the page's raw HTML and searching it directly shows the `framer-*-container` elements for **LP Capital**, **Growth Capital** and **Secondary Liquidity** contain nothing but their own tab labels. The body text is not in the document.
- `/thesis`, `/case-studies` and `/get-started` are older 2024 landing pages and don't carry it either.

The copy exists only in your Framer editor or the original deck. If you have it, replacing these is a paste job.

**What I did use for voice:** your three blog posts, which I found in the sitemap and which the previous session didn't know about - `solving-for-investor-message-fit`, `how-to-run-cold-email`, `positioning-hierarchical-dynamics-and-investor-relations`. The vocabulary below (mandate-specific investor lists, the segment → message → channel → presentation → diligence sequence, "term sheets not meetings") is lifted from your own writing, not invented.

---

## 1. Offerings - `content/copy.ts`

| Panel | Built from |
|---|---|
| **LP Capital** | The LP screening variables listed in your *Investor-Message Fit* post - strategy, track record, team, fund size, focus, fee structure, minimum commitment. Reframed as what we position against. |
| **Growth Capital** | The existing Deal Readiness panel + the process steps, restated for primary rounds. |
| **Secondary Liquidity** | The thesis line already on the site: "capital, deal flow, or **secondary liquidity**". Expanded, no new claim. |

## 2. Investor types - `content/copy.ts`

**Mostly closed on 8 Sep 2026.** The block was retitled *Investor Types We Work With*, given a supplied lede, and two of its three entries are now your copy rather than drafted here:

| Entry | Status |
|---|---|
| **Institutional Investors** | **Supplied 8 Sep 2026.** Replaced the body lifted from avalanche-capital.com, which named banks, insurance firms and pension funds; it now names VCs, Funds of Funds, Sovereigns and Asset Managers. |
| **Family Offices** | **Supplied 8 Sep 2026.** It replaced **Accredited Retail**, a drafted entry - a different investor type, not a rewrite, so the jurisdiction-neutrality caveat that entry carried is no longer live. If accredited retail is still a segment you serve, it needs its own slot and its own copy. |
| **HNWI / Angels** | Still drafted here. Descriptive only, and it follows the pattern of the two above: it describes the investor category and promises nothing about outcomes. |

One thing to note in the supplied copy: **Family Offices** says "the same rigor", US spelling, while **Institutional Investors** says "characterised" and "prioritise", UK. The rest of the site is UK throughout. Left exactly as supplied - say the word and it is a one-character change.

## 3. Process step 03 - `content/copy.ts`

**Solving For Conversion.** Steps 01 and 02 were recoverable; 03 was not. Built directly on your own framing: *"the true north isn't marked by mere appointments or meetings, but rather by the tangible milestones of term sheets and signed sub-agreements"*, and the five variables you name - segment, message, channel, presentation, diligence.

## 4. FAQ - `content/faqs.ts`

**Rewritten 1 Sep 2026 against fundraisr.ai's real copy.** There is no published FAQ on any of your properties to lift from - I checked fundraisr's `/faq`, `/platform`, `/solutions`, `/customers` and `/pricing`. So the answers are still written here, but they are now grounded in things your sites actually say: the platform positioning, the 1.2M+ investor figure, the three product pillars, the client types, and "under ten days to a first investor meeting".

That last one is worth a look - **"clients on our platform average under ten days to a first investor meeting"** restates fundraisr's `<10 days` stat as a claim about Avalanche's clients. It follows from the stat, but confirm you're comfortable with the phrasing. **It is also now out of step with the track record**, which was supplied as `<14 days` on 8 Sep 2026. Left as written rather than silently re-numbered, because the FAQ sentence is about the platform and the track record figure is about the advisory - but they read as the same claim and one of them should move.

Seven of eight answers are drafted. **Three need your attention:**

| Question | Why it needs you |
|---|---|
| **"How many new clients do you take on?"** | This is a real operating fact, not a positioning choice. I wrote "a limited number at any one time" because it follows from the *Precision & Execution* pillar - but I don't know your actual policy. **Confirm or replace.** |
| **"What is the cost to work with Avalanche Capital?"** | I found no fee information on any Avalanche property, so the answer routes to the intro call. Inventing a number here would be a liability, not a placeholder. Fill in if you want it public. |
| **"Do you guarantee clients raise?"** | Answered **no**, in the language of your own footer disclaimer. Any softer answer would contradict the legal notice further down the same site. I'd leave this one as it is. |

## 5. Team bios - `content/team.ts`

**These describe the role, not the person - on purpose.**

Names and titles are the only facts any Avalanche property makes public; the real bios sit behind "Read Bio" modals that render nothing to the page source. Writing plausible career histories for six named individuals is a different thing from drafting marketing copy: invented prior firms or credentials are exactly the kind of detail a reviewer skims past, and they'd be false statements about real people.

So each line says what the seat does at Avalanche and stops. They read as intentional rather than as gaps, but **they are not bios and shouldn't ship as if they were.** Ask the five of them for two sentences each.

**Four new DRAFT lines landed on 7 September 2026** with a design pass: a
supporting subhead under three section headings that had none
(`manifesto.beliefs.lede`, `manifesto.layers.lede`, `about.team.lede`). Every
other section header on the site carries one, and their absence was breaking
the page's vertical rhythm. `about.team.lede` describes the SHAPE of the team -
five people, both sides of a raise - and no individual, which is the same limit
the bios keep.

**"In the press" was removed from `/about` the same day.** Three cards of
drafted quotes on a white band, no outlet marks, no article links, no hover
state. It could not be fixed in place: there are no marks for those three
outlets in `public/logos/` and no article URLs anywhere in the repo. `media` is
kept but unrendered in `content/copy.ts`. **If the articles are real, send the
URLs and the outlet marks and it comes back** - on the lattice, with anchors
and a hover state. If they are not, the quotes should be deleted rather than
kept.

**THEY ARE NOT RENDERED ANY MORE, and that closes what was the sharpest item on this list.** They came off on 7 September when the grid was rebuilt around the reference's photo/name/role card, went back the same day by request, and came off again on 9 September - *"remove all the text from the images, leave just the titles"*. A card is now a portrait, a name and a job title. **Nothing drafted is said about any named person on that page.**

They are kept in `content/team.ts` rather than deleted, because that sequence shows they can be wanted back, and `app/about/page.tsx` carries the line to restore. If they ever return, everything above applies again and it applies harder each time the team grows.

**A SMALLER ITEM TAKES THEIR PLACE.** Two account executives were added the same day from supplied photographs. No names came with them - a job title and two pictures - so both cards shipped reading **"Name to come"** rather than a guess. **The names arrived shortly after and are now live: Sara Ribeiro and Erik Gallegos.**

**Please confirm which face is which.** The two names were sent as a pair, in the same order as the two photographs, and that order is the only thing pairing them - there was no caption, no filename and no CMS record. Sara takes the first picture sent and Erik the second. It is the same assumption the original five carry, and swapping them is a two-minute change. Their portraits are generative on the same terms as Arsenio's - see the photography item below.

**The team block's HEADING is drafted too, as of 7 September 2026.** It read "Both sides of the table", with that thesis pillar's body as its lede - borrowed verbatim while the thesis section itself was unmounted. `/about` mounts the thesis, so the pillar renders in full a few hundred pixels above and the borrowed version had to go. It now says **"The people you work with"** (`about.team.title`). It DOES carry a lede - the paragraph above said it did not, which stopped being true when every section on the page was given one - and that lede is DRAFT on the same terms as the bios: it describes the shape of the team and names nobody. It also used to open *"Five people…"* and no longer counts the room, because an Associate was added on 9 Sep 2026 and the sentence went on saying five - the team has since reached eight, which is exactly the drift it was rewritten to avoid. A hand-typed count beside a rendered list is a second place to be wrong; the list does the counting now.

---

## 6. Two homepage sections that are entirely placeholder

You asked for these layouts and said copy would follow. Neither
`avalanche-capital.com` nor `fundraisr.ai` publishes a list for either one - I
checked both, plus fundraisr's `/solutions` and `/customers` - so **all of the
copy below is standing in.**

### "Built for Emerging Fund Managers and Operators Raising Growth Capital" - `whoWeWorkWith` in `content/copy.ts`

**Supplied 8 Sep 2026 and fully closed.** Funds, Companies, Special Cases - every word is yours, so nothing here is drafted and none of it needs sign-off. It took the homepage slot `raiseTypes` used to hold; that block moved to `/solutions/fundraising` and is reviewed below, unchanged.

One line is worth a second look, because it is the only outward commitment in the block: **Special Cases** says we take on *"project-level real estate, private credit, and secondary transactions"*. That is consistent with the secondaries route and the raise-types list, but it is a statement about what you will accept as a mandate. Confirm it reads as intended.

### "Built for Funds and Operators Raising Growth Capital" - `raiseTypes` in `content/copy.ts`

**Now on `/solutions/fundraising`, not the homepage** (8 Sep 2026). The copy did not change with the move; everything below still applies.

The five stage/structure names are standard capital-market categories and line
up with fundraisr's own Solutions set, so they are a reasonable starting point.
**The descriptions were written here** and should be treated as drafts:

| Row | Confidence |
|---|---|
| Funds | Name is safe; description is drafted. |
| Pre-Seed / Seed | Name is safe; description is drafted. |
| Series A–C+ | Name is safe; description is drafted. |
| Project-Level Real Estate | **Confirm you actually do this.** It is in the reference layout, not sourced from you. |
| Private Credit / Debt Facilities | **Confirm you actually do this.** Same reason. |

The last two are the ones to check - they claim service lines, and I have no
evidence either way.

### "Industries We Serve" - `industries` in `content/copy.ts`

Ten verticals, **all placeholder.** They are a generic capital-advisory set, not
your list. The lede - *"Industry-agnostic. Multi-stage. From pre-seed to growth
capital, we advise across sectors without limitation."* - is also drafted, and
note it makes a fairly broad claim; confirm it is one you want to make.

Replacing these is just editing the arrays. Each row needs a `name` and an
`icon` key; the available icons are in `components/ui/icons.tsx`, and a new
vertical needs a matching glyph added there.

---

## /customers - the page header is yours now

**Supplied 9 September 2026.** The heading is **"Working with the GPs and
founders moving private capital."** over *"Avalanche Capital works with eager
fund managers and founders who aim to bring innovative initiatives to their
respective industries."*

It replaces *"Built for the firms and GPs moving private capital."* over a lede
that listed the segments - placement agents, boutique investment banks,
emerging fund managers, founding teams, and the HNWIs, family offices and
institutions they raise from - and closed with *"Our clients don't need another
CRM - they need infrastructure that makes their fundraise executable."* **That
was the last fundraisr platform claim on this page**, so it goes with the same
change that took the rest of them off `/solutions`.

**One consequence to decide on rather than discover.** The old lede was the
only place `/customers` named the investor types it sells to. It does not name
them anywhere now - `whoWeServe` on the homepage is the only remaining list. If
you want the segments back on this page, that is a deliberate addition, not a
restoration.

## The /solutions page - two views, and only one of them has copy

**Restructured 4 Sep 2026.** It was one page with a Secondaries block and a
Fundraising block. It is now two routes behind a toggle - **three blocks on
Fundraising, five on Secondaries** - and the copy situation is very different
on either side. All of it is in `content/solutions.ts`.

### /solutions/fundraising - YOUR COPY NOW, and the lifted question is closed

**As of 9 Sep 2026 nothing on this page is fundraisr's copy.** The header and
blocks 01-03 were replaced with text you supplied, and blocks 04 and 05 -
*"Pipeline management / From first touch to signed commitment. Every step,
tracked."* and *"Meeting intelligence / Know who you're speaking with, and
why."* - were removed. The page reads as an advisory process in three moves
(get ready, get introduced, get closed) rather than a five-feature product
tour, so **the sign-off question below is answered: the de-branding no longer
applies to anything rendered on this route.** It is kept because it still
governs the Secondaries scaffolding, and because the old bodies are in `git
log`.

Block 03's supplied text - *"Deal closure / Solving for deal closure"*, with a
body about term sheet negotiations and dataroom reviews through to a signed
commitment - replaced *"Personalised engagement / Scalable outreach with a
personal touch."* **Its picture changed too.** The outreach-sequence diagram
draws follow-ups branching on an engagement signal, which is not a term sheet,
a dataroom or a signed commitment, so leaving it would have made the picture
claim something the copy does not. The four-stage funnel from the removed block
04 took its place - Contacted, Engaged, Diligence, Committed, with only the
committed column accented - and its two frame captions were changed from
*"Pipeline / All mandates"* to *"Deal progress / Signed commitment"*, since the
first pair framed a book of business being administered rather than one deal
closing. **If you would rather block 03 carried no picture than that one, say
so** - an honest blank is the house rule, and this is the one judgement call in
the change.

*The section below is the historical record of what the page used to be.*

Structure and copy WERE **fundraisr.ai/solutions**, captured 4 Sep 2026: the
same five steps, in the same order, with their own headings and bodies. It was
published copy from a property you own, so it was not invented and not DRAFT.

**One change was made throughout, and it was the thing to sign off.** The source
names the product in almost every paragraph - "Fundraisr's pre-marketing
agent", "Fundraisr generates personalised messaging", "Fundraisr doesn't just
give you data". Those read as "our" and "we" here. No claim was altered; only
the brand attached to it.

That was the cautious choice, but it is still a choice, and it cuts both ways:

- As written now, the Avalanche site describes these capabilities as
  Avalanche's own. **Confirm Avalanche actually delivers them** - the copy
  describes software (agents, campaign sequencing, a 1.2M-profile database).
  If the answer is "Fundraisr delivers it and Avalanche resells it", the
  wording should say so.
- If you would rather name Fundraisr explicitly, that is a one-pass edit - but
  it is the same positioning decision already flagged under the track-record
  figures below, and the two should be answered together.

**The header and the first two blocks are now SUPPLIED COPY, not fundraisr's,
and the de-branding note above no longer covers them (9 Sep 2026).**

- The page opened *"The full-stack fundraising platform."* over a lede about
  consolidating research, outreach, pipeline and meeting intelligence *"into
  one system"*. It now reads **"A Definitive Solution For Fundraising"** over
  *"Our validated approach for raising capital has been specifically tailored
  for our segment of the market, and the types of clients we serve."* The first
  described a product; the second describes an advisory practice, which is
  what this firm is.
- Block **01** was *"Pre-marketing / Deal packaging support."* and is now
  **"Deal-readiness / Solving for deal readiness"**, with a body about
  benchmarking the dataroom, decks and supporting documentation against
  comparable raises. **That body is not new copy and not mine:** it is
  byte-identical to `fundraising.steps[0].body` in `content/copy.ts` - the
  unmounted three-step process lifted from avalanche-capital.com - so it is
  your own published paragraph, and the "Solving For …" title follows that
  object's pattern. Two files now hold that one sentence and they can drift;
  both carry a note saying so. Blocks 02 and 03 do NOT match their equivalents
  there, so those two are genuinely new text. Its diagram moved with it - the three input chips read
  the old body's *Structure / Thesis / Target profile* and now read the new
  body's nouns, so the picture does not name three things its copy has stopped
  mentioning.
- Block **02** was *"Investor sourcing / 1.2 million investors, one search
  away."* and is now **"Investor introductions / Solving for LP capital &
  growth capital."** **This retires the "1.2 million investors" headline**,
  which was fundraisr's own database stat and one of the open sourcing
  questions below. The diagram was left as it is: it draws a mandate filter
  selecting investors out of a universe, which is what the new body describes.

Two things to note on the supplied text itself. **Block 01's title is the only
one on the page without a full stop** - "Solving for deal readiness" beside
"Solving for LP capital & growth capital." and the three fundraisr titles that
still carry theirs. It is set exactly as supplied; one character closes it, say
the word. And the page's **`<meta name="description">` was rewritten with it**,
because it still listed the platform features and the 1.2M figure - a
description is the one piece of copy invisible on its own page, which is how it
outlives it.

Block 03 followed the same day and blocks 04 and 05 were removed, so there is
nothing de-branded left on this route - see the top of this section.

### /solutions/secondaries - PLACEHOLDER, awaiting your copy

**THIS PAGE IS NO LONGER PLACEHOLDER. All of it was supplied on 9 September
2026** - the heading, the lede, two blocks and a logo band - and the three
blocks that had no copy were removed rather than filled in. Nothing on
`/solutions` carries the `pending` flag any more.

- `secondaries.title` ("Secondary Liquidity") and `secondaries.lede`. The
  drafted lede they replace was about GPs and LPs selling **fund positions**
  ahead of a full exit; the supplied one is about **pre-IPO secondaries in
  operating companies** - shareholders and founders selling, investors buying
  late-stage exposure ahead of a listing. That is a different trade, not a
  rewrite, and it is why the old blocks could not stay.
- **Blocks 01 and 02 are "Buy-side advisory" and "Sell-side advisory"**, the
  two sides of that trade. The five placeholder stages that used to sit here -
  Position review, Pricing, Counterparties, Process, Close - were replaced by
  the first two and the last three were removed by request, because two sides
  of a trade under three stages of one mandate had the page describing itself
  two ways at once.
- The page's `<meta name="description">` was rewritten with it; it still
  described fund positions sold before the end of a fund's life.

**THE NEW LOGO BAND IS THE ONE THING HERE THAT NEEDS AN ANSWER RATHER THAN A
REVIEW.** "Direct Access / We provide direct access to:" closes the page with
nine company marks. **That is a stronger claim than any other logo strip on
this site:** the client roster says "these firms hired us" and says so in
`customers.logoNote`; this one says we currently hold access to secondary
opportunities in nine named, identifiable, late-stage private companies. Three
things follow.

- **Confirm the nine are accurate and that naming them is agreed.** Six are
  identifiable from the files you sent - Polymarket, Revolut, Lovable,
  ElevenLabs, Crusoe, Kalshi. **Three arrived with hash filenames and I have
  not guessed at the companies**, so they ship named for the file they came in
  as. Nothing renders a name (the grid sets `alt=""`), so no unsupported claim
  is made in text, but tell me the three and I will rename them.
- **A tenth file was in the folder and is not on the page.**
  `4Yf8lsLoMojz8u9x8wmK12.webp` - a stacked-layers mark - was in the shared
  Drive folder but not in the list you sent, so it was left out. Say the word.
- **The disclaimer under the heading is load-bearing.** It scopes the grid to
  "a selection", says the list is not exhaustive, and sends a specific request
  to the team. Do not keep the logos and drop that paragraph.

Nothing here was invented, deliberately. Avalanche publishes no secondaries
process copy anywhere I could find, and writing five plausible steps for a live
financial service would be fabricating a capability - the same reason the team
bios describe roles rather than careers. The five stage names (Position review,
Pricing, Counterparties, Process, Close) describe the general shape of a
secondaries mandate, not yours, and the first block says exactly that.

**Send the copy and this is a paste job** - five titles and five bodies, then
delete the `pending: true` flags.

### The artwork - six schematics, and four cards still blank

`MEDIA` in `solutions-steps.tsx` is keyed on block id, so a diagram only
appears on a block it genuinely describes. **Fundraising is now drawn in
full**; Secondaries has one of five.

| Block | Graphic | Note |
|---|---|---|
| Fundraising 01, Pre-marketing | Three raise inputs converging into one outlined package | The convergence *is* the claim - separate inputs resolving into positioned materials. |
| Fundraising 02, Investor sourcing | Sector × stage grid with a selection | "8 matched" is **computed from the rectangle**, so the caption cannot disagree with the dots. Sectors run down the left, stages along the bottom. Both lists are standard market categories. |
| Fundraising 03, Engagement | A three-touch sequence branching on a signal | Two outcomes from one sequence, because the copy says follow-ups are sequenced *by* signal. Channels are Email / LinkedIn, as the copy says. |
| Fundraising 04, Pipeline | Four top-aligned stage columns | The columns are the funnel. Counts (7/5/3/2) are schematic, and "2 committed" is read from the last column's own card count. |
| Fundraising 05, Meeting intelligence | One anonymous counterparty against four mandate parameters | "3 of 4 aligned" is **counted** from the parameter list. "Investor 07 / Growth fund" is deliberately anonymous. |
| Secondaries 03, Counterparties | Two columns of anonymous entries, one accent route | "Position 01–04" / "Buyer 01–04" are schematic so nothing reads as a real deal. |
| Secondaries 01, 02, 04, 05 | `PendingPlate` | A dashed frame reading "Artwork pending". |

**Nothing in these is a figure or a claim.** The counts, the stage names and
the counterparties are all illustrative. Every number that appears in a pill is
derived from the shape drawn beside it in the same render, never typed twice,
so a diagram cannot contradict its own caption.

Diagrams are **not** reused to fill a card they do not describe. Each makes a
specific claim, so showing the counterparty-routing picture beside a pricing
block would illustrate the wrong thing. An obvious blank beats a
plausible-looking wrong picture.

**If you have real screenshots**, they would beat either diagram, and swapping
one in is a per-card change with no layout consequence.

**Blocks are labelled by name, not "Step 1" and "Step 2".** The rail numbers
them, but on Secondaries especially these are stages rather than a promise of
sequence.

### The diagrams - illustrative, not data

`components/ui/solutions-media.tsx`. Both are schematics: anonymous positions,
generic sector names, no real counterparties, no figures. Which block each one
sits on, and why the other eight cards are blank, is in the section above.

Both were drawn in gold, and have since followed the palette through obsidian
and `#3056EE` to the brand blue `#73B6FF` without a single value in
`solutions-media.tsx` changing - they are written against the `accent` role,
not a colour.

These replaced `public/solutions/{secondaries,fundraising}.webp`, which carried
a hardcoded blue belonging to no token and rendered soft at display size. The
accent is itself blue now, which does not make that art right: the objection
was the one-off literal, not the hue.
Both files have been **deleted** - they are recoverable from `d797028^` if the
old artwork is ever wanted back.

---

## The manifesto - a whole section of `/about`, and all of it drafted

**Added 5 September 2026 as `/manifesto`; folded into `/about` on 7 September**
at your request, between the thesis and the team. Every string is in
`content/manifesto.ts` and every block in it is marked `// DRAFT`. None of it
came from an Avalanche property. It was condensed from a thesis document you
supplied on the day. The page-level copy - the label, the H1's two authored
lines and the lede - moved to `content/about.ts` with the merge and is still
`DRAFT`; the H1 is now the first thing anyone reads on About Us, so it is worth
a second look on its own terms.

### What was cut, and why that matters more than what was kept

The source ran to seven sections: five tenets, four data charts with a stat
grid, a competitor 2x2, an eight-row requirement matrix comparing us to
advisors and platforms, and a protocol architecture with three phases. Four
sections shipped. The rest was dropped, deliberately:

| Cut | Why |
|---|---|
| The four data charts and the stat grid | See below - roughly twenty unverifiable figures. |
| The competitor 2x2 and the requirement matrix | Adversarial toward named categories, and it is sales rather than belief. It also makes claims about how *other* firms are paid. |
| The protocol architecture and its three phases | That is `/solutions`, which already has five blocks and six diagrams. |
| The named allocator chips (ADQ, Mubadala, PIF, Rothschild, 8VC, …) | Naming institutions that have "reviewed our dealbook" is a checkable claim about third parties. If you want it, it needs to be true and probably needs their agreement. |
| The name **"the Capital Formation Protocol"** | It appears nowhere else on the site or in `content/`. Using it would be inventing a proprietary brand asset, not describing one. The page links to Solutions without naming a method. **Tell me if this is real and I will thread it through.** |

### THERE ARE NO FIGURES ON THE PAGE. This was a decision, not an oversight.

The source carried roughly twenty cited statistics - US listed-company counts,
private-backed counts, median age at IPO, single-family-office growth to 2030,
alternatives AUM, mega-fund share of committed capital, first-time fund closes,
secondary volume. Every one had a source attached and **not one could be
verified from here.**

The track-record figures are already the most load-bearing claims on the site
and are still awaiting your confirmation. Adding twenty more unverified ones -
to state a set of *opinions* - would spend the site's credibility to say
something that does not need a number to be true.

So the page argues from position. Every directional claim ("the listed universe
has been shrinking for a generation", "concentration has risen for a decade") is
a widely-documented shape stated **without a figure attached**, and both
diagrams are shape-only: no axis values, no units, no counts. Nothing on the
page can be factually wrong.

**If you want the data version, that is a different page and it needs a sourcing
pass first.** Send the sources and it is a build, not a rewrite.

### What needs your eye

| Block | Note |
|---|---|
| **H1 - "Capital is not scarce. Access is."** | Straight from the source and the best line in it. It is a strong, opinionated claim to lead a page with; confirm you want to make it. |
| **Belief 05 - "Access is infrastructure, not a rolodex."** | The body ends "That distinction is the whole of how this firm is built" - a claim about how Avalanche actually operates, not a market observation. The source went further and described the fee model (one-time engagement fee plus success fee, no retainers); **that was cut** because it is a commercial fact I cannot confirm. Add it back if it is right. |
| **Belief 04 - "No allocator has ever wired money because of a scoring model."** | Rhetorical, and it cuts at the software category. Fine if you are comfortable being that pointed. |
| **The three layers** | The framing (your network → extended network → addressable universe) is the source's and it is good. Confirm it matches how you actually describe the problem on a call. |
| **"Reaching the third layer predictably is the whole discipline."** | The bridge into `/solutions`. It promises the method delivers layer three. |

### The two diagrams

`components/ui/manifesto-media.tsx`. Both are schematics with **no figures**,
drawn in the same system as the `/solutions` six.

| Diagram | What it claims |
|---|---|
| **The divergence** | Two lines starting together and separating, with the space between them shaded and labelled "Access gap". One array drives both lines *and* the wash, so the shaded region is by construction the area between them. The values are a direction, not a quantity. |
| **The three layers** | Three concentric rects, the outer band accented and labelled "Addressable". The accent is knocked out by the inner two, so what shows is exactly the layer that is not being reached. |

Note that on these two the accent marks what is **not** reached, which inverts
its meaning on the `/solutions` six (where it marks what matched). Both pills
say so in words. The file carries a comment so a future reader does not
"correct" it.

---

## /get-in-touch - the questionnaire

**Added 5 September 2026.** Everything is in `content/contact.ts`.

**The nine questions and every one of their options are YOURS** - they are the
only strings on the new page that are not drafted, and the order is exactly as
supplied. Three things were changed to them, and nothing else. Each is one edit
to undo:

| Change | Example | Why |
|---|---|---|
| A typo | `"Three to six måonths"` → `"Three to six months"` | Stray character in the supplied list. |
| Sentence case on option labels | `"Investment Fund"` → `"Investment fund"` | Matches every other list on the site. Say the word and they go back to title case. |
| En dash in ranges | `"$1m - $5m"` → `"$1m – $5m"` | Matches the typography everywhere else. |

The count in "Question n of 9" is read from the array rather than typed, so the
two cannot disagree.

### Drafted, and needing your eye

| Block | Note |
|---|---|
| **"Get in touch" / the lede** | Taken from the reference you sent, which is Farah Capital's page. The words are generic enough that this is not really lifting, but it is not yours either - replace it if you want your own. |
| **Question phrasings** | Your list gave short labels (`Name:`, `Company:`). They are asked as full questions here - "What is your name?" - because one field per screen with a bare label reads as a form fragment. The *options* are untouched. |
| **The success panel** | "We read every submission ourselves. If there is a fit you will hear from one of us within two business days." **That is a promise about your response time and I invented it.** Change or remove it. |
| **"Prefer to reach us directly?"** | Sits above the LinkedIn link, see below. |

### Two things you need to supply

1. **Where submissions go.** The form does not send anywhere. It validates,
   collects and shows the success panel; that is all. This was deliberate so
   you could see and approve the flow before a destination was picked. Whatever
   goes in must not put the answers in a URL - they include a name and an email
   address.
2. **An email address and a phone number.** The reference's left column has
   both. Neither exists anywhere in this repo, so nothing was invented: the
   column offers LinkedIn and the form. Send them and they go into `site`
   beside the booking link, and the mail/phone rows go back in.

## The /about background image - resolution and rights

**Not copy, but it belongs on this list**, because it is the second thing a
visitor sees on the page and neither question is settled.

`docs/assets/about-bg-source.jpeg` is **269x148** - a thumbnail. The band it
fills renders at 1600x880, so it is blown up about 6x, and the scrim over it is
carrying that as much as it is carrying text contrast. It was supplied and
chosen after the trade-off was shown side by side against the alternative.

Two things to settle before launch:

- **A licensed, full-resolution original would fix it for one line.** Point the
  `about` preset at it and delete `restore`. Anything 1600px or wider drops
  straight in.
- **Where is it from?** A 269x148 file named `download.jpeg` has the shape of a
  search-result thumbnail rather than a licensed asset. Every other image on
  this site has a known origin - the client marks, the two bridge clips, the
  team portraits. This one does not, and a commercial site needs it to.

## The nav's "Log in" - a label with no destination

**Added 7 September 2026, and it deliberately does not go anywhere.** There is
no client portal and no URL for one, so the control is an `aria-disabled`
`<button>` rather than a link, visibly muted.

For a few hours it had a destination: a `/login` page shell with disabled
fields and its own drafted copy (`content/login.ts` - a "Client portal" label,
a lede describing mandate documents and investor pipeline, and a notice saying
the portal was not open). **That was removed the same day by request**, along
with the page, so none of that copy is on the site now. `git show f5117a6` has
it.

What is left needing a decision:

- **`site.navLogin` says "Log in".** Two words, verb rather than noun. It is
  the only user-facing string this leaves behind, and it currently promises
  something the site cannot do yet.
- **Is there going to be a client portal at all?** If not, the control should
  come out rather than sit in the header as a permanent "coming soon" - it is
  the only element on the site that advertises a capability that does not
  exist. If yes, the copy above is worth reading before rebuilding the page.

## Supplied by you - not drafted, but worth one check

**The two homepage testimonials** (`caseTestimonials` in `content/copy.ts`) - both supplied, neither drafted.

**Neurable.** Quote, name, role and photo all came from you. One thing to confirm before launch: the portrait is paired with **Dr. Ramses Alcaide**'s name, and a photo attached to a named real person is a factual claim. If that image is a placeholder rather than them, swap it - it is the kind of mismatch that is very hard to spot later and awkward if a reader notices.

**Nobody Studios.** Added 8 Sep 2026, supplied. Three things to know about how it was handled:
- Its quote is the firm's own positioning rather than words from a person, so it carries **no name and no role** and the caption is the company alone. Nobody was invented to make it match Neurable's shape. If there is a named speaker, send it.
- Its picture is the **company logo**, as you asked - the same white mark the card above it uses, contained on a plate rather than cropped like a portrait.
- The dash in *"profitable milestones quickly - because acquisition is the new exit"* was an en dash as supplied and is now a hyphen, following the site-wide dash change made the same day. Say the word if you want the original punctuation back in a quotation.
- **The first of the two paragraphs ends without a full stop** - *"…scaling 100 companies in 5 years for rapid exits"* - exactly as supplied. It has been left alone rather than silently corrected, because it is a client's own words, but it is visible on the homepage and reads as a slip. One character; say the word.
- Both paragraphs now OPEN with a quotation mark and only the second closes, which is the convention for a multi-paragraph quotation. It opened once and closed once until 9 Sep 2026, which read as a quote left hanging. No words changed.

**The two case-study headlines and client lines** (`title` and `subject` on each entry) are supplied too: *"$35M Series closed in 3 months" / "Neurable - BCI (brain computer interface) innovation"* and *"$20M Fund I closed in 4 months" / "Nobody Studios - on a mission to scale and exit 100 AI-native companies in the next 5 years."*

**One record changed under `/customers` as a side effect, and it is a correction rather than a rewrite.** The Nobody Studios entry read *"Campaign produced a term sheet, providing an early capital commitment toward the Series A first close."* It now carries the supplied result - *"32 investor meetings in 4 months. Our protocol resulted in a closed $20M Fund I, in record time."* - with the metric pill moved from "Series A first close" to "$20M Fund I" and the category from **Startups** to **Funds**, since what closed is a fund. Both pages read the one record, so the grid moved with the homepage. **Confirm the fund figure is publishable**, because it is a named client's raise.

**Where those two records are now visible has narrowed since.** On 9 Sep 2026 the homepage slide was rebuilt around a full-column picture and lost the card's top half - the client's logo, the metric pill and the `result` sentence. So `result` renders on `/customers` only, and `metric` renders nowhere at all (it still feeds the `/customers` search box, so it must stay accurate). What the homepage states about these two clients is now the supplied `title`, the supplied `subject`, the supplied quote and the category. The result sentences above are still live copy - just on one page rather than two.

---

## Still needs you - not drafted, not draftable

1. **Footer legal text** (`content/copy.ts`) - currently adapted from the short notice on fundraisr.ai. Should come from counsel.
2. **The four track-record figures - SUPPLIED 8 Sep 2026, and no longer lifted.** You gave these directly:

   | Figure | Label |
   |---|---|
   | `25+` | Active mandates worldwide |
   | `$650M+` | Active dealbook |
   | `850+` | Qualified investor introductions made |
   | `<14 days` | Average time to first investor meeting |

   They replace the five taken from **fundraisr.ai's stats band** on 1 Sep (`30+`, `$2B+`, `600+`, `1.2M+`, `<10 days`), which in turn replaced four from 2024 pages. Two of the questions this section used to raise are now closed: the figures are Avalanche's own rather than another property's, and **"Capital raising powered by Fundraisr"** is gone, so the homepage no longer names Fundraisr inside a headline number. **Three that are still open:**
   - `1.2M+` **Active investor profiles on the platform** was dropped from the block at your direction. **Two of the three remaining citations have since gone:** `/solutions/fundraising` block 02 was replaced by supplied copy on 9 Sep 2026, and that page's meta description was rewritten with it. **One is still live** - the FAQ answer *"1.2M+ investor profiles across venture, private credit, real estate, and private equity"* in `content/faqs.ts`. It is still fundraisr's stat on an Avalanche page; see §4. (`customers.lede` was listed here too and no longer contains the figure.)
   - The hero still carries **`$2B+` in active mandates partners brought in for our clients** (`hero.stat`), a separate claim from the `$650M+` active dealbook two sections below it. Both can be true - different metrics - but they sit on one page and a reader will compare them. Confirm the pairing is what you want.
   - **`<14 days`** and the FAQ's *"clients on our platform average under ten days to a first investor meeting"* now disagree. The FAQ line still says ten. One of the two has to move; see §4.
3. **The booking link - currently a placeholder.** The scheduler at the foot of every page is a panel with a "Book a meeting" button, not a live embed. It points at `https://www.fundraisr.ai/book-demo` (live, and yours) via `site.booking` in `content/copy.ts`. **Send the real calendar link and it is a one-string change.**

   Two notes: that Fundraisr page runs on LeadConnector (GoHighLevel), not Calendly - so if it becomes the scheduler the embed has to be rebuilt, not re-pointed. And the old Calendly event is **not** dead as previously reported: `capital-raise-demo-call-ac-clone` still returns 200 and resolves to "Capital Raise | Strategy Call". If that is the one you want, say so and I will embed it properly. The slug still reads like a duplicate.
4. **Team photographs - FOUR OF THE FIVE ARE NOW AI-GENERATED.** This is the item on this list most worth a decision, because it is the only place the site shows something that is not a photograph and does not say so.

   The five supplied images were five different shoots and never read as a set. Four were regenerated (ChatGPT, 7 Sep 2026) from the originals onto the plain studio backdrop the fifth already had: **Bernardo Almeida, Lev Valestkiy, Bruno Erckmam and Lucas Barrozo**. **Tatjana Sotirovik's is the untouched original.** Bernardo's and Bruno's were replaced a second time the same day, which closed the last thing breaking the row: the first pass matched the backdrop but not the dress, so all four are now square-on in a dark jacket over a white shirt. The masters and the full provenance are in `docs/assets/team/` and the header of `scripts/optimize-team-photos.mjs`; every earlier version, including the original photographs, is in that directory's git history.

   Three things to settle:

   - **Each of the four should see their own before this goes live.** They are altered likenesses of named, identifiable people, and the alteration is not trivial - clothing, setting and lighting have all been replaced. Their agreement is the point, not a formality.
   - **Nothing on the page says the pictures are generated, and nothing says they are photographs either.** That is the current state, not a decision. If the site ever describes them as photography, or a reader could reasonably assume it, a line of disclosure is the cheap fix.
   - **The name-to-photo mapping was derived, not given.** The originals arrived with hash filenames and no captions; the mapping was read out of avalanche-capital.com's own page payload rather than matched by eye. It is very likely right - it returned the same order as `content/team.ts` - but a face attached to a named person is a factual claim, so please confirm all five.

   **A SIXTH PORTRAIT LANDED ON 9 September 2026: Arsenio Renato, Associate.** It came in as a 1254x1254 generative frame supplied directly, so unlike the four above there is no original photograph behind it in this repo and no CMS record to check a name against - the mapping is simply what you told me it was. It needed only a crop (0.72, to put his head on the others' scale; the rest of the set took four passes to match backdrop, dress and angle, and this one arrived matching all three). **Everything in the three bullets above applies to it and the first two apply harder:** he should see the frame that ships, and there is no earlier photograph of him here to compare it against.

   His bio is DRAFT on the same terms as the other five and deliberately thinner: name and title were the only two facts supplied, so it says what an associate does on a mandate and stops.

   A real headshot session for the six of them would retire this whole item.

5. **Case-study categories.** The Funds / Startups classification on the case studies was assigned by the previous session, not taken from source. It drives the `/customers` filter. **Three studies came off the page on 9 September 2026 by request** - Rimla Capital, Catalyst Capital and Foggprevail Capital - leaving ten. That took the **Placement agencies / Investment banks** category with it: Catalyst and Foggprevail were its only two members, and a filter option that can only return an empty grid reads as a segment we serve. The remaining split is eight Startups and two Funds. The `/customers` grid also lost its heading the same day ("From first mandate to billion-dollar deal books."), so the block is now search, filter and tiles with nothing naming it.
