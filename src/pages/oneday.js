import { useState, useEffect } from 'react';

export default function Oneday() {
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
		<section className='py-12 px-6 bg-slate-50 text-center'>
			<div className='max-w-5xl mx-auto'>
				<div className='mb-8 pb-4 border-b-2 border-gray-200'>
					<h3 className='text-2xl sm:text-3xl font-bold text-green-900'>{infoPendaftaran?.sectionTitle || 'PENERIMAAN PESERTA DIDIK BARU'}</h3>
					<p className='text-lg text-gray-700 mt-2'>{infoPendaftaran?.description || 'Tahun Ajaran 2025/2026'}</p>
				</div>

				{/* PPDB Information */}
				<div className='mt-8 mb-10 mx-auto text-left bg-white shadow-xl rounded-lg border border-gray-200'>
					<div className='bg-green-900 text-white py-3 px-6 rounded-t-lg'>
						<h4 className='text-xl font-bold'>INFORMASI PENDAFTARAN</h4>
					</div>

					<div className='p-6'>
						<div className='grid md:grid-cols-2 gap-8'>
							<div className='bg-slate-50 p-4 rounded-lg border-l-4 border-green-900'>
								<h5 className='font-bold text-green-900 mb-3 text-lg'>Jadwal Penting:</h5>
								<table className='w-full text-gray-800'>
									<tbody>
										<tr className='border-b border-gray-200'>
											<td className='py-2 font-medium'>Pendaftaran Online</td>
											<td className='py-2'>
												:{' '}
												{infoPendaftaran?.mulaiPendaftaranOnline && infoPendaftaran?.selesaiPendaftaranOnline
													? `${formatDate(infoPendaftaran.mulaiPendaftaranOnline)} - ${formatDate(infoPendaftaran.selesaiPendaftaranOnline)}`
													: '03 Maret - 12 Juli 2025'}
											</td>
										</tr>
										<tr className='border-b border-gray-200'>
											<td className='py-2 font-medium'>Verifikasi Berkas</td>
											<td className='py-2'>
												:{' '}
												{infoPendaftaran?.mulaiVerifikasiBerkas && infoPendaftaran?.selesaiVerifikasiBerkas
													? `${formatDate(infoPendaftaran.mulaiVerifikasiBerkas)} - ${formatDate(infoPendaftaran.selesaiVerifikasiBerkas)}`
													: '1 Maret - 15 Maret 2025'}
											</td>
										</tr>
										<tr className='border-b border-gray-200'>
											<td className='py-2 font-medium'>Tes Seleksi</td>
											<td className='py-2'>: {infoPendaftaran?.tesSeleksi ? formatDate(infoPendaftaran.tesSeleksi) : '20 Mei 2025'}</td>
										</tr>
										<tr className='border-b border-gray-200'>
											<td className='py-2 font-medium'>Pengumuman</td>
											<td className='py-2'>: {infoPendaftaran?.pengumuman ? formatDate(infoPendaftaran.pengumuman) : '20 Juli 2025'}</td>
										</tr>
										<tr>
											<td className='py-2 font-medium'>Daftar Ulang</td>
											<td className='py-2'>: {infoPendaftaran?.daftarUlang ? formatDate(infoPendaftaran.daftarUlang) : '5-20 Juli 2025'}</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div className='bg-slate-50 p-4 rounded-lg border-l-4 border-green-900'>
								<h5 className='font-bold text-green-900 mb-3 text-lg'>Persyaratan Dokumen:</h5>
								<ul className='space-y-2 text-gray-800'>
									{infoPendaftaran?.persyaratanDokumen
										? infoPendaftaran.persyaratanDokumen.split('.\n').map((dokumen, index) => (
												<li
													key={index}
													className='flex items-start'
												>
													<span className='inline-block w-4 h-4 mr-2 mt-1 bg-green-900 rounded-full flex-shrink-0'></span>
													{dokumen}
												</li>
										  ))
										: ['Fotokopi Akta Kelahiran (1 lembar)', 'Fotokopi Kartu Keluarga (1 lembar)', 'Ijazah TK/RA atau Surat Keterangan (1 lembar)', 'Fotokopi PKH (jika ada) (1 lembar)'].map(
												(dokumen, index) => (
													<li
														key={index}
														className='flex items-start'
													>
														<span className='inline-block w-4 h-4 mr-2 mt-1 bg-green-900 rounded-full flex-shrink-0'></span>
														{dokumen}
													</li>
												)
										  )}
								</ul>
							</div>
						</div>

						<div className='mt-8 bg-slate-50 p-4 rounded-lg border-l-4 border-green-900'>
							<h5 className='font-bold text-green-900 mb-2 text-lg'>Biaya Pendaftaran:</h5>
							<p className='text-gray-800'>
								Biaya formulir pendaftaran sebesar <span className='font-semibold'>Rp {new Intl.NumberFormat('id-ID').format(infoPendaftaran?.biayaPendaftaran || 100000)},-</span> dapat dibayarkan
								melalui rekening sekolah atau langsung di loket pendaftaran.
							</p>
						</div>

						<div className='mt-8 bg-slate-50 p-4 rounded-lg border-l-4 border-green-900'>
							<h5 className='font-bold text-green-900 mb-2 text-lg'>Kontak Informasi:</h5>
							<div className='grid md:grid-cols-2 gap-4'>
								<div>
									<p className='font-medium text-gray-700 mb-1'>Narahubung:</p>
									<ul className='space-y-2 text-gray-800'>
										{infoPendaftaran?.kontakInformasi
											? infoPendaftaran.kontakInformasi.split('.\n').map((contact, index) => {
													const [name, number] = contact.split(':');
													return (
														<li
															key={index}
															className='flex items-center'
														>
															<span className='font-medium mr-2'>{name}:</span>
															<a
																href={`tel:${number}`}
																className='text-green-800 hover:underline'
															>
																{number}
															</a>
														</li>
													);
											  })
											: [
													{ name: 'Elok Nur Afidah', number: '+6285645051776' },
													{ name: 'Mustaftichatull', number: '+6281555993880' },
													{ name: 'Dewi Fatihatul', number: '+6281234663695' },
											  ].map((contact, index) => (
													<li
														key={index}
														className='flex items-center'
													>
														<span className='font-medium mr-2'>{contact.name}:</span>
														<a
															href={`tel:${contact.number}`}
															className='text-green-800 hover:underline'
														>
															{contact.number}
														</a>
													</li>
											  ))}
									</ul>
								</div>
								<div>
									<p className='font-medium text-gray-700 mb-1'>Email:</p>
									<a
										href={`mailto:${infoPendaftaran?.emailInformasi || 'ribyheqyn@mailinator.com'}`}
										className='text-green-800 hover:underline'
									>
										{infoPendaftaran?.emailInformasi || 'ribyheqyn@mailinator.com'}
									</a>
								</div>
							</div>
						</div>

						<div className='mt-8 bg-green-50 p-5 rounded-lg border border-green-200'>
							<h5 className='font-bold text-green-900 mb-3 text-lg'>Prosedur Pendaftaran Online:</h5>
							<ol className='space-y-2 text-gray-800'>
								{infoPendaftaran?.prosedur
									? infoPendaftaran.prosedur
											.split('.')
											.filter((step) => step.trim())
											.map((step, index) => (
												<li
													key={index}
													className='flex items-start'
												>
													<span className='inline-flex items-center justify-center w-6 h-6 mr-3 bg-green-900 text-white rounded-full flex-shrink-0 text-sm font-bold'>{index + 1}</span>
													{step.trim()}
												</li>
											))
									: [
											'Kunjungi website resmi sekolah',
											'Klik menu Pendaftaran',
											'Isi formulir dengan lengkap dan benar',
											'Upload dokumen yang diperlukan',
											'Lakukan pembayaran biaya pendaftaran',
											'Cetak bukti pendaftaran',
									  ].map((step, index) => (
											<li
												key={index}
												className='flex items-start'
											>
												<span className='inline-flex items-center justify-center w-6 h-6 mr-3 bg-green-900 text-white rounded-full flex-shrink-0 text-sm font-bold'>{index + 1}</span>
												{step}
											</li>
									  ))}
							</ol>
						</div>
					</div>
				</div>

				<div className='mt-10'>
					<h4 className='text-xl font-bold text-green-900 mb-4'>BROSUR INFORMASI</h4>
					<div className='flex justify-center gap-8 mt-6'>
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
											<div className='overflow-hidden rounded-lg border-2 border-gray-300'>
												<img
													src={url.trim()}
													alt={`Brosur PPDB ${index + 1}`}
													className='rounded-lg hover:scale-105 transition-transform duration-300'
												/>
											</div>
										</div>
									))
							: ['/ppdb-1.png', '/ppdb-2.png'].map((url, index) => (
									<div
										key={index}
										className='relative cursor-pointer'
										onClick={() => handleImageClick(url)}
									>
										<div className='overflow-hidden rounded-lg border-2 border-gray-300'>
											<img
												src={url}
												alt={`Brosur PPDB ${index + 1}`}
												className='rounded-lg hover:scale-105 transition-transform duration-300'
											/>
										</div>
									</div>
							  ))}
					</div>
				</div>
			</div>

			{/* Modal */}
			{showModal && (
				<div
					className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fadeIn'
					onClick={closeModal}
				>
					<div
						className='relative max-w-4xl w-full'
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={closeModal}
							className='absolute -top-12 right-0 text-white text-xl bg-green-900 hover:bg-green-800 w-8 h-8 rounded-full flex items-center justify-center'
						>
							&times;
						</button>
						<img
							src={selectedImage}
							alt='Detail PPDB'
							className='w-full h-auto rounded-lg shadow-2xl'
						/>
					</div>
				</div>
			)}
		</section>
	);
}
