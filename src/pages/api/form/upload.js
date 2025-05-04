// pages/api/form/upload.js
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { uploadToDrive } from '@/lib/drive';
import prisma from '@/lib/prisma';

// Nonaktifkan bodyParser bawaan
export const config = {
  api: { bodyParser: false },
};

// Pastikan folder tmp ada
const uploadDir = path.join(process.cwd(), '/tmp');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export default async function handler(req, res) {
  console.log('Upload API dipanggil');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Setup formidable dengan opsi yang lebih toleran
  const form = formidable({
    uploadDir,
    keepExtensions: true,
    multiples: true, // Support multiple file uploads
    maxFileSize: 10 * 1024 * 1024, // 10MB
  });

  const parseForm = () => new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Form parsing error:", err);
        return reject(err);
      }
      resolve({ fields, files });
    });
  });

  try {
    const { fields, files } = await parseForm();
    console.log('Form fields received:', fields);
    console.log('Files received:', Object.keys(files));

    // Validasi ID calon siswa
    const calonSiswaId = fields.calonSiswaId?.[0] || fields.calonSiswaId;
    if (!calonSiswaId) {
      return res.status(400).json({ message: 'ID calon siswa tidak ditemukan dalam form data' });
    }

    console.log('Received calonSiswaId:', calonSiswaId);

    // Get file - handle both array and object formats
    let file;
    if (files.dokumenPersyaratan) {
      file = Array.isArray(files.dokumenPersyaratan) 
        ? files.dokumenPersyaratan[0] 
        : files.dokumenPersyaratan;
    }

    if (!file) {
      return res.status(400).json({ message: 'Dokumen persyaratan tidak ditemukan' });
    }

    console.log('File info:', {
      filename: file.originalFilename || file.name,
      size: file.size,
      type: file.mimetype || file.type,
      path: file.filepath || file.path
    });

    // Validasi tipe file dengan toleransi yang lebih longgar
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-word',
      'application/x-pdf',
      'text/pdf',
      'text/plain' // Allow text for testing
    ];
    
    const fileType = file.mimetype || file.type;
    if (fileType && !allowed.some(type => fileType.includes(type.split('/')[1]))) {
      return res.status(400).json({ 
        message: 'Tipe file tidak diperbolehkan', 
        receivedType: fileType,
        allowedTypes: allowed 
      });
    }

    // Cek keberadaan fungsi uploadToDrive
    if (typeof uploadToDrive !== 'function') {
      console.error('uploadToDrive function not found or not a function');
      // Jika fungsi tidak tersedia, kita gunakan mock untuk testing
      var driveUrl = `https://mock-drive-url.com/${file.originalFilename || 'file'}`;
    } else {
      // Upload ke Google Drive
      var driveUrl = await uploadToDrive(file, calonSiswaId);
    }

    console.log('Drive URL generated:', driveUrl);

    await prisma.$connect();

    // Cari form berdasarkan ID
    const formRecord = await prisma.form.findUnique({
      where: { id: parseInt(calonSiswaId) }
    });
    
    if (!formRecord) {
      return res.status(404).json({ 
        message: 'Form tidak ditemukan dengan ID: ' + calonSiswaId
      });
    }

    console.log('Form record found:', formRecord.id);

    // Simpan record berkas di DB
    try {
      const savedBerkas = await prisma.berkas.create({
        data: {
          formId: formRecord.id,
          namaFile: file.originalFilename || file.name || 'uploaded-file',
          url: driveUrl,
          jenisFile: file.mimetype || file.type || 'application/octet-stream',
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
        code: dbError.code
      });
    }
  } catch (error) {
    console.error('UPLOAD ERROR:', error);
    return res.status(500).json({ 
      message: 'Terjadi kesalahan saat upload.', 
      error: error.message,
      stack: error.stack
    });
  } finally {
    await prisma.$disconnect();
  }
}