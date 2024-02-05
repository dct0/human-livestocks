import { db } from "@/utils/db";

/**
 * Delete all stock prices that have the same memberId and createdAt time
 */
async function main() {
  const stockPrices = await db.stockPrice.findMany();

  const traversed = new Set<string>();

  for (const stockPrice of stockPrices) {
    if (traversed.has(stockPrice.id)) {
      continue;
    }
    const dupeStockPrices = await db.stockPrice.findMany({
      where: {
        memberId: stockPrice.memberId,
        createdAt: stockPrice.createdAt,
      },
    });
    dupeStockPrices.map(({ id }) => id).forEach((id) => traversed.add(id));

    if (dupeStockPrices.length > 1) {
      console.log(
        "Deleting dupe stock prices for member",
        stockPrice.memberId,
        "at",
        stockPrice.createdAt,
      );
      await db.stockPrice.deleteMany({
        where: {
          id: {
            not: stockPrice.id,
          },
          memberId: stockPrice.memberId,
          createdAt: stockPrice.createdAt,
        },
      });
    }
  }

  console.log("Done");
}

main();
