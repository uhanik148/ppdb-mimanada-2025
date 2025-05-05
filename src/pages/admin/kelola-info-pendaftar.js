// pages/admin/kelola-info-pendaftaran.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function KelolaInfoPendaftar() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [currentId, setCurrentId] = useState(null);
	const [infoPendaftaran, setInfoPendaftaran] = useState([]);
	console.log(infoPendaftaran);
	const [formData, setFormData] = useState({
		sectionTitle: infoPendaftaran?.sectionTitle || '',
		description: infoPendaftaran?.description || '',
		mulaiPendaftaranOnline: infoPendaftaran?.mulaiPendaftaranOnline || '',
		selesaiPendaftaranOnline: infoPendaftaran?.selesaiPendaftaranOnline || '',
		mulaiVerifikasiBerkas: infoPendaftaran?.mulaiVerifikasiBerkas || '',
		selesaiVerifikasiBerkas: infoPendaftaran?.selesaiVerifikasiBerkas || '',
		tesSeleksi: infoPendaftaran?.tesSeleksi || '',
		pengumuman: infoPendaftaran?.pengumuman || '',
		daftarUlang: infoPendaftaran?.daftarUlang || '',
		persyaratanDokumen: infoPendaftaran?.persyaratanDokumen || '',
		biayaPendaftaran: infoPendaftaran?.biayaPendaftaran || '',
		kontakInformasi: infoPendaftaran?.kontakInformasi || '',
		emailInformasi: infoPendaftaran?.emailInformasi || '',
		prosedur: infoPendaftaran?.prosedur || '',
		brosurUrl: infoPendaftaran?.brosurUrl || '',
		googleDocUrl: infoPendaftaran?.googleDocUrl || '',
		daftarUrl: infoPendaftaran?.daftarUrl || '',
	});

	useEffect(() => {
		// Mengisi formData dari data yang sudah ada ketika data tersedia
		if (infoPendaftaran && !loading) {
			const formatDate = (dateString) => {
				return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
			};

			setFormData({
				sectionTitle: infoPendaftaran.sectionTitle || '',
				description: infoPendaftaran.description || '',
				mulaiPendaftaranOnline: formatDate(infoPendaftaran.mulaiPendaftaranOnline),
				selesaiPendaftaranOnline: formatDate(infoPendaftaran.selesaiPendaftaranOnline),
				mulaiVerifikasiBerkas: formatDate(infoPendaftaran.mulaiVerifikasiBerkas),
				selesaiVerifikasiBerkas: formatDate(infoPendaftaran.selesaiVerifikasiBerkas),
				tesSeleksi: formatDate(infoPendaftaran.tesSeleksi),
				pengumuman: formatDate(infoPendaftaran.pengumuman),
				daftarUlang: formatDate(infoPendaftaran.daftarUlang),
				persyaratanDokumen: infoPendaftaran.persyaratanDokumen || '',
				biayaPendaftaran: infoPendaftaran.biayaPendaftaran || '',
				kontakInformasi: infoPendaftaran.kontakInformasi || '',
				emailInformasi: infoPendaftaran.emailInformasi || '',
				prosedur: infoPendaftaran.prosedur || '',
				brosurUrl: infoPendaftaran.brosurUrl || '',
				googleDocUrl: infoPendaftaran.googleDocUrl || '',
				daftarUrl: infoPendaftaran.daftarUrl || '',
			});
		}
	}, [infoPendaftaran, loading]);

	useEffect(() => {
		const fetchInfo = async () => {
			setLoading(true);
			try {
				const response = await axios.get('/api/admin/kelola-info-pendaftar');
				setInfoPendaftaran(response.data);
				setCurrentId(response.data.id);
			} catch (error) {
				console.error('Gagal mengambil data:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchInfo();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.put('/api/admin/kelola-info-pendaftar', { id: currentId || null, ...formData });
			alert('Data berhasil diperbarui');

			const response = await axios.get('/api/admin/kelola-info-pendaftar');
			setInfoPendaftaran(response.data);
		} catch (error) {
			console.error('Gagal menyimpan:', error);
		}
	};

	// Menampilkan loading state
	if (loading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<div style={{ textAlign: 'center' }}>
					<div
						style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 2s linear infinite', margin: '0 auto' }}
					></div>
					<p style={{ marginTop: '20px', fontSize: '18px', color: '#333' }}>Memuat data...</p>
				</div>
				<style jsx>{`
					@keyframes spin {
						0% {
							transform: rotate(0deg);
						}
						100% {
							transform: rotate(360deg);
						}
					}
				`}</style>
			</div>
		);
	}
	return (
		<div style={styles.container}>
			<h1 style={styles.title}>Kelola Informasi Pendaftaran</h1>
			<p style={styles.subtext}>Masukkan informasi penting terkait pendaftaran siswa baru yang akan ditampilkan ke publik.</p>

			<form
				onSubmit={handleSubmit}
				style={styles.form}
			>
				<label style={styles.label}>Judul Seksi</label>
				<input
					type='text'
					name='sectionTitle'
					value={formData.sectionTitle || ''}
					onChange={handleChange}
					placeholder='Contoh: Langkah Pendaftaran Online'
					style={styles.input}
				/>

				<label style={styles.label}>Deskripsi</label>
				<textarea
					name='description'
					value={formData.description || ''}
					onChange={handleChange}
					placeholder='Contoh: Silakan ikuti langkah-langkah berikut...'
					style={styles.textarea}
				/>

				<label style={styles.label}>Tanggal Mulai Pendaftaran Online</label>
				<input
					type='date'
					name='mulaiPendaftaranOnline'
					value={formData.mulaiPendaftaranOnline || new Date().toISOString().slice(0, 10)}
					onChange={handleChange}
					style={styles.input}
				/>

				<label style={styles.label}>Tanggal Selesai Pendaftaran Online</label>
				<input
					type='date'
					name='selesaiPendaftaranOnline'
					value={formData.selesaiPendaftaranOnline || new Date().toISOString().slice(0, 10)}
					onChange={handleChange}
					style={styles.input}
				/>

				<label style={styles.label}>Tanggal Mulai Verifikasi Berkas</label>
				<input
					type='date'
					name='mulaiVerifikasiBerkas'
					value={formData.mulaiVerifikasiBerkas || new Date().toISOString().slice(0, 10)}
					onChange={handleChange}
					style={styles.input}
				/>

				<label style={styles.label}>Tanggal Selesai Verifikasi Berkas</label>
				<input
					type='date'
					name='selesaiVerifikasiBerkas'
					value={formData.selesaiVerifikasiBerkas || new Date().toISOString().slice(0, 10)}
					onChange={handleChange}
					style={styles.input}
				/>

				<label style={styles.label}>Tanggal Tes Seleksi</label>
				<input
					type='date'
					name='tesSeleksi'
					value={formData.tesSeleksi || new Date().toISOString().slice(0, 10)}
					onChange={handleChange}
					style={styles.input}
				/>

				<label style={styles.label}>Tanggal Pengumuman</label>
				<input
					type='date'
					name='pengumuman'
					value={formData.pengumuman || new Date().toISOString().slice(0, 10)}
					onChange={handleChange}
					style={styles.input}
				/>

				<label style={styles.label}>Tanggal Daftar Ulang</label>
				<input
					type='date'
					name='daftarUlang'
					value={formData.daftarUlang || new Date().toISOString().slice(0, 10)}
					onChange={handleChange}
					style={styles.input}
				/>

				<label style={styles.label}>Persyaratan Dokumen</label>
				<textarea
					name='persyaratanDokumen'
					value={formData.persyaratanDokumen || ''}
					onChange={handleChange}
					placeholder='Contoh: KTP. Ijazah. Kartu Keluarga. Akta Kelahiran. Pas Foto.'
					style={styles.textarea}
				/>
				<label style={{ ...styles.label, fontSize: '12px', color: '#666' }}>Pisahkan setiap persyaratan dengan titik (.)</label>

				<label style={styles.label}>Biaya Pendaftaran (Rp)</label>
				<input
					type='number'
					name='biayaPendaftaran'
					value={formData.biayaPendaftaran || 0}
					onChange={handleChange}
					placeholder='Contoh: 150000'
					style={styles.input}
				/>

				<label style={styles.label}>Kontak Informasi</label>
				<textarea
					type='text'
					name='kontakInformasi'
					value={formData.kontakInformasi || ''}
					onChange={handleChange}
					placeholder='Contoh: 081234567890'
					style={styles.input}
				/>
				<label style={{ ...styles.label, fontSize: '12px', color: '#666' }}>Pisahkan setiap kontak dengan titik (.)</label>

				<label style={styles.label}>Email Informasi</label>
				<input
					type='email'
					name='emailInformasi'
					value={formData.emailInformasi || ''}
					onChange={handleChange}
					placeholder='Contoh: info@sekolah.ac.id'
					style={styles.input}
				/>

				<label style={styles.label}>Prosedur Pendaftaran</label>
				<textarea
					name='prosedur'
					value={formData.prosedur || ''}
					onChange={handleChange}
					placeholder='Contoh: 1. Isi formulir, 2. Bayar biaya pendaftaran, ...'
					style={styles.textarea}
				/>
				<label style={{ ...styles.label, fontSize: '12px', color: '#666' }}>Pisahkan setiap prosedur dengan titik (.)</label>

				<label style={styles.label}>URL Brosur (opsional)</label>
				<input
					type='text'
					name='brosurUrl'
					value={formData.brosurUrl || ''}
					onChange={handleChange}
					placeholder='https://example.com/brosur.pdf'
					style={styles.input}
				/>
				<label style={{ ...styles.label, fontSize: '12px', color: '#666' }}>Pisahkan setiap prosedur dengan |</label>

				<label style={styles.label}>Link Google Docs (opsional)</label>
				<input
					type='text'
					name='googleDocUrl'
					value={formData.googleDocUrl || ''}
					onChange={handleChange}
					placeholder='https://docs.google.com/...'
					style={styles.input}
				/>

				<label style={styles.label}>Link Formulir Pendaftaran</label>
				<input
					type='text'
					name='daftarUrl'
					value={formData.daftarUrl || ''}
					onChange={handleChange}
					placeholder='https://forms.gle/...'
					style={styles.input}
				/>

				<button
					type='submit'
					style={styles.button}
				>
					Simpan Informasi
				</button>
			</form>

			<button
				onClick={() => router.push('/admin')}
				style={styles.backButton}
			>
				⬅ Kembali ke Dashboard Admin
			</button>
		</div>
	);
}

const styles = {
	container: {
		maxWidth: '800px',
		margin: '0 auto',
		padding: '2rem',
		fontFamily: 'Arial, sans-serif',
	},
	title: {
		fontSize: '2rem',
		marginBottom: '0.5rem',
	},
	subtext: {
		color: '#555',
		marginBottom: '2rem',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
		backgroundColor: '#f9f9f9',
		padding: '1.5rem',
		borderRadius: '8px',
		boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
	},
	label: {
		fontWeight: 'bold',
	},
	input: {
		padding: '0.5rem',
		borderRadius: '4px',
		border: '1px solid #ccc',
	},
	textarea: {
		padding: '0.5rem',
		borderRadius: '4px',
		border: '1px solid #ccc',
		minHeight: '100px',
	},
	button: {
		padding: '0.7rem',
		backgroundColor: '#28a745',
		color: '#fff',
		fontWeight: 'bold',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
	},
	list: {
		listStyle: 'none',
		padding: 0,
		marginTop: '1rem',
	},
	card: {
		padding: '1rem',
		border: '1px solid #ddd',
		borderRadius: '6px',
		marginBottom: '1rem',
		backgroundColor: '#fff',
	},
	cardActions: {
		marginTop: '1rem',
		display: 'flex',
		gap: '1rem',
	},
	editButton: {
		backgroundColor: '#007bff',
		color: '#fff',
		border: 'none',
		padding: '0.5rem',
		borderRadius: '4px',
		cursor: 'pointer',
	},
	deleteButton: {
		backgroundColor: '#dc3545',
		color: '#fff',
		border: 'none',
		padding: '0.5rem',
		borderRadius: '4px',
		cursor: 'pointer',
	},
	backButton: {
		marginTop: '2rem',
		padding: '0.7rem 1.2rem',
		backgroundColor: '#6c757d',
		color: '#fff',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
	},
};
