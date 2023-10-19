import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { Command } from "@sapphire/framework";
import { type Message } from "discord.js";

export class PingCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
    });
  }

  public override registerApplicationCommands(
    registry: Command.Registry,
  ): void {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("ping")
        .setDescription("Ping bot to see if it is alive")
        .toJSON(),
    );
  }

  public async chatInputRun(
    interaction: Command.ChatInputCommandInteraction,
  ): Promise<Message> {
    const message = await interaction.reply({
      content: `Ping?`,
      ephemeral: true,
      fetchReply: true,
    });

    if (isMessageInstance(message)) {
      const diff = message.createdTimestamp - interaction.createdTimestamp;
      const ping = Math.round(this.container.client.ws.ping);
      return interaction.editReply(
        `Pong 🏓! (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`,
      );
    }

    return interaction.editReply("Failed to retrieve ping :(");
  }
}
