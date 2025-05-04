import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await prisma.homepageContent.findFirst({
        include: { facilities: true }, // jika ada relasi
      });
      res.status(200).json(data);
    } catch (error) {
      console.error('API GET /api/homepage error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
