// pages/api/admin/home.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const content = await prisma.homepageContent.findFirst();
		res.status(200).json(content);
	} else if (req.method === 'PUT') {
		const { heroTitle, heroSubtitle, heroDescription, heroButtonText, heroImage } = req.body;

		const existing = await prisma.homepageContent.findFirst();

		try {
			if (existing) {
				const updated = await prisma.homepageContent.update({
					where: { id: existing.id },
					data: {
						heroTitle,
						heroSubtitle,
						heroDescription,
						heroButtonText,
						heroImage,
						updatedAt: new Date(),
					},
				});
				res.status(200).json(updated);
			} else {
				const created = await prisma.homepageContent.create({
					data: {
						heroTitle,
						heroSubtitle,
						heroDescription,
						heroButtonText,
						heroImage,
						aboutTitle: '',
						aboutDescription: '',
						registrationInfo: '',
						registrationSteps: '',
						requirements: '',
						ppdbImages: '',
					},
				});
				res.status(201).json(created);
			}
		} catch (error) {
			console.error('Error updating homepage content:', error);
			res.status(500).json({ error: 'Gagal memperbarui konten homepage' });
		}
	} else {
		res.status(405).end();
	}
}
