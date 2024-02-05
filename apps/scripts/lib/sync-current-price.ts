import { db } from "@/utils/db";

async function main() {
  const members = await db.member.findMany({
    include: {
      stockPrices: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  for (const member of members) {
    const currentStockPrice = member.stockPrices[0]!;
    if (!currentStockPrice) {
      console.log("No stock price found for member", member.id);
      continue;
    }

    console.log(
      "Syncing current stock price for member",
      member.id,
      "with",
      currentStockPrice.price,
      "at",
      currentStockPrice.createdAt,
    );

    try {
      await db.member.update({
        where: { id: member.id },
        data: {
          currentPrice: currentStockPrice.price,
        },
      });
    } catch (error) {
      console.error("Error updating member", member.id, error);
    }
  }

  console.log("Done");
}

main();
