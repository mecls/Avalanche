import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/site/cta-band";
import { PageHeader } from "@/components/site/page-header";
import { Thesis } from "@/components/sections/thesis";
import { CtaButton } from "@/components/ui/button";
import { Plate } from "@/components/ui/diagram";
import {
  AccessLayersDiagram,
  DivergenceDiagram,
} from "@/components/ui/manifesto-media";
import {
  BothSidesDiagram,
  ThresholdDiagram,
} from "@/components/ui/market-media";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/content/about";
import { manifesto } from "@/content/manifesto";
import { teamBlur } from "@/content/team-blur";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Capital is not scarce. Access is. What Avalanche Capital does, what it believes about private markets, and the team behind the mandates.",
};

/**
 * /about - About Us: what the firm is, what it believes, and who runs it.
 *
 * IT IS TWO ROUTES MERGED, by request on 7 Sep 2026. `/team` carried the
 * portraits and the press quotes; `/manifesto` carried the divergence, the
 * five beliefs and the three access layers. Both paths now 307 here (see
 * `next.config.ts`), the nav entry that said "Team" says "About Us", and the
 * footer's Overview column lost its separate Manifesto link because there is
 * no separate page left to link to.
 *
 * THE ORDER IS THE ARGUMENT. What the firm does (the thesis) -> the market
 * that makes it necessary (the divergence) -> what follows from that (five
 * beliefs) -> where the gap actually sits (three layers) -> who does the work
 * (team). The manifesto sits in the MIDDLE deliberately: a reader who came
 * for the team scrolls through the argument to reach them - and since
 * 8 Sep 2026 the team really is last, which is where this sentence had it all
 * along while the markup had it third.
 *
 * **THE TRACK RECORD CAME OFF ON 8 Sep 2026**, by request. It was the metrics
 * bento between the thesis and the team, and it was this page's only proof
 * surface: /about argues from position alone again, carrying no figures and
 * no client marks anywhere. The block is not deleted, only unmounted here -
 * `TrackRecord` still renders on the homepage (`grid`) and on /customers
 * (`rows`), so the four figures are untouched and still the most load-bearing
 * claims on the site. It was also the page's only CLIENT component, so
 * /about is server-rendered end to end again; see "Client components" in
 * AGENTS.md, and note that the layer sequence below is scroll-linked CSS
 * precisely so it stays that way.
 *
 * **"In the press" was removed on 7 Sep 2026.** Three cards of drafted quotes
 * on a white band, separated only by a hairline, with the outlet set as an
 * eyebrow rather than its mark, no link to any article and no hover state -
 * the weakest block on the page and unfixable in place, because there are no
 * outlet marks in `public/logos/` for those three and no article URLs
 * anywhere in the repo. `media` is kept but unrendered in content/copy.ts,
 * like the other unmounted copy here.
 *
 * BAND SEQUENCE: light header, dark thesis, light divergence, dark beliefs,
 * light layers, dark team, then the photo-backed closing band. EVERY
 * ADJACENT PAIR ALTERNATES, and that is why no section on this page carries a
 * rule between itself and its neighbour - the band change IS the separator.
 * Dropping the track record and moving the team to the end both had to
 * preserve it, and did. Re-check it before adding, removing or reordering a
 * block: two same-band sections in a row read as one very long section, and
 * the page has no hairline to fall back on.
 *
 * The light header running straight into the dark thesis is the one cut that
 * has been argued over, and it is bare again on purpose. It read as abrupt on
 * 7 Sep 2026 because nothing visual sat in the header to prepare it - 420px
 * of white with a lone button in the right half - and two things were tried
 * against it: a dark inset plate in the header (`git show 44846ba`), then an
 * image-backed thesis that softened the seam with a photograph. The inset
 * lost to CENTRING the header, which removes the empty right half rather
 * than filling it, and the picture came off the thesis on 8 Sep 2026 by
 * request. Both fixes are gone and the complaint went with them: a centred
 * header has no hanging right half for the cut to interrupt.
 *
 * The team grid is `data-band="dark"`, which paints the same `#151515` the
 * section used to inherit from `<body>` back when this was /team and the page
 * opened dark.
 *
 * **The header section MUST stay `data-band="light"` and the FIRST child of
 * `main`.** Two rules in globals.css key off
 * `main > :first-child[data-band="light"]`: one flips the nav's type to ink,
 * the other paints `main` with `--color-paper`. They break together, and the
 * failure mode is the whole nav rendering white on white. Note which way this
 * merge moved - /team opened DARK and needed neither rule, so this is new
 * exposure on a page that never had it.
 *
 * **A section that does not paint ITSELF is the other half of that trap.** It
 * sits on the white `main` while still inheriting the root's dark text
 * tokens - white type on a white ground. Every dark section on this page says
 * `data-band="dark"` for that reason, not for the colour alone.
 *
 * The media rows are the /solutions row with the rail taken out: the `Plate`
 * is `flex:1 0 0` on a fixed aspect ratio, so it sizes the row and
 * `items-center` centres the text against it. Copy length cannot move the
 * layout. Text comes FIRST in the document in every one of them, so a phone
 * always reads the claim before the picture; the layer panels set
 * `flex-row-reverse` to put their plate on the left on a wide screen, which
 * `flex-col` overrides below 1200px.
 *
 * The layer sequence turns that same row into three of them, one per screen -
 * see the comment on the section itself.
 */
