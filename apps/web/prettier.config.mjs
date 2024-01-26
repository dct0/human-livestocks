/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  plugins: [import.meta.resolve("prettier-plugin-tailwindcss")],
};

export default config;
