export async function GET({ params, url }: { params: { path: string | string[] }; url: URL }) {
	try {
		const pathSegments = Array.isArray(params.path) ? params.path : [params.path];
		const query = url.searchParams.toString();

		const apiBase = process.env.API_BASE;
		if (!apiBase) {
			console.error('Missing API_BASE');
			return new Response(JSON.stringify({ message: 'Missing API_BASE' }), { status: 500 });
		}

		const target = `${apiBase}/${pathSegments.join('/')}${query ? `?${query}` : ''}`;
		const res = await fetch(target);

		if (!res.ok) {
			console.error('Upstream API error:', res.status, await res.text());
			return new Response(JSON.stringify({ message: 'Upstream API error' }), {
				status: res.status
			});
		}

		const data = await res.json();
		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		console.error('Unhandled error:', err);
		return new Response(JSON.stringify({ message: 'Internal Error' }), { status: 500 });
	}
}
