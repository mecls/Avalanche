<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Avalanche Capital — project rules

Written by hand. The block above is managed by `next dev`; this part is not, and
should be kept.

## Read these first

- `README.md` — current state, design system, scripts, open items.
- `docs/COPY-REVIEW.md` — which copy was drafted rather than sourced, and why.
- `docs/BUILD-NOTES.md` — history. **Its banner is now out of date**: it warns
  that sections 1–2 and 4 describe a superseded farahcap.com design
  (serif/gold). The site has since been rebuilt AGAINST that reference, so
  those sections are closer to the truth than the banner claims. Trust the code
  and this file over both.

## Design system

`app/globals.css` is the whole thing — there is **no `tailwind.config`**, and
Tailwind v4 is used CSS-first.

The **layout** is a clone of farahcap.com. The **type** is not: the site runs
Satoshi on everything, which is fundraisr.ai's face. It has now been through
both systems and back — fundraisr's (Satoshi, flat type, no accent), then the
farahcap serif rebuild, and since 4 Sep 2026 farahcap's layout carrying
fundraisr's face plus the accent. A doc claiming "no serif, no accent colour"
is half right by accident: the serif is gone again, the accent is real.

- **ONE face, and it is self-hosted.** Satoshi on every heading, figure, body
  run, button and nav item. There is no secondary display face and **no serif
  anywhere**. It is a Fontshare release, not on Google Fonts, so it loads via
  `next/font/local` from `app/fonts/Satoshi-Variable.woff2` (42KB, one file) —
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
- **`/solutions` and `/customers` share ONE page-header construction.** Same
  `page-label`, same `display display-72 text-[72px]` on the same 809px
  step-down to 40px, same 16/24 lede, same 720px/680px measures, same
  `items-end` row with the CTA hard right and a trailing `ArrowGlyph`. They
  were separate builds until 4 Sep 2026 and had drifted to a *different value
  in every row* — 64px vs 80px H1, 600-weight grey label vs 500-weight ink,
  15px lede vs 16px, a 576px column vs 720px. Change one and change the other;
  the type spec itself lives in `globals.css`, not in either component.
- Colour tokens are named by **role**, never by hue: `ground`, `ground-deep`,
  `ground-alt`, `card`, `fg`, `fg-muted`, `fg-faint`, `line`, `line-soft`,
  `accent`. Do not reintroduce hue names, and do not hardcode a hex or
  `bg-white` in a component — a light band would break it. `accent` was
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
  element's own background — which was nothing, so the strip showed the dark
  `<body>` ground. Invisible on a dark-first page; on a light-first one it put
  a black bar under the announcement bar with the whole nav rendered in ink on
  top of it. One `:has()` rule in globals.css fixes it, paired with the one
  that flips the header's colour. It must use `--color-paper`, not
  `var(--color-ground)`: `main` is outside the light band, so its own
  `--color-ground` still resolves dark.
- **The accent is the brand blue `#3056EE`** — but the DARK-band value is
  `#8aa4ff` and that is not an oversight. At full strength the brand blue is
  3.2:1 on `#151515` (under the 4.5:1 floor the diagram pills need) and 1.14:1
  against the 50%-opacity `fg-muted` ghost dots the `/solutions` diagrams draw
  matched routes against — equal luminance separated only by hue, which is
  what disappears for a colour-blind reader. So a dark band takes a true
  lightening of the same colour: hue 227 held, saturation 100%, lightness
  56% → 77%. A light band swaps `#3056EE` itself back in at 5.7:1 on white.
  **Darkening the dark value toward the brand value is the tempting mistake**
  — more on-brand in isolation, and it quietly breaks the media cards.
- The measured distances that keep it working: 7.7:1 on `#151515`, a 2.4:1
  step down from `fg` (so it reads as its own colour, not as white), and a
  2.7:1 step up from a ghost dot. Hue does most of the signalling now, the way
  gold's did; the luminance step is the fallback for readers who cannot use
  the hue. Keep both.
- **The accent appears in FOUR places. That is the whole list.** The section
  eyebrows and page labels (`eyebrow`, plus `text-accent` on the two page-name
  `page-label` runs) — a block's own name, and the largest group; the
  /solutions rail and its two diagrams (functional — the colour is the
  diagram's only way of saying which route matched); the case-study metric
  pill (one number, once per page); and the CTA band's chip (once per page, at
  the conversion point). Everything else is monochrome.
- **The eyebrow rule has moved twice in one day — read this before moving it a
  third time.** It was accented, judged too much, reverted, then asked for
  again specifically (4 Sep 2026). The middle step was a judgement about the
  accent being *everywhere* — `BracketGrid` corner brackets, the raise-types
  and verticals icons, the FAQ `+`, the /customers search and filter glyphs,
  the team monograms, the /solutions block labels — not about the eyebrow.
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
  it needs the full 4.5:1 rather than the 3:1 large-text floor — and it lands
  on four different grounds. Measured: `#3056EE` is 5.7:1 on `#ffffff`, 5.5:1
  on `#fafafa` and 5.1:1 on `#f3f3f3`; `#8aa4ff` is 7.7:1 on `#151515` and
  6.9:1 on the `#202020` card. **Any future accent has to clear 4.5:1 on all
  five before it can go here**, which is a much harder test than the diagram
  pills alone used to impose.
