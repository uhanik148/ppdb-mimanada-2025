/*
  Warnings:

  - You are about to drop the column `pendaftaranOnline` on the `InfoPendaftaranContent` table. All the data in the column will be lost.
  - You are about to drop the column `verifikasiBerkas` on the `InfoPendaftaranContent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InfoPendaftaranContent" DROP COLUMN "pendaftaranOnline",
DROP COLUMN "verifikasiBerkas",
ADD COLUMN     "mulaiPendaftaranOnline" TIMESTAMP(3),
ADD COLUMN     "mulaiVerifikasiBerkas" TIMESTAMP(3),
ADD COLUMN     "selesaiPendaftaranOnline" TIMESTAMP(3),
ADD COLUMN     "selesaiVerifikasiBerkas" TIMESTAMP(3);
