import type { DB } from '$lib/server/db';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';
import { sessions_table, users_table, email_verification_tokens_table } from '$lib/schemas';
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { Resend } from 'resend';
import { dev } from '$app/environment';
import { RESEND_API_KEY } from '$env/static/private';

export const initLucia = (db: DB) => {
	const adapter = new DrizzleSQLiteAdapter(db, sessions_table, users_table);

	const lucia = new Lucia(adapter, {
		getUserAttributes: (attributes) => {
			return {
				first_name: attributes.first_name,
				last_name: attributes.last_name,
				email: attributes.email,
				email_verified: attributes.email_verified,
				avatar_url: attributes.avatar_url
			};
		}
	});

	return lucia;
};

declare module 'lucia' {
	interface Register {
		Lucia: ReturnType<typeof initLucia>;
		UserId: number;
		DatabaseUserAttributes: typeof users_table.$inferSelect;
	}
}

export const generateEmailVerificationToken = async (
	event: RequestEvent,
	user: typeof users_table.$inferSelect
) => {
	const email_verification_token = await event.locals.db.transaction(async (tx) => {
		await tx
			.delete(email_verification_tokens_table)
			.where(eq(email_verification_tokens_table.user_id, user.id));

		const [email_verification_token] = await tx
			.insert(email_verification_tokens_table)
			.values({ user_id: user.id, email: user.email })
			.returning();

		if (!dev && RESEND_API_KEY) {
			const resend = new Resend(RESEND_API_KEY);

			await resend.emails.send({
				from: 'SvelteKit Platform <noreply@email.sk-platform.sernhede.com>',
				to: [email_verification_token.email],
				subject: 'OTP Code | SvelteKit Platforms',
				text: `OTP Code: ${email_verification_token.code}`
			});
		}

		return email_verification_token;
	});

	// logic for sending email OTP

	return email_verification_token;
};
