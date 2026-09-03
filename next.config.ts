import type { NextConfig } from "next";

/**
 * /process no longer exists — the step timeline it carried is now /solutions,
 * cut back to two blocks. Anything that pointed at the old page lands there.
 *
 * `permanent: false` (307) ON PURPOSE, and it is the second time this route
 * has moved. A previous 308 from /process to /solutions#fundraising is still
 * cached in browsers that followed it, and a 308 cannot be withdrawn — no
 * response header un-caches one already issued. A 307 keeps this move
 * revisable. It also happens to be harmless if the old 308 fires instead: the
 * destination is the same page, just with a now-dead fragment.
 *
 * Purge the CDN cache on the next deploy either way.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/process", destination: "/solutions", permanent: false }];
  },
};

export default nextConfig;
