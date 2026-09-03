import type { NextConfig } from "next";

/**
 * No redirects.
 *
 * There used to be a permanent one from /process to /solutions#fundraising,
 * from when the process page was folded into Solutions. /process is a real
 * route again (app/process/page.tsx), so it has been removed.
 *
 * NOTE for deployment: that redirect was a 308, which browsers and CDNs cache
 * indefinitely. Anyone whose browser followed it while it was live will keep
 * being sent to /solutions until they clear it. Purge the CDN cache on the
 * next deploy; there is no header that can un-cache a 308 already issued.
 */
const nextConfig: NextConfig = {};

export default nextConfig;
