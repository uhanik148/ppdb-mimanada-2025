import prisma from '@/lib/prisma';
import { parse } from 'cookie';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const cookies = parse(req.headers.cookie || '');
		const token = cookies.token;

		const siswa = await prisma.calonSiswa.findUnique({
			where: {
				id: token,
			},
		});

		return res.status(200).json({ token, siswa });
	}
}
