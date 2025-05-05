import { useEffect, useState } from 'react';

export default function About() {
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
		<section
			style={{
				padding: '70px 20px',
				backgroundColor: '#f8f9fa',
				borderRadius: '12px',
				boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
				backgroundImage: 'linear-gradient(to right, #f8f9fa, #e8f5e9)',
			}}
		>
			<div
				style={{
					maxWidth: '1000px',
					margin: '0 auto',
					position: 'relative',
				}}
			>
				<div
					style={{
						backgroundColor: '#2e7d32',
						height: '4px',
						width: '100px',
						margin: '0 auto 10px',
						borderRadius: '2px',
					}}
				></div>

				<h2
					style={{
						fontSize: '2.75rem',
						fontWeight: '800',
						marginBottom: '35px',
						textAlign: 'center',
						color: '#2e7d32',
						letterSpacing: '1px',
					}}
				>
					{isLoading ? 'Memuat...' : heroData?.aboutTitle}
				</h2>

				<div
					style={{
						backgroundColor: '#ffffff',
						padding: '35px 45px',
						borderRadius: '15px',
						boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
						fontSize: '1.1rem',
						lineHeight: '1.9',
						color: '#333',
						transition: 'all 0.3s ease',
					}}
				>
					{isLoading ? <p style={{ marginBottom: '25px', textAlign: 'justify' }}>Memuat...</p> : <p style={{ marginBottom: '25px', textAlign: 'justify' }}>{heroData?.aboutDescription}</p>}
				</div>
			</div>
		</section>
	);
}
