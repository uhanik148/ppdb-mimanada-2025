import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  // Normalize id (Next.js kadang beri array)
  const rawId = req.query.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!id) {
    return res
      .status(400)
      .json({ error: 'Missing or invalid ID (nisn) parameter' });
  }

  switch (req.method) {
    case 'GET':
      try {
        // Cari by nisn lalu by PK
        let calon = await prisma.calonSiswa.findUnique({
          where: { nisn: id },
        });
        if (!calon) {
          calon = await prisma.calonSiswa.findUnique({
            where: { id },
          });
        }
        if (!calon) {
          return res.status(404).json({ error: 'Data tidak ditemukan' });
        }

        const formData = await prisma.form.findFirst({
          where: { calonSiswaId: calon.id },
          include: { berkas: true },
        });

        return res
          .status(200)
          .json({ ...calon, form: formData || {} });
      } catch (err) {
        console.error('🔥 ERROR GET /pendaftar/[id]:', err);
        return res
          .status(500)
          .json({ error: 'Server error (GET)', message: err.message });
      }

    case 'DELETE':
      try {
        // Cari calonSiswa dulu
        let calon = await prisma.calonSiswa.findUnique({
          where: { nisn: id },
          include: { form: { include: { berkas: true } } },
        });
        if (!calon) {
          calon = await prisma.calonSiswa.findUnique({
            where: { id },
            include: { form: { include: { berkas: true } } },
          });
        }
        if (!calon) {
          return res.status(404).json({ error: 'Data tidak ditemukan' });
        }

        // Hapus berkas jika ada
        if (calon.form?.berkas?.length) {
          await prisma.berkas.deleteMany({
            where: { formId: calon.form.id },
          });
        }
        // Hapus form jika ada
        if (calon.form) {
          await prisma.form.delete({
            where: { id: calon.form.id },
          });
        }
        // Hapus calonSiswa
        await prisma.calonSiswa.delete({
          where: { id: calon.id },
        });

        return res
          .status(200)
          .json({ message: 'Data berhasil dihapus' });
      } catch (err) {
        console.error('🔥 ERROR DELETE /pendaftar/[id]:', err);
        return res
          .status(500)
          .json({ error: 'Server error (DELETE)', message: err.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
  }
}
