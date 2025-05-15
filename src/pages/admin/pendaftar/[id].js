// DETAIL PAGE COMPONENT (pages/admin/pendaftar/[id].js)
// pages/admin/pendaftar/[id].js
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
	if (!router.isReady || !id || id === 'undefined') {
	  router.replace('/admin/kelola-data-pendaftar');
	  return;
	}

	const fetchData = async () => {
	  try {
		setLoading(true);
		const res = await axios.get(`/api/admin/pendaftar/${id}`);
		setCalon(res.data);
		setError(null);
	  } catch (err) {
		const errorMessage = err.response?.data?.error || err.message || 'Terjadi kesalahan';
		setError(errorMessage);
		setCalon(null);
	  } finally {
		setLoading(false);
	  }
	};

	fetchData();
  }, [router.isReady, id, router]);

  const handleBack = () => router.push('/admin/kelola-data-pendaftar');

  if (loading) return <div className='flex justify-center items-center h-64'><div className='animate-spin h-12 w-12 border-b-2 border-green-700 rounded-full'></div></div>;

  if (error) return (
	<div className='p-6 max-w-2xl mx-auto bg-white rounded shadow'>
	  <div className='bg-red-50 border border-red-200 text-red-800 rounded p-4 mb-4'>
		<p className='font-medium'>Error: {error}</p>
	  </div>
	  <button onClick={handleBack} className='bg-gray-500 text-white px-4 py-2 rounded'>← Kembali</button>
	</div>
  );

  if (!calon) return (
	<div className='p-6 max-w-2xl mx-auto bg-white rounded shadow'>
	  <p className='text-center'>Data tidak ditemukan</p>
	  <div className='mt-6 text-center'>
		<button onClick={handleBack} className='bg-gray-500 text-white px-4 py-2 rounded'>← Kembali</button>
	  </div>
	</div>
  );

  const form = calon.form || {};

  return (
	<div className='p-6 max-w-4xl mx-auto bg-white rounded shadow print-container'>
	  <div className='text-center mb-6'>
		<img src='/Logo.png' alt='Logo' className='mx-auto h-20 w-20' />
		<h2 className='text-lg font-semibold mt-2'>YAYASAN PENDIDIKAN ISLAM</h2>
		<h1 className='text-2xl font-bold text-green-700'>MI MA'ARIF NAILUL HUDA</h1>
		<p className='text-sm text-gray-700'>Garum, Kabupaten Blitar</p>
		<hr className='border-t-2 border-black my-4' />
		<h3 className='text-xl font-bold underline'>FORMULIR PENDAFTARAN PESERTA DIDIK BARU (PPDB) 2025/2026</h3>
	  </div>
  
	  {[
		{
		  title: "Data Pribadi",
		  color: "green",
		  data: [
			{ label: "Nama", value: calon.nama },
			{ label: "NISN", value: calon.nisn },
			{ label: "NIK", value: form.nik },
			{ label: "Tempat Lahir", value: form.tempatLahir },
			{ label: "Tanggal Lahir", value: form.tanggalLahir ? new Date(form.tanggalLahir).toLocaleDateString('id-ID') : '' },
			{ label: "Alamat", value: form.alamat },
			{ label: "Agama", value: form.agama },
			{ label: "Hobi", value: form.hobi },
			{ label: "No. Telepon", value: form.noRumah }
		  ]
		},
		{
		  title: "Data Pendidikan",
		  color: "blue",
		  data: [
			{ label: "TK Asal", value: form.tk },
			{ label: "Sekolah Asal", value: form.namaSekolah },
			{ label: "Status Sekolah", value: form.statusSekolahAsal },
			{ label: "Alamat Sekolah", value: form.alamatSekolah }
		  ]
		},
		{
		  title: "Sekolah Yang Akan Didaftari",
		  color: "blue",
		  data: [{ label: "Tipe Sekolah", value: form.tipeSekolah }]
		},
		{
		  title: "Data Wali",
		  color: "yellow",
		  data: [
			{ label: "Nama Wali", value: form.namaWali },
			{ label: "TTL Wali", value: form.ttlWali },
			{ label: "Pekerjaan Wali", value: form.pekerjaanWali },
			{ label: "Pendapatan Wali", value: form.pendapatanWali }
		  ]
		}
	  ].map((section, i) => (
		<section key={i} className={`bg-${section.color}-50 p-4 rounded-lg mb-6`}>
		  <h2 className={`text-xl font-semibold text-${section.color}-800 mb-3`}>{section.title}</h2>
		  <table className="w-full border border-gray-300 text-sm">
			<tbody>
			  {section.data.map((item, idx) => (
				<tr key={idx} className="border-t border-gray-200">
				  <td className="px-3 py-2 font-medium w-1/3">{item.label}</td>
				  <td className="px-3 py-2">{item.value || '-'}</td>
				</tr>
			  ))}
			</tbody>
		  </table>
		</section>
	  ))}
  
	  <section className='bg-purple-50 p-4 rounded-lg mb-6'>
		<h2 className='text-xl font-semibold text-purple-800 mb-3'>Dokumen</h2>
		{form.dokumenPersyaratan ? (
		  <a href={form.dokumenPersyaratan} target='_blank' rel='noopener noreferrer' className='inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700'>
			Lihat Dokumen Persyaratan
		  </a>
		) : (
		  <p className='text-gray-500 italic'>Tidak ada dokumen yang diunggah</p>
		)}
	  </section>
  
	  <div className='no-print flex justify-between mt-6'>
		<button onClick={handleBack} className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'>
		  ← Kembali
		</button>
		<button onClick={() => window.print()} className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'>
		  Cetak
		</button>
	  </div>
  
	   {/* ✅ <style> dipindah ke dalam elemen JSX */}
		<style jsx global>{`
			@media print {
			.no-print {
				display: none !important;
			}
			nav, header, footer {
				display: none !important;
			}
			body {
				background: white !important;
				margin: 0 !important;
				padding: 0 !important;
			}
			.print-container {
				width: 100%;
				max-width: 100%;
			}
			}
		`}</style>
	</div>
  );
}