"use client";

import { useMemo, useState } from "react";
import { CaseStudyCard } from "@/components/ui/case-study-card";
import { CATEGORIES, caseStudies, type Category } from "@/content/case-studies";

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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="relative w-full md:max-w-xs">
          <span className="sr-only">Search customer stories</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all customer stories"
            className="w-full rounded-md border border-line bg-card px-5 py-2.5 text-sm text-fg outline-none transition-colors placeholder:text-fg-faint focus-visible:border-fg/40"
          />
        </label>

        <div
          role="group"
          aria-label="Filter by category"
          className="flex flex-wrap gap-2"
        >
          {CATEGORIES.map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-4 py-2 text-[0.8125rem] transition-colors ${
                  active
                    ? "border-fg bg-fg text-ground"
                    : "border-line text-fg-muted hover:border-fg/25 hover:text-fg"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" className="mt-8 text-sm text-fg-faint">
        {results.length} {results.length === 1 ? "story" : "stories"}
      </p>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-lg border border-dashed border-line px-6 py-16 text-center text-sm text-fg-muted">
          No stories match that search.
        </p>
      )}
    </div>
  );
}
