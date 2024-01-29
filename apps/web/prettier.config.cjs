// /** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
// convert to cjs because otherwise pnpm lint will fail when run from root...
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;
