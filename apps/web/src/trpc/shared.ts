import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

import { type AppRouter } from "@/server/api/root";

export const transformer = superjson;

function getBaseUrl() {
  if (typeof window !== "undefined") return "";

  console.log("NETLIFY", process.env.NETLIFY);
  console.log("NEXTAUTH_URL", process.env.NEXTAUTH_URL);
  console.log("URL", process.env.URL);
  console.log("DEPLOY_URL", process.env.DEPLOY_URL);

  // Netlify -- dumb hack?
  if (process.env.NETLIFY)
    return `http://localhost:${process.env.PORT ?? 3000}`;

  // Vercel
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // Docker
  if (process.env.INTERNAL_ADDRESS)
    return `http://${process.env.INTERNAL_ADDRESS}:${process.env.PORT ?? 3000}`;

  // Local
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
