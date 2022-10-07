import { json } from '@sveltejs/kit';
import { writeFileSync } from 'fs';

export async function POST({ request }) {
	const req = await request.json();
	// console.log(req.image);
	const file = req.image;
	writeFileSync('image.png', file, 'base64');

	return new json(req);
}