- `--color-accent-light` / `--color-accent-deep` are the rail gradient's stops,
  **held constant across bands**, decorative only. `--color-accent` follows the
  band so type set in it clears contrast either way; that flip is wrong for a
  graphic carrying no text. Both are calibrated for the light `#eeeeee` track
  that is their only home and would be invisible on dark. Never set type in
  either. `accent-deep` is the brand value exactly, so the rail terminates in
  it — it therefore coincides with the light-band `accent` today, which is a
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

Only three: `nav`, `track-record`, `case-study-grid`. **`/solutions` deliberately
adds none** — its scroll-linked rail and text reveal are CSS `view-timeline`,
not JS. Keep it that way; see "The solutions timeline" in `README.md` before touching
it, including why the reduced-motion guard has to say
`animation: none` rather than rely on the global duration override.

**This is why the Fundraising/Secondaries switch is TWO ROUTES and not a tab.**
A stateful tab would have made the whole of `/solutions` a client component and
restarted the view-timeline animations on every switch. `SolutionsToggle` is
two `<Link>`s and takes its active view as a prop rather than calling
`usePathname`, so it stays a server component too. If a third view is ever
added, add a route — do not reach for `useState` here.

The nav's Solutions dropdown adds no state either: it opens on `:hover` and
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
  it only ever sits over the first section — the whole thing collapsed to one
  `:has()` rule in globals.css. Do not reintroduce the listener.

## Things that look wrong but are deliberate

- **The chrome is ONE element and nothing on the site is `fixed`.** An
  `absolute` 79.2px nav at `top:0` that scrolls away, published as
  `--header-h`; `main` reserves it and the hero cancels it with a negative
  margin. It used to be two — a `fixed` 37px announcement bar sat above the
  nav, and `--header-h` was the 116.2px sum — but the bar was removed on
  4 Sep 2026, taking `--header-bar-h` and `--header-nav-h` with it. Its copy
  is kept but unrendered as `announce` in `content/copy.ts`. **Keep the
  reservation**: the spec said to drop it too, which is right for a one-page
  reference and wrong here — on the three routes without a hero, an absolute
  nav with no reserved space lands on top of the first heading.
- **`accent` keys in `content/copy.ts` are still ignored**, even now that the
  accent is everywhere else. It carries eyebrows, graphics and glyphs — not a
  word inside a headline. Every heading on the site stays monochrome, which is
  what keeps the accent reading as a system rather than as emphasis. Kept, not
  rendered; the emphasis points are editorial information worth keeping.
- **The hero H1 breaks on authored lines.** `hero.titleLines` in
  `content/copy.ts` holds two entries, a `lead` plus a `rest`. It is content,
  not layout, which is why the break is not a `<br>` in the component. The
  `lead` used to be italic and is not any more — see the no-italic rule above.
- **The hero H1 is sized in `cqw`, off its own column, and that is the only
  thing keeping the authored break.** It reads `clamp(1.75rem,10.4cqw,64px)`
  against an `@container` on the text column. The ratio is a measurement, not
  a taste: `"advisory with an edge"` is 9.36× the font size wide, so it fits
  while size ≤ colW/9.36 = 10.68cqw, and 10.4 is that with margin. A fixed
  size cannot work — the column is `flex-1` of a two-column row from 768px up,
  so it is only 342px wide at 768 and 598px at 1280, and a flat 64px (a 599px
  line) wraps to three lines everywhere below ~1282px. **This is the clamp the
  note in `globals.css` warns against**; an arbitrary one reflows the break,
  this one is derived from it. The old 809px step-down was removed with it and
  must not come back — a fixed size there wins and the third line returns.
  Verified 2 lines at 360/390/430/600/800/810/900/1100/1280/1440/1920.
  If the headline copy changes, re-measure the longest line and re-derive.
- **`items-end` on the hero content row is the composition.** It is what puts
  the bottom edge of the CTA button and the bottom edge of the stat label on
  one baseline (measured: both at y=842). Change it to `center` or `start` and
  the hero stops matching the reference.
- **The hero scrim is two stops, 0.44 → 0.60, in `#151515` — not black.** It
  replaced a five-stop per-clip gradient opening at 0.93 that crushed the
  footage. What makes two stops safe is that every text run in the hero is pure
  white and the type is large. If a future clip drifts a blown highlight under
  the text, re-derive rather than deepening this uniformly.
- **`public/grain.png` is load-bearing, not decoration.** The scrim is one long
  gradient across the viewport, which is the textbook case for 8-bit banding;
  the grain dithers it, and is why the scrim can be this light. Regenerate with
  `scripts/make-grain.mjs`. It is 256px, not the reference's 720px, because
  per-pixel random alpha barely compresses (387KB vs 30KB) and grain must
  render 1:1 — **keep `backgroundSize` in `hero.tsx` in step with `SIZE`**.
