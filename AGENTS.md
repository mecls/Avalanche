<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Avalanche Capital - project rules

Written by hand. The block above is managed by `next dev`; this part is not, and
should be kept.

## Read these first

- `README.md` - current state, design system, scripts, open items.
- `docs/COPY-REVIEW.md` - which copy was drafted rather than sourced, and why.
- `docs/BUILD-NOTES.md` - history. **Its banner is now out of date**: it warns
  that sections 1–2 and 4 describe a superseded farahcap.com design
  (serif/gold). The site has since been rebuilt AGAINST that reference, so
  those sections are closer to the truth than the banner claims. Trust the code
  and this file over both.

## Design system

`app/globals.css` is the whole thing - there is **no `tailwind.config`**, and
Tailwind v4 is used CSS-first.

The **layout** is a clone of farahcap.com. The **type** is not: the site runs
Satoshi on everything, which is fundraisr.ai's face. It has now been through
both systems and back - fundraisr's (Satoshi, flat type, no accent), then the
farahcap serif rebuild, and since 4 Sep 2026 farahcap's layout carrying
fundraisr's face plus the accent. A doc claiming "no serif, no accent colour"
is half right by accident: the serif is gone again, the accent is real.

- **The logo is `components/ui/logo.tsx`, and it is INLINE SVG for a reason.**
  Supplied 7 Sep 2026 as `avalanche-logo.svg`; it replaced the 26px Satoshi
  wordmark in the nav and the 30px one in the footer. **BOTH paths are
  `currentColor`** - wordmark and mark - which is the whole trick: the nav is
  transparent over whatever band opens the page, so on `/customers`, `/about`
  and `/solutions/*` a hardcoded white lockup is invisible. An `<img>` cannot
  do that, which is why it is not one. The artwork says "Avalanche", not
  "Avalanche Capital"; the footer carries the full name in an `sr-only` run and
  the nav in its `aria-label`.
- **Nav `h-7`, footer `h-9`, and only the second one is a measurement.** `h-8`
  was the derived match - a 19.35/32 wordmark against 26px Satoshi's 19.24px
  cap height - and the nav was shrunk off it by request on 7 Sep 2026. The
  footer's `h-9` still sits on that page's own 30px display text. Do not
  "restore" the nav to `h-8` for consistency with the derivation; it is smaller
  on purpose.
- **The mark is FLAT, and it used to carry a blue gradient.** Changed by
  request on 7 Sep 2026 - totally black or totally white, following the page.
  It went with a `<pattern>`, a `<defs>`, 7KB of base64 inline on every page
  and the `patternId` prop, which existed only to keep two instances' ids
  apart. **Do not reintroduce a `patternId` or a `<defs>` without the colour
  coming back too.** The original artwork is kept at
  `docs/assets/avalanche-logo.svg` and `git log -S MARK_TEXTURE` has the
  downsampled texture, if it ever does.
- **Still do not put `logo-mark` on it.** The reason changed but the rule did
  not: that class inverts an element inside a light band, which is how the
  pre-flattened client marks survive one. This lockup already inverts through
  `currentColor` - inverting it twice makes it wrong on both bands rather than
  right on either.
- **`CtaButton` sets its own `display`, so `className="hidden"` does not hide
  it.** Tailwind emits `.inline-flex` after `.hidden` at equal specificity, so
  the base class wins on source order. Use a variant - `max-md:hidden` - which
  is emitted after both. The nav's ghost button rendered on every phone for
  months because of this; it was invisible glass until the border landed, which
  is why nobody caught it.
- **ONE face, and it is self-hosted.** Satoshi on every heading, figure, body
  run, button and nav item. There is no secondary display face and **no serif
  anywhere**. It is a Fontshare release, not on Google Fonts, so it loads via
  `next/font/local` from `app/fonts/Satoshi-Variable.woff2` (42KB, one file) -
  do not try to reach for `next/font/google` here. `weight: "300 900"` declares
  the file's real `wght` axis, so 400/500/600 all interpolate from that one
  file.
- **Nothing may be set in italic.** This build of Satoshi has no `ital` or
  `slnt` axis and reports `italicAngle: 0`, so an `italic` class anywhere is a
  browser-synthesised fake slant. The hero H1's lead words and the closing
  note both dropped theirs when the face landed. Adding an italic means
  shipping `Satoshi-VariableItalic.woff2` (~43KB) alongside the roman.
