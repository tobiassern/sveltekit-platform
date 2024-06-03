import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { sql, relations } from 'drizzle-orm';
import { generateRandomString, alphabet } from 'oslo/crypto';

import { tenant_users_table } from '.';

export const users_table = sqliteTable('users', {
	id: integer('id').notNull().primaryKey(),
	email: text('email').notNull().unique(),
	first_name: text('first_name'),
	last_name: text('last_name'),
	email_verified: integer('email_verified', { mode: 'boolean' }),
	avatar_url: text('avatar_url')
});

export const users_relations = relations(users_table, ({ many }) => ({
	tenants: many(tenant_users_table)
}));

export const sessions_table = sqliteTable('sessions', {
	id: text('id').notNull().primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users_table.id),
	expiresAt: integer('expires_at').notNull()
});

export const email_verification_tokens_table = sqliteTable('email_verification_tokens', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	code: text('code')
		.$defaultFn(() => generateRandomString(6, alphabet('0-9')))
		.notNull(),
	email: text('email').notNull(),
	user_id: integer('user_id', { mode: 'number' })
		.notNull()
		.references(() => users_table.id, {
			onDelete: 'cascade'
		}),
	created_at: integer('created_at', { mode: 'timestamp_ms' }).default(sql`(CURRENT_TIMESTAMP)`)
});

export const sign_up_email_schema = createInsertSchema(users_table, {
	email: (schema) => schema.email.email()
}).omit({ id: true });

export const sign_in_email_schema = z.object({
	email: z.string().email()
});

export const verification_schema = z.object({
	email: z.string().email(),
	code: z.string().length(6)
});

// export const update_profile_schema = createInsertSchema(users_table, {
//   first_name: (schema) => schema.first_name.trim(),
//   last_name: (schema) => schema.last_name.trim(),
// }).pick({ first_name: true, last_name: true, avatar_url: true });
