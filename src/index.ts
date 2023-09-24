import "dotenv/config";

import { envSchema, type EnvSchema } from "./schemas/env";

import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits, OAuth2Scopes } from "discord.js";

import "@sapphire/plugin-api/register";
import "@sapphire/plugin-logger/register";
import "@sapphire/plugin-hmr/register";

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(env.error.issues);
  throw new Error(env.error.message);
}

const client = new SapphireClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  api: {
    auth: {
      id: process.env.CLIENT_ID,
      secret: process.env.CLIENT_SECRET,
      scopes: [OAuth2Scopes.Identify, OAuth2Scopes.Guilds],
      cookie: "SAPPHIRE_AUTH",
      domainOverwrite:
        process.env.NODE_ENV === "development" ? "127.0.0.1" : undefined,
    },
    prefix: "api/",
  },
  hmr: {
    enabled: process.env.NODE_ENV === "development",
  },
});

void client.login(process.env.BOT_TOKEN);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface ProcessEnv extends EnvSchema {}
  }
}
