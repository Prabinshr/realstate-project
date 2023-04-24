/*
  Warnings:

  - Added the required column `status` to the `House` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('VERIFIED', 'UNVERIFIED', 'PENDING');

-- AlterTable
ALTER TABLE "House" ADD COLUMN     "status" "Status" NOT NULL;
