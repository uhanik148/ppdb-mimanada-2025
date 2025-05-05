import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function KelolaDataPendaftar() {
	const [pendaftar, setPendaftar] = useState([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	console.log(pendaftar);
	useEffect(() => {
		fetchPendaftar();
	}, []);

	const fetchPendaftar = async () => {
		try {
			const res = await axios.get('/api/admin/pendaftar');
			setPendaftar(res.data);
		} catch (err) {
			console.error('Gagal memuat data pendaftar:', err);
			alert('Gagal memuat data pendaftar. Cek console untuk detail.');
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (nisn) => {
		if (!confirm('Yakin ingin menghapus data ini?')) return;

		try {
			const res = await axios.delete(`/api/admin/pendaftar/${nisn}`);
			alert(res.data.message || 'Data berhasil dihapus');
			fetchPendaftar();
		} catch (err) {
			console.error('Gagal menghapus data:', err.response?.data || err);
			alert(`Error: ${err.response?.data?.error || err.message}`);
		}
	};

	const handleDetail = (nisn) => {
		router.push(`/admin/pendaftar/${nisn}`);
	};

	const handleBack = () => {
		router.push('/admin');
	};

	if (loading) return <p>Memuat data...</p>;

	return (
		<div className='p-6'>
			<h2 className='text-3xl font-bold text-center mb-6 text-green-700'>DATA CALON SISWA PERIODE 2025/2026</h2>

			<div className='mb-4 flex justify-start'>
				<button
					onClick={handleBack}
					className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
				>
					← Kembali ke Dashboard
				</button>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full bg-white shadow-md rounded border'>
					<thead>
						<tr className='bg-green-200 text-green-800'>
							<th className='py-2 px-4 border'>No</th>
							<th className='py-2 px-4 border'>Nama</th>
							<th className='py-2 px-4 border'>NISN</th>
							<th className='py-2 px-4 border'>Asal TK</th>
							<th className='py-2 px-4 border'>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{pendaftar.map((siswa, index) => (
							<tr
								key={siswa.nisn}
								className='hover:bg-gray-50'
							>
								<td className='py-2 px-4 border text-center'>{index + 1}</td>
								<td className='py-2 px-4 border'>{siswa.nama}</td>
								<td className='py-2 px-4 border'>{siswa.nisn}</td>
								<td className='py-2 px-4 border'>{siswa.forms && siswa.forms.length > 0 ? siswa.forms[0].tk : '-'}</td>
								<td className='py-2 px-4 border text-center space-x-2'>
									<button
										onClick={() => handleDetail(siswa.nisn)}
										className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
									>
										Detail
									</button>
									<button
										onClick={() => handleDelete(siswa.nisn)}
										className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
									>
										Hapus
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
