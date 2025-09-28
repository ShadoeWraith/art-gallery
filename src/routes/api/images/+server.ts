import { json } from '@sveltejs/kit';

export function GET() {
	const girl = 'https://artgallery-images.s3.us-west-1.amazonaws.com/1.jpg';

	return json(girl);
}
