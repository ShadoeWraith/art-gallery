export function sortItems(items, sortBy, sortOrder) {
	if (!sortBy) return items;

	return items.sort((a, b) => {
		const aVal = a[sortBy]?.toLowerCase?.() || '';
		const bVal = b[sortBy]?.toLowerCase?.() || '';

		if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
		if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
		return 0;
	});
}
