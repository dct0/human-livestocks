import { type ExtendedPrismaClient } from "db";
import { type EnvSchema } from "../schemas/env";

declare module "@sapphire/pieces" {
  interface Container {
    db: ExtendedPrismaClient;
  }
}

// declare module "@sapphire/plugin-scheduled-tasks" {
//   interface ScheduledTasks {
//     stocks: never;
//   }
// }

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- rage
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface -- rage
    interface ProcessEnv extends EnvSchema {}
  }
}