- **Every text run in the hero is `fg`, never `fg-muted`/`fg-faint`.** The
  muted tokens are calibrated for flat grounds; on a photograph contrast has to
  be measured against the brightest column each run crosses.
- **`.shell` is 1440px with a FIXED 20px gutter**, and `.section-y` is a fixed
  120px. Both were clamped before and both resolved far smaller, which is what
  made the page read cramped on a large screen.
- **All white-on-transparent marks must carry `logo-mark`.** Client marks
  (`scripts/logos-to-alpha.mjs`), the hero strip, and now the **case-study**
  logos, which are pure white (measured mean luma 255) and were invisible the
  moment their section became a light band. `globals.css` inverts anything with
  that class inside `[data-band="light"]`. Do not add a blend mode instead, and
  re-run the script after adding logos.
- **The hero logo band is full-bleed, outside `.shell`.** 100px tall on its own
  translucent blurred ground rather than a hairline rule. `logo-marquee.tsx`
  needs its `overflow-hidden`: the scrolling row is far wider than the box and
  `mask-image` defaults to `mask-repeat: repeat`, so without clipping the fade
  gradient tiles and the strip reads as a few logos with holes.
- **The hero strip label is not the reference's wording.** The reference says
  "Representative investors & strategic partners"; that strip carries CLIENT
  marks, and `customers.logoNote` states they are past engagements. Calling
  past clients investors or partners would be a claim the site cannot support.
  Same shape, accurate words — see `hero.stripLabel`.
- **The closing CTA band is image-backed, not video-backed.** It uses the hero
  POSTER: the block sits at the bottom of a long page, so a second autoplaying
  video would decode continuously for something most readers never reach, and
  the still is already cached from the hero. It carries the same image/scrim/
  grain stack, but the scrim is left-weighted rather than vertical because the
  type sits in one left column.
- **`components/sections/booking.tsx` is no longer mounted.** The closing band
  replaced the two-column heading + booking-panel layout with the reference's
  single-column one; its button goes straight to `site.booking`. Kept, not
  rendered, like the other unmounted sections.
- **The `/solutions` media cards are the layout's load-bearing element.** The
  card is `flex:1 0 0` with `aspect-ratio: 1.05098/1`; the ROW takes its height
  from the card and `items-center` centres the text against it, which is why
  copy length cannot move the page. The rail's 580px fill must stay
  **absolutely positioned** — in flow, a `flex:1 1 0%` track still hands its
  content height to the column's intrinsic size, the rail becomes the tallest
  item, and it drives the row height instead of the card. `min-height: 0` does
  not fix that.
- **`/solutions` is TWO ROUTES behind a toggle**, `/solutions/fundraising` and
  `/solutions/secondaries`, each an independent copy of the same layout fed by
  a content object in `content/solutions.ts`. Bare `/solutions` and the legacy
  `/process` both 307 to Fundraising. The nav dropdown and the on-page toggle
  must list the same pair in the same order — `solutionViews` owns it for the
  toggle, `nav[0].menu` in `copy.ts` for the dropdown.
- **Two DIFFERENT kinds of gap on `/solutions`, and they are tracked
  separately on purpose.** A block's `pending` flag means its **copy** is
  placeholder and renders a visible note on the page; all five Secondaries
  blocks have it and no Fundraising block does. Whether a block gets a
  **diagram** is decided only by the `MEDIA` map, keyed on block `id`, and
  anything missing renders `PendingPlate`. A block can have real copy and no
  art (most of Fundraising) or real art and placeholder copy (Secondaries 03).
  Closing one gap must not silently claim the other is closed.
- **Do not reuse a diagram to fill a card it does not describe.** `MEDIA` is
  keyed on `id` rather than index precisely so it cannot happen by accident —
  position means nothing now that two views share the layout. Both diagrams
  carry a specific claim (which route matched, which segment was selected), so
  putting the matching grid beside a pipeline block would illustrate the wrong
  thing. An honest blank beats a plausible-looking wrong picture.
- **The `/customers` header is no longer the reference's full-height hero.**
  Its sections still follow fundraisr.ai/customers one for one, but the opening
  did too — a `min-h-[calc(100dvh-var(--header-h))]` statement built from its
  own parts, and the only page opening on the site not made of the shared ones.
  It left a ~950px band with the entire right half empty: nothing sat opposite
  the heading, where the homepage hero puts its stat and `/solutions` its
  button. The CTA moved up into that column and the fixed 100/48 rhythm
  replaced the fold. Reference fidelity lost to house consistency on purpose —
  do not restore the full height without something to fill the right column.
- **Team bios describe the role, not the person**, because no biographical
  facts were available. Do not invent career history for them.
- **Dev runs on port 3200**, pinned. Port 3000 collides with another project on
  this machine and Next moves ports silently, which makes the site look broken.

## Content

Everything editable is in `content/`. Blocks marked `// DRAFT` were written by an
agent, not sourced from an Avalanche property, and are awaiting sign-off — see
`docs/COPY-REVIEW.md`. Do not quietly promote a `DRAFT` to fact, and do not
invent figures: the track-record numbers are load-bearing financial claims.
