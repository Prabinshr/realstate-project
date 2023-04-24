-- CreateEnum
CREATE TYPE "Purpose" AS ENUM ('RENT', 'SALE');

-- CreateEnum
CREATE TYPE "PropertyCategory" AS ENUM ('COMMERCIAL', 'SEMICOMMERCIAL', 'RESIDENTAL');

-- CreateEnum
CREATE TYPE "PropertyFace" AS ENUM ('EAST', 'WEST', 'NORTH', 'SOUTH');

-- CreateEnum
CREATE TYPE "PriceLabel" AS ENUM ('PERMONTH', 'PERYEAR', 'PERANNA', 'PERKATTHA', 'PERROPHANI', 'PERHAAT', 'PERBIGHA', 'TOTALPRICE');

-- CreateEnum
CREATE TYPE "RoadType" AS ENUM ('BLACKTOPPED', 'CONCRETE', 'GRAVEL', 'OFFROAD', 'NOROAD', 'ALLEY', 'PAVED');

-- CreateEnum
CREATE TYPE "AreaType" AS ENUM ('HAAT', 'ROPANI', 'ANNA', 'KATTHA', 'BIGGA', 'SQUAREFEET');

-- CreateEnum
CREATE TYPE "Negotiable" AS ENUM ('YES', 'NO');

-- CreateTable
CREATE TABLE "Land" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT,
    "purpose" "Purpose" NOT NULL,
    "propertyType" "PropertyCategory" NOT NULL,
    "propertyFace" "PropertyFace" NOT NULL,
    "address" TEXT NOT NULL,
    "landmark" TEXT,
    "roadType" "RoadType",
    "roadAccess" TEXT,
    "areaType" "AreaType" NOT NULL,
    "area" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "priceLabel" "PriceLabel" NOT NULL,
    "negotiable" "Negotiable" NOT NULL,
    "propertyTitle" TEXT NOT NULL,
    "propertyDescription" TEXT,
    "ownerName" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Land_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Land" ADD CONSTRAINT "Land_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