- **The display sizes came DOWN with the face and that is not a mistake.**
  Satoshi's x-height is 0.500em against Cormorant's 0.386em (+30%) and its cap
  height 0.740 against 0.625 (+18%), so the same number renders a visibly
  bigger heading. 80→72 and 58→52 hold the optical size the pages had. Setting
  them back to 80/58 does not restore the old design, it enlarges it. The
  `display` utility moved with them: weight 400→**500** (a grotesque at Regular
  reads as body copy set large), tracking -0.04em→**-0.025em** (-0.04 is a
  serif-display value that closes a grotesque's letterfit up), leading solid→
  **1.05**.
- **Two small-uppercase runs, and they are not interchangeable.** `eyebrow`
  (14px/**600**, **accent**) labels a section *inside* a page and renders a
  dozen times on the homepage. `page-label` (14px/**500**, no colour of its
  own) labels the *page itself*, above the 72px H1. The page-name use takes
  `text-accent` at the call site to match the eyebrows; the `/solutions` block
  labels and rail numbers use the same utility and deliberately stay ink,
  because they sit against the accent rail and both diagrams. Do not fold
  either utility into the other and do not put the colour into `page-label`
  itself.
- **THE CARD IDIOM ON THIS SITE IS `BracketGrid`, NOT FILLED PANELS.** Square
  corners, a hairline lattice (`border-t border-l` on the wrapper,
  `border-r border-b` per cell), a 13rem floor, a faint grey TABULAR index in
  the top-RIGHT, the title pushed down by `justify-between`, and two offset
  crop-mark brackets. Five sections use it - track record, who we work with,
  verticals and "Why Avalanche" on /about, plus raise types over on
  /solutions/fundraising. **Do not build a new card block as rounded filled
  panels on a gap grid**: /about shipped two of those and they were the single
  biggest reason the page read as a different template. Cells may go without
  an icon (`TrackRecord`, `Thesis` and `WhoWeWorkWith` do); `components/ui/
  icons.tsx` is a set of SECTOR marks, so do not force one onto an abstract
  block. **The track is sized to the CELL COUNT, not chosen once**: 6 for the
  five-cell raise types (3+3 then 2+2+2), 6 for the four-cell track record
  (2+2), 3 for the three-cell who-we-work-with. A count that does not divide
  needs `trailingSpans` from `bracket-grid.tsx` rather than a hand-written
  span, and a `sm:col-span-2` patching the 2-column breakpoint has to be
  undone again at `lg`.
- **EVERY BLOCK ON `/about` IS `min-h-svh` EXCEPT THE FIRST AND THE LAST**
  (7 Sep 2026, by request). The thesis, the divergence, the beliefs and the
  team take the floor. The track record was on that list until it came off
  the page on 8 Sep 2026; the layer sequence never was, because its runway is
  400svh and a one-screen floor would do nothing to it.
  The **page header** does not - a label, a two-line H1, a lede and a button
  with a screen of white round them read as an empty page. The **closing CTA
  band** does not either, and that one is not a taste call: it is the same
  component on all five routes and has to read the same size on all five, so
  do not pass it a height from one page. It is a FLOOR - the team grid and
  the beliefs list were already taller and did not move. `svh`, not `dvh`
  (remeasures as a phone's URL bar hides, relaying out mid-scroll) and not
  `vh` (the LARGE viewport on iOS, so the last line starts under the browser
  chrome). One `FULL_SCREEN` const in `app/about/page.tsx`, so the call sites
  cannot drift; if the header ever takes it, it needs
  `calc(100svh - var(--header-h))` instead, because `main` reserves the nav's
  height as padding above it.
- **THE THREE ACCESS LAYERS ARE THREE SLIDES IN ONE PINNED STAGE.** They were
  a ruled three-row list beside one static plate until 7 Sep 2026, then three
  full-screen panels in flow, and both had the same fault: the next layer's
  picture arrived a screen BELOW the last one, so the reader travelled to it
  rather than watching it replace what was there. Now a 400svh runway holds
  one `sticky` stage with the three slides stacked absolutely inside it, and
  only opacity changes. `.layer-seq` / `.layer-stage` / `.layer-slide` /
  `.layer-col` in `globals.css`; no client component.
  - **`--layer-h` IS THE ONE NUMBER THE WHOLE BLOCK IS TUNED AROUND**, and it
    is a MEASUREMENT, not a taste call: the tallest of the three text
    columns, 697px, set by panel 02's four "Why This Segment" reasons. It is
    the stage's height AND the column floor, so re-measure after any copy
    change in `layers` - AND after any change to `.shell`, which is what took
    it from 677px to 697px on 8 Sep 2026. **Measure at a 1200px viewport, not
    at 1440.** The body copy is capped at 560px, so above ~1280 the column is
    wider than its own measure and panel 02 settles at 677px; at the 1200px
    gate the column is 522px, the reasons re-wrap, and it grows to 697px.
    Set it to 0, read the three columns there, take the largest. Too small
    and panel 02 spills out of the stage in exactly that band; too large and
    all three carry dead space. It drops to 649px under `max-height: 800px`,
    which used to be the PLATE's own ceiling and is now ~8px of air over the
    tightened panel 02 (641px at 1200) - read the comment there before
    lowering it further, because the plate is the end that cannot tighten.
  - **The stage is sized to the PANEL and pushed down with `top`, not sized
    to the screen.** `top: 0; height: 100svh` put half the leftover viewport
    INSIDE the stage above the picture - invisible once pinned, and a ~190px
    hole under the section heading before it pinned, which is the state a
    reader arrives in. The current form puts the identical composition on
    screen when pinned and no gap under the heading.
  - **The column floor lives in CSS, not on the element**, because it must
    apply only where the stage does. In the fallback - under 1200px, without
    scroll-driven animations, or under reduced motion - the slides are in
    flow, nothing needs aligning, and a floor is ~380px of dead space under
    panels 01 and 03.
- **THE THREE PANELS TAKE THREE DIFFERENT PICTURES, keyed on the layer's
  ordinal** in `LAYER_MEDIA` - the same reason /solutions keys `MEDIA` on a
  block id. One diagram drawn three times with a different ring emphasised
  was tried first and read as a repeat; a `focus` prop on
  `AccessLayersDiagram` went with it. **Two of the three are still not
  pictures of their layer** - the threshold is about which issuers sit inside
  the segment, both sides about counterparties returning. They used to hang a
  `Figure` claim line under the plate to say so; since 8 Sep 2026 they carry
  SUPPLIED COPY OF THEIR OWN in the text column instead - `aside` in
  `content/manifesto.ts`, where panel 01's paragraph names the mandate the
  threshold diagram draws and panel 02's fourth reason is the both-sides
  flow - and the captions came off with it. **Do not put a caption back
  beside an aside**: `mandate.note` restates panel 01's paragraph and
  `bothSides.buy.detail` is a legend the diagram already draws inside itself,
  so running both states one claim twice on one screen. All three panels are
  bare `Plate`s now and `LAYER_MEDIA` is a diagram per ordinal, nothing else.
  Still do not retitle a layer to fit the picture beside it; that makes a
  picture claim something it does not show, which is the trap the asides were
  written to avoid.
- **`/about` IS `/team` AND `/manifesto` MERGED** (7 Sep 2026, by request).
  One route: the thesis, then the three manifesto sections, then the
  portraits. **The team is the LAST block before the closing band** - it sat
  third until 8 Sep 2026, where the reader met five faces before being told
  what the firm believes. `CtaBand` still ends the page; the team moved to
  the end of the ARGUMENT, not past the site's ending. Both old paths 307 to
  it in `next.config.ts` - `/manifesto` to `#manifesto`, the id on the
  divergence section. Three things this changed
  that are easy to undo by accident. **The page opens LIGHT and `/team` did
  not**, so the two `main > :first-child[data-band="light"]` rules in
  `globals.css` now apply to it - keep the header section first and banded, or
  the nav renders white on white. **Bands alternate every section**, which is
  why nothing here carries a `border-t` and why the team grid is
  `data-band="dark"` (that is what keeps it looking as it did). And
  **`components/sections/thesis.tsx` is MOUNTED again** - it had been unmounted
  since 1 Sep, and while it was, `/team` borrowed its "Both Sides of The Table"
  pillar as its own heading and lede. The team block has its own heading now
  (`about.team`); if the thesis is ever unmounted again, that is what to check.
- **`/solutions`, `/customers` and `/about` share ONE page header, and it is a
  COMPONENT now** - `components/site/page-header.tsx`. Same `page-label`, same
  `display display-72 text-[72px]` on the same 809px step-down to 40px, same
  16/24 lede, same 720px/680px measures, same `items-end` row with the CTA hard
  right and a trailing `ArrowGlyph`. The first two were separate builds until
  4 Sep 2026 and had drifted to a *different value in every row* - 64px vs 80px
  H1, 600-weight grey label vs 500-weight ink, 15px lede vs 16px, a 576px
  column vs 720px - so they were hand-aligned, and then collapsed into one
  component rather than let a third page make a third copy. Two traps it has to
  keep holding: `display-72` has **no base rule** (it exists only inside
  `@media (max-width: 809px)`, so `text-[72px]` beside it is the base size),
  and `page-label` carries no colour of its own - the accent is applied at the
  call site. It renders only the inner `shell` div and the `<section>` stays
  with the caller - which was worth keeping for a reason that has now expired:
  `/customers` used to add `flex flex-col overflow-hidden` there for the venture
  strip it hung below the header, and that strip came off on 9 Sep 2026, taking
  the three classes with it. All three headers are now a bare
  `<section data-band="light">`. Keep the split anyway; the next page that
  hangs something under its header will want it. The type spec itself lives in
  `globals.css`.
- Colour tokens are named by **role**, never by hue: `ground`, `ground-deep`,
  `ground-alt`, `card`, `fg`, `fg-muted`, `fg-faint`, `line`, `line-soft`,
  `accent`. Do not reintroduce hue names, and do not hardcode a hex or
  `bg-white` in a component - a light band would break it. `accent` was
  `gold` until 4 Sep 2026 and was renamed with the colour; `git log -S
  "--color-gold"` has the old values.
- A light section is `data-band="light"` on the `<section>`. That single
  attribute re-points every token for the subtree, which is why shared
  components take no `tone` prop. `data-band="dark"` goes back the other way,
  and nesting is real: the `/solutions` media cards are dark plates inside a
  white section, and the SVG diagrams inside them are written against `fg`,
  `line` and `gold` without knowing which page they are on.
- **A page whose first section is light needs `main` painted too.** `main`
  reserves `--header-h` of *padding* for the chrome, and padding shows the
  element's own background - which was nothing, so the strip showed the dark
  `<body>` ground. Invisible on a dark-first page; on a light-first one it put
  a black bar under the announcement bar with the whole nav rendered in ink on
  top of it. One `:has()` rule in globals.css fixes it, paired with the one
  that flips the header's colour. It must use `--color-paper`, not
  `var(--color-ground)`: `main` is outside the light band, so its own
  `--color-ground` still resolves dark.
- **The accent is the brand blue `#73B6FF`** (8 Sep 2026, by request; it
  replaced `#3056EE`) - but the LIGHT-band value is `#0063cc` and that is not
  an oversight. `#73B6FF` is already a light blue, HSL 211/100%/72.5%, so it
  measures 2.1:1 on white: under even the 3:1 large-text floor, and the
  eyebrows it would carry are 14px. So a light band takes a true darkening of
  the same colour - hue 211 and saturation 100% held, lightness 72.5% → 40% -
  and lands at 5.7:1 on white, within a hair of where `#3056EE` sat. **The
  derivation is the reverse of the one it replaced and the reason is
  unchanged**: one specified value cannot clear 4.5:1 on both a `#151515` and
  a `#ffffff` ground, so the band that can take it as given takes it and the
  other is derived from it. Under `#3056EE` that was the light band; under
  `#73B6FF` it is the dark one.
- The measured distances that keep it working: 8.6:1 on `#151515`, a 2.1:1
  step down from `fg` (so it reads as its own colour, not as white), and a
  3.0:1 step up from a ghost dot - the 50%-opacity `fg-muted` the `/solutions`
  diagrams draw unmatched routes in, where equal luminance separated only by
  hue is what disappears for a colour-blind reader. The step from `fg` is the
  one number that got worse (2.4:1 under `#8aa4ff`) and hue buys it back: a
  sky blue separates from white far more visibly than the old periwinkle did.
  Hue does most of the signalling now, the way gold's did; the luminance step
  is the fallback for readers who cannot use the hue. Keep both.
  **Lightening the light-band value toward the brand value is the tempting
  mistake** - more on-brand in isolation, and it takes every eyebrow on
  `/about`, `/customers` and the homepage with it.
- **The accent appears in THREE places. That is the whole list.** The section
  eyebrows and page labels (`eyebrow`, plus `text-accent` on the two page-name
  `page-label` runs) - a block's own name, and the largest group; the
  /solutions rail and its diagrams (functional - the colour is the
  diagram's only way of saying which route matched, which segment was
  selected, which branch was taken); and the CTA band's chip (once per page,
  at the conversion point). Everything else is monochrome.
  **It was FOUR until 9 Sep 2026** - the fourth was the case-study metric
  pill, one number once per page, and it came off with the top half of the
  homepage's proof card by request. Nothing else rendered it: `/customers`
  draws its grid with `CaseStudyTile`, which never carried one. So the pill is
  gone from the site, not merely from that block. Two consequences worth
  knowing before "restoring" it. The homepage's accent is now eyebrows and one
  CTA chip, which is a quieter page than the list above described. And the
  case-study CATEGORY went monochrome in the same change - it wore `eyebrow`,
  so it was accent-coloured, and small uppercase accent type on a card reads
  as a link when it goes nowhere; it is an outlined muted tag at its call site
  now. Do not put either colour back on its own.
- **The eyebrow rule has moved twice in one day - read this before moving it a
  third time.** It was accented, judged too much, reverted, then asked for
  again specifically (4 Sep 2026). The middle step was a judgement about the
  accent being *everywhere* - `BracketGrid` corner brackets, the raise-types
  and verticals icons, the FAQ `+`, the /customers search and filter glyphs,
  the team monograms, the /solutions block labels - not about the eyebrow.
  Those all stayed monochrome and each carries a comment saying why; read it
  before re-colouring one. **If the accent ever has to be pulled back again,
  pull those first and the eyebrow last.**
- The working rule is still that an accent marks what a reader should act on
  or navigate by, not every mark on the page. An eyebrow passes because it
  names the block; a corner bracket, an icon in a twelve-row grid and a
  placeholder monogram do not.
- One layout change made purely to host the colour was unwound and has stayed
  unwound: the eyebrow added to `TrackRecord`'s `rows` variant, along with
  `customers.gridEyebrow`. A layout change made to host a colour should not
  outlive the colour, even when the colour comes back.
- **The HERO is exempt whatever happens above and must stay monochrome.** It
  uses `eyebrow-pill` and `strip-label`, separate utilities precisely so an
  `eyebrow` rule cannot reach it. Their contrast is measured against moving
  footage, not a flat band. Do not fold them into `eyebrow`.
- **`eyebrow` is the only place the accent carries SMALL type** (14px/600), so
  it needs the full 4.5:1 rather than the 3:1 large-text floor - and it lands
  on four different grounds. Measured: `#0063cc` is 5.7:1 on `#ffffff`, 5.5:1
  on `#fafafa` and 5.2:1 on `#f3f3f3`; `#73B6FF` is 8.6:1 on `#151515` and
  7.7:1 on the `#202020` card. **Any future accent has to clear 4.5:1 on all
  five before it can go here**, which is a much harder test than the diagram
  pills alone used to impose - and it is the test `#73B6FF` fails on the light
  grounds, which is why that band derives its own value rather than taking the
  supplied one.
- `--color-accent-light` / `--color-accent-deep` are the rail gradient's stops,
  **held constant across bands**, decorative only. `--color-accent` follows the
  band so type set in it clears contrast either way; that flip is wrong for a
  graphic carrying no text. Both are calibrated for the light `#eeeeee` track
  that is their only home and would be invisible on dark. Never set type in
  either. `accent-deep` is the brand value exactly, so the rail terminates in
  it - it therefore coincides with the light-band `accent` today, which is a
  property of this palette rather than a rule. Do not collapse the two.
- `bg-fg text-ground` is a white button on dark and a black button on light
  **from the same markup**. Preserve that property.
- **The three dark grounds are deliberately the same `#151515`.** The reference
  runs one dark value, not a ramp. Components that reach for `ground-deep` or
  `ground-alt` still work; they just no longer band against each other.
- Check contrast when changing a token. A previous palette shipped its faint
  token at 2.9:1 while it carried every eyebrow and all the footer legal text.
  The **accent** is the trap here, for the reasons two bullets up: the dark and
  light values are not the same colour and must not be "unified", and its
  distance from its neighbours matters as much as its distance from the ground.

## Client components

Five: `nav`, `track-record`, `case-study-grid`, `contact-form` and
`ui/slide-link`. The first three read EXTERNAL state, which is why the
`useSyncExternalStore` rule below exists; `contact-form`'s step and answers are
its own, so plain `useState` is correct there and that rule is not in play.

**`slide-link` is the fifth and it holds NO STATE AT ALL** - no `useState`, no
effect, nothing to hydrate but a click handler. It is the prev/next control of
the homepage case-study carousel, and it exists only because **a fragment
navigation does not reliably drive a horizontal scroll container**: the
controls shipped as bare `<a href="#slide-id">` on the reasoning that the
scroll position is state the browser already keeps, and they did not move it.
`scrollIntoView` on the same element does. The file's own comment has the
measurements and what was ruled out; read it before deleting the island and
"simplifying" back to an anchor. **Do not widen the boundary**: the studies,
the cards and the quotes are all still server-rendered, and the carousel
itself is CSS scroll-snap, so swipe and trackpad work with the island absent
entirely. **`/solutions` deliberately adds
none** - its scroll-linked rail and text reveal are CSS `view-timeline`,
not JS. Keep it that way; see "The solutions timeline" in `README.md` before touching
it, including why the reduced-motion guard has to say
`animation: none` rather than rely on the global duration override.

**`/about`'s layer sequence adds none either, for the same reason.** The three
access layers are three slides stacked in one `sticky` stage, crossfading in
place as a 400svh runway scrolls past - `.layer-seq` / `.layer-stage` /
`.layer-slide` in `globals.css`, `view-timeline` again, no JS.

**`/about` NOW HAS NO CLIENT COMPONENTS AT ALL.** Its only one was
`TrackRecord`'s count-up, and the track record came off the page on
8 Sep 2026 by request. The page is server-rendered end to end, and the layer
sequence is what would break that first - keep it CSS.

**This is why the Fundraising/Secondaries views are TWO ROUTES and not a tab.**
A stateful tab would have made the whole of `/solutions` a client component and
restarted the view-timeline animations on every switch. If a third view is ever
added, add a route - do not reach for `useState` here.

**Switching between them is the NAV DROPDOWN's job and only its job.** An
on-page segmented toggle did the same thing for part of 4 Sep 2026 and was
removed as redundant: the dropdown already lists both, from every page rather
than only from these two. `git show 58684ea` has the toggle if it is ever
wanted back. The dropdown adds no state either - it opens on `:hover` and
`:focus-within`, and uses `visibility` rather than `display` so its links are
untabbable while closed and focus can only reach them through the trigger.

- **External state is read with `useSyncExternalStore`**, never mirrored into a
  `useState` + `useEffect`.
- Reset-state-on-prop-change is done **during render**, not in an effect (see
  the mobile sheet in `nav.tsx`).
- `npm run lint` enforces this via `react-hooks/set-state-in-effect` and is
  currently clean. Do not suppress the rule.
- `nav.tsx` used to carry a scroll + resize subscription to measure the band
  beneath a *fixed* header. The header is now **absolute** and scrolls away, so
  it only ever sits over the first section - the whole thing collapsed to one
  `:has()` rule in globals.css. Do not reintroduce the listener.

## Things that look wrong but are deliberate

- **The chrome is ONE element and nothing on the site is `fixed`.** An
  `absolute` 79.2px nav at `top:0` that scrolls away, published as
  `--header-h`; `main` reserves it and the hero cancels it with a negative
  margin. It used to be two - a `fixed` 37px announcement bar sat above the
  nav, and `--header-h` was the 116.2px sum - but the bar was removed on
  4 Sep 2026, taking `--header-bar-h` and `--header-nav-h` with it. Its copy
  is kept but unrendered as `announce` in `content/copy.ts`. **Keep the
  reservation**: the spec said to drop it too, which is right for a one-page
  reference and wrong here - on the three routes without a hero, an absolute
  nav with no reserved space lands on top of the first heading.
- **`accent` keys in `content/copy.ts` are still ignored**, even now that the
  accent is everywhere else. It carries eyebrows, graphics and glyphs - not a
  word inside a headline. Every heading on the site stays monochrome, which is
  what keeps the accent reading as a system rather than as emphasis. Kept, not
  rendered; the emphasis points are editorial information worth keeping.
- **The hero H1 breaks on authored lines.** `hero.titleLines` in
  `content/copy.ts` holds two entries, a `lead` plus a `rest`. It is content,
  not layout, which is why the break is not a `<br>` in the component. The
  `lead` used to be italic and is not any more - see the no-italic rule above.
- **The hero H1 is sized in `cqw`, off its own column, and that is the only
  thing keeping the authored break.** It reads `clamp(1.75rem,10.4cqw,64px)`
  against an `@container` on the text column. The ratio is a measurement, not
  a taste: `"advisory with an edge"` is 9.36× the font size wide, so it fits
  while size ≤ colW/9.36 = 10.68cqw, and 10.4 is that with margin. A fixed
  size cannot work - the column is `flex-1` of a two-column row from 768px up,
  so it is only 342px wide at 768 and 598px at 1280, and a flat 64px (a 599px
  line) wraps to three lines everywhere below ~1282px. **This is the clamp the
  note in `globals.css` warns against**; an arbitrary one reflows the break,
  this one is derived from it. The old 809px step-down was removed with it and
  must not come back - a fixed size there wins and the third line returns.
  Verified 2 lines at 360/390/430/600/800/810/900/1100/1280/1440/1920.
  If the headline copy changes, re-measure the longest line and re-derive.
- **`items-end` on the hero content row is the composition.** It is what puts
  the bottom edge of the CTA button and the bottom edge of the stat label on
  one baseline (measured: both at y=842). Change it to `center` or `start` and
  the hero stops matching the reference.
- **The hero scrim is two stops, 0.44 → 0.60, in `#151515` - not black.** It
  replaced a five-stop per-clip gradient opening at 0.93 that crushed the
  footage. What makes two stops safe is that every text run in the hero is pure
  white and the type is large. If a future clip drifts a blown highlight under
  the text, re-derive rather than deepening this uniformly.
- **`public/grain.png` is load-bearing, not decoration.** The scrim is one long
  gradient across the viewport, which is the textbook case for 8-bit banding;
  the grain dithers it, and is why the scrim can be this light. Regenerate with
  `scripts/make-grain.mjs`. It is 256px, not the reference's 720px, because
  per-pixel random alpha barely compresses (387KB vs 30KB) and grain must
  render 1:1 - **keep `backgroundSize` in `hero.tsx` in step with `SIZE`**.
- **Every text run in the hero is `fg`, never `fg-muted`/`fg-faint`.** The
  muted tokens are calibrated for flat grounds; on a photograph contrast has to
  be measured against the brightest column each run crosses.
- **`.shell` is 1440px with a `clamp(20px, 5%, 72px)` gutter** (widened from a
  fixed 20px on 8 Sep 2026, by request - the content sat against the glass in
  a 1200-1440 window). The CAP is the load-bearing half: an uncapped
  percentage is what the old `clamp(1.25rem,4vw,2.5rem)` did, and it kept
  widening the gutter on a large screen, which is what made the page read
  pinched. 72px is 5% of 1440, so the gutter stops growing where the shell
  does and the content box holds 1296px from 1440 up. Percent, not `vw` -
  `vw` includes the scrollbar. Two derived numbers move with it and are
  documented at their own sites: `--layer-h` on `/about` (the columns lost
  ~52px each, so panel 02 re-wraps at a 1200px viewport and the stage is
  697px, not 677px) and the `/solutions` diagram scale, whose desktop floor
  drops from 9.5px to 8.8px in a 1200-1240px window. **Re-measure both after
  any further change here.**
- **`.section-y` is a fixed 120px.** It was clamped once and resolved to
  52-72px, roughly half the reference rhythm, which is what made the page read
  cramped on a large screen. That is also the history behind the shell's cap
  above: a gutter is allowed to grow with the viewport, a section rhythm is
  not, and neither is allowed to grow without a ceiling.
- **All white-on-transparent marks must carry `logo-mark`.** Client marks
  (`scripts/logos-to-alpha.mjs`), the hero strip, and now the **case-study**
  logos, which are pure white (measured mean luma 255) and were invisible the
  moment their section became a light band. `globals.css` inverts anything with
  that class inside `[data-band="light"]`. Do not add a blend mode instead, and
  re-run the script after adding logos.
- **THERE IS ONE LOGO STRIP LEFT: the hero's.** It is full-bleed, outside
  `.shell`, 100px tall on its own translucent blurred ground over the video -
  running edge to edge is the point there.
  The `/customers` venture strip was the second and was REMOVED on 9 Sep 2026
  by request. It is worth knowing why it was shaped the way it was, because
  the reasoning applies to any strip that goes back: it sat INSIDE `.shell`,
  so its rule and its marks lined up with the page label, the H1 and the CTA
  above them. It was full-bleed until 4 Sep 2026 and was the only thing on that
  page not aligning with the text. **Do not "unify" a new strip with the
  hero's**: one sits on footage, the other would sit on the same flat white as
  a heading it belongs to.
- `logo-marquee.tsx` needs its `overflow-hidden` at either width: the scrolling
  row is far wider than the box and `mask-image` defaults to
  `mask-repeat: repeat`, so without clipping the fade gradient tiles and the
  strip reads as a few logos with holes. Its 8%/92% mask and its scroll
  distance are both independent of the container - the mask is a percentage of
  its own box, the distance is set by the content - so narrowing it changes
  neither the fade nor the speed.
- **The hero strip label is not the reference's wording.** The reference says
  "Representative investors & strategic partners"; that strip carries CLIENT
  marks, and `customers.logoNote` states they are past engagements. Calling
  past clients investors or partners would be a claim the site cannot support.
  Same shape, accurate words - see `hero.stripLabel`.
- **THE THESIS IS NOT IMAGE-BACKED ANY MORE** (8 Sep 2026, by request). The
  second block on `/about` carried a city skyline behind the same
  image/scrim/grain stack the hero and the closing band use; all three layers
  came off together, because the scrim existed only to make the photograph
  legible under the lattice and the grain only to dither the scrim. The band
  is the flat `#151515` the scrim was ramping to anyway, painted by
  `data-band="dark"` alone - which is now the ONLY thing painting it, and also
  what points `border-line` at the value the lattice needs. **Put the picture
  back and all three go back**: the scrim was measured against that specific
  still and `CtaBand`'s flatter left-weighted ramp does not transfer, because
  the lattice spans the whole shell rather than one column. The asset and its
  preset survive (`scripts/optimize-bg-video.mjs about`), so it is a revert,
  not a rebuild. This also means the light header now cuts straight into a
  dark band with nothing softening it - see the note in `app/about/page.tsx`
  for why that is the wanted state and not a regression.
- **The closing CTA band is image-backed, not video-backed.** It uses the hero
  POSTER: the block sits at the bottom of a long page, so a second autoplaying
  video would decode continuously for something most readers never reach, and
  the still is already cached from the hero. It carries the same image/scrim/
  grain stack, but the scrim is left-weighted rather than vertical because the
  type sits in one left column.
- **THE NAV'S "Log in" GOES NOWHERE, AND THAT IS THE POINT.** There is no
  portal, no auth of any kind in this repo, and no URL for one. It is an
  `aria-disabled` `<button>`, not an `<a>` - a link to `#`, or to a route that
  exists only to receive it, puts a destination in the DOM and the status bar
  that does not exist, which is a worse lie than a control honestly marked
  unavailable. `aria-disabled` rather than `disabled` keeps it in the tab
  order; `text-fg-muted` and no hover state are the visible half of the same
  message. **Do not give it an href until there is a real one**, and do not
  re-add a `/login` route to have somewhere to point - that was tried for one
  commit and removed (`git show f5117a6`). This nav has now reached the same
  answer twice; the first `LoginPlaceholder` is in `82037e3`.
- **`components/sections/booking.tsx` is no longer mounted.** The closing band
  replaced the two-column heading + booking-panel layout with the reference's
  single-column one; its button goes straight to `site.booking`. Kept, not
  rendered, like the other unmounted sections.
- **The `/solutions` media cards are the layout's load-bearing element.** The
  card is `flex:1 0 0` with `aspect-ratio: 1.05098/1`; the ROW takes its height
  from the card and `items-center` centres the text against it, which is why
  copy length cannot move the page. The rail's 580px fill must stay
  **absolutely positioned** - in flow, a `flex:1 1 0%` track still hands its
  content height to the column's intrinsic size, the rail becomes the tallest
  item, and it drives the row height instead of the card. `min-height: 0` does
  not fix that.
- **`RaiseTypes` IS ON `/solutions/fundraising`, NOT THE HOMEPAGE** (8 Sep
  2026, by request). "What we raise" lists the raise shapes we run, which is a
  fundraising argument rather than a statement about who the firm is for, so
  it moved and the homepage slot went to `WhoWeWorkWith` - supplied copy,
  Funds / Companies / Special Cases, the same `BracketGrid` idiom in the same
  position so the page's rhythm did not change. **This is the one place the
  two solutions routes stop being identical but for their content object**:
  Secondaries does not mount it, because none of those five entries is a
  secondary. The two headings are also one word apart - "Built for Funds and
  Operators Raising Growth Capital" against "Built for Emerging Fund Managers
  and Operators Raising Growth Capital" - so do not mount both in one
  document without renaming one.
- **THE HOMEPAGE CASE-STUDY BLOCK IS A CAROUSEL AND SHOWS ONE STUDY AT A
  TIME.** Neurable is first and Nobody Studios is off-frame until the reader
  scrolls, swipes, clicks a dot or presses the button
  (8 Sep 2026, by request; they were stacked one under the other for part of
  the same day). It is a CSS scroll-snap container - `.case-carousel` /
  `.case-slide` in `globals.css` - so swipe, trackpad and shift-wheel are
  native and free. **The track's `tabIndex` is for the accessible name
  first**; a focused scroll container is also supposed to take Left/Right
  arrow keys natively, which the mandatory snap would turn into a slide
  change, but that COULD NOT BE CONFIRMED here - key presses did not move the
  track under browser automation, with and without smooth scrolling, so treat
  it as unverified rather than as a feature. Adding a real key handler is not
  free: it would have to live on the track, which wraps every slide, so it
  would take the whole section client-side.
  **The controls live INSIDE the slides**: only one
  slide is on screen, so a control that belongs to a slide is always the
  correct one and nothing tracks an active index - including the DISABLED
  end-stop, which is known statically from the slide's own position. A shared
  pair of arrows outside the container would have to work out which end it was
  at, which is the state this avoids. The one thing that is not free is the
  button, `ui/slide-link` - see the client-components section.
- **A SLIDE HAS TO FIT THE VIEWPORT, and on desktop that is the whole reason
  the layout is what it is** (9 Sep 2026). Stacked - headline, client line,
  metric card, then a separate testimonial figure under it - a slide was 932px
  tall in an 806px viewport. The controls sit at the top of the slide, so they
  were off screen by the time the reader reached the quote, and the section's
  only signal that a second study existed was gone at exactly the moment it
  was needed. It is two columns now, the picture on the left and everything
  said about it on the right, and it measures 62-68% of the viewport from
  1030px up. **Sticky controls are not the alternative**: `overflow-x: auto`
  computes `overflow-y` to `auto`, so the track is its own scrollport, and
  being as tall as its tallest slide it has no vertical overflow for a sticky
  element to move against. A PEEK of the next slide is not the alternative
  either - a slide is full-bleed text inside the shell rather than a card with
  an edge, so the 20px on show is the left half of a letterform. Below `lg`
  the columns stack and a slide runs ~1000px on a phone: that is accepted, the
  portrait is a square 800px source and cropping it to buy the difference
  risks the face. Swipe is the affordance there and the dots are on screen
  when the reader arrives.
- **THE PICTURE IS THE LEFT COLUMN AND IT LEADS** (9 Sep 2026, by request).
  With it came the removal of the card's whole top half - the client's logo,
  the accent metric pill and our own result sentence. The headline already
  says what closed and how fast, so the pill repeated it in miniature and the
  sentence repeated it in prose; what is left is one claim per voice, ours in
  the headline and theirs in the quote. `CaseStudyCard` went with it (nothing
  else rendered it) and so did the site's last metric pill - see the accent
  list above, which is now three entries long.
- **THE POSITION IS SAID THREE WAYS AND ALL THREE ARE STATELESS.** A "01 / 02"
  pager, a row of dots whose current entry is a bar, and prev/next buttons
  with the spent direction rendered `aria-disabled` rather than dropped. Each
  slide knows its own index, so none of it needs an active-index. The disabled
  control follows the nav's "Log in" precedent - `aria-disabled` keeps it in
  the tab order, so a keyboard reader learns it exists and that it is spent.
  Dropping it instead moved the surviving button across the row as the reader
  advanced, and left slide 01 with one control that could only mean one thing.
- **THE SLIDES CANNOT BE MADE `inert` AND THAT IS THE ONE PART OF THE ARIA
  CAROUSEL PATTERN THIS BLOCK DOES NOT HOLD.** Hiding the off-screen slide
  from the tab order and from a screen reader needs an active index, which
  needs state, which would take the whole section client-side. What it does
  carry is the labelled structure: `aria-roledescription="carousel"` on the
  track and `role="group"` + `aria-roledescription="slide"` +
  `aria-label="Case study 1 of 2: …"` on each article. A live region
  announcing the change is out for the same reason. If either is ever
  required, the cost is the client boundary - weigh it, do not sneak it in.
- **IT IS DRIVEN BY AN ARRAY.** `featuredCaseStudies` in `content/case-studies.ts` looks them up by
  SLUG out of the same list `/customers` renders, so a result sentence, metric
  or category cannot drift between the two pages; `caseTestimonials` in
  `copy.ts` is keyed on the same slugs. Adding a third means a slug in both.
  Three things the second study forced and that must not be "tidied": the
  section's eyebrow and lede sit ABOVE the loop rather than on the first study
  (hanging them off study 01 made its header a third taller than 02's), the
  testimonial `quote` is an ARRAY of paragraphs, and `name`/`role` are
  OPTIONAL - Nobody Studios supplied positioning copy rather than a personal
  quotation, so that caption is the company alone. **Do not invent a speaker
  to make the two match.** Its picture is the client's LOGO, which is why
  `logo: true` switches the frame to `contain` + inset + plate + `logo-mark`
  instead of `cover`; a portrait must not take that flag. That mark is a 320px
  source and the column is ~450px, so it is drawn just inside its own width
  and will be soft on a HiDPI screen until a larger file exists - the portrait
  is 800px and has the same limit at 2x.
  **What the homepage still takes from the case-study RECORD is now `name` and
  `category` only**, since the result sentence and the metric pill came off
  the slide. The shared-record rule still earns its keep - a client cannot be
  filed as Startups on one page and Funds on the other - but `result` and
  `metric` are read by `/customers` alone now, so a change to either is no
  longer visible on two pages.
- **`/solutions` is TWO ROUTES**, `/solutions/fundraising` and
  `/solutions/secondaries`, each an independent copy of the same layout fed by
  a content object in `content/solutions.ts`. Bare `/solutions` and the legacy
  `/process` both 307 to Fundraising. `nav[0].menu` in `copy.ts` is now the
  ONLY place the pair is listed - the on-page toggle that used to duplicate it
  is gone - so a third view means a route, a content object and an entry there.
- **Two DIFFERENT kinds of gap on `/solutions`, and they are tracked
  separately on purpose.** A block's `pending` flag means its **copy** is
  placeholder and renders a visible note on the page. **NO BLOCK CARRIES IT
  ANY MORE** - Secondaries' five placeholders became two blocks of supplied
  copy on 9 Sep 2026 and Fundraising never had one - so the flag, the visible
  note and `PendingPlate` are all wired up and unused. Keep them: they are what
  stops the next block arriving without copy or artwork and shipping
  silently. Whether a block gets a
  **diagram** is decided only by the `MEDIA` map, keyed on block `id`, and
  anything missing renders `PendingPlate`. A block can have real copy and no
  art, or real art and placeholder copy (Secondaries 03). Closing one gap must
  not silently claim the other is closed. **Fundraising has closed both** -
  all THREE blocks have real copy and their own diagram. Secondaries has four
  blocks still awaiting each.
- **THE TWO VIEWS ARE NO LONGER THE SAME LENGTH.** Fundraising is three blocks
  since 9 Sep 2026 and Secondaries is two, so nothing may assume a count and
  `MEDIA` being keyed on `id` rather than index is now load-bearing rather than
  merely careful. **Secondaries is TWO SIDES, not a sequence:** buy-side and
  sell-side advisory, both supplied copy, followed by a logo band. Its five
  placeholder stages - "Position review", "Pricing", "Counterparties",
  "Process", "Close" - were replaced by the first two and the rest removed by
  request, because two sides of a trade under three stages of one mandate had
  the page describing itself two ways at once. Fundraising was five steps of fundraisr.ai copy with the
  brand filed off; the header and blocks 01-03 were replaced with supplied
  Avalanche copy and blocks 04-05 ("Pipeline management", "Meeting
  intelligence") were removed by request, leaving an advisory process in three
  moves - get ready, get introduced, get closed - instead of a five-feature
  product tour. **Nothing on that view is fundraisr's copy any more**, so the
  de-branding note in `content/solutions.ts` applies to the Secondaries
  scaffolding alone.
- **Do not reuse a diagram to fill a card it does not describe.** `MEDIA` is
  keyed on `id` rather than index precisely so it cannot happen by accident -
  position means nothing now that two views of different lengths share the
  layout. **CHECK THE ENTRY WHENEVER A BLOCK'S COPY CHANGES**: four diagrams
  moved on 9 Sep 2026 because their blocks did, and one was drawn from
  scratch. Block 01's three input chips
  were the old body's nouns and are now the new one's; block 03 stopped being
  about outreach campaigns and became deal closure, so `EngagementDiagram` -
  follow-ups branching on an engagement signal, not a term sheet or a
  dataroom - came out and `PipelineDiagram` moved in from the removed block 04,
  its four stages ending at Committed with only that column accented. Its two
  frame captions moved with it ("Pipeline" / "All mandates" said book of
  business, not one deal closing). `EngagementDiagram` and `MeetingDiagram` are
  KEPT, unrendered, and each says so at the top of its own comment. On
  Secondaries the holders-to-counterparties picture moved from block 03 to
  block 02, where the supplied copy names what it draws ("run a discreet
  process to identify the right buyer") instead of sitting beside a line that
  said only that copy was pending. **`BuySideDiagram` is the one new drawing**
  - sourced positions meeting a vetting line, three of four clearing it, the
  screened-out row visibly absent from the right column. It is deliberately a
  FILTER where the sell-side picture beside it is a SEARCH: one column in and a
  shorter column out, nothing crossing, so the two do not read as a repeat.
  Each diagram
  carries a specific claim (which route matched, which segment was selected,
  which branch was taken), so putting the counterparty-routing picture beside a
  pricing block would illustrate the wrong thing. An honest blank beats a
  plausible-looking wrong picture.
- **Diagram type takes a rung (`dgm-xs`…`dgm-xl`), never a
  `text-[Npx]` literal.** SVG text is scaled by the frame, so one source size
  renders between 5.8px and 12.6px across viewports if left fixed. The rungs
  live in `globals.css` and step up at 599px and 479px; `Frame` is one
  `w-[94%] max-w-[560px]` rule rather than three per-breakpoint percentages.
  Everything now lands 9.2-17.2px from 360px to 1600px. A literal here cannot
  be re-tuned when the frame changes, which is the whole point.
- **No rung is capped, and none should be.** A sixth, `dgm-axis`, briefly held
  the stage x sector grid at 16 units so its six bottom labels would not
  collide on an 80-unit pitch. The grid was TRANSPOSED instead - sectors to the
  vertical axis where word length costs nothing, the shorter stage names
  horizontal on a 110-unit pitch - and the rung was deleted. If a dense axis
  fights the type again, re-pitch the axis rather than capping a rung: a capped
  rung fixes the collision by making one diagram quietly less legible than the
  other five.
- **Diagram geometry is tuned around the type size, so changing a rung can
  break a layout.** Growing the type for phones broke three at once: the
  legend's second entry ran under the first in all six (both columns are now
  fixed, x=5 and x=320), the pipeline pill overflowed the frame, and the
  meeting card's label/value rows collided. After any rung change, re-check
  every diagram for text that escapes the 620-unit frame or overlaps a
  neighbour on the same baseline.
- **Every count in a diagram pill is DERIVED from the array drawn beside it**,
  in the same render - "8 matched", "2 committed", "3 of 4 aligned". None is
  typed twice, so a caption cannot drift from its own picture. Preserve that
  when editing; it is the only thing stopping a diagram from lying.
- **The `/customers` header is no longer the reference's full-height hero.**
  Its sections still follow fundraisr.ai/customers one for one, but the opening
  did too - a `min-h-[calc(100dvh-var(--header-h))]` statement built from its
  own parts, and the only page opening on the site not made of the shared ones.
  It left a ~950px band with the entire right half empty: nothing sat opposite
  the heading, where the homepage hero puts its stat and `/solutions` its
  button. The CTA moved up into that column and the fixed 100/48 rhythm
  replaced the fold. Reference fidelity lost to house consistency on purpose -
  do not restore the full height without something to fill the right column.
- **THE TEAM BIOS ARE NOT RENDERED** (9 Sep 2026, by request - "leave just the
  titles"). A card is a portrait, a name and a job title. **They are KEPT in
  content/team.ts, not deleted**, because this has already reversed once: they
  came off on 7 Sep when the grid was rebuilt around the reference's
  photo/name/role card, and went back the same day. app/about/page.tsx has the
  line to restore at the bio's old site. The constraint on them stands if they
  ever return: they describe the ROLE, not the person, because no biographical
  facts were ever available - do not invent career history, prior firms or
  credentials. Nothing drafted is now said about anyone on that page.
- **TWO OF THE EIGHT HAVE NO NAME, and the placeholder is deliberate.** Two
  account executives were supplied on 9 Sep 2026 as photographs plus one job
  title and nothing else, so `name` reads "Name to come" rather than a guess -
  inventing a name for a real, pictured person is the one thing content/team.ts
  exists to prevent - and their slugs are positional. The header of that file
  has the four-step rename. **Do not fill them in from the pictures.**
- **THE TEAM GRID'S COLUMN COUNT IS DECIDED BY WHAT DIVIDES THE HEADCOUNT**,
  and it has been five, six, three and now four in two days: six across in one
  row for six people, three across in two rows when the portraits were wanted
  bigger, four across for eight. A grid that does not divide the team leaves an
  orphan on the last row, which is the fault every one of those rewrites was
  fixing. Three things move with the count and are easy to miss: the `sizes` on
  the portrait (the only other place it is written down), `MAX_WIDTH` in
  scripts/optimize-team-photos.mjs (640 -> 832 when the card grew; a 306px card
  wants 612 at 2x), and `about.team.lede`, which used to open "Five people" and
  now names the coverage instead of counting the room. A NINTH person puts the
  orphan straight back at 4+4+1 - twelve is the next count that divides four,
  so at nine or ten go back to three across rather than to a fifth column.
- **Dev runs on port 3200**, pinned. Port 3000 collides with another project on
  this machine and Next moves ports silently, which makes the site look broken.

## Content

Everything editable is in `content/`. Blocks marked `// DRAFT` were written by an
agent, not sourced from an Avalanche property, and are awaiting sign-off - see
`docs/COPY-REVIEW.md`. Do not quietly promote a `DRAFT` to fact, and do not
invent figures: the track-record numbers are load-bearing financial claims.
