import { BASE_API_URL } from '$env/static/private';

export async function GET({ params, url }: { params: { path: string | string[] }; url: URL }) {
	const apiBase = BASE_API_URL;

	if (!apiBase) {
		console.error('Missing API_GATEWAY_BASE environment variable');
		return new Response(JSON.stringify({ message: 'Missing API_GATEWAY_BASE' }), { status: 500 });
	}

	try {
		const pathSegments = Array.isArray(params.path) ? params.path : [params.path];
		const query = url.searchParams.toString();

		const target = `${apiBase}/${pathSegments.join('/')}${query ? `?${query}` : ''}`;

		const res = await fetch(target);

		if (!res.ok) {
			const errorText = await res.text();
			console.error('Upstream API error:', res.status, errorText);
			return new Response(JSON.stringify({ message: 'Upstream API error', details: errorText }), {
				status: res.status
			});
		}

		const data = await res.json();
		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err: any) {
		console.error('Unhandled error:', err);
		return new Response(JSON.stringify({ message: 'Internal Error', error: err.message }), {
			status: 500
		});
	}
}
