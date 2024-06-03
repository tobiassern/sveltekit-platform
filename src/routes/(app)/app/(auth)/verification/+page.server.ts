import type { PageServerLoad, Actions } from './$types';
import { superValidate, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { email_verification_tokens_table, users_table, verification_schema } from '$lib/schemas';
import { fail, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	return {
		form: await superValidate(
			{
				email: event.url.searchParams.get('email') ?? undefined,
				code: event.url.searchParams.get('code') ?? undefined
			},
			zod(verification_schema),
			{ errors: false }
		)
	};
};

export const actions: Actions = {
	verify: async (event) => {
		const form = await superValidate(event, zod(verification_schema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const email_verification_token =
			await event.locals.db.query.email_verification_tokens_table.findFirst({
				where: and(
					eq(email_verification_tokens_table.code, form.data.code),
					eq(email_verification_tokens_table.email, form.data.email)
				)
			});

		if (!email_verification_token || !email_verification_token.created_at) {
			return setError(form, '', 'Invalid OTP code');
		}

		if (
			new Date(new Date().getTime() + 5 * 60000) < new Date(email_verification_token.created_at)
		) {
			return setError(form, '', 'OTP code expired');
		}

		await event.locals.db
			.delete(email_verification_tokens_table)
			.where(eq(email_verification_tokens_table.id, email_verification_token.id));

		const user = await event.locals.db.query.users_table.findFirst({
			where: eq(users_table.id, email_verification_token.user_id)
		});

		if (!user) {
			return setError(form, '', 'Invalid user');
		}

		if (user && user.email !== email_verification_token.email) {
			return setError(form, '', 'User email mismatch');
		}

		await event.locals.db
			.update(users_table)
			.set({ email_verified: true })
			.where(eq(users_table.id, user.id));

		const session = await event.locals.lucia.createSession(user.id, {
			user_agent: event.request.headers.get('user-agent')
		});
		const sessionCookie = event.locals.lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
