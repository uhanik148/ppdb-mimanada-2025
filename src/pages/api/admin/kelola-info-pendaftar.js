// pages/api/admin/kelola-info-pendaftar.js
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const data = await prisma.InfoPendaftaranContent.findMany();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { sectionTitle, description, brosurUrl, googleDocUrl, daftarUrl } = req.body;
      const newData = await prisma.InfoPendaftaranContent.create({
        data: { sectionTitle, description, brosurUrl, googleDocUrl, daftarUrl },
      });
      return res.status(201).json(newData);
    }

    if (req.method === "PUT") {
      const { id, sectionTitle, description, brosurUrl, googleDocUrl, daftarUrl } = req.body;
      const updated = await prisma.InfoPendaftaranContent.update({
        where: { id: parseInt(id) },
        data: { sectionTitle, description, brosurUrl, googleDocUrl, daftarUrl },
      });      
      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      const { id } = req.body;
      await prisma.InfoPendaftaranContent.delete({
        where: { id: parseInt(id) },
      });      
      return res.status(204).end();
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}