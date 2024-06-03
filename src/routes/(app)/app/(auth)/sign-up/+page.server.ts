import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';

import { zod } from 'sveltekit-superforms/adapters';
import { sign_up_email_schema, users_table } from '$lib/schemas';
import { fail, error, redirect } from '@sveltejs/kit';
import { generateEmailVerificationToken } from '$lib/server/auth';
import { eq } from 'drizzle-orm';
import { dev } from '$app/environment';

export const load: PageServerLoad = async (event) => {
	return {
		form: await superValidate(
			{ email: event.url.searchParams.get('email') ?? undefined },
			zod(sign_up_email_schema),
			{ errors: false }
		)
	};
};

export const actions: Actions = {
	'sign-up-email': async (event) => {
		const form = await superValidate(event, zod(sign_up_email_schema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const user = await event.locals.db.query.users_table.findFirst({
			where: eq(users_table.email, form.data.email)
		});

		if (user) {
			return setError(form, '', 'User already exist. Try to sign in instead.');
		}

		const [new_user] = await event.locals.db
			.insert(users_table)
			.values({
				...form.data,
				avatar_url: `https://api.dicebear.com/8.x/rings/svg?seed=${form.data.email}`
			})
			.returning();

		if (!new_user) {
			error(400, 'Could not create user');
		}

		const email_verification_token = await generateEmailVerificationToken(event, new_user);

		if (!email_verification_token) {
			error(400, 'Could not generate email verification token');
		}
		if (dev) {
			redirect(
				302,
				`/verification/?email=${email_verification_token.email}&code=${email_verification_token.code}`
			);
		} else {
			redirect(302, `/verification/?email=${email_verification_token.email}`);
		}
	}
};
