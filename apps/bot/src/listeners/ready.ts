import { Events, Listener } from "@sapphire/framework";
import { type Client } from "../client";

export class ReadyListener extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      once: true,
      event: Events.ClientReady,
    });
  }

  public run(client: Client): void {
    if (!client.user) return;
    const { username, id } = client.user;
    void this.container.tasks.createRepeated();
    this.container.logger.info(`Successfully logged in as ${username} (${id})`);
  }
}
