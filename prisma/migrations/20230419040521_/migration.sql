/*
  Warnings:

  - You are about to drop the column `pass_rest_token_expires` on the `ResetPassword` table. All the data in the column will be lost.
  - Added the required column `pass_reset_token_expires` to the `ResetPassword` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResetPassword" DROP COLUMN "pass_rest_token_expires",
ADD COLUMN     "pass_reset_token_expires" TIMESTAMP(3) NOT NULL;
