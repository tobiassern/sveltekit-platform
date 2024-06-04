import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = (event) => {
	if (!event.locals.tenant) error(404, 'Tenant not found');
	return { tenant: event.locals.tenant };
};
