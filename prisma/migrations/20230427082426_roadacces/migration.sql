/*
  Warnings:

  - The `roadAccess` column on the `Land` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Land" DROP COLUMN "roadAccess",
ADD COLUMN     "roadAccess" INTEGER;
