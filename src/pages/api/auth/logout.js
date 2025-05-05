import { serialize } from 'cookie';

export default function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Metode tidak diizinkan' });
	}

	// Hapus token dengan mengatur cookie kosong dan expired
	const cookie = serialize('token', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: 'strict',
		maxAge: -1,
		path: '/',
	});

	res.setHeader('Set-Cookie', cookie);
	return res.status(200).json({ message: 'Berhasil logout' });
}
