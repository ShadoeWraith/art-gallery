import dotenv from 'dotenv';
dotenv.config();

export async function GET({ params, url }: { params: { path: string | string[] }; url: URL }) {
	const pathSegments = Array.isArray(params.path) ? params.path : [params.path];
	const query = url.searchParams.toString();

	const target = `${process.env.API_BASE}/${pathSegments.join('/')}${query ? `?${query}` : ''}`;

	const res = await fetch(target);
	const data = await res.json();

	return new Response(JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json' }
	});
}
