import { LogLevel, SapphireClient, container } from "@sapphire/framework";
import { Redis } from "ioredis";
import { GatewayIntentBits, OAuth2Scopes } from "discord.js";
import { db } from "./db";
import { bullConfig } from "./redis";

export class Client extends SapphireClient {
  public constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
      ],
      logger: {
        level: LogLevel.Debug,
      },
      loadMessageCommandListeners: true,
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
        origin: "*",
        listenOptions: {
          port: process.env.API_PORT,
        },
      },
      tasks: {
        /* You can add your Bull options here, for example we can configure custom Redis connection options: */
        bull: bullConfig,
      },
      hmr: {
        enabled: process.env.NODE_ENV === "development",
      },
    });
  }

  public override async login(token?: string): Promise<string> {
    // clear all repeated jobs
    const redis = new Redis(bullConfig.connection);
    await redis.flushall();
    await redis.quit();

    container.db = db;
    return super.login(token);
  }

  public override async destroy(): Promise<void> {
    const redis = new Redis(bullConfig.connection);
    await redis.flushall();
    await redis.quit();

    await container.db.$disconnect();
    return super.destroy();
  }
}
