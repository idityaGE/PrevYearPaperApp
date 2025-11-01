-- CreateTable
CREATE TABLE "AdminResponse" (
    "id" SERIAL NOT NULL,
    "queryId" INTEGER NOT NULL,
    "response" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminId" INTEGER NOT NULL,

    CONSTRAINT "AdminResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdminResponse" ADD CONSTRAINT "AdminResponse_queryId_fkey" FOREIGN KEY ("queryId") REFERENCES "Query"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminResponse" ADD CONSTRAINT "AdminResponse_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
