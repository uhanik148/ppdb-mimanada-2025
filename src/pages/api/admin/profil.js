import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const profil = await prisma.profil.findFirst();
      if (!profil) {
        return res.status(404).json({ error: "Profil tidak ditemukan" });
      }
      return res.status(200).json(profil);
    } catch (error) {
      return res.status(500).json({ error: "Terjadi kesalahan saat mengambil data", detail: error.message });
    }
  }

  if (req.method === 'PUT') {
    const {
      tentang,
      visi,
      misi,
      kepalaMadrasah,
      sambutan,
      keunggulan
    } = req.body;

    try {
      const updated = await prisma.profil.updateMany({
        data: {
          tentang,
          visi,
          misi,
          kepalaMadrasah,
          sambutan,
          keunggulan
        }
      });
      return res.status(200).json({ message: "Profil berhasil diperbarui", updated });
    } catch (error) {
      return res.status(500).json({ error: "Gagal memperbarui profil", detail: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
