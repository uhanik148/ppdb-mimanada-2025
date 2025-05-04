// /lib/drive.js
import fs from 'fs';
import path from 'path';

/**
 * Upload file ke Google Drive (mock version untuk testing)
 * Pada implementasi sebenarnya, ini akan menggunakan Google Drive API
 */
export async function uploadToDrive(file, referenceId) {
  try {
    console.log(`Uploading file ${file.originalFilename || file.name} with reference ID ${referenceId}`);
    
    // Dalam versi testing, cukup simpan file ke direktori lokal
    const fileName = file.originalFilename || file.name || 'file';
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const storedFileName = `${referenceId}_${timestamp}_${fileName}`;
    
    // Path file sumber
    const sourcePath = file.filepath || file.path;
    
    // Path tujuan - gunakan direktori uploads
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    const destinationPath = path.join(uploadsDir, storedFileName);
    
    // Copy file
    console.log(`Copying file from ${sourcePath} to ${destinationPath}`);
    fs.copyFileSync(sourcePath, destinationPath);
    
    // Simulasi URL Google Drive
    const mockDriveUrl = `https://drive.google.com/file/d/${referenceId}/${storedFileName}`;
    console.log(`File uploaded successfully. Mock URL: ${mockDriveUrl}`);
    
    return mockDriveUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
}