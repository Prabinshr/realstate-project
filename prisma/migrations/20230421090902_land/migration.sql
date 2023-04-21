/*
  Warnings:

  - You are about to drop the column `propertyType` on the `Land` table. All the data in the column will be lost.
  - Added the required column `propertyCategory` to the `Land` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Land" DROP COLUMN "propertyType",
ADD COLUMN     "propertyCategory" "PropertyCategory" NOT NULL;
