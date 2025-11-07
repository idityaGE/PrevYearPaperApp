/*
  Warnings:

  - Added the required column `subject` to the `Query` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Query" ADD COLUMN     "subject" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verficationToken" TEXT,
ADD COLUMN     "verficationTokenExpiresAt" TIMESTAMP(3);
