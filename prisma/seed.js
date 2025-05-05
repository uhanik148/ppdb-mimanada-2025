import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
	// Hapus semua data terlebih dahulu
	console.log('🗑️ Menghapus semua data...');
	await prisma.facility.deleteMany({});
	await prisma.homepageContent.deleteMany({});
	await prisma.profil.deleteMany({});
	await prisma.admin.deleteMany({});
	console.log('✅ Semua data berhasil dihapus!');
	// Seed Admin
	const hashedPassword = await bcrypt.hash('mimanada123', 10);
	await prisma.admin.upsert({
		where: { name: 'admin' },
		update: {},
		create: {
			name: 'admin',
			password: hashedPassword,
		},
	});
	console.log('✅ Admin user created!');

	// Seed Profil
	await prisma.profil.create({
		data: {
			tentang:
				'MI Ma\'arif Nailul Huda didirikan pada tahun 1994 oleh para tokoh masyarakat Kebonsari. Sekolah ini hadir untuk mencetak generasi unggul yang cerdas secara intelektual, berakhlak mulia, serta siap menghadapi tantangan masa depan.\n\nMI Kebonsari memiliki komitmen kuat terhadap pentingnya pendidikan bagi generasi penerus. Keberadaan madrasah ini bertujuan untuk menyediakan fasilitas pendidikan yang berkualitas serta mencetak siswa-siswi yang unggul dalam berbagai aspek, baik akademik maupun non-akademik.\n\nSaat ini, MI Kebonsari beroperasi dalam satu kompleks dengan Pondok Pesantren "ATTAUBAH", sebuah lembaga pendidikan Islam yang berperan dalam pembentukan karakter dan akhlak peserta didik. Pondok pesantren ini diasuh oleh KH. Nuriyadin, M.Fil.I, yang juga menjabat sebagai Ketua Pengurus Maarif Nailul Huda Kebonsari. Dengan adanya sinergi antara MI Kebonsari dan Pondok Pesantren "ATTAUBAH", diharapkan lulusan madrasah ini tidak hanya memiliki kecerdasan intelektual, tetapi juga kedalaman spiritual serta karakter yang kuat untuk menghadapi tantangan masa depan.',
			visi: 'Terbentuknya Peserta Didik Yang Unggul Prestasi, Berbudi Luhur, Berbudaya, dan Berwawasan Global.',
			misi: 'Mengembangkan pembelajaran yang aktif, kreatif, dan inovatif. Melaksanakan pembelajaran yang berpusat pada peserta didik dan berdiferensiasi. Menyelenggarakan kegiatan pengembangan diri berbasis keterampilan/teknologi dan kecakapan hidup yang berwawasan lingkungan. Menumbuhkan penghayatan terhadap ajaran agama yang dianut sebagai landasan kearifan lokal dalam bergaul dan bertindak. Mengoptimalkan pelaksanaan 5K secara produktif, efektif, dan efisien.',
			kepalaMadrasah: 'Bapak Mahfudz S.Ag',
			sambutan: 'Kami berkomitmen membimbing siswa menuju masa depan gemilang, berlandaskan iman dan ilmu.',
			keunggulan: 'Lingkungan Islami. Guru Profesional. Kurikulum Terintegrasi. Ekstrakurikuler Menarik. Teknologi Pembelajaran. Kerja Sama Wali Murid.',
		},
	});
	console.log('✅ Profil seeded!');

	// Seed Homepage Content
	await prisma.homepageContent.create({
		data: {
			heroTitle: "Selamat Datang di MI Ma'arif Nailul Huda",
			heroSubtitle: 'Penerimaan Peserta Didik Baru Tahun 2025/2026',
			heroImage: '/alurppdb.jpg',
			aboutTitle: "Tentang MI Ma'arif Nailul Huda",
			aboutDescription: 'Madrasah unggulan berbasis Islam, ilmu pengetahuan, dan teknologi.',
			registrationInfo: 'Informasi lengkap PPDB Tahun Ajaran 2025/2026',
			registrationSteps: '1. Isi Formulir\n2. Upload Dokumen\n3. Verifikasi Data\n4. Pengumuman',
			requirements: '1. Fotokopi Akta\n2. Fotokopi Kartu Keluarga\n3. Pas Foto 3x4',
			ppdbImages: '/alurppdb.jpg',
			facilities: {
				create: [
					{ title: 'Ruang Kelas Nyaman', content: 'Dilengkapi kipas angin dan papan tulis whiteboard.' },
					{ title: 'Perpustakaan Digital', content: 'Akses buku dan e-book islami dan umum.' },
					{ title: 'Lapangan Luas', content: 'Digunakan untuk olahraga dan kegiatan upacara.' },
				],
			},
		},
	});
	console.log('✅ Homepage content created!');
}

main()
	.then(() => console.log('🎉 Semua data berhasil di-seed!'))
	.catch(console.error)
	.finally(() => prisma.$disconnect());
