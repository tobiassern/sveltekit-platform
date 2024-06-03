import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { DB_URL, DB_TOKEN } from '$env/static/private';
import * as schema from '$lib/schemas';

export const initDB = () => {
	const client = createClient({
		url: DB_URL,
		authToken: DB_TOKEN
	});
	const db = drizzle(client, { schema });
	return db;
};

export type DB = ReturnType<typeof initDB>;
