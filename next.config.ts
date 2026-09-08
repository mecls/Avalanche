import type { NextConfig } from "next";

/**
 * Four redirects, all 307, all for routes that have moved.
 *
 * /process no longer exists - the step timeline it carried became /solutions,
 * which has since split into two views. It now lands on the Fundraising one
 * DIRECTLY rather than bouncing through /solutions, so nothing takes two hops.
 *
 * /solutions is no longer a page. It is the parent of /solutions/fundraising
 * and /solutions/secondaries, and it sends readers to Fundraising - the view
 * with real copy. The nav's "Solutions" link still points here, so this
 * redirect is on the hot path and not just a legacy catch.
 *
 * `permanent: false` (307) ON PURPOSE for both, and /process is the reason the
 * rule exists. A previous 308 from /process to /solutions#fundraising is still
 * cached in any browser that followed it, and a 308 cannot be withdrawn - no
 * response header un-caches one already issued. A 307 keeps every one of these
 * moves revisable, which matters on a route that has now moved three times.
 * If the old 308 fires instead, it is harmless: the fragment is dead but the
 * destination redirects on to the same place.
 *
 * /team and /manifesto are the newest pair and they moved together: both were
 * folded into /about on 7 Sep 2026, which is the old /team's portraits and
 * press with the old /manifesto's argument set in front of them. /team lands
 * at the top of it. /manifesto lands on `#manifesto`, the id on the divergence
 * section, because that is where its own content starts - without the fragment
 * an existing link would drop the reader at the top of a page twice as long as
 * the one they asked for, above copy they have already decided they do not
 * want. The fragment is safe here for the same reason the 307 is: nothing
 * about this is cached permanently, and the id is real markup in
 * app/about/page.tsx rather than a section that might quietly stop existing.
 *
 * Purge the CDN cache on the next deploy either way.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/process",
        destination: "/solutions/fundraising",
        permanent: false,
      },
      {
        source: "/solutions",
        destination: "/solutions/fundraising",
        permanent: false,
      },
      {
        source: "/team",
        destination: "/about",
        permanent: false,
      },
      {
        source: "/manifesto",
        destination: "/about#manifesto",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
