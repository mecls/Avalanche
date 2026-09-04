import Link from "next/link";
import { solutionViews, type SolutionSlug } from "@/content/solutions";

/**
 * The Fundraising / Secondaries switch at the head of /solutions.
 *
 * TWO LINKS, NOT A BUTTON GROUP. This is the whole reason the two views are
 * separate routes: a stateful tab would have made /solutions a client
 * component, and that page is deliberately the one with none — its rail and
 * text reveal are CSS `view-timeline`, which a re-render on tab change would
 * restart. Links also mean each view is deep-linkable, back/forward works, and
 * the nav dropdown has somewhere to point.
 *
 * The active view is passed in rather than read from `usePathname`, so this
 * stays a server component. Each route knows which one it is.
 *
 * `aria-current="page"` is the accessible signal; the fill is decoration on
 * top of it. It is `bg-fg text-ground` — the same inverted pair the buttons
 * use — so it is a dark pill on a light band and a light pill on a dark one
 * from the one set of classes.
 */
export function SolutionsToggle({ active }: { active: SolutionSlug }) {
  return (
    <div
      role="group"
      aria-label="Choose a solution"
      className="inline-flex items-center gap-1 rounded-full border border-line p-1"
    >
      {solutionViews.map((view) => {
        const current = view.slug === active;
        return (
          <Link
            key={view.slug}
            href={view.href}
            aria-current={current ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-[14px] leading-[16.8px] font-medium transition-colors ${
              current
                ? "bg-fg text-ground"
                : "text-fg-muted hover:bg-fg/[0.06] hover:text-fg"
            }`}
          >
            {view.label}
          </Link>
        );
      })}
    </div>
  );
}
