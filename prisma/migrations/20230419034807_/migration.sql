-- CreateTable
CREATE TABLE "ResetPassword" (
    "email" TEXT NOT NULL,
    "pass_reset_token" TEXT NOT NULL,
    "pass_rest_token_expires" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetPassword_email_key" ON "ResetPassword"("email");
