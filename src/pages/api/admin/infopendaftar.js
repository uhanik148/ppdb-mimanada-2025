// pages/api/admin/pendaftaran.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const content = await prisma.infoPendaftaranContent.findFirst();
    res.status(200).json(content);
  } else if (req.method === 'PUT') {
    const { sectionTitle, description, brosurUrl, googleDocUrl, daftarUrl } = req.body;
    const existing = await prisma.infoPendaftaranContent.findFirst();

    if (existing) {
      const updated = await prisma.infoPendaftaranContent.update({
        where: { id: existing.id },
        data: { sectionTitle, description, brosurUrl, googleDocUrl, daftarUrl },
      });
      res.status(200).json(updated);
    } else {
      const created = await prisma.infoPendaftaranContent.create({
        data: { sectionTitle, description, brosurUrl, googleDocUrl, daftarUrl },
      });
      res.status(201).json(created);
    }
  } else {
    res.status(405).end();
  }
}
