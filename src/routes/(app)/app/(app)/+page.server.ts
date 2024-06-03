import { tenant_users_table, tenants_table } from '$lib/schemas';
import type { Actions, PageServerLoad } from './$types';
import { error, fail } from '@sveltejs/kit';
import { superValidate, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { create_tenant_schema } from '$lib/schemas';
import { eq } from 'drizzle-orm';
import { isAuthenticated } from '$lib/helpers';
import { CF_ACCOUNT_ID, CF_API_KEY, CF_PROJECT_NAME } from '$env/static/private';

export const load: PageServerLoad = async (event) => {
	const { user } = isAuthenticated(event);

	return {
		tenants: await event.locals.db
			.select({
				name: tenants_table.name,
				slug: tenants_table.slug,
				logo_square_url: tenants_table.logo_square_url,
				logo_url: tenants_table.logo_url
			})
			.from(tenants_table)
			.leftJoin(tenant_users_table, eq(tenant_users_table.tenant_id, tenants_table.id))
			.where(eq(tenant_users_table.user_id, user.id)),
		form: await superValidate(zod(create_tenant_schema), { id: 'create-tenant-form' })
	};
};

export const actions: Actions = {
	'create-tenant': async (event) => {
		const { user } = isAuthenticated(event);

		const form = await superValidate(event, zod(create_tenant_schema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const tenant_exists = await event.locals.db.query.tenants_table.findFirst({
			where: eq(tenants_table.slug, form.data.slug)
		});

		if (
			tenant_exists ||
			['sign-in', 'sign-out', 'verification', 'sign-up'].includes(form.data.slug)
		) {
			return setError(form, 'slug', 'Slug not available');
		}

		await event.locals.db.transaction(async (tx) => {
			const [tenant] = await tx
				.insert(tenants_table)
				.values({
					name: form.data.name,
					slug: form.data.slug,
					logo_square_url: `https://api.dicebear.com/8.x/identicon/svg?seed=${form.data.slug}`,
					logo_url: `https://api.dicebear.com/8.x/identicon/svg?seed=${form.data.slug}`
				})
				.returning();

			await tx
				.insert(tenant_users_table)
				.values({ tenant_id: tenant.id, user_id: user.id, role: 'admin' });
		});

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${CF_API_KEY}` },
			body: JSON.stringify({ name: `${form.data.slug}.sk-platform.sernhede.com` })
		};

		await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/pages/projects/${CF_PROJECT_NAME}/domains`,
			options
		)
			.then((response) => response.json())
			.then((response) => console.log(response))
			.catch((err) => console.error(err));

		return { form };
	}
};
