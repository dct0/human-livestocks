/* eslint-disable no-console -- rage */
import "./types/augments";
import "dotenv/config";

import { envSchema } from "./schemas/env";
import { Client } from "./client";

import "@sapphire/plugin-api/register";
import "@sapphire/plugin-hmr/register";
import "@sapphire/plugin-logger/register";
// import "@sapphire/plugin-scheduled-tasks/register";

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(env.error.issues);
  throw new Error(env.error.message);
}

const client = new Client();

void client.login(process.env.BOT_TOKEN);
