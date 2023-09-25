import "dotenv/config";

import { envSchema, type EnvSchema } from "./schemas/env";
import Client from "./client";

import "@sapphire/plugin-api/register";
import "@sapphire/plugin-hmr/register";
import "@sapphire/plugin-logger/register";

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(env.error.issues);
  throw new Error(env.error.message);
}

const client = new Client();

void client.login(process.env.BOT_TOKEN);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface ProcessEnv extends EnvSchema {}
  }
}
