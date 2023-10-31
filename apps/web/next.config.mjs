/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const { env } = await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: ["db", "ui"],
  // eslint-disable-next-line @typescript-eslint/require-await
  redirects: async () => [
    {
      source: "/invite",
      destination: env.INVITE_URL,
      permanent: true,
    },
  ],
  // output: "standalone",
};

export default config;
