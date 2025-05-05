// pages/admin/index.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LogOut, Home, Info, User, FileText } from 'lucide-react';

export default function AdminDashboard() {
	const router = useRouter();
	const [adminName, setAdminName] = useState('');
	const [pendaftarBaru, setPendaftarBaru] = useState({ count_data_lengkap: 0, data: [] });

	useEffect(() => {
		const token = localStorage.getItem('admin-token');
		if (!token) {
			router.push('/admin/login');
		} else {
			try {
				const payload = JSON.parse(atob(token.split('.')[1]));
				setAdminName(payload.name);
			} catch {
				router.push('/admin/login');
			}
		}

		const fetchPendaftar = async () => {
			try {
				const response = await fetch('/api/admin/pendaftar');
				const data = await response.json();
				setPendaftarBaru(data);
			} catch (error) {
				console.error('Error fetching pendaftar:', error);
			}
		};

		fetchPendaftar();
	}, []);

	console.log(pendaftarBaru);

	const handleLogout = () => {
		localStorage.removeItem('admin-token');
		router.push('/admin/login');
	};

	const sidebarMenu = [
		{ label: 'Dashboard', icon: <Home />, href: '/admin', active: true },
		{ label: 'Kelola Pendaftar', icon: <User />, href: '/admin/kelola-data-pendaftar' },
		{ label: 'Profil Kami', icon: <Info />, href: '/admin/kelola-profil' },
		{ label: 'Info Pendaftaran', icon: <FileText />, href: '/admin/kelola-info-pendaftar' },
		{ label: 'Konten Beranda', icon: <Home />, href: '/admin/kelola-home' },
	];

	return (
		<div className='flex min-h-screen'>
			{/* Sidebar */}
			<div className='w-64 bg-green-800 text-white p-6 space-y-6'>
				<div className='text-center'>
					<div className='text-xl font-bold leading-tight'>
						MI MA'ARIF
						<br />
						NAILUL HUDA
					</div>
				</div>
				<nav className='space-y-3'>
					{sidebarMenu.map((item, idx) => (
						<Link
							key={idx}
							href={item.href}
						>
							<div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${item.active ? 'bg-green-700' : 'hover:bg-green-600'}`}>
								{item.icon}
								<span>{item.label}</span>
							</div>
						</Link>
					))}
				</nav>
				<button
					onClick={handleLogout}
					className='w-full mt-10 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2'
				>
					<LogOut className='w-5 h-5' /> Logout
				</button>
			</div>

			{/* Main Content */}
			<div className='flex-1 bg-gray-100 p-6'>
				<div className='flex justify-between items-center mb-6'>
					<h1 className='text-2xl font-bold'>Dashboard Admin</h1>
					<div className='flex items-center gap-3'>
						<div className='w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-sm'>{adminName?.charAt(0).toUpperCase() || 'A'}</div>
						<span className='font-medium'>{adminName || 'Admin'}</span>
					</div>
				</div>

				{/* Stats */}
				<div className='grid grid-cols-3 gap-4 mb-6'>
					<div className='bg-white rounded-xl shadow p-4 text-center'>
						<div className='text-2xl font-bold text-green-800'>{pendaftarBaru.data.length}</div>
						<div className='text-sm text-gray-600'>Jumlah Pendaftar</div>
					</div>
					<div className='bg-white rounded-xl shadow p-4 text-center'>
						<div className='text-2xl font-bold text-green-800'>{pendaftarBaru.count_data_lengkap}</div>
						<div className='text-sm text-gray-600'>Data Lengkap</div>
					</div>
					<div className='bg-white rounded-xl shadow p-4 text-center'>
						<div className='text-2xl font-bold text-green-800'>{pendaftarBaru.data.length - pendaftarBaru.count_data_lengkap}</div>
						<div className='text-sm text-gray-600'>Belum Lengkap</div>
					</div>
				</div>

				{/* Tabel Pendaftar Terbaru */}
				<div className='bg-white rounded-xl shadow p-4'>
					<h2 className='text-lg font-semibold mb-4'>Pendaftar Terbaru</h2>
					<div className='overflow-x-auto'>
						<table className='min-w-full text-sm'>
							<thead className='bg-green-100 text-left text-gray-700'>
								<tr>
									<th className='p-2'>Nama</th>
									<th className='p-2'>NISN</th>
									<th className='p-2'>Status</th>
									<th className='p-2'>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{pendaftarBaru.data.map((siswa, idx) => (
									<tr
										key={idx}
										className='border-b'
									>
										<td className='p-2'>{siswa.nama}</td>
										<td className='p-2'>{siswa.nisn}</td>
										<td className='p-2'>
											<span className={`px-2 py-1 rounded-full text-xs font-semibold ${siswa.isLengkap ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
												{siswa.isLengkap ? 'Lengkap' : 'Belum Lengkap'}
											</span>
										</td>
										<td className='p-2'>
											<Link href={`/admin/pendaftar/${siswa.nisn}`}>
												<button className='bg-green-700 hover:bg-green-800 text-white text-xs px-3 py-1 rounded'>Lihat Detail</button>
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
