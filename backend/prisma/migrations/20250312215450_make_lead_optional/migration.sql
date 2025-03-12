/*
  Warnings:

  - You are about to drop the column `convertedAt` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `address` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leadSource` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_leadId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "convertedAt",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "leadSource" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "sex" TEXT NOT NULL,
ALTER COLUMN "leadId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
