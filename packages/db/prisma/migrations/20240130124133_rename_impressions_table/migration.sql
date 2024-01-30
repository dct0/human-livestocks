/*
  Warnings:

  - You are about to drop the `Impressions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Impressions" DROP CONSTRAINT "Impressions_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Impressions" DROP CONSTRAINT "Impressions_messageId_fkey";

-- DropTable
DROP TABLE "Impressions";

-- CreateTable
CREATE TABLE "Impression" (
    "id" TEXT NOT NULL,
    "type" "ImpressionType" NOT NULL,
    "discriminator" TEXT,
    "score" DECIMAL(65,30) NOT NULL,
    "messageId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Impression_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Impression" ADD CONSTRAINT "Impression_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Impression" ADD CONSTRAINT "Impression_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