/**
 * WHICH PICTURE EACH LAYER PANEL GETS, BY LAYER ORDINAL rather than by
 * position - the same reason /solutions keys its `MEDIA` on a block id. A
 * lookup by index says nothing about what the picture is of, and these three
 * are not interchangeable.
 *
 * The three panels used to share ONE picture, the access rings drawn three
 * times with a different ring emphasised. It read as a repeat rather than as
 * a sequence, and the two firm diagrams were sitting in a grid at the bottom
 * of the section doing nothing - so they moved up here.
 *
 * **THE FIRST TWO ARE STILL NOT PICTURES OF THEIR LAYER.** The threshold is
 * about which issuers sit inside the segment; both sides is about the same
 * counterparties coming back. What changed on 8 Sep 2026 is that both now
 * have COPY OF THEIR OWN on the panel - supplied, not drafted - so the
 * mismatch is stated in words instead of papered over. Panel 01's paragraph
 * names the mandate the threshold diagram draws; panel 02's fourth reason is
 * the both-sides flow. See `aside` in `content/manifesto.ts`.
 *
 * **THE `Figure` CAPTIONS WENT WITH THAT, AND MUST NOT COME BACK ALONGSIDE
 * IT.** Panels 01 and 02 used to hang a claim + source line under the plate,
 * for exactly one reason: the pictures had no words. They do now, and the
 * captions said the same thing - `mandate.note` restates the paragraph, and
 * `bothSides.buy.detail` is a legend the diagram already draws inside itself.
 * Running both puts one claim on a screen twice. So all three panels are
 * bare `Plate`s and this map is a diagram per ordinal, nothing else.
 *
 * Still do not retitle a layer to fit the picture beside it - that would make
 * a picture claim something it does not show, which is the trap the asides
 * were written to avoid.
 */
const LAYER_MEDIA: Record<string, () => React.ReactElement> = {
  "01": ThresholdDiagram,
  "02": BothSidesDiagram,
  "03": AccessLayersDiagram,
};

/**
 * EVERY BLOCK ON THIS PAGE FILLS THE SCREEN EXCEPT THE FIRST AND THE LAST,
 * by request on 7 Sep 2026 - the thesis, the divergence, the beliefs and the
 * team take the floor; the page header and the closing CTA band do not. The
 * track record was on that list until it came off the page on 8 Sep 2026, and
 * the layer sequence has never needed it: its runway is 400svh, four screens
 * on its own, so a one-screen floor would do nothing there.
 *
 * The exemption list took several passes to settle, and both exemptions are
 * there for a stated reason. It went in as "everything after the first two",
 * which left the thesis band ending mid-screen with white above and below -
 * exactly what a band that does not fill looks like when its neighbours do.
 * Everything got the floor, and then two things came back off it: the header,
 * because it is a label, a two-line H1, a lede and a button, and a screen of
 * white around them reads as an empty page rather than as a composition; and
 * the closing band, because it is shared with four other routes and has to
 * read the same size on all five.
 *
 * It is a FLOOR, not a height. The team grid, the beliefs list and the layer
 * sequence are all taller than a viewport on their own and this changes
 * nothing about them; what it fixes is the short blocks between them, which
 * used to leave a band of the next section showing under a section that had
 * only half a screen of content in it.
 *
 * `svh` rather than `dvh` or `vh`: `dvh` remeasures as a phone's URL bar
 * hides and relayouts the block mid-scroll, and `vh` on iOS is the LARGE
 * viewport, so a "full screen" block starts life with its last line under the
 * browser chrome. `svh` is the one of the three that is both stable and
 * wholly visible.
 *
 * `justify-center` is what makes the extra height read as composition rather
 * than as padding - the section's own `section-y` still sets the minimum
 * breathing room, and the leftover space is split above and below.
 */
