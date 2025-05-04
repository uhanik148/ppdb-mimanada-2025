/*
  Warnings:

  - You are about to drop the column `createdAt` on the `InfoPendaftaranContent` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `InfoPendaftaranContent` table. All the data in the column will be lost.
  - You are about to drop the column `kepala` on the `Profil` table. All the data in the column will be lost.
  - You are about to drop the column `kutipan` on the `Profil` table. All the data in the column will be lost.
  - You are about to drop the `PageContent` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "InfoPendaftaranContent" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "brosurUrl" DROP NOT NULL,
ALTER COLUMN "googleDocUrl" DROP NOT NULL,
ALTER COLUMN "daftarUrl" DROP NOT NULL;

-- AlterTable
CREATE SEQUENCE profil_id_seq;
ALTER TABLE "Profil" DROP COLUMN "kepala",
DROP COLUMN "kutipan",
ADD COLUMN     "kepalaMadrasah" TEXT,
ADD COLUMN     "keunggulan" TEXT,
ADD COLUMN     "sambutan" TEXT,
ALTER COLUMN "id" SET DEFAULT nextval('profil_id_seq'),
ALTER COLUMN "misi" SET NOT NULL,
ALTER COLUMN "misi" DROP DEFAULT,
ALTER COLUMN "misi" SET DATA TYPE TEXT;
ALTER SEQUENCE profil_id_seq OWNED BY "Profil"."id";

-- DropTable
DROP TABLE "PageContent";
