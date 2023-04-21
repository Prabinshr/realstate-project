-- CreateEnum
CREATE TYPE "Negotiable" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "AreaType" AS ENUM ('HAAT', 'ROPANI', 'ANNA', 'KATTHA', 'BIGGA', 'SQUAREFEET');

-- CreateEnum
CREATE TYPE "PriceLabel" AS ENUM ('PERMONTH', 'PERYEAR', 'PERANNA', 'PERKATTHA', 'PERROPHANI', 'PERHAAT', 'PERBIGHA', 'TOTALPRICE');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('room', 'apartment', 'flat');

-- CreateEnum
CREATE TYPE "Purpose" AS ENUM ('RENT', 'SALE');

-- CreateEnum
CREATE TYPE "PropertyFace" AS ENUM ('EAST', 'WEST', 'NORTH', 'SOUTH');

-- CreateEnum
CREATE TYPE "RoadType" AS ENUM ('BLACKTOPPED', 'CONCRETE', 'GRAVEL', 'OFFROAD', 'NOROAD', 'ALLEY', 'PAVED');

-- CreateEnum
CREATE TYPE "PropertyCategory" AS ENUM ('COMMERCIAL', 'SEMICOMMERCIAL', 'RESIDENTAL');

-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL,
    "propertyTitle" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "priceLabel" "PriceLabel" NOT NULL,
    "address" TEXT NOT NULL,
    "negotiable" "Negotiable" NOT NULL,
    "livingRoom" INTEGER,
    "kitchen" INTEGER,
    "bedroom" INTEGER,
    "toilet" INTEGER,
    "bathroom" INTEGER,
    "roadAccess" INTEGER,
    "builtYear" INTEGER,
    "storey" INTEGER,
    "floor" INTEGER,
    "garage" INTEGER,
    "propertyId" TEXT,
    "category" "PropertyCategory" NOT NULL,
    "purpose" "Purpose" NOT NULL,
    "areaType" "AreaType" NOT NULL,
    "area" TEXT NOT NULL,
    "roadType" "RoadType",
    "propertyType" "PropertyType" NOT NULL,
    "propertyFace" "PropertyFace" NOT NULL,
    "PropertyFeature" TEXT[],
    "condition" TEXT NOT NULL,
    "landmark" TEXT,
    "ownerName" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "propertyDesc" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
