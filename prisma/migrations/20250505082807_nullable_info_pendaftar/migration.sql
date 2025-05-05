-- AlterTable
ALTER TABLE "InfoPendaftaranContent" ALTER COLUMN "sectionTitle" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "biayaPendaftaran" DROP NOT NULL,
ALTER COLUMN "daftarUlang" DROP NOT NULL,
ALTER COLUMN "emailInformasi" DROP NOT NULL,
ALTER COLUMN "kontakInformasi" DROP NOT NULL,
ALTER COLUMN "pendaftaranOnline" DROP NOT NULL,
ALTER COLUMN "pengumuman" DROP NOT NULL,
ALTER COLUMN "persyaratanDokumen" DROP NOT NULL,
ALTER COLUMN "prosedur" DROP NOT NULL,
ALTER COLUMN "tesSeleksi" DROP NOT NULL,
ALTER COLUMN "verifikasiBerkas" DROP NOT NULL;
