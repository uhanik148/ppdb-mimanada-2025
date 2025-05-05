import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Hero() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [heroData, setHeroData] = useState({
		id: 2,
		heroTitle: "Selamat Datang di MI Ma'arif Nailul Huda - UPDATE",
		heroSubtitle: 'Penerimaan Peserta Didik Baru Tahun 2025/2026',
		heroImage: '/alurppdb.jpg',
		aboutTitle: "Tentang MI Ma'arif Nailul Huda",
		aboutDescription: 'Madrasah unggulan berbasis Islam, ilmu pengetahuan, dan teknologi.',
		registrationInfo: 'Informasi lengkap PPDB Tahun Ajaran 2025/2026',
		registrationSteps: '1. Isi Formulir\n2. Upload Dokumen\n3. Verifikasi Data\n4. Pengumuman',
		requirements: '1. Fotokopi Akta\n2. Fotokopi Kartu Keluarga\n3. Pas Foto 3x4',
		ppdbImages: '/alurppdb.jpg',
		createdAt: '2025-05-05T07:20:32.880Z',
		updatedAt: '2025-05-05T07:36:54.709Z',
	});

	useEffect(() => {
		const fetchHeroData = async () => {
			try {
				const response = await fetch('/api/admin/home');
				if (response.ok) {
					const data = await response.json();
					console.log(data);
					setHeroData(data);
				}
			} catch (error) {
				console.error('Error fetching hero data:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchHeroData();
	}, []);

	return (
		<section className='bg-green-800 text-white'>
			<div className='container mx-auto flex flex-col md:flex-row items-center justify-between py-16 px-6'>
				{/* Left content */}
				<div className='md:w-1/2 mb-10 md:mb-0'>
					<h2 className='text-4xl font-bold mb-4'>{isLoading ? 'PPDB' : heroData.heroTitle}</h2>

					<p className='text-lg mb-8'>
						{isLoading
							? "Mari Wujudkan Masa Depan Cerah Buah Hati Anda Bersama MI MAA'RIF NAILUL HUDA! Bentuk akhlak mulia, asah kecerdasan, dan tumbuhkan semangat belajar dalam lingkungan yang islami, nyaman, dan penuh kasih."
							: heroData.heroSubtitle}
					</p>

					<button
						onClick={() => router.push('/pengumuman')}
						className='bg-amber-700 hover:bg-amber-800 text-white font-medium py-2 px-6 rounded-md transition duration-300'
					>
						Lihat Informasi
					</button>
				</div>

				{/* Right image */}
				<div className='md:w-1/2'>
					<img
						src='/IMG-20250425-WA0022-removebg-preview.png'
						alt="Siswa MI Ma'arif Nailul Huda"
						className='max-w-full rounded-lg object-contain md:object-cover mx-auto'
					/>
				</div>
			</div>
		</section>
	);
}
