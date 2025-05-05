import { parse } from 'cookie';

export default function handler(req, res) {
	if (req.method === 'GET') {
		const cookies = parse(req.headers.cookie || '');
		const token = cookies.token;

		return res.status(200).json({ token });
	}
}
