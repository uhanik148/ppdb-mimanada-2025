/*
  Warnings:

  - You are about to drop the column `bukuPembayaran` on the `Berkas` table. All the data in the column will be lost.
  - You are about to drop the column `fotoAkta` on the `Berkas` table. All the data in the column will be lost.
  - You are about to drop the column `fotoKk` on the `Berkas` table. All the data in the column will be lost.
  - You are about to drop the column `ijazahTk` on the `Berkas` table. All the data in the column will be lost.
  - You are about to drop the column `scanPkh` on the `Berkas` table. All the data in the column will be lost.
  - Added the required column `jenisFile` to the `Berkas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaFile` to the `Berkas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Berkas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Berkas" DROP COLUMN "bukuPembayaran",
DROP COLUMN "fotoAkta",
DROP COLUMN "fotoKk",
DROP COLUMN "ijazahTk",
DROP COLUMN "scanPkh",
ADD COLUMN     "jenisFile" TEXT NOT NULL,
ADD COLUMN     "namaFile" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
