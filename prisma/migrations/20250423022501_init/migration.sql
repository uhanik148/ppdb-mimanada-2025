/*
  Warnings:

  - You are about to drop the `Pendaftaran` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Pendaftaran";

-- CreateTable
CREATE TABLE "CalonSiswa" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CalonSiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "calonSiswaId" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "tk" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "agama" TEXT NOT NULL,
    "hobi" TEXT NOT NULL,
    "namaSekolah" TEXT NOT NULL,
    "statusSekolahAsal" TEXT NOT NULL,
    "alamatSekolah" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "namaAyah" TEXT NOT NULL,
    "ttlAyah" TEXT NOT NULL,
    "pekerjaanAyah" TEXT NOT NULL,
    "pendapatanAyah" TEXT NOT NULL,
    "namaIbu" TEXT NOT NULL,
    "ttlIbu" TEXT NOT NULL,
    "pekerjaanIbu" TEXT NOT NULL,
    "pendapatanIbu" TEXT NOT NULL,
    "noRumah" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Berkas" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "fotoKk" TEXT NOT NULL,
    "fotoAkta" TEXT NOT NULL,
    "ijazahTk" TEXT NOT NULL,
    "scanPkh" TEXT NOT NULL,
    "bukuPembayaran" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Berkas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CalonSiswa_nisn_key" ON "CalonSiswa"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "Form_calonSiswaId_key" ON "Form"("calonSiswaId");

-- CreateIndex
CREATE UNIQUE INDEX "Berkas_formId_key" ON "Berkas"("formId");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_calonSiswaId_fkey" FOREIGN KEY ("calonSiswaId") REFERENCES "CalonSiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Berkas" ADD CONSTRAINT "Berkas_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
