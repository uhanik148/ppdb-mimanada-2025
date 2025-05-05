import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function KelolaProfil() {
	const [profil, setProfil] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		fetch('/api/admin/profil')
			.then((res) => res.json())
			.then((data) => {
				setProfil(data);
				setIsLoading(false);
			});
	}, []);

	const handleChange = (e) => {
		setProfil({ ...profil, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await fetch('/api/admin/profil', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(profil),
		});

		if (res.ok) alert('Profil berhasil diperbarui!');
		else alert('Gagal memperbarui profil.');
	};

	const handleBack = () => {
		router.push('/admin'); // Ganti sesuai route dashboard-mu
	};

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='text-center mb-8'>
				<h1 className='text-3xl font-bold text-green-600 mb-4'>Kelola Profil Kami</h1>
				<p className='text-lg text-gray-500'>Perbarui informasi dan profil Madrasah Anda di sini.</p>
			</div>
			<form
				onSubmit={handleSubmit}
				className='space-y-6'
			>
				{['tentang', 'visi', 'misi', 'kepalaMadrasah', 'sambutan', 'keunggulan'].map((field) => (
					<div key={field}>
						<label className='block font-semibold capitalize mb-1 text-gray-700'>
							{field} {(field === 'misi' || field === 'keunggulan') && <span className='text-sm text-gray-500'>(pisahkan dengan tanda titik)</span>}
						</label>
						<textarea
							name={field}
							value={profil[field]}
							onChange={handleChange}
							className='w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 transition-all'
							rows={field === 'misi' || field === 'keunggulan' ? 6 : 4}
							required
						/>
					</div>
				))}

				<div className='flex gap-4 justify-center'>
					<button
						type='submit'
						className='bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full shadow-md transition-transform transform hover:scale-105'
					>
						Simpan Perubahan
					</button>

					<button
						type='button'
						onClick={handleBack}
						className='bg-gray-300 hover:bg-gray-400 text-black py-2 px-6 rounded-full shadow-md transition-transform transform hover:scale-105'
					>
						Kembali ke Dashboard
					</button>
				</div>
			</form>
		</div>
	);
}
