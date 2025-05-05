import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	try {
		const calonSiswa = await prisma.calonSiswa.findMany({
			include: {
				forms: true,
			},
			orderBy: { createdAt: 'desc' },
		});

		// Cek kelengkapan data untuk setiap calon siswa
		const data = calonSiswa.map((siswa) => {
			// Periksa apakah semua field pada siswa terisi
			const siswaLengkap = Object.entries(siswa)
				.filter(([key]) => key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'forms')
				.every(([_, value]) => value !== null && value !== '');

			// Periksa apakah form juga lengkap (jika ada)
			const formLengkap =
				siswa.forms && Array.isArray(siswa.forms) && siswa.forms.length > 0
					? Object.entries(siswa.forms[0])
							.filter(([key]) => key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'calonSiswaId')
							.every(([_, value]) => value !== null && value !== '')
					: false;

			// Status lengkap jika data siswa dan form lengkap
			const isLengkap = siswaLengkap && formLengkap;

			return {
				...siswa,
				isLengkap,
			};
		});

		// Hitung jumlah data yang lengkap
		const count_data_lengkap = data.filter((item) => item.isLengkap).length;

		res.status(200).json({
			count_data_lengkap,
			data,
		});
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({
			error: 'Internal Server Error',
			details: error.message,
		});
	}
}
