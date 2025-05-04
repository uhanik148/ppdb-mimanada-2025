// pages/api/test-db.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const count = await prisma.calonSiswa.count();
  res.status(200).json({ count });
}