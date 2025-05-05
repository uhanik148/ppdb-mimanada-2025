import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	try {
		const data = await prisma.calonSiswa.findMany({
			include: {
				forms: true,
			},
			orderBy: { createdAt: 'desc' },
		});

		res.status(200).json(data);
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({
			error: 'Internal Server Error',
			details: error.message,
		});
	}
}
