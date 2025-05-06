// pages/api/form/create.js
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	try {
		await prisma.$connect();
	} catch (connError) {
		console.error('Database connection error:', connError);
		return res.status(500).json({ message: 'Tidak dapat terhubung ke database.', error: connError.message });
	}

	try {
		console.log('Received form data:', req.body);

		const {
			calonSiswaId, // Added this
			nik,
			tk,
			tanggalLahir,
			tempatLahir,
			alamat,
			agama,
			hobi,
			namaSekolah,
			statusSekolahAsal,
			alamatSekolah,
			tipeSekolah,
			namaWali,
			ttlWali,
			pekerjaanWali,
			pendapatanWali,
			noRumah,
		} = req.body;

		// Validate required fields
		if (!nik || !calonSiswaId) {
			return res.status(400).json({ message: 'NIK dan calonSiswaId wajib diisi.' });
		}

		// Cek apakah calonSiswaId ada pada tabel calonSiswa
		const existingCalon = await prisma.calonSiswa.findUnique({
			where: { id: calonSiswaId },
		});

		if (!existingCalon) {
			return res.status(404).json({ message: 'Data calon siswa tidak ditemukan.' });
		}

		try {
			// Create form data structure
			const formData = {
				calonSiswaId, // Include this
				nik,
				tanggalLahir: tanggalLahir ? new Date(tanggalLahir) : null,
				tk: tk || '',
				tempatLahir: tempatLahir || '',
				alamat: alamat || '',
				agama: agama || '',
				hobi: hobi || '',
				namaSekolah: namaSekolah || '',
				statusSekolahAsal: statusSekolahAsal || '',
				alamatSekolah: alamatSekolah || '',
				tipeSekolah: tipeSekolah || '',
				namaWali: namaWali || '',
				ttlWali: ttlWali || '',
				pekerjaanWali: pekerjaanWali || '',
				pendapatanWali: pendapatanWali || '',
				noRumah: noRumah || '',
			};

			console.log('Creating form with data:', formData);

			const createdForm = await prisma.form.create({
				data: formData,
			});

			console.log('Form created successfully:', createdForm);

			return res.status(200).json({
				id: createdForm.id,
				message: 'Form berhasil dibuat',
			});
		} catch (dbError) {
			console.error('Database operation error:', dbError);
			return res.status(500).json({
				message: 'Gagal menyimpan data ke database.',
				error: dbError.message,
				code: dbError.code,
			});
		}
	} catch (error) {
		console.error('General server error:', error);
		return res.status(500).json({
			message: 'Terjadi kesalahan di server.',
			error: error.message,
		});
	} finally {
		await prisma.$disconnect();
	}
}
