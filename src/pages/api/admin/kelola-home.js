// pages/api/admin/kelola-home.js
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const content = await prisma.homepageContent.findFirst({
			include: { facilities: true },
		});
		return res.status(200).json(content);
	}

	if (req.method === 'PUT') {
		const { heroTitle, heroSubtitle, heroImage, aboutTitle, aboutDescription, registrationInfo, registrationSteps, requirements, ppdbImages, facilities } = req.body;

		const existing = await prisma.homepageContent.findFirst({
			include: { facilities: true },
		});

		try {
			// Jika data sudah ada, update
			if (existing) {
				// Update data utama
				const updatedContent = await prisma.homepageContent.update({
					where: { id: existing.id },
					data: {
						heroTitle,
						heroSubtitle,
						heroImage,
						aboutTitle,
						aboutDescription,
						registrationInfo,
						registrationSteps,
						requirements,
						ppdbImages,
					},
				});

				// Hapus fasilitas lama jika ada
				if (existing.facilities?.length > 0) {
					await prisma.facility.deleteMany({
						where: { homepageContentId: existing.id },
					});
				}

				// Tambahkan fasilitas baru jika ada
				if (facilities && facilities.length > 0) {
					await prisma.facility.createMany({
						data: facilities.map((facility) => ({
							...facility,
							homepageContentId: existing.id,
						})),
					});
				}

				return res.status(200).json(updatedContent);
			}
			// Jika belum ada data, buat baru
			else {
				const newContent = await prisma.homepageContent.create({
					data: {
						heroTitle,
						heroSubtitle,
						heroImage,
						aboutTitle,
						aboutDescription,
						registrationInfo,
						registrationSteps,
						requirements,
						ppdbImages,
						facilities:
							facilities && facilities.length > 0
								? {
										create: facilities,
								  }
								: undefined,
					},
					include: { facilities: true },
				});

				return res.status(201).json(newContent);
			}
		} catch (error) {
			console.error('Error updating homepage content:', error);
			return res.status(500).json({
				message: 'Terjadi kesalahan saat menyimpan data',
				error: error.message,
			});
		}
	}

	res.status(405).json({ message: 'Method not allowed' });
}
