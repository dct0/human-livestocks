/*
  Warnings:

  - A unique constraint covering the columns `[memberId,price,createdAt]` on the table `StockPrice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StockPrice_memberId_price_createdAt_key" ON "StockPrice"("memberId", "price", "createdAt");
