import { db } from "@/utils/db";
import { Decimal } from "decimal.js";

/**
 * Recalculate the scores for all messages
 * For now, only do this for calculatedScore === 0
 */
async function main() {
  const messages = await db.message.findMany({
    where: {
      calculatedScore: 0,
    },
    include: {
      impressions: true,
    },
  });

  const promises = [];
  for (const message of messages) {
    const calculatedScore = message.impressions.reduce(
      (acc, impression) => acc.add(impression.score),
      new Decimal(message.baseScore),
    );

    promises.push(
      db.message.update({
        where: {
          id: message.id,
        },
        data: {
          calculatedScore,
        },
      }),
    );
  }

  await Promise.all(promises);

  console.log("Done");
}

main();
