import type { ServerLoadEvent, RequestEvent } from '@sveltejs/kit';
import { error, redirect } from '@sveltejs/kit';

export const isAuthenticated = (event: ServerLoadEvent | RequestEvent) => {
	if (!event.locals.user) {
		redirect(302, '/sign-in');
	}

	return { user: event.locals.user };
};

// export const isTenantUser = (event: ServerLoadEvent | RequestEvent) => {
// 	const { user } = isAuthenticated(event);

// 	if (!event.locals.tenant) {
// 		error(404, 'Tenant not found');
// 	}

// 	if (!event.locals.isTenantMember) {
// 		error(403, 'Forbidden');
// 	}
// 	return { tenant: event.locals.tenant, user };
// };

// export const isTenantAdmin = (event: ServerLoadEvent | RequestEvent) => {
// 	const { tenant, user } = isTenantUser(event);

// 	if (!event.locals.isTenantAdmin) {
// 		error(403, 'Forbidden');
// 	}

// 	return { tenant, user };
// };

// export const isSystemAdmin = (event: ServerLoadEvent | RequestEvent) => {
// 	const { user } = isAuthenticated(event);
// 	if (!user.system_admin) {
// 		error(403, 'Forbidden');
// 	}
// 	return { user };
// };
