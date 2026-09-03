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
- `docs/BUILD-NOTES.md` — history. Its sections 1–2 and 4 describe a **previous**
  design (farahcap.com, cream/serif/gold) that no longer exists. Read the banner
  at the top before trusting anything in it.

## Design system

`app/globals.css` is the whole thing — there is **no `tailwind.config`**, and
Tailwind v4 is used CSS-first.

- Colour tokens are named by **role**, never by hue: `ground`, `ground-deep`,
  `ground-alt`, `card`, `fg`, `fg-muted`, `fg-faint`, `line`, `line-soft`. Do not
  reintroduce hue names, and do not hardcode a hex or `bg-white` in a component —
  a light band would break it.
- A light section is `data-band="light"` on the `<section>`. That single
  attribute re-points every token for the subtree, which is why shared components
  take no `tone` prop. `data-band="dark"` goes back the other way.
- Because of this, `bg-fg text-ground` is a white button on dark and a black
  button on light **from the same markup**. Preserve that property.
- Check contrast when changing a token. A previous palette shipped its faint
  token at 2.9:1 while it carried every eyebrow and all the footer legal text.

## Client components

Only three: `nav`, `track-record`, `case-study-grid`.

- **External state is read with `useSyncExternalStore`**, never mirrored into a
  `useState` + `useEffect`. Scroll offset and `prefers-reduced-motion` both work
  this way, with a `false` server snapshot matching pre-hydration markup.
- Reset-state-on-prop-change is done **during render**, not in an effect (see the
  mobile sheet in `nav.tsx`).
- `npm run lint` enforces this via `react-hooks/set-state-in-effect` and is
  currently clean. Do not suppress the rule.

## Things that look wrong but are deliberate

- **The `Login` button in the nav does nothing.** There is no client area. It is
  `aria-disabled`, and it is a `<button>` rather than a link because there is no
  destination.
- **`accent` keys in `content/copy.ts` are ignored.** They drove a gold italic
  motif that the current design doesn't have. Kept, not rendered.
- **The hero video stops at 9.3s.** The master hard-cuts into a bright plate at
  9.59s. Re-check the luma profile before changing the trim or the source.
- **Client logos are pre-processed to white-on-transparent** by
  `scripts/logos-to-alpha.mjs`. `logo-band.tsx` assumes this — do not add a blend
  mode to compensate for something. Re-run the script after adding logos.
- **Team bios describe the role, not the person**, because no biographical facts
  were available. Do not invent career history for them.
- **Dev runs on port 3200**, pinned. Port 3000 collides with another project on
  this machine and Next moves ports silently, which makes the site look broken.

## Content

Everything editable is in `content/`. Blocks marked `// DRAFT` were written by an
agent, not sourced from an Avalanche property, and are awaiting sign-off — see
`docs/COPY-REVIEW.md`. Do not quietly promote a `DRAFT` to fact, and do not
invent figures: the track-record numbers are load-bearing financial claims.
