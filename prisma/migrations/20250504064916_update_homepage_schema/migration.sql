/*
  Warnings:

  - You are about to drop the `ProfileContent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `aboutDescription` to the `HomepageContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aboutTitle` to the `HomepageContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ppdbImages` to the `HomepageContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationInfo` to the `HomepageContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationSteps` to the `HomepageContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirements` to the `HomepageContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HomepageContent" ADD COLUMN     "aboutDescription" TEXT NOT NULL,
ADD COLUMN     "aboutTitle" TEXT NOT NULL,
ADD COLUMN     "ppdbImages" TEXT NOT NULL,
ADD COLUMN     "registrationInfo" TEXT NOT NULL,
ADD COLUMN     "registrationSteps" TEXT NOT NULL,
ADD COLUMN     "requirements" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProfileContent";

-- CreateTable
CREATE TABLE "Facility" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "homepageContentId" INTEGER NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Facility" ADD CONSTRAINT "Facility_homepageContentId_fkey" FOREIGN KEY ("homepageContentId") REFERENCES "HomepageContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
