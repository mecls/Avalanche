# Copy review — everything I wrote, and what it was built from

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

**What I did use for voice:** your three blog posts, which I found in the sitemap and which the previous session didn't know about — `solving-for-investor-message-fit`, `how-to-run-cold-email`, `positioning-hierarchical-dynamics-and-investor-relations`. The vocabulary below (mandate-specific investor lists, the segment → message → channel → presentation → diligence sequence, "term sheets not meetings") is lifted from your own writing, not invented.

---

## 1. Offerings — `content/copy.ts`

| Panel | Built from |
|---|---|
| **LP Capital** | The LP screening variables listed in your *Investor-Message Fit* post — strategy, track record, team, fund size, focus, fee structure, minimum commitment. Reframed as what we position against. |
| **Growth Capital** | The existing Deal Readiness panel + the process steps, restated for primary rounds. |
| **Secondary Liquidity** | The thesis line already on the site: "capital, deal flow, or **secondary liquidity**". Expanded, no new claim. |

## 2. Investor verticals — `content/copy.ts`

Both follow the pattern of the **Institutional Investors** entry that *is* on your site: they describe the investor category, they don't promise anything about outcomes.

| Vertical | Note |
|---|---|
| **Accredited Retail** | Deliberately jurisdiction-neutral — "meet the accreditation thresholds of their jurisdiction" rather than naming a rule. Check this against how you're permitted to describe them in your markets. |
| **HNWI / Angels** | Descriptive only. |

## 3. Process step 03 — `content/copy.ts`

**Solving For Conversion.** Steps 01 and 02 were recoverable; 03 was not. Built directly on your own framing: *"the true north isn't marked by mere appointments or meetings, but rather by the tangible milestones of term sheets and signed sub-agreements"*, and the five variables you name — segment, message, channel, presentation, diligence.

## 4. FAQ — `content/faqs.ts`

**Rewritten 1 Sep 2026 against fundraisr.ai's real copy.** There is no published FAQ on any of your properties to lift from — I checked fundraisr's `/faq`, `/platform`, `/solutions`, `/customers` and `/pricing`. So the answers are still written here, but they are now grounded in things your sites actually say: the platform positioning, the 1.2M+ investor figure, the three product pillars, the client types, and "under ten days to a first investor meeting".

That last one is worth a look — **"clients on our platform average under ten days to a first investor meeting"** restates fundraisr's `<10 days` stat as a claim about Avalanche's clients. It follows from the stat, but confirm you're comfortable with the phrasing.

Seven of eight answers are drafted. **Three need your attention:**

| Question | Why it needs you |
|---|---|
| **"How many new clients do you take on?"** | This is a real operating fact, not a positioning choice. I wrote "a limited number at any one time" because it follows from the *Precision & Execution* pillar — but I don't know your actual policy. **Confirm or replace.** |
| **"What is the cost to work with Avalanche Capital?"** | I found no fee information on any Avalanche property, so the answer routes to the intro call. Inventing a number here would be a liability, not a placeholder. Fill in if you want it public. |
| **"Do you guarantee clients raise?"** | Answered **no**, in the language of your own footer disclaimer. Any softer answer would contradict the legal notice further down the same site. I'd leave this one as it is. |

## 5. Team bios — `content/team.ts`

**These describe the role, not the person — on purpose.**

Names and titles are the only facts any Avalanche property makes public; the real bios sit behind "Read Bio" modals that render nothing to the page source. Writing plausible career histories for five named individuals is a different thing from drafting marketing copy: invented prior firms or credentials are exactly the kind of detail a reviewer skims past, and they'd be false statements about real people.

So each line says what the seat does at Avalanche and stops. They read as intentional rather than as gaps, but **they are not bios and shouldn't ship as if they were.** Ask the five of them for two sentences each.

---

## 6. Two homepage sections that are entirely placeholder

You asked for these layouts and said copy would follow. Neither
`avalanche-capital.com` nor `fundraisr.ai` publishes a list for either one — I
checked both, plus fundraisr's `/solutions` and `/customers` — so **all of the
copy below is standing in.**

### "Built for Funds and Operators Raising Growth Capital" — `raiseTypes` in `content/copy.ts`

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

The last two are the ones to check — they claim service lines, and I have no
evidence either way.

### "Industries We Serve" — `industries` in `content/copy.ts`

Ten verticals, **all placeholder.** They are a generic capital-advisory set, not
your list. The lede — *"Industry-agnostic. Multi-stage. From pre-seed to growth
capital, we advise across sectors without limitation."* — is also drafted, and
note it makes a fairly broad claim; confirm it is one you want to make.

Replacing these is just editing the arrays. Each row needs a `name` and an
`icon` key; the available icons are in `components/ui/icons.tsx`, and a new
vertical needs a matching glyph added there.

---

## The /solutions page — two views, and only one of them has copy

**Restructured 4 Sep 2026.** It was one page with a Secondaries block and a
Fundraising block. It is now two routes behind a toggle, five blocks each, and
the copy situation is very different on either side. All of it is in
`content/solutions.ts`.

### /solutions/fundraising — lifted, and this needs a decision

Structure and copy are **fundraisr.ai/solutions**, captured 4 Sep 2026: the
same five steps, in the same order, with their own headings and bodies. It is
published copy from a property you own, so it is not invented and not DRAFT.

