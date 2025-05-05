import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Infolanjut() {
	const [profil, setProfil] = useState({
		tentang: '',
		visi: '',
		misi: '',
		kepalaMadrasah: '',
		sambutan: '',
		keunggulan: '',
	});

	useEffect(() => {
		async function fetchProfil() {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/profil`);
				if (!response.ok) {
					throw new Error('Gagal mengambil data profil');
				}
				const data = await response.json();
				setProfil(data);
			} catch (error) {
				console.error('Error fetching profil:', error);
			}
		}

		fetchProfil();
	}, []);

	return (
		<div className='bg-white text-gray-800'>
			<section className='bg-green-800 py-16 text-center text-white relative overflow-hidden'>
				<div className='max-w-6xl mx-auto px-6'>
					<h1 className='text-4xl font-semibold mb-4'>Profil MI Ma’arif Nailul Huda</h1>
					<p className='text-lg font-medium mb-8'>{profil.sambutan}</p>
				</div>
				<div className='absolute inset-0 opacity-20'>
					<img
						src='/profile.png'
						alt='Ilustrasi Guru Mengajar'
						className='w-full h-full object-cover'
					/>
				</div>
			</section>

			{/* Tentang Sekolah */}
			<section className='max-w-5xl mx-auto px-4 py-16'>
				<h2 className='text-3xl font-semibold text-green-700 mb-8 text-center'>
					<span className='mr-2'>📖</span>Tentang Sekolah
				</h2>
				<div className='bg-green-50 p-8 rounded-2xl shadow-lg grid md:grid-cols-2 gap-8 items-center'>
					{/* Gambar Sekolah */}
					<div className='w-full h-full'>
						<Image
							src='/tentang.png'
							alt="Foto MI Ma'arif Nailul Huda"
							width={500}
							height={400}
							className='rounded-xl object-cover w-full h-auto'
						/>
					</div>

					{/* Deskripsi Sekolah */}
					<div className='space-y-6'>
						{profil.tentang &&
							profil.tentang.split('.').map((paragraph, index) => (
								<p
									key={index}
									className='text-justify text-lg leading-relaxed'
								>
									{paragraph.trim()}.
								</p>
							))}
					</div>
				</div>
			</section>

			{/* Visi Misi */}
			<section className='bg-green-50 py-16'>
				<div className='max-w-5xl mx-auto px-4'>
					<h2 className='text-3xl font-semibold text-green-700 mb-8 text-center'>Visi dan Misi</h2>
					<div className='grid md:grid-cols-2 gap-8'>
						{/* Visi */}
						<div className='bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-green-600 transform hover:scale-105'>
							<h3 className='font-bold text-green-700 text-xl mb-4'>🌟 Visi</h3>
							<p className='italic text-gray-800 text-lg leading-relaxed'>{profil?.visi || 'Terbentuknya Peserta Didik Yang Unggul Prestasi, Berbudi Luhur, Berbudaya, dan Berwawasan Global.'}</p>
						</div>
						{/* Misi */}
						<div className='bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-green-600 transform hover:scale-105'>
							<h3 className='font-bold text-green-700 text-xl mb-4'>🎯 Misi</h3>
							<div className='space-y-3'>
								{profil?.misi?.split('.').map(
									(item, index) =>
										item.trim() && (
											<div
												key={index}
												className='flex items-start gap-2'
											>
												<span className='text-green-600 mt-1 text-xl'>✔️</span>
												<span className='text-lg text-gray-800'>{item.trim()}.</span>
											</div>
										)
								)}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Kepala Sekolah */}
			<section className='max-w-5xl mx-auto px-4 py-16'>
				<h2 className='text-3xl font-semibold text-green-700 mb-8 text-center'>
					<span className='mr-2'>🎓</span>Kepala Madrasah
				</h2>
				<div className='bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl'>
					<h3 className='text-3xl font-bold text-gray-800'>{profil?.kepalaMadrasah || 'Bapak Mahfudz S.ag'}</h3>
					<p className='mt-4 italic text-gray-600 text-lg leading-relaxed'>{profil?.sambutan || 'Kami berkomitmen membimbing siswa menuju masa depan gemilang, berlandaskan iman dan ilmu.'}</p>
				</div>
			</section>

			{/* Keunggulan */}
			<section className='bg-green-50 py-16'>
				<div className='max-w-5xl mx-auto px-4'>
					<h2 className='text-3xl font-semibold text-green-700 mb-12 text-center'>Keunggulan MI Ma'arif Nailul Huda</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
						{profil?.keunggulan?.split('.').map(
							(item, index) =>
								item.trim() && (
									<div
										key={index}
										className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105'
									>
										<div className='text-5xl mb-4'>🌟</div>
										<h4 className='font-semibold text-gray-800 text-lg'>{item.trim()}.</h4>
									</div>
								)
						) ||
							[
								['🕌', 'Lingkungan Islami'],
								['👨‍🏫', 'Guru Profesional'],
								['📚', 'Kurikulum Terintegrasi'],
								['🎨', 'Ekstrakurikuler Menarik'],
								['💻', 'Teknologi Pembelajaran'],
								['🤝', 'Kerja Sama Wali Murid'],
							].map(([emoji, title], i) => (
								<div
									key={i}
									className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105'
								>
									<div className='text-5xl mb-4'>{emoji}</div>
									<h4 className='font-semibold text-gray-800 text-lg'>{title}</h4>
								</div>
							))}
					</div>
				</div>
			</section>
		</div>
	);
}
