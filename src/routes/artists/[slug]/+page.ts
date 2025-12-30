// +page.ts
export const load = ({ params }) => {
	return {
		slug: params.slug // Pass the ID/Slug specifically
	};
};
