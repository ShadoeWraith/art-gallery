import { PUBLIC_API_BASE } from '$env/static/public';

export async function GET({ params, url }: { params: { path: string | string[] }; url: URL }) {
	const pathSegments = Array.isArray(params.path) ? params.path : [params.path];
	const query = url.searchParams.toString();

	const target = `${PUBLIC_API_BASE}/${pathSegments.join('/')}${query ? `?${query}` : ''}`;

	const res = await fetch(target);
	const data = await res.json();

	return new Response(JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json' }
	});
}
