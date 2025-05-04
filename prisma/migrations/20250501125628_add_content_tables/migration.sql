/*
  Warnings:

  - You are about to drop the `PageContent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable

-- CreateTable
CREATE TABLE "HomepageContent" (
    "id" SERIAL NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroSubtitle" TEXT NOT NULL,
    "heroImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomepageContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileContent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfileContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfoPendaftaranContent" (
    "id" SERIAL NOT NULL,
    "sectionTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brosurUrl" TEXT NOT NULL,
    "googleDocUrl" TEXT NOT NULL,
    "daftarUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InfoPendaftaranContent_pkey" PRIMARY KEY ("id")
);
