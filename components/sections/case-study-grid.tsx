"use client";

import { useMemo, useState } from "react";
import { CaseStudyTile } from "@/components/ui/case-study-card";
import { CATEGORIES, caseStudies, type Category } from "@/content/case-studies";

function SearchGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-fg-faint"
    >
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5 14 14" strokeLinecap="round" />
    </svg>
  );
}

function ChevronGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-fg-faint"
    >
      <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Search + category filter over the case studies, then the tile grid.
 *
 * The category filter is a native <select> rather than a row of pills: with
 * four options whose labels run long ("Placement agencies / Investment
 * banks"), pills wrapped to two lines and pushed the grid down. The native
 * control also gives the mobile picker for free.
 */
export function CaseStudyGrid() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All categories");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return caseStudies.filter((c) => {
      const matchesCategory =
        category === "All categories" || c.category === category;
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.result.toLowerCase().includes(q) ||
        c.metric.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search customer stories</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all customer stories"
            className="w-full rounded-md border border-line bg-card py-3 pr-11 pl-5 text-sm text-fg outline-none transition-colors placeholder:text-fg-faint focus-visible:border-fg/40 [&::-webkit-search-cancel-button]:hidden"
          />
          <SearchGlyph />
        </label>

        <label className="relative sm:w-[19rem]">
          <span className="sr-only">Filter by category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full appearance-none rounded-md border border-line bg-card py-3 pr-11 pl-5 text-sm text-fg outline-none transition-colors focus-visible:border-fg/40"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-ground text-fg">
                {c}
              </option>
            ))}
          </select>
          <ChevronGlyph />
        </label>
      </div>

      {/* The reference prints no result count. Kept for screen readers only —
          without it, filtering is a silent change to a list far below. */}
      <p aria-live="polite" className="sr-only">
        {results.length} {results.length === 1 ? "story" : "stories"}
      </p>

      {results.length > 0 ? (
        <div className="mt-10 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((study) => (
            <CaseStudyTile key={study.slug} study={study} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-lg border border-dashed border-line px-6 py-16 text-center text-sm text-fg-muted">
          No stories match that search.
        </p>
      )}
    </div>
  );
}
