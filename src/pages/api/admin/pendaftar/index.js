import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const pendaftar = await prisma.calonSiswa.findMany({
      select: {
        nama: true,
        nisn: true,
        forms: {
          select: {
            nik: true,
            tanggalLahir: true,
            dokumenPersyaratan: true // Gunakan field yang ada di schema
          },
          take: 1 // Ambil 1 form pertama saja
        }
      },
      orderBy: { createdAt: "desc" }
    });

    const data = pendaftar.map((siswa) => {
      const form = siswa.forms[0] || {}; // Default object kosong
      
      return {
        nama: siswa.nama || "Nama tidak tersedia",
        nisn: siswa.nisn || "NISN tidak tersedia",
        status: (form.nik && form.tanggalLahir && form.dokumenPersyaratan) 
          ? "Lengkap" 
          : "Belum Lengkap"
      };
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ 
      error: "Internal Server Error",
      details: error.message
    });
  }
}