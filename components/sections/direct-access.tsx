import { LogoGrid } from "@/components/sections/logo-grid";
import { directAccess } from "@/content/copy";
import { secondaryLogos } from "@/content/secondary-logos";

/**
 * The logo band at the foot of /solutions/secondaries: which companies we
 * currently hold secondary access in.
 *
 * **IT IS THE /customers "Trusted by" BLOCK, deliberately.** Same eyebrow +
 * display heading on the left, same framing paragraph set against it on the
 * right, same ruled `LogoGrid` beneath — because it is doing the same job, and
 * a second roster invented from scratch would have read as a different
 * template on a site that already has one for exactly this. It replaces the
 * three placeholder blocks that used to close this page (9 Sep 2026, by
 * request).
 *
 * `data-band="light"` with a `border-t`, matching `RaiseTypes` on the sister
 * route — this sits in the same slot there, between the numbered blocks and
 * the closing band, so the two routes still end the same way.
 *
 * **THREE ACROSS AT EVERY WIDTH, and that is arithmetic rather than taste.**
 * Nine marks divide by three and by nothing else on offer: the client grid's
 * 2/3/5 would leave one mark alone on a fourth row at the narrow end and four
 * on a second row at the wide end.
 *
 * **THE MARK BOX HAD TO GROW WITH THE CELL, and it is the one thing that does
 * not carry over from /customers.** That grid runs five across, so its cell is
 * ~259px wide and a 96px mark fills 37% of it; three across makes the cell
 * 432px and the same 96px mark sits marooned in the middle of it, which read
 * as nine small logos on a large empty table rather than as a roster. The
 * sizes below hold that 37% at each breakpoint — ~48px in a ~107px phone cell,
 * 112px at `sm`, 160px at `lg`. 160 is also the ceiling the masters allow:
 * scripts/secondary-logos.mjs writes them 320px on the long edge, which is
 * exactly 2x DPR there.
 *
 * The paragraph is not decoration. These logos claim live access to secondary
 * opportunities in named companies, which is a stronger statement than the
 * client roster's "these firms hired us" — the body is what scopes it to "a
 * selection", says the list is not exhaustive, and sends a specific request to
 * the team. See the note on `directAccess` in content/copy.ts.
 */
export function DirectAccess() {
  return (
    <section data-band="light" className="section-y border-t border-line-soft">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-5">{directAccess.eyebrow}</p>
            <h2 className="display text-[clamp(2.25rem,4vw,3.25rem)] text-balance">
              {directAccess.title}
            </h2>
          </div>
          <p className="text-[0.9375rem] leading-relaxed text-fg-muted lg:pt-12">
            {directAccess.body}
          </p>
        </div>

        <div className="mt-14 sm:mt-16">
          <LogoGrid
            logos={secondaryLogos}
            cols="grid-cols-3"
            markClassName="h-5 w-12 sm:h-9 sm:w-28 lg:h-12 lg:w-40"
            sizes="(max-width: 639px) 48px, (max-width: 1023px) 112px, 160px"
          />
        </div>
      </div>
    </section>
  );
}
