// pages/api/admin/home.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const content = await prisma.homepageContent.findFirst();
    res.status(200).json(content);
  } else if (req.method === 'PUT') {
    const { heroTitle, heroSubtitle, heroImage } = req.body;
    const existing = await prisma.homepageContent.findFirst();

    if (existing) {
      const updated = await prisma.homepageContent.update({
        where: { id: existing.id },
        data: { heroTitle, heroSubtitle, heroImage },
      });
      res.status(200).json(updated);
    } else {
      const created = await prisma.homepageContent.create({
        data: { heroTitle, heroSubtitle, heroImage },
      });
      res.status(201).json(created);
    }
  } else {
    res.status(405).end();
  }
}
