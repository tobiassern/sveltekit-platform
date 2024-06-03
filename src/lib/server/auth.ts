import type { DB } from './db';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';
import { sessions_table, users_table } from '$lib/schemas';

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
