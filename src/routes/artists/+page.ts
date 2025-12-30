import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const res = await fetch('/api/proxy/artist');
		if (!res.ok) throw new Error('Failed to fetch');
		const artists = await res.json();
		return { artists };
	} catch (e) {
		console.error('Directory Fetch Error:', e);
		return { artists: [], error: true };
	}
};
