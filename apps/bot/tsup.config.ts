import { defineConfig } from "tsup";

// eslint-disable-next-line import/no-default-export -- fuck you
export default defineConfig({
  entry: [
    "src/index.ts",
    "src/commands",
    "src/constants",
    "src/listeners",
    "src/routes",
    // "src/scheduled-tasks", // add back when this works
    "src/schemas",
    "src/types",
    "src/utils",
  ],
  splitting: false,
  sourcemap: false,
  clean: true,
  noExternal: ["db", "stocks"],
});