**One change was made throughout, and it is the thing to sign off.** The source
names the product in almost every paragraph — "Fundraisr's pre-marketing
agent", "Fundraisr generates personalised messaging", "Fundraisr doesn't just
give you data". Those read as "our" and "we" here. No claim was altered; only
the brand attached to it.

That was the cautious choice, but it is still a choice, and it cuts both ways:

- As written now, the Avalanche site describes these capabilities as
  Avalanche's own. **Confirm Avalanche actually delivers them** — the copy
  describes software (agents, campaign sequencing, a 1.2M-profile database).
  If the answer is "Fundraisr delivers it and Avalanche resells it", the
  wording should say so.
- If you would rather name Fundraisr explicitly, that is a one-pass edit — but
  it is the same positioning decision already flagged under the track-record
  figures below, and the two should be answered together.

The headline figure **"1.2 million investors"** is fundraisr's own stat and now
appears on this page as well as in the track record. Same sourcing question.

### /solutions/secondaries — PLACEHOLDER, awaiting your copy

Only the heading and lede are real: `secondaries.title` and `secondaries.lede`,
both already DRAFT at source. **All five blocks are placeholder** and say so on
the page, in a visible note under each body, so this cannot ship unnoticed.

Nothing here was invented, deliberately. Avalanche publishes no secondaries
process copy anywhere I could find, and writing five plausible steps for a live
financial service would be fabricating a capability — the same reason the team
bios describe roles rather than careers. The five stage names (Position review,
Pricing, Counterparties, Process, Close) describe the general shape of a
secondaries mandate, not yours, and the first block says exactly that.

**Send the copy and this is a paste job** — five titles and five bodies, then
delete the `pending: true` flags.

### The artwork — six schematics, and four cards still blank

`MEDIA` in `solutions-steps.tsx` is keyed on block id, so a diagram only
appears on a block it genuinely describes. **Fundraising is now drawn in
full**; Secondaries has one of five.

| Block | Graphic | Note |
|---|---|---|
| Fundraising 01, Pre-marketing | Three raise inputs converging into one outlined package | The convergence *is* the claim — separate inputs resolving into positioned materials. |
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

### The diagrams — illustrative, not data

`components/ui/solutions-media.tsx`. Both are schematics: anonymous positions,
generic sector names, no real counterparties, no figures. Which block each one
sits on, and why the other eight cards are blank, is in the section above.

Both were drawn in gold, and have since followed the palette through obsidian
to the brand blue `#3056EE` without a single value in `solutions-media.tsx`
changing — they are written against the `accent` role, not a colour.

These replaced `public/solutions/{secondaries,fundraising}.webp`, which carried
a hardcoded blue belonging to no token and rendered soft at display size. The
accent is itself blue now, which does not make that art right: the objection
was the one-off literal, not the hue.
Both files have been **deleted** — they are recoverable from `d797028^` if the
old artwork is ever wanted back.

---

## Supplied by you — not drafted, but worth one check

**The Neurable testimonial** (`testimonial` in `content/copy.ts`) — quote, name, role and photo all came from you, so none of it is drafted. One thing to confirm before launch: the portrait is paired with **Dr. Ramses Alcaide**'s name, and a photo attached to a named real person is a factual claim. If that image is a placeholder rather than them, swap it — it is the kind of mismatch that is very hard to spot later and awkward if a reader notices.

---

## Still needs you — not drafted, not draftable

1. **Footer legal text** (`content/copy.ts`) — currently adapted from the short notice on fundraisr.ai. Should come from counsel.
2. **The five track-record figures.** These were replaced on 1 Sep 2026 with the numbers from **fundraisr.ai's stats band**, at your direction:

   | Figure | Label |
   |---|---|
   | `30+` | Active mandates worldwide |
   | `$2B+` | Capital raising powered by Fundraisr |
   | `600+` | End-to-end qualified investor introductions facilitated |
   | `1.2M+` | Active investor profiles on the platform |
   | `<10 days` | Average time to first investor meeting |

   They replace the previous four (`$2B+`, `$300M+`, `200`, `$600M+`), which came from 2024 pages. **Two things to check before launch:**
   - These are still marketing figures lifted from another property rather than confirmed numbers. They are the most load-bearing claims on the site and the first thing an investor will test.
   - **"Capital raising powered by Fundraisr"** names Fundraisr on the Avalanche site. That is accurate — same owner — but it is a positioning decision, not a neutral one. Confirm you want the two brands linked this explicitly here.
3. **The booking link — currently a placeholder.** The scheduler at the foot of every page is a panel with a "Book a meeting" button, not a live embed. It points at `https://www.fundraisr.ai/book-demo` (live, and yours) via `site.booking` in `content/copy.ts`. **Send the real calendar link and it is a one-string change.**

   Two notes: that Fundraisr page runs on LeadConnector (GoHighLevel), not Calendly — so if it becomes the scheduler the embed has to be rebuilt, not re-pointed. And the old Calendly event is **not** dead as previously reported: `capital-raise-demo-call-ac-clone` still returns 200 and resolves to "Capital Raise | Strategy Call". If that is the one you want, say so and I will embed it properly. The slug still reads like a duplicate.
4. **Team headshots.** Monograms stand in. The Framer originals are low-resolution; send better ones if they exist.
5. **Case-study categories.** The Funds / Startups / Placement-agency classification on all 13 case studies was assigned by the previous session, not taken from source. It drives the `/customers` filter.
