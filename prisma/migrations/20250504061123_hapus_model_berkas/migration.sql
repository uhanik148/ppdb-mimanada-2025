/*
  Warnings:

  - You are about to drop the column `berkasId` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the `Berkas` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[calonSiswaId]` on the table `Form` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Berkas" DROP CONSTRAINT "Berkas_calonSiswaId_fkey";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_berkasId_fkey";

-- DropIndex
DROP INDEX "Form_berkasId_key";

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "berkasId",
ADD COLUMN     "dokumenPersyaratan" TEXT;

-- DropTable
DROP TABLE "Berkas";

-- CreateIndex
CREATE UNIQUE INDEX "Form_calonSiswaId_key" ON "Form"("calonSiswaId");