const FULL_SCREEN = "flex min-h-svh flex-col justify-center";

/*
 * IF THE HEADER EVER TAKES THE FLOOR AGAIN, IT NEEDS ITS OWN VALUE:
 * `min-h-[calc(100svh-var(--header-h))]`, not `min-h-svh`. `main` reserves
 * `--header-h` of padding for the absolute nav, so a plain `svh` on the
 * section under it makes the opening screen 100svh + 79.2px - the one block
 * every reader sees would be the one block that does not fit. Every later
 * section starts below the reservation and takes the full `svh`.
 */

export default function AboutPage() {
  const { divergence, beliefs, layers } = manifesto;

  return (
    <>
      <section data-band="light">
        <PageHeader
          eyebrow={about.eyebrow}
          title={about.titleLines.map((line) => (
            // Authored break - see content/about.ts. Block spans rather than
            // a <br> so each line stays its own run.
            <span key={line} className="block">
              {line}
            </span>
          ))}
          lede={about.lede}
          cta={about.cta}
          align="center"
        />
      </section>

      <Thesis className={FULL_SCREEN} />

      {/* `id="manifesto"` is what the old route redirects to - /manifesto 307s
          to /about#manifesto, so a reader following an existing link lands on
          the manifesto rather than at the top of a page twice as long as the
          one they asked for. The anchor is on the divergence because that is
          where the manifesto starts; the thesis above it is the other half of
          the merge. `scroll-mt` is breathing room only - the nav is absolute
          and scrolls away, so nothing overlaps the target. */}
      <section
        id="manifesto"
        data-band="light"
        className={`section-y scroll-mt-24 ${FULL_SCREEN}`}
      >
        <div className="shell">
          <div className="flex w-full flex-row items-center justify-center gap-9 max-[1199px]:flex-col">
            <div className="flex flex-1 flex-col items-start gap-6 max-[1199px]:w-full max-[1199px]:flex-none">
              <SectionHeading
                eyebrow={divergence.eyebrow}
                title={divergence.title}
              />

              <div className="flex max-w-[680px] flex-col gap-5">
                {divergence.body.map((p) => (
                  <p key={p} className="text-[16px] leading-6 text-fg-muted">
                    {p}
                  </p>
                ))}
                <p className="text-[16px] leading-6 text-fg">
                  {divergence.note}
                </p>
              </div>
            </div>

            <Plate>
              <DivergenceDiagram />
            </Plate>
          </div>
        </div>
      </section>

      <section data-band="dark" className={`section-y ${FULL_SCREEN}`}>
        <div className="shell">
          <SectionHeading
            eyebrow={beliefs.eyebrow}
            title={beliefs.title}
            lede={beliefs.lede}
          />

          {/* The same ruled <dl> WhoWeServe uses on the homepage: ordinal and
              statement left, argument right, hairline between. A <dl> may only
              contain <dt>/<dd> (optionally wrapped in a <div>), so the index
              lives inside the <dt> rather than beside it. */}
          <dl className="mt-16 divide-y divide-line border-y border-line">
            {beliefs.items.map((b, i) => (
              <div
                key={b.title}
                className="grid gap-4 py-9 md:grid-cols-[1fr_1.4fr] md:items-baseline md:gap-10"
              >
                <dt className="flex items-baseline gap-5">
                  <span className="eyebrow shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-2xl md:text-[1.75rem]">
                    {b.title}
                  </span>
                </dt>
                <dd className="text-sm leading-relaxed text-fg-muted">
                  {b.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* THE THREE LAYERS ARE THREE SLIDES IN ONE PINNED STAGE, each
          REPLACING the last where it stands, by request on 7-8 Sep 2026.
          They were a ruled <dl> of three rows beside a single plate - the
          whole argument in one row, with the picture doing nothing while the
          reader worked down the list.

          The stage is `sticky` inside a 400svh runway and the three slides
          are stacked absolutely inside it, so nothing about the layout moves
          on scroll: only opacity does. That is the difference between one
          block substituting another and a reader travelling down to the next
          one, and it is the whole reason this is not three sections in flow -
          which it was for a build, and which put every incoming picture a
          screen below the outgoing one no matter how the two were faded.

          The mechanism is `.layer-seq` / `.layer-stage` / `.layer-slide` in
          globals.css - scroll-linked CSS, NO client component, the same rule
          /solutions lives under. Below 1200px, without scroll-driven
          animations, and under reduced motion there is no stage and no
          runway: the slides stack down the page and all three are visible,
          which is the finished state rather than a degraded one.

          Three DIFFERENT pictures, one per slide, keyed on the layer's own
          ordinal - see `LAYER_MEDIA` for which, and for why two of them keep
          their own caption and the third does not.

          Text FIRST in the document with `flex-row-reverse` putting it on the
          right: image left, text right on a wide screen, and a phone still
          reads the claim before the picture. */}
      <section data-band="light" className="section-y">
        <div className="shell">
          <SectionHeading
            eyebrow={layers.eyebrow}
            title={layers.title}
            lede={layers.lede}
          />

          {/* THE RUNWAY. It has no content of its own: it is 400svh of
              scroll for the stage below to be pinned against, and it carries
              the view timeline all three slides read. Its height and the
              percentages in globals.css are one calculation - change either
              and change both. Below 1200px it collapses to nothing and the
              slides simply stack. */}
          <div className="layer-seq mt-10">
            {/* An <ol> because the layers are numbered and the order is the
                argument - the first two are exhausted before the third is
                reached. */}
            <ol className="layer-stage flex list-none flex-col gap-20">
              {layers.items.map((l, i) => {
                const last = i === layers.items.length - 1;
                const Diagram = LAYER_MEDIA[l.n];

                // Each slide is one absolutely-positioned layer of the pinned
                // stage, so all three occupy the SAME box and only opacity
                // separates them - see globals.css. The ordinal in the class
                // name is what picks the slide's window on the shared
                // timeline; a fourth layer needs a fourth keyframe set and the
                // windows re-derived, which is why they are not generated.
                //
                // Two arrangements were tried and discarded before this one.
                // Three full-screen panels in flow put the next picture a
                // screen below the last, so the reader travelled to it rather
                // than watching it replace what was there. Giving the section
                // heading its own screen made that worse, not better: it moved
                // the first picture a whole screen away from the words
                // introducing it.
                return (
                  <li
                    key={l.n}
                    className={`layer-slide layer-slide-${i + 1} w-full`}
                  >
                    <div className="flex w-full flex-row-reverse items-center justify-center gap-9 max-[1199px]:flex-col">
                      {/* THE FLOOR THAT ALIGNS THE THREE TEXT BLOCKS IS
                        `.layer-col`, AND IT LIVES IN globals.css. It used to
                        be `min-h-[300px]` here, which stopped being right on
                        8 Sep 2026 when panel 02 took four reasons and grew to
                        695px on its own. Two things forced the move:

                        The value is DERIVED from the tallest panel and has to
                        be re-measured whenever this copy changes - see the
                        rule for the measurements and the budget it has to
                        stay inside.

                        And it must apply ONLY where the pinned stage does.
                        `items-center` centres each column against the plate,
                        so a column's own height decides where its first line
                        lands; a floor above the tallest makes all three the
                        same box and every panel's ordinal starts on the same
                        line. In the fallback - under 1200px, without
                        scroll-driven animations, or under reduced motion -
                        the panels are in FLOW, one under the next, and there
                        is nothing to align. A floor there is just ~350px of
                        dead space under panels 01 and 03, which is why a
                        Tailwind literal could not do this job any more. */}
                      <div className="layer-col flex flex-1 flex-col items-start gap-6 max-[1199px]:w-full max-[1199px]:flex-none">
                        <p className="page-label text-fg-faint">{l.n}</p>

                        <h3 className="display text-[28px] md:text-[36px]">
                          {l.title}
                        </h3>

                        <p className="max-w-[560px] text-[16px] leading-6 text-fg-muted">
                          {l.body}
                        </p>

                        {/* THE PANEL'S PICTURE COPY - see `aside` in
                            content/manifesto.ts for why it exists and why it
                            is not a caption. `text-fg` rather than the body's
                            `text-fg-muted`: it is a claim, not supporting
                            detail, and it takes the weight the caption under
                            the plate used to carry. */}
                        {l.aside?.note && (
                          <p className="max-w-[560px] text-[16px] leading-6 text-fg">
                            {l.aside.note}
                          </p>
                        )}

                        {/* The four reasons, as the ruled <dl> the beliefs
                            list and `WhoWeServe` use - NOT a card grid, and
                            not the two-column split those two take at `md`.
                            This column is half the row, so a second column
                            here would set four-word lines.

                            IT IS THE TALLEST THING IN THE SEQUENCE, which is
                            what sets the `min-h` on the column above: all
                            three panels have to be the same box or their
                            ordinals land at different heights. Measure it
                            again if this copy grows. */}
                        {l.aside?.reasons && (
                          <div className="w-full max-w-[560px]">
                            <p className="page-label text-fg">
                              {l.aside.title}
                            </p>

                            <dl className="layer-reasons mt-3.5 divide-y divide-line border-y border-line">
                              {l.aside.reasons.map((r) => (
                                <div key={r.n} className="py-3">
                                  <dt className="flex items-baseline gap-4">
                                    <span className="page-label shrink-0 text-fg-faint">
                                      {r.n}
                                    </span>
                                    <span className="text-[15px] leading-snug font-medium">
                                      {r.title}
                                    </span>
                                  </dt>

                                  {/* No hanging indent under the ordinal. The
                                      column is too narrow to give up 38px of
                                      measure, and the rule between rows is
                                      already doing the grouping. */}
                                  <dd className="mt-1.5 text-[13px] leading-5 text-fg-muted">
                                    {r.body}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                        )}

                        {last && (
                          <>
                            <p className="max-w-[560px] text-[16px] leading-6 text-fg">
                              {layers.note}
                            </p>

                            {/* Solid rather than ghost: the ghost variant is a
                              1%-white fill with no border - legible over the
                              hero footage and over a dark band, all but
                              invisible on a white one. */}
                            <CtaButton href="/solutions/fundraising">
                              {layers.cta}
                            </CtaButton>
                          </>
                        )}
                      </div>

                      {/* Bare on all three panels since 8 Sep 2026 - the
                        captions came off when the copy that replaced them
                        landed in the text column. See `LAYER_MEDIA`. */}
                      {Diagram && (
                        <Plate>
                          <Diagram />
                        </Plate>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* THE TEAM CLOSES THE PAGE, by request on 8 Sep 2026. It sat THIRD
          until then, between the track record and the divergence, and the
          argument read straight past it: five faces arrived before the reader
          had been told what the firm believes or where the gap sits. Last is
          where the file comment at the top of this page always said it
          belonged - "who does the work" is the end of that sequence, and it
          only now matches the markup.

          IT IS THE LAST BLOCK BEFORE THE CLOSING BAND, not before the footer.
          `CtaBand` still ends the page, because it ends all five routes and
          the site's ending is not this page's to change.

          It also keeps the band alternation intact, which is the thing to
          re-check after any move here: light header, dark thesis, light
          divergence, dark beliefs, light layers, DARK TEAM. The layers
          section above it is light, so this block staying `dark` is what
          stops the two from merging into one very long section. */}
      <section data-band="dark" className={`section-y ${FULL_SCREEN}`}>
        <div className="shell">
          <SectionHeading
            eyebrow={about.team.eyebrow}
            title={about.team.title}
            lede={about.team.lede}
          />

          {/* THREE ACROSS, TWO ROWS OF THREE (9 Sep 2026, by request).

              THE RULE THIS REPLACES WAS "the column count is the headcount",
              and it was written when five people in a four- or three-column
              grid always left an orphan on a second row. Six divides by three,
              so the orphan is gone either way and the argument became a
              straight trade: six across held the whole team on one screen at
              ~196px a card, three across enlarges the portrait and costs a
              second row. The portraits won, and were then capped back to
              ~344px by the `max-w` below.

              WHAT MOVED WITH IT, because a column width is never only a column
              width. The `sizes` below (the only other place the count is
              written down). The name and bio, which step UP at `sm` - 20px and
              13px were sized for a 196-254px column and read as fine print
              under a 344px portrait; the note about a 24px name wrapping
              applies to the narrow column, not this one. `MAX_WIDTH` in
              scripts/optimize-team-photos.mjs, which went 640 -> 832 because
              the card outgrew its own crops at 2x DPR. And the block's HEIGHT:
              this section is now comfortably past its `min-h-svh` floor rather
              than sitting on it.

              A SEVENTH PERSON FITS WITHOUT A LAYOUT CHANGE - 3+3+1 leaves the
              orphan back, so it is eight that needs a decision, and four
              across is the answer then rather than a narrower card.

              The type steps down with the column - 20px name, 13px bio -
              because a 24px display name wraps in a 254px column, and the
              column is 196px now.

              THERE IS NO TWO-COLUMN STEP, AND THAT IS THE SAME DECISION AS
              THE FIVE-COLUMN ONE. It went 1 -> 2 -> 5 at first, which left
              640-1023px on two columns: a card reaches 472px there, the
              portrait under it 590px, and the block hit 2721px at 1023 - the
              exact bloat this layout was changed to remove, one breakpoint
              down. Three columns from `sm` holds the card between 184 and
              307px across that whole range and the block between 1.3k and
              1.6k. Six people divide by three exactly, which five did not -
              that breakpoint was the reason the card carries no chrome, and it
              is the one place the sixth arrival made the layout tidier rather
              than tighter.

              NO CARD. There is no border, no fill and no padding around the
              whole thing: the only frame is on the picture, and the type sits
              on the band. That mattered more when the last row was ragged; it
              is kept because the cards still have to sit on the band cleanly
              wherever the count and the columns stop dividing - under 640px
              they are one per row, and any future headcount can put the
              orphan back.

              THE BIOS ARE RENDERED AGAIN, under the role, by request on
              7 Sep 2026. They came off when the grid was rebuilt around the
              reference's photo-name-role card, which puts bios behind a
              "Read Bio" overlay instead. Two things follow from putting them
              back, and both are load-bearing:

              They are DRAFT copy about six NAMED, IDENTIFIABLE PEOPLE, and
              they are now public rather than sitting unrendered in
              content/team.ts. That is why each one describes the SEAT rather
              than the person - no career history, no prior firms, no
              credentials, because none of that was ever sourced. Do not
              "improve" them by inventing any. docs/COPY-REVIEW.md tracks
              them, and the entry there is now about copy that ships, not copy
              that is merely kept.

              The row still cannot break: the picture, name and role all sit
              at a fixed height, so the bio is the only thing that varies and
              it varies BELOW everything else. Cards in a row therefore stay
              aligned down to the role no matter how long a bio runs. */}
          {/* SIX ACROSS AT `lg`, AND THE COLUMN COUNT IS THE HEADCOUNT. It
              was five until 9 Sep 2026, when an Associate was added: a sixth
              card under a five-column track is one portrait alone on a second
              row, which is the ragged break this grid was written to avoid.
              `sm:grid-cols-3` needs no change and is better off for it - five
              broke 3+2 there and six breaks 3+3.

              Two rows of three was the alternative and it does not fit: the
              cards would be ~416px wide, so a row runs ~700px with its name,
              role and bio, and two of them overflow the section's `min-h-svh`
              on any laptop. One row of six holds ~196px cards, which the 640px
              crops still cover at 2x DPR.

              **The `sizes` below is part of this.** It is the only place the
              column count is stated twice, so change both or next/image starts
              fetching a 5-column image for a 6-column box. */}
          {/* THE 1080px CAP IS WHAT SIZES THE PORTRAIT (9 Sep 2026, by
              request - "a bit smaller"). Three across the full 1296px shell
              gave a 416px card, which was the largest anything on this page
              has ever been; capped, the card is 344px and the block loses
              ~180px of height with it.

              It is a cap on the GRID, not on the picture, so the photograph
              and the name, role and bio under it all narrow together - a
              max-width on the frame alone would leave every portrait
              visibly narrower than its own caption. And it only bites above a
              ~1200px viewport, because that is where `.shell` first hands out
              more than 1080px of content; every breakpoint below is unchanged
              and still fills its column.

              **`mx-auto` PUTS THE LEFTOVER ON BOTH SIDES** (9 Sep 2026, by
              request). Left-aligned, the cap spent all ~216px of it as one
              empty margin down the right of the section, which read as a
              column missing rather than as a narrower block. Centred, the
              first portrait no longer lines up with the eyebrow and the
              heading above it - that is the trade, and it is the wanted one:
              the heading is a full-width run and the grid is a plate inside
              it. Do not "fix" the alignment by dropping the cap; that is what
              made the portraits too big in the first place. */}
          <ul className="mt-16 grid max-w-[1080px] grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3 lg:mx-auto">
            {team.map((m) => (
              <li key={m.name} className="flex flex-col">
                {/* `aspect-[4/5]` is the contract with
                    scripts/optimize-team-photos.mjs, which crops every source
                    to exactly this. Change one and change the other, or the
                    `object-cover` starts throwing away a band of each photo.

                    The monogram FALLBACK stays: `photo` is nullable, a
                    seventh member can arrive before their picture does - the
                    sixth arrived WITH one on 9 Sep 2026 - and an empty frame
                    is worse than initials.

                    `placeholder="blur"` is not decoration. These six are the
                    only images on the page, they sit ~4000px down it, and
                    next/image lazy-loads by default - so scrolling here before
                    they decode showed a row of EMPTY BORDERED FRAMES on the
                    dark band. The frame's own `bg-ground-alt` is the same #151515
                    as the band behind it, so "not loaded yet" and "nothing
                    here" looked identical, and the section read as a blank
                    slab rather than as loading. The data URIs are generated
                    from the same crops by the pipeline (content/team-blur.ts,
                    generated) so they cannot drift from the photos. Guarded
                    rather than assumed: a portrait added without re-running
                    the script falls back to `empty` instead of throwing.

                    `alt=""` is deliberate. The name is the very next element
                    and is a heading, so alt text here would make a screen
                    reader read every name twice. */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-line bg-ground-alt">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt=""
                      fill
                      // One column, then three the whole way up, so 100vw
                      // then 33vw. Rounded UP, and increasingly so: the grid
                      // caps at 1080px, so the card stops growing at ~344px
                      // and 33vw over-states it on every screen past ~1200px.
                      // Over-fetching costs bytes, under-fetching costs
                      // sharpness. 344px at 2x wants 688px, which is why
                      // MAX_WIDTH in the photo script is 832 - three of the
                      // six masters reach it and the rest stop at their own
                      // ceiling; the script's note says which.
                      sizes="(max-width: 639px) 100vw, 33vw"
                      placeholder={teamBlur[m.photo] ? "blur" : "empty"}
                      blurDataURL={teamBlur[m.photo]}
                      className="object-cover"
                    />
                  ) : (
                    <span className="display absolute inset-0 flex items-center justify-center text-3xl text-fg-muted">
                      {m.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  )}
                </div>

                {/* Steps up with the column: 20px was sized for the
                    196-254px card this grid used to hold, and reads as fine
                    print against a 416px portrait. */}
                <h3 className="display mt-6 text-xl sm:text-2xl">{m.name}</h3>

                {/* `page-label` rather than `eyebrow`: this run has to stay
                    monochrome. `eyebrow` carries the accent and renders a
                    dozen times a page as a BLOCK's name - six job titles are
                    neither, and colouring them would put the loudest thing on
                    the page under every portrait. Same 14px uppercase spec,
                    no colour of its own, which is the whole reason that
                    utility does not own one. */}
                <p className="page-label mt-2 text-fg-muted">{m.role}</p>

                {/* Centred to match the name and role above it rather than
                    ranged left, which would leave the only left-aligned run
                    in the card sitting under two centred ones.
                    `text-balance` is what makes that read as deliberate: at
                    this measure every bio sets in two or three lines, and
                    without it the last line is regularly one orphaned word.

                    Guarded on `m.bio` for the same reason the photo is:
                    `bio` is nullable, and a seventh member can arrive before
                    their copy does. */}
                {m.bio && (
                  <p className="mt-3 text-[13px] leading-relaxed text-pretty text-fg-muted sm:mt-4 sm:text-[15px]">
                    {m.bio}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NO `FULL_SCREEN` HERE, and it is not an omission. This band is the
          same component on all five routes and it must READ the same on all
          five - it took the floor for one build and /about's footer stood
          half again as tall as every other page's. The full-screen rhythm is
          this page's, the closing band is the site's. */}
      <CtaBand />
    </>
  );
}
