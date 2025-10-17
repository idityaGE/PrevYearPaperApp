/*
  Warnings:

  - You are about to drop the `AdminResponse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."AdminResponse" DROP CONSTRAINT "AdminResponse_adminId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AdminResponse" DROP CONSTRAINT "AdminResponse_queryId_fkey";

-- AlterTable
ALTER TABLE "Query" ADD COLUMN     "adminId" INTEGER,
ADD COLUMN     "respondedAt" TIMESTAMP(3),
ADD COLUMN     "response" TEXT;

-- DropTable
DROP TABLE "public"."AdminResponse";

-- AddForeignKey
ALTER TABLE "Query" ADD CONSTRAINT "Query_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
