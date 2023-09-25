import { PrismaClient } from "@prisma/client";
import { LogLevel, SapphireClient, container } from "@sapphire/framework";
import { GatewayIntentBits, OAuth2Scopes } from "discord.js";

export default class Client extends SapphireClient {
  public constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
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
      },
      hmr: {
        enabled: process.env.NODE_ENV === "development",
      },
    });
  }

  public override async login(token?: string) {
    container.database = new PrismaClient();
    return super.login(token);
  }

  public override async destroy() {
    await container.database.$disconnect();
    return super.destroy();
  }
}

declare module "@sapphire/pieces" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Container {
    database: PrismaClient;
  }
}
