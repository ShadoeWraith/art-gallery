import { BASE_API_URL } from '$env/static/private';

export async function GET({ params, url }: { params: { path: string | string[] }; url: URL }) {
	const apiBase = BASE_API_URL;

	// Prefer API_GATEWAY_BASE, fallback to PUBLIC_API_GATEWAY_BASE if needed
	if (!apiBase) {
		console.error('Missing API_GATEWAY_BASE environment variable');
		return new Response(JSON.stringify({ message: 'Missing API_GATEWAY_BASE' }), { status: 500 });
	}

	try {
		const pathSegments = Array.isArray(params.path) ? params.path : [params.path];
		const query = url.searchParams.toString();

		console.log('query', query);

		// Construct full target URL
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		console.error('Unhandled error:', err);
		return new Response(JSON.stringify({ message: 'Internal Error', error: err.message }), {
			status: 500
		});
	}
}
