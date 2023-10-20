import { ScheduledTask } from "@sapphire/plugin-scheduled-tasks";

export class StocksTask extends ScheduledTask {
  public constructor(
    context: ScheduledTask.Context,
    options: ScheduledTask.Options,
  ) {
    super(context, {
      ...options,
      interval: 3_0000 * 60, // 30 minutes
    });
  }

  public run(): void {
    this.container.logger.info("Interval task ran!");
  }
}
