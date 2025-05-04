import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, password } = req.body;

  const admin = await prisma.admin.findUnique({
    where: { name },
  });

  if (!admin) {
    return res.status(401).json({ message: "Nama admin tidak ditemukan" });
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    return res.status(401).json({ message: "Password salah" });
  }

  const token = jwt.sign(
    { id: admin.id, name: admin.name },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({ token });
}
