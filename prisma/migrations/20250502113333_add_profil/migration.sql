-- CreateTable
CREATE TABLE "Profil" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "tentang" TEXT NOT NULL,
    "visi" TEXT NOT NULL,
    "misi" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "kepala" TEXT NOT NULL,
    "kutipan" TEXT NOT NULL,

    CONSTRAINT "Profil_pkey" PRIMARY KEY ("id")
);
