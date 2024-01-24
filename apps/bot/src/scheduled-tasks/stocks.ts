import { ScheduledTask } from "@sapphire/plugin-scheduled-tasks";
import { Decimal } from "decimal.js";
import { calculateNewRate } from "stocks";

export class StocksTask extends ScheduledTask {
  public constructor(
    context: ScheduledTask.Context,
    options: ScheduledTask.Options,
  ) {
    super(context, {
      ...options,
      name: "stocks-calculation",
      pattern: "30 4 * * *", // at 4:30am server time every day, for now...
      customJobOptions: {
        jobId: "stocks-calculation", // ensure there's only one, for now...
      },
    });
  }

  public async run(): Promise<void> {
    this.container.logger.info("Time to update stocks!");
    const guilds = await this.container.db.guild.findMany({});

    // TODO: a scheduled task for each guild
    const query = guilds.map((guild) => this.updateStocksForGuild(guild.id));
    await Promise.all(query);

    this.container.logger.info("Stocks updated!");
  }

  private async updateStocksForGuild(guildId: string): Promise<void> {
    this.container.logger.info(`Updating stocks for guild ${guildId}`);

    const now = new Date();

    const { lastCronnedAt } = await this.container.db.guild.findUniqueOrThrow({
      where: {
        id: guildId,
      },
    });

    // find members to calculate stocks for
    const members = await this.container.db.member.findMany({
      include: {
        messages: {
          where: {
            guildId,
            createdAt: {
              gte: lastCronnedAt ?? new Date(0),
            },
          },
          include: {
            impressions: {
              orderBy: {
                createdAt: "asc",
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        stockPrices: {
          orderBy: {
            createdAt: "desc",
          },
          take: 20,
        },
      },
    });

    // from all messages since last cron
    // and last 20 stock prices
    // calculate the new stock price

    const membersToUpdate: { id: string; newRate: Decimal }[] = [];

    for (const member of members) {
      // add up score of all messages and impressions
      const totalScores: Decimal[] = [];
      for (const message of member.messages) {
        const totalScore = message.baseScore;

        for (const [index, impression] of message.impressions.entries()) {
          totalScore.add(impression.score.mul(Decimal.ln(index + 1).add(2)));
        }

        // push the total score for this message to an array
        totalScores.push(totalScore);
      }

      // from the last 20 stock prices and the total scores for each message since the last cron, calculate new rate
      let newRate = calculateNewRate(member.stockPrices, totalScores);
      if (newRate.isNaN()) {
        // should always be one stock price but just in case...
        newRate = member.stockPrices[0]?.price.mul(0.95) ?? new Decimal(0);
      }
      membersToUpdate.push({
        id: member.id,
        newRate,
      });
    }

    // TODO: maybe we should store the cron date on the member instead of the guild
    await this.container.db.$transaction(
      async (prisma) => {
        for await (const member of membersToUpdate) {
          await prisma.stockPrice.addToMember(member.id, member.newRate);
        }

        await prisma.guild.update({
          where: {
            id: guildId,
          },
          data: {
            lastCronnedAt: now,
          },
        });
      },
      {
        // go as fast as possible
        isolationLevel: "ReadUncommitted",
      },
    );

    this.container.logger.info(`Updated stocks for guild ${guildId}`);
  }
}
