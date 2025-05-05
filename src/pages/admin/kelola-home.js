import { useEffect, useState } from 'react';
import axios from 'axios';

export default function KelolaHome() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	// Fetch data dari API
	useEffect(() => {
		axios
			.get('/api/admin/kelola-home')
			.then((res) => setData(res.data))
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);
		try {
			console.log(data);
			await axios.put('/api/admin/kelola-home', data);
			alert('Berhasil disimpan');
		} catch (err) {
			console.error(err);
			alert('Gagal menyimpan');
		} finally {
			setSaving(false);
		}
	};

	if (loading) return <p className='p-6'>Memuat konten...</p>;
	if (!data) return <p className='p-6'>Data tidak ditemukan</p>;

	return (
		<div className='p-6 w-full mx-auto'>
			<h1 className='text-2xl font-bold mb-4'>Kelola Home Page</h1>
			<form
				onSubmit={handleSubmit}
				className='space-y-6 w-full'
			>
				{/* Hero */}
				<div className='w-full'>
					<label className='block font-semibold'>Judul Hero</label>
					<input
						name='heroTitle'
						value={data.heroTitle}
						onChange={handleChange}
						className='input w-full p-2 rounded-md border border-gray-300'
					/>
				</div>
				<div className='w-full'>
					<label className='block font-semibold'>Subjudul Hero</label>
					<input
						name='heroSubtitle'
						value={data.heroSubtitle}
						onChange={handleChange}
						className='input w-full p-2 rounded-md border border-gray-300'
					/>
				</div>
				<div className='w-full'>
					<label className='block font-semibold'>Gambar Hero (URL)</label>
					<input
						name='heroImage'
						value={data.heroImage}
						onChange={handleChange}
						className='input w-full p-2 rounded-md border border-gray-300'
					/>
				</div>

				{/* Tentang Kami */}
				<div className='w-full'>
					<label className='block font-semibold'>Judul Tentang</label>
					<input
						name='aboutTitle'
						value={data.aboutTitle}
						onChange={handleChange}
						className='input w-full p-2 rounded-md border border-gray-300'
					/>
				</div>
				<div className='w-full'>
					<label className='block font-semibold'>Deskripsi Tentang</label>
					<textarea
						name='aboutDescription'
						value={data.aboutDescription}
						onChange={handleChange}
						className='input h-24 w-full p-2 rounded-md border border-gray-300'
					/>
				</div>

				{/* Tombol Simpan */}
				<button
					type='submit'
					disabled={saving}
					className='bg-green-600 text-white px-6 py-2 rounded'
				>
					{saving ? 'Menyimpan...' : 'Simpan Perubahan'}
				</button>
			</form>
		</div>
	);
}
