import type { Load } from '@sveltejs/kit';

export const load: Load = ({ params }) => {
	if (params.slug) {
		return {
			seed: params.slug
		};
	}
};
