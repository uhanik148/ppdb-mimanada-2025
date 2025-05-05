import { google } from 'googleapis';
import { Readable } from 'stream';
import path from 'path';

/**
 * Decode base64 and parse JSON to get service account credentials
 */
function getGoogleCredentials() {
  const base64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;
  if (!base64) throw new Error('GOOGLE_SERVICE_ACCOUNT_BASE64 is not set');

  const jsonString = Buffer.from(base64, 'base64').toString('utf-8');
  return JSON.parse(jsonString);
}

/**
 * Upload file ke Google Drive menggunakan Drive API
 */
export async function uploadToDrive(file, referenceId) {
  try {
    console.log(`Uploading file ${file.originalFilename || file.name} with reference ID ${referenceId}`);

    const credentials = getGoogleCredentials();

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });

    const fileName = file.originalFilename || file.name || 'file';
    const mimeType = file.mimetype || 'application/octet-stream';

    const fileMetadata = {
      name: `${referenceId}_${fileName}`,
    };

    const media = {
      mimeType,
      body: Readable.from(file._writeStream?.buffer || fs.readFileSync(file.filepath || file.path)),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: 'id, webViewLink, webContentLink',
    });

    console.log('File uploaded successfully to Google Drive');
    return response.data.webViewLink || response.data.webContentLink;
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    throw new Error(`Failed to upload file to Drive: ${error.message}`);
  }
}
