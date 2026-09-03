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

The site is a layout clone of **farahcap.com**. It was previously matched to
fundraisr.ai (Satoshi, flat white type, no accent); that is gone. If you find a
comment claiming "no serif, no accent colour", it predates the rebuild.

- **Three faces, each with one job.** Cormorant Garamond for every heading
  (`display`, `display-md`, `display-sm`), Cormorant *Infant* for figures only
  (`numeral` — a different face, not a weight), Inter for every UI run. Loaded
  via `next/font/google` in `app/layout.tsx`. Garamond carries its italic
  because the H1 sets the first word of each line in italic; drop it and the
  browser synthesises a slant on the most visible type on the site.
- Colour tokens are named by **role**, never by hue: `ground`, `ground-deep`,
  `ground-alt`, `card`, `fg`, `fg-muted`, `fg-faint`, `line`, `line-soft`,
  `gold`. Do not reintroduce hue names, and do not hardcode a hex or `bg-white`
  in a component — a light band would break it.
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
- `--color-gold-deep` is the accent **held constant across bands**, for
  decorative graphics only. `--color-gold` darkens to `#7c6c45` on a light band
  so text set in it clears 3:1; that darkening is wrong for the solutions rail,
  which carries no text. Never set type in `gold-deep`.
- Because of this, `bg-fg text-ground` is a white button on dark and a black
  button on light **from the same markup**. Preserve that property.
- **The three dark grounds are deliberately the same `#151515`.** The reference
  runs one dark value, not a ramp. Components that reach for `ground-deep` or
  `ground-alt` still work; they just no longer band against each other.
- Check contrast when changing a token. A previous palette shipped its faint
  token at 2.9:1 while it carried every eyebrow and all the footer legal text.
  **Gold is the trap here**: `#ae9e77` is 6.4:1 on `#151515` but only 2.6:1 on
  white, under even the 3:1 large-text floor. The light band swaps in a
  darkened `#7c6c45`; do not "unify" the two.

## Client components

Only three: `nav`, `track-record`, `case-study-grid`. **`/solutions` deliberately
adds none** — its scroll-linked rail and text reveal are CSS `view-timeline`,
not JS. Keep it that way; see "The solutions timeline" in `README.md` before touching
it, including why the reduced-motion guard has to say
`animation: none` rather than rely on the global duration override.

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

- **The chrome is two elements, not one.** A `fixed` 37px announcement bar that
  stays, and an `absolute` 79.2px nav that scrolls away. Their sum is published
  as `--header-h`; `main` reserves it and the hero cancels it with a negative
  margin. The spec said to drop both, which is right for a one-page reference
  and wrong here — on the three routes without a hero, an absolute nav with no
  reserved space lands on top of the first heading.
- **`accent` keys in `content/copy.ts` are still ignored.** Gold is back, but
  it carries the banner link and (per the reference) one section heading — not
  a word inside a headline. Kept, not rendered.
- **The hero H1 breaks on authored lines.** `hero.titleLines` in
  `content/copy.ts` holds two entries, each an italic `lead` plus a roman
  `rest`. It is content, not layout, which is why the break is not a `<br>` in
  the component. A third line will not fit at 80px.
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
- **Team bios describe the role, not the person**, because no biographical
  facts were available. Do not invent career history for them.
- **Dev runs on port 3200**, pinned. Port 3000 collides with another project on
  this machine and Next moves ports silently, which makes the site look broken.

## Content

Everything editable is in `content/`. Blocks marked `// DRAFT` were written by an
agent, not sourced from an Avalanche property, and are awaiting sign-off — see
`docs/COPY-REVIEW.md`. Do not quietly promote a `DRAFT` to fact, and do not
invent figures: the track-record numbers are load-bearing financial claims.
