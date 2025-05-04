/*
  Warnings:

  - The primary key for the `Berkas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Berkas` table. All the data in the column will be lost.
  - You are about to drop the column `formId` on the `Berkas` table. All the data in the column will be lost.
  - You are about to drop the column `jenisFile` on the `Berkas` table. All the data in the column will be lost.
  - You are about to drop the column `namaFile` on the `Berkas` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Berkas` table. All the data in the column will be lost.
  - The `id` column on the `Berkas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[berkasId]` on the table `Form` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `calonSiswaId` to the `Berkas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dokumenPersyaratan` to the `Berkas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Berkas" DROP CONSTRAINT "Berkas_formId_fkey";

-- DropIndex
DROP INDEX "Berkas_formId_key";

-- DropIndex
DROP INDEX "Form_calonSiswaId_key";

-- AlterTable
ALTER TABLE "Berkas" DROP CONSTRAINT "Berkas_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "formId",
DROP COLUMN "jenisFile",
DROP COLUMN "namaFile",
DROP COLUMN "url",
ADD COLUMN     "calonSiswaId" TEXT NOT NULL,
ADD COLUMN     "dokumenPersyaratan" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Berkas_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "berkasId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Form_berkasId_key" ON "Form"("berkasId");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_berkasId_fkey" FOREIGN KEY ("berkasId") REFERENCES "Berkas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Berkas" ADD CONSTRAINT "Berkas_calonSiswaId_fkey" FOREIGN KEY ("calonSiswaId") REFERENCES "CalonSiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
