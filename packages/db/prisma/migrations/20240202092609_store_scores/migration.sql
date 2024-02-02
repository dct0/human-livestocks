/*
  Warnings:

  - A unique constraint covering the columns `[discriminator,messageId,createdById,type]` on the table `Impression` will be added. If there are existing duplicate values, this will fail.
  - Made the column `discriminator` on table `Impression` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Impression" ALTER COLUMN "discriminator" SET NOT NULL;

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "currentPrice" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "calculatedScore" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Impression_discriminator_messageId_createdById_type_key" ON "Impression"("discriminator", "messageId", "createdById", "type");
