import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Seed Admin
  const hashedPassword = await bcrypt.hash("mimanada123", 10);
  await prisma.admin.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
      password: hashedPassword,
    },
  });
  console.log("✅ Admin user created!");

  // Seed Profil
  await prisma.profil.create({
    data: {
      tentang: "Isi default tentang...",
      visi: "Isi default visi...",
      misi: "Isi default misi...",
      kepalaMadrasah: "Bapak Mahfudz S.Ag",
      sambutan: "Sambutan dari kepala madrasah...",
      keunggulan: "Daftar keunggulan madrasah..."
    }
  });
  console.log("✅ Profil seeded!");

  // Seed Homepage Content
  await prisma.homepageContent.create({
    data: {
      heroTitle: "Selamat Datang di MI Ma'arif Nailul Huda",
      heroSubtitle: "Penerimaan Peserta Didik Baru Tahun 2025/2026",
      heroImage: "/alurppdb.jpg",
      aboutTitle: "Tentang MI Ma'arif Nailul Huda",
      aboutDescription: "Madrasah unggulan berbasis Islam, ilmu pengetahuan, dan teknologi.",
      registrationInfo: "Informasi lengkap PPDB Tahun Ajaran 2025/2026",
      registrationSteps: "1. Isi Formulir\n2. Upload Dokumen\n3. Verifikasi Data\n4. Pengumuman",
      requirements: "1. Fotokopi Akta\n2. Fotokopi Kartu Keluarga\n3. Pas Foto 3x4",
      ppdbImages: "/alurppdb.jpg",
      facilities: {
        create: [
          { title: "Ruang Kelas Nyaman", content: "Dilengkapi kipas angin dan papan tulis whiteboard." },
          { title: "Perpustakaan Digital", content: "Akses buku dan e-book islami dan umum." },
          { title: "Lapangan Luas", content: "Digunakan untuk olahraga dan kegiatan upacara." }
        ]
      }
    }
  });
  console.log("✅ Homepage content created!");
}

main()
  .then(() => console.log("🎉 Semua data berhasil di-seed!"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
