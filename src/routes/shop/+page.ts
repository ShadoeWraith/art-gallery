export function load({ url }) {
	return { queryParams: url.search, url: url.href };
}
