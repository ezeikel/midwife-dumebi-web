import { withSentryConfig } from "@sentry/nextjs";
import { withPlausibleProxy } from "next-plausible";
import type { NextConfig } from "next";

const nextConfig: NextConfig = withPlausibleProxy({
  scriptName: "pa-0PRrTT2VBy-lbb4JTUDXh",
})({
  cacheComponents: true,
  cacheLife: {
    // Blog list - updates via webhook when new posts published
    "blog-list": {
      stale: 60 * 60, // 1 hour - serve stale while revalidating
      revalidate: 60 * 60 * 24, // 24 hours - daily background revalidation
      expire: 60 * 60 * 24 * 30, // 30 days max
    },
    // Individual blog posts - rarely change, rely on webhook for updates
    "blog-post": {
      stale: 60 * 60 * 24, // 1 day - serve stale while revalidating
      revalidate: 60 * 60 * 24 * 7, // 7 days - weekly background revalidation
      expire: 60 * 60 * 24 * 90, // 90 days max
    },
    // Categories - rarely change
    "blog-categories": {
      stale: 60 * 60 * 24, // 1 day
      revalidate: 60 * 60 * 24 * 7, // 7 days
      expire: 60 * 60 * 24 * 30, // 30 days
    },
    // General daily cache (for year, etc)
    "days": {
      stale: 60 * 60 * 24, // 1 day
      revalidate: 60 * 60 * 24, // 1 day
      expire: 60 * 60 * 24 * 7, // 7 days
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
});

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "ezeikel",
  project: "midwife-dumebi",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Source maps configuration
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
});
