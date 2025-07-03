/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const coreConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // tidying up so that we can do this via github actions
  },
  images: {
    remotePatterns: [{ hostname: "iqfvwphdv7.ufs.sh" }],
  },
};

// Injected content via Sentry wizard below

import { withSentryConfig } from "@sentry/nextjs";

const sentryConfig = {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "ace-code",
  project: "ace-gallery",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  widenClientFileUpload: true,

  // tunnelRoute: "/monitoring",

  disableLogger: true,

  automaticVercelMonitors: true,
};

export default withSentryConfig(coreConfig, sentryConfig);
