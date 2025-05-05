// /lib/drive.js
import { google } from 'googleapis';
const Readable = require('stream');
/**
 * Upload file ke Google Drive (mock version untuk testing)
 * Pada implementasi sebenarnya, ini akan menggunakan Google Drive API
 */
export async function uploadToDrive(file, referenceId) {
	try {
		console.log(`Uploading file ${file.originalname || file.name} with reference ID ${referenceId}`);
		const SCOPE = ['https://www.googleapis.com/auth/drive'];
		const authorize = async () => {
			const jwtClient = new google.auth.JWT(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL, null, process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY, SCOPE);
			return jwtClient;
		};

		const upload = async (authClient) => {
			const drive = google.drive({
				version: 'v3',
				auth: authClient,
			});

			const fileId = await new Promise((resolve, reject) => {
				drive.files.create(
					{
						resource: {
							name: file.originalname || new Date(),
							parents: [process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID],
						},
						media: {
							body: new Readable.PassThrough().end(file.buffer),
							mimeType: 'application/pdf',
						},
						fields: 'id',
					},
					(err, file) => {
						if (err) {
							return reject(err);
						}
						console.log('========== ID FILE =============');
						console.log(file.data);
						console.log('========== ID FILE =============');
						resolve(file.data.id);
					}
				);
			});
			return fileId;
		};

		const fileID = await authorize()
			.then(upload)
			.catch((err) => {
				console.log(err);
				throw err;
			});

		return fileID;
	} catch (error) {
		console.error('Error uploading file:', error);
		throw new Error(`Failed to upload file: ${error.message}`);
	}
}

/**
 * Menghapus file dari Google Drive berdasarkan ID file
 * @param {string} fileId - ID file Google Drive yang akan dihapus
 * @returns {Promise<boolean>} - true jika berhasil dihapus
 */
export async function deleteFile(fileId) {
	try {
		if (!fileId) {
			throw new Error('File ID tidak boleh kosong');
		}
		const SCOPE = ['https://www.googleapis.com/auth/drive'];
		const authorize = async () => {
			const jwtClient = new google.auth.JWT(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL, null, process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY, SCOPE);
			return jwtClient;
		};

		const deleteFileFromDrive = async (authClient) => {
			const drive = google.drive({
				version: 'v3',
				auth: authClient,
			});

			return new Promise((resolve, reject) => {
				drive.files.delete(
					{
						fileId: fileId,
					},
					(err, response) => {
						if (err) {
							console.error('Error menghapus file dari Google Drive:', err);
							return reject(err);
						}
						resolve(true);
					}
				);
			});
		};

		const result = await authorize()
			.then(deleteFileFromDrive)
			.catch((err) => {
				console.log(err);
				throw err;
			});

		return result;
	} catch (error) {
		console.error('Error menghapus file:', error);
		throw new Error(`Gagal menghapus file: ${error.message}`);
	}
}
