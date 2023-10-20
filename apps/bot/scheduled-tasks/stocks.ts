import { ScheduledTask } from "@sapphire/plugin-scheduled-tasks";

export class StocksTask extends ScheduledTask {
  public constructor(
    context: ScheduledTask.Context,
    options: ScheduledTask.Options,
  ) {
    super(context, {
      ...options,
      interval: 5_000, // 30 seconds
    });
  }

  public run(): void {
    this.container.logger.info("Interval task ran!");
  }
}

declare module "@sapphire/plugin-scheduled-tasks" {
  interface ScheduledTasks {
    stocks: never;
  }
}
