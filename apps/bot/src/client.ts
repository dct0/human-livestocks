import { LogLevel, SapphireClient, container } from "@sapphire/framework";
import { GatewayIntentBits, OAuth2Scopes } from "discord.js";
import { db } from "./db";

export class Client extends SapphireClient {
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
        origin: "*",
        listenOptions: {
          port: process.env.API_PORT,
        },
      },
      // tasks: {
      //   /* You can add your Bull options here, for example we can configure custom Redis connection options: */
      //   bull: {
      //     connection: {
      //       host: process.env.REDIS_HOST,
      //       port: process.env.REDIS_PORT,
      //       password: process.env.REDIS_PASSWORD,
      //       db: 0,
      //       tls: {
      //         secureProtocol: "TLS_method",
      //       },
      //     },
      //   },
      // },
      hmr: {
        enabled: process.env.NODE_ENV === "development",
      },
    });
  }

  public override async login(token?: string): Promise<string> {
    container.db = db;
    return super.login(token);
  }

  public override async destroy(): Promise<void> {
    await container.db.$disconnect();
    return super.destroy();
  }
}
