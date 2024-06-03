import type { PageServerLoad } from './$types';
import { isAuthenticated } from '$lib/helpers';
export const load: PageServerLoad = (event) => {
	isAuthenticated(event);
};
