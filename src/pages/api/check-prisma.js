// pages/api/check-prisma.js
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  console.log("Testing Prisma connection...");
  
  try {
    // Test koneksi database
    await prisma.$connect();
    console.log("Database connection successful");
    
    // Identifikasi database type
    let databaseInfo;
    try {
      // Untuk PostgreSQL
      if (process.env.DATABASE_URL?.includes('postgresql')) {
        databaseInfo = {
          type: 'PostgreSQL',
          version: await prisma.$queryRaw`SELECT version();`
        };
      }
      // Untuk MySQL
      else if (process.env.DATABASE_URL?.includes('mysql')) {
        databaseInfo = {
          type: 'MySQL',
          version: await prisma.$queryRaw`SELECT version() as version;`
        };
      }
      // Untuk SQLite
      else if (process.env.DATABASE_URL?.includes('sqlite')) {
        databaseInfo = {
          type: 'SQLite',
          version: await prisma.$queryRaw`SELECT sqlite_version() as version;`
        };
      }
      // Default fallback
      else {
        databaseInfo = {
          type: 'Unknown',
          version: 'Could not determine version'
        };
      }
    } catch (dbInfoError) {
      console.error("Could not fetch database info:", dbInfoError);
      databaseInfo = {
        type: 'Error fetching info',
        error: dbInfoError.message
      };
    }
    
    // Cek model calonSiswa dengan pendekatan safe
    let calonSiswaResult = { success: false, count: 0, error: null };
    try {
      const calonSiswaCount = await prisma.calonSiswa.count();
      console.log(`CalonSiswa table exists with ${calonSiswaCount} records`);
      calonSiswaResult = { success: true, count: calonSiswaCount };
      
      // Mencoba mengambil sampel data (opsional)
      if (calonSiswaCount > 0) {
        const sampleData = await prisma.calonSiswa.findFirst({
          select: { id: true, nisn: true }
        });
        calonSiswaResult.sample = sampleData;
      }
    } catch (modelError) {
      console.error("Error accessing calonSiswa model:", modelError);
      calonSiswaResult.error = modelError.message;
    }
    
    // Cek model Form dengan pendekatan safe
    let formResult = { success: false, count: 0, error: null };
    try {
      const formCount = await prisma.form.count();
      console.log(`Form table exists with ${formCount} records`);
      formResult = { success: true, count: formCount };
      
      // Mencoba mengambil sampel data (opsional)
      if (formCount > 0) {
        const sampleData = await prisma.form.findFirst({
          select: { id: true, calonSiswaId: true }
        });
        formResult.sample = sampleData;
      }
    } catch (modelError) {
      console.error("Error accessing form model:", modelError);
      formResult.error = modelError.message;
    }
    
    // Coba dapatkan daftar model yang tersedia (tanpa raw query)
    const models = [];
    try {
      await Promise.all([
        (async () => {
          try { await prisma.calonSiswa.count(); models.push('calonSiswa'); } catch (e) {}
        })(),
        (async () => {
          try { await prisma.form.count(); models.push('form'); } catch (e) {}
        })(),
        // Tambahkan model lain di sini jika diperlukan
      ]);
    } catch (e) {
      console.error("Error checking models:", e);
    }
    
    // Tampilkan struktur prisma.form (jika ada)
    let formStructure = null;
    if (formResult.success) {
      try {
        // Ini hanya pendekatan sederhana untuk mendapatkan informasi kolom
        // Akan berhasil jika ada setidaknya satu record
        const firstForm = await prisma.form.findFirst({
          select: {
            id: true,
            calonSiswaId: true,
            nik: true,
            tk: true,
            tanggalLahir: true,
            tempatLahir: true,
            alamat: true,
            agama: true,
            // tambahkan kolom lain sesuai kebutuhan
          }
        });
        
        if (firstForm) {
          formStructure = {
            columns: Object.keys(firstForm),
            sample: firstForm
          };
        }
      } catch (structError) {
        console.error("Error fetching form structure:", structError);
      }
    }
    
    return res.status(200).json({
      status: "ok",
      message: "Koneksi Prisma berhasil",
      database: databaseInfo,
      environmentInfo: {
        nodeEnv: process.env.NODE_ENV,
        databaseUrlRedacted: process.env.DATABASE_URL?.replace(/\/\/.*?@/, '//[credentials-hidden]@')
      },
      modelsFound: models,
      modelsStatus: {
        calonSiswa: calonSiswaResult,
        form: formResult
      },
      formStructure
    });
    
  } catch (error) {
    console.error("Prisma connection error:", error);
    return res.status(500).json({
      status: "error",
      message: "Gagal terhubung ke database",
      error: error.message,
      code: error.code,
      environmentInfo: {
        nodeEnv: process.env.NODE_ENV,
        databaseUrlProvided: !!process.env.DATABASE_URL,
        databaseUrlType: process.env.DATABASE_URL?.split(':')[0] || 'not provided'
      }
    });
  } finally {
    await prisma.$disconnect();
  }
}