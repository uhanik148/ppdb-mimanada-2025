import { useState, useEffect } from 'react';

export default function Infoppdb() {
	const [showModal, setShowModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);

	const [infoPendaftaran, setInfoPendaftaran] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	console.log(infoPendaftaran);
	// Fungsi untuk memformat tanggal
	const formatDate = (dateString) => {
		if (!dateString) return '-';
		const date = new Date(dateString);
		return date.toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	};

	// Fetch data info pendaftaran dari API
	useEffect(() => {
		const fetchInfoPendaftaran = async () => {
			try {
				setLoading(true);
				const response = await fetch('/api/admin/kelola-info-pendaftar');

				if (!response.ok) {
					throw new Error('Gagal mengambil data info pendaftaran');
				}

				const data = await response.json();
				setInfoPendaftaran(data);
			} catch (err) {
				console.error('Error:', err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchInfoPendaftaran();
	}, []);

	const handleImageClick = (image) => {
		setSelectedImage(image);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setSelectedImage(null);
	};

	return (
		<section className='p-10 text-center'>
			<h3 className='text-3xl font-bold text-green-700'>Informasi PPDB Tahun 2025/2026</h3>
			<div className='flex justify-center gap-6 mt-6'>
				{infoPendaftaran?.brosurUrl
					? infoPendaftaran.brosurUrl
							.split('|')
							.filter((url) => url.trim())
							.map((url, index) => (
								<div
									key={index}
									className='relative cursor-pointer'
									onClick={() => handleImageClick(url.trim())}
								>
									<img
										src={url.trim()}
										alt={`PPDB ${index + 1}`}
										className='rounded-xl shadow-lg hover:scale-105 transition-transform duration-300'
									/>
								</div>
							))
					: ['/ppdb-1.png', '/ppdb-2.png'].map((url, index) => (
							<div
								key={index}
								className='relative cursor-pointer'
								onClick={() => handleImageClick(url)}
							>
								<img
									src={url}
									alt={`PPDB ${index + 1}`}
									className='rounded-xl shadow-lg hover:scale-105 transition-transform duration-300'
								/>
							</div>
					  ))}
			</div>

			{/* Modal */}
			{showModal && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn'
					onClick={closeModal}
				>
					<div
						className='relative max-w-4xl w-full'
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={closeModal}
							className='absolute top-4 right-4 text-white text-3xl bg-black/50 hover:bg-black/70 w-10 h-10 rounded-full flex items-center justify-center'
						>
							&times;
						</button>
						<img
							src={selectedImage}
							alt='Detail PPDB'
							className='w-full h-auto rounded-xl shadow-xl'
						/>
					</div>
				</div>
			)}
		</section>
	);
}
