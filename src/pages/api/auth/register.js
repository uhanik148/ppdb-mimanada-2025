import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { nama, nisn, password } = req.body;

  if (!nama || !nisn || !password) {
    return res.status(400).json({ message: 'Semua field wajib diisi.' });
  }

  try {
    const existing = await prisma.calonSiswa.findUnique({
      where: { nisn },
    });

    if (existing) {
      return res.status(400).json({ message: 'NISN sudah terdaftar.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCalon = await prisma.calonSiswa.create({
      data: {
        nama,
        nisn,
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: 'Akun berhasil dibuat', calonSiswa: newCalon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal membuat akun', error: error.message });
  }
}
