// pages/api/admin/kelola-info-pendaftar.js
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
	try {
		if (req.method === 'GET') {
			const data = await prisma.InfoPendaftaranContent.findFirst();
			return res.status(200).json(data);
		}

		if (req.method === 'PUT') {
			const {
				id,
				sectionTitle,
				description,
				mulaiPendaftaranOnline,
				selesaiPendaftaranOnline,
				mulaiVerifikasiBerkas,
				selesaiVerifikasiBerkas,
				tesSeleksi,
				pengumuman,
				daftarUlang,
				persyaratanDokumen,
				biayaPendaftaran,
				kontakInformasi,
				emailInformasi,
				prosedur,
				brosurUrl,
				googleDocUrl,
				daftarUrl,
			} = req.body;

			console.log('========== BODY =============');
			console.log(req.body);

			let data = {
				sectionTitle,
				description,
				mulaiPendaftaranOnline: new Date(mulaiPendaftaranOnline),
				selesaiPendaftaranOnline: new Date(selesaiPendaftaranOnline),
				mulaiVerifikasiBerkas: new Date(mulaiVerifikasiBerkas),
				selesaiVerifikasiBerkas: new Date(selesaiVerifikasiBerkas),
				tesSeleksi: new Date(tesSeleksi),
				pengumuman: new Date(pengumuman),
				daftarUlang: new Date(daftarUlang),
				persyaratanDokumen,
				biayaPendaftaran: parseFloat(biayaPendaftaran),
				kontakInformasi,
				emailInformasi,
				prosedur,
				brosurUrl,
				googleDocUrl,
				daftarUrl,
			};

			console.log('========== data =============');
			console.log(data);

			let result;
			if (id) {
				// Update jika id ada
				result = await prisma.InfoPendaftaranContent.update({
					where: { id: parseInt(id) },
					data,
				});
			} else {
				// Create jika id tidak ada
				result = await prisma.InfoPendaftaranContent.create({
					data,
				});
			}

			return res.status(200).json(result);
		}

		return res.status(405).json({ message: 'Method not allowed' });
	} catch (error) {
		console.error('API error:', error);
		return res.status(500).json({ message: 'Internal Server Error', error: error.message });
	}
}
