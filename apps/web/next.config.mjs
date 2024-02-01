/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const { env } = await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: ["db", "ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
    ],
  },
  output: env.NEXT_OUTPUT,
};

export default config;
