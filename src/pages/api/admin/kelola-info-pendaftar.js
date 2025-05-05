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

			// Pastikan semua field sesuai dengan schema Prisma
			let data = {
				sectionTitle,
				description,
				mulaiPendaftaranOnline: mulaiPendaftaranOnline ? new Date(mulaiPendaftaranOnline) : null,
				selesaiPendaftaranOnline: selesaiPendaftaranOnline ? new Date(selesaiPendaftaranOnline) : null,
				mulaiVerifikasiBerkas: mulaiVerifikasiBerkas ? new Date(mulaiVerifikasiBerkas) : null,
				selesaiVerifikasiBerkas: selesaiVerifikasiBerkas ? new Date(selesaiVerifikasiBerkas) : null,
				tesSeleksi: tesSeleksi ? new Date(tesSeleksi) : null,
				pengumuman: pengumuman ? new Date(pengumuman) : null,
				daftarUlang: daftarUlang ? new Date(daftarUlang) : null,
				persyaratanDokumen,
				biayaPendaftaran: biayaPendaftaran ? parseFloat(biayaPendaftaran) : null,
				kontakInformasi,
				emailInformasi,
				prosedur,
				brosurUrl,
				googleDocUrl,
				daftarUrl,
			};

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
