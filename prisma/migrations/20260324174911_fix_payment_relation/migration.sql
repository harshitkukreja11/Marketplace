/*
  Warnings:

  - You are about to drop the column `slug` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `condition` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `expiryDate` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ListingAnalytics` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ListingAnalytics" DROP CONSTRAINT "ListingAnalytics_listingId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropIndex
DROP INDEX "Category_slug_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "slug",
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "city",
DROP COLUMN "condition",
DROP COLUMN "country",
DROP COLUMN "expiryDate",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ALTER COLUMN "status" SET DEFAULT 'available',
ALTER COLUMN "categoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "transactionId",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropTable
DROP TABLE "ListingAnalytics";

-- CreateTable
CREATE TABLE "Analytics" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "phoneClicks" INTEGER NOT NULL DEFAULT 0,
    "whatsappClicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
