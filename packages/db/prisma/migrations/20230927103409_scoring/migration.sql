/*
  Warnings:

  - Added the required column `channelId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "rate" DECIMAL(65,30) NOT NULL DEFAULT 1,
ADD COLUMN     "stock" DECIMAL(65,30) NOT NULL DEFAULT 100;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "channelId" TEXT NOT NULL,
ADD COLUMN     "guildId" TEXT,
ALTER COLUMN "score" SET DATA TYPE DECIMAL(65,30);
