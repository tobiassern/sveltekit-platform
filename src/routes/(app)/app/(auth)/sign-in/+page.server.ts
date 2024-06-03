import type { Actions, PageServerLoad } from './$types';
import { superValidate, setError } from 'sveltekit-superforms';

import { zod } from 'sveltekit-superforms/adapters';
import { sign_in_email_schema, users_table } from '$lib/schemas';
import { fail, redirect } from '@sveltejs/kit';
import { generateEmailVerificationToken } from '$lib/server/auth';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(sign_in_email_schema))
	};
};
export const actions: Actions = {
	'sign-in-email': async (event) => {
		const form = await superValidate(event, zod(sign_in_email_schema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const user = await event.locals.db.query.users_table.findFirst({
			where: eq(users_table.email, form.data.email)
		});

		if (!user) {
			redirect(302, `/sign-up?email=${form.data.email}`);
		}

		const email_verification_token = await generateEmailVerificationToken(event, user);

		if (!email_verification_token) {
			return setError(form, '', 'Could not generate email verification token');
		}

		redirect(302, `/verification/?email=${user.email}&code=${email_verification_token.code}`);
	}
};
