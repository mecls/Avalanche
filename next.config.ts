import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /process became the Fundraising entry on /solutions, which now covers both
  // Secondaries and Fundraising on one page — see app/solutions/page.tsx.
  async redirects() {
    return [
      { source: "/process", destination: "/solutions#fundraising", permanent: true },
    ];
  },
};

export default nextConfig;
