/*
  Warnings:

  - Changed the type of `pass_reset_token` on the `ResetPassword` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pass_rest_token_expires` on the `ResetPassword` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ResetPassword" DROP COLUMN "pass_reset_token",
ADD COLUMN     "pass_reset_token" INTEGER NOT NULL,
DROP COLUMN "pass_rest_token_expires",
ADD COLUMN     "pass_rest_token_expires" TIMESTAMP(3) NOT NULL;
