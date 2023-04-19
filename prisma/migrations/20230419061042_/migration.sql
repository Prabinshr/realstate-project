/*
  Warnings:

  - Changed the type of `pass_reset_token_expires` on the `ResetPassword` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ResetPassword" DROP COLUMN "pass_reset_token_expires",
ADD COLUMN     "pass_reset_token_expires" INTEGER NOT NULL;
