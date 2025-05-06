import { useEffect } from 'react';
import { useRouter } from 'next/router';
import FormStepper from '@/components/FormStepper';

export default function PendaftaranPage() {
	const router = useRouter();
	useEffect(() => {
		// Cek token dari cookie
		const checkAuth = async () => {
			try {
				const response = await fetch('/api/auth/me');
				const data = await response.json();

				if (!data.token || !data.siswa) {
					router.push('/auth/login');
				}
			} catch (error) {
				console.error('Error memeriksa autentikasi:', error);
				router.push('/auth/login');
			}
		};

		checkAuth();
	}, []);

	return (
		<div style={{ position: 'relative' }}>
			{/* ⬇️ Tambahkan button logout di sini */}
			<button
				onClick={() => {
					// Panggil API logout
					fetch('/api/auth/logout', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
					})
						.then((response) => response.json())
						.then((data) => {
							console.log('Berhasil logout:', data.message);
						})
						.catch((error) => {
							console.error('Error saat logout:', error);
						});
					localStorage.removeItem('isLoggedIn'); // hapus login
					router.push('/auth/login'); // balik ke login
				}}
				style={{
					position: 'absolute',
					top: '1rem',
					right: '1rem',
					backgroundColor: '#f44336',
					color: 'white',
					border: 'none',
					padding: '8px 16px',
					borderRadius: '5px',
					cursor: 'pointer',
				}}
			>
				Logout
			</button>

			{/* Judul halaman */}
			<h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Formulir Pendaftaran</h1>

			{/* Form Stepper */}
			<FormStepper />
		</div>
	);
}
