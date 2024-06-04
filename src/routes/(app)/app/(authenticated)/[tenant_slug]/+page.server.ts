import { isTenantUser } from '$lib/helpers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
	isTenantUser(event);

	return {
		pageTitle: 'Dashboard'
	}
};
