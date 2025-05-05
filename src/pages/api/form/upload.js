// pages/api/form/upload.js
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { uploadToDrive } from '@/lib/drive';
import prisma from '@/lib/prisma';
import { parse } from 'cookie';

// Nonaktifkan bodyParser bawaan
export const config = {
	api: { bodyParser: false },
};
// Pastikan folder tmp ada
const uploadDir = path.join(process.cwd(), '/tmp');
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

import multer from 'multer';
import { Readable } from 'stream';

// Konfigurasi multer untuk menyimpan file di memory
const storage = multer.memoryStorage();
const upload = multer({
	storage,
	limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Middleware handler untuk multer
const runMiddleware = (req, res, fn) => {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}
			return resolve(result);
		});
	});
};

export default async function handler(req, res) {
	console.log('Upload API dipanggil');

	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		// Gunakan multer untuk memproses file upload
		await runMiddleware(req, res, upload.single('dokumenPersyaratan'));

		console.log('===== REQ -----');
		console.log(req.file);
		console.log('Form fields received:', req.body);

		// Validasi ID calon siswa
		const cookies = parse(req.headers.cookie || '');
		const token = cookies.token;
		const calonSiswaId = token;

		// Validasi file
		if (!req.file) {
			return res.status(400).json({ message: 'Dokumen persyaratan tidak ditemukan' });
		}

		const file = req.file;

		console.log('File info:', {
			filename: file.originalname,
			size: file.size,
			mimetype: file.mimetype,
			buffer: file.buffer,
		});

		// Validasi tipe file dengan toleransi yang lebih longgar
		const allowed = [
			'application/pdf',
			'application/msword',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'application/vnd.ms-word',
			'application/x-pdf',
			'text/pdf',
			'text/plain', // Allow text for testing
		];

		if (!allowed.some((type) => file.mimetype.includes(type.split('/')[1]))) {
			return res.status(400).json({
				message: 'Tipe file tidak diperbolehkan',
				receivedType: file.mimetype,
				allowedTypes: allowed,
			});
		}

		console.log('BUFFFEEEEEEEEEEEEEER');
		console.log(file.buffer);

		// Kirim file ke Google Drive dengan semua informasi file
		const fileInfo = {
			buffer: file.buffer,
			originalname: file.originalname,
			mimetype: file.mimetype,
			size: file.size,
		};

		let fileID = await uploadToDrive(fileInfo, calonSiswaId);

		console.log('Drive URL generated:', fileID);
		let driveUrl = `https://drive.google.com/file/d/${fileID}`;
		await prisma.$connect();

		// Cari form berdasarkan ID
		const formRecord = await prisma.form.findFirst({
			where: { calonSiswaId: calonSiswaId },
		});

		if (!formRecord) {
			return res.status(404).json({
				message: 'Form tidak ditemukan dengan ID: ' + calonSiswaId,
			});
		}

		console.log('Form record found:', formRecord.id);

		// Simpan record berkas di DB
		try {
			const savedBerkas = await prisma.form.update({
				where: {
					id: formRecord.id,
				},
				data: {
					dokumenPersyaratan: driveUrl,
				},
			});

			console.log('Berkas saved:', savedBerkas.id);

			return res.status(200).json({
				success: true,
				message: 'Upload berhasil',
				berkas: savedBerkas,
				url: driveUrl,
			});
		} catch (dbError) {
			console.error('Database error when saving berkas:', dbError);
			return res.status(500).json({
				message: 'Gagal menyimpan data berkas ke database.',
				error: dbError.message,
				code: dbError.code,
			});
		}
	} catch (error) {
		console.error('UPLOAD ERROR:', error);
		return res.status(500).json({
			message: 'Terjadi kesalahan saat upload.',
			error: error.message,
			stack: error.stack,
		});
	} finally {
		await prisma.$disconnect();
	}
}
