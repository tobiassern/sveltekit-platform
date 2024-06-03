import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import slugify from '@sindresorhus/slugify';
import { users_table } from '.';
import { z } from 'zod';

export const tenants_table = sqliteTable('tenants', {
	id: integer('id').notNull().primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	domain: text('domain').unique(),
	slug: text('slut').unique().notNull(),
	logo_square_url: text('logo_square_url'),
	logo_url: text('logo_url'),
	owner_id: integer('owner_id').references(() => users_table.id)
});

export const tenant_users_table = sqliteTable(
	'tenant_users',
	{
		tenant_id: integer('tenant_id')
			.references(() => tenants_table.id, {
				onDelete: 'cascade'
			})
			.notNull(),
		user_id: integer('user_id')
			.references(() => users_table.id, {
				onDelete: 'cascade'
			})
			.notNull(),
		role: text('role', { enum: ['admin', 'member'] }).notNull()
	},
	(t) => {
		return {
			pk: primaryKey({ columns: [t.tenant_id, t.user_id] })
		};
	}
);

export const create_tenant_schema = createInsertSchema(tenants_table, {
	name: (schema) => schema.name.trim(),
	slug: (schema) => schema.slug.transform((val) => slugify(val).trim())
})
	.pick({
		name: true,
		slug: true
	})
	.transform((data) => {
		if (data.name && !data.slug) {
			data.slug = slugify(data.name).trim();
		}
		return data;
	});

export const tenantsRelations = relations(tenants_table, ({ many }) => ({
	tenant_users: many(tenant_users_table)
}));

export const tenantUsersRelations = relations(tenant_users_table, ({ one, many }) => ({
	tenant: one(tenants_table, {
		fields: [tenant_users_table.tenant_id],
		references: [tenants_table.id]
	}),
	user: one(users_table, {
		fields: [tenant_users_table.user_id],
		references: [users_table.id]
	})
}));

export const invite_tenant_user_schema = z.object({
	email: z.string().email(),
	role: z.enum(['admin', 'member']).default('member')
});
