/*
  Warnings:

  - You are about to drop the column `namaAyah` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `namaIbu` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `pekerjaanAyah` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `pekerjaanIbu` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `pendapatanAyah` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `pendapatanIbu` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `ttlAyah` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `ttlIbu` on the `Form` table. All the data in the column will be lost.
  - Added the required column `namaWali` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pekerjaanWali` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pendapatanWali` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ttlWali` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "namaAyah",
DROP COLUMN "namaIbu",
DROP COLUMN "pekerjaanAyah",
DROP COLUMN "pekerjaanIbu",
DROP COLUMN "pendapatanAyah",
DROP COLUMN "pendapatanIbu",
DROP COLUMN "ttlAyah",
DROP COLUMN "ttlIbu",
ADD COLUMN     "namaWali" TEXT NOT NULL,
ADD COLUMN     "pekerjaanWali" TEXT NOT NULL,
ADD COLUMN     "pendapatanWali" TEXT NOT NULL,
ADD COLUMN     "ttlWali" TEXT NOT NULL;
