/*
  Warnings:

  - You are about to drop the column `lastCronnedAt` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Message` table. All the data in the column will be lost.
  - Added the required column `guildId` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseScore` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdById` on table `Message` required. This step will fail if there are existing NULL values in that column.
  - Made the column `guildId` on table `Message` required. This step will fail if there are existing NULL values in that column.
  - Made the column `memberId` on table `StockPrice` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ImpressionType" AS ENUM ('REACTION');

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_createdById_fkey";

-- DropForeignKey
ALTER TABLE "StockPrice" DROP CONSTRAINT "StockPrice_memberId_fkey";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "lastCronnedAt",
ADD COLUMN     "guildId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "score",
ADD COLUMN     "baseScore" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "createdById" SET NOT NULL,
ALTER COLUMN "guildId" SET NOT NULL;

-- AlterTable
ALTER TABLE "StockPrice" ALTER COLUMN "memberId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastCronnedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Impressions" (
    "id" TEXT NOT NULL,
    "type" "ImpressionType" NOT NULL,
    "discriminator" TEXT,
    "score" DECIMAL(65,30) NOT NULL,
    "messageId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Impressions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Impressions" ADD CONSTRAINT "Impressions_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Impressions" ADD CONSTRAINT "Impressions_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockPrice" ADD CONSTRAINT "StockPrice_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
