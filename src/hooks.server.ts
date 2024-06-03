import type { Handle } from '@sveltejs/kit';
import { PUBLIC_BASE_HOSTNAME } from '$env/static/public';
import { initDB } from '$lib/server/db';
import { initLucia } from '$lib/server/auth';
import { tenants_table, tenant_users_table } from '$lib/schemas';
import { eq } from 'drizzle-orm';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.db = initDB();
	event.locals.user = null;
	event.locals.session = null;

	if (event.url.hostname === `app.${PUBLIC_BASE_HOSTNAME}`) {
		// Manage app
		event.locals.lucia = initLucia(event.locals.db);
		const sessionId = event.cookies.get(event.locals.lucia.sessionCookieName);

		if (sessionId) {
			const { session, user } = await event.locals.lucia.validateSession(sessionId);
			if (session && session.fresh) {
				const sessionCookie = event.locals.lucia.createSessionCookie(session.id);
				// sveltekit types deviates from the de-facto standard
				// you can use 'as any' too
				event.cookies.set(sessionCookie.name, sessionCookie.value, {
					path: '.',
					...sessionCookie.attributes
				});
			}
			if (!session) {
				const sessionCookie = event.locals.lucia.createBlankSessionCookie();
				event.cookies.set(sessionCookie.name, sessionCookie.value, {
					path: '.',
					...sessionCookie.attributes
				});
			}
			event.locals.user = user;
			event.locals.session = session;

			if (event.params.tenant_slug && event.locals.user) {
				const tenant = await event.locals.db.query.tenants_table.findFirst({
					where: eq(tenants_table.slug, event.params.tenant_slug),
					with: {
						tenant_users: {
							where: eq(tenant_users_table.user_id, event.locals.user.id)
						}
					}
				});
				event.locals.tenant = tenant;

				if (tenant) {
					const tenant_user =
						event.locals.user &&
						tenant &&
						tenant.tenant_users.find(
							(tenant_user_table) => tenant_user_table.user_id === event.locals.user?.id
						);
					event.locals.isTenantMember = tenant_user
						? true
						: event.locals.user && tenant
							? false
							: null;

					// event.locals.isTenantAdmin =
					// 	tenant_user?.role === 'admin' ? true : event.locals.user && tenant ? false : null;
				}
			}
		}
	} else {
		// Manage public
	}

	const response = await resolve(event);

	return response;
};
