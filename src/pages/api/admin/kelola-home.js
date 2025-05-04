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
    const {
      heroTitle,
      heroSubtitle,
      heroImage,
      aboutTitle,
      aboutDescription,
      registrationInfo,
      registrationSteps,
      requirements,
      ppdbImages,
      facilities,
    } = req.body;

    const existing = await prisma.homepageContent.findFirst({
      include: { facilities: true },
    });

    if (existing) {
      await prisma.facility.deleteMany({ where: { homeId: existing.id } });

      const updated = await prisma.homepageContent.update({
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
          facilities: {
            create: facilities.map(f => ({ title: f.title, content: f.content })),
          },
        },
      });
      return res.status(200).json(updated);
    } else {
      const created = await prisma.homepageContent.create({
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
          facilities: {
            create: facilities.map(f => ({ title: f.title, content: f.content })),
          },
        },
      });
      return res.status(201).json(created);
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}
