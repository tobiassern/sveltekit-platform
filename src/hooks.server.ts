import type { Handle } from '@sveltejs/kit';
import { PUBLIC_BASE_HOSTNAME } from '$env/static/public';
import { initDB } from '$lib/server/db';
import { initLucia } from '$lib/server/auth';

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
		}
	} else {
		// Manage public
	}

	const response = await resolve(event);

	return response;
};
