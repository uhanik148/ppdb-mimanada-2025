// pages/admin/kelola-info-pendaftaran.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function KelolaInfoPendaftar() {
	const router = useRouter();
	const [currentId, setCurrentId] = useState(null);
	const [infoPendaftaran, setInfoPendaftaran] = useState([]);
	const [formData, setFormData] = useState({
		sectionTitle: '',
		description: '',
		pendaftaranOnline: '',
		verifikasiBerkas: '',
		tesSeleksi: '',
		pengumuman: '',
		daftarUlang: '',
		persyaratanDokumen: '',
		biayaPendaftaran: '',
		kontakInformasi: '',
		emailInformasi: '',
		prosedur: '',
		brosurUrl: '',
		googleDocUrl: '',
		daftarUrl: '',
	});

	useEffect(() => {
		const fetchInfo = async () => {
			try {
				const response = await axios.get('/api/admin/kelola-info-pendaftar');
				setInfoPendaftaran(response.data);
				setCurrentId(response.data.id);
			} catch (error) {
				console.error('Gagal mengambil data:', error);
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
					value={formData.sectionTitle || infoPendaftaran?.sectionTitle || 'Ipsum sunt in alias'}
					onChange={handleChange}
					placeholder='Contoh: Langkah Pendaftaran Online'
					style={styles.input}
				/>

				<label style={styles.label}>Deskripsi</label>
				<textarea
					name='description'
					value={formData.description || infoPendaftaran?.description || 'Qui nihil doloremque'}
					onChange={handleChange}
					placeholder='Contoh: Silakan ikuti langkah-langkah berikut...'
					style={styles.textarea}
				/>

				<label style={styles.label}>Tanggal Mulai Pendaftaran Online</label>
				<input
					type='date'
					name='mulaiPendaftaranOnline'
					value={
						formData.mulaiPendaftaranOnline ||
						(infoPendaftaran?.mulaiPendaftaranOnline ? new Date(infoPendaftaran.mulaiPendaftaranOnline).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10))
					}
					onChange={handleChange}
					style={styles.input}
				/>

				<label style={styles.label}>Tanggal Selesai Pendaftaran Online</label>
				<input
					type='date'
					name='selesaiPendaftaranOnline'
					value={
						formData.selesaiPendaftaranOnline ||
						(infoPendaftaran?.selesaiPendaftaranOnline ? new Date(infoPendaftaran.selesaiPendaftaranOnline).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10))
					}
					onChange={handleChange}
					style={styles.input}
				/>

				<label style={styles.label}>Tanggal Mulai Verifikasi Berkas</label>
				<input
					type='date'
					name='mulaiVerifikasiBerkas'
					value={formData.mulaiVerifikasiBerkas || (infoPendaftaran?.mulaiVerifikasiBerkas ? new Date(infoPendaftaran.mulaiVerifikasiBerkas).toISOString().slice(0, 10) : '1973-06-10')}
					onChange={handleChange}
					style={styles.input}
				/>

				<label style={styles.label}>Tanggal Selesai Verifikasi Berkas</label>
				<input
					type='date'
					name='selesaiVerifikasiBerkas'
					value={formData.selesaiVerifikasiBerkas || (infoPendaftaran?.selesaiVerifikasiBerkas ? new Date(infoPendaftaran.selesaiVerifikasiBerkas).toISOString().slice(0, 10) : '1973-06-10')}
					onChange={handleChange}
					style={styles.input}
				/>

				<label style={styles.label}>Tanggal Tes Seleksi</label>
				<input
					type='date'
					name='tesSeleksi'
					value={formData.tesSeleksi || (infoPendaftaran?.tesSeleksi ? new Date(infoPendaftaran.tesSeleksi).toISOString().slice(0, 10) : '2023-03-25')}
					onChange={handleChange}
					style={styles.input}
				/>

				<label style={styles.label}>Tanggal Pengumuman</label>
				<input
					type='date'
					name='pengumuman'
					value={formData.pengumuman || (infoPendaftaran?.pengumuman ? new Date(infoPendaftaran.pengumuman).toISOString().slice(0, 10) : '2010-11-17')}
					onChange={handleChange}
					style={styles.input}
				/>

				<label style={styles.label}>Tanggal Daftar Ulang</label>
				<input
					type='date'
					name='daftarUlang'
					value={formData.daftarUlang || (infoPendaftaran?.daftarUlang ? new Date(infoPendaftaran.daftarUlang).toISOString().slice(0, 10) : '2020-07-16')}
					onChange={handleChange}
					style={styles.input}
				/>

				<label style={styles.label}>Persyaratan Dokumen</label>
				<textarea
					name='persyaratanDokumen'
					value={formData.persyaratanDokumen || infoPendaftaran?.persyaratanDokumen || 'Veniam nulla pariat'}
					onChange={handleChange}
					placeholder='Contoh: KTP. Ijazah. Kartu Keluarga. Akta Kelahiran. Pas Foto.'
					style={styles.textarea}
				/>
				<label style={{ ...styles.label, fontSize: '12px', color: '#666' }}>Pisahkan setiap persyaratan dengan titik (.)</label>

				<label style={styles.label}>Biaya Pendaftaran (Rp)</label>
				<input
					type='number'
					name='biayaPendaftaran'
					value={formData.biayaPendaftaran || infoPendaftaran?.biayaPendaftaran || 18}
					onChange={handleChange}
					placeholder='Contoh: 150000'
					style={styles.input}
				/>

				<label style={styles.label}>Kontak Informasi</label>
				<textarea
					type='text'
					name='kontakInformasi'
					value={formData.kontakInformasi || infoPendaftaran?.kontakInformasi || 'Eos sed non quaerat '}
					onChange={handleChange}
					placeholder='Contoh: 081234567890'
					style={styles.input}
				/>
				<label style={{ ...styles.label, fontSize: '12px', color: '#666' }}>Pisahkan setiap kontak dengan titik (.)</label>

				<label style={styles.label}>Email Informasi</label>
				<input
					type='email'
					name='emailInformasi'
					value={formData.emailInformasi || infoPendaftaran?.emailInformasi || 'myjun@mailinator.com'}
					onChange={handleChange}
					placeholder='Contoh: info@sekolah.ac.id'
					style={styles.input}
				/>

				<label style={styles.label}>Prosedur Pendaftaran</label>
				<textarea
					name='prosedur'
					value={formData.prosedur || infoPendaftaran?.prosedur || 'Repellendus Volupta'}
					onChange={handleChange}
					placeholder='Contoh: 1. Isi formulir, 2. Bayar biaya pendaftaran, ...'
					style={styles.textarea}
				/>
				<label style={{ ...styles.label, fontSize: '12px', color: '#666' }}>Pisahkan setiap prosedur dengan titik (.)</label>

				<label style={styles.label}>URL Brosur (opsional)</label>
				<input
					type='text'
					name='brosurUrl'
					value={formData.brosurUrl || infoPendaftaran?.brosurUrl || 'Dolor magni fuga La'}
					onChange={handleChange}
					placeholder='https://example.com/brosur.pdf'
					style={styles.input}
				/>
				<label style={{ ...styles.label, fontSize: '12px', color: '#666' }}>Pisahkan setiap prosedur dengan |</label>

				<label style={styles.label}>Link Google Docs (opsional)</label>
				<input
					type='text'
					name='googleDocUrl'
					value={formData.googleDocUrl || infoPendaftaran?.googleDocUrl || 'Esse lorem facere e'}
					onChange={handleChange}
					placeholder='https://docs.google.com/...'
					style={styles.input}
				/>

				<label style={styles.label}>Link Formulir Pendaftaran</label>
				<input
					type='text'
					name='daftarUrl'
					value={formData.daftarUrl || infoPendaftaran?.daftarUrl || 'Quod praesentium ven'}
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
