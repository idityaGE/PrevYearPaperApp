/*
  Warnings:

  - A unique constraint covering the columns `[name,departmentId]` on the table `Program` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Program_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Program_name_departmentId_key" ON "Program"("name", "departmentId");
