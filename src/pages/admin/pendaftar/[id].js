// DETAIL PAGE COMPONENT (pages/admin/pendaftar/[id].js)
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DetailPendaftar() {
	const router = useRouter();
	const { id } = router.query;
	const [calon, setCalon] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// First check if the router is ready
		if (!router.isReady) return;

		// Handle the case when ID is undefined - usually happens on initial page load
		if (!id || id === 'undefined') {
			// Instead of showing an error immediately, we can redirect to the listing page
			router.replace('/admin/kelola-data-pendaftar');
			return;
		}

		const fetchData = async () => {
			try {
				setLoading(true);
				console.log(`Fetching data for ID: ${id}`);
				const res = await axios.get(`/api/admin/pendaftar/${id}`);
				console.log('Data fetched:', res.data);
				setCalon(res.data);
				setError(null);
			} catch (err) {
				console.error('Gagal mengambil detail pendaftar', err);
				// Extract error message from response if available
				const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message || 'Terjadi kesalahan saat mengambil data';
				setError(errorMessage);
				setCalon(null);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [router.isReady, id, router]);

	const handleBack = () => {
		router.push('/admin/kelola-data-pendaftar');
	};

	if (loading)
		return (
			<div className='flex justify-center items-center h-64'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-700'></div>
			</div>
		);

	if (error)
		return (
			<div className='p-6 max-w-2xl mx-auto bg-white rounded shadow'>
				<div className='bg-red-50 border border-red-200 text-red-800 rounded p-4 mb-4'>
					<p className='font-medium'>Error: {error}</p>
				</div>
				<button
					onClick={handleBack}
					className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
				>
					← Kembali
				</button>
			</div>
		);

	if (!calon)
		return (
			<div className='p-6 max-w-2xl mx-auto bg-white rounded shadow'>
				<p className='text-center'>Data tidak ditemukan</p>
				<div className='mt-6 text-center'>
					<button
						onClick={handleBack}
						className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
					>
						← Kembali
					</button>
				</div>
			</div>
		);

	// Ensure form data is available and safely handle all possible properties
	const form = calon.form || {};

	return (
		<div className='p-6 max-w-2xl mx-auto bg-white rounded shadow'>
			<h1 className='text-3xl font-bold text-center text-green-700 mb-6'>Detail Pendaftar</h1>

			<div className='bg-green-50 p-4 rounded-lg mb-6'>
				<h2 className='text-xl font-semibold text-green-800 mb-3'>Data Pribadi</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='space-y-2'>
						<p>
							<span className='font-medium'>Nama:</span> {calon.nama || '-'}
						</p>
						<p>
							<span className='font-medium'>NISN:</span> {calon.nisn || '-'}
						</p>
						<p>
							<span className='font-medium'>NIK:</span> {form.nik || '-'}
						</p>
						<p>
							<span className='font-medium'>Tempat Lahir:</span> {form.tempatLahir || '-'}
						</p>
						<p>
							<span className='font-medium'>Tanggal Lahir:</span>{' '}
							{form.tanggalLahir ? new Date(form.tanggalLahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
						</p>
					</div>
					<div className='space-y-2'>
						<p>
							<span className='font-medium'>Alamat:</span> {form.alamat || '-'}
						</p>
						<p>
							<span className='font-medium'>Agama:</span> {form.agama || '-'}
						</p>
						<p>
							<span className='font-medium'>Hobi:</span> {form.hobi || '-'}
						</p>
						<p>
							<span className='font-medium'>No. Telepon:</span> {form.noRumah || '-'}
						</p>
					</div>
				</div>
			</div>

			<div className='bg-blue-50 p-4 rounded-lg mb-6'>
				<h2 className='text-xl font-semibold text-blue-800 mb-3'>Data Pendidikan</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='space-y-2'>
						<p>
							<span className='font-medium'>TK Asal:</span> {form.tk || '-'}
						</p>
						<p>
							<span className='font-medium'>Sekolah Asal:</span> {form.namaSekolah || '-'}
						</p>
					</div>
					<div className='space-y-2'>
						<p>
							<span className='font-medium'>Status Sekolah:</span> {form.statusSekolahAsal || '-'}
						</p>
						<p>
							<span className='font-medium'>Alamat Sekolah:</span> {form.alamatSekolah || '-'}
						</p>
					</div>
				</div>
			</div>

			<div className='bg-yellow-50 p-4 rounded-lg mb-6'>
				<h2 className='text-xl font-semibold text-yellow-800 mb-3'>Data Wali</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='space-y-2'>
						<p>
							<span className='font-medium'>Nama Wali:</span> {form.namaWali || '-'}
						</p>
						<p>
							<span className='font-medium'>TTL Wali:</span> {form.ttlWali || '-'}
						</p>
					</div>
					<div className='space-y-2'>
						<p>
							<span className='font-medium'>Pekerjaan Wali:</span> {form.pekerjaanWali || '-'}
						</p>
						<p>
							<span className='font-medium'>Pendapatan Wali:</span> {form.pendapatanWali || '-'}
						</p>
					</div>
				</div>
			</div>

			<div
				className='bg-purple-50 p-4 rounded-lg mb-6'
				id='dokumen-persyaratan'
			>
				<h2 className='text-xl font-semibold text-purple-800 mb-3'>Dokumen</h2>
				{form.dokumenPersyaratan ? (
					<a
						href={form.dokumenPersyaratan}
						target='_blank'
						className='inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition'
						rel='noopener noreferrer'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5 mr-2'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
							/>
						</svg>
						Lihat Dokumen Persyaratan
					</a>
				) : (
					<p className='text-gray-500 italic'>Tidak ada dokumen yang diunggah</p>
				)}
			</div>

			<div className='mt-6 flex justify-between'>
				<button
					onClick={handleBack}
					className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition flex items-center'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5 mr-1'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M10 19l-7-7m0 0l7-7m-7 7h18'
						/>
					</svg>
					Kembali
				</button>

				<button
					onClick={() => {
						// Tambahkan style untuk mencetak dengan lebih jelas
						const style = document.createElement('style');
						style.innerHTML = `
							@media print {
								body { font-size: 12pt; color: #000; }
								table { border-collapse: collapse; width: 100%; }
								th, td { border: 1px solid #000; padding: 8px; text-align: left; }
								@page { margin: 2cm; }
								.no-print { display: none; }
								h2, h3 { margin-top: 20px; margin-bottom: 10px; }
								.data-section { margin-bottom: 20px; }
								header { display: none; }
								#dokumen-persyatan { display: none; }
								footer { display: none; }
								nav { display: none; }
								button { display: none; }
							}
						`;
						document.head.appendChild(style);
						window.print();
						// Hapus style setelah mencetak
						setTimeout(() => document.head.removeChild(style), 1000);
					}}
					className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5 mr-1'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
						/>
					</svg>
					Cetak
				</button>
			</div>
		</div>
	);
}
