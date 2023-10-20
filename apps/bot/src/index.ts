/* eslint-disable no-console -- rage */
import "dotenv/config";

import { envSchema, type EnvSchema } from "./schemas/env";
import { Client } from "./client";

import "@sapphire/plugin-api/register";
import "@sapphire/plugin-hmr/register";
import "@sapphire/plugin-logger/register";
import "@sapphire/plugin-scheduled-tasks/register";

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(env.error.issues);
  throw new Error(env.error.message);
}

const client = new Client();

void client.login(process.env.BOT_TOKEN);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- rage
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface -- rage
    interface ProcessEnv extends EnvSchema {}
  }
}
