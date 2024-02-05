import { db } from "@/utils/db";

/**
 * Delete all stock prices that have the same memberId and createdAt time
 */
async function main() {
  const traversed = new Set<string>();
  const stockPrices = await db.stockPrice.findMany();

  for (const stockPrice of stockPrices) {
    if (traversed.has(stockPrice.id)) {
      continue;
    }

    // 5 min window
    const upperDate = stockPrice.createdAt.getTime() + 150000;
    const lowerDate = stockPrice.createdAt.getTime() - 150000;

    const dupeStockPrices = await db.stockPrice.findMany({
      where: {
        NOT: {
          id: stockPrice.id,
        },
        memberId: stockPrice.memberId,
        createdAt: {
          gte: new Date(lowerDate),
          lte: new Date(upperDate),
        },
      },
    });
    dupeStockPrices.map(({ id }) => id).forEach((id) => traversed.add(id));

    if (dupeStockPrices.length > 0) {
      console.log(
        "Deleting dupe stock prices for member",
        stockPrice.memberId,
        "at",
        stockPrice.createdAt,
      );
      await db.stockPrice.deleteMany({
        where: {
          id: {
            in: dupeStockPrices.map(({ id }) => id),
          },
        },
      });
    }
  }

  console.log("Done");
}

main();
