/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[guildId,userId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Member_username_key";

-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "username",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Member_guildId_userId_idx" ON "Member"("guildId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_guildId_userId_key" ON "Member"("guildId", "userId");

-- CreateIndex
CREATE INDEX "Message_guildId_channelId_idx" ON "Message"("guildId", "channelId");

-- CreateIndex
CREATE INDEX "StockPrice_memberId_createdAt_idx" ON "StockPrice"("memberId", "createdAt" DESC);

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
