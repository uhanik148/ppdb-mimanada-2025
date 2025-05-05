/*
  Warnings:

  - Added the required column `biayaPendaftaran` to the `InfoPendaftaranContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `daftarUlang` to the `InfoPendaftaranContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailInformasi` to the `InfoPendaftaranContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kontakInformasi` to the `InfoPendaftaranContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pendaftaranOnline` to the `InfoPendaftaranContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pengumuman` to the `InfoPendaftaranContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `persyaratanDokumen` to the `InfoPendaftaranContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prosedur` to the `InfoPendaftaranContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tesSeleksi` to the `InfoPendaftaranContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `InfoPendaftaranContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verifikasiBerkas` to the `InfoPendaftaranContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InfoPendaftaranContent" ADD COLUMN     "biayaPendaftaran" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "daftarUlang" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "emailInformasi" TEXT NOT NULL,
ADD COLUMN     "kontakInformasi" TEXT NOT NULL,
ADD COLUMN     "pendaftaranOnline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pengumuman" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "persyaratanDokumen" TEXT NOT NULL,
ADD COLUMN     "prosedur" TEXT NOT NULL,
ADD COLUMN     "tesSeleksi" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verifikasiBerkas" TIMESTAMP(3) NOT NULL;
